import { useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import { home } from "@/content/home";
import { cn } from "@/lib/utils";
import { LanguageSelector } from "./LanguageSelector";

const t = home.header;

export function CtaPill({ label, href = "#" }: { label: string; href?: string }) {
  return (
    <a href={href} className="group flex h-11 items-center gap-3 rounded-full bg-forest pl-5 pr-1.5 text-sm font-medium text-forest-foreground shadow-soft transition hover:bg-forest/90">
      {label}
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-foreground text-forest transition group-hover:translate-x-0.5">
        <ArrowRight className="h-4 w-4" />
      </span>
    </a>
  );
}

export function Header({ variant = "default" }: { variant?: "default" | "properties" }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname.replace(/\/$/, "");
  const solid = variant === "properties";
  const type = typeof location.search === "object" && location.search ? (location.search as { type?: string }).type : undefined;

  return (
    <header className={cn("absolute inset-x-0 top-0 z-30 px-4 pt-4 md:px-8 md:pt-6", solid && "z-40")}>
      <div className={cn("mx-auto flex max-w-7xl items-center justify-between gap-4", solid && "rounded-full border border-[#D9DEDA] bg-white px-3 py-2 shadow-[0_8px_24px_rgba(11,20,16,0.06)]")}>
        <a href="#inicio" className={cn("flex h-14 items-center rounded-full px-5", solid ? "bg-white" : "glass-light shadow-soft")}>
          <Logo variant="dark" height={30} className="h-[30px] w-auto" />
        </a>
        <nav aria-label="Principal" className={cn("hidden items-center gap-1 xl:flex", solid ? "rounded-full border border-[#E8ECE8] bg-white p-1" : "glass rounded-full p-1.5")}>
          {t.nav.map((n) => {
            const active =
              (n.label === "Inicio" && currentPath === "/") ||
              (currentPath === "/propiedades" && n.href === "/propiedades?type=casas" && type === "casas") ||
              (currentPath === "/propiedades" && n.href === "/propiedades?type=apartamentos" && type === "apartamentos") ||
              (currentPath === "/propiedades" && n.href === "/propiedades?type=condominios" && type === "condominios") ||
              (currentPath === "/propiedades" && n.href === "/propiedades?type=oportunidades" && type === "oportunidades");

            return (
              <a
                key={n.label}
                href={n.href}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition",
                  active
                    ? solid
                      ? "bg-[#0B1410] text-white"
                      : "bg-forest-foreground text-forest"
                    : solid
                      ? "text-[#0B1410] hover:bg-[#F3F5F3]"
                      : "text-forest-foreground hover:bg-forest-foreground/20",
                )}
              >
                {n.label}
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSelector solid={solid} />
          <div className="hidden sm:block"><CtaPill label={t.cta} /></div>
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? t.close : t.menu}
            aria-expanded={open}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full xl:hidden",
              solid ? "border border-[#D9DEDA] bg-white text-[#0B1410]" : "glass text-forest-foreground",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className={cn("mt-3 rounded-3xl p-3 shadow-soft xl:hidden", solid ? "border border-[#D9DEDA] bg-white" : "glass-light")}>
          {t.nav.map((n) => (
            <a key={n.label} href={n.href} onClick={() => setOpen(false)} className={cn("block rounded-2xl px-4 py-3 font-medium", solid ? "text-[#0B1410] hover:bg-[#F0F3F1]" : "text-foreground hover:bg-primary-soft")}>
              {n.label}
            </a>
          ))}
          <div className="mt-2 sm:hidden"><CtaPill label={t.cta} /></div>
        </nav>
      )}
    </header>
  );
}
