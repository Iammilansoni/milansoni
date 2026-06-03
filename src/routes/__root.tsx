import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

import appCss from "../styles.css?url";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";
import { ScrollProgress } from "@/components/scroll-progress";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Preloader } from "@/components/preloader";
import { SoundProvider } from "@/lib/sound";
import { AmbientBlobs } from "@/components/ambient-blobs";
import { SITE } from "@/lib/site";

function NotFoundComponent() {
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
      { property: "og:title", content: SITE.title },
      { property: "og:description", content: SITE.description },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE.title },
      { name: "twitter:description", content: SITE.description },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: SITE.name,
          jobTitle: "Software Engineer & GenAI Engineer",
          email: SITE.email,
          address: { "@type": "PostalAddress", addressLocality: "Churu", addressRegion: "Rajasthan", addressCountry: "IN" },
          sameAs: [SITE.socials.github, SITE.socials.linkedin, SITE.socials.medium],
          knowsAbout: ["Full Stack Development", "Generative AI", "RAG", "Agentic AI", "LangChain", "FastAPI", "Next.js"],
        }),
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
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const [cmdOpen, setCmdOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <SoundProvider>
        {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
        
        {preloaderDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="fixed inset-0 z-50 pointer-events-none noise" aria-hidden="true" />
            {/* Global ambient drifting blobs — visible on every page */}
            <AmbientBlobs className="fixed z-1" opacity={0.6} />
            <CustomCursor />
            <ScrollProgress />
            <Nav onOpenCommand={() => setCmdOpen(true)} />
            <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
            <main className="pt-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={router.state.location.pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </main>
            <Footer />
          </motion.div>
        )}
      </SoundProvider>
    </QueryClientProvider>
  );
}
