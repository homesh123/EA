// Run with: npm test
const test = require("node:test");
const assert = require("node:assert/strict");
const { rankRoles, deriveProfile, plan, parseWeeks } = require("../scoring.js");
const { ROLES } = require("../roles.js");
const { QUESTIONS } = require("../questions.js");
const personas = require("./personas.js");

for (const p of personas) {
  test(`persona: ${p.name}`, () => {
    const ids = rankRoles(p.answers).results.map(r => r.id);
    const top3 = ids.slice(0, 3);
    if (p.expectTop) assert.ok(p.expectTop.includes(ids[0]), `top was ${ids[0]}, expected one of ${p.expectTop} (ranking: ${ids.join(", ")})`);
    if (p.expectTop3) assert.ok(p.expectTop3.some(r => top3.includes(r)), `none of ${p.expectTop3} in top 3: ${top3}`);
    if (p.expectNotTop) assert.ok(!p.expectNotTop.includes(ids[0]), `${ids[0]} should not be the top match`);
    if (p.expectNotTop3) p.expectNotTop3.forEach(r => assert.ok(!top3.includes(r), `${r} should not be in top 3: ${top3}`));
  });
}

test("every scored role exists in the role catalogue and vice versa", () => {
  const ids = rankRoles(personas[0].answers).results.map(r => r.id).sort();
  assert.deepEqual(ids, Object.keys(ROLES).sort());
});

test("every role-choice option for current AI role is a real role or 'other'", () => {
  const q = QUESTIONS.find(x => x.id === "currentAiRole");
  q.options.forEach(o => assert.ok(o.value === "other" || ROLES[o.value], o.value));
});

test("quiz questions have a correct answer among their options", () => {
  QUESTIONS.filter(q => q.quiz).forEach(q => assert.ok(q.options.some(o => o.value === q.correct), q.id));
});

test("experienced engineers are never sent to the beginner path", () => {
  for (const role of ["backend", "devops", "dataeng", "fullstack"]) {
    const a = { ...personas[0].answers, currentRole: role, experience: "7-12", goal: "firstjob" };
    assert.notEqual(rankRoles(a).results[0].id, "ai-fresher", role);
  }
});

test("already-in-AI users are steered away from their current role", () => {
  const a = { ...personas.find(p => p.answers.background === "aiml").answers };
  const r = rankRoles(a).results;
  assert.notEqual(r[0].id, a.currentAiRole);
});

test("profile validation fixes contradictory answers", () => {
  const p = deriveProfile({ background: "it", langs: ["python"], pythonLevel: "0", math: "2", quizMath: "10", ml: "3" });
  assert.equal(p.py, 1);
  assert.equal(p.math, 1);
  assert.ok(p.notes.length >= 2);
  const q = deriveProfile({ background: "nonit", langs: ["none"], pythonLevel: "0", ml: "4" });
  assert.equal(q.ml, 2);
});

test("fast-tracking shortens the plan and more hours shorten the calendar", () => {
  const role = ROLES["ml-engineer"];
  const novice = deriveProfile({ background: "it", pythonLevel: "0", ml: "0", math: "0", cloud: "0", hours: "8" });
  const pro = deriveProfile({ background: "it", pythonLevel: "3", ml: "4", math: "2", cloud: "2", hours: "8" });
  assert.ok(plan(pro, role).studyHours < plan(novice, role).studyHours);
  const fast = deriveProfile({ background: "it", pythonLevel: "0", ml: "0", math: "0", cloud: "0", hours: "25" });
  assert.ok(plan(fast, role).calendarWeeks < plan(novice, role).calendarWeeks);
});

test("week parsing handles ranges, single values and ongoing steps", () => {
  assert.equal(parseWeeks("2-3 weeks"), 2.5);
  assert.equal(parseWeeks("2 weeks"), 2);
  assert.equal(parseWeeks("2 weeks + ongoing"), 2);
  assert.equal(parseWeeks("ongoing"), null);
});

test("random answer sets never crash and every role is reachable", () => {
  const seen = new Set();
  let seed = 42;
  const rnd = n => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed % n; };
  for (let i = 0; i < 20000; i++) {
    const a = {};
    QUESTIONS.forEach(q => {
      const vals = q.options.map(o => o.value);
      a[q.id] = q.multi ? vals.filter(() => rnd(3) === 0) : vals[rnd(vals.length)];
      if (q.multi && !a[q.id].length) a[q.id] = [vals[0]];
    });
    const { results } = rankRoles(a);
    results.forEach(r => assert.ok(r.fit >= 0 && r.fit <= 100 && Number.isFinite(r.plan.months)));
    seen.add(results[0].id);
  }
  assert.deepEqual([...seen].sort(), Object.keys(ROLES).sort());
});
