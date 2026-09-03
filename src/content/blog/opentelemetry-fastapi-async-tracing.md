---
title: "OpenTelemetry for FastAPI: How I Traced an Async Backend That Looked Fast and Wasn't"
description: "A hands-on guide to instrumenting a FastAPI service with OpenTelemetry — auto-instrumentation, custom spans, event-loop lag metrics, trace-correlated logs, and sampling. Including the blocking database call that only a trace waterfall could find."
publishedAt: "2026-09-03"
categories: ["Observability", "Python", "Backend"]
tags: ["OpenTelemetry", "FastAPI", "Distributed Tracing", "SigNoz", "Python", "Async", "API Monitoring"]
relatedProjectSlug: "miningniti"
---

> **TL;DR:** My FastAPI service reported a healthy average response time and a p95 that made no sense. Logs showed nothing. The fix wasn't a faster query — it was noticing that a *synchronous* database call inside an `async def` endpoint was parking the event loop for every other request in flight. This is the OpenTelemetry setup that made it visible: auto-instrumentation in about fifteen lines, custom spans around the parts nobody instruments for you, an event-loop lag metric, and trace-correlated logs. All of it exports over OTLP, so it works with SigNoz, an OpenTelemetry Collector, or anything else that speaks the protocol.

---

## The symptom: an average that lied

MiningNiti — the document intelligence platform I maintain — has a FastAPI backend with 36 REST endpoints. Uploads fan out to several LLM providers, retrieval runs a hybrid pgvector + full-text search, and chat streams over SSE. The kind of service where "it's slow" can mean twelve different things.

The dashboard said mean latency was fine. Users said the app "hangs sometimes." Both were true, and that combination is the classic signature of a *concurrency* problem rather than a *speed* problem: nothing is individually slow, but requests are queueing behind each other somewhere invisible.

Logs couldn't tell me where. A log line records that something happened. What I needed was the shape of a request over time — what ran, in what order, what waited on what. That's a trace, and getting one out of FastAPI turned out to be far less work than I'd assumed.

---

## Why async Python hides latency specifically

FastAPI runs on an event loop. One thread, cooperatively juggling many in-flight requests. It only works because every `await` is a yield point where the loop can go serve somebody else.

Break that contract — call something synchronous and blocking inside a coroutine — and the loop doesn't just slow down for *that* request. It stops entirely. Every other connection waits, including the ones that had nothing to do with your slow call.

Here's the part that makes it hard to debug: the blocking request itself often looks *fine*. It's fast. It's the innocent requests behind it that eat the latency, and their logs will show a slow handler with no explanation for why. Averages smear this away completely; you only see it in the tail.

Three ways this sneaks into a real codebase:

- A synchronous DB driver (`psycopg2`, plain SQLAlchemy sessions) used inside `async def`
- A blocking HTTP client (`requests` instead of `httpx.AsyncClient`)
- CPU-heavy work — PDF parsing, embedding math, a cross-encoder rerank — called inline

All three are trivially visible in a trace waterfall and effectively invisible in logs.

---

## What you need before you start

- Python 3.10+ and a FastAPI app you can restart
- Somewhere to send data over OTLP — a self-hosted SigNoz, an OpenTelemetry Collector, or any OTLP-compatible backend. If you just want to see spans locally, `otel-tui` or a Collector with a `debug` exporter works.
- About twenty minutes

Install the packages:

```bash
pip install \
  opentelemetry-distro \
  opentelemetry-exporter-otlp \
  opentelemetry-instrumentation-fastapi \
  opentelemetry-instrumentation-sqlalchemy \
  opentelemetry-instrumentation-httpx \
  opentelemetry-instrumentation-logging
```

`opentelemetry-distro` pulls in the SDK plus the `opentelemetry-instrument` CLI. The rest are the library-specific instrumentors — install only the ones matching what you actually use.

---

## Step 1: Auto-instrumentation, the zero-code version

The fastest path adds no code at all. Wrap your existing start command:

```bash
OTEL_SERVICE_NAME=miningniti-api \
OTEL_RESOURCE_ATTRIBUTES=deployment.environment=production,service.version=1.4.0 \
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317 \
OTEL_EXPORTER_OTLP_PROTOCOL=grpc \
opentelemetry-instrument uvicorn app.main:app --host 0.0.0.0 --port 8000
```

That's a working setup. `opentelemetry-instrument` detects installed libraries at startup and patches them, so every HTTP request becomes a span, every SQLAlchemy query becomes a child span, and every outbound `httpx` call becomes another.

Two things worth setting straight away:

**`OTEL_SERVICE_NAME` is not cosmetic.** It's the primary dimension every backend groups by. Get it wrong once and you'll be untangling `unknown_service` in your dashboards for a week.

**`deployment.environment` saves you later.** Without it, staging traffic and production traffic land in the same charts and quietly ruin every percentile you look at.

---

## Step 2: Do it in code instead (you'll want to)

The CLI is great for a first look, but it gives you no hook for custom spans, and it doesn't play well with some process managers. In production I bootstrap explicitly:

```python
# app/observability.py
"""OpenTelemetry wiring. Imported once, before the app starts serving."""
import logging
import os

from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from opentelemetry.instrumentation.httpx import HTTPXClientInstrumentor
from opentelemetry.instrumentation.logging import LoggingInstrumentor
from opentelemetry.instrumentation.sqlalchemy import SQLAlchemyInstrumentor
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk.trace.sampling import ParentBased, TraceIdRatioBased


def setup_telemetry(app, engine) -> None:
    resource = Resource.create(
        {
            "service.name": os.getenv("OTEL_SERVICE_NAME", "miningniti-api"),
            "service.version": os.getenv("APP_VERSION", "dev"),
            "deployment.environment": os.getenv("APP_ENV", "local"),
        }
    )

    provider = TracerProvider(
        resource=resource,
        # Sample 100% locally, a fraction in production. See the sampling
        # section below for why ParentBased matters in a multi-service setup.
        sampler=ParentBased(
            root=TraceIdRatioBased(float(os.getenv("OTEL_TRACE_SAMPLE_RATIO", "1.0")))
        ),
    )
    provider.add_span_processor(BatchSpanProcessor(OTLPSpanExporter()))
    trace.set_tracer_provider(provider)

    # Health checks generate enormous span volume and tell you nothing.
    FastAPIInstrumentor.instrument_app(app, excluded_urls="health,healthz,metrics")
    SQLAlchemyInstrumentor().instrument(engine=engine)
    HTTPXClientInstrumentor().instrument()
    LoggingInstrumentor().instrument(set_logging_format=True)

    logging.getLogger(__name__).info("OpenTelemetry initialised")
```

Called from the app factory:

```python
# app/main.py
from fastapi import FastAPI
from app.db import engine
from app.observability import setup_telemetry

app = FastAPI(title="MiningNiti API")
setup_telemetry(app, engine)
```

Two details that cost me time:

`BatchSpanProcessor`, never `SimpleSpanProcessor` in production — the simple one exports synchronously on every span end, which is a network call on your hot path. You will have instrumented your service by making it slower.

`excluded_urls` matters more than it looks. A Kubernetes liveness probe every 5 seconds across 6 replicas is over 100,000 spans a day carrying zero information.

---

## Step 3: Read the waterfall

With that running, one upload request produced this shape:

```
POST /api/v1/documents/upload ─────────────────────────────── 3.9s
├── SELECT documents                              12ms
├── INSERT documents                               8ms
├── pdf.extract                                  410ms
├── SELECT organizations                        2,740ms   ← ???
└── enqueue.analysis                               31ms
```

A `SELECT` on a small, indexed table taking 2.7 seconds is not a slow query. It's a query that *waited*. And it waited because the event loop was busy elsewhere — the span's duration includes the time the coroutine sat ready-but-not-scheduled.

That's the tell, and it's the reason tracing found this and logging never would. A log line would have printed the query and its own execution time — a few milliseconds, entirely truthful, entirely useless. The span captures wall-clock time inside the request's context, which is what the user actually experiences.

---

## Step 4: Instrument what the libraries can't see

Auto-instrumentation covers the boundaries — HTTP in, SQL out, HTTP out. It knows nothing about *your* logic. In an AI backend that's most of the interesting latency: which provider you called, how many tokens came back, whether the cache hit.

```python
# app/agents/orchestrator.py
from opentelemetry import trace

tracer = trace.get_tracer(__name__)


async def classify_document(text: str, doc_id: str) -> dict:
    with tracer.start_as_current_span("agent.classify") as span:
        # Semantic conventions where they exist — your backend will render
        # gen_ai.* attributes as first-class fields rather than raw tags.
        span.set_attribute("gen_ai.system", "groq")
        span.set_attribute("gen_ai.request.model", "gpt-oss-120b")
        span.set_attribute("document.id", doc_id)
        span.set_attribute("document.chars", len(text))

        try:
            result = await groq_client.classify(text)
        except RateLimitError as exc:
            # record_exception attaches the stack trace to the span; set_status
            # is what actually turns the span red in the UI. Do both.
            span.record_exception(exc)
            span.set_status(trace.Status(trace.StatusCode.ERROR, "provider rate limit"))
            raise

        span.set_attribute("gen_ai.usage.output_tokens", result.usage.output_tokens)
        span.set_attribute("classification.confidence", result.confidence)
        return result
```

Three rules I follow for custom spans, learned by breaking each of them:

1. **Span names must be low cardinality.** `agent.classify`, never `agent.classify.doc_8f21c`. The name is a grouping key; put the identifier in an attribute where it belongs.
2. **Attributes are for filtering, not for storage.** Model name, provider, cache hit/miss, tenant ID — yes. The full prompt text — no. You'll blow up your ingest bill and, depending on the payload, leak user data into a system with different access controls than your database.
3. **`set_status(ERROR)` explicitly.** A caught-and-handled exception leaves the span green by default, which is how a fallback path can silently degrade for weeks with a perfectly healthy-looking dashboard.

For the concurrent fan-out, the parent-child structure is what makes the picture readable:

```python
async def analyse(doc_id: str, text: str) -> dict:
    with tracer.start_as_current_span("pipeline.analyse") as span:
        span.set_attribute("document.id", doc_id)

        # Child spans created inside gathered coroutines nest correctly —
        # context propagates across await boundaries via contextvars.
        entities, summary, safety = await asyncio.gather(
            extract_entities(text),
            summarise(text),
            analyse_safety(text),
            return_exceptions=True,
        )
        span.set_attribute(
            "pipeline.failed_agents",
            sum(isinstance(r, Exception) for r in (entities, summary, safety)),
        )
        return assemble(entities, summary, safety)
```

The waterfall now shows those three as genuinely parallel bars. If one provider is throttling you, its bar is visibly longer than the other two and the whole fan-out is pinned to it — a two-second read instead of a two-hour investigation.

---

## Step 5: Measure the event loop itself

Traces told me *that* the loop was stalling. To watch it over time and alert on it, I needed a metric. Event-loop lag is the cleanest one: schedule a callback for "now" and measure how late it actually fires.

```python
# app/observability_metrics.py
import asyncio
import time

from opentelemetry import metrics
from opentelemetry.exporter.otlp.proto.grpc.metric_exporter import OTLPMetricExporter
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.sdk.metrics.export import PeriodicExportingMetricReader

reader = PeriodicExportingMetricReader(OTLPMetricExporter(), export_interval_millis=15_000)
metrics.set_meter_provider(MeterProvider(metric_readers=[reader]))
meter = metrics.get_meter(__name__)

loop_lag = meter.create_histogram(
    "python.asyncio.event_loop.lag",
    unit="ms",
    description="Delay between a callback's scheduled and actual execution time",
)


async def monitor_event_loop(interval: float = 0.5) -> None:
    """Run as a background task for the lifetime of the process."""
    while True:
        start = time.perf_counter()
        await asyncio.sleep(interval)
        # Anything above `interval` is time the loop was not free to run us.
        lag_ms = (time.perf_counter() - start - interval) * 1000
        loop_lag.record(max(lag_ms, 0.0))
```

Wire it into the lifespan so it starts and stops with the app:

```python
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    task = asyncio.create_task(monitor_event_loop())
    yield
    task.cancel()

app = FastAPI(lifespan=lifespan)
```

A healthy loop sits in the single-digit milliseconds. Mine had a p99 in the hundreds. That number is now the alert I trust most, because unlike request latency it points at a *cause* rather than a symptom — and it fires before users notice.

---

## Step 6: The fix

The offending code was ordinary and, in isolation, completely reasonable:

```python
# Before — a synchronous session inside an async endpoint.
@router.post("/documents/upload")
async def upload(file: UploadFile, db: Session = Depends(get_db)):
    org = db.query(Organization).filter_by(id=org_id).one()   # blocks the loop
    text = extract_text(file.file)                            # blocks it harder
    ...
```

Two fixes, in order of how much they're worth:

**Move to a real async driver.** `asyncpg` via SQLAlchemy's `AsyncSession` means the database wait is a genuine `await` and the loop stays free:

```python
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

@router.post("/documents/upload")
async def upload(file: UploadFile, db: AsyncSession = Depends(get_async_db)):
    org = (await db.execute(select(Organization).filter_by(id=org_id))).scalar_one()
```

**Push genuinely blocking work to a thread.** PDF parsing is CPU-bound and no async driver will save you; it belongs off the loop:

```python
text = await asyncio.to_thread(extract_text, file.file)
```

There's a third option people forget: if a route is *entirely* synchronous, declare it `def` rather than `async def`. FastAPI runs sync routes in a threadpool automatically. The dangerous case is the half-migrated one — an `async def` that still calls blocking code — which is exactly what I had.

Reproduce your own before/after with a load test rather than trusting a single request:

```bash
# 50 concurrent connections, 30 seconds
hey -z 30s -c 50 -m POST -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/v1/documents/upload
```

On my machine the p95 came down from roughly 3.9s to under 400ms, and the event-loop lag p99 dropped from the high hundreds of milliseconds into single digits. Your absolute numbers will be different — the ratio and the shape of the change are the part that transfers.

---

## Step 7: Make logs and traces point at each other

A trace shows you *where*. A log shows you *what*. Correlating them is what turns twenty minutes of tab-switching into one click, and it costs almost nothing:

```python
import logging
from opentelemetry import trace

class TraceContextFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        ctx = trace.get_current_span().get_span_context()
        record.trace_id = format(ctx.trace_id, "032x") if ctx.is_valid else "-"
        record.span_id = format(ctx.span_id, "016x") if ctx.is_valid else "-"
        return True

handler = logging.StreamHandler()
handler.addFilter(TraceContextFilter())
handler.setFormatter(
    logging.Formatter(
        '{"ts":"%(asctime)s","level":"%(levelname)s","logger":"%(name)s",'
        '"msg":"%(message)s","trace_id":"%(trace_id)s","span_id":"%(span_id)s"}'
    )
)
logging.basicConfig(handlers=[handler], level=logging.INFO)
```

`LoggingInstrumentor` (already enabled above) does a version of this for you, but a hand-rolled filter gives you JSON in the exact shape your log pipeline wants. Either way, once `trace_id` is a field, any backend that ingests both signals — SigNoz does this natively — will let you jump from a red span straight to the log lines emitted inside it.

---

## Step 8: Sampling, before the bill arrives

At 100% sampling, a busy service produces a genuinely absurd volume of spans, most of them describing requests that were completely fine.

```bash
# Keep 10% of traces, but never break an existing one mid-flight.
OTEL_TRACES_SAMPLER=parentbased_traceidratio
OTEL_TRACES_SAMPLER_ARG=0.1
```

The `parentbased_` prefix is the important half. It means that if an upstream service already decided to sample a trace, this service honours that decision. Without it, each service samples independently and you get traces with holes in them — which is arguably worse than no trace at all, because the gap looks like a service that didn't get called.

Head sampling has a real limitation: the decision happens at the *start* of the trace, before you know whether the request failed or was slow. Drop to 10% and you drop 90% of your errors too. The usual answer is tail sampling in the Collector — buffer each trace, decide once it's complete:

```yaml
# otel-collector-config.yaml
processors:
  tail_sampling:
    decision_wait: 10s
    policies:
      - name: keep-all-errors
        type: status_code
        status_code: { status_codes: [ERROR] }
      - name: keep-slow-requests
        type: latency
        latency: { threshold_ms: 1000 }
      - name: sample-the-boring-rest
        type: probabilistic
        probabilistic: { sampling_percentage: 5 }
```

Every error, every slow request, and a 5% sample of healthy traffic for baselines. That's the ratio I'd start from — and note it requires the Collector, since a single service instance can't make tail decisions for a distributed trace on its own.

---

## The gotcha list

Things that cost me an hour or more each:

| Symptom | Cause | Fix |
|---|---|---|
| No spans at all, no errors | `BatchSpanProcessor` never flushed before exit | Call `provider.shutdown()` on shutdown; check the endpoint port (4317 gRPC vs 4318 HTTP) |
| Spans appear, no parent/child nesting | Instrumentation set up after the app started, or a fresh event loop per worker | Bootstrap before serving; with Gunicorn, initialise in `post_fork` |
| `service.name` shows `unknown_service` | Resource never reached the provider | Set `OTEL_SERVICE_NAME` *or* pass `Resource.create(...)` — CLI env vars don't apply to a hand-built provider |
| Thousands of near-identical endpoints in the UI | Path parameters baked into span names | Confirm the FastAPI instrumentor is producing route templates (`/documents/{id}`), not raw paths |
| Ingest bill spikes overnight | Health checks, or high-cardinality attributes | `excluded_urls`; audit attributes for IDs and free text |
| Traces stop at the queue boundary | Context isn't propagated into background tasks | Inject the context on enqueue, extract on dequeue |

That last one deserves a note. Background work is a separate trace unless you carry the context across explicitly:

```python
from opentelemetry.propagate import inject, extract

# Producer
carrier: dict[str, str] = {}
inject(carrier)
await queue.put({"doc_id": doc_id, "traceparent": carrier})

# Consumer
job = await queue.get()
ctx = extract(job["traceparent"])
with tracer.start_as_current_span("worker.analyse", context=ctx):
    ...
```

Without those six lines, the upload trace ends at "enqueued" and the actual work — where the time goes — lives in an orphan trace you'd have to find by timestamp.

---

## FAQ

**Does OpenTelemetry slow FastAPI down?**
Measurably, but not meaningfully at sane sampling rates — the SDK batches and exports on a background thread. The two ways to make it hurt are `SimpleSpanProcessor` (synchronous export on your request path) and unbounded high-cardinality attributes. Both are configuration mistakes rather than properties of the library.

**Auto-instrumentation or manual?**
Both. Auto-instrumentation gives you the boundaries — HTTP, SQL, outbound calls — for almost no effort, and that alone answers most "where is the time going" questions. Add manual spans only where your own logic is the interesting part.

**Do I need SigNoz specifically?**
No. Everything here is vendor-neutral OTLP; the same code exports to any compliant backend. What you do need is a backend that ingests traces, metrics *and* logs together, because the trace-to-log jump is where most of the debugging value actually lives. SigNoz is what I run — self-hosted, and it stores all three — but the instrumentation is the durable part. Backends are swappable.

**Why not just use Prometheus metrics?**
Metrics tell you *that* p95 is bad. They can't tell you which of the eleven things inside the request was responsible. Use both: metrics to alert, traces to diagnose. The event-loop lag histogram above is a good example of the division of labour — it's the metric that pages you, and the trace is what you open next.

---

## What I'd tell myself six months ago

Instrument the boundaries before you have a problem. The whole setup above is under a hundred lines, and the reason it felt worth writing up is that I did it *after* — reproducing a bug for two days that a trace waterfall would have shown me in about ninety seconds.

The specific lesson, though, is narrower than "add tracing." It's that async Python fails in a way that averages actively conceal. A request that blocks the event loop hurts *other* requests, so the code you need to fix is nowhere near the code that looks slow. Traces make that dependency visible, and the event-loop lag metric turns it into something you can alert on before anyone files a ticket.

If you're running FastAPI in production without either, that's the place to start — not because observability is virtuous, but because you're currently debugging with the one tool that structurally cannot see the problem.

---

*Building something similar, or want to compare notes on async Python observability? I'm at [milansoni.vercel.app](https://milansoni.vercel.app) — or find the FastAPI backend this came from on [GitHub](https://github.com/Iammilansoni/MiningNiti).*
