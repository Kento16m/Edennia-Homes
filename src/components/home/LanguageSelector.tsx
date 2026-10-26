import { useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { languages } from "@/config/languages";
import { home } from "@/content/home";
import { cn } from "@/lib/utils";

export function LanguageSelector({ solid = false }: { solid?: boolean }) {
  const [active, setActive] = useState("es");
  const [open, setOpen] = useState(false);
  const current = languages.find((l) => l.code === active)!;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={home.header.language}
        className={cn(
          "flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition",
          solid
            ? "border border-[#D9DEDA] bg-white text-[#0B1410] hover:bg-[#F5F7F5]"
            : "glass text-forest-foreground hover:bg-forest-foreground/25",
        )}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{current.label}</span>
        <ChevronDown className="h-3.5 w-3.5 opacity-70" />
      </PopoverTrigger>
      <PopoverContent align="end" className={cn("w-52 rounded-3xl p-2 shadow-soft", solid ? "border border-[#D9DEDA] bg-white" : "glass-light")}>
        <ul role="listbox" aria-label={home.header.language}>
          {languages.filter((l) => l.enabled).map((l) => {
            const isActive = l.code === active;
            return (
              <li key={l.code}>
                <button
                  role="option"
                  aria-selected={isActive}
                  onClick={() => { setActive(l.code); setOpen(false); }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm transition hover:bg-primary-soft",
                    isActive ? "font-semibold text-primary" : "text-foreground",
                  )}
                >
                  {l.label}
                  {isActive && <Check className="h-4 w-4" />}
                </button>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
