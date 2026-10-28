#!/usr/bin/env node
// Production build: copies the public site into dist/ with JavaScript minified and mangled
// (Terser), CSS minified and HTML comments removed. Source code, tests, build scripts and docs
// are not copied. Run `npm run build` first so the generated pages are current.
//   node scripts/dist.js         → dist/
// Note: anything a browser runs can still be viewed by a determined person; this removes
// comments and readable names so the code is much harder to reuse, and keeps the source
// files themselves out of the published site.
const fs = require("fs");
const path = require("path");
const { minify } = require("terser");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "dist");
const SKIP_DIRS = new Set(["node_modules", "dist", "scripts", "tests", ".git", ".github", ".claude"]);
const SKIP_FILES = new Set(["package.json", "package-lock.json", "README.md", "LICENSE", ".gitignore"]);
const PUBLIC_EXT = new Set([".html", ".js", ".css", ".svg", ".png", ".jpg", ".jpeg", ".webp", ".ico", ".xml", ".txt", ".json", ".webmanifest"]);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") && entry.name !== ".well-known") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) { if (!SKIP_DIRS.has(entry.name)) walk(full, out); }
    else if (!SKIP_FILES.has(entry.name) && PUBLIC_EXT.has(path.extname(entry.name))) out.push(full);
  }
  return out;
}

const minifyCss = css => css
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\s+/g, " ")
  .replace(/\s*([{}:;,>])\s*/g, "$1")
  .replace(/;}/g, "}")
  .trim();

// Remove HTML comments (build markers and notes), keeping everything else byte for byte,
// so <pre> code blocks and inline scripts are untouched.
const stripHtmlComments = html => html.replace(/<!--(?!\[if)[\s\S]*?-->\n?/g, "");

async function main() {
  fs.rmSync(OUT, { recursive: true, force: true });
  const files = walk(ROOT);
  let before = 0, after = 0;
  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const dest = path.join(OUT, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const ext = path.extname(file);
    const raw = fs.readFileSync(file);
    before += raw.length;
    let out = raw;
    if (ext === ".js") {
      const result = await minify(raw.toString("utf8"), {
        compress: { passes: 2 },
        mangle: true, // local names only: files share top-level globals in the browser
        format: { comments: false }
      });
      out = Buffer.from(result.code, "utf8");
    } else if (ext === ".css") {
      out = Buffer.from(minifyCss(raw.toString("utf8")), "utf8");
    } else if (ext === ".html" && !/^google[0-9a-f]+\.html$/.test(path.basename(file))) {
      out = Buffer.from(stripHtmlComments(raw.toString("utf8")), "utf8");
    }
    after += out.length;
    fs.writeFileSync(dest, out);
  }
  fs.writeFileSync(path.join(OUT, ".nojekyll"), "");
  console.log(`dist/: ${files.length} files, ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB`);
}

main().catch(e => { console.error(e); process.exit(1); });
