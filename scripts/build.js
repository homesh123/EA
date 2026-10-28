#!/usr/bin/env node
// Generates the crawlable, static parts of the site from roles.js so search engines and
// AI answer engines can read every career path without running JavaScript:
//   - roles/<slug>.html   one landing page per role (roadmap, FAQ, salary, structured data)
//   - for/<slug>.html     "AI career for <background>" pages, ranked by the real scoring engine
//   - guide/*.html        how to choose an AI role, and how the consultation works (methodology)
//   - learn/<id>.html, learn/hi/<id>.html  static lesson pages in English and Hinglish
//   - learn.html          generated regions: lesson catalog and Course structured data
//   - index.html          generated regions: paths table, backgrounds, nav/footer links, JSON-LD
//   - sitemap.xml, llms.txt
// Usage: `npm run build` to write files, `node scripts/build.js --check` to verify they are current.
const fs = require("fs");
const path = require("path");
const { ROLES } = require("../roles.js");
const { plan, rankRoles, strengths, SIGNALS } = require("../scoring.js");
const { QUESTIONS, SECTIONS } = require("../questions.js");
const { AUDIENCES } = require("../content/audiences.js");
const { GUIDE } = require("../content/guide.js");
const { LESSON_TOPICS, LEARN_TRACKS, LEARN_I18N } = require("../content/lessons.js");

const ROOT = path.join(__dirname, "..");
const SITE = "https://homesh123.github.io/ai-career-advisor/";
const SITE_NAME = "AI Path Finder";
const UPDATED = "2026-10-28"; // bump when content changes
const YEAR = UPDATED.slice(0, 4);
const STUDY_HOURS = 10;

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const jsonLd = obj => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2).replace(/</g, "\\u003c")}\n</script>`;
const roleUrl = r => `${SITE}roles/${r.slug}.html`;
const audUrl = a => `${SITE}for/${a.slug}.html`;
const GUIDE_PATH = `guide/${GUIDE.slug}.html`;
const METHOD_PATH = "guide/how-it-works.html";
const prettyDate = d => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
const ids = Object.keys(ROLES);
const fmtMonths = m => (m < 1 ? `${Math.max(1, Math.round(m * 4.33))} weeks` : `${m} months`);
// "an LLM / an ML / an AI ..." — acronyms starting with a vowel sound take "an".
const article = w => (/^[AEIOU]/i.test(w) || /^[FHLMNRSX][A-Z]/.test(w) ? "an" : "a");
// Lower-case a leading capital unless it starts an acronym (DevOps, PMs, SQL stay as written).
const KEEP_CASE = new Set(["Java", "Python", "JavaScript", "TypeScript", "Kotlin", "Go"]);
const lcFirst = s => {
  const first = s.split(/[ -]/)[0].replace(/[^A-Za-z]/g, "");
  if (KEEP_CASE.has(first) || /^[A-Z][a-z]+[A-Z]/.test(first) || !/^[A-Z][a-z]/.test(s)) return s;
  return s[0].toLowerCase() + s.slice(1);
};
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

// ---------- shared layout ----------
// `p` is the relative prefix back to the site root ("" on the homepage, "../" one level down).
function siteNav(p) {
  return `<header class="site-header">
    <a class="brand" href="${p || "./"}">${SITE_NAME}</a>
    <nav class="site-nav" aria-label="Main">
      <a href="${p}#paths">AI roles</a>
      <a href="${p}#backgrounds">By background</a>
      <a href="${p}${GUIDE_PATH}">How to choose</a>
      <a href="${p}${METHOD_PATH}">How it works</a>
      <a href="${p}learn.html">Learn</a>
    </nav>
    <a class="button btn-primary btn-small" href="${p}#app">Free consultation</a>
  </header>`;
}

function footerLinks(p) {
  return `<nav class="footer-links" aria-label="Site">
      <div><h2>AI career paths</h2><ul>${ids.map(id => `<li><a href="${p}roles/${ROLES[id].slug}.html">${esc(ROLES[id].title)}</a></li>`).join("")}</ul></div>
      <div><h2>AI careers by background</h2><ul>${AUDIENCES.map(a => `<li><a href="${p}for/${a.slug}.html">${esc(a.short)}</a></li>`).join("")}</ul></div>
      <div><h2>Guides</h2><ul><li><a href="${p}${GUIDE_PATH}">How to choose an AI role</a></li><li><a href="${p}${METHOD_PATH}">How the consultation works</a></li><li><a href="${p}#app">Free AI career consultation</a></li><li><a href="${p}learn.html">Free AI courses (English &amp; Hinglish)</a></li><li><a href="${p}llms.txt">llms.txt</a></li></ul></div>
    </nav>`;
}

function pageShell({ title, description, url, head, body, p = "../", type = "article" }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1" />
  <link rel="canonical" href="${url}" />
  <link rel="icon" href="${p}favicon.svg" type="image/svg+xml" />
  <link rel="sitemap" type="application/xml" href="${p}sitemap.xml" />
  <meta name="theme-color" content="#f5f5f7" />
  <meta property="og:type" content="${type}" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:locale" content="en_US" />
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
  <link rel="stylesheet" href="${p}styles.css" />
${head}
</head>
<body class="page">
  ${siteNav(p)}
${body}
  <footer class="footer">
    ${footerLinks(p)}
    <p>${SITE_NAME}: free AI career consultation and guidance. Last updated <time datetime="${UPDATED}">${prettyDate(UPDATED)}</time>. Guidance, not a job guarantee.</p>
  </footer>
</body>
</html>
`;
}

const webPage = (url, name, description, extra = {}) => ({
  "@type": "WebPage", "@id": url, url, name, description, inLanguage: "en",
  datePublished: "2026-10-27", dateModified: UPDATED,
  isPartOf: { "@id": `${SITE}#website` }, publisher: { "@id": `${SITE}#org` },
  breadcrumb: { "@id": `${url}#breadcrumb` }, primaryImageOfPage: `${SITE}og-image.png`, ...extra
});
const breadcrumb = (url, trail) => ({
  "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
  itemListElement: trail.map(([name, item], i) => ({ "@type": "ListItem", position: i + 1, name, item }))
});
const faqPage = (url, faq) => ({
  "@type": "FAQPage", "@id": `${url}#faq`,
  mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } }))
});
const crumbsHtml = (p, trail) => `<nav class="crumbs" aria-label="Breadcrumb">${trail.map(([n, h], i) => i === trail.length - 1 ? `<span aria-current="page">${esc(n)}</span>` : h ? `<a href="${h}">${esc(n)}</a>` : `<span>${esc(n)}</span>`).join(" › ")}</nav>`;
const faqHtml = faq => faq.map(([q, a]) => `        <details class="faq-item" open>
          <summary>${esc(q)}</summary>
          <p>${esc(a)}</p>
        </details>`).join("\n");
const ctaBox = (p, h) => `      <section class="cta-box">
        <h2>${esc(h)}</h2>
        <p>Our free AI career consultation asks about 20 questions on your experience, skills, working style and goals. You get your best-fit AI role out of 9, the reasons behind it, your skill gaps, and a dated roadmap. It takes about 4 minutes and needs no sign-up.</p>
        <a class="button btn-primary" href="${p}#app">Start the free consultation</a>
      </section>`;

// Audiences whose typical profile has this role in its top 3, for cross-linking.
const RANKED = Object.fromEntries(AUDIENCES.map(a => [a.slug, rankRoles(a.profile).results]));
const audiencesFor = id => AUDIENCES.filter(a => RANKED[a.slug].slice(0, 3).some(r => r.id === id && r.fit >= 30));

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
      webPage(url, title, description, { about: { "@id": `${url}#occupation` } }),
      breadcrumb(url, [[SITE_NAME, SITE], ["AI career paths", `${SITE}#paths`], [r.title, url]]),
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
      faqPage(url, faq)
    ]
  };
  const movers = audiencesFor(id);

  const body = `  <main class="container article">
    ${crumbsHtml("../", [[SITE_NAME, "../"], ["AI career paths", "../#paths"], [r.title]])}
    <article>
      <header>
        <p class="eyebrow">AI career path · Updated <time datetime="${UPDATED}">${prettyDate(UPDATED)}</time></p>
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
        ${movers.length ? `<h3>Who usually moves into this role</h3>
        <ul class="related">${movers.map(a => `<li><a href="../for/${a.slug}.html">${esc(a.name)}</a></li>`).join("")}</ul>` : ""}
        <p class="small">Not sure this is the one? Read <a href="../${GUIDE_PATH}">how to choose the right AI role</a>.</p>
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
${faqHtml(faq)}
      </section>

${ctaBox("../", `Is ${r.title} the right AI role for you?`)}

      <section>
        <h2>Compare other AI career paths</h2>
        <ul class="related">
${related.map(x => `          <li><a href="${ROLES[x].slug}.html">${esc(ROLES[x].title)}</a><span class="muted small">: ${esc(ROLES[x].bestFor)}</span></li>`).join("\n")}
        </ul>
      </section>
    </article>
  </main>`;

  return pageShell({ title: `${title} | ${SITE_NAME}`, description, url, head: jsonLd(graph), body });
}

// ---------- "AI career for <background>" pages ----------
const optLabel = (qid, v) => {
  const q = QUESTIONS.find(x => x.id === qid);
  return [].concat(v).map(x => q.options.find(o => o.value === x)?.label).filter(Boolean).join(", ");
};
function profileSummary(a) {
  const pr = a.profile;
  const bits = [];
  if (pr.experience) bits.push(`${optLabel("experience", pr.experience)} of experience`);
  if (pr.currentRole) bits.push(`works in ${lcFirst(optLabel("currentRole", pr.currentRole))}`);
  else bits.push(lcFirst(optLabel("background", pr.background)));
  bits.push(pr.langs.includes("none") ? "doesn't code yet" : `codes in ${optLabel("langs", pr.langs)}`);
  bits.push(`Python: ${lcFirst(optLabel("pythonLevel", pr.pythonLevel))}`);
  bits.push(`AI experience: ${lcFirst(optLabel("ml", pr.ml))}`);
  bits.push(`enjoys "${lcFirst(optLabel("workStyle", pr.workStyle))}"`);
  bits.push(`can study ${lcFirst(optLabel("hours", pr.hours))} a week`);
  return bits.join(" · ");
}

function audiencePage(a) {
  const url = audUrl(a);
  const { profile, results } = rankRoles(a.profile);
  let picks = results.filter(r => r.fit >= 30).slice(0, 3);
  if (picks.length < 2) picks = results.slice(0, 2);
  const top = picks[0], topRole = ROLES[top.id];
  const who = lcFirst(a.name.replace(/ \(.*\)/, ""));
  const title = `Best AI Roles for ${who} in ${YEAR}`;
  const description = `Which AI role fits ${who}? ${topRole.title} is usually the best fit, then ${picks.slice(1).map(r => ROLES[r.id].title).join(" and ")}. See why, the skills that transfer, a timeline and a free personalised AI career consultation.`;
  const answer = `For most ${who}, the best AI role is ${topRole.title} (${top.fit}% fit for a typical profile)${picks.length > 1 ? `, followed by ${picks.slice(1).map(r => `${ROLES[r.id].title} (${r.fit}%)`).join(" and ")}` : ""}. Why it usually fits: ${top.reasons.slice(0, 3).map(lcFirst).join("; ")}. A typical person makes the switch in about ${fmtMonths(top.plan.months)} at ${profile.hours} hours of study a week.`;
  const faq = [
    [`What is the best AI role for ${who}?`, answer],
    [`How long does it take ${who} to move into AI?`, `About ${fmtMonths(top.plan.months)} at ${profile.hours} hours a week for the ${topRole.title} path, for a typical profile. Steps covering skills you already have are shortened, so your timeline may be shorter. Take the free consultation for a dated plan based on your own answers.`],
    [`Do ${who} need to learn Python and maths for AI?`, `For ${topRole.title}: coding needed is ${lcFirst(CODING(topRole))}, and maths needed is ${lcFirst(MATHS(topRole))}.`],
    [`Can I get a personalised AI career recommendation?`, `Yes. The free AI career consultation on ${SITE_NAME} asks about 20 questions on your experience, skills, working style and goals, then recommends your best-fit AI role out of 9 with reasons, skill gaps and a dated roadmap. It runs in your browser and needs no sign-up.`]
  ];
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      webPage(url, title, description, { about: { "@type": "Thing", name: `AI careers for ${a.name}` } }),
      breadcrumb(url, [[SITE_NAME, SITE], ["AI careers by background", `${SITE}#backgrounds`], [a.name, url]]),
      { "@type": "ItemList", "@id": `${url}#roles`, name: `Recommended AI roles for ${a.name}`, itemListOrder: "https://schema.org/ItemListOrderDescending",
        itemListElement: picks.map((r, i) => ({ "@type": "ListItem", position: i + 1, name: ROLES[r.id].title, url: roleUrl(ROLES[r.id]) })) },
      faqPage(url, faq)
    ]
  };
  const firstSteps = top.plan.steps.filter(s => s.studyWeeks !== null).slice(0, 2);
  const body = `  <main class="container article">
    ${crumbsHtml("../", [[SITE_NAME, "../"], ["AI careers by background", "../#backgrounds"], [a.name]])}
    <article>
      <header>
        <p class="eyebrow">AI career guidance · Updated <time datetime="${UPDATED}">${prettyDate(UPDATED)}</time></p>
        <h1>Best AI roles for ${esc(who)}</h1>
        <p class="lead">${esc(a.intro)}</p>
      </header>

      <section class="answer-box" aria-label="Quick answer">
        <h2>Quick answer</h2>
        <p>${esc(answer)}</p>
      </section>

      <section>
        <h2>Recommended AI roles for ${esc(who)}</h2>
        <p class="small muted">Ranked by our scoring engine for a typical profile: ${esc(profileSummary(a))}. Your own answers may change the order, so take the <a href="../#app">free consultation</a> for a personal result.</p>
        <ol class="rec-list">
${picks.map((r, i) => { const role = ROLES[r.id]; return `          <li>
            <h3><a href="../roles/${role.slug}.html">${esc(role.title)}</a> <span class="fit-pill">${r.fit}% fit</span></h3>
            <p>${esc(role.tagline)}. ${i === 0 ? "Best match." : "Strong alternative."} About ${esc(fmtMonths(r.plan.months))} at ${profile.hours} h/week.</p>
            ${r.reasons.length ? `<ul class="reasons">${r.reasons.slice(0, 3).map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
          </li>`; }).join("\n")}
        </ol>
      </section>

      <section>
        <h2>Skills you already have that transfer to AI</h2>
        <ul class="ticks">${strengths(profile).map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      </section>

      <section>
        <h2>Advice for ${esc(who)} moving into AI</h2>
        <ul>${a.tips.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
      </section>

      <section>
        <h2>Your first steps towards ${esc(topRole.title)}</h2>
        <ol>${firstSteps.map(s => `<li><strong>${esc(s.title)}</strong> (${esc(s.fast ? "quick revision" : s.time)}): ${esc(s.what)}</li>`).join("")}</ol>
        <p class="small">See the <a href="../roles/${topRole.slug}.html">full ${esc(topRole.title)} roadmap</a>, or read <a href="../${GUIDE_PATH}">how to choose the right AI role</a>.</p>
      </section>

      <section>
        <h2>Frequently asked questions</h2>
${faqHtml(faq)}
      </section>

${ctaBox("../", "Get your personal AI career recommendation")}

      <section>
        <h2>AI careers for other backgrounds</h2>
        <ul class="related">${AUDIENCES.filter(x => x !== a).map(x => `<li><a href="${x.slug}.html">${esc(x.name)}</a></li>`).join("")}</ul>
      </section>
    </article>
  </main>`;
  return pageShell({ title: `${title} | ${SITE_NAME}`, description, url, head: jsonLd(graph), body });
}

// ---------- guide: how to choose an AI role ----------
function guideTable(kind) {
  const link = id => `<a href="../roles/${ROLES[id].slug}.html">${esc(ROLES[id].title)}</a>`;
  const table = (head, rows) => `<div class="table-wrap"><table class="paths-table"><thead><tr>${head.map(h => `<th scope="col">${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr>${r.map((c, i) => i === 0 ? `<th scope="row">${c}</th>` : `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  if (kind === "background") return table(["If you are…", "Closest AI role", "Read more"], AUDIENCES.map(a => [esc(a.name), link(RANKED[a.slug][0].id), `<a href="../for/${a.slug}.html">AI career guide</a>`]));
  if (kind === "workstyle") return table(["If your ideal day is…", "Look at"], GUIDE.workStyles.map(([w, rs]) => [esc(w), rs.map(link).join(", ")]));
  if (kind === "requirements") return table(["AI role", "Coding", "Maths"], ids.map(id => [link(id), esc(CODING(ROLES[id])), esc(MATHS(ROLES[id]))]));
  if (kind === "time") {
    const at = (id, h) => fmtMonths(plan({ py: 0, sql: 0, cloud: 0, ml: 0, math: 0, hours: h }, ROLES[id]).months);
    return table(["AI role (starting from zero)", "5 h/week", "10 h/week", "20 h/week"], ids.map(id => [link(id), at(id, 5), at(id, 10), at(id, 20)])) +
      `<p class="small muted">Starting from zero in every skill. If you already have some of the core skills, those steps become quick revision and the time drops a lot.</p>`;
  }
  if (kind === "projects") return table(["AI role", "Weekend test project"], ids.map(id => {
    const p = ROLES[id].roadmap.flatMap(s => s.starterProjects || [])[0];
    return [link(id), p ? `<strong>${esc(p.name)}</strong>: ${esc(p.description)}` : ""];
  }));
  return "";
}

function guidePage() {
  const url = `${SITE}${GUIDE_PATH}`;
  const g = GUIDE;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      webPage(url, g.title, g.description, { mainEntity: { "@id": `${url}#article` } }),
      breadcrumb(url, [[SITE_NAME, SITE], ["Guides", `${SITE}${GUIDE_PATH}`], [g.h1, url]]),
      { "@type": "Article", "@id": `${url}#article`, headline: g.title, description: g.description, image: `${SITE}og-image.png`,
        datePublished: "2026-10-27", dateModified: UPDATED, author: { "@id": `${SITE}#org` }, publisher: { "@id": `${SITE}#org` }, mainEntityOfPage: url,
        about: ["AI careers", "AI career consultation", "Choosing an AI role"] },
      { "@type": "HowTo", "@id": `${url}#howto`, name: "How to choose the right AI role", description: g.quickAnswer,
        step: g.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.h, text: s.p, url: `${url}#step-${i + 1}` })) },
      faqPage(url, g.faq)
    ]
  };
  const body = `  <main class="container article">
    ${crumbsHtml("../", [[SITE_NAME, "../"], ["Guides"], [g.h1]])}
    <article>
      <header>
        <p class="eyebrow">Guide · Updated <time datetime="${UPDATED}">${prettyDate(UPDATED)}</time></p>
        <h1>${esc(g.h1)}</h1>
        <p class="lead">${esc(g.intro)}</p>
      </header>

      <section class="answer-box" aria-label="Quick answer">
        <h2>Quick answer</h2>
        <p>${esc(g.quickAnswer)}</p>
      </section>

      <nav class="toc" aria-label="Contents"><strong>The 5 steps</strong><ol>${g.steps.map((s, i) => `<li><a href="#step-${i + 1}">${esc(s.h)}</a></li>`).join("")}</ol></nav>

${g.steps.map((s, i) => `      <section id="step-${i + 1}">
        <h2>Step ${i + 1}: ${esc(s.h)}</h2>
        <p>${esc(s.p)}</p>
        ${guideTable(s.table)}
      </section>`).join("\n\n")}

      <section>
        <h2>5 common mistakes when choosing an AI role</h2>
        <ol>${g.mistakes.map(([h, p]) => `<li><strong>${esc(h)}</strong> ${esc(p)}</li>`).join("")}</ol>
      </section>

      <section>
        <h2>Frequently asked questions</h2>
${faqHtml(g.faq)}
      </section>

${ctaBox("../", "Want this framework applied to you?")}
    </article>
  </main>`;
  return pageShell({ title: `${g.title} | ${SITE_NAME}`, description: g.description, url, head: jsonLd(graph), body });
}

// ---------- methodology: how the consultation works ----------
function methodPage() {
  const url = `${SITE}${METHOD_PATH}`;
  const title = "How Our Free AI Career Consultation Works: Questions, Scoring and Methodology";
  const description = "A transparent look at how AI Path Finder recommends an AI role: the questions we ask, how answers are checked, the signals that score each of 9 AI roles, and the limits of the recommendation.";
  const sections = Object.entries(SECTIONS).map(([key, name]) => [name, QUESTIONS.filter(q => q.section === key)]);
  const faq = [
    ["Is the AI career consultation really free?", "Yes. It runs entirely in your browser, needs no sign-up, and your answers are never sent to a server."],
    ["How accurate is the AI role recommendation?", "It is a structured, transparent starting point, not a guarantee. We checked it against realistic profiles (for example backend developers, QA testers, DevOps engineers, accountants and freshers) to confirm it recommends what an experienced career advisor would. It relies on honest self-ratings, which is why it includes a short reasoning check."],
    ["Does a human review my answers?", "No. The recommendation is calculated by transparent rules described on this page, so you can see exactly why a role was recommended."]
  ];
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      webPage(url, title, description, { "@type": ["WebPage", "AboutPage"] }),
      breadcrumb(url, [[SITE_NAME, SITE], ["Guides", `${SITE}${GUIDE_PATH}`], ["How the consultation works", url]]),
      faqPage(url, faq)
    ]
  };
  const signalList = id => {
    const sigs = SIGNALS[id];
    const pos = sigs.filter(([w]) => w > 0).sort((x, y) => y[0] - x[0]).slice(0, 4);
    const neg = sigs.filter(([w]) => w < 0).sort((x, y) => x[0] - y[0]).slice(0, 2);
    return `<li><a href="../roles/${ROLES[id].slug}.html"><strong>${esc(ROLES[id].title)}</strong></a>
            <ul>
              ${pos.map(([w, , why]) => `<li><span class="sig sig-up">+${w}</span> ${esc(why)}</li>`).join("")}
              ${neg.map(([w, , why]) => `<li><span class="sig sig-down">${w}</span> ${esc(why)}</li>`).join("")}
            </ul></li>`;
  };
  const body = `  <main class="container article">
    ${crumbsHtml("../", [[SITE_NAME, "../"], ["Guides", `../${GUIDE_PATH}`], ["How the consultation works"]])}
    <article>
      <header>
        <p class="eyebrow">Methodology · Updated <time datetime="${UPDATED}">${prettyDate(UPDATED)}</time></p>
        <h1>How our free AI career consultation works</h1>
        <p class="lead">${SITE_NAME} recommends an AI role the way a good career advisor would: it looks at what you already do, what you're good at, how you like to work and how much time you have. Unlike a black box, every rule is written down here.</p>
      </header>

      <section class="answer-box" aria-label="Quick answer">
        <h2>Quick answer</h2>
        <p>You answer about 20 questions in 5 sections. A 4-question reasoning check validates your self-ratings, and contradictory answers are corrected. Each of 9 AI roles is then scored with weighted, explainable signals, such as your current work, skills, preferred kind of work and interests. You see your best-fit role with a fit percentage and the reasons, a readiness score, skill gaps, transferable strengths and a roadmap dated to your weekly study hours.</p>
      </section>

      <section>
        <h2>1. The questions we ask</h2>
        ${sections.map(([name, qs]) => `<h3>${esc(name)}</h3><ul>${qs.map(q => `<li>${esc(q.q)}</li>`).join("")}</ul>`).join("\n        ")}
        <p class="small muted">Some questions only appear when relevant. For example, students aren't asked about their current job.</p>
      </section>

      <section>
        <h2>2. How we validate your answers</h2>
        <ul>
          <li><strong>Reasoning check:</strong> four short questions (numeric reasoning, data intuition, systems thinking, problem framing) test the abilities people tend to over- or under-rate.</li>
          <li><strong>Maths calibration:</strong> rating your maths as strong but missing the maths question lowers it to "okay". Rating it as weak but solving the question raises it slightly.</li>
          <li><strong>Consistency rules:</strong> for example, listing Python as a language but rating it "none" is treated as basic Python. Claiming model training without any programming language is treated as having used AI tools.</li>
          <li>Every adjustment is shown to you on the results page, with the reason.</li>
        </ul>
      </section>

      <section>
        <h2>3. How each AI role is scored</h2>
        <p>Each role has a set of weighted signals. A role's fit percentage is its score compared with a near-ideal profile for that role. The strongest signals for each role are below (+ raises the score, − lowers it). These are the same sentences you see as reasons on your results.</p>
        <ul class="signals">
          ${ids.map(signalList).join("\n          ")}
        </ul>
      </section>

      <section>
        <h2>4. Readiness, skill gaps and timeline</h2>
        <p>Each role lists target levels for Python, SQL, cloud, hands-on AI and maths. Readiness is how much of that you already have, and anything below target becomes a skill gap with advice. Roadmap steps that cover skills you already have are marked fast-track and shortened to a quick revision. The remaining study hours are spread over your weekly hours to give real dates, which are checked against your target date.</p>
      </section>

      <section>
        <h2>5. Limits of the recommendation</h2>
        <ul>
          <li>It relies on your self-ratings. The reasoning check reduces this problem but doesn't remove it.</li>
          <li>Salary ranges are indicative, drawn from public sources (Levels.fyi, Glassdoor, AmbitionBox and 2026 salary guides) that often disagree.</li>
          <li>It is guidance to focus your learning, not a job guarantee. Use the top 2–3 matches as a shortlist and validate with a small project, as described in <a href="../${GUIDE_PATH}">how to choose the right AI role</a>.</li>
        </ul>
      </section>

      <section>
        <h2>Frequently asked questions</h2>
${faqHtml(faq)}
      </section>

${ctaBox("../", "Try the AI career consultation")}
    </article>
  </main>`;
  return pageShell({ title: `${title} | ${SITE_NAME}`, description, url, head: jsonLd(graph), body });
}

// ---------- homepage: backgrounds section ----------
function backgroundsSection() {
  return `    <section class="backgrounds" id="backgrounds" aria-labelledby="bgTitle">
      <h2 id="bgTitle">AI career guidance by background</h2>
      <p class="muted">Not sure where someone like you fits in AI? Start with your background.</p>
      <ul class="bg-grid">
${AUDIENCES.map(a => { const r = RANKED[a.slug][0]; return `        <li><a href="for/${a.slug}.html"><span class="bg-name">${esc(a.name)}</span><span class="bg-role">Usually fits: ${esc(ROLES[r.id].title)}</span></a></li>`; }).join("\n")}
      </ul>
      <p class="small">New to this? Read <a href="${GUIDE_PATH}">how to choose the right AI role</a> or see <a href="${METHOD_PATH}">how the consultation works</a>.</p>
    </section>`;
}

// ---------- Learn: static lesson pages (English + Hinglish) ----------
const courseIdsFor = id => Object.keys(LEARN_TRACKS).filter(r => LEARN_TRACKS[r].some(([, ts]) => ts.includes(id)));
const courseOrder = r => LEARN_TRACKS[r].flatMap(([, ts]) => ts);
const lessonUrl = (id, lang) => `${SITE}learn/${lang === "hi" ? "hi/" : ""}${id}.html`;
const LESSON_IDS = (() => {
  const seen = [];
  ids.forEach(r => courseOrder(r).forEach(id => { if (!seen.includes(id)) seen.push(id); }));
  return seen;
})();

function lessonPage(id, lang) {
  const x = LESSON_TOPICS[id];
  const hi = lang === "hi";
  const pick = pair => pair[hi ? 1 : 0];
  const ui = k => LEARN_I18N[lang][k];
  const p = hi ? "../../" : "../";
  const url = lessonUrl(id, lang);
  const home = courseIdsFor(id)[0];
  const order = courseOrder(home);
  const i = order.indexOf(id);
  const prevId = order[i - 1], nextId = order[i + 1];
  const title = hi ? `${x.title[1]}: Hinglish mein aasaan explanation` : `${x.title[0]}: Explained Simply With Real-Life Examples`;
  // Meta description: whole sentences until it's long enough to be useful, capped for search results.
  const firstSentences = s => {
    let out = "";
    for (const sentence of s.split(/(?<=\.)\s/)) { out = out ? `${out} ${sentence}` : sentence; if (out.length >= 110) break; }
    return out.length > 158 ? out.slice(0, 155).replace(/\s\S*$/, "") + "…" : out;
  };
  const description = firstSentences(pick(x.explain));
  const appLink = c => `${p}learn.html?course=${c}&amp;lesson=${id}${hi ? "&amp;lang=hi" : ""}`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LearningResource", "@id": `${url}#lesson`, url, name: pick(x.title), description,
        inLanguage: hi ? "hi-Latn" : "en", learningResourceType: "Lesson", educationalLevel: "Beginner",
        timeRequired: `PT${x.mins}M`, isAccessibleForFree: true, teaches: x.terms.map(([term]) => term),
        datePublished: UPDATED, dateModified: UPDATED, provider: { "@id": `${SITE}#org` }, publisher: { "@id": `${SITE}#org` },
        isPartOf: courseIdsFor(id).map(c => ({ "@type": "Course", name: `${ROLES[c].title} course`, url: `${SITE}learn.html?course=${c}` }))
      },
      breadcrumb(url, [[SITE_NAME, SITE], ["Learn", `${SITE}learn.html`], [pick(x.title), url]]),
      faqPage(url, [[pick(x.quiz.q), `${pick(x.quiz.options[x.quiz.answer])}. ${pick(x.quiz.why)}`]])
    ]
  };
  const head = `  <link rel="alternate" hreflang="en" href="${lessonUrl(id, "en")}" />
  <link rel="alternate" hreflang="hi" href="${lessonUrl(id, "hi")}" />
  <link rel="alternate" hreflang="x-default" href="${lessonUrl(id, "en")}" />
${jsonLd(graph)}`;
  const body = `  <main class="container article lesson-page">
    ${crumbsHtml(p, [[SITE_NAME, p], ["Learn", `${p}learn.html`], [pick(x.title)]])}
    <article lang="${hi ? "hi-Latn" : "en"}">
      <header>
        <p class="eyebrow">${hi ? "Lesson · Hinglish" : "Lesson"} · ⏱ ${x.mins} ${esc(ui("readTime"))}</p>
        <h1>${x.icon} ${esc(pick(x.title))}</h1>
        <p class="lang-switch">${hi ? `<a href="../${id}.html" hreflang="en" lang="en">English</a><span>Hinglish</span>` : `<span>English</span><a href="hi/${id}.html" hreflang="hi" lang="hi-Latn">Hinglish</a>`}</p>
      </header>
      <section class="ls ls-analogy"><h2>🏠 ${esc(ui("realLife"))}</h2><p>${esc(pick(x.analogy))}</p></section>
      <section class="ls ls-explain"><h2>💡 ${esc(ui("simpleWords"))}</h2><p>${esc(pick(x.explain))}</p></section>
      <section class="ls ls-terms"><h2>🔑 ${esc(ui("keyTerms"))}</h2>
        <dl class="terms">${x.terms.map(([term, en, hin]) => `<div><dt>${esc(term)}</dt><dd>${esc(hi ? hin : en)}</dd></div>`).join("")}</dl>
      </section>
      <section class="ls ls-example"><h2>👀 ${esc(ui("seeItInAction"))}</h2>
        <div class="code-wrap"><span class="code-lang">${esc(x.example.lang)}</span><pre><code>${esc(x.example.code)}</code></pre></div>
        <p class="small muted">${esc(pick(x.example.note))}</p>
      </section>
      <section class="ls ls-quiz"><h2>✅ ${esc(ui("quickCheck"))}</h2>
        <p class="quiz-q">${esc(pick(x.quiz.q))}</p>
        <ol type="A">${x.quiz.options.map(o => `<li>${esc(pick(o))}</li>`).join("")}</ol>
        <details class="answer-reveal"><summary>${hi ? "Jawaab dekho" : "Show answer"}</summary><p><strong>${"ABC"[x.quiz.answer]}. ${esc(pick(x.quiz.options[x.quiz.answer]))}</strong>: ${esc(pick(x.quiz.why))}</p></details>
      </section>
      <section class="ls ls-remember"><h2>📌 ${esc(ui("remember"))}</h2><p>${esc(pick(x.remember))}</p></section>

      <nav class="lesson-pager" aria-label="${hi ? "Lessons" : "Lessons"}">
        ${prevId ? `<a href="${prevId}.html">← ${esc(pick(LESSON_TOPICS[prevId].title))}</a>` : "<span></span>"}
        ${nextId ? `<a href="${nextId}.html">${esc(pick(LESSON_TOPICS[nextId].title))} →</a>` : ""}
      </nav>

      <section class="cta-box">
        <h2>${hi ? "Poora course, aapke roadmap ke hisaab se" : "Learn this as part of a full course"}</h2>
        <p>${hi
          ? "Progress tracking, quick checks aur step-by-step order ke saath. Yeh lesson in courses ka hissa hai:"
          : "Track your progress, take the quick checks and follow the lessons in the right order. This lesson is part of:"}</p>
        <p>${courseIdsFor(id).map(c => `<a href="${appLink(c)}">${esc(ROLES[c].title)}</a>`).join(" · ")}</p>
        <a class="button btn-primary" href="${appLink(home)}">${hi ? "Course mein seekho" : "Continue in the course"}</a>
      </section>
    </article>
  </main>`;
  return pageShell({ title: `${title} | ${SITE_NAME}`, description, url, head, body, p });
}

function learnCatalog() {
  return `    <section class="catalog" aria-labelledby="catalogTitle">
      <h2 id="catalogTitle">Browse every lesson</h2>
      <p class="muted small">${LESSON_IDS.length} lessons across ${ids.length} courses, each with a real-life example, key terms, a worked example and a quick check. Every lesson is also available in <a href="learn/hi/what-is-ai.html" hreflang="hi">Hinglish</a>.</p>
      <div class="catalog-grid">
${ids.map(r => `        <div>
          <h3><a href="learn.html?course=${r}">${esc(ROLES[r].title)}</a></h3>
          <ol>${courseOrder(r).map(id => `<li><a href="learn/${id}.html">${esc(LESSON_TOPICS[id].title[0])}</a></li>`).join("")}</ol>
        </div>`).join("\n")}
      </div>
    </section>`;
}

function learnLd() {
  return "  " + jsonLd({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free AI courses by career path",
    itemListElement: ids.map((r, i) => {
      const lessons = courseOrder(r);
      const mins = lessons.reduce((sum, id) => sum + LESSON_TOPICS[id].mins, 0);
      return {
        "@type": "ListItem", position: i + 1,
        item: {
          "@type": "Course", "@id": `${SITE}learn.html?course=${r}`, url: `${SITE}learn.html?course=${r}`,
          name: `${ROLES[r].title}: free AI course`, description: `${ROLES[r].tagline}. ${lessons.length} lessons following the ${ROLES[r].title} roadmap, explained with everyday examples, in English or Hinglish.`,
          provider: { "@type": "Organization", name: SITE_NAME, url: SITE }, inLanguage: ["en", "hi"], isAccessibleForFree: true,
          offers: { "@type": "Offer", category: "Free", price: "0", priceCurrency: "USD" },
          hasCourseInstance: { "@type": "CourseInstance", courseMode: "Online", courseWorkload: `PT${Math.floor(mins / 60)}H${mins % 60}M` },
          teaches: lessons.map(id => LESSON_TOPICS[id].title[0])
        }
      };
    })
  }).replace(/\n/g, "\n  ");
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
  const urls = [
    { loc: SITE, pri: "1.0" },
    { loc: `${SITE}${GUIDE_PATH}`, pri: "0.9" },
    { loc: `${SITE}${METHOD_PATH}`, pri: "0.6" },
    ...AUDIENCES.map(a => ({ loc: audUrl(a), pri: "0.8" })),
    ...ids.map(id => ({ loc: roleUrl(ROLES[id]), pri: "0.8" })),
    { loc: `${SITE}learn.html`, pri: "0.9" },
    ...LESSON_IDS.flatMap(id => [{ loc: lessonUrl(id, "en"), pri: "0.6" }, { loc: lessonUrl(id, "hi"), pri: "0.5" }])
  ];
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

> Free AI career consultation (AI role consultation / AI career counselling). A questionnaire matches software engineers, testers, DevOps and data engineers, freshers, MCA/BCA graduates and career changers from non-IT fields to the best-fit AI role. It explains why the role fits and gives a personalised, dated learning roadmap.

Last updated: ${UPDATED}

## How the recommendation works
- About 20 questions in 5 sections: background and experience, skill levels (Python, SQL, cloud, AI/ML, maths), a 4-question reasoning check, working style and interests, goals and weekly study hours.
- Self-ratings are checked against the reasoning questions, and contradictory answers are corrected.
- Each of the 9 roles is scored with weighted, explainable signals. Users see a fit %, readiness %, skill gaps, transferable strengths and a roadmap that skips what they already know.
- Everything runs in the browser. Answers are not sent to a server.

## AI career paths
${ids.map(id => { const r = ROLES[id]; return `- [${r.title}](${roleUrl(r)}): ${r.tagline}. Best for: ${lcFirst(r.bestFor)}. Time to job-ready: ${timeRange(timing(r))} at ${STUDY_HOURS} h/week. Coding: ${lcFirst(CODING(r))}; maths: ${lcFirst(MATHS(r))}.`; }).join("\n")}

## AI career guidance by background
${AUDIENCES.map(a => `- [${a.name}](${audUrl(a)}): usually fits ${ROLES[RANKED[a.slug][0].id].title}, then ${RANKED[a.slug].slice(1, 3).map(r => ROLES[r.id].title).join(" or ")}.`).join("\n")}

## Guides
- [How to choose the right AI role: a 5-step framework](${SITE}${GUIDE_PATH}): ${GUIDE.quickAnswer}
- [How the AI career consultation works](${SITE}${METHOD_PATH}): the questions, validation rules, scoring signals per role, and limitations.

## Learn: free AI courses (English and Hinglish)
- [Learn hub](${SITE}learn.html): ${ids.length} courses, one per AI role, following each roadmap step by step. ${LESSON_IDS.length} lessons, each with a real-life analogy, a plain-language explanation, key terms, a worked example and a quick check. Every lesson is available in English and Hinglish (Hindi in Roman script with English technical terms).
${LESSON_IDS.map(id => `- [${LESSON_TOPICS[id].title[0]}](${lessonUrl(id, "en")}) · [Hinglish](${lessonUrl(id, "hi")}): ${LESSON_TOPICS[id].remember[0]}`).join("\n")}

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
  AUDIENCES.forEach(a => { files[`for/${a.slug}.html`] = audiencePage(a); });
  files[GUIDE_PATH] = guidePage();
  files[METHOD_PATH] = methodPage();
  LESSON_IDS.forEach(id => {
    files[`learn/${id}.html`] = lessonPage(id, "en");
    files[`learn/hi/${id}.html`] = lessonPage(id, "hi");
  });
  let learnHtml = fs.readFileSync(path.join(ROOT, "learn.html"), "utf8");
  learnHtml = replaceRegion(learnHtml, "sitenav", "  " + siteNav(""));
  learnHtml = replaceRegion(learnHtml, "footerlinks", "    " + footerLinks(""));
  learnHtml = replaceRegion(learnHtml, "catalog", learnCatalog());
  learnHtml = replaceRegion(learnHtml, "learnld", learnLd());
  files["learn.html"] = learnHtml;
  let index = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  index = replaceRegion(index, "paths", pathsSection());
  index = replaceRegion(index, "backgrounds", backgroundsSection());
  index = replaceRegion(index, "sitenav", "  " + siteNav(""));
  index = replaceRegion(index, "footerlinks", "      " + footerLinks(""));
  index = index.replace(/(<time class="updated" datetime=")[^"]*(">)[^<]*(<\/time>)/, `$1${UPDATED}$2${prettyDate(UPDATED)}$3`);
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
