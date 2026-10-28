// Lesson library and course structure for the Learn section.
const test = require("node:test");
const assert = require("node:assert/strict");
const { LESSON_TOPICS, LEARN_TRACKS, LEARN_I18N } = require("../content/lessons.js");
const { ROLES } = require("../roles.js");

const PAIRS = ["title", "analogy", "explain", "remember"];
const nonEmpty = s => typeof s === "string" && s.trim().length > 0;

for (const [id, x] of Object.entries(LESSON_TOPICS)) {
  test(`lesson ${id}: complete in English and Hinglish`, () => {
    PAIRS.forEach(k => {
      assert.ok(Array.isArray(x[k]) && x[k].length === 2, `${k} must be [en, hi]`);
      assert.ok(nonEmpty(x[k][0]) && nonEmpty(x[k][1]), `${k} has an empty language`);
      if (k !== "title") assert.notEqual(x[k][0], x[k][1], `${k} Hinglish is just the English copied`);
    });
    assert.ok(x.terms.length >= 3, "at least 3 key terms");
    x.terms.forEach(([term, en, hi]) => assert.ok(nonEmpty(term) && nonEmpty(en) && nonEmpty(hi), `term ${term}`));
    assert.ok(nonEmpty(x.example.code) && nonEmpty(x.example.lang), "example code");
    assert.ok(nonEmpty(x.example.note[0]) && nonEmpty(x.example.note[1]), "example note in both languages");
    assert.ok(nonEmpty(x.quiz.q[0]) && nonEmpty(x.quiz.q[1]), "quiz question in both languages");
    assert.equal(x.quiz.options.length, 3, "three quiz options");
    x.quiz.options.forEach(o => assert.ok(nonEmpty(o[0]) && nonEmpty(o[1])));
    assert.ok(Number.isInteger(x.quiz.answer) && x.quiz.answer >= 0 && x.quiz.answer < 3, "valid answer index");
    assert.ok(nonEmpty(x.quiz.why[0]) && nonEmpty(x.quiz.why[1]), "quiz explanation in both languages");
    assert.ok(x.mins >= 3 && x.mins <= 15 && nonEmpty(x.icon));
  });
}

test("every role has a course that covers every roadmap step, in order", () => {
  assert.deepEqual(Object.keys(LEARN_TRACKS).sort(), Object.keys(ROLES).sort());
  for (const [roleId, steps] of Object.entries(LEARN_TRACKS)) {
    const nums = steps.map(([n]) => n);
    assert.equal(nums[0], 0, `${roleId} starts with the orientation step`);
    assert.deepEqual(nums.slice(1), ROLES[roleId].roadmap.map(s => s.step), `${roleId} steps match the roadmap`);
  }
});

test("courses only use existing lessons, never twice in one course, and every lesson is used", () => {
  const used = new Set();
  for (const [roleId, steps] of Object.entries(LEARN_TRACKS)) {
    const seen = new Set();
    steps.forEach(([, ids]) => ids.forEach(id => {
      assert.ok(LESSON_TOPICS[id], `${roleId}: unknown lesson ${id}`);
      assert.ok(!seen.has(id), `${roleId}: ${id} appears twice`);
      seen.add(id);
      used.add(id);
    }));
  }
  assert.deepEqual([...used].sort(), Object.keys(LESSON_TOPICS).sort());
});

test("prerequisites come first: Python before pandas/APIs, ML basics before metrics, LLM basics before RAG/agents", () => {
  const before = [["py-basics", "py-logic"], ["ml-how-machines-learn", "ml-train-test"], ["ml-train-test", "ml-metrics"],
    ["llm-what", "llm-api"], ["embeddings", "rag"], ["llm-tool-use", "llm-agents"], ["docker", "kubernetes"], ["sql-basics", "sql-joins"],
    ["math-gradients", "dl-neural-networks"], ["dl-neural-networks", "dl-transformers"], ["api-serving", "docker"]];
  for (const [roleId, steps] of Object.entries(LEARN_TRACKS)) {
    const order = steps.flatMap(([, ids]) => ids);
    before.forEach(([a, b]) => {
      if (order.includes(a) && order.includes(b)) assert.ok(order.indexOf(a) < order.indexOf(b), `${roleId}: ${a} must come before ${b}`);
    });
  }
});

test("interface text exists in both languages", () => {
  assert.deepEqual(Object.keys(LEARN_I18N.hi).sort(), Object.keys(LEARN_I18N.en).sort());
  Object.entries(LEARN_I18N.hi).forEach(([k, v]) => assert.ok(nonEmpty(v), k));
});

test("read aloud: sentence splitting and emoji cleanup", () => {
  const { LessonReader } = require("../tts.js");
  assert.equal(LessonReader.clean("🏠 Real-life example\nHello  world"), "Real-life example. Hello world");
  const long = Array.from({ length: 12 }, (_, i) => `Sentence number ${i} is here.`).join(" ");
  const parts = LessonReader.sentences(long);
  assert.ok(parts.length > 1 && parts.every(p => p.length < 200), "long text is split into short chunks");
  assert.equal(parts.join(" "), long, "no text lost");
});

test("read aloud: every static lesson page has the Listen bar and readable sections", () => {
  const fs = require("node:fs");
  const path = require("node:path");
  for (const id of Object.keys(LESSON_TOPICS)) {
    for (const dir of ["learn", "learn/hi"]) {
      const html = fs.readFileSync(path.join(__dirname, "..", dir, `${id}.html`), "utf8");
      assert.ok(html.includes("data-reader") && html.includes("tts.js"), `${dir}/${id} has the Listen bar`);
      assert.ok((html.match(/data-read[ >]/g) || []).length >= 5, `${dir}/${id} marks its sections for reading`);
    }
  }
});
