// Learn section: one course per AI role. Flow: Overview → lessons (by roadmap step) → practice
// tasks → interview prep guide → scored interview practice → resume builder, all inside this page.
// Built from content/learn-tracks.js, the lesson library (content/lessons-*.js), content/visuals.js,
// content/tasks.js and content/interview-prep.js; interview.js and resume-builder.js are mounted
// inside the course. Progress, quiz answers, finished tasks, prepared questions and language live
// in localStorage.
const LS_LEARN = "aipf:learn";
const LS_LANG = "aipf:lang";
const LS_STATE = "aipf:v2";
const LS_PROGRESS = "aipf:progress";
const LS_INTERVIEW = "aipf:interview";
const OVERVIEW = "overview";
const TASKS = "tasks";
const PREP = "prep";
const PRACTICE = "practice";
const RESUME = "resume";
const CAREER_VIEWS = [TASKS, PREP, PRACTICE, RESUME];

const store = {
  get(key) { try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; } },
  set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* private mode */ } }
};
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const $ = sel => document.querySelector(sel);

const params = new URLSearchParams(location.search);
let lang = ["en", "hi"].includes(params.get("lang")) ? params.get("lang") : (store.get(LS_LANG) || "en");
const learn = Object.assign({ done: [], quiz: {}, last: {}, tasks: [], prep: [] }, store.get(LS_LEARN) || {});
const saveLearn = () => store.set(LS_LEARN, learn);
const isDone = id => learn.done.includes(id);

// t("key") for interface text, L([en, hi]) for lesson content.
const t = (key, vars = {}) => (LEARN_I18N[lang][key] ?? LEARN_I18N.en[key]).replace(/\{(\w+)\}/g, (_, v) => vars[v]);
const L = pair => (Array.isArray(pair) ? pair[lang === "hi" ? 1 : 0] : pair);

const courseLessons = roleId => LEARN_TRACKS[roleId].flatMap(([step, topics]) => topics.map(id => ({ step, id })));
const courseMinutes = roleId => courseLessons(roleId).reduce((sum, l) => sum + LESSON_TOPICS[l.id].mins, 0);
const stepName = (roleId, step) => step === 0 ? t("startHere") : ROLES[roleId].roadmap.find(s => s.step === step).title;
const stepTitle = (roleId, step) => step === 0 ? t("startHere") : `${t("step")} ${step}: ${stepName(roleId, step)}`;
const prepQuestions = roleId => typeof INTERVIEW_PREP !== "undefined" ? INTERVIEW_PREP.forRole(roleId) : [];
// Interview question counts per role (content/interview.js).
const INTERVIEW_COUNTS = typeof INTERVIEW !== "undefined"
  ? Object.fromEntries(Object.keys(LEARN_TRACKS).map(r => [r, INTERVIEW.questions.filter(q => q.roles.includes(r)).length])) : {};
const interviewCount = roleId => INTERVIEW_COUNTS[roleId] || 0;

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
let returnTo = null; // where "Back" goes from an extra lesson that isn't part of this course
let prepOnlyLeft = false;

function defaultView(roleId) {
  const list = courseLessons(roleId);
  if (learn.last[roleId]) return learn.last[roleId];
  if (!list.some(l => isDone(l.id))) return OVERVIEW;
  return (list.find(l => !isDone(l.id)) || { id: TASKS }).id;
}
// Any lesson can be opened inside a course: lessons from other courses show as "extra lessons".
const validView = (roleId, id) => id === OVERVIEW || CAREER_VIEWS.includes(id) || !!LESSON_TOPICS[id];
const inCourse = (roleId, id) => courseLessons(roleId).some(l => l.id === id);

if (course) {
  const want = params.get("lesson");
  const wantStep = params.get("step");
  if (want && validView(course, want)) lessonId = want;
  else if (wantStep !== null) lessonId = (courseLessons(course).find(l => l.step === Number(wantStep)) || {}).id;
  if (!lessonId) lessonId = defaultView(course);
}

function syncUrl() {
  const q = new URLSearchParams();
  if (course) { q.set("course", course); q.set("lesson", lessonId); }
  if (lang === "hi") q.set("lang", "hi");
  const qs = q.toString();
  history.replaceState(null, "", qs ? `?${qs}` : location.pathname);
}

function openLesson(id, complete = false) {
  if (!inCourse(course, id) && LESSON_TOPICS[id] && lessonId !== id) returnTo = inCourse(course, lessonId) || !LESSON_TOPICS[lessonId] ? lessonId : returnTo;
  lessonId = id;
  showComplete = complete;
  learn.last[course] = id;
  saveLearn();
  syncUrl();
  render();
  const top = $(".lesson");
  if (top && top.getBoundingClientRect().top < 0) top.scrollIntoView({ block: "start" });
}

function setCourse(id) {
  course = id;
  lessonId = id ? defaultView(id) : null;
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
  const title = !course ? t("chooseCourse")
    : lessonId === OVERVIEW ? `${t("overview")} · ${ROLES[course].title}`
    : lessonId === TASKS ? `${t("practiceTasks")} · ${ROLES[course].title}`
    : lessonId === PREP ? `${t("prepGuide")} · ${ROLES[course].title}`
    : lessonId === PRACTICE ? `${t("scoredPractice")} · ${ROLES[course].title}`
    : lessonId === RESUME ? `${t("resumeBuilder")} · ${ROLES[course].title}`
    : `${L(LESSON_TOPICS[lessonId].title)} · ${ROLES[course].title}`;
  document.title = `${title} | AI Path Finder`;
  bind(app);
  if (typeof LessonReader !== "undefined") {
    const bar = app.querySelector("[data-reader]");
    if (bar) LessonReader.attach(bar, app.querySelector(".lesson"), lang);
    else LessonReader.stop();
  }
  // The scored practice and the resume builder are their own apps, mounted inside the course.
  const iv = app.querySelector("#ivMount");
  if (iv && typeof InterviewApp !== "undefined") InterviewApp.mount(iv, {
    role: course, embedded: true, lang,
    lessonLink: tp => `href="?course=${course}&lesson=${tp}${lang === "hi" ? "&lang=hi" : ""}" data-lesson="${tp}"`
  });
  const rb = app.querySelector("#rbMount");
  if (rb && typeof ResumeBuilder !== "undefined") ResumeBuilder.mount(rb, { role: course, embedded: true, lang });
  // People who ask their device to reduce motion get still diagrams (SMIL dots included).
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) {
    app.querySelectorAll(".viz svg").forEach(s => s.pauseAnimations && s.pauseAnimations());
  }
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
          <span class="course-meta">${list.length} ${esc(t("lessons"))} · ~${courseMinutes(id)} ${esc(t("minutes"))} · ${ROLE_TASKS[id].length} ${esc(t("tasksWord"))} · ${interviewCount(id) + prepQuestions(id).length} ${esc(t("questionsWord"))}</span>
          ${done ? `<span class="course-progress">${meter((done / list.length) * 100)}<span class="small">${done}/${list.length}</span></span>` : ""}
          <span class="course-cta">${esc(done ? t("continueCourse") : t("startCourse"))} →</span>
        </button></li>`;
      }).join("")}
    </ul>
    ${me ? "" : `<p class="small"><a href="./#app">${esc(t("takeQuiz"))} →</a></p>`}`;
}

function outlineItem(id, label, icon, done) {
  return `<li><a href="?course=${course}&lesson=${id}${lang === "hi" ? "&lang=hi" : ""}" data-lesson="${id}" class="ol-lesson${id === lessonId ? " current" : ""}${done ? " done" : ""}"${id === lessonId ? ' aria-current="page"' : ""}>
    <span class="ol-check" aria-hidden="true">${done ? "✓" : ""}</span><span>${icon} ${esc(label)}</span></a></li>`;
}

function courseView() {
  const role = ROLES[course];
  const list = courseLessons(course);
  const doneCount = list.filter(l => isDone(l.id)).length;
  const fast = fastSteps(course);
  const tasksDone = ROLE_TASKS[course].filter(x => learn.tasks.includes(x.id)).length;
  const score = (store.get(LS_INTERVIEW) || {})[course];
  const prepQs = prepQuestions(course);
  const preparedN = prepQs.filter(q => learn.prep.includes(q.id)).length;
  let article;
  if (lessonId === OVERVIEW) article = overviewView();
  else if (lessonId === TASKS) article = tasksView();
  else if (lessonId === PREP) article = prepView();
  else if (lessonId === PRACTICE) article = careerHead("🎤", t("scoredPractice")) + `<div id="ivMount"></div>` + careerNav();
  else if (lessonId === RESUME) article = careerHead("🧰", t("resumeBuilder")) + `<div id="rbMount"></div>` + careerNav();
  else article = lessonView(list, fast);
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
        <div class="ol-step"><ol>${outlineItem(OVERVIEW, t("overview"), "🗺️", doneCount > 0)}</ol></div>
        ${LEARN_TRACKS[course].map(([step, topics]) => `
          <div class="ol-step">
            <p class="ol-step-head"><span class="ol-num">${step === 0 ? "★" : step}</span><span>${esc(stepName(course, step))}</span>${fast.has(step) ? `<span class="badge-fast">${esc(t("youMayKnow"))}</span>` : ""}</p>
            <ol>${topics.map(id => outlineItem(id, L(LESSON_TOPICS[id].title), LESSON_TOPICS[id].icon, isDone(id))).join("")}</ol>
          </div>`).join("")}
        <div class="ol-step">
          <p class="ol-step-head"><span class="ol-num">🏁</span><span>${esc(t("practiceCareer"))}</span></p>
          <ol>
            ${outlineItem(TASKS, `${t("practiceTasks")} (${tasksDone}/${ROLE_TASKS[course].length})`, "🛠️", tasksDone === ROLE_TASKS[course].length)}
            ${prepQs.length ? outlineItem(PREP, `${t("prepGuide")} (${preparedN}/${prepQs.length})`, "📝", preparedN === prepQs.length) : ""}
            ${outlineItem(PRACTICE, `${t("scoredPractice")}${score ? ` · ${score.best}%` : ""}`, "🎤", !!score)}
            ${outlineItem(RESUME, t("resumeBuilder"), "🧰", false)}
          </ol>
        </div>
      </nav>
      <article class="lesson" lang="${lang === "hi" ? "hi-Latn" : "en"}">${article}</article>
    </div>`;
}

function overviewView() {
  const role = ROLES[course];
  const list = courseLessons(course);
  const movers = typeof AUDIENCES !== "undefined" && typeof Scoring !== "undefined"
    ? AUDIENCES.filter(a => Scoring.rankRoles(a.profile).results.slice(0, 3).some(r => r.id === course && r.fit >= 30)) : [];
  return `
    <p class="lesson-meta">${esc(t("overview"))} · ${list.length} ${esc(t("lessons"))} · ~${courseMinutes(course)} ${esc(t("minutes"))}</p>
    <h2 class="lesson-title"><span class="lesson-icon" aria-hidden="true">🗺️</span>${esc(role.title)}: ${esc(role.tagline)}</h2>
    <section class="ls ls-explain"><h3>💼 ${esc(t("whatYouDo"))}</h3><p>${esc(role.why)}</p></section>
    <section class="ls ls-analogy"><h3>🙋 ${esc(t("suitableFor"))}</h3><p>${esc(role.bestFor)}.</p>
      ${movers.length ? `<p class="small" style="margin-top:8px">${esc(t("usuallyMoveIn"))}: ${movers.map(a => `<a href="for/${a.slug}.html">${esc(a.short)}</a>`).join(" · ")}</p>` : ""}
    </section>
    <section class="ls"><h3>🧾 ${esc(t("roleFacts"))}</h3>
      <dl class="market"><dt>${esc(t("jobTitles"))}</dt><dd>${esc(role.titles.join(", "))}</dd>
      <dt>${esc(t("coreSkills"))}</dt><dd>${esc(role.skills.join(", "))}</dd>
      <dt>US</dt><dd>${esc(role.market.pay)}</dd><dt>India</dt><dd>${esc(role.market.payIndia)}</dd></dl>
    </section>
    <section class="ls ls-remember"><h3>🧭 ${esc(t("yourPath"))}</h3>
      <ol class="path-list">
        ${LEARN_TRACKS[course].map(([step, topics]) => `<li><strong>${esc(stepTitle(course, step))}</strong> · ${topics.length} ${esc(t("lessons"))}</li>`).join("")}
        <li><strong>🛠️ ${esc(t("practiceTasks"))}</strong> · ${ROLE_TASKS[course].length} ${esc(t("tasksWord"))}</li>
        ${prepQuestions(course).length ? `<li><strong>📝 ${esc(t("prepGuide"))}</strong> · ${esc(t("prepBlurb", { n: prepQuestions(course).length }))}</li>` : ""}
        <li><strong>🎤 ${esc(t("scoredPractice"))}</strong> · ${interviewCount(course)} ${esc(t("questionsWord"))}, ${esc(t("scoredWithGaps"))}</li>
        <li><strong>🧰 ${esc(t("resumeBuilder"))}</strong> · ${esc(t("resumeBuilderBlurb"))}</li>
      </ol>
    </section>
    <div class="lesson-nav">
      <span></span>
      <button type="button" class="button btn-primary" data-lesson="${list[0].id}">${esc(t("startLearning"))} →</button>
    </div>`;
}

function lessonView(list, fast) {
  const idx = list.findIndex(l => l.id === lessonId);
  const extra = idx < 0;
  const step = extra ? -1 : list[idx].step;
  const x = LESSON_TOPICS[lessonId];
  const visual = typeof LESSON_VISUALS !== "undefined" && LESSON_VISUALS[lessonId];
  const deep = typeof LESSON_DEEP !== "undefined" && LESSON_DEEP[lessonId];
  const chosen = learn.quiz[lessonId];
  const answered = chosen !== undefined && chosen !== null;
  const right = answered && chosen === x.quiz.answer;
  const order = optionOrder(lessonId, x.quiz.options.length);
  const stepTopics = extra ? [] : LEARN_TRACKS[course].find(([s]) => s === step)[1];
  const stepDone = step > 0 && stepTopics.every(isDone);
  const roadmapDone = (() => {
    const raw = (store.get(LS_PROGRESS) || {})[course];
    const doneSteps = Array.isArray(raw) ? raw : (raw && raw.done) || [];
    return doneSteps.includes(step);
  })();
  const isLast = idx === list.length - 1;
  return `
    <p class="lesson-meta">${extra ? `📎 ${esc(t("extraLesson"))}` : `${esc(stepTitle(course, step))} · ${esc(t("lessonOf", { i: idx + 1, n: list.length }))}`} · ⏱ ${x.mins} ${esc(t("readTime"))}${fast.has(step) ? ` <span class="badge-fast">${esc(t("youMayKnow"))}</span>` : ""}</p>
    <h2 class="lesson-title" data-read><span class="lesson-icon" aria-hidden="true">${x.icon}</span>${esc(L(x.title))}</h2>
    ${readerBar()}

    <section class="ls ls-analogy" data-read><h3>🏠 ${esc(t("realLife"))}</h3><p>${esc(L(x.analogy))}</p></section>
    <section class="ls ls-explain" data-read><h3>💡 ${esc(t("simpleWords"))}</h3><p>${esc(L(x.explain))}</p></section>
    ${visual ? `<section class="ls ls-visual"><h3>🎬 ${esc(t("howItWorks"))}</h3><div class="viz">${visual.svg}</div><p class="viz-caption" data-read data-read-prefix="${esc(t("diagram"))}">${esc(L(visual.caption))}</p></section>` : ""}
    ${deep && deep.steps ? `<section class="ls ls-steps"><h3>🪜 ${esc(t("stepByStep"))}</h3><ol class="deep-steps">${deep.steps.map(x => `<li data-read>${esc(L(x))}</li>`).join("")}</ol></section>` : ""}
    <section class="ls ls-terms"><h3>🔑 ${esc(t("keyTerms"))}</h3>
      <dl class="terms">${x.terms.map(([term, en, hi]) => `<div data-read><dt>${esc(term)}</dt><dd>${esc(lang === "hi" ? hi : en)}</dd></div>`).join("")}</dl>
    </section>
    <section class="ls ls-example"><h3>👀 ${esc(t("seeItInAction"))}</h3>
      <div class="code-wrap"><span class="code-lang">${esc(x.example.lang)}</span><button type="button" class="copy-btn" data-act="copy">${esc(t("copy"))}</button><pre><code>${esc(x.example.code)}</code></pre></div>
      <p class="small muted" data-read>${esc(L(x.example.note))}</p>
    </section>
    ${deep && deep.mistakes ? `<section class="ls ls-mistakes"><h3>⚠️ ${esc(t("commonMistakes"))}</h3><ul class="deep-mistakes">${deep.mistakes.map(x => `<li data-read>${esc(L(x))}</li>`).join("")}</ul></section>` : ""}
    <section class="ls ls-quiz"><h3>✅ ${esc(t("quickCheck"))}</h3>
      <p class="quiz-q" data-read data-read-prefix="${esc(t("quickCheck"))}">${esc(L(x.quiz.q))}</p>
      <div class="quiz-opts" role="group" aria-label="${esc(t("quickCheck"))}">
        ${order.map((i, pos) => {
          const o = x.quiz.options[i];
          const cls = !answered ? "" : i === x.quiz.answer ? " right" : i === chosen ? " wrong" : " dim";
          return `<button type="button" class="quiz-opt${cls}" data-opt="${i}" ${answered ? "disabled" : ""} data-read data-read-text="${esc(`${t("option")} ${"ABCD"[pos]}: ${L(o)}`)}"><span class="quiz-letter">${"ABCD"[pos]}</span>${esc(L(o))}</button>`;
        }).join("")}
      </div>
      ${answered ? `<div class="quiz-feedback ${right ? "ok" : "miss"}" role="status"><strong>${esc(right ? t("correct") : t("notQuite"))}</strong> ${esc(L(x.quiz.why))}
        ${right ? "" : `<button type="button" class="link-btn small" data-act="retry">${esc(t("tryAgain"))}</button>`}</div>` : ""}
    </section>
    ${deep && deep.faq ? `<section class="ls ls-faq"><h3>🙋 ${esc(t("peopleAsk"))}</h3>${deep.faq.map(([q, ans]) => `<details class="deep-faq"><summary data-read>${esc(L(q))}</summary><p data-read>${esc(L(ans))}</p></details>`).join("")}</section>` : ""}
    <section class="ls ls-remember" data-read><h3>📌 ${esc(t("remember"))}</h3><p>${esc(L(x.remember))}</p></section>

    ${stepDone && me ? `<div class="callout callout-ok step-callout"><strong>${esc(t("stepComplete", { n: step }))}</strong>
      ${roadmapDone ? `<span>${esc(t("stepMarked", { n: step }))}</span>` : `<button type="button" class="button btn-secondary btn-small" data-act="mark-step" data-step="${step}">${esc(t("markStepOnRoadmap", { n: step }))}</button>`}</div>` : ""}

    ${extra ? `<div class="lesson-nav">
      <button type="button" class="button btn-secondary" data-lesson="${returnTo && validView(course, returnTo) ? returnTo : OVERVIEW}">← ${esc(t("backTo"))}</button>
      <button type="button" class="button btn-primary" data-act="done-extra">${esc(isDone(lessonId) ? t("backTo") : t("markDone"))} ✓</button>
    </div>` : `<div class="lesson-nav">
      <button type="button" class="button btn-secondary" data-act="prev">← ${esc(idx === 0 ? t("overview") : t("prev"))}</button>
      <button type="button" class="button btn-primary" data-act="done">${esc(isDone(lessonId) ? (isLast ? t("practiceTasks") : t("next")) : (isLast ? t("markDoneLast") : t("markDone")))} →</button>
    </div>`}
    <p class="kbd-hint">${esc(t("shortcut"))}</p>`;
}

// "Listen" player bar (tts.js) with labels in the current language.
const readerBar = () => typeof LessonReader === "undefined" ? "" : LessonReader.barHtml({
  listen: t("listen"), pause: t("pause"), resume: t("resumeReading"), stop: t("stop"), speed: t("speed"),
  reading: t("readingAloud"), paused: t("pausedReading"), unsupported: t("ttsUnsupported")
});

function tasksView() {
  const tasks = ROLE_TASKS[course];
  const list = courseLessons(course);
  const lessonLink = id => inAppLessonLink(id);
  return `
    ${showComplete ? `<div class="course-complete compact"><p class="complete-emoji" aria-hidden="true">🎉</p><h2>${esc(t("lessonsComplete"))}</h2><p>${esc(t("lessonsCompleteText"))}</p></div>` : ""}
    <p class="lesson-meta">🏁 ${esc(t("practiceCareer"))}</p>
    <h2 class="lesson-title"><span class="lesson-icon" aria-hidden="true">🛠️</span>${esc(t("practiceTasks"))}</h2>
    <p class="muted">${esc(t("tasksIntro"))}</p>
    ${tasks.map((x, i) => {
      const done = learn.tasks.includes(x.id);
      return `<section class="task-card${done ? " done" : ""}">
        <div class="task-head">
          <span class="task-level lvl-${i}">${esc(t(`level${x.level}`))}</span>
          <span class="small muted">⏱ ${esc(x.hours)} ${esc(t("hours"))}</span>
          ${done ? `<span class="badge-fast">✓ ${esc(t("taskDone"))}</span>` : ""}
        </div>
        <h3>${esc(L(x.title))}</h3>
        <p>${esc(L(x.goal))}</p>
        <details ${i === 0 && !done ? "open" : ""}>
          <summary>${esc(t("showSteps"))}</summary>
          <h4>${esc(t("stepsWord"))}</h4>
          <ol>${x.steps.map(s => `<li>${esc(L(s))}</li>`).join("")}</ol>
          <h4>📦 ${esc(t("deliverable"))}</h4><p>${esc(L(x.deliverable))}</p>
          <h4>✅ ${esc(t("doneWhen"))}</h4><ul class="ticks">${x.doneWhen.map(s => `<li>${esc(L(s))}</li>`).join("")}</ul>
          <h4>📖 ${esc(t("practisesLessons"))}</h4><p class="small">${x.topics.map(lessonLink).join(" · ")}</p>
        </details>
        <button type="button" class="button ${done ? "btn-secondary" : "btn-primary"} btn-small" data-task="${x.id}">${esc(done ? t("markTaskUndone") : t("markTaskDone"))}</button>
      </section>`;
    }).join("")}
    <div class="next-up">
      <h3>${esc(t("whatsNext"))}</h3>
      <div class="next-up-grid">
        ${careerCards()}
      </div>
    </div>
    <div class="lesson-nav"><button type="button" class="button btn-secondary" data-act="prev">← ${esc(t("prev"))}</button><button type="button" class="button btn-primary" data-act="next">${esc(t("prepGuide"))} →</button></div>`;
}

// Links to any lesson open inside this course (lessons from other courses as "extra lessons").
const inAppLessonLink = id => `<a href="?course=${course}&lesson=${id}${lang === "hi" ? "&lang=hi" : ""}" data-lesson="${id}">${LESSON_TOPICS[id].icon} ${esc(L(LESSON_TOPICS[id].title))}</a>`;

const careerCards = () => `
        ${prepQuestions(course).length ? `<a class="next-card" href="?course=${course}&lesson=${PREP}" data-lesson="${PREP}"><span class="next-icon">📝</span><strong>${esc(t("prepGuide"))}</strong><span class="small muted">${esc(t("prepBlurb", { n: prepQuestions(course).length }))}</span></a>` : ""}
        <a class="next-card" href="?course=${course}&lesson=${PRACTICE}" data-lesson="${PRACTICE}"><span class="next-icon">🎤</span><strong>${esc(t("scoredPractice"))}</strong><span class="small muted">${esc(t("interviewBlurb", { n: interviewCount(course) }))}</span></a>
        <a class="next-card" href="?course=${course}&lesson=${RESUME}" data-lesson="${RESUME}"><span class="next-icon">🧰</span><strong>${esc(t("resumeBuilder"))}</strong><span class="small muted">${esc(t("resumeBuilderBlurb"))}</span></a>`;

const careerHead = (icon, title) => `<p class="lesson-meta">🏁 ${esc(t("practiceCareer"))}</p>
    <h2 class="lesson-title"><span class="lesson-icon" aria-hidden="true">${icon}</span>${esc(title)}</h2>`;

function careerNav() {
  const last = lessonId === RESUME;
  return `${last ? `<div class="course-complete compact"><p class="complete-emoji" aria-hidden="true">🏆</p><h2>${esc(t("allDoneTitle"))}</h2><p>${esc(t("allDoneText"))}</p></div>` : ""}
    <div class="lesson-nav"><button type="button" class="button btn-secondary" data-act="prev">← ${esc(t("prev"))}</button>
    ${last ? "<span></span>" : `<button type="button" class="button btn-primary" data-act="next">${esc(t("next"))} →</button>`}</div>`;
}

function prepView() {
  const qs = prepQuestions(course);
  const done = qs.filter(q => learn.prep.includes(q.id)).length;
  const stages = INTERVIEW_PREP.stages.filter(st => qs.some(q => q.stage === st.id));
  let n = 0;
  return `${careerHead("📝", t("prepGuide"))}
    <p>${esc(t("prepIntro"))}</p>
    <section class="ls ls-explain"><h3>🗓️ ${esc(t("roundsTitle"))}</h3>
      <ol class="path-list">${INTERVIEW_PREP.rounds[course].map(r => `<li>${esc(r)}</li>`).join("")}</ol>
      <p class="tiny muted">${esc(t("roundsNote"))}</p></section>
    <div class="prep-bar">
      <div class="course-stats"><span class="small">${esc(t("preparedCount", { done, total: qs.length }))}</span>${meter((done / qs.length) * 100)}</div>
      <label class="small"><input type="checkbox" data-act="only-left" ${prepOnlyLeft ? "checked" : ""}> ${esc(t("onlyLeft"))}</label>
      <button type="button" class="link-btn small" data-act="expand-all">${esc(t("expandAll"))}</button>
    </div>
    <p class="small muted">🎙️ ${esc(t("sayAloud"))}</p>
    ${stages.map(st => {
      const list = qs.filter(q => q.stage === st.id);
      const shown = list.filter(q => !prepOnlyLeft || !learn.prep.includes(q.id));
      const start = n;
      n += list.length;
      return `<section class="prep-stage">
        <h3>${st.icon} ${esc(st.title)}</h3>
        <p class="small muted">${esc(st.blurb)}</p>
        <ol class="prep-list" start="${start + 1}">${shown.map(q => {
          const ok = learn.prep.includes(q.id);
          return `<li class="prep-q${ok ? " prepared" : ""}" id="pq-${q.id}">
            <details><summary><span class="prep-n">${start + list.indexOf(q) + 1}</span><span>${esc(q.q)}</span>${ok ? `<span class="badge-fast">✓</span>` : ""}</summary>
              <div class="prep-body">
                <p class="prep-label">💬 ${esc(t("easyAnswer"))}</p>
                <p lang="en">${esc(q.answer)}</p>
                <p class="prep-label">✅ ${esc(t("strongCovers"))}</p>
                <ul lang="en">${q.points.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
                <p class="prep-check"><strong>${esc(t("theyCheck"))}:</strong> <span lang="en">${esc(q.check)}</span></p>
                ${q.topics.length ? `<p class="small">📖 ${esc(t("learnIt"))}: ${q.topics.map(inAppLessonLink).join(" · ")}</p>` : ""}
                <button type="button" class="button ${ok ? "btn-secondary" : "btn-primary"} btn-small" data-prep="${q.id}">${esc(ok ? t("unmarkPrepared") : t("markPrepared"))}</button>
              </div>
            </details></li>`;
        }).join("")}</ol>
      </section>`;
    }).join("")}
    <div class="lesson-nav"><button type="button" class="button btn-secondary" data-act="prev">← ${esc(t("prev"))}</button>
      <button type="button" class="button btn-primary" data-act="next">${esc(t("scoredPractice"))} →</button></div>`;
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
  app.querySelectorAll('[data-act="prev"]').forEach(b => b.onclick = () => move(-1));
  app.querySelectorAll('[data-act="next"]').forEach(b => b.onclick = () => move(1));
  const doneExtra = app.querySelector('[data-act="done-extra"]');
  if (doneExtra) doneExtra.onclick = () => {
    if (!isDone(lessonId)) { learn.done.push(lessonId); saveLearn(); }
    openLesson(returnTo && validView(course, returnTo) ? returnTo : OVERVIEW);
  };
  app.querySelectorAll("[data-prep]").forEach(b => b.onclick = () => {
    const id = b.dataset.prep;
    learn.prep = learn.prep.includes(id) ? learn.prep.filter(x => x !== id) : learn.prep.concat(id);
    saveLearn();
    const y = window.scrollY;
    render();
    window.scrollTo(0, y);
    const li = document.getElementById(`pq-${id}`);
    if (li && !learn.prep.includes(id)) li.querySelector("details").open = true;
  });
  const onlyLeft = app.querySelector('[data-act="only-left"]');
  if (onlyLeft) onlyLeft.onchange = () => { prepOnlyLeft = onlyLeft.checked; render(); };
  const expand = app.querySelector('[data-act="expand-all"]');
  if (expand) expand.onclick = () => {
    const all = [...app.querySelectorAll(".prep-q details")];
    const open = all.some(d => !d.open);
    all.forEach(d => { d.open = open; });
    expand.textContent = open ? t("collapseAll") : t("expandAll");
  };
  const done = app.querySelector('[data-act="done"]');
  if (done) done.onclick = () => {
    if (!isDone(lessonId)) { learn.done.push(lessonId); saveLearn(); }
    move(1);
  };
  app.querySelectorAll("[data-task]").forEach(b => b.onclick = () => {
    const id = b.dataset.task;
    learn.tasks = learn.tasks.includes(id) ? learn.tasks.filter(x => x !== id) : learn.tasks.concat(id);
    saveLearn();
    render();
  });
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

// The course is one sequence: overview → lessons → practice tasks → interview prep → scored
// practice → resume builder. Arriving at the tasks from the last lesson shows a short celebration.
function move(delta) {
  const seq = [OVERVIEW, ...courseLessons(course).map(l => l.id), TASKS, ...(prepQuestions(course).length ? [PREP] : []), PRACTICE, RESUME];
  const at = seq.indexOf(lessonId);
  if (at < 0) return; // extra lessons have their own Back button
  const next = at + delta;
  if (next < 0 || next >= seq.length) return;
  const finishing = seq[next] === TASKS && delta > 0 && courseLessons(course).every(l => isDone(l.id));
  openLesson(seq[next], finishing);
}

document.addEventListener("keydown", e => {
  if (!course || e.altKey || e.ctrlKey || e.metaKey) return;
  if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) return;
  if (lessonId === PRACTICE || lessonId === RESUME) return; // those apps have their own steps
  if (e.key === "ArrowRight") move(1);
  else if (e.key === "ArrowLeft") move(-1);
});

// Links to lessons and course views, including ones rendered by the embedded apps.
$("#learnApp").addEventListener("click", e => {
  const a = e.target.closest("[data-lesson]");
  if (!a || !course) return;
  e.preventDefault();
  openLesson(a.dataset.lesson);
});

syncUrl();
render();
