import {
  properties as legacyProperties,
  type Property as LegacyProperty,
  type PropertyCategory as LegacyPropertyCategory,
} from "./properties.legacy";

export { CATEGORY_META } from "./properties.legacy";
export type PropertyCategory = LegacyPropertyCategory;
export type PropertyAmenityIcon = "Waves" | "Trees" | "ShieldCheck";

export type PropertyDocument = {
  label: string;
  labelEn?: string;
  url: string;
  kind?: "brochure" | "pricelist" | "plans" | "legal" | "other";
  sizeMb?: number;
  updatedAt?: string;
};

export type PropertyPlanEntry = string | { src: string; label?: string; labelEn?: string };

export type Property = LegacyProperty & {
  slug: string;
  reference?: string;
  tag?: "featured" | "offPlan" | "ready";
  tagline?: string;
  neighborhood?: string;
  address?: string;
  city: string;
  priceUsd?: number;
  areaM2?: number;
  builtM2?: number;
  landM2?: number;
  garages?: number;
  garageLabel?: string;
  galleryIds?: string[];
  gallery?: string[];
  equipment?: string[];
  neighborhoodAmenities?: { label: string; icon: PropertyAmenityIcon }[];
  mapQuery?: string;
  featured?: boolean;
  documents?: PropertyDocument[];
  plans?: PropertyPlanEntry[];
};

const isDev = typeof import.meta !== "undefined" && Boolean((import.meta as { env?: { DEV?: boolean } }).env?.DEV);

const toSlug = (value: string) => value.toLowerCase();

const locationOverrides = new Map<string, { city: string; neighborhood?: string }>([
  ["M4L2A", { city: "Luque", neighborhood: "Barrio Paraíso" }],
  ["M4L2B", { city: "Luque", neighborhood: "Barrio Paraíso" }],
  ["M4L3", { city: "Luque", neighborhood: "Barrio Paraíso" }],
  ["M4L6B", { city: "Luque", neighborhood: "Barrio Paraíso" }],
  ["ALEMANIA-SAJONIA", { city: "Asunción", neighborhood: "Sajonia" }],
  ["CENTRAL-PARK", { city: "Asunción", neighborhood: "Santísima Trinidad" }],
  ["GARDEN-PARK", { city: "Asunción" }],
  ["UNIVERSITY-PARK", { city: "San Lorenzo" }],
  ["AFIANZA-RECOLETA-8", { city: "Asunción", neighborhood: "Recoleta" }],
  ["ZENITH-COLOMBIA", { city: "Asunción", neighborhood: "Centro Histórico" }],
  ["VENIRE-568-RECOLETA", { city: "Asunción", neighborhood: "Recoleta" }],
  ["VENIRE:568- RECOLETA", { city: "Asunción", neighborhood: "Recoleta" }],
  ["MARENA", { city: "Luque", neighborhood: "Zona CIT" }],
  ["VENIRE-VM", { city: "Asunción", neighborhood: "Villa Morra" }],
]);

const resolveLocation = (location: string, propertyId?: string) => {
  const candidateKeys = [propertyId, location]
    .filter(Boolean)
    .map((value) => value?.trim())
    .filter((value): value is string => Boolean(value));

  for (const key of candidateKeys) {
    const override = locationOverrides.get(key) ?? locationOverrides.get(key.replace(/\s+/g, "-"));
    if (override) {
      return {
        city: override.city,
        neighborhood: override.neighborhood,
      };
    }
  }

  const lowerLocation = location.toLowerCase();
  const locationBasedOverride = [
    { matcher: /barrio paraíso|luque/i, value: { city: "Luque", neighborhood: "Barrio Paraíso" } },
    { matcher: /alemania|sajonia/i, value: { city: "Asunción", neighborhood: "Sajonia" } },
    { matcher: /santísima trinidad|central park/i, value: { city: "Asunción", neighborhood: "Santísima Trinidad" } },
    { matcher: /garden park/i, value: { city: "Asunción" } },
    { matcher: /university park|san lorenzo/i, value: { city: "San Lorenzo" } },
    { matcher: /afianza.*recoleta|recoleta.*asunción/i, value: { city: "Asunción", neighborhood: "Recoleta" } },
    { matcher: /zenith.*colombia|centro histórico/i, value: { city: "Asunción", neighborhood: "Centro Histórico" } },
    { matcher: /venire.*recoleta|568.*recoleta/i, value: { city: "Asunción", neighborhood: "Recoleta" } },
    { matcher: /marena|zona cit|luque/i, value: { city: "Luque", neighborhood: "Zona CIT" } },
    { matcher: /villamorra|villa morra/i, value: { city: "Asunción", neighborhood: "Villa Morra" } },
  ].find(({ matcher }) => matcher.test(lowerLocation));

  if (locationBasedOverride) {
    return locationBasedOverride.value;
  }

  const parts = location
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length <= 2) {
    return { neighborhood: parts[0] ?? "", city: parts.slice(-1).join(", ") || "" };
  }

  return {
    neighborhood: parts.slice(0, -2).join(", "),
    city: parts.slice(-2).join(", "),
  };
};

const normalizeOfferLabel = (value?: string) => value?.trim();

const hasTifAsset = (property: LegacyProperty) => {
  const paths = [...(property.images ?? []), ...(property.plans ?? [])];
  return paths.some((path) => /\.tif(?:$|[?#])/i.test(String(path)));
};

const stripTifAssets = <T extends string | undefined>(value?: T[]): T[] | undefined => {
  if (!value) return value;
  return value.filter((path) => !/\.tif(?:$|[?#])/i.test(String(path))) as T[];
};

const normalizeProperty = (property: LegacyProperty): Property => {
  const { neighborhood, city } = resolveLocation(property.location, property.id);
  const offerLabel = normalizeOfferLabel(property.offerLabel);
  const offerLabelEn = normalizeOfferLabel(property.offerLabelEn);

  return {
    ...property,
    slug: toSlug(property.id),
    reference: property.category === "casas" ? property.id : undefined,
    category: property.category,
    tag: property.featured ? "featured" : property.offer ? "offPlan" : "ready",
    tagline: property.slogans?.[0] ?? property.title,
    neighborhood: neighborhood || undefined,
    city: city || property.location,
    address: property.location,
    priceUsd: property.price,
    areaM2: property.area,
    builtM2: property.area,
    landM2: property.land ?? 0,
    garages: property.garage,
    garageLabel: property.garage > 0 ? "Privado" : "Sin garaje",
    gallery: property.images,
    galleryIds: property.images,
    equipment: property.amenities ?? [],
    neighborhoodAmenities: (property.communityAmenities ?? []).map((label) => ({
      label,
      icon: (label.includes("piscina") ? "Waves" : label.includes("seguridad") ? "ShieldCheck" : "Trees") as PropertyAmenityIcon,
    })),
    mapQuery: property.location,
    offerLabel,
    offerLabelEn,
    featured: Boolean(property.featured),
    documents: property.documents,
    plans: property.plans,
  };
};

export const properties: Property[] = legacyProperties.map((property) => {
  const tifPaths = [
    ...(property.images ?? []).filter((path) => /\.tif(?:$|[?#])/i.test(String(path))),
    ...(property.plans ?? []).filter((path) => /\.tif(?:$|[?#])/i.test(String(path))),
  ];

  if (tifPaths.length > 0 && isDev) {
    console.warn(`[properties] Excluding TIFF asset(s) for ${property.title}: ${tifPaths.join(", ")}`);
  }

  return normalizeProperty({
    ...property,
    images: stripTifAssets(property.images),
    plans: stripTifAssets(property.plans),
  });
});

export const formatUsd = (value: number) => `USD ${Math.round(value).toLocaleString("es-ES")}`;
export const formatArea = (value: number) => `${Number(value).toLocaleString("es-ES")} m²`;

export function getStageLabel(property: Property) {
  const label = normalizeOfferLabel(property.offerLabel)?.trim();
  if (!label) return undefined;

  const normalized = label.toLowerCase();
  const categoryNames = new Set(["condominio", "condominios", "apartamento", "apartamentos", "casa", "casas", "oportunidad", "oportunidades"]);
  if (categoryNames.has(normalized)) {
    return undefined;
  }

  return label;
}

export function getProperty(id: string) {
  return properties.find((property) => property.id === id || property.slug === id);
}

export function getPropertyBySlug(slug: string) {
  return properties.find((property) => property.slug === slug);
}

export function propertiesByCategory(category: PropertyCategory) {
  return properties.filter((property) => property.category === category);
}

export function offers() {
  return properties.filter((property) => Boolean(property.offer));
}

export function featuredProperties() {
  return properties.filter((property) => Boolean(property.featured));
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
