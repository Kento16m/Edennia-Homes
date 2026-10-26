import { ArrowRight, ArrowUp, Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/layout/Logo";
import { home } from "@/content/home";

const t = home.footer;
const contact = home.contact;

function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "success" | "error">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setState("error");
      return;
    }
    setState("success");
  };

  if (state === "success") {
    return <p className="text-sm text-gold">{t.columns.newsletter.success}</p>;
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <div className="flex items-center gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setState("idle");
          }}
          placeholder={t.columns.newsletter.placeholder}
          aria-label={t.columns.newsletter.placeholder}
          className="w-full rounded-full border border-forest-foreground/20 bg-forest-foreground/5 px-5 py-3 text-sm text-forest-foreground outline-none transition placeholder:text-forest-foreground/50 focus:border-gold"
        />
        <button
          type="submit"
          aria-label={t.columns.newsletter.subscribe}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-forest transition hover:opacity-90"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
      {state === "error" && <p className="text-xs text-gold">{t.columns.newsletter.error}</p>}
    </form>
  );
}

export function Footer() {
  const socials = [
    { icon: Instagram, label: "Instagram" },
    { icon: Facebook, label: "Facebook" },
    { icon: Linkedin, label: "LinkedIn" },
  ];
  const propertyLinks = [
    { label: "Casas Unifamiliares", href: "/propiedades?type=casas" },
    { label: "Apartamentos", href: "/propiedades?type=apartamentos" },
    { label: "Condominios", href: "/propiedades?type=condominios" },
    { label: "Oportunidades de Inversión", href: "/propiedades?type=oportunidades" },
  ];

  return (
    <footer className="bg-forest text-forest-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo variant="light" height={34} className="inline-block" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-forest-foreground/70">{t.tagline}</p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-forest-foreground/20 transition hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-gold">{t.columns.properties.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-forest-foreground/70">
              {propertyLinks.map(({ label, href }) => (
                <li key={label}><a href={href} className="transition hover:text-forest-foreground">{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-gold">{t.columns.legal.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-forest-foreground/70">
              {t.columns.legal.links.map((l) => (
                <li key={l}><a href="#" className="transition hover:text-forest-foreground">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-gold">{t.columns.contact.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-forest-foreground/70">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /><a href={contact.phoneHref} className="transition hover:text-forest-foreground">{contact.phone}</a></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /><a href={`mailto:${contact.email}`} className="transition hover:text-forest-foreground">{contact.email}</a></li>
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{contact.address}</li>
            </ul>
            <p className="mt-6 text-xs font-semibold tracking-[0.25em] text-gold">{t.columns.newsletter.title}</p>
            <div className="mt-4"><Newsletter /></div>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-forest-foreground/15 pt-6 text-xs text-forest-foreground/60">
          <p>{t.bottom}</p>
          <a href="#inicio" className="flex items-center gap-2 font-medium text-forest-foreground transition hover:text-gold">
            {t.backToTop}<ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
