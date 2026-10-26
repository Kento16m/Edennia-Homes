import { ArrowRight, Bath, BedDouble, Car, Check, Compass, FileCheck2, HeartHandshake, MapPin, Ruler, Sparkles, UserRound, Stamp } from "lucide-react";
import { getCardFacts, getPropertyView } from "@/data/adapter";
import { home } from "@/content/home";
import { properties, type Property } from "@/data/properties";
import { cn } from "@/lib/utils";
import { FadeUp, Eyebrow, SectionHeading } from "./primitives";

export function Categories() {
  const t = home.categories;
  return (
    <section id="categorias" className="mx-auto max-w-7xl px-5 py-16 md:py-20">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} />
      <div className="mt-10 grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.items.map((c, i) => (
          <FadeUp key={c.title} delay={i * 0.08}>
            <a href={c.href} className="group relative block h-96 w-full overflow-hidden rounded-[32px] shadow-soft">
              <img src={c.image} alt={c.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,19,14,.92) 0%, rgba(10,19,14,.65) 38%, rgba(10,19,14,0) 70%)" }} />
              <div className="absolute inset-x-0 bottom-0 p-6 pb-8 text-forest-foreground">
                <h3 className="max-w-full text-2xl leading-tight text-white line-clamp-2" style={{ textShadow: "0 1px 12px rgba(0,0,0,.45)" }}>{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80" style={{ textShadow: "0 1px 12px rgba(0,0,0,.45)" }}>{c.text}</p>
                <span className="glass mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white">{c.link}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </div>
            </a>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

export function PropertyCard({ p }: { p: Property }) {
  const cardFacts = getCardFacts(p);
  const propertyView = getPropertyView(p);
  const badgeTone = !cardFacts.stageLabel
    ? undefined
    : ["En construcción", "Preventa", "En pozo"].some((label) => cardFacts.stageLabel.includes(label))
      ? "bg-[#E7CF8C] text-[#0B1410]"
      : "bg-[#D9F1DD] text-[#0B1410]";
  const specs = cardFacts.facts.map((fact) => {
    const iconMap = {
      bedrooms: BedDouble,
      bathrooms: Bath,
      area: Ruler,
      garage: Car,
    } as const;
    return { icon: iconMap[fact.key as keyof typeof iconMap] ?? Ruler, label: fact.label };
  });

  return (
    <a href={`/propiedades/${p.slug}`} className="group block h-full overflow-hidden rounded-[28px] bg-card transition hover:-translate-y-1" style={{ boxShadow: "0 8px 24px rgba(11,20,16,0.08)" }}>
      <article className="flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={p.images[0]} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          {cardFacts.stageLabel && (
            <span className={cn("absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold", badgeTone)}>{cardFacts.stageLabel}</span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{cardFacts.locationLabel}</p>
          <h3 className="mt-2 min-h-[3rem] text-2xl leading-tight text-foreground line-clamp-2">{p.title}</h3>
          <p className="mt-3 flex items-baseline gap-2">
            {propertyView.priceMode === "from" && <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Desde</span>}
            <span className="text-2xl font-semibold text-primary">{cardFacts.price.amount}</span>
          </p>
          <ul className="mt-auto grid gap-2 border-t border-border pt-4 text-xs text-muted-foreground" style={{ gridTemplateColumns: `repeat(${specs.length}, minmax(0, 1fr))` }}>
            {specs.map(({ icon: Icon, label }) => (
              <li key={label} className="flex flex-col items-center gap-1 text-center"><Icon className="h-4 w-4 text-foreground" />{label}</li>
            ))}
          </ul>
        </div>
      </article>
    </a>
  );
}

export function Featured() {
  const t = home.featured;
  return (
    <section id="propiedades" className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} />
          <a href="#" className="flex items-center gap-2 font-semibold text-primary hover:text-primary-hover">{t.viewAll}<ArrowRight className="h-4 w-4" /></a>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p, i) => <FadeUp key={p.slug} delay={(i % 3) * 0.08}><PropertyCard p={p} /></FadeUp>)}
        </div>
      </div>
    </section>
  );
}

const whyIcons = { personal: UserRound, market: Compass, transparency: FileCheck2, support: HeartHandshake, residency: Stamp } as const;

export function Why() {
  const t = home.why;
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:py-20">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {t.items.map((w, i) => {
          const Icon = whyIcons[w.key];
          return (
            <FadeUp key={w.key} delay={i * 0.06}>
              <div className="h-full rounded-[28px] border border-border bg-card p-6 transition hover:shadow-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-5 text-lg leading-snug text-foreground">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
              </div>
            </FadeUp>
          );
        })}
      </div>
    </section>
  );
}

export function Services() {
  const t = home.services;
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 md:pb-20">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} />
      <FadeUp className="mt-8 flex flex-wrap gap-3">
        {t.items.map((s) => (
          <span key={s} className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground">
            <Check className="h-4 w-4 text-primary" />{s}
          </span>
        ))}
      </FadeUp>
      <FadeUp className="mt-8 rounded-[32px] bg-primary-soft p-8 md:p-10">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Sparkles className="h-5 w-5" /></span>
          <div>
            <Eyebrow>{t.benefit.eyebrow}</Eyebrow>
            <p className="mt-2 max-w-3xl text-lg leading-relaxed text-foreground"><strong className="font-semibold">{t.benefit.strong}</strong>{t.benefit.text}</p>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
