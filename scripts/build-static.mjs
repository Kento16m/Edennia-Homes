import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const rootDir = resolve(import.meta.dirname, "..");
const sourceDir = join(rootDir, ".output", "public");
const distDir = join(rootDir, "dist");

if (!existsSync(sourceDir)) {
  throw new Error(`Static build source not found at ${sourceDir}. Run "vite build" first.`);
}

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });
cpSync(sourceDir, distDir, { recursive: true });

const assetsDir = join(distDir, "assets");
if (!existsSync(assetsDir)) {
  throw new Error(`No generated assets were found in ${assetsDir}.`);
}

const assetFiles = readdirSync(assetsDir);
const entryJs = assetFiles.find((file) => /^index-.*\.js$/.test(file));
const stylesCss = assetFiles.find((file) => /^styles-.*\.css$/.test(file));

if (!entryJs) {
  throw new Error(`Unable to locate the generated client entry in ${assetsDir}.`);
}

const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Edennia Homes — propiedades premium en Paraguay." />
    <title>Edennia Homes</title>
    <meta name="robots" content="index, follow" />
    <link rel="icon" type="image/png" href="./favicon.png" />
    ${stylesCss ? `<link rel="stylesheet" href="./assets/${stylesCss}" />` : ""}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./assets/${entryJs}"></script>
  </body>
</html>
`;

writeFileSync(join(distDir, "index.html"), html, "utf-8");
writeFileSync(join(distDir, "404.html"), html, "utf-8");

console.log(`Static export created at ${distDir}`);
console.log(`Entry bundle: ${entryJs}`);
if (stylesCss) console.log(`Styles bundle: ${stylesCss}`);
