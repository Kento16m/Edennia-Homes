import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Home, LayoutGrid, Mail, MapPin, MessageCircle, Phone, Search, Wallet } from "lucide-react";
import { home } from "@/content/home";
import { properties, formatUsd } from "@/data/properties";

const t = home.hero;
const railIcons = { home: Home, categories: LayoutGrid, whatsapp: MessageCircle, phone: Phone, email: Mail } as const;
const featured = properties;

function Rail() {
  return (
    <nav aria-label="Accesos rápidos" className="glass absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2 rounded-full p-2 lg:flex">
      {home.rail.map((r, i) => {
        const Icon = railIcons[r.key];
        return (
          <a key={r.key} href={r.href} aria-label={r.label} title={r.label}
            className={i === 0
              ? "flex h-11 w-11 items-center justify-center rounded-full bg-forest text-forest-foreground"
              : "flex h-11 w-11 items-center justify-center rounded-full text-forest-foreground transition hover:bg-forest-foreground/20"}>
            <Icon className="h-[18px] w-[18px]" />
          </a>
        );
      })}
    </nav>
  );
}

function SearchBar() {
  const field = "h-12 w-full rounded-full bg-transparent px-5 text-sm text-forest-foreground placeholder:text-forest-foreground/70 focus:outline-none";
  return (
    <form onSubmit={(e) => e.preventDefault()} className="glass mt-8 flex w-full max-w-3xl flex-col gap-1 rounded-[28px] p-2 md:flex-row md:items-center md:rounded-full">
      <label className="sr-only" htmlFor="cat">Categoría</label>
      <select id="cat" className={`${field} cursor-pointer [&>option]:text-foreground`}>
        {t.search.categories.map((c) => <option key={c}>{c}</option>)}
      </select>
      <span className="hidden h-6 w-px bg-glass-border md:block" />
      <div className="flex w-full items-center pl-4"><MapPin className="h-4 w-4 text-forest-foreground/80" /><input aria-label={t.search.location} placeholder={t.search.location} className={field} /></div>
      <span className="hidden h-6 w-px bg-glass-border md:block" />
      <div className="flex w-full items-center pl-4"><Wallet className="h-4 w-4 text-forest-foreground/80" /><input aria-label={t.search.price} placeholder={t.search.price} className={field} /></div>
      <button className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover">
        <Search className="h-4 w-4" />{t.search.button}
      </button>
    </form>
  );
}

function FeaturedCard() {
  const [i, setI] = useState(0);
  const p = featured[i]!;
  const go = (d: number) => setI((i + d + featured.length) % featured.length);
  return (
    <a href={`/propiedades/${p.slug}`} className="group block">
      <div className="glass-light flex gap-4 rounded-[28px] p-3 shadow-soft">
        <img src={p.images[0]} alt={p.title} className="h-28 w-28 shrink-0 rounded-[20px] object-cover md:h-32 md:w-36" />
        <div className="flex min-w-0 flex-1 flex-col justify-between py-1 pr-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">{t.featuredLabel}</p>
              <h3 className="mt-1 truncate text-xl text-foreground">{p.title}</h3>
              <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{p.neighborhood}, {p.city}</p>
            </div>
            <span className="text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-primary">{formatUsd(p.priceUsd)}</p>
            <div className="flex gap-2">
              <button aria-label={t.prev} onClick={(event) => { event.preventDefault(); go(-1); }} className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground transition hover:bg-border"><ArrowLeft className="h-4 w-4" /></button>
              <button aria-label={t.next} onClick={(event) => { event.preventDefault(); go(1); }} className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-forest-foreground transition hover:bg-forest/90"><ArrowRight className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-screen w-full flex-col overflow-hidden rounded-b-[40px] bg-forest">
      <img src={t.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="bg-hero-overlay absolute inset-0" />
      <Rail />
      <div className="relative z-10 flex flex-1 flex-col justify-center px-5 pb-8 pt-32 md:px-12 lg:pl-28 xl:pl-36">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.3em] text-forest-foreground/85">{t.eyebrow}</p>
          <h1 className="mt-5 text-4xl font-light leading-[1.05] text-forest-foreground sm:text-6xl lg:text-7xl">
            {t.titleBefore}<em className="font-normal text-gold">{t.titleAccent}</em>{t.titleAfter}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-forest-foreground/85 md:text-lg">{t.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#propiedades" className="flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary-hover">
              {t.primary}<ArrowRight className="h-4 w-4" />
            </a>
            <a href="#" className="glass flex h-12 items-center rounded-full px-6 text-sm font-semibold text-forest-foreground transition hover:bg-forest-foreground/25">{t.secondary}</a>
          </div>
          <SearchBar />
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
        className="relative z-10 grid gap-4 px-5 pb-8 md:px-12 lg:grid-cols-[1.3fr_1.3fr_0.8fr] lg:pl-28 xl:pl-36">
        <FeaturedCard />
        <div className="glass-light grid grid-cols-3 divide-x divide-border rounded-[28px] p-4 shadow-soft">
          {t.stats.map((s) => (
            <div key={s.value} className="px-3 text-center">
              <p className="font-serif text-2xl text-primary md:text-3xl">{s.value}</p>
              <p className="mt-1 text-[11px] leading-snug text-muted-foreground md:text-xs">{s.label}</p>
            </div>
          ))}
        </div>
        <a href="#" className="group flex flex-col justify-between rounded-[28px] bg-forest p-5 text-forest-foreground shadow-soft transition hover:bg-forest/90">
          <span className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-forest-foreground text-forest transition group-hover:rotate-45"><ArrowUpRight className="h-5 w-5" /></span>
          <div className="mt-4">
            <p className="font-serif text-xl">{t.ctaCard.title}</p>
            <p className="mt-1 text-sm text-forest-foreground/70">{t.ctaCard.text}</p>
          </div>
        </a>
      </motion.div>
    </section>
  );
}
