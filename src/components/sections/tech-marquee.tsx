import * as React from "react";
import { motion } from "framer-motion";
import { 
  SiPython, SiFastapi, SiNodedotjs, SiExpress, SiLangchain, 
  SiRedis, SiPostgresql, SiMongodb, SiPrisma,
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiCplusplus,
  SiTailwindcss, SiRedux, SiGraphql, SiDocker,
  SiVercel, SiLinux
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { Brain, Network, Cpu, Layers, GitMerge, FileJson, DatabaseZap } from "lucide-react";

const ROW_1 = [
  { name: "Python", icon: SiPython },
  { name: "FastAPI", icon: SiFastapi },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express.js", icon: SiExpress },
  { name: "LangChain", icon: SiLangchain },
  { name: "LangGraph", icon: Network },
  { name: "LLMs", icon: Brain },
  { name: "RAG Pipelines", icon: Layers },
  { name: "Hybrid Search", icon: DatabaseZap },
  { name: "FlashRank", icon: Cpu },
  { name: "pgvector", icon: SiPostgresql },
  { name: "Redis HNSW", icon: SiRedis },
  { name: "Supabase", icon: SiPostgresql },
  { name: "AI Agents", icon: Network }
];

const ROW_2 = [
  { name: "React 19", icon: SiReact },
  { name: "Next.js 16", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript (ES6+)", icon: SiJavascript },
  { name: "C++", icon: SiCplusplus },
  { name: "Tailwind CSS v4", icon: SiTailwindcss },
  { name: "Framer Motion", icon: SiRedux },
  { name: "Clerk Auth", icon: SiGraphql },
  { name: "Groq / Cerebras / Mistral", icon: FaAws },
  { name: "Docker Compose", icon: SiDocker },
  { name: "GitHub Actions", icon: GitMerge },
  { name: "Vercel + HuggingFace", icon: SiVercel },
  { name: "Linux", icon: SiLinux },
  { name: "REST APIs", icon: FileJson }
];

export function TechMarquee() {
  // Duplicate arrays for seamless infinite scroll
  const row1 = [...ROW_1, ...ROW_1, ...ROW_1];
  const row2 = [...ROW_2, ...ROW_2, ...ROW_2];

  return (
    <section className="relative overflow-hidden py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground text-center">
          Tooling Ecosystem
        </p>
      </div>

      <div 
        className="relative flex flex-col gap-6 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
        }}
      >
        {/* Top Row - Scrolling Left */}
        <motion.div
          className="flex gap-4 w-max"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40,
          }}
        >
          {row1.map((tech, i) => (
            <div 
              key={i} 
              className="flex items-center gap-2.5 px-6 py-3 rounded-full glass border border-hairline whitespace-nowrap text-sm font-mono text-muted-foreground hover:text-aurora-2 hover:border-aurora-2/30 hover:bg-secondary/40 transition-colors duration-300"
            >
              <tech.icon className="h-4 w-4" />
              <span>{tech.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Bottom Row - Scrolling Right */}
        <motion.div
          className="flex gap-4 w-max"
          animate={{ x: ["-33.33%", "0%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35,
          }}
        >
          {row2.map((tech, i) => (
            <div 
              key={i} 
              className="flex items-center gap-2.5 px-6 py-3 rounded-full glass border border-hairline whitespace-nowrap text-sm font-mono text-muted-foreground hover:text-aurora-1 hover:border-aurora-1/30 hover:bg-secondary/40 transition-colors duration-300"
            >
              <tech.icon className="h-4 w-4" />
              <span>{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
