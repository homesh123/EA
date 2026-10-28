// Practice tasks, interview questions, sample resumes and lesson diagrams.
const test = require("node:test");
const assert = require("node:assert/strict");
const { ROLES } = require("../roles.js");
const { LESSON_TOPICS } = require("../content/lessons.js");
const { ROLE_TASKS } = require("../content/tasks.js");
const { INTERVIEW } = require("../content/interview.js");
const { RESUMES } = require("../content/resumes.js");
const { LESSON_VISUALS } = require("../content/visuals.js");
const { optionOrder } = require("../content/shuffle.js");

const roleIds = Object.keys(ROLES);
const both = (pair, label) => {
  assert.ok(Array.isArray(pair) && pair.length === 2 && pair[0].trim() && pair[1].trim(), `${label} must be [en, hi]`);
  assert.notEqual(pair[0], pair[1], `${label}: Hinglish is a copy of the English`);
};

test("every role has starter, core and portfolio tasks, complete in both languages", () => {
  assert.deepEqual(Object.keys(ROLE_TASKS).sort(), roleIds.slice().sort());
  const seen = new Set();
  for (const [roleId, tasks] of Object.entries(ROLE_TASKS)) {
    assert.deepEqual(tasks.map(t => t.level), ["Starter", "Core", "Portfolio"], roleId);
    tasks.forEach(t => {
      assert.ok(!seen.has(t.id), `duplicate task id ${t.id}`);
      seen.add(t.id);
      both(t.title, `${t.id} title`); both(t.goal, `${t.id} goal`); both(t.deliverable, `${t.id} deliverable`);
      assert.ok(t.steps.length >= 4, `${t.id} needs at least 4 steps`);
      t.steps.forEach((s, i) => both(s, `${t.id} step ${i + 1}`));
      assert.ok(t.doneWhen.length >= 3, `${t.id} needs done-when criteria`);
      t.doneWhen.forEach((s, i) => both(s, `${t.id} doneWhen ${i + 1}`));
      t.topics.forEach(tp => assert.ok(LESSON_TOPICS[tp], `${t.id}: unknown lesson ${tp}`));
      assert.match(t.hours, /^\d+–\d+$/);
    });
  }
});

test("interview bank: valid questions, and every role gets enough of each type", () => {
  const ids = new Set();
  INTERVIEW.questions.forEach(q => {
    assert.ok(!ids.has(q.id), `duplicate ${q.id}`);
    ids.add(q.id);
    q.roles.forEach(r => assert.ok(ROLES[r], `${q.id}: unknown role ${r}`));
    q.topics.forEach(tp => assert.ok(LESSON_TOPICS[tp], `${q.id}: unknown lesson ${tp}`));
    assert.ok(q.area && q.q.trim());
    if (q.type === "mcq") {
      assert.equal(q.options.length, 4, `${q.id} needs 4 options`);
      assert.ok(q.answer >= 0 && q.answer < 4 && q.why.trim(), q.id);
      assert.equal(new Set(q.options).size, 4, `${q.id} has duplicate options`);
    } else {
      assert.equal(q.type, "open");
      assert.ok(q.points.length >= 4 && q.model.length > 200, `${q.id} needs key points and a full model answer`);
    }
  });
  roleIds.forEach(r => {
    const qs = INTERVIEW.questions.filter(q => q.roles.includes(r));
    assert.ok(qs.filter(q => q.type === "mcq").length >= 10, `${r}: at least 10 multiple-choice questions`);
    assert.ok(qs.filter(q => q.type === "open").length >= 4, `${r}: at least 4 open questions`);
    assert.ok(new Set(qs.map(q => q.area)).size >= 5, `${r}: questions should cover at least 5 skill areas`);
    assert.ok((INTERVIEW.extra[r] || []).length >= 5, `${r}: extra questions to prepare`);
  });
});

test("shuffled options don't give the answer away", () => {
  const positions = [0, 0, 0, 0];
  INTERVIEW.questions.filter(q => q.type === "mcq").forEach(q => positions[optionOrder(q.id, 4).indexOf(q.answer)]++);
  const total = positions.reduce((a, b) => a + b, 0);
  positions.forEach(n => assert.ok(n / total < 0.45, `correct answer lands in one position too often: ${positions}`));
  const lessonPos = [0, 0, 0];
  Object.entries(LESSON_TOPICS).forEach(([id, x]) => lessonPos[optionOrder(id, 3).indexOf(x.quiz.answer)]++);
  lessonPos.forEach(n => assert.ok(n / 54 < 0.55, `lesson quiz answers cluster: ${lessonPos}`));
  assert.deepEqual(optionOrder("same-seed", 4), optionOrder("same-seed", 4), "order is stable for a seed");
});

test("every resume is ATS-friendly: all keywords present, standard parts, placeholder contact details", () => {
  assert.deepEqual(Object.keys(RESUMES).sort(), roleIds.slice().sort());
  for (const [id, r] of Object.entries(RESUMES)) {
    const text = [r.target, r.summary, ...r.skills.flat(), ...r.experience.flatMap(e => [e.title, ...e.bullets]),
      ...r.projects.flatMap(p => [p.name, ...p.bullets]), ...r.education.flat(), ...r.certifications].join(" ").toLowerCase();
    r.keywords.forEach(k => assert.ok(text.includes(k.toLowerCase()), `${id}: keyword "${k}" missing from the resume text`));
    assert.ok(r.keywords.length >= 12, `${id}: at least 12 ATS keywords`);
    assert.ok(r.experience.length >= 1 && r.projects.length >= 1 && r.education.length >= 1, id);
    r.experience.forEach(e => e.bullets.forEach(b => assert.match(b, /\d/, `${id}: bullet without a number: "${b}"`)));
    assert.match(r.contact, /XXX/, `${id}: contact details must stay placeholders`);
  }
});

test("lesson diagrams exist for real lessons, with captions in both languages and an accessible label", () => {
  for (const [id, v] of Object.entries(LESSON_VISUALS)) {
    assert.ok(LESSON_TOPICS[id], `diagram for unknown lesson ${id}`);
    both(v.caption, `${id} caption`);
    assert.match(v.svg, /^<svg[^>]+role="img"[^>]+aria-label="[^"]{20,}"/, `${id}: svg needs role=img and a descriptive aria-label`);
    assert.ok(!/undefined|NaN/.test(v.svg), `${id}: broken value in svg`);
  }
  assert.ok(Object.keys(LESSON_VISUALS).length >= 15, "at least 15 lessons have diagrams");
});
