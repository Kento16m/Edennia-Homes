import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";
import {
  ArrowRight,
  Bath,
  BedDouble,
  Camera,
  CarFront,
  Check,
  ChevronDown,
  MapPin,
  Search,
  SearchX,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";

import { PropertyCard } from "@/components/home/Sections";
import { getCardFacts } from "@/data/adapter";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { properties, formatPrice, getStageLabel, type Property } from "@/data/properties";
import { cn } from "@/lib/utils";
import { filterProperties, getFacetCounts, parseCsvFilters, sortProperties, type PropertyFilters } from "@/lib/property-filters";

const PRICE_PRESETS = [60000, 100000, 150000, 200000];
const TYPE_OPTIONS = [
  { key: "todas", label: "Todas" },
  { key: "casas", label: "Casas" },
  { key: "apartamentos", label: "Apartamentos" },
  { key: "condominios", label: "Condominios" },
  { key: "oportunidades", label: "Oportunidades" },
] as const;

const ORDER_OPTIONS = [
  { value: "destacadas", label: "Destacadas" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
  { value: "m2-desc", label: "Superficie: mayor a menor" },
  { value: "nombre", label: "Nombre A-Z" },
] as const;

const typeTitles: Record<string, string> = {
  todas: "Propiedades en Paraguay",
  casas: "Casas unifamiliares",
  apartamentos: "Apartamentos",
  condominios: "Condominios",
  oportunidades: "Oportunidades de inversión",
};

const priceToLabel = (value: number) => formatPrice(value, "es");

const normalizeText = (value?: string) =>
  (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const booleanFromSearch = z
  .union([z.boolean(), z.string()])
  .transform((value) => value === true || value === "true" || value === "1")
  .catch(false);

const searchSchema = z.object({
  type: z.enum(["casas", "apartamentos", "condominios", "oportunidades"]).optional(),
  q: z.string().optional().catch(undefined),
  zona: z.string().optional().catch(undefined),
  min: z.coerce.number().optional().catch(undefined),
  max: z.coerce.number().optional().catch(undefined),
  dorm: z.string().optional().catch(undefined),
  banos: z.string().optional().catch(undefined),
  m2min: z.coerce.number().optional().catch(undefined),
  m2max: z.coerce.number().optional().catch(undefined),
  cochera: booleanFromSearch.optional().catch(false),
  etapa: z.string().optional().catch(undefined),
  amen: z.string().optional().catch(undefined),
  orden: z.enum(["destacadas", "precio-asc", "precio-desc", "m2-desc", "nombre"]).catch("destacadas"),
});

export const Route = createFileRoute("/propiedades/")({
  validateSearch: (search) => searchSchema.parse(search),
  head: ({ location }) => {
    const type = typeof location?.search === "object" && location.search ? (location.search as { type?: string }).type ?? "todas" : "todas";
    const title = `${typeTitles[type] ?? typeTitles.todas} | Edennia Homes`;
    const description = "Explora propiedades premium en Paraguay filtradas por zona, precio, dormitorios y más.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: PropiedadesPage,
});

function toFilters(search: ReturnType<typeof Route.useSearch>): PropertyFilters {
  return {
    type: search.type,
    q: search.q,
    zona: parseCsvFilters.text(search.zona),
    min: typeof search.min === "number" ? search.min : undefined,
    max: typeof search.max === "number" ? search.max : undefined,
    dorm: parseCsvFilters.numbers(search.dorm),
    banos: parseCsvFilters.numbers(search.banos),
    m2min: typeof search.m2min === "number" ? search.m2min : undefined,
    m2max: typeof search.m2max === "number" ? search.m2max : undefined,
    cochera: Boolean(search.cochera),
    etapa: parseCsvFilters.text(search.etapa),
    amen: parseCsvFilters.text(search.amen),
    orden: search.orden,
  };
}

function toUrlSearch(patch: Partial<PropertyFilters> & Record<string, unknown> = {}) {
  const next = { ...patch } as Record<string, unknown>;
  for (const key of Object.keys(next)) {
    const value = next[key];
    if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) {
      delete next[key];
    }
  }
  return next;
}

function getActiveFilters(search: ReturnType<typeof Route.useSearch>, updateSearch: (patch: Partial<PropertyFilters>) => void) {
  const filters = toFilters(search);
  const chips: { key: string; label: string; clear: () => void }[] = [];

  if (filters.q) {
    chips.push({ key: "q", label: `Buscar: ${filters.q}`, clear: () => updateSearch({ q: undefined }) });
  }

  if (filters.zona?.length) {
    chips.push({ key: "zona", label: `Zona: ${filters.zona.join(", ")}`, clear: () => updateSearch({ zona: undefined }) });
  }

  if (typeof filters.min === "number") {
    chips.push({ key: "min", label: `Precio desde: ${priceToLabel(filters.min)}`, clear: () => updateSearch({ min: undefined }) });
  }

  if (typeof filters.max === "number") {
    chips.push({ key: "max", label: `Precio hasta: ${priceToLabel(filters.max)}`, clear: () => updateSearch({ max: undefined }) });
  }

  if (filters.dorm?.length) {
    chips.push({ key: "dorm", label: `Dormitorios: ${filters.dorm.join(", ")}`, clear: () => updateSearch({ dorm: undefined }) });
  }

  if (filters.banos?.length) {
    chips.push({ key: "banos", label: `Baños: ${filters.banos.join(", ")}`, clear: () => updateSearch({ banos: undefined }) });
  }

  if (typeof filters.m2min === "number") {
    chips.push({ key: "m2min", label: `m² desde: ${filters.m2min}`, clear: () => updateSearch({ m2min: undefined }) });
  }

  if (typeof filters.m2max === "number") {
    chips.push({ key: "m2max", label: `m² hasta: ${filters.m2max}`, clear: () => updateSearch({ m2max: undefined }) });
  }

  if (filters.cochera) {
    chips.push({ key: "cochera", label: "Con garaje", clear: () => updateSearch({ cochera: false }) });
  }

  if (filters.etapa?.length) {
    chips.push({ key: "etapa", label: `Etapa: ${filters.etapa.join(", ")}`, clear: () => updateSearch({ etapa: undefined }) });
  }

  if (filters.amen?.length) {
    chips.push({ key: "amen", label: `Amenities: ${filters.amen.join(", ")}`, clear: () => updateSearch({ amen: undefined }) });
  }

  return chips;
}

function PropiedadesPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const filters = useMemo(() => toFilters(search), [search]);
  const facetCounts = useMemo(() => getFacetCounts(properties, filters), [filters]);
  const list = useMemo(() => sortProperties(filterProperties(properties, filters), filters.orden ?? "destacadas"), [filters]);
  const [page, setPage] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [draft, setDraft] = useState<PropertyFilters>(filters);
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const debounceRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    setDraft(filters);
    setPage(1);
  }, [filters]);

  useEffect(() => {
    setLoading(true);
    window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => setLoading(false), 180);
    return () => window.clearTimeout(debounceRef.current);
  }, [filters.q, filters.type, filters.zona, filters.min, filters.max, filters.dorm, filters.banos, filters.m2min, filters.m2max, filters.cochera, filters.etapa, filters.amen]);

  const updateSearch = (patch: Partial<PropertyFilters> = {}) => {
    navigate({
      search: (prev) => ({
        ...prev,
        ...toUrlSearch({ ...prev, ...patch }),
      }),
      replace: true,
    });
  };

  const visible = list.slice(0, page * 9);
  const activeFilters = useMemo(() => getActiveFilters(search, updateSearch), [search]);
  const selectedType = filters.type ?? "todas";
  const pageTitle = typeTitles[selectedType] ?? typeTitles.todas;

  const applyDraft = () => {
    const searchParams = {
      ...search,
      ...toUrlSearch({
        type: draft.type,
        q: draft.q,
        zona: draft.zona?.join(","),
        min: draft.min,
        max: draft.max,
        dorm: draft.dorm?.join(","),
        banos: draft.banos?.join(","),
        m2min: draft.m2min,
        m2max: draft.m2max,
        cochera: draft.cochera ? true : undefined,
        etapa: draft.etapa?.join(","),
        amen: draft.amen?.join(","),
        orden: draft.orden ?? "destacadas",
      }),
    };

    navigate({
      search: () => searchParams,
      replace: true,
    });
    setMobileOpen(false);
  };

  const clearAll = () => {
    navigate({
      search: () => ({
        type: filters.type,
        orden: "destacadas",
      }),
      replace: true,
    });
  };

  const emptySuggestions = useMemo(() => {
    const suggestions: string[] = [];
    if (typeof filters.max === "number") suggestions.push(`Ampliar precio hasta ${priceToLabel(Math.min(filters.max + 25000, 200000))}`);
    if (filters.dorm?.length) suggestions.push("Quitar dormitorios");
    return suggestions;
  }, [filters]);

  const priceRanges = [
    { value: "Hasta 60.000", onClick: () => updateSearch({ max: 60000 }) },
    { value: "60.000–100.000", onClick: () => updateSearch({ min: 60000, max: 100000 }) },
    { value: "100.000–150.000", onClick: () => updateSearch({ min: 100000, max: 150000 }) },
    { value: "Más de 150.000", onClick: () => updateSearch({ min: 150000 }) },
  ];

  const uniqueCities = Array.from(new Set(properties.map((item) => item.city))).sort((a, b) => a.localeCompare(b));
  const uniqueStages = Array.from(new Set(properties.map((item) => getStageLabel(item)).filter(Boolean))) as string[];
  const amenityOptions = [
    { key: "piscina", label: "Piscina" },
    { key: "quincho", label: "Quincho y parrilla" },
    { key: "seguridad", label: "Seguridad" },
    { key: "gimnasio", label: "Gimnasio" },
    { key: "aire", label: "Aire acondicionado" },
    { key: "coworking", label: "Coworking" },
  ];

  const hasNonTypeFilters = Boolean(
    filters.q ||
      filters.zona?.length ||
      typeof filters.min === "number" ||
      typeof filters.max === "number" ||
      filters.dorm?.length ||
      filters.banos?.length ||
      typeof filters.m2min === "number" ||
      typeof filters.m2max === "number" ||
      filters.cochera ||
      filters.etapa?.length ||
      filters.amen?.length,
  );

  const resultSummaryParts: string[] = [];
  if (filters.zona?.length) {
    resultSummaryParts.push(`en ${filters.zona.join(", ")}`);
  }
  if (typeof filters.max === "number") {
    resultSummaryParts.push(`hasta USD ${filters.max.toLocaleString("es-PY")}`);
  }
  if (filters.dorm?.length) {
    const dormText = filters.dorm.includes(0) ? "monoambiente" : `${filters.dorm.join(", ")} dormitorio${filters.dorm.length === 1 ? "" : "s"}`;
    resultSummaryParts.push(dormText);
  }
  const resultSummary = resultSummaryParts.join(" · ");

  const toggleMultiValue = <T extends string | number>(group: "zona" | "dorm" | "banos" | "etapa" | "amen", value: T) => {
    setDraft((current) => {
      const currentValues = (current[group] ?? []) as Array<T>;
      const exists = currentValues.includes(value);
      return {
        ...current,
        [group]: exists ? currentValues.filter((item) => item !== value) : [...currentValues, value],
      };
    });
  };

  const updateNumberField = (key: "min" | "max" | "m2min" | "m2max", value: string) => {
    const numberValue = Number(value);
    setDraft((current) => ({
      ...current,
      [key]: Number.isFinite(numberValue) ? numberValue : undefined,
    }));
  };

  const searchMessage = (() => {
    const qPart = filters.q ? `, buscando ${filters.q}` : "";
    const zonePart = filters.zona?.length ? ` en ${filters.zona.join(", ")}` : "";
    const pricePart = typeof filters.max === "number" ? `, hasta USD ${filters.max.toLocaleString("es-PY")}` : "";
    const roomPart = filters.dorm?.length ? `, ${filters.dorm.join(", ")}` : "";
    return `Hola, busco propiedades${filters.type ? ` de ${TYPE_OPTIONS.find((option) => option.key === filters.type)?.label ?? filters.type}` : ""}${zonePart}${pricePart}${roomPart}${qPart}. ¿Me ayudáis?`;
  })();

  const stateLabel = list.length === 1 ? "propiedad" : "propiedades";

  return (
    <SiteLayout headerVariant="properties">
      <main className="bg-background pt-28">
        <section className="mx-auto max-w-7xl px-4 pb-8 md:px-6 lg:px-8">
          <div className="border-b border-border bg-transparent pb-6 pt-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <a href="/" className="hover:text-foreground">Inicio</a>
              <span>/</span>
              <span className="text-foreground">Propiedades</span>
            </div>
            <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">PROPIEDADES</p>
                <h1 className="mt-2 text-[2.5rem] font-normal leading-none text-foreground md:text-[4rem]" style={{ fontFamily: "Fraunces, Georgia, serif" }}>
                  {pageTitle}
                </h1>
              </div>
              <p aria-live="polite" className="text-sm text-muted-foreground">Seleccionadas con criterio</p>
            </div>
          </div>

          <div className="mt-6 flex gap-3 overflow-x-auto pb-3 md:pb-0">
            {TYPE_OPTIONS.map((option) => {
              const count = facetCounts.type[option.key] ?? 0;
              const active = selectedType === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => updateSearch({ type: option.key === "todas" ? undefined : option.key as PropertyFilters["type"] })}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition",
                    active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:bg-accent",
                  )}
                >
                  <span>{option.label}</span>
                  <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", active ? "bg-white/20 text-current" : "bg-primary-soft text-primary")}>{count}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 border-b border-border bg-white">
            <div className="mx-auto flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="hidden flex-1 items-center gap-3 lg:flex">
                <div className="relative min-w-[260px] flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    ref={searchInputRef}
                    aria-label="Buscar propiedades"
                    value={filters.q ?? ""}
                    onChange={(event) => updateSearch({ q: event.target.value || undefined })}
                    placeholder="Buscar por nombre o zona"
                    className="min-w-[260px] w-full rounded-full border border-border bg-background py-3 pl-11 pr-12 text-sm text-foreground focus:border-primary focus:outline-none"
                  />
                  {filters.q && (
                    <button type="button" onClick={() => updateSearch({ q: undefined })} aria-label="Limpiar búsqueda" className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-accent">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex w-full items-center gap-2 lg:hidden">
                <button type="button" onClick={() => searchInputRef.current?.focus()} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-medium text-foreground">
                  <Search className="h-4 w-4" />
                  Buscar
                </button>
                <button type="button" onClick={() => setMobileOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-medium text-foreground">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros {filters.amen?.length || filters.etapa?.length || filters.m2min || filters.m2max || filters.cochera ? `(${[Boolean(filters.amen?.length), Boolean(filters.etapa?.length), Boolean(filters.m2min || filters.m2max), filters.cochera].filter(Boolean).length})` : ""}
                </button>
                <Select value={filters.orden ?? "destacadas"} onValueChange={(value) => updateSearch({ orden: value as PropertyFilters["orden"] })}>
                  <SelectTrigger className="w-auto min-w-[120px]">
                    <SelectValue placeholder="Ordenar" />
                  </SelectTrigger>
                  <SelectContent>
                    {ORDER_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="hidden flex-wrap items-center gap-2 lg:flex">
                <Popover>
                  <PopoverTrigger asChild>
                    <button type="button" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-medium text-foreground">
                      Zona {filters.zona?.length ? `(${filters.zona.length})` : ""}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 p-3">
                    <div className="space-y-2">
                      {uniqueCities.map((city) => (
                        <label key={city} className="flex items-center justify-between gap-3 rounded-md px-2 py-2 hover:bg-accent">
                          <span className="flex items-center gap-2 text-sm text-foreground">
                            <Checkbox
                              checked={Boolean(filters.zona?.includes(city))}
                              onCheckedChange={() => toggleMultiValue("zona", city)}
                            />
                            {city}
                          </span>
                          <span className="text-xs text-muted-foreground">{facetCounts.zona[city] ?? 0}</span>
                        </label>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <button type="button" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-medium text-foreground">
                      Precio {typeof filters.min === "number" || typeof filters.max === "number" ? "(activo)" : ""}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <label className="space-y-1 text-sm text-muted-foreground">
                          <span>Mínimo</span>
                          <input value={filters.min ?? ""} onChange={(event) => updateNumberField("min", event.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground" placeholder="USD" />
                        </label>
                        <label className="space-y-1 text-sm text-muted-foreground">
                          <span>Máximo</span>
                          <input value={filters.max ?? ""} onChange={(event) => updateNumberField("max", event.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground" placeholder="USD" />
                        </label>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {priceRanges.map((preset) => (
                          <button key={preset.value} type="button" onClick={preset.onClick} className="rounded-full border border-border bg-background px-2.5 py-1.5 text-xs text-foreground hover:bg-accent">
                            {preset.value}
                          </button>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <button type="button" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-medium text-foreground">
                      Dormitorios {filters.dorm?.length ? `(${filters.dorm.length})` : ""}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-3">
                    <div className="flex flex-wrap gap-2">
                      {[0, 1, 2, 3].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => toggleMultiValue("dorm", value)}
                          className={cn("rounded-full px-3 py-1.5 text-sm", filters.dorm?.includes(value) ? "bg-primary text-primary-foreground" : "border border-border bg-background text-foreground")}
                        >
                          {value === 0 ? "Monoambiente" : value === 3 ? "3+" : String(value)}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <button type="button" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-medium text-foreground">
                      Baños {filters.banos?.length ? `(${filters.banos.length})` : ""}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 p-3">
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => toggleMultiValue("banos", value)}
                          className={cn("rounded-full px-3 py-1.5 text-sm", filters.banos?.includes(value) ? "bg-primary text-primary-foreground" : "border border-border bg-background text-foreground")}
                        >
                          {value}+
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                <button type="button" onClick={() => setMobileOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-medium text-foreground lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros
                </button>

                <button type="button" onClick={() => setMobileOpen(true)} className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-medium text-foreground lg:inline-flex">
                  <SlidersHorizontal className="h-4 w-4" />
                  Más filtros {filters.amen?.length || filters.etapa?.length || filters.m2min || filters.m2max || filters.cochera ? `(${[Boolean(filters.amen?.length), Boolean(filters.etapa?.length), Boolean(filters.m2min || filters.m2max), filters.cochera].filter(Boolean).length})` : ""}
                </button>

                <Select value={filters.orden ?? "destacadas"} onValueChange={(value) => updateSearch({ orden: value as PropertyFilters["orden"] })}>
                  <SelectTrigger className="w-56">
                    <SelectValue placeholder="Ordenar" />
                  </SelectTrigger>
                  <SelectContent>
                    {ORDER_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {activeFilters.map((chip) => (
                <button key={chip.key} type="button" onClick={chip.clear} aria-label={`Quitar filtro ${chip.label}`} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground">
                  {chip.label}
                  <X className="h-3.5 w-3.5" />
                </button>
              ))}
              <button type="button" onClick={clearAll} className="text-sm font-medium text-primary">Limpiar todo</button>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-foreground">{list.length} {stateLabel}</p>
              {hasNonTypeFilters && resultSummary && (
                <p className="text-sm text-muted-foreground">{resultSummary}</p>
              )}
            </div>
            {list.length > visible.length && (
              <p className="text-sm text-muted-foreground">Mostrando {visible.length} de {list.length}</p>
            )}
          </div>

          {list.length === 0 ? (
            <div className="mt-8 rounded-[32px] border border-dashed border-border bg-card p-10 text-center shadow-soft">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-primary">
                <SearchX className="h-7 w-7" />
              </div>
              <h2 className="mt-5 text-3xl font-semibold text-foreground">No encontramos propiedades con estos filtros</h2>
              <p className="mt-3 text-muted-foreground">Prueba con otra combinación o vuelve a la vista general.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {emptySuggestions.map((suggestion) => (
                  <button key={suggestion} type="button" onClick={clearAll} className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground">{suggestion}</button>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button type="button" onClick={clearAll}>Limpiar filtros</Button>
                <a href="https://wa.me/595975500150?text=Hola%2C%20quiero%20ayuda%20para%20encontrar%20una%20propiedad%20ideal%20seg%C3%BAn%20mi%20presupuesto." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground">Hablar con un asesor</a>
              </div>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {loading && list.length > 0 ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="animate-pulse overflow-hidden rounded-[28px] border border-border bg-card">
                    <div className="h-60 bg-muted" />
                    <div className="space-y-3 p-5">
                      <div className="h-4 w-1/3 rounded bg-muted" />
                      <div className="h-8 w-3/4 rounded bg-muted" />
                      <div className="h-5 w-1/2 rounded bg-muted" />
                    </div>
                  </div>
                ))
              ) : (
                visible.map((property) => <PropertyCard key={property.slug} p={property} />)
              )}
            </div>
          )}

          {list.length > visible.length && !loading && (
            <div className="mt-8 flex justify-center">
              <Button type="button" onClick={() => setPage((current) => current + 1)} className="rounded-full px-6 py-3 text-sm font-semibold">
                Mostrar más
              </Button>
            </div>
          )}
        </section>

        <section className="mx-auto mt-16 mb-16 max-w-5xl px-5">
          <div className="rounded-[40px] bg-gradient-to-r from-[#13891A] to-[#0E6B14] px-8 py-10 text-center text-white shadow-soft md:px-12 md:py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">Búsqueda personalizada</p>
            <h2 className="mt-4 text-4xl font-normal" style={{ fontFamily: "Fraunces, Georgia, serif" }}>¿No encuentras lo que buscas?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/80">Hacemos una búsqueda a medida según tu presupuesto y objetivos.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={`https://wa.me/595975500150?text=${encodeURIComponent(searchMessage)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0E6B14] shadow-soft">Contarnos qué buscas</a>
              <a href="#contacto" className="inline-flex items-center justify-center rounded-full border border-white/60 bg-transparent px-6 py-3 text-sm font-semibold text-white">Hablar con un asesor</a>
            </div>
          </div>
        </section>
      </main>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="bottom" className="h-[88vh] rounded-t-[32px] p-0">
          <div className="flex h-full flex-col">
            <SheetHeader className="px-5 pt-5 text-left">
              <SheetTitle>Filtrar propiedades</SheetTitle>
            </SheetHeader>

            <div className="flex-1 space-y-5 overflow-y-auto px-5 pb-24 pt-4">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Zona</p>
                <div className="flex flex-wrap gap-2">
                  {uniqueCities.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => toggleMultiValue("zona", city)}
                      className={cn("rounded-full border px-3 py-2 text-sm", draft.zona?.includes(city) ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground")}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Precio</p>
                <div className="grid grid-cols-2 gap-3">
                  <input value={draft.min ?? ""} onChange={(event) => updateNumberField("min", event.target.value)} placeholder="Mínimo" className="rounded-full border border-border bg-background px-3 py-2.5 text-sm" />
                  <input value={draft.max ?? ""} onChange={(event) => updateNumberField("max", event.target.value)} placeholder="Máximo" className="rounded-full border border-border bg-background px-3 py-2.5 text-sm" />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Dormitorios</p>
                <div className="flex flex-wrap gap-2">
                  {[0, 1, 2, 3].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => toggleMultiValue("dorm", value)}
                      className={cn("rounded-full border px-3 py-2 text-sm", draft.dorm?.includes(value) ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground")}
                    >
                      {value === 0 ? "Monoambiente" : value === 3 ? "3+" : String(value)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Baños</p>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => toggleMultiValue("banos", value)}
                      className={cn("rounded-full border px-3 py-2 text-sm", draft.banos?.includes(value) ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground")}
                    >
                      {value}+
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Etapa</p>
                <div className="flex flex-wrap gap-2">
                  {uniqueStages.map((stage) => (
                    <button
                      key={stage}
                      type="button"
                      onClick={() => toggleMultiValue("etapa", stage)}
                      className={cn("rounded-full border px-3 py-2 text-sm", draft.etapa?.includes(stage) ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground")}
                    >
                      {stage}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Superficie</p>
                <div className="grid grid-cols-2 gap-3">
                  <input value={draft.m2min ?? ""} onChange={(event) => updateNumberField("m2min", event.target.value)} placeholder="Mínimo m²" className="rounded-full border border-border bg-background px-3 py-2.5 text-sm" />
                  <input value={draft.m2max ?? ""} onChange={(event) => updateNumberField("m2max", event.target.value)} placeholder="Máximo m²" className="rounded-full border border-border bg-background px-3 py-2.5 text-sm" />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Más filtros</p>
                <label className="flex items-center justify-between gap-3 rounded-full border border-border bg-card px-3 py-3 text-sm">
                  <span>Con garaje</span>
                  <Checkbox checked={Boolean(draft.cochera)} onCheckedChange={(checked) => setDraft((current) => ({ ...current, cochera: checked === true }))} />
                </label>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {amenityOptions.map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => toggleMultiValue("amen", option.key)}
                      className={cn("rounded-full border px-3 py-2 text-sm", draft.amen?.includes(option.key) ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground")}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <SheetFooter className="border-t border-border bg-white px-5 py-4">
              <div className="flex w-full items-center justify-between gap-3">
                <button type="button" onClick={() => setDraft({ ...filters, type: filters.type ?? undefined })} className="text-sm font-medium text-foreground">Limpiar</button>
                <Button type="button" onClick={applyDraft} className="rounded-full px-5">Ver {list.length} resultados</Button>
              </div>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </SiteLayout>
  );
}

