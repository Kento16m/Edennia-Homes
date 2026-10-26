import { lazy, Suspense, useEffect, useMemo, useRef, useState, type TouchEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import {
  ArrowRight,
  Bath,
  BedDouble,
  CarFront,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  LandPlot,
  MapPin,
  MessageCircle,
  Ruler,
  Share2,
  ShieldCheck,
  Trees,
  Waves,
  X,
} from "lucide-react";

import { propertyContent } from "@/content/property";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { SiteLayout } from "@/components/layout/SiteLayout";
import {
  properties,
  formatArea,
  formatUsd,
  type Property,
  type PropertyAmenityIcon,
} from "@/data/properties";
import { PropertyCard } from "@/components/home/Sections";
import { InquiryWizard } from "@/components/property/InquiryWizard";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

const amenityIcons: Record<PropertyAmenityIcon, typeof Waves> = {
  Waves,
  Trees,
  ShieldCheck,
};

const sectionOrder = [
  { id: "resumen", label: propertyContent.sectionLabels.summary },
  { id: "equipamiento", label: propertyContent.sectionLabels.equipment },
  { id: "barrio", label: propertyContent.sectionLabels.neighborhood },
  { id: "ubicacion", label: propertyContent.sectionLabels.location },
] as const;

const propertySearchSchema = z.object({
  view: z.enum(["details", "gallery"]).catch("details"),
  source: z.enum(["featured", "search"]).catch("featured"),
  section: z.enum(["resumen", "equipamiento", "barrio", "ubicacion"]).optional().catch(undefined),
});

export const Route = createFileRoute("/propiedades/$slug")({
  validateSearch: (search) => propertySearchSchema.parse(search),
  head: ({ params }) => {
    const title = `${params.slug.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())} · Edennia Homes`;

    return {
      meta: [
        { title },
        { name: "description", content: "Consulta detalles, ubicación y disponibilidad de esta propiedad en Edennia Homes." },
        { property: "og:title", content: title },
      ],
    };
  },
  component: PropertyDetailPage,
});

function PropertyDetailPage() {
  const { slug } = Route.useParams();
  const search = Route.useSearch();
  const property = useMemo(() => properties.find((item) => item.slug === slug), [slug]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [viewerOpen, setViewerOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [mobileInquiryOpen, setMobileInquiryOpen] = useState(false);
  const [currentLocationHref, setCurrentLocationHref] = useState("");
  const [shareToastOpen, setShareToastOpen] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [isRouteReady, setIsRouteReady] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const viewerTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setIsRouteReady(false);
    window.scrollTo({ top: 0, left: 0 });
    setCurrentLocationHref(window.location.href);
    document.title = property ? `${property.title} · Edennia Homes` : "Propiedad no encontrada · Edennia Homes";

    const metaDescription = document.head.querySelector("meta[name='description']") ?? document.createElement("meta");
    metaDescription.setAttribute("name", "description");
    metaDescription.setAttribute(
      "content",
      property
        ? `${property.title}: ${property.tagline} – ${property.neighborhood}, ${property.city}. Consulta disponibilidad y visita esta propiedad.`
        : "Edennia Homes: propiedad no disponible.",
    );
    if (!document.head.querySelector("meta[name='description']")) {
      document.head.appendChild(metaDescription);
    }

    const timer = window.setTimeout(() => setIsRouteReady(true), 120);
    return () => window.clearTimeout(timer);
  }, [property]);

  useEffect(() => {
    if (!property) return;

    const sections = document.querySelectorAll<HTMLElement>("[data-section]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { threshold: [0.2, 0.5], rootMargin: "-30% 0px -60% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [property]);

  useEffect(() => {
    const element = descriptionRef.current;
    if (!element) return;
    setShowReadMore(element.scrollHeight > element.clientHeight + 2);
  }, [property, isExpanded]);

  useEffect(() => {
    if (!property || search.view !== "gallery" || viewerOpen) return;
    setViewerOpen(true);
  }, [property, search.view, viewerOpen]);

  useEffect(() => {
    if (!viewerOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setViewerOpen(false);
      }

      if (event.key === "ArrowRight") {
        setActivePhotoIndex((current) => (current + 1) % (property?.gallery.length ?? 1));
      }

      if (event.key === "ArrowLeft") {
        setActivePhotoIndex((current) => (current - 1 + (property?.gallery.length ?? 1)) % (property?.gallery.length ?? 1));
      }
    };

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    const previousActiveElement = viewerTriggerRef.current ?? (document.activeElement as HTMLElement | null);
    const closeButton = document.querySelector("[data-gallery-close]") as HTMLElement | null;
    window.setTimeout(() => closeButton?.focus(), 0);

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = "";
      previousActiveElement?.focus();
      viewerTriggerRef.current = null;
    };
  }, [property, viewerOpen]);

  useEffect(() => {
    if (!viewerOpen) return;
    const activeThumb = document.getElementById(`gallery-thumb-${activePhotoIndex}`);
    activeThumb?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activePhotoIndex, viewerOpen]);

  if (!property && !isRouteReady) {
    return (
      <SiteLayout>
        <PropertyPageSkeleton />
      </SiteLayout>
    );
  }

  if (!property) {
    return (
      <SiteLayout>
        <NotFoundPropertyPage />
      </SiteLayout>
    );
  }

  const stats = [
    { icon: BedDouble, label: "Dormitorios", value: `${property.bedrooms}` },
    { icon: Bath, label: "Baños", value: `${property.bathrooms}` },
    { icon: CarFront, label: "Garaje", value: property.garageLabel },
    { icon: Ruler, label: "Construidos", value: formatArea(property.builtM2) },
    { icon: LandPlot, label: "Terreno", value: formatArea(property.landM2) },
  ];

  const relatedProperties = properties
    .filter((item) => item.category === property.category && item.slug !== property.slug)
    .slice(0, 3);

  const renderedSections = sectionOrder.filter((section) => {
    if (section.id === "resumen") return true;
    if (section.id === "equipamiento") return property.equipment.length > 0;
    if (section.id === "barrio") return property.neighborhoodAmenities.length > 0;
    if (section.id === "ubicacion") return Boolean(property.mapQuery);
    return false;
  });

  const gallery = property.gallery.length ? property.gallery : property.images;
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(property.mapQuery)}&output=embed`;
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.mapQuery)}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(property.mapQuery)}`;

  const openSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const topOffset = 110;
    const top = target.getBoundingClientRect().top + window.scrollY - topOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const showGallery = (index: number) => {
    viewerTriggerRef.current = document.activeElement as HTMLButtonElement | null;
    setActivePhotoIndex(index);
    setViewerOpen(true);
  };

  const goToPhoto = (direction: number) => {
    setActivePhotoIndex((current) => {
      const total = gallery.length || 1;
      return (current + direction + total) % total;
    });
  };

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(delta) > 50) {
      goToPhoto(delta < 0 ? 1 : -1);
    }
    touchStartX.current = null;
  };

  const handleShare = async () => {
    const link = window.location.href;

    try {
      await navigator.clipboard.writeText(link);
      setShareToastOpen(true);
      window.setTimeout(() => setShareToastOpen(false), 2200);
    } catch {
      window.prompt("Copia este enlace", link);
    }
  };

  const GalleryViewer = lazy(async () => ({
    default: function GalleryViewerContent({
      gallery,
      title,
      activePhotoIndex,
      onClose,
      onChange,
      onTouchStart,
      onTouchEnd,
    }: {
      gallery: string[];
      title: string;
      activePhotoIndex: number;
      onClose: () => void;
      onChange: (direction: number) => void;
      onTouchStart: (event: TouchEvent<HTMLDivElement>) => void;
      onTouchEnd: (event: TouchEvent<HTMLDivElement>) => void;
    }) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest/90 p-4" onClick={onClose}>
          <div
            className="relative w-[min(96vw,1280px)] max-h-[92svh] rounded-[28px] border border-white/15 bg-black/70 p-3 shadow-soft"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between px-2 py-3 text-sm text-white/80">
              <span>{activePhotoIndex + 1} / {gallery.length}</span>
              <button
                type="button"
                data-gallery-close
                aria-label="Cerrar visor de fotos"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative overflow-hidden rounded-[22px] bg-black/30" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
              <div className="flex max-h-[72svh] items-center justify-center overflow-hidden">
                <img
                  src={gallery[activePhotoIndex]}
                  alt={`${title} ${activePhotoIndex + 1}`}
                  width={1600}
                  height={1000}
                  className="max-h-[72svh] w-full object-contain"
                />
              </div>
              <button type="button" onClick={() => onChange(-1)} className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => onChange(1)} className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory">
              {gallery.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  id={`gallery-thumb-${index}`}
                  type="button"
                  onClick={() => onChange(index - activePhotoIndex)}
                  className={cn("h-20 w-24 shrink-0 overflow-hidden rounded-xl border bg-muted snap-start", index === activePhotoIndex ? "border-primary" : "border-white/15")}
                >
                  <img src={image} alt={`${title} ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    },
  }));

  return (
    <SiteLayout>
      <main className="min-h-screen bg-background text-foreground">
        <section className="relative isolate h-[70svh] min-h-[560px] overflow-hidden rounded-b-[40px] bg-forest md:h-[78svh]">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={property.gallery[0] ?? property.images[0]}
              alt={property.title}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(10,19,14,0.75) 0%, rgba(10,19,14,0.18) 55%, rgba(10,19,14,0.78) 100%), linear-gradient(90deg, rgba(10,19,14,0.42) 0%, rgba(10,19,14,0.12) 38%, rgba(10,19,14,0) 100%)",
              }}
            />
          </div>

          <div className="absolute right-4 top-24 z-20 flex gap-2 md:right-8 md:top-32">
            <button
              type="button"
              onClick={handleShare}
              aria-label="Compartir propiedad"
              className="glass flex h-11 w-11 items-center justify-center rounded-full text-forest-foreground shadow-soft transition hover:scale-[1.02] md:h-12 md:w-12"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>

          {shareToastOpen && (
            <div className="pointer-events-none absolute inset-x-0 top-5 z-30 flex justify-center">
              <div className="glass rounded-full px-3 py-2 text-xs font-medium text-forest-foreground shadow-soft">
                Enlace copiado
              </div>
            </div>
          )}

          <div className="relative z-10 flex h-full items-end">
            <Container className="pb-24 pt-28 md:pb-24">
              <div className="max-w-3xl">
                <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-forest-foreground/90">
                  <a href="/" className="transition hover:text-forest-foreground">Inicio</a>
                  <span>/</span>
                  <a href="/#propiedades" className="transition hover:text-forest-foreground">Propiedades</a>
                  <span>/</span>
                  <span className="text-forest-foreground">{property.title}</span>
                </div>

                <div className="mb-6 flex flex-wrap gap-2">
                  <a href="/#propiedades" className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-forest-foreground backdrop-blur-md transition hover:bg-forest-foreground/10">
                    <ChevronLeft className="h-4 w-4" />
                    Volver
                  </a>
                  <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-forest-foreground backdrop-blur-md">
                    <MapPin className="h-4 w-4" />
                    {property.neighborhood}, {property.city}
                  </span>
                  <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-forest-foreground backdrop-blur-md">
                    {propertyContent.idLabel} {property.reference}
                  </span>
                </div>

                <h1 className="max-w-3xl text-[clamp(2.75rem,7vw,5.25rem)] font-normal leading-[0.9] tracking-[-0.04em] text-forest-foreground">
                  {property.title.split(" ").slice(0, -1).join(" ")} <span className="font-serif italic text-gold">{property.title.split(" ").at(-1)}</span>
                </h1>

                <p className="mt-5 max-w-xl text-lg text-forest-foreground/90 md:text-xl" style={{ textShadow: "0 4px 18px rgba(0,0,0,0.25)" }}>{property.tagline}</p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => openSection("consultar")}
                    className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary-hover"
                  >
                    {propertyContent.consultButton}
                  </button>
                  <button
                    type="button"
                    onClick={() => showGallery(0)}
                    className="glass inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold text-forest-foreground backdrop-blur-md transition hover:bg-forest-foreground/10"
                  >
                    {propertyContent.galleryButton(gallery.length)}
                  </button>
                </div>
              </div>
            </Container>
          </div>
        </section>

        <div className="relative z-20 -mt-14 md:-mt-14">
          <Container>
            <div className="rounded-[28px] border border-border bg-white p-4 shadow-soft md:p-6">
              <div className="grid gap-4 md:grid-cols-[1.1fr_2.4fr] md:items-center">
                <div className="border-b border-border pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">{propertyContent.priceLabel}</p>
                  <p className="mt-2 font-serif text-[clamp(2.1rem,3vw,2.8rem)] text-primary">{formatUsd(property.priceUsd)}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                  {stats.map(({ icon: Icon, label, value }, index) => (
                    <div
                      key={label}
                      className={cn(
                        "flex items-center gap-3 md:min-h-[82px] md:border-l md:border-border md:pl-5",
                        index === 0 && "md:border-l-0 md:pl-0",
                        index > 0 && "border-t border-border pt-4 md:border-t-0 md:pt-0",
                        index % 2 === 0 && "md:border-l-0",
                      )}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF5EB] text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-serif text-2xl leading-none text-foreground">{value}</p>
                        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </div>

        <div className="sticky top-0 z-30 border-b border-border bg-white">
          <Container>
            <nav aria-label="Secciones de la propiedad" className="overflow-x-auto">
              <div className="flex min-w-max items-center gap-2 py-3">
                {renderedSections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => openSection(section.id)}
                    className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted/60"
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </nav>
          </Container>
        </div>

        <Container className="py-10 lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12">
          <div className="space-y-12">
            <section id="resumen" data-section className="scroll-mt-[120px]">
              <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible">
                <button
                  type="button"
                  onClick={() => showGallery(0)}
                  className="group relative h-[260px] min-w-[80%] snap-start overflow-hidden rounded-[28px] bg-muted md:col-span-2 md:row-span-2 md:h-[520px] md:min-w-0"
                >
                  <img
                    src={gallery[0]}
                    alt={property.title}
                    width={1600}
                    height={1000}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute right-4 top-4 inline-flex items-center justify-center rounded-full bg-black/40 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm">
                    {gallery.length === 1 ? "Ver la foto" : `Ver todas las fotos (${gallery.length})`}
                  </span>
                </button>
                {gallery.slice(1, 5).map((image, index) => {
                  const isLast = index === 3 && gallery.length > 5;
                  const remaining = gallery.length - 5;

                  return (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => showGallery(index + 1)}
                      className="group relative h-[260px] min-w-[80%] snap-start overflow-hidden rounded-[28px] bg-muted md:h-[250px] md:min-w-0"
                    >
                      <img
                        src={image}
                        alt={`${property.title} ${index + 2}`}
                        width={1200}
                        height={800}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      {isLast && (
                        <div className="absolute inset-0 flex items-center justify-center bg-forest/60 text-lg font-semibold text-forest-foreground">
                          +{remaining} foto{remaining === 1 ? "" : "s"}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {property.description && (
              <section id="descripcion" data-section className="border-t border-border pt-12 scroll-mt-[120px]">
                <SectionHeading eyebrow={propertyContent.eyebrow.description} title={`Sobre ${property.title}`} />
                <div className="mt-5">
                  <p
                    ref={descriptionRef}
                    className={cn("max-w-prose text-[17px] leading-relaxed text-foreground", !isExpanded && "line-clamp-4")}
                  >
                    {property.description}
                  </p>
                  {showReadMore && (
                    <button
                      type="button"
                      onClick={() => setIsExpanded((value) => !value)}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                    >
                      {isExpanded ? "Leer menos" : "Leer más"}
                      <ArrowRight className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-90")} />
                    </button>
                  )}
                </div>
              </section>
            )}

            {property.equipment.length > 0 && (
              <section id="equipamiento" data-section className="border-t border-border pt-12 scroll-mt-[120px]">
                <SectionHeading eyebrow={propertyContent.eyebrow.equipment} title="Equipamiento de la vivienda" />
                <div className="mt-5 grid gap-0 border-y border-border md:grid-cols-2">
                  {property.equipment.map((item, index) => (
                    <div
                      key={item}
                      className={cn(
                        "flex items-center gap-3 border-b border-border py-4 md:pr-5",
                        index % 2 === 1 && "md:border-l md:pl-5",
                        index === property.equipment.length - 1 && "border-b-0",
                      )}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF5EB] text-primary">
                        <Check className="h-4 w-4" />
                      </span>
                      <span className="text-[15px] text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {property.neighborhoodAmenities.length > 0 && (
              <section id="barrio" data-section className="border-t border-border pt-12 scroll-mt-[120px]">
                <div className="rounded-[32px] bg-[#0A130E] p-6 sm:p-8">
                  <SectionHeading eyebrow={propertyContent.eyebrow.neighborhood} title="Amenities del barrio cerrado" className="text-forest-foreground" />
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {property.neighborhoodAmenities.map((amenity, index) => {
                      const Icon = amenityIcons[amenity.icon];
                      return (
                        <div
                          key={amenity.label}
                          className="rounded-[24px] border border-white/10 bg-white/[0.02] p-5"
                          style={{ animationDelay: `${index * 90}ms` }}
                        >
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
                            <Icon className="h-10 w-10" />
                          </div>
                          <p className="mt-5 text-base font-medium text-white">{amenity.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            <section id="ubicacion" data-section className="border-t border-border pt-12 scroll-mt-[120px]">
              <SectionHeading eyebrow={propertyContent.eyebrow.location} title={`Ubicación en ${property.neighborhood}`} />
              {!mapVisible ? (
                <div className="mt-5 flex h-[420px] flex-col items-center justify-center rounded-[32px] border border-border bg-[radial-gradient(circle_at_top_left,rgba(19,137,26,0.15),transparent_35%),linear-gradient(135deg,#f4f7f1,#edf3ec)] p-8 text-center">
                  <div className="mb-5 h-16 w-16 rounded-full bg-primary/10 text-primary">
                    <div className="flex h-full w-full items-center justify-center">
                      <MapPin className="h-7 w-7" />
                    </div>
                  </div>
                  <p className="max-w-md text-base text-foreground/80">Consulta la ubicación exacta del barrio y sus accesos.</p>
                  <button
                    type="button"
                    onClick={() => setMapVisible(true)}
                    className="mt-6 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
                  >
                    Cargar mapa
                  </button>
                </div>
              ) : (
                <div className="mt-5 overflow-hidden rounded-[32px] border border-border shadow-none">
                  <iframe
                    title={`${property.title} en el mapa`}
                    src={mapUrl}
                    className="h-[420px] w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-serif text-2xl text-foreground">{property.title}</p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {property.neighborhood}, {property.city}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={mapSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2 text-sm font-medium text-forest-foreground"
                  >
                    {propertyContent.mapButtons.googleMaps}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground"
                  >
                    {propertyContent.mapButtons.directions}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </section>
          </div>

          <aside id="consultar" data-section className="mt-10 scroll-mt-[120px] lg:mt-0">
            <div className="lg:sticky lg:top-24">
              <InquiryWizard property={property} />
            </div>
          </aside>
        </Container>

        <Container className="py-12">
          <SectionHeading eyebrow="SELECCIÓN EDENNIA" title="Otras propiedades que te pueden interesar" />
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedProperties.map((item) => (
              <PropertyCard key={item.slug} p={item} />
            ))}
          </div>
        </Container>

        <Container className="pb-12 pt-6">
          <div className="rounded-[40px] bg-[linear-gradient(135deg,#13891A_0%,#0E6B14_100%)] px-6 py-8 text-forest-foreground md:px-10 md:py-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-gold">Consulta rápida</p>
                <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight text-white">¿Te interesa {property.title}?</h2>
                <p className="mt-3 text-base leading-relaxed text-forest-foreground/80">
                  Cuéntanos qué buscas y te respondemos con opciones concretas en menos de 24 h.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => openSection("consultar")}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-primary transition hover:bg-forest-foreground"
                >
                  Consultar esta propiedad
                </button>
                <a
                  href={`https://wa.me/595975500150?text=${encodeURIComponent(`Hola, me interesa la propiedad ${property.title} (ref. ${property.reference}). Quiero más información.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/40 bg-transparent px-6 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  Hablar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Container>

        <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
          <div className="glass flex items-center justify-between gap-3 rounded-[24px] p-3 shadow-soft">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{propertyContent.priceLabel}</p>
              <p className="font-serif text-2xl text-foreground">{formatUsd(property.priceUsd)}</p>
            </div>
            <button
              type="button"
              onClick={() => setMobileInquiryOpen(true)}
              className="rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
            >
              Consultar
            </button>
          </div>
        </div>

        <Drawer open={mobileInquiryOpen} onOpenChange={setMobileInquiryOpen}>
          <DrawerContent className="rounded-t-[32px] border-none bg-background p-0">
            <DrawerHeader className="p-5">
              <div className="flex items-center justify-between">
                <DrawerTitle className="text-2xl font-medium text-foreground">{propertyContent.inquiry.title}</DrawerTitle>
                <button type="button" onClick={() => setMobileInquiryOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <DrawerDescription className="mt-2 text-sm text-muted-foreground">
                {propertyContent.inquiry.description}
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-5 pb-6">
              <InquiryWizard property={property} compact />
            </div>
          </DrawerContent>
        </Drawer>

        {viewerOpen && (
          <Suspense fallback={<div className="fixed inset-0 z-50 flex items-center justify-center bg-forest/80" /> }>
            <GalleryViewer
              gallery={gallery}
              title={property.title}
              activePhotoIndex={activePhotoIndex}
              onClose={() => setViewerOpen(false)}
              onChange={(direction) => {
                const total = gallery.length || 1;
                setActivePhotoIndex((current) => (current + direction + total) % total);
              }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            />
          </Suspense>
        )}
      </main>
    </SiteLayout>
  );
}

function PropertyPageSkeleton() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="animate-pulse space-y-6 rounded-[32px] border border-border bg-card p-6 shadow-soft">
          <div className="h-8 w-40 rounded-full bg-muted" />
          <div className="h-16 w-full max-w-xl rounded-2xl bg-muted" />
          <div className="h-6 w-full max-w-md rounded-xl bg-muted" />
          <div className="grid gap-4 md:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-24 rounded-[24px] bg-muted" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function NotFoundPropertyPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-xl rounded-[32px] border border-border bg-card p-8 text-center shadow-soft">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft text-primary">
          <MapPin className="h-8 w-8" />
        </div>
        <p className="text-[11px] font-semibold tracking-[0.26em] text-primary">404</p>
        <h1 className="mt-3 font-serif text-5xl text-foreground">{propertyContent.notFound.title}</h1>
        <p className="mt-3 text-base text-muted-foreground">{propertyContent.notFound.description}</p>
        <Link to="/" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
          {propertyContent.notFound.back}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
