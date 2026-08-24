import { copyFile, mkdir, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const routesDir = path.join(root, "src", "routes");
const indexFile = path.join(distDir, "index.html");

function idsFromExportedArray(source, exportName) {
  const start = source.indexOf(`export const ${exportName}`);
  const end = source.indexOf("];", start);
  if (start === -1 || end === -1) {
    throw new Error(`Unable to find ${exportName} route data`);
  }

  return [...source.slice(start, end).matchAll(/^\s+id:\s*"([^"]+)"/gm)].map(
    ([, id]) => id,
  );
}

async function staticRoutes() {
  const routeFiles = await readdir(routesDir);
  return routeFiles
    .filter((file) => file.endsWith(".tsx"))
    .filter((file) => file !== "__root.tsx" && file !== "index.tsx")
    .filter((file) => !file.includes("$"))
    .map((file) => file.replace(/\.index\.tsx$/, "").replace(/\.tsx$/, "").replaceAll(".", "/"));
}

async function dataRoutes() {
  const [relations, places] = await Promise.all([
    readFile(path.join(root, "src", "lib", "relations.ts"), "utf8"),
    readFile(path.join(root, "src", "lib", "places.ts"), "utf8"),
  ]);

  return [
    ...idsFromExportedArray(relations, "NODES").map((id) => `people/${id}`),
    ...idsFromExportedArray(places, "PLACES").map((id) => `places/${id}`),
  ];
}

const routes = [...new Set([...(await staticRoutes()), ...(await dataRoutes())])];

await Promise.all(
  routes.map(async (route) => {
    const routeDir = path.join(distDir, route);
    await mkdir(routeDir, { recursive: true });
    await copyFile(indexFile, path.join(routeDir, "index.html"));
  }),
);

// Keep the SPA fallback for unknown links while known routes receive HTTP 200.
await copyFile(indexFile, path.join(distDir, "404.html"));

console.log(`Prepared ${routes.length} GitHub Pages routes.`);
