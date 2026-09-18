import test from "node:test";
import assert from "node:assert/strict";
import {
  SITEMAP_SKIP,
  buildRobots,
  buildSitemap,
  pageUrl,
  publicBase,
  sitemapUrls,
} from "./prepare-github-pages.mjs";

test("sitemap includes the homepage and public archive routes", () => {
  const xml = buildSitemap(
    sitemapUrls(["dossier", "people/bruce", "places/iceberg-lounge", "login"]),
  );

  assert.match(xml, /xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9"/);
  assert.match(xml, new RegExp(`<loc>${publicBase}</loc>`));
  assert.match(xml, /<loc>https:\/\/matchmalone0219-bat.github.io\/semper-vigilans-archive\/dossier\/<\/loc>/);
  assert.match(xml, /<loc>https:\/\/matchmalone0219-bat.github.io\/semper-vigilans-archive\/people\/bruce\/<\/loc>/);
  assert.doesNotMatch(xml, /\/login\//);
  assert.equal(SITEMAP_SKIP.has("login"), true);
});

test("sitemap escapes XML in loc values", () => {
  const xml = buildSitemap(["https://example.com/a&b"]);
  assert.equal(xml.includes("https://example.com/a" + "\u0026amp;" + "b"), true);
});

test("robots.txt points crawlers at the GitHub Pages sitemap", () => {
  const robots = buildRobots();
  assert.match(robots, /^User-agent: \*\nAllow: \/\n/);
  assert.match(robots, new RegExp(`Sitemap: ${publicBase}sitemap.xml`));
});

test("pageUrl keeps trailing slashes consistent with canonicals", () => {
  assert.equal(pageUrl(), publicBase);
  assert.equal(pageUrl("gallery"), `${publicBase}gallery/`);
});
