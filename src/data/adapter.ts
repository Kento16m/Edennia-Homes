import { properties as realProperties, formatArea, formatUsd, getStageLabel, type Property, type PropertyCategory } from "./properties";

export function assetUrl(path: string): string {
  if (!path) return path;

  const trimmed = path.trim();
  const hasProtocol = /^[A-Za-z][A-Za-z0-9+.-]*:\/\//.test(trimmed);
  const body = hasProtocol ? trimmed.replace(/^[A-Za-z][A-Za-z0-9+.-]*:\/\//, "") : trimmed;
  const encoded = body
    .split("/")
    .map((segment) => (segment ? encodeURIComponent(segment) : segment))
    .join("/");

  return hasProtocol ? `${trimmed.slice(0, trimmed.indexOf("//") + 2)}${encoded}` : encoded;
}

function normalizePlanLabel(src: string): string {
  const fileName = src.split("/").pop()?.split("?")[0] ?? src;
  const base = fileName.replace(/\.[^.]+$/, "");
  return base
    .replace(/^\d+[-_\s]*/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return realProperties.find((property) => property.slug === slug);
}

export function propertiesByCategory(category: PropertyCategory): Property[] {
  return realProperties.filter((property) => property.category === category);
}

export function offers(): Property[] {
  return realProperties.filter((property) => Boolean(property.offer));
}

export function featuredProperties(): Property[] {
  return realProperties.filter((property) => Boolean(property.featured));
}

export function formatPrice(value: number, lang: "es" | "en" = "es") {
  const formatter = new Intl.NumberFormat(lang === "en" ? "en-US" : "es-PY", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return formatter.format(value);
}

export function isRender(src: string): boolean {
  return src.toLowerCase().includes("render");
}

export function getCardFacts(property: Property) {
  const stageLabel = getStageLabel(property) ?? (property.featured ? "Destacada" : undefined);
  const locationLabel = [property.neighborhood, property.city].filter(Boolean).join(", ");
  const priceMode = property.units?.length ? "from" : "exact";
  const bedroomsLabel = property.bedrooms === 0 ? "Monoambiente" : `${property.bedrooms} dorm.`;
  const bathroomsLabel = property.bathrooms === 1 ? "1 baño" : `${property.bathrooms} baños`;
  const areaLabel = property.units?.length ? `desde ${formatArea(property.areaM2 ?? 0)}` : formatArea(property.areaM2 ?? 0);
  const facts = [
    { key: "bedrooms", label: bedroomsLabel },
    { key: "bathrooms", label: bathroomsLabel },
    { key: "area", label: areaLabel },
    ...(property.garages && property.garages > 0 ? [{ key: "garage", label: `${property.garages} gar.` }] : []),
  ];

  return {
    stageLabel,
    locationLabel,
    price: {
      prefix: priceMode === "from" ? "Desde" : undefined,
      amount: formatUsd(property.priceUsd ?? 0),
    },
    facts,
    chips: Array.isArray(property.equipment) ? property.equipment : [],
  };
}

export function getPropertyView(property: Property, lang: "es" | "en" = "es") {
  const description = lang === "en" ? property.descriptionEn ?? property.description : property.description;
  const tagline = property.slogans?.[0] ?? property.slogansEn?.[0] ?? property.title;
  const images = property.images.map((image) => assetUrl(image));
  const plans = (property.plans ?? []).map((plan) => {
    if (typeof plan === "string") {
      const label = normalizePlanLabel(plan); 
      return { src: assetUrl(plan), label: label || "Plano" };
    }

    const label = lang === "en" ? (plan.labelEn ?? plan.label ?? normalizePlanLabel(plan.src)) : plan.label ?? normalizePlanLabel(plan.src) ?? "Plano";
    return { src: assetUrl(plan.src), label: label || "Plano" };
  });

  const units = (property.units ?? []).map((unit) => ({
    ...unit,
    label: lang === "en" ? unit.labelEn ?? unit.label : unit.label,
    area: lang === "en" ? unit.areaEn ?? unit.area : unit.area,
    floor: unit.floor ? (lang === "en" ? unit.floorEn ?? unit.floor : unit.floor) : undefined,
  }));

  const whatsappMessage =
    lang === "en"
      ? property.whatsappMessageEn ?? property.whatsappMessage ?? `Hello Edennia Homes, I am interested in ${property.title}. I would like more information.`
      : property.whatsappMessage ?? `Hola Edennia Homes, me interesa ${property.title}. Quisiera más información.`;

  return {
    title: property.title,
    category: property.category,
    tagline,
    description,
    images,
    plans,
    units,
    priceMode: units.length > 0 ? "from" : "exact",
    bedroomsLabel: property.bedrooms === 0 ? "Monoambiente" : `${property.bedrooms} dormitorios`,
    garage: property.garage > 0 ? property.garage : undefined,
    land: property.land,
    whatsapp: {
      number: property.whatsappNumber || "595975500150",
      message: whatsappMessage,
    },
  };
}

function splitLines(value: string): string[] {
  return value
    .replace(/\r/g, "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function isSpecLine(line: string): boolean {
  return /^[^:\n]{2,45}:\s+\S/.test(line) && !/^\d+\s/.test(line.trim());
}

function isDiscardedTypology(paragraph: string, hasUnits: boolean): boolean {
  if (!hasUnits) return false;
  const lines = splitLines(paragraph);
  return lines.length > 1 && /:$/.test(lines[0].trim()) && lines.slice(1).every((line) => /^\d+\.?\s/.test(line));
}

function isDisclaimerParagraph(paragraph: string): boolean {
  const normalized = paragraph.trim().replace(/\s+/g, " ");
  return /^(Aviso legal|Precios, disponibilidad|Los renders|Unidades disponibles sujetas)/i.test(normalized);
}

function normalizeDescriptionText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function splitDescription(
  text: string,
  opts: { hasUnits?: boolean; unitNote?: string } = {},
): {
  intro: string[];
  specs: { label: string; value: string }[];
  notes: string[];
  lists: { title: string; items: string[] }[];
  disclaimer?: string;
  discarded?: string[];
} {
  const paragraphs = text
    .replace(/\r/g, "")
    .split(/\n\s*\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (!paragraphs.length) {
    return { intro: [], specs: [], notes: [], lists: [] };
  }

  const intro: string[] = [];
  const specs: { label: string; value: string }[] = [];
  const notes: string[] = [];
  const lists: { title: string; items: string[] }[] = [];
  const discarded: string[] = [];
  const specParagraphs: string[] = [];
  let disclaimer: string | undefined;
  const hasUnits = Boolean(opts.hasUnits);
  const unitNote = opts.unitNote ? normalizeDescriptionText(opts.unitNote) : "";

  for (const paragraph of paragraphs) {
    const normalizedParagraph = normalizeDescriptionText(paragraph);

    if (hasUnits && unitNote && (normalizedParagraph === unitNote || normalizedParagraph.includes(unitNote))) {
      discarded.push(paragraph);
      continue;
    }

    if (isDisclaimerParagraph(paragraph)) {
      disclaimer = paragraph;
      continue;
    }

    if (/^Nota:/i.test(paragraph.trim())) {
      notes.push(paragraph);
      continue;
    }

    const lines = splitLines(paragraph);
    const titleLine = lines[0] ? lines[0].replace(/:$/, "").trim() : "";
    const listItems = lines.slice(1).map((line) => line.replace(/^\d+\.?\s*/, "").trim()).filter(Boolean);
    const isListBlock =
      lines.length > 1 &&
      /^(Tipologías representativas|Unidades representativas)$/i.test(titleLine) &&
      lines.slice(1).every((line) => /^\d+\.?\s/.test(line));

    if (isListBlock) {
      if (hasUnits) {
        discarded.push(paragraph);
      } else {
        lists.push({ title: titleLine, items: listItems });
      }
      continue;
    }

    if (isDiscardedTypology(paragraph, hasUnits)) {
      discarded.push(paragraph);
      continue;
    }

    const isSpecBlock = lines.length > 0 && lines.every(isSpecLine);
    if (isSpecBlock) {
      specParagraphs.push(paragraph);
      continue;
    }

    intro.push(paragraph);
  }

  for (const block of specParagraphs) {
    for (const line of splitLines(block)) {
      const match = line.match(/^([^:]+):\s*(.+)$/);
      if (match) {
        specs.push({ label: match[1].trim(), value: match[2].trim() });
      }
    }
  }

  const result = { intro, specs, notes, lists, disclaimer, discarded: discarded.length ? discarded : undefined };
  if (!result.intro.length) {
    return { ...result, intro: paragraphs };
  }

  return result;
}

export { realProperties as properties };
