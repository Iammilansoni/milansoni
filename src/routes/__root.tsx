import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import appCss from "../styles.css?url";
import { Toaster } from "sonner";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";
import { ScrollProgress } from "@/components/scroll-progress";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Preloader } from "@/components/preloader";
import { SoundProvider } from "@/lib/sound";
import { AmbientBlobs } from "@/components/ambient-blobs";
import { AiChat } from "@/components/ai-chat";
import { SITE } from "@/lib/site";

function NotFoundComponent() {
  useEffect(() => {
    // 404 analytics — replace with your analytics provider (e.g. Plausible, GA4)
    console.warn("[404]", window.location.pathname);
    // Example: window.plausible?.("404", { props: { path: window.location.pathname } });
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <div className="aurora-bg" />
      <div className="relative max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Error 404</p>
        <h1 className="mt-3 font-display text-6xl text-aurora">Page not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page drifted off into the aurora. Let's get you back.
        </p>
        <a href="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm text-background hover:opacity-90 transition">
          Return home →
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <div className="aurora-bg" />
      <div className="relative max-w-md text-center">
        <h1 className="font-display text-3xl">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">Something went wrong on our end.</p>
        <div className="mt-4 text-left p-4 bg-red-950/30 text-red-400 text-xs font-mono rounded-xl overflow-auto">
          <strong>{error.message}</strong>
          <pre className="mt-2 whitespace-pre-wrap">{error.stack}</pre>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-foreground px-5 py-2 text-sm text-background hover:opacity-90 transition"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-hairline px-5 py-2 text-sm hover:bg-secondary transition">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE.title },
      { name: "description", content: SITE.description },
      { name: "author", content: SITE.name },
      { name: "theme-color", content: "#0a0a14" },
      { property: "og:site_name", content: SITE.name },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Milan Soni Portfolio | Software Engineer & GenAI Engineer" },
      { property: "og:description", content: "Explore Milan Soni's projects, achievements, AI applications, and software engineering experience." },
      { property: "og:image", content: "https://milansoni.vercel.app/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: "https://milansoni.vercel.app/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE.title },
      { name: "twitter:description", content: SITE.description },
      { name: "twitter:image", content: "https://milansoni.vercel.app/og-image.png" },
      { name: "google-site-verification", content: "L3TBX1KozzyAAwqXHcrELsfYueIeeoL2SWV13-pXI4Y" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: "https://milansoni.vercel.app/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      { rel: "icon", href: "/ms-logo.png", type: "image/png", sizes: "any" },
      { rel: "shortcut icon", href: "/ms-logo.png" },
      { rel: "apple-touch-icon", href: "/ms-logo.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: SITE.name,
            jobTitle: "Software Engineer & GenAI Engineer",
            email: SITE.email,
            url: "https://milansoni.vercel.app/",
            alumniOf: {
              "@type": "CollegeOrUniversity",
              name: "Global Institute of Technology"
            },
            award: "Smart India Hackathon 2023 National Winner",
            address: { "@type": "PostalAddress", addressLocality: "Churu", addressRegion: "Rajasthan", addressCountry: "IN" },
            sameAs: [SITE.socials.github, SITE.socials.linkedin, SITE.socials.medium, SITE.socials.instagram],
            knowsAbout: ["Full Stack Development", "Generative AI", "RAG", "Agentic AI", "LangChain", "FastAPI", "React", "TypeScript", "Python"],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE.title,
            url: "https://milansoni.vercel.app/",
            description: SITE.description,
            author: {
              "@type": "Person",
              name: SITE.name
            }
          }
        ]),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* Skip to main content — keyboard/screen reader accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-99999 focus:rounded-full focus:bg-foreground focus:text-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:outline-none focus:ring-2 focus:ring-aurora-1"
        >
          Skip to main content
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const [cmdOpen, setCmdOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const reduce = useReducedMotion();

  return (
    <QueryClientProvider client={queryClient}>
      <SoundProvider>
        {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
        
        {/* 
          Always render the main content so that it is included in the SSR HTML payload.
          This allows AI bots and search engine crawlers to read the content.
          We visually hide it until the preloader finishes using opacity and pointer-events. 
        */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: preloaderDone ? 1 : 0 }}
          transition={{ duration: 1 }}
          style={{
            pointerEvents: preloaderDone ? "auto" : "none",
            height: preloaderDone ? "auto" : "100vh",
            overflow: preloaderDone ? "visible" : "hidden"
          }}
        >
          <div className="fixed inset-0 z-50 pointer-events-none noise" aria-hidden="true" />
          {/* Global ambient drifting blobs — visible on every page */}
          <AmbientBlobs className="fixed z-1" opacity={0.6} />
          <CustomCursor />
          <ScrollProgress />
          <Nav onOpenCommand={() => setCmdOpen(true)} />
          <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
          <main id="main-content" className="pt-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.25 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
          <Footer />
          <AiChat />
          <Toaster theme="dark" position="bottom-right" richColors />
        </motion.div>
      </SoundProvider>
    </QueryClientProvider>
  );
}
