#!/usr/bin/env node
// Generates the crawlable, static parts of the site from roles.js so search engines and
// AI answer engines can read every career path without running JavaScript:
//   - roles/<slug>.html  one landing page per role (roadmap, FAQ, salary, structured data)
//   - index.html         the "AI career paths at a glance" section + ItemList structured data
//   - sitemap.xml, llms.txt
// Usage: `npm run build` to write files, `node scripts/build.js --check` to verify they are current.
const fs = require("fs");
const path = require("path");
const { ROLES } = require("../roles.js");
const { plan } = require("../scoring.js");

const ROOT = path.join(__dirname, "..");
const SITE = "https://homesh123.github.io/ai-career-advisor/";
const SITE_NAME = "AI Path Finder";
const UPDATED = "2026-10-27"; // bump when content changes
const YEAR = UPDATED.slice(0, 4);
const STUDY_HOURS = 10;

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const jsonLd = obj => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2).replace(/</g, "\\u003c")}\n</script>`;
const roleUrl = r => `${SITE}roles/${r.slug}.html`;
const ids = Object.keys(ROLES);
const fmtMonths = m => (m < 1 ? `${Math.max(1, Math.round(m * 4.33))} weeks` : `${m} months`);
// "an LLM / an ML / an AI ..." — acronyms starting with a vowel sound take "an".
const article = w => (/^[AEIOU]/i.test(w) || /^[FHLMNRSX][A-Z]/.test(w) ? "an" : "a");
// Lower-case a leading capital unless it starts an acronym (DevOps, PMs, SQL stay as written).
const lcFirst = s => (/^[A-Z][a-z]/.test(s) && !/^[A-Z][a-z]+[A-Z]/.test(s.split(" ")[0]) ? s[0].toLowerCase() + s.slice(1) : s);
// How a role is described in headings and FAQs. The beginner path is not a job title.
const goal = r => r.slug === "ai-foundations-beginner" ? "start an AI career from scratch" : `become ${article(r.title)} ${r.title}`;
const person = r => r.slug === "ai-foundations-beginner" ? "a junior AI / ML engineer" : `${article(r.title)} ${r.title}`;

// Time to job-ready at 10 h/week from zero, and when the role's core skills are already in place.
function timing(role) {
  const base = { py: 0, sql: 0, cloud: 0, ml: 0, math: 0, hours: STUDY_HOURS };
  const ready = { ...base, ...role.requires };
  return { full: plan(base, role), fast: plan(ready, role) };
}
const timeRange = ({ fast, full }) => {
  if (fast.months === full.months) return fmtMonths(full.months);
  return fast.months >= 1 ? `${fast.months}–${full.months} months` : `${fmtMonths(fast.months)} to ${fmtMonths(full.months)}`;
};

const CODING = r => {
  const py = r.requires.py || 0;
  return py >= 3 ? "Advanced Python" : py === 2 ? "Comfortable Python" : py === 1 ? "Basic Python" : "Not required (low-code is fine)";
};
const MATHS = r => {
  const m = r.requires.math || 0;
  return m >= 2 ? "Strong (linear algebra, calculus, probability)" : m === 1 ? "Basic statistics" : "Very little";
};

// Parse indicative pay strings into numeric ranges for schema.org estimatedSalary.
function usdRange(s) {
  const nums = [...s.matchAll(/\$(\d+)k/g)].map(m => Number(m[1]) * 1000);
  return nums.length >= 2 ? [Math.min(...nums), Math.max(...nums)] : null;
}
function inrRange(s) {
  const nums = [...s.matchAll(/₹(\d+)–(\d+)/g)].flatMap(m => [Number(m[1]), Number(m[2])]);
  return nums.length >= 2 ? [Math.min(...nums) * 1e5, Math.max(...nums) * 1e5] : null;
}

function faqFor(role, t) {
  const r = role;
  return [
    [`What does ${person(r)} do?`, r.why],
    [`How long does it take to ${goal(r)}?`, `${timeRange(t).replace(/^./, c => c.toUpperCase())} at ${STUDY_HOURS} hours of study a week. The longer estimate is for starting from zero. The shorter one applies if you already have the core skills (${lcFirst(CODING(r))} and the listed basics), because those steps become quick revision.`],
    [`Do I need coding and maths to ${goal(r)}?`, `Coding: ${CODING(r)}. Maths: ${MATHS(r)}.`],
    [`How much does ${person(r)} earn?`, `Indicative pay in the US: ${r.market.pay}. In India: ${r.market.payIndia}. Pay varies widely by city, company type and experience.`],
    [`Which job titles should I search for?`, `${r.titles.join(", ")}.`],
    [`Who is the ${r.title.replace(/ Path$/, "")} path best for?`, `${r.bestFor}. ${r.tagline}.`]
  ];
}

function pageShell({ title, description, url, head, body }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1" />
  <link rel="canonical" href="${url}" />
  <link rel="icon" href="../favicon.svg" type="image/svg+xml" />
  <meta name="theme-color" content="#f5f5f7" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${SITE}og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="article:modified_time" content="${UPDATED}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${SITE}og-image.png" />
  <link rel="stylesheet" href="../styles.css" />
${head}
</head>
<body class="page">
${body}
</body>
</html>
`;
}

function rolePage(id) {
  const r = ROLES[id];
  const t = timing(r);
  const url = roleUrl(r);
  const faq = faqFor(r, t);
  const title = r.slug === "ai-foundations-beginner"
    ? `How to Start an AI Career From Scratch in ${YEAR}: Beginner Roadmap, Skills & Salary`
    : `How to Become ${article(r.title)} ${r.title} in ${YEAR}: Roadmap, Skills & Salary`;
  const description = `${r.title} roadmap for ${YEAR}: ${r.roadmap.length} steps, ${timeRange(t)} at ${STUDY_HOURS} h/week, skills, free resources and salary in the US and India. ${r.bestFor}.`.slice(0, 300);
  const answer = `${r.title}: ${lcFirst(r.tagline)}. To ${goal(r)}, follow ${r.roadmap.length} steps: ${r.roadmap.map(s => s.title).join("; ")}. Expect ${timeRange(t)} at ${STUDY_HOURS} hours a week, depending on your starting skills. Best for: ${lcFirst(r.bestFor)}.`;
  const usd = usdRange(r.market.pay), inr = inrRange(r.market.payIndia);
  const related = ids.filter(x => x !== id).slice(0, 8);

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage", "@id": url, url, name: title, description,
        inLanguage: "en", datePublished: "2026-10-27", dateModified: UPDATED,
        isPartOf: { "@id": `${SITE}#website` }, breadcrumb: { "@id": `${url}#breadcrumb` },
        about: { "@id": `${url}#occupation` }, publisher: { "@id": `${SITE}#org` },
        primaryImageOfPage: `${SITE}og-image.png`
      },
      {
        "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE },
          { "@type": "ListItem", position: 2, name: "AI career paths", item: `${SITE}#paths` },
          { "@type": "ListItem", position: 3, name: r.title, item: url }
        ]
      },
      {
        "@type": "Occupation", "@id": `${url}#occupation`, name: r.title, description: r.why,
        skills: r.skills.join(", "), alternateName: r.titles,
        qualifications: `Coding: ${CODING(r)}. Maths: ${MATHS(r)}.`,
        ...(usd || inr ? { estimatedSalary: [
          ...(usd ? [{ "@type": "MonetaryAmountDistribution", name: "US total compensation (indicative)", currency: "USD", duration: "P1Y", minValue: usd[0], maxValue: usd[1] }] : []),
          ...(inr ? [{ "@type": "MonetaryAmountDistribution", name: "India annual CTC (indicative)", currency: "INR", duration: "P1Y", minValue: inr[0], maxValue: inr[1] }] : [])
        ] } : {}),
        occupationLocation: [{ "@type": "Country", name: "United States" }, { "@type": "Country", name: "India" }]
      },
      {
        "@type": "HowTo", "@id": `${url}#howto`, name: `How to ${goal(r)}`,
        description: answer, totalTime: `P${Math.ceil(t.full.totalWeeks)}W`,
        step: r.roadmap.map(s => ({ "@type": "HowToStep", position: s.step, name: s.title, text: `${s.what} ${s.why || ""}`.trim(), url: `${url}#step-${s.step}` }))
      },
      {
        "@type": "FAQPage", "@id": `${url}#faq`,
        mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } }))
      }
    ]
  };

  const body = `  <header class="site-header">
    <a class="brand" href="../">${SITE_NAME}</a>
    <a class="button btn-primary btn-small" href="../#app">Find my AI role</a>
  </header>
  <main class="container article">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="../">${SITE_NAME}</a> › <a href="../#paths">AI career paths</a> › <span aria-current="page">${esc(r.title)}</span></nav>
    <article>
      <header>
        <p class="eyebrow">AI career path · Updated <time datetime="${UPDATED}">${new Date(UPDATED).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time></p>
        <h1>How to ${esc(goal(r))} in ${YEAR}</h1>
        <p class="lead">${esc(r.tagline)}.</p>
      </header>

      <section class="answer-box" aria-label="Quick answer">
        <h2>Quick answer</h2>
        <p>${esc(answer)}</p>
      </section>

      <section>
        <h2>Key facts</h2>
        <table class="facts">
          <tr><th scope="row">Best for</th><td>${esc(r.bestFor)}</td></tr>
          <tr><th scope="row">Time to job-ready</th><td>${esc(timeRange(t))} at ${STUDY_HOURS} h/week</td></tr>
          <tr><th scope="row">Coding needed</th><td>${esc(CODING(r))}</td></tr>
          <tr><th scope="row">Maths needed</th><td>${esc(MATHS(r))}</td></tr>
          <tr><th scope="row">Demand</th><td>${esc(r.market.demand)}</td></tr>
          <tr><th scope="row">Pay (US)</th><td>${esc(r.market.pay)}</td></tr>
          <tr><th scope="row">Pay (India)</th><td>${esc(r.market.payIndia)}</td></tr>
          <tr><th scope="row">Job titles</th><td>${esc(r.titles.join(", "))}</td></tr>
        </table>
        <p class="tiny muted">Pay is indicative, compiled from Levels.fyi, Glassdoor, AmbitionBox and 2026 salary guides, which often disagree. It varies a lot by city, company type and experience.</p>
      </section>

      <section>
        <h2>What does ${esc(person(r))} do?</h2>
        <p>${esc(r.why)}</p>
        <h3>Core skills</h3>
        <ul class="chips plain">${r.skills.map(s => `<li class="chip">${esc(s)}</li>`).join("")}</ul>
      </section>

      <section>
        <h2>${esc(r.title)} roadmap: ${r.roadmap.length} steps</h2>
        <p>Follow the steps in order. Times assume about ${STUDY_HOURS} study hours a week. <a href="../#app">Take the free questionnaire</a> to get a personalised version that skips what you already know and fits your weekly hours.</p>
        <ol class="static-roadmap">
${r.roadmap.map(s => `          <li id="step-${s.step}">
            <h3>Step ${s.step}: ${esc(s.title)} <span class="badge-time">${esc(s.time)}</span></h3>
            <p>${esc(s.what)}</p>
            ${s.why ? `<p class="step-why"><strong>Why it matters:</strong> ${esc(s.why)}</p>` : ""}
            <p class="small"><strong>Learn from:</strong> ${esc(s.sources)}</p>
            ${s.subTopics ? `<p class="small"><strong>Topics:</strong> ${esc(s.subTopics.join(", "))}</p>` : ""}
            ${s.keyHighlights ? `<p class="small"><strong>Must-know:</strong> ${esc(s.keyHighlights.join("; "))}</p>` : ""}
            ${s.starterProjects ? `<div class="projects"><span class="step-label">Project ideas</span>${s.starterProjects.map(p => `<div class="project"><strong>${esc(p.name)}</strong>: ${esc(p.description)}</div>`).join("")}</div>` : ""}
          </li>`).join("\n")}
        </ol>
      </section>

      <section>
        <h2>Frequently asked questions</h2>
${faq.map(([q, a]) => `        <details class="faq-item" open>
          <summary>${esc(q)}</summary>
          <p>${esc(a)}</p>
        </details>`).join("\n")}
      </section>

      <section class="cta-box">
        <h2>Is ${esc(r.title)} the right AI role for you?</h2>
        <p>Answer about 20 questions on your experience, skills and goals. You'll get your best-fit AI role out of 9, the reasons behind it, your skill gaps, and a dated roadmap. Free, no sign-up.</p>
        <a class="button btn-primary" href="../#app">Find my AI career path</a>
      </section>

      <section>
        <h2>Compare other AI career paths</h2>
        <ul class="related">
${related.map(x => `          <li><a href="${ROLES[x].slug}.html">${esc(ROLES[x].title)}</a><span class="muted small">: ${esc(ROLES[x].bestFor)}</span></li>`).join("\n")}
        </ul>
      </section>
    </article>
  </main>
  <footer class="footer">
    <p>${SITE_NAME}: free AI career guidance. Last updated <time datetime="${UPDATED}">${UPDATED}</time>. Guidance, not a job guarantee.</p>
  </footer>`;

  return pageShell({ title: `${title} | ${SITE_NAME}`, description, url, head: jsonLd(graph), body });
}

// ---------- index.html generated regions ----------
function pathsSection() {
  const rows = ids.map(id => {
    const r = ROLES[id], t = timing(r);
    return `          <tr>
            <th scope="row"><a href="roles/${r.slug}.html">${esc(r.title)}</a></th>
            <td>${esc(r.bestFor)}</td>
            <td>${esc(CODING(r))}</td>
            <td>${esc(MATHS(r).replace(/ \(.*\)/, ""))}</td>
            <td>${esc(timeRange(t))}</td>
            <td>${esc(r.market.demand.split(/ —|,/)[0])}</td>
          </tr>`;
  }).join("\n");
  return `    <section class="paths" id="paths" aria-labelledby="pathsTitle">
      <h2 id="pathsTitle">AI career paths at a glance</h2>
      <p class="muted">The 9 AI roles the questionnaire compares. Times assume about ${STUDY_HOURS} study hours a week. The shorter time applies if you already have the core skills.</p>
      <div class="table-wrap">
        <table class="paths-table">
          <thead><tr><th scope="col">AI role</th><th scope="col">Best for</th><th scope="col">Coding</th><th scope="col">Maths</th><th scope="col">Time to job-ready</th><th scope="col">Demand</th></tr></thead>
          <tbody>
${rows}
          </tbody>
        </table>
      </div>
    </section>`;
}

function itemListLd() {
  return "  " + jsonLd({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `AI career paths (${YEAR})`,
    itemListOrder: "https://schema.org/ItemListUnordered",
    numberOfItems: ids.length,
    itemListElement: ids.map((id, i) => ({ "@type": "ListItem", position: i + 1, name: ROLES[id].title, url: roleUrl(ROLES[id]) }))
  }).replace(/\n/g, "\n  ");
}

// FAQ structured data must match the visible FAQ, so it is generated from it.
function faqLd(html) {
  const faqHtml = html.slice(html.indexOf('class="faq-section"'));
  const strip = s => s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
    .replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  const items = [...faqHtml.matchAll(/<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>/g)];
  const answer = html.match(/<h2 id="quickAnswer">([\s\S]*?)<\/h2>\s*<p>([\s\S]*?)<\/p>/);
  const qa = [...(answer ? [answer] : []), ...items].map(m => ({ "@type": "Question", name: strip(m[1]), acceptedAnswer: { "@type": "Answer", text: strip(m[2]) } }));
  return "  " + jsonLd({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: qa }).replace(/\n/g, "\n  ");
}

function replaceRegion(html, name, content) {
  const re = new RegExp(`(<!-- build:${name} -->)[\\s\\S]*?(<!-- /build:${name} -->)`);
  if (!re.test(html)) throw new Error(`index.html is missing the build:${name} markers`);
  const indent = html.match(new RegExp(`\\n( *)<!-- /build:${name} -->`))[1];
  return html.replace(re, `$1\n${content}\n${indent}$2`);
}

function sitemap() {
  const urls = [{ loc: SITE, pri: "1.0" }, ...ids.map(id => ({ loc: roleUrl(ROLES[id]), pri: "0.8" }))];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${UPDATED}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${u.pri}</priority>
  </url>`).join("\n")}
</urlset>
`;
}

function llmsTxt() {
  return `# ${SITE_NAME}

> Free AI career consultation. A questionnaire matches software engineers, testers, DevOps and data engineers, freshers, MCA/BCA graduates and career changers from non-IT fields to the best-fit AI role. It explains why the role fits and gives a personalised, dated learning roadmap.

Last updated: ${UPDATED}

## How the recommendation works
- About 20 questions in 5 sections: background and experience, skill levels (Python, SQL, cloud, AI/ML, maths), a 4-question reasoning check, working style and interests, goals and weekly study hours.
- Self-ratings are checked against the reasoning questions, and contradictory answers are corrected.
- Each of the 9 roles is scored with weighted, explainable signals. Users see a fit %, readiness %, skill gaps, transferable strengths and a roadmap that skips what they already know.
- Everything runs in the browser. Answers are not sent to a server.

## AI career paths
${ids.map(id => { const r = ROLES[id]; return `- [${r.title}](${roleUrl(r)}): ${r.tagline}. Best for: ${lcFirst(r.bestFor)}. Time to job-ready: ${timeRange(timing(r))} at ${STUDY_HOURS} h/week. Coding: ${lcFirst(CODING(r))}; maths: ${lcFirst(MATHS(r))}.`; }).join("\n")}

## Quick answers
- Which AI role should a software engineer choose? It depends on current work. Backend developers often fit LLM / Agent Engineer, frontend and full-stack developers fit AI Product Engineer, DevOps engineers fit MLOps / AI Platform Engineer, data engineers fit Data Engineer (AI), and senior client-facing engineers fit AI Forward Deployed Engineer.
- Is there an AI role for people who don't code? Yes. AI Product Manager suits PMs, business analysts and domain experts such as accountants, teachers and healthcare professionals.
- Can freshers or MCA graduates get into AI? Yes. Start with the AI Foundations path (Python, statistics, SQL, ML basics, two portfolio projects), or go straight to ML Engineer if you already have strong ML projects.
- How long does it take? Usually 3 to 9 months at around 10 hours a week, depending on starting skills and the target role.

## Links
- [Take the questionnaire](${SITE})
- [Sitemap](${SITE}sitemap.xml)
`;
}

// ---------- write / check ----------
function outputs() {
  const files = {};
  ids.forEach(id => { files[`roles/${ROLES[id].slug}.html`] = rolePage(id); });
  let index = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  index = replaceRegion(index, "paths", pathsSection());
  index = replaceRegion(index, "itemlist", itemListLd());
  index = replaceRegion(index, "faq", faqLd(index));
  index = index.replace(/(<meta property="article:modified_time" content=")[^"]*(")/, `$1${UPDATED}$2`);
  files["index.html"] = index;
  files["sitemap.xml"] = sitemap();
  files["llms.txt"] = llmsTxt();
  return files;
}

function main() {
  const check = process.argv.includes("--check");
  const files = outputs();
  const stale = [];
  for (const [rel, content] of Object.entries(files)) {
    const abs = path.join(ROOT, rel);
    const current = fs.existsSync(abs) ? fs.readFileSync(abs, "utf8") : null;
    if (current === content) continue;
    if (check) stale.push(rel);
    else {
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      fs.writeFileSync(abs, content);
      console.log("wrote", rel);
    }
  }
  if (check && stale.length) {
    console.error(`Generated files are out of date. Run \`npm run build\`:\n  ${stale.join("\n  ")}`);
    process.exit(1);
  }
}

if (require.main === module) main();
module.exports = { outputs };
