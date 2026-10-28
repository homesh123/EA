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
