import { Building2, Check, HeartPulse, MapPinned, Percent, Scale, Target, TrendingUp, Eye } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { home } from "@/content/home";
import { FadeUp, Eyebrow, SectionHeading } from "./primitives";

export function HowToBuy() {
  const t = home.howToBuy;
  return (
    <section className="bg-forest text-forest-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
        <FadeUp className="max-w-3xl">
          <Eyebrow className="text-gold">{t.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl font-normal leading-tight md:text-5xl">{t.title}</h2>
        </FadeUp>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((s, i) => (
            <FadeUp key={s.num} delay={i * 0.08}>
              <div className="h-full rounded-[28px] border border-forest-foreground/15 bg-forest-foreground/5 p-6">
                <span className="font-serif text-5xl text-gold">{s.num}</span>
                <h3 className="mt-4 text-xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-foreground/75">{s.text}</p>
              </div>
            </FadeUp>
          ))}
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {t.stats.map((s, i) => (
            <FadeUp key={s.eyebrow} delay={i * 0.08}>
              <div className="flex h-full items-center gap-6 rounded-[28px] border border-forest-foreground/15 bg-forest-foreground/5 p-6 md:p-8">
                <span className="font-serif text-5xl text-gold md:text-6xl">{s.value}</span>
                <div>
                  <Eyebrow className="text-gold">{s.eyebrow}</Eyebrow>
                  <p className="mt-2 text-sm leading-relaxed text-forest-foreground/75">{s.text}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Commitment() {
  const t = home.commitment;
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:py-20">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} />
      <FadeUp className="mt-8 flex flex-wrap gap-3">
        {t.chips.map((c) => (
          <span key={c} className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground">
            <Check className="h-4 w-4 text-primary" />{c}
          </span>
        ))}
      </FadeUp>
    </section>
  );
}

export function Faq() {
  const t = home.faq;
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} className="mx-auto text-center" />
        <FadeUp className="mt-10">
          <Accordion type="single" collapsible className="rounded-[28px] bg-card px-6 shadow-soft">
            {t.items.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-base font-medium text-foreground">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeUp>
      </div>
    </section>
  );
}

export function About() {
  const t = home.about;
  const cards = [
    { icon: Target, title: t.mission.title, text: t.mission.text },
    { icon: Eye, title: t.vision.title, text: t.vision.text },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:py-20">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {cards.map(({ icon: Icon, title, text }, i) => (
          <FadeUp key={title} delay={i * 0.08}>
            <div className="h-full rounded-[28px] border border-border bg-card p-8 transition hover:shadow-soft">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span>
              <h3 className="mt-5 text-2xl text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

const whyInvestIcons = { economy: TrendingUp, market: Building2, tax: Percent, equality: Scale, location: MapPinned, life: HeartPulse } as const;

export function WhyInvest() {
  const t = home.whyInvest;
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />
        <FadeUp className="mt-6 max-w-3xl">
          <p className="text-lg leading-relaxed text-muted-foreground">{t.intro}</p>
        </FadeUp>
        <FadeUp className="mt-8 rounded-[32px] bg-primary-soft p-8 md:p-10">
          <Eyebrow>{t.dataBox.eyebrow}</Eyebrow>
          <p className="mt-2 max-w-3xl text-lg leading-relaxed text-foreground">{t.dataBox.text}</p>
        </FadeUp>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((w, i) => {
            const Icon = whyInvestIcons[w.key];
            return (
              <FadeUp key={w.key} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-[28px] border border-border bg-card p-6 transition hover:shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span>
                  <h3 className="mt-5 text-lg leading-snug text-foreground">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
        <FadeUp className="mt-8 max-w-3xl">
          <p className="text-lg leading-relaxed text-muted-foreground">{t.closing}</p>
        </FadeUp>
      </div>
    </section>
  );
}
