import { Reveal } from "@/components/reveal";
import { Tilt } from "@/components/ui/tilt";
import { GraduationCap, Award, BookOpen, Star, ArrowUpRight, Users, Network } from "lucide-react";

export function Education() {
  const coursework = [
    "Data Structures & Algorithms",
    "Artificial Intelligence",
    "Database Management Systems",
    "Operating Systems",
    "Computer Networks",
    "Object-Oriented Programming"
  ];

  return (
    <section className="relative py-28 overflow-hidden bg-background">
      <div className="absolute inset-0 aurora-bg opacity-30 mix-blend-screen pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Foundation</p>
          <h2 className="mt-3 font-display text-4xl md:text-6xl max-w-3xl">
            Education & <span className="text-aurora">Credentials.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Degree Card */}
          <Tilt className="md:col-span-8">
            <div className="glass rounded-4xl p-8 md:p-12 h-full flex flex-col relative overflow-hidden group hover:bg-secondary/20 transition duration-700 border border-aurora-1/10 hover:border-aurora-1/30">
              
              {/* Massive subtle watermark */}
              <div className="absolute -right-20 -top-20 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000 pointer-events-none group-hover:scale-105 transform origin-center">
                <Network className="w-[500px] h-[500px] text-aurora-1" />
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-aurora-1 mb-6 border border-aurora-1/20 bg-aurora-1/10 rounded-full px-3 py-1 w-max">
                  <Star className="w-3 h-3 fill-aurora-1 text-aurora-1" />
                  B.Tech Computer Science
                </div>
                
                <h3 className="font-display text-4xl md:text-5xl mb-2 text-foreground max-w-lg">
                  Global Institute of Technology
                </h3>
                <p className="text-muted-foreground text-lg mb-8">Jaipur, Rajasthan · Oct 2022 – May 2026</p>
                
                {/* Core Coursework Tags - Fills the empty space beautifully */}
                <div className="mb-12">
                  <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Core Coursework</p>
                  <div className="flex flex-wrap gap-2 max-w-xl">
                    {coursework.map((course) => (
                      <span key={course} className="px-4 py-2 rounded-full border border-hairline bg-background/50 text-xs font-medium text-foreground hover:border-aurora-1/50 transition-colors cursor-default">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto grid grid-cols-2 gap-4 border-t border-hairline pt-8">
                  <div>
                    <div className="font-display text-4xl text-aurora">8.10</div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Cumulative GPA</div>
                  </div>
                  <div>
                    <div className="font-display text-4xl text-gradient">2026</div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Graduation Year</div>
                  </div>
                </div>
              </div>
            </div>
          </Tilt>

          {/* Certifications & Roles */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <Tilt className="flex-1">
              <div className="glass rounded-4xl p-8 h-full flex flex-col justify-center relative overflow-hidden group hover:bg-secondary/40 transition duration-500">
                <Award className="w-8 h-8 text-aurora-2 mb-4 group-hover:scale-110 transition-transform duration-500" />
                <h4 className="font-display text-2xl text-foreground mb-2">NASSCOM Certified</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Full Stack Developer certification by IT-ITeS Sector Skills Council (2024).
                </p>
                <div className="text-[10px] uppercase tracking-widest text-aurora-2 border-t border-hairline pt-3 mt-auto">
                  Industry Credential
                </div>
              </div>
            </Tilt>
            
            <Tilt className="flex-1">
              <div className="glass rounded-4xl p-8 h-full flex flex-col justify-center relative overflow-hidden group hover:bg-secondary/40 transition duration-500">
                <BookOpen className="w-8 h-8 text-aurora-3 mb-4 group-hover:scale-110 transition-transform duration-500" />
                <h4 className="font-display text-2xl text-foreground mb-2">Hackathon Organizer</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  CodeFiesta (2023–2025). Managed logistics, scaling, and technical operations.
                </p>
                <div className="text-[10px] uppercase tracking-widest text-aurora-3 border-t border-hairline pt-3 mt-auto">
                  Community Leadership
                </div>
              </div>
            </Tilt>
            <Tilt className="flex-1">
              <div className="glass rounded-4xl p-8 h-full flex flex-col justify-center relative overflow-hidden group hover:bg-secondary/40 transition duration-500">
                <Users className="w-8 h-8 text-aurora-1 mb-4 group-hover:scale-110 transition-transform duration-500" />
                <h4 className="font-display text-2xl text-foreground mb-2">Academic Leadership</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Class Representative (2 yrs) and volunteer programming tutor for junior students.
                </p>
                <div className="text-[10px] uppercase tracking-widest text-aurora-1 border-t border-hairline pt-3 mt-auto">
                  Mentorship & Impact
                </div>
              </div>
            </Tilt>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6">
          {/* Academic Honors Banner */}
          <Tilt className="w-full">
            <div className="glass rounded-4xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group hover:bg-secondary/20 transition duration-700 border border-aurora-1/20">
              <div className="absolute inset-0 bg-linear-to-r from-aurora-1/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
                <div className="p-4 rounded-2xl border border-aurora-1/20 bg-background/50 shrink-0">
                  <Award className="w-8 h-8 text-aurora-1" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 text-[10px] font-mono text-aurora-1 mb-2 uppercase tracking-widest">
                    🥇 First Place Winner · Jigyasa Event
                  </div>
                  <h4 className="font-display text-2xl md:text-3xl text-foreground mb-2">Blockchain Technology Presentation</h4>
                  <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                    Awarded first place at GIT Jaipur for presenting advanced architectural insights into Blockchain technology, smart contracts, and decentralized systems.
                  </p>
                </div>
              </div>
              <div className="relative z-10 shrink-0 w-full md:w-auto mt-4 md:mt-0">
                <a href="https://www.linkedin.com/in/sonimilan/overlay/1720793634608/single-media-viewer/?profileId=ACoAAD8piA8BZ-BgPuiIf8eBWQ8P0fjWXPcdZbw" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-full md:w-auto gap-2 text-sm font-medium px-6 py-3 rounded-full bg-foreground text-background hover:bg-aurora-1 hover:text-white transition-colors">
                  View Presentation <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Tilt>
        </div>
      </div>
    </section>
  );
}
