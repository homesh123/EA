// Learn section: one course per AI role, built from content/learn-tracks.js and the lesson
// library in content/lessons-*.js. Progress, quiz answers and language live in localStorage.
const LS_LEARN = "aipf:learn";
const LS_LANG = "aipf:lang";
const LS_STATE = "aipf:v2";
const LS_PROGRESS = "aipf:progress";

const store = {
  get(key) { try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; } },
  set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* private mode */ } }
};
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const $ = sel => document.querySelector(sel);

const params = new URLSearchParams(location.search);
let lang = ["en", "hi"].includes(params.get("lang")) ? params.get("lang") : (store.get(LS_LANG) || "en");
const learn = Object.assign({ done: [], quiz: {}, last: {} }, store.get(LS_LEARN) || {});
const saveLearn = () => store.set(LS_LEARN, learn);
const isDone = id => learn.done.includes(id);

// t("key") for interface text, L([en, hi]) for lesson content.
const t = (key, vars = {}) => (LEARN_I18N[lang][key] ?? LEARN_I18N.en[key]).replace(/\{(\w+)\}/g, (_, v) => vars[v]);
const L = pair => (Array.isArray(pair) ? pair[lang === "hi" ? 1 : 0] : pair);

const courseLessons = roleId => LEARN_TRACKS[roleId].flatMap(([step, topics]) => topics.map(id => ({ step, id })));
const courseMinutes = roleId => courseLessons(roleId).reduce((sum, l) => sum + LESSON_TOPICS[l.id].mins, 0);
const stepTitle = (roleId, step) => step === 0 ? t("startHere") : `${t("step")} ${step}: ${ROLES[roleId].roadmap.find(s => s.step === step).title}`;

// Personal context from the questionnaire, if it was completed: best-fit role and fast-track steps.
function personal() {
  const st = store.get(LS_STATE);
  if (!st || !st.answers || typeof Scoring === "undefined") return null;
  const visible = QUESTIONS.filter(q => !q.showIf || q.showIf(st.answers));
  const complete = visible.every(q => {
    const v = st.answers[q.id];
    return Array.isArray(v) ? v.length > 0 : v !== undefined && v !== "";
  });
  if (!complete) return null;
  try {
    const { results } = Scoring.rankRoles(st.answers);
    return { top: results[0].id, results };
  } catch (e) { return null; }
}
const me = personal();
const fastSteps = roleId => {
  const r = me && me.results.find(x => x.id === roleId);
  return new Set(r ? r.plan.steps.filter(s => s.fast).map(s => s.step) : []);
};

// ---------- routing ----------
let course = LEARN_TRACKS[params.get("course")] ? params.get("course") : null;
let lessonId = null;
let showComplete = false;
if (course) {
  const list = courseLessons(course);
  const want = params.get("lesson");
  const wantStep = params.get("step");
  if (want && list.some(l => l.id === want)) lessonId = want;
  else if (wantStep !== null) lessonId = (list.find(l => l.step === Number(wantStep)) || {}).id;
  if (!lessonId) lessonId = learn.last[course] || (list.find(l => !isDone(l.id)) || list[0]).id;
}

function syncUrl() {
  const q = new URLSearchParams();
  if (course) { q.set("course", course); q.set("lesson", lessonId); }
  if (lang === "hi") q.set("lang", "hi");
  const qs = q.toString();
  history.replaceState(null, "", qs ? `?${qs}` : location.pathname);
}

function openLesson(id) {
  lessonId = id;
  showComplete = false;
  learn.last[course] = id;
  saveLearn();
  syncUrl();
  render();
  const top = $(".lesson");
  if (top && top.getBoundingClientRect().top < 0) top.scrollIntoView({ block: "start" });
}

function setCourse(id) {
  course = id;
  const list = id ? courseLessons(id) : [];
  lessonId = id ? (learn.last[id] || (list.find(l => !isDone(l.id)) || list[0]).id) : null;
  showComplete = false;
  syncUrl();
  render();
  window.scrollTo({ top: 0 });
}

// ---------- rendering ----------
const langToggle = () => `<div class="lang-toggle" role="group" aria-label="${esc(t("language"))}">
    ${["en", "hi"].map(code => `<button type="button" data-lang="${code}" aria-pressed="${lang === code}" class="${lang === code ? "active" : ""}">${code === "en" ? "English" : "Hinglish"}</button>`).join("")}
  </div>`;
const meter = pct => `<span class="meter progress" aria-hidden="true"><span style="width:${Math.max(3, pct)}%"></span></span>`;

function render() {
  const app = $("#learnApp");
  app.innerHTML = course ? courseView() : pickerView();
  document.title = course
    ? `${L(LESSON_TOPICS[lessonId].title)} · ${ROLES[course].title} | AI Path Finder`
    : `${t("chooseCourse")} | AI Path Finder`;
  bind(app);
}

function pickerView() {
  const order = Object.keys(LEARN_TRACKS).sort((a, b) => (me && a === me.top ? -1 : me && b === me.top ? 1 : 0));
  return `
    <div class="learn-bar">
      <div><h2>${esc(t("chooseCourse"))}</h2><p class="muted">${esc(t("chooseIntro"))}</p></div>
      ${langToggle()}
    </div>
    <ul class="course-grid">
      ${order.map(id => {
        const list = courseLessons(id);
        const done = list.filter(l => isDone(l.id)).length;
        return `<li><button type="button" class="course-card${me && me.top === id ? " recommended" : ""}" data-course="${id}">
          ${me && me.top === id ? `<span class="badge-next">${esc(t("recommended"))}</span>` : ""}
          <span class="course-title">${esc(ROLES[id].title)}</span>
          <span class="course-tag">${esc(ROLES[id].tagline)}</span>
          <span class="course-meta">${list.length} ${esc(t("lessons"))} · ~${courseMinutes(id)} ${esc(t("minutes"))}</span>
          ${done ? `<span class="course-progress">${meter((done / list.length) * 100)}<span class="small">${done}/${list.length}</span></span>` : ""}
          <span class="course-cta">${esc(done ? t("continueCourse") : t("startCourse"))} →</span>
        </button></li>`;
      }).join("")}
    </ul>
    ${me ? "" : `<p class="small"><a href="./#app">${esc(t("takeQuiz"))} →</a></p>`}`;
}

function courseView() {
  const role = ROLES[course];
  const list = courseLessons(course);
  const doneCount = list.filter(l => isDone(l.id)).length;
  const fast = fastSteps(course);
  return `
    <div class="learn-bar">
      <div>
        <p class="eyebrow">${esc(t("course"))}</p>
        <h2>${esc(role.title)}</h2>
        <div class="course-stats"><span class="small">${esc(t("progress", { done: doneCount, total: list.length }))}</span>${meter((doneCount / list.length) * 100)}</div>
      </div>
      <div class="learn-controls">
        ${langToggle()}
        <button type="button" class="link-btn small" data-act="switch">${esc(t("switchCourse"))}</button>
        ${me ? `<a class="small" href="./">${esc(t("backToRoadmap"))}</a>` : ""}
      </div>
    </div>
    <button type="button" class="outline-toggle" aria-expanded="false" aria-controls="outline">📚 ${esc(t("outline"))} · ${doneCount}/${list.length}</button>
    <div class="learn-grid">
      <nav class="outline" id="outline" aria-label="${esc(t("outline"))}">
        ${LEARN_TRACKS[course].map(([step, topics]) => `
          <div class="ol-step">
            <p class="ol-step-head"><span class="ol-num">${step === 0 ? "★" : step}</span><span>${esc(step === 0 ? t("startHere") : ROLES[course].roadmap.find(s => s.step === step).title)}</span>${fast.has(step) ? `<span class="badge-fast">${esc(t("youMayKnow"))}</span>` : ""}</p>
            <ol>${topics.map(id => `<li><a href="?course=${course}&lesson=${id}${lang === "hi" ? "&lang=hi" : ""}" data-lesson="${id}" class="ol-lesson${id === lessonId ? " current" : ""}${isDone(id) ? " done" : ""}"${id === lessonId ? ' aria-current="page"' : ""}>
              <span class="ol-check" aria-hidden="true">${isDone(id) ? "✓" : ""}</span><span>${LESSON_TOPICS[id].icon} ${esc(L(LESSON_TOPICS[id].title))}</span></a></li>`).join("")}</ol>
          </div>`).join("")}
      </nav>
      <article class="lesson" lang="${lang === "hi" ? "hi-Latn" : "en"}">${showComplete ? completeView() : lessonView(list, fast)}</article>
    </div>`;
}

function lessonView(list, fast) {
  const idx = list.findIndex(l => l.id === lessonId);
  const { step } = list[idx];
  const x = LESSON_TOPICS[lessonId];
  const chosen = learn.quiz[lessonId];
  const answered = chosen !== undefined && chosen !== null;
  const right = answered && chosen === x.quiz.answer;
  const stepTopics = LEARN_TRACKS[course].find(([s]) => s === step)[1];
  const stepDone = step > 0 && stepTopics.every(isDone);
  const roadmapDone = (() => {
    const raw = (store.get(LS_PROGRESS) || {})[course];
    const doneSteps = Array.isArray(raw) ? raw : (raw && raw.done) || [];
    return doneSteps.includes(step);
  })();
  const isLast = idx === list.length - 1;
  return `
    <p class="lesson-meta">${esc(stepTitle(course, step))} · ${esc(t("lessonOf", { i: idx + 1, n: list.length }))} · ⏱ ${x.mins} ${esc(t("readTime"))}${fast.has(step) ? ` <span class="badge-fast">${esc(t("youMayKnow"))}</span>` : ""}</p>
    <h2 class="lesson-title"><span class="lesson-icon" aria-hidden="true">${x.icon}</span>${esc(L(x.title))}</h2>

    <section class="ls ls-analogy"><h3>🏠 ${esc(t("realLife"))}</h3><p>${esc(L(x.analogy))}</p></section>
    <section class="ls ls-explain"><h3>💡 ${esc(t("simpleWords"))}</h3><p>${esc(L(x.explain))}</p></section>
    <section class="ls ls-terms"><h3>🔑 ${esc(t("keyTerms"))}</h3>
      <dl class="terms">${x.terms.map(([term, en, hi]) => `<div><dt>${esc(term)}</dt><dd>${esc(lang === "hi" ? hi : en)}</dd></div>`).join("")}</dl>
    </section>
    <section class="ls ls-example"><h3>👀 ${esc(t("seeItInAction"))}</h3>
      <div class="code-wrap"><span class="code-lang">${esc(x.example.lang)}</span><button type="button" class="copy-btn" data-act="copy">${esc(t("copy"))}</button><pre><code>${esc(x.example.code)}</code></pre></div>
      <p class="small muted">${esc(L(x.example.note))}</p>
    </section>
    <section class="ls ls-quiz"><h3>✅ ${esc(t("quickCheck"))}</h3>
      <p class="quiz-q">${esc(L(x.quiz.q))}</p>
      <div class="quiz-opts" role="group" aria-label="${esc(t("quickCheck"))}">
        ${x.quiz.options.map((o, i) => {
          const cls = !answered ? "" : i === x.quiz.answer ? " right" : i === chosen ? " wrong" : " dim";
          return `<button type="button" class="quiz-opt${cls}" data-opt="${i}" ${answered ? "disabled" : ""}><span class="quiz-letter">${"ABC"[i]}</span>${esc(L(o))}</button>`;
        }).join("")}
      </div>
      ${answered ? `<div class="quiz-feedback ${right ? "ok" : "miss"}" role="status"><strong>${esc(right ? t("correct") : t("notQuite"))}</strong> ${esc(L(x.quiz.why))}
        ${right ? "" : `<button type="button" class="link-btn small" data-act="retry">${esc(t("tryAgain"))}</button>`}</div>` : ""}
    </section>
    <section class="ls ls-remember"><h3>📌 ${esc(t("remember"))}</h3><p>${esc(L(x.remember))}</p></section>

    ${stepDone && me ? `<div class="callout callout-ok step-callout"><strong>${esc(t("stepComplete", { n: step }))}</strong>
      ${roadmapDone ? `<span>${esc(t("stepMarked", { n: step }))}</span>` : `<button type="button" class="button btn-secondary btn-small" data-act="mark-step" data-step="${step}">${esc(t("markStepOnRoadmap", { n: step }))}</button>`}</div>` : ""}

    <div class="lesson-nav">
      <button type="button" class="button btn-secondary" data-act="prev" ${idx === 0 ? "disabled" : ""}>← ${esc(t("prev"))}</button>
      <button type="button" class="button btn-primary" data-act="done">${esc(isDone(lessonId) && !isLast ? t("next") : isLast ? t("markDoneLast") : t("markDone"))} →</button>
    </div>
    <p class="kbd-hint">${esc(t("shortcut"))}</p>`;
}

function completeView() {
  return `<div class="course-complete">
    <p class="complete-emoji" aria-hidden="true">🎉</p>
    <h2>${esc(t("courseComplete"))}</h2>
    <p>${esc(t("courseCompleteText"))}</p>
    <div class="lesson-nav lesson-nav-center">
      ${me ? `<a class="button btn-primary" href="./">${esc(t("backToRoadmap"))}</a>` : `<a class="button btn-primary" href="./#app">${esc(t("takeQuiz"))}</a>`}
      <button type="button" class="button btn-secondary" data-act="switch">${esc(t("switchCourse"))}</button>
    </div>
  </div>`;
}

// ---------- events ----------
function bind(app) {
  app.querySelectorAll("[data-lang]").forEach(b => b.onclick = () => {
    lang = b.dataset.lang;
    store.set(LS_LANG, lang);
    syncUrl();
    render();
  });
  app.querySelectorAll("[data-course]").forEach(b => b.onclick = () => setCourse(b.dataset.course));
  app.querySelectorAll('[data-act="switch"]').forEach(b => b.onclick = () => setCourse(null));
  app.querySelectorAll("[data-lesson]").forEach(a => a.onclick = e => {
    e.preventDefault();
    openLesson(a.dataset.lesson);
  });
  const toggle = app.querySelector(".outline-toggle");
  if (toggle) toggle.onclick = () => {
    const open = app.querySelector(".learn-grid").classList.toggle("outline-open");
    toggle.setAttribute("aria-expanded", open);
  };
  app.querySelectorAll("[data-opt]").forEach(b => b.onclick = () => {
    learn.quiz[lessonId] = Number(b.dataset.opt);
    saveLearn();
    render();
    const fb = $(".quiz-feedback");
    if (fb) fb.scrollIntoView({ block: "nearest" });
  });
  const retry = app.querySelector('[data-act="retry"]');
  if (retry) retry.onclick = () => { delete learn.quiz[lessonId]; saveLearn(); render(); };
  const copy = app.querySelector('[data-act="copy"]');
  if (copy) copy.onclick = () => {
    const text = LESSON_TOPICS[lessonId].example.code;
    const ok = () => { copy.textContent = t("copied"); setTimeout(() => (copy.textContent = t("copy")), 1500); };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(ok, () => {});
  };
  const prev = app.querySelector('[data-act="prev"]');
  if (prev) prev.onclick = () => move(-1);
  const done = app.querySelector('[data-act="done"]');
  if (done) done.onclick = () => {
    if (!isDone(lessonId)) { learn.done.push(lessonId); saveLearn(); }
    move(1);
  };
  const markStep = app.querySelector('[data-act="mark-step"]');
  if (markStep) markStep.onclick = () => {
    const all = store.get(LS_PROGRESS) || {};
    const raw = all[course];
    const prog = Array.isArray(raw) ? { done: raw } : raw || { done: [] };
    const step = Number(markStep.dataset.step);
    if (!prog.done.includes(step)) prog.done.push(step);
    if (!prog.start) { const d = new Date(); prog.start = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
    all[course] = prog;
    store.set(LS_PROGRESS, all);
    render();
  };
}

function move(delta) {
  const list = courseLessons(course);
  const idx = list.findIndex(l => l.id === lessonId);
  const next = idx + delta;
  if (next < 0) return;
  if (next >= list.length) {
    if (list.every(l => isDone(l.id))) { showComplete = true; render(); $(".lesson").scrollIntoView({ block: "start" }); }
    return;
  }
  openLesson(list[next].id);
}

document.addEventListener("keydown", e => {
  if (!course || showComplete || e.altKey || e.ctrlKey || e.metaKey) return;
  if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) return;
  if (e.key === "ArrowRight") move(1);
  else if (e.key === "ArrowLeft") move(-1);
});

syncUrl();
render();
