// Interview prep guide, deeper lesson content, human-sounding resume samples and the resume builder.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { ROLES } = require("../roles.js");
const { LESSON_TOPICS, LESSON_DEEP, DEEP_FILES } = require("../content/lessons.js");
const { INTERVIEW_PREP } = require("../content/interview-prep.js");
const { RESUMES } = require("../content/resumes.js");
global.ROLES = ROLES;
global.RESUMES = RESUMES;
const { ResumeBuilder } = require("../resume-builder.js");

const roleIds = Object.keys(ROLES);
const both = (pair, label) => {
  assert.ok(Array.isArray(pair) && pair.length === 2 && pair[0].trim() && pair[1].trim(), `${label} must be [en, hi]`);
  assert.notEqual(pair[0], pair[1], `${label}: Hinglish is a copy of the English`);
};

test("interview prep: every role gets a full, ordered guide with easy answers", () => {
  const ids = INTERVIEW_PREP.questions.map(q => q.id);
  assert.equal(new Set(ids).size, ids.length, "question ids are unique");
  const stageIds = INTERVIEW_PREP.stages.map(s => s.id);
  INTERVIEW_PREP.questions.forEach(q => {
    assert.ok(stageIds.includes(q.stage), `${q.id}: unknown stage`);
    assert.ok(q.roles.length && q.roles.every(r => roleIds.includes(r)), `${q.id}: unknown role`);
    assert.ok(q.q.endsWith("?") || q.q.endsWith("."), `${q.id}: question text`);
    assert.ok(q.answer.split(" ").length >= 40, `${q.id}: answer should be a full, studyable answer`);
    assert.ok(q.points.length >= 3 && q.check.trim(), `${q.id}: key points and what is checked`);
    q.topics.forEach(t => assert.ok(LESSON_TOPICS[t], `${q.id}: unknown lesson ${t}`));
  });
  for (const r of roleIds) {
    const qs = INTERVIEW_PREP.forRole(r);
    assert.ok(qs.length >= 30, `${r}: at least 30 prep questions (has ${qs.length})`);
    ["start", "basics", "core", "design", "behaviour", "ask"].forEach(st => assert.ok(qs.some(q => q.stage === st), `${r}: no "${st}" questions`));
    const order = qs.map(q => stageIds.indexOf(q.stage));
    assert.deepEqual(order, order.slice().sort((a, b) => a - b), `${r}: questions are in interview order`);
    assert.ok(INTERVIEW_PREP.rounds[r] && INTERVIEW_PREP.rounds[r].length >= 4, `${r}: typical interview rounds`);
  }
  assert.ok(INTERVIEW_PREP.SOURCES.length >= 8, "sources listed");
});

test("every lesson has step-by-step, common mistakes and learner questions in both languages", () => {
  assert.deepEqual(Object.keys(LESSON_DEEP).sort(), Object.keys(LESSON_TOPICS).sort());
  for (const [id, d] of Object.entries(LESSON_DEEP)) {
    assert.ok(d.steps.length >= 4, `${id}: at least 4 steps`);
    assert.ok(d.mistakes.length >= 2, `${id}: at least 2 mistakes`);
    assert.ok(d.faq.length >= 2, `${id}: at least 2 learner questions`);
    d.steps.forEach((s, i) => both(s, `${id} step ${i + 1}`));
    d.mistakes.forEach((s, i) => both(s, `${id} mistake ${i + 1}`));
    d.faq.forEach(([q, a], i) => { both(q, `${id} faq ${i + 1} question`); both(a, `${id} faq ${i + 1} answer`); });
  }
});

test("learn.html loads every deep content file and the embedded apps", () => {
  const html = fs.readFileSync(path.join(__dirname, "..", "learn.html"), "utf8");
  DEEP_FILES.concat(["interview-prep.js", "resumes.js"]).forEach(f => assert.ok(html.includes(`content/${f}`), `learn.html must load content/${f}`));
  ["interview.js", "resume-builder.js", "tts.js"].forEach(f => assert.ok(html.includes(`src="${f}"`), `learn.html must load ${f}`));
});

test("sample resumes read as human-written: no dashes and no hyphenated words", () => {
  const allowed = /^(scikit-learn)$/i;
  for (const [id, r] of Object.entries(RESUMES)) {
    const text = JSON.stringify(r);
    assert.ok(!/[—–]/.test(text), `${id}: contains an em or en dash`);
    const hyphenated = (text.match(/\b[A-Za-z]+(?:-[A-Za-z]+)+\b/g) || []).filter(w => !allowed.test(w) && !roleIds.includes(w));
    assert.deepEqual(hyphenated, [], `${id}: hyphenated words`);
    const tone = ResumeBuilder.toneCheck(ResumeBuilder.sampleDoc(id));
    assert.equal(tone.dashes + tone.hyphenWords.length + tone.buzz.length, 0, `${id}: the builder's tone check flags the sample`);
  }
});

test("resume builder: reads a pasted resume into sections", () => {
  const text = `Priya Sharma
Senior QA Engineer
priya@mail.com | +91 98765 43210 | linkedin.com/in/priya
PROFILE
Tester with 6 years in banking apps.
Technical Skills
Selenium, Java, Python, SQL, Jenkins, Docker, AWS
Work Experience
Senior QA Engineer | Woodgrove Bank, Mumbai | Jan 2021 – Present
• Built a Selenium framework covering 1,200 cases
• Reduced regression time from 3 days to 6 hours
and cut flaky tests by half
Education
B.Tech, Computer Science | XYZ University | 2018
Certifications
ISTQB Foundation`;
  const { doc } = ResumeBuilder.parseResume(text);
  assert.equal(doc.name, "Priya Sharma");
  assert.equal(doc.headline, "Senior QA Engineer");
  assert.match(doc.contact, /priya@mail\.com · \+91 98765 43210 · linkedin/);
  assert.match(doc.summary, /6 years/);
  assert.match(doc.skills, /Selenium/);
  const exp = doc.sections.find(s => s.id === "experience").text;
  assert.match(exp, /• Reduced regression time from 3 days to 6 hours and cut flaky tests by half/, "wrapped bullet lines are joined");
  assert.match(doc.sections.find(s => s.id === "certifications").text, /• ISTQB Foundation/);
  const html = ResumeBuilder.sheetHtml(doc);
  assert.match(html, /<span class="rs-dates">Jan 2021 – Present<\/span>/);
  assert.equal(ResumeBuilder.fixDashes("Jan 2021 – Present"), "Jan 2021 to Present");
  assert.equal(ResumeBuilder.fixHyphens("test-automation with scikit-learn"), "test automation with scikit-learn");
});

test("resume builder: fills questionnaire answers the resume clearly shows", () => {
  const a = ResumeBuilder.profileFromText("Senior QA Engineer at a bank. Selenium test automation, regression testing, Java, Python, SQL joins in PostgreSQL, Docker and Jenkins CI/CD. 6 years experience.");
  assert.equal(a.experience, "3-7");
  assert.equal(a.background, "it");
  assert.equal(a.currentRole, "qa");
  assert.deepEqual(a.langs, ["python", "java"]);
  assert.equal(a.sql, "2");
  assert.equal(a.cloud, "2");
  assert.equal(a.bizDomain, "finance");
  assert.equal(a.ml, undefined, "regression testing is not machine learning");
  const ml = ResumeBuilder.profileFromText("Data Scientist. Trained XGBoost and PyTorch models, deployed the model to production with MLflow and model monitoring.");
  assert.equal(ml.background, "aiml");
  assert.equal(ml.ml, "4");
});

test("every sample resume converts into the builder with all its ATS keywords", () => {
  for (const id of roleIds) {
    const text = ResumeBuilder.docText(ResumeBuilder.sampleDoc(id)).toLowerCase();
    RESUMES[id].keywords.forEach(k => assert.ok(text.includes(k.toLowerCase()), `${id}: "${k}" lost when loading the sample`));
  }
});

test("AI for kids: six complete levels with valid games in both languages", () => {
  const { KIDS } = require("../content/kids.js");
  assert.equal(KIDS.levels.length, 6);
  const types = new Set();
  KIDS.levels.forEach(l => {
    both(l.title, `${l.id} title`);
    both(l.remember, `${l.id} remember`);
    both(l.fact, `${l.id} fact`);
    assert.ok(l.story.length >= 3, `${l.id}: story`);
    l.story.forEach((s, i) => both(s, `${l.id} story ${i + 1}`));
    assert.ok(l.badge && l.badge.e, `${l.id}: badge`);
    const g = l.game;
    types.add(g.type);
    both(g.prompt, `${l.id} prompt`);
    if (g.type === "sort") assert.ok(g.items.some(x => x.ai) && g.items.some(x => !x.ai), `${l.id}: both kinds of items`);
    if (g.type === "safe") g.items.forEach(x => { both(x.q, `${l.id} q`); both(x.why, `${l.id} why`); });
    if (g.type === "teach") g.test.forEach(x => assert.ok(g.train.some(tr => tr.family === x.family && tr.fruit === x.fruit), `${l.id}: test item ${x.e} has a matching taught example`));
    if (g.type === "pattern" || g.type === "prompt") g.rounds.forEach(r => assert.ok(r.answer >= 0 && r.answer < r.options.length, `${l.id}: answer index`));
    if (g.type === "match") g.pairs.forEach(x => { both(x.job, `${l.id} job`); });
  });
  assert.deepEqual([...types].sort(), ["match", "pattern", "prompt", "safe", "sort", "teach"]);
  for (const f of ["index.html", ...KIDS.levels.map(l => `${l.id}.html`)]) {
    const html = fs.readFileSync(path.join(__dirname, "..", "kids", f), "utf8");
    assert.ok(html.includes("kids.js") && html.includes("data-reader"), `kids/${f}: game script and Listen bar`);
  }
});

test("Hinglish: every prep question, practice question, step name and role overview is translated", () => {
  const H = Object.assign({}, ...[1, 2, 3].map(i => require(`../content/interview-prep-hi-${i}.js`).INTERVIEW_PREP_HI));
  const { INTERVIEW_PREP_HI_META: META } = require("../content/interview-prep-hi-1.js");
  INTERVIEW_PREP.questions.forEach(q => {
    const h = H[q.id];
    assert.ok(h && h.q && h.answer && h.check, `${q.id}: Hinglish prep missing`);
    assert.equal(h.points.length, q.points.length, `${q.id}: points must match one to one`);
    assert.notEqual(h.answer, q.answer, `${q.id}: Hinglish answer is a copy`);
  });
  INTERVIEW_PREP.stages.forEach(st => assert.ok(META.stages[st.id], `stage ${st.id}`));
  roleIds.forEach(r => assert.equal(META.rounds[r].length, INTERVIEW_PREP.rounds[r].length, `${r}: rounds`));
  const { INTERVIEW } = require("../content/interview.js");
  const { INTERVIEW_HI: IH } = require("../content/interview-hi.js");
  INTERVIEW.questions.forEach(q => {
    const h = IH.questions[q.id];
    assert.ok(h && h.q, `${q.id}: Hinglish practice missing`);
    if (q.type === "mcq") { assert.equal(h.options.length, q.options.length, `${q.id}: options`); assert.ok(h.why, `${q.id}: why`); }
    else { assert.equal(h.points.length, q.points.length, `${q.id}: points`); assert.ok(h.model, `${q.id}: model`); }
    assert.ok(IH.areas[q.area], `area ${q.area}`);
  });
  roleIds.forEach(r => assert.equal(IH.extra[r].length, INTERVIEW.extra[r].length, `${r}: extra`));
  const { ROLES_HI } = require("../content/roles-hi.js");
  roleIds.forEach(r => {
    assert.equal(ROLES_HI[r].steps.length, ROLES[r].roadmap.length, `${r}: step names`);
    ["tagline", "why", "bestFor"].forEach(k => assert.ok(ROLES_HI[r][k], `${r}: ${k}`));
  });
  ["learn.html"].forEach(f => {
    const html = fs.readFileSync(path.join(__dirname, "..", f), "utf8");
    ["interview-prep-hi-1.js", "interview-prep-hi-2.js", "interview-prep-hi-3.js", "interview-hi.js", "roles-hi.js"].forEach(s => assert.ok(html.includes(s), `${f} loads ${s}`));
  });
  ["interview.html", "resume-builder.html"].forEach(f => assert.match(fs.readFileSync(path.join(__dirname, "..", f), "utf8"), /data-site-lang="hi"/, `${f}: language switch`));
});

test("resume score: 100 point rubric, samples score well, impact lines carry numbers", () => {
  for (const id of roleIds) {
    const doc = ResumeBuilder.sampleDoc(id);
    const sc = ResumeBuilder.scoreResume(doc, id);
    const max = Object.values(sc.parts).reduce((t, [, m]) => t + m, 0);
    assert.equal(max, 100, "rubric adds up to 100");
    assert.ok(sc.total >= 80 && sc.total <= 100, `${id}: sample scores ${sc.total}`);
    Object.entries(sc.parts).forEach(([k, [g, m]]) => assert.ok(g >= 0 && g <= m, `${id}: ${k} within range`));
    const impact = doc.impact.split("\n").filter(Boolean);
    assert.ok(impact.length >= 1 && impact.length <= 3 && impact.every(l => /\d/.test(l)), `${id}: impact lines with numbers`);
  }
  const weak = { name: "Your Name", headline: "", contact: "", summary: "", skills: "", impact: "", sections: [{ id: "experience", title: "Experience", text: "Developer | Acme\n• Responsible for many things" }] };
  assert.ok(ResumeBuilder.scoreResume(weak, "ml-engineer").total < 40, "a weak resume scores low");
  const html = ResumeBuilder.sheetHtml({ name: "A", headline: "", contact: "a@b.com · linkedin.com/in/a", summary: "", skills: "", impact: "", sections: [{ id: "experience", title: "Experience", text: "Dev | X | 2020 to Present\nTech: Python, SQL\n• Built a thing used by 50 people" }] });
  assert.match(html, /href="mailto:a@b\.com"/);
  assert.match(html, /href="https:\/\/linkedin\.com\/in\/a"/);
  assert.match(html, /class="rs-tech">Python, SQL</);
});

test("AI dictionary: 100+ terms, A to Z, both languages, valid lesson links and related terms", () => {
  const T = [1, 2, 3].flatMap(i => require(`../content/glossary-${i}.js`).GLOSSARY_TERMS);
  const { Glossary } = require("../glossary.js");
  assert.ok(T.length >= 100, `has ${T.length} terms`);
  const names = T.map(t => t.term.toLowerCase());
  assert.equal(new Set(names).size, names.length, "no duplicate terms");
  T.forEach(t => {
    ["short", "detail", "example"].forEach(k => both(t[k], `${t.term} ${k}`));
    assert.ok(t.detail[0].split(/\s+/).length >= 25, `${t.term}: detailed explanation`);
    assert.ok(Glossary.CATS[t.cat], `${t.term}: category`);
    t.lessons.forEach(id => assert.ok(LESSON_TOPICS[id], `${t.term}: unknown lesson ${id}`));
  });
  const sorted = Glossary.terms(T).map(t => t.term);
  assert.deepEqual(sorted, sorted.slice().sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" })), "alphabetical");
  const html = Glossary.html({ lang: "both", list: T, lessonLink: id => `href="../learn/${id}.html"`, lessonName: id => LESSON_TOPICS[id].title });
  assert.match(html, /id="term-rag"/);
  const page = fs.readFileSync(path.join(__dirname, "..", "glossary", "index.html"), "utf8");
  assert.match(page, /"@type": "DefinedTermSet"/);
  assert.equal((page.match(/class="gl-term"/g) || []).length, T.length, "every term on the page");
  const related = (html.match(/data-gl-jump="([^"]+)"/g) || []).map(x => x.slice(14, -1));
  related.forEach(id => assert.match(html, new RegExp(`id="${id}"`), `related link ${id} resolves`));
});
