import { properties } from "../src/data/properties.ts";
import { splitDescription } from "../src/data/adapter.ts";

const lines = [];
let totalMissingPhrases = 0;

for (const property of properties) {
  const result = splitDescription(property.description ?? "", {
    hasUnits: (property.units ?? []).length > 0,
    unitNote: property.unitNote,
  });

  const discarded = result.discarded ?? [];
  const totalClassified = result.intro.length + result.specs.length + result.notes.length + result.lists.length + (result.disclaimer ? 1 : 0);
  const totalParagraphs = (property.description ?? "")
    .replace(/\r/g, "")
    .split(/\n\s*\n+/)
    .map((p) => p.trim())
    .filter(Boolean).length;

  const lostParagraphs = totalParagraphs - totalClassified - discarded.length;
  if (lostParagraphs > 1) {
    totalMissingPhrases += 1;
  }

  lines.push(
    `${property.title}: intro=${result.intro.length} specs=${result.specs.length} notes=${result.notes.length} lists=${result.lists.length} disclaimer=${result.disclaimer ? 1 : 0} discarded=${discarded.length} ${discarded.length ? JSON.stringify(discarded) : "[]"}`,
  );
}

console.log(lines.join("\n"));
console.log(`\nTotal de propiedades procesadas: ${properties.length}`);
if (totalMissingPhrases > 0) {
  console.warn(`Advertencia: ${totalMissingPhrases} propiedades han perdido más de un párrafo sin explicación.`);
} else {
  console.log("No se detectan pérdidas de más de un párrafo sin explicación.");
}
