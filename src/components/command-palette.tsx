import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { NAV, SITE } from "@/lib/site";
import { Download, FileText, Trophy, Mail, Github, Linkedin, PenLine } from "lucide-react";

export function CommandPalette({
  open, onOpenChange,
}: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const go = (to: string) => {
    onOpenChange(false);
    navigate({ to });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE.socials.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onOpenChange(false);
    }, 1000);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => window.open("/MilanSoni_resume.pdf", "_blank")}>
            <Download className="mr-2 h-4 w-4" />
            <span>Download Resume</span>
          </CommandItem>
          <CommandItem onSelect={copyEmail}>
            <Mail className="mr-2 h-4 w-4" />
            <span>{copied ? "Copied to clipboard!" : "Copy Email Address"}</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Projects & Proofs">
          <CommandItem onSelect={() => window.open("https://github.com/Iammilansoni/MiningNiti", "_blank")}>
            <Trophy className="mr-2 h-4 w-4 text-aurora-1" />
            <span>SIH 2023 National Winner (MiningNiti)</span>
          </CommandItem>
          <CommandItem onSelect={() => window.open("https://drive.google.com/file/d/11DTgnEqtFGIB-PpX-SKyheMCue5xRe-_/view", "_blank")}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Scopus Indexed Paper (PICET-26)</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />
        
        <CommandGroup heading="Navigation">
          {NAV.map((n) => (
            <CommandItem key={n.to} onSelect={() => go(n.to)}>
              <FileText className="mr-2 h-4 w-4 opacity-50" />
              <span>{n.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Social Links">
          <CommandItem onSelect={() => window.open(SITE.socials.github, "_blank")}>
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </CommandItem>
          <CommandItem onSelect={() => window.open(SITE.socials.linkedin, "_blank")}>
            <Linkedin className="mr-2 h-4 w-4" />
            <span>LinkedIn</span>
          </CommandItem>
          <CommandItem onSelect={() => window.open(SITE.socials.medium, "_blank")}>
            <PenLine className="mr-2 h-4 w-4" />
            <span>Medium</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
