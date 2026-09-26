import { copyFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const routesDir = path.join(root, "src", "routes");
const indexFile = path.join(distDir, "index.html");
const spaIndexFile = path.join(distDir, "index.github.html");
export const publicBase = "https://matchmalone0219-bat.github.io/semper-vigilans-archive/";
export const SITEMAP_SKIP = new Set(["login"]);

const routeMeta = {
  dossier: ["电影档案", "《新蝙蝠侠2》基本信息、演员阵容、剧情线索与拍摄日志。"],
  cases: ["重案卷宗与物证", "追踪谜语人案件、哥谭重案与关键证物。"],
  recap: ["前作与宇宙编年", "回顾《新蝙蝠侠》电影、企鹅人剧集、小说与漫画故事线。"],
  roots: ["原著与影史溯源", "整理里夫斯蝙蝠侠宇宙的漫画、电影与黑色侦探渊源。"],
  craft: ["幕后与视听", "解析电影摄影、配乐、声音设计与英伦取景地。"],
  gear: ["蝙蝠侠装备库", "查看蝙蝠战衣、战车与战术装备档案。"],
  merch: ["官方周边与收藏品", "整理官方授权人偶、道具复刻、雕像、载具与出版物。"],
  gallery: ["剧照与片场画廊", "浏览第一部、企鹅人与《新蝙蝠侠2》公开剧照及片场记录。"],
  interviews: ["人物访谈", "整理导演、演员与主创关于《新蝙蝠侠》系列的公开访谈与创作观点。"],
  search: ["全站搜索", "检索人物、地点、装备、拍摄日志、剧情线索与收藏档案。"],
  rataalada: ["谜语人暗号终端", "进入 Rataalada 风格互动谜题终端。"],
  people: ["人物名册", "查看哥谭人物生平、阵营与出场档案。"],
  places: ["哥谭地点", "查看哥谭关键地点与相关人物、作品档案。"],
};

function htmlForRoute(html, route, base = publicBase) {
  const section = route.split("/")[0];
  const [label, description] = routeMeta[section] ?? [
    "影迷档案",
    "《新蝙蝠侠2》非官方中文影迷档案库。",
  ];
  const title = `${label} · Semper Vigilans`;
  const url = `${base}${route}/`;

  return html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${description}" />`,
    )
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`)
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${title}" />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${description}" />`,
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${url}" />`,
    );
}

function idsFromExportedArray(source, exportName) {
  const start = source.indexOf(`export const ${exportName}`);
  const end = source.indexOf("];", start);
  if (start === -1 || end === -1) {
    throw new Error(`Unable to find ${exportName} route data`);
  }

  return [...source.slice(start, end).matchAll(/^\s+id:\s*"([^"]+)"/gm)].map(([, id]) => id);
}

async function staticRoutes() {
  const routeFiles = await readdir(routesDir);
  return routeFiles
    .filter((file) => file.endsWith(".tsx"))
    .filter((file) => file !== "__root.tsx" && file !== "index.tsx")
    .filter((file) => !file.includes("$"))
    .map((file) =>
      file
        .replace(/\.index\.tsx$/, "")
        .replace(/\.tsx$/, "")
        .replaceAll(".", "/"),
    );
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

function escapeXml(value) {
  return value.replace(/[&<>"']/g, (ch) => {
    switch (ch) {
      case "&":
        return "\u0026amp;";
      case "<":
        return "\u0026lt;";
      case ">":
        return "\u0026gt;";
      case '"':
        return "\u0026quot;";
      case "'":
        return "\u0026apos;";
      default:
        return ch;
    }
  });
}

export function pageUrl(route = "", base = publicBase) {
  return route ? `${base}${route}/` : base;
}

export function sitemapUrls(routes, base = publicBase) {
  return [
    pageUrl("", base),
    ...[...new Set(routes)].filter((route) => !SITEMAP_SKIP.has(route)).map((route) => pageUrl(route, base)),
  ];
}

export function buildSitemap(urls) {
  const body = [...new Set(urls)]
    .sort()
    .map((url) => `  <url>\n    <loc>${escapeXml(url)}</loc>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function buildRobots(sitemapUrl = `${publicBase}sitemap.xml`) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;
}

export async function prepareStaticPages(base = publicBase) {
  if (!existsSync(indexFile) && existsSync(spaIndexFile)) {
    await copyFile(spaIndexFile, indexFile);
  }

  const routes = [...new Set([...(await staticRoutes()), ...(await dataRoutes())])];
  const indexHtml = await readFile(indexFile, "utf8");

  await Promise.all(
    routes.map(async (route) => {
      const routeDir = path.join(distDir, route);
      await mkdir(routeDir, { recursive: true });
      await writeFile(path.join(routeDir, "index.html"), htmlForRoute(indexHtml, route, base), "utf8");
    }),
  );

  // Keep the SPA fallback for unknown links while known routes receive HTTP 200.
  await copyFile(indexFile, path.join(distDir, "404.html"));

  const urls = sitemapUrls(routes, base);
  await writeFile(path.join(distDir, "sitemap.xml"), buildSitemap(urls), "utf8");
  await writeFile(path.join(distDir, "robots.txt"), buildRobots(`${base}sitemap.xml`), "utf8");

  console.log(`Prepared ${routes.length} static routes and sitemap (${urls.length} URLs).`);
  return { routes, urls };
}

export function prepareGithubPages() {
  return prepareStaticPages();
}

const isDirectRun = process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isDirectRun) {
  await prepareGithubPages();
}
