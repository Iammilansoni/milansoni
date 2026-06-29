import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { SITE, EXPERIENCE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Milan Soni | Software Engineer & Researcher" },
      { name: "description", content: "Learn about Milan Soni's background, education at Global Institute of Technology, and journey as a GenAI engineer and full-stack developer." },
      { property: "og:title", content: "About Milan Soni | Software Engineer & Researcher" },
      { property: "og:description", content: "Learn about Milan Soni's background, education at Global Institute of Technology, and journey as a GenAI engineer and full-stack developer." },
      { property: "og:url", content: "https://milansoni.vercel.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://milansoni.vercel.app/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          dateCreated: "2024-01-01T00:00:00Z",
          dateModified: "2024-05-01T00:00:00Z",
          mainEntity: {
            "@type": "Person",
            name: SITE.name,
            jobTitle: "Software Engineer & GenAI Engineer",
            alumniOf: {
              "@type": "CollegeOrUniversity",
              name: "Global Institute of Technology"
            }
          }
        }),
      }
    ]
  }),
  component: About,
});

function About() {
  return (
    <div className="relative">
      <div className="aurora-bg opacity-60" />
      <div className="relative mx-auto max-w-3xl px-6 py-24">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">About</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl leading-none tracking-tight">
            I build software the way <span className="text-aurora">good companies do.</span>
          </h1>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7 space-y-8 text-lg leading-relaxed text-muted-foreground">
            <Reveal>
              <p className="leading-relaxed">
                I'm Milan — a Computer Science graduate from Jaipur. I spent the last few years doing
                one thing on repeat: taking vague, real-world problems and turning them into working
                software that people actually use.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p>
                In 2023, my team won <span className="text-foreground">Smart India Hackathon</span> as
                National Winners — for the Ministry of Coal problem statement — by building an AI
                document intelligence platform for the Ministry of Coal. That was the moment I knew
                I wanted to build at the intersection of <span className="text-foreground">full-stack engineering</span>{" "}
                and <span className="text-foreground">applied AI</span>.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Since then I've shipped production systems at three companies — an enterprise AI
                testing platform on FastAPI + Redis with two-stage retrieval (NLPForge), a multi-tenant financial intelligence
                SaaS on Next.js + Node (FinSageAI360), and a LangChain-powered document workflow engine for
                logistics (Om Logistics). My latest work includes deploying 6 specialized AI agents
                across 4 providers (Groq, Cerebras, Mistral, Gemini) on $0/month infrastructure.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                The pattern I keep coming back to: <span className="text-foreground italic">most of the value isn't in the model — it's in the system around it.</span>{" "}
                Retrieval, evaluation, guardrails, UI, latency, auth, deploys. I'm here to build
                all of it.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-display text-3xl text-foreground not-italic mt-12 border-l-2 border-aurora-1 pl-6">
                Right now I'm looking for engineering roles where I can ship product end-to-end —
                ideally somewhere that takes AI seriously as a craft, not a buzzword.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-5 space-y-8">
            <Reveal delay={0.1}>
              <div className="glass rounded-3xl p-8 sticky top-32">
                <h3 className="font-display text-2xl mb-6 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-aurora-2" /> Journey
                </h3>
                <div className="space-y-6">
                  {EXPERIENCE.map((exp, i) => (
                    <div key={i} className="relative pl-6 border-l border-hairline">
                      <span className="absolute -left-1.5 top-2 h-3 w-3 rounded-full bg-background border-2 border-aurora-3" />
                      <div className="text-xs font-mono text-muted-foreground mb-1">{exp.period}</div>
                      <div className="font-medium text-foreground">{exp.role}</div>
                      <div className="text-sm text-muted-foreground">{exp.company}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.25}>
          <div className="mt-20 flex flex-wrap items-center gap-4 border-t border-hairline pt-10">
            <Magnetic strength={20}>
              <Link to="/contact" className="rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background hover:opacity-90 transition">
                Get in touch
              </Link>
            </Magnetic>
            <Magnetic strength={20}>
              <a href={SITE.socials.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-hairline px-6 py-4 text-sm hover:bg-secondary transition">
                LinkedIn →
              </a>
            </Magnetic>
            <Magnetic strength={20}>
              <a href={SITE.socials.github} target="_blank" rel="noreferrer" className="rounded-full border border-hairline px-6 py-4 text-sm hover:bg-secondary transition">
                GitHub →
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
