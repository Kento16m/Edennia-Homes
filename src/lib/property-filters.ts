import { getStageLabel, type Property } from "@/data/properties";

export type PropertyFilters = {
  type?: "casas" | "apartamentos" | "condominios" | "oportunidades";
  q?: string;
  zona?: string[];
  min?: number;
  max?: number;
  dorm?: number[];
  banos?: number[];
  m2min?: number;
  m2max?: number;
  cochera?: boolean;
  etapa?: string[];
  amen?: string[];
  orden?: "destacadas" | "precio-asc" | "precio-desc" | "m2-desc" | "nombre";
};

const normalizeText = (value?: string) =>
  (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const amenityMatchers: Record<string, RegExp> = {
  piscina: /piscina|pileta/i,
  quincho: /quincho|parrill|barbacoa/i,
  seguridad: /seguridad|control de acceso|acceso residencial|portero/i,
  gimnasio: /gimnasio/i,
  aire: /aire acondicionado|climatizad/i,
  coworking: /cowork/i,
};

const stageLabels = ["Lista vigente", "En venta", "En construcción", "Preventa", "En pozo"] as const;

const parseCsv = (value?: string) => {
  if (!value) return [] as string[];
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
};

const matchDormi = (property: Property, values: number[]) => {
  if (!values.length) return true;
  return values.some((value) => {
    if (value === 0) return property.bedrooms <= 1;
    if (value === 3) return property.bedrooms >= 3;
    return property.bedrooms >= value;
  });
};

const matchBanos = (property: Property, values: number[]) => {
  if (!values.length) return true;
  return values.some((value) => property.bathrooms >= value);
};

const propertyText = (property: Property) => {
  const location = [property.city, property.neighborhood, property.address, property.reference].filter(Boolean).join(" ");
  return normalizeText(`${property.title} ${location} ${property.reference ?? ""}`);
};

const matchAmenities = (property: Property, selected: string[]) => {
  if (!selected.length) return true;
  const tokens = [
    ...(property.amenities ?? []),
    ...(property.neighborhoodAmenities ?? []).map((item) => item.label),
    ...(property.communityAmenities ?? []),
  ].join(" ");

  return selected.every((key) => {
    const matcher = amenityMatchers[key];
    return matcher ? matcher.test(tokens) : false;
  });
};

export function filterProperties(list: Property[], filters: PropertyFilters = {}) {
  const q = normalizeText(filters.q);
  const zona = (filters.zona ?? []).map(normalizeText).filter(Boolean);
  const dorm = filters.dorm ?? [];
  const banos = filters.banos ?? [];
  const etapa = (filters.etapa ?? []).map(normalizeText).filter(Boolean);
  const amen = (filters.amen ?? []).filter(Boolean);

  return list.filter((property) => {
    if (filters.type === "casas" && property.category !== "casas") return false;
    if (filters.type === "apartamentos" && property.category !== "apartamentos") return false;
    if (filters.type === "condominios" && property.category !== "condominios") return false;
    if (filters.type === "oportunidades" && !property.offer) return false;

    if (q) {
      const haystack = propertyText(property);
      if (!haystack.includes(q)) return false;
    }

    if (zona.length > 0) {
      const matchesZone = zona.some((zone) => normalizeText(property.city).includes(zone));
      if (!matchesZone) return false;
    }

    if (typeof filters.min === "number" && property.priceUsd < filters.min) return false;
    if (typeof filters.max === "number" && property.priceUsd > filters.max) return false;
    if (dorm.length > 0 && !matchDormi(property, dorm)) return false;
    if (banos.length > 0 && !matchBanos(property, banos)) return false;
    if (typeof filters.m2min === "number" && property.areaM2 < filters.m2min) return false;
    if (typeof filters.m2max === "number" && property.areaM2 > filters.m2max) return false;
    if (filters.cochera && !(property.garages > 0)) return false;

    if (etapa.length > 0) {
      const actualStage = normalizeText(getStageLabel(property));
      if (!actualStage || !etapa.some((value) => actualStage.includes(value))) return false;
    }

    if (amen.length > 0 && !matchAmenities(property, amen)) return false;

    return true;
  });
}

export function sortProperties(list: Property[], orden: PropertyFilters["orden"] = "destacadas") {
  const sorted = [...list];

  switch (orden) {
    case "precio-asc":
      sorted.sort((a, b) => a.priceUsd - b.priceUsd);
      break;
    case "precio-desc":
      sorted.sort((a, b) => b.priceUsd - a.priceUsd);
      break;
    case "m2-desc":
      sorted.sort((a, b) => (b.areaM2 ?? 0) - (a.areaM2 ?? 0));
      break;
    case "nombre":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
      break;
  }

  return sorted;
}

export const parseCsvFilters = {
  text(value?: string) {
    return parseCsv(value);
  },
  numbers(value?: string) {
    return parseCsv(value)
      .map((part) => Number(part))
      .filter((part) => Number.isFinite(part));
  },
};

export function getFacetCounts(list: Property[], filters: PropertyFilters = {}) {
  const withoutType = { ...filters, type: undefined };
  const withoutZona = { ...filters, zona: undefined };
  const withoutEtapa = { ...filters, etapa: undefined };
  const withoutAmen = { ...filters, amen: undefined };

  const typeCounts = {
    todas: filterProperties(list, withoutType).length,
    casas: filterProperties(list, { ...withoutType, type: "casas" }).length,
    apartamentos: filterProperties(list, { ...withoutType, type: "apartamentos" }).length,
    condominios: filterProperties(list, { ...withoutType, type: "condominios" }).length,
    oportunidades: filterProperties(list, { ...withoutType, type: "oportunidades" }).length,
  };

  const uniqueZones = Array.from(new Set(list.map((item) => item.city))).sort((a, b) => a.localeCompare(b));
  const zonaCounts = Object.fromEntries(
    uniqueZones.map((city) => [city, filterProperties(list, { ...withoutZona, zona: [city] }).length]),
  );

  const uniqueStages = stageLabels.filter((stage) =>
    list.some((item) => normalizeText(getStageLabel(item)) === normalizeText(stage)),
  );
  const etapaCounts = Object.fromEntries(
    uniqueStages.map((stage) => [stage, filterProperties(list, { ...withoutEtapa, etapa: [stage] }).length]),
  );

  const amenCounts = Object.fromEntries(
    Object.keys(amenityMatchers).map((key) => [key, filterProperties(list, { ...withoutAmen, amen: [key] }).length]),
  );

  return { type: typeCounts, zona: zonaCounts, etapa: etapaCounts, amen: amenCounts };
}
