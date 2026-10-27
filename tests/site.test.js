// Checks for the static, crawlable parts of the site (SEO / AEO / GEO).
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const { outputs } = require("../scripts/build.js");
const { ROLES } = require("../roles.js");

const ROOT = path.join(__dirname, "..");
const read = rel => fs.readFileSync(path.join(ROOT, rel), "utf8");
const pages = ["index.html", ...Object.values(ROLES).map(r => `roles/${r.slug}.html`)];

test("generated files are up to date (run `npm run build`)", () => {
  for (const [rel, content] of Object.entries(outputs())) assert.equal(read(rel), content, rel);
});

for (const rel of pages) {
  test(`${rel}: core SEO tags and valid structured data`, () => {
    const html = read(rel);
    const title = html.match(/<title>([^<]*)<\/title>/)[1];
    assert.ok(title.length >= 30, "title too short");
    assert.match(html, /<meta name="description" content="[^"]{70,}"/);
    assert.match(html, /<link rel="canonical" href="https:\/\/homesh123\.github\.io\/ai-career-advisor\/[^"]*"/);
    assert.match(html, /<meta property="og:image" content="https:[^"]+og-image\.png"/);
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, "exactly one h1");
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    assert.ok(blocks.length >= 1, "has JSON-LD");
    blocks.forEach(b => JSON.parse(b[1]));
  });

  test(`${rel}: internal links resolve to real files`, () => {
    const html = read(rel);
    const base = path.dirname(path.join(ROOT, rel));
    const links = [...html.matchAll(/(?:href|src)="([^"#:]+)(?:#[^"]*)?"/g)].map(m => m[1]).filter(h => !h.startsWith("/") && h !== "");
    for (const l of links) {
      const target = path.resolve(base, l.endsWith("/") ? l + "index.html" : l);
      assert.ok(fs.existsSync(target), `${rel} links to missing ${l}`);
    }
  });
}

test("titles and descriptions are unique across pages", () => {
  const titles = pages.map(p => read(p).match(/<title>([^<]*)/)[1]);
  const descs = pages.map(p => read(p).match(/<meta name="description" content="([^"]*)/)[1]);
  assert.equal(new Set(titles).size, titles.length);
  assert.equal(new Set(descs).size, descs.length);
});

test("FAQ structured data matches the visible FAQ on the home page", () => {
  const html = read("index.html");
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1])).find(j => j["@type"] === "FAQPage");
  const visible = [...html.slice(html.indexOf('class="faq-section"')).matchAll(/<summary>([\s\S]*?)<\/summary>/g)].length;
  assert.equal(ld.mainEntity.length, visible + 1); // + the "Which AI role should I choose?" quick answer
});

test("sitemap and llms.txt list every role page", () => {
  const sitemap = read("sitemap.xml"), llms = read("llms.txt");
  Object.values(ROLES).forEach(r => {
    assert.ok(sitemap.includes(`roles/${r.slug}.html`), r.slug);
    assert.ok(llms.includes(`roles/${r.slug}.html`), r.slug);
  });
  assert.match(read("robots.txt"), /Sitemap: https:\/\/homesh123\.github\.io\/ai-career-advisor\/sitemap\.xml/);
});
