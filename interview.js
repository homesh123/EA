// Interview practice: role-specific questions from content/interview.js.
// Multiple-choice questions are scored automatically, with instant feedback. Open questions are
// self-checked: write an answer, compare it with a model answer and tick the key points covered.
// The report scores each skill area, explains every mistake and links the lessons that close the gaps.
// InterviewApp.mount(el, { role, embedded, lessonLink }) renders it anywhere: interview.html mounts it
// on #interviewApp; the Learn section mounts it inside a course (embedded: no role switching, lesson
// links open inside the course).
var InterviewApp = (function () {
const LS_SESSION = "aipf:interview-session";
const LS_RESULTS = "aipf:interview";
const LS_LANG = "aipf:lang";

const store = {
  get(key) { try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; } },
  set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* private mode */ } },
  del(key) { try { localStorage.removeItem(key); } catch (e) { /* ignore */ } }
};
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
let lang = "en";

// Interface text. Questions stay in English, because that's the language of these interviews.
const UI_ALL = {
  en: {
    pick: "Choose a role to practise", pickIntro: "Each set mixes multiple-choice questions (scored automatically) with open questions you self-check against a model answer. At the end you get a score, every mistake explained, and the exact lessons to revise.",
    questions: "questions", mcqs: "multiple-choice", opens: "open-ended", minutes: "min", start: "Start practice", resume: "Resume where you left off", best: "Best score", last: "Last score",
    how: "How it works", how1: "Answer each question as you would in a real interview. Multiple-choice answers get instant feedback.", how2: "For open questions, write (or say) your answer first, then reveal the model answer and tick the points you covered. Be honest: it's practice.", how3: "Your report shows your score per skill area, explains each mistake and links the lessons that fix each gap.",
    q: "Question", of: "of", area: "Area", correct: "Correct", wrong: "Not quite", why: "Why", learn: "Learn", next: "Next question", finish: "See my report",
    yourAnswer: "Your answer", placeholder: "Type your answer as you'd say it in the interview…", check: "Check my answer", skip: "Skip", model: "Model answer",
    tickPoints: "Tick each key point your answer covered:", covered: "covered",
    report: "Your interview report", overall: "Overall score", byArea: "Score by skill area", focus: "Where to focus", focusNone: "No weak areas. Great work! Keep practising the open questions out loud.",
    missedIn: "You missed", studyThese: "Study these lessons", mistakes: "Your mistakes, explained", you: "You answered", right: "Correct answer", missedPoints: "Points you missed",
    strengths: "Your strengths", more: "More questions to prepare", retake: "Retake all questions", retryWrong: "Retry only what I missed", toCourse: "Go to the course", toResume: "Build your resume",
    verdictReady: "Interview-ready ✓", verdictAlmost: "Almost there", verdictPractise: "Keep practising",
    verdictReadyText: "You answered most questions well. Practise saying the open answers out loud, with your own project numbers.",
    verdictAlmostText: "Good base. Close the gaps below and you'll be ready.",
    verdictPractiseText: "Work through the lessons for your weak areas below, then retake. Most people improve a lot on the second attempt.",
    switchRole: "Switch role", honest: "Self-checked answers count fractionally: 3 of 5 points covered = 0.6 of a question."
  },
  hi: {
    pick: "Practice ke liye role chuno", pickIntro: "Har set mein multiple-choice sawaal (apne aap score hote hain) aur open sawaal hote hain jinhe aap model answer se khud check karte ho. Aakhir mein score milta hai, har galti samjhaayi jaati hai, aur revise karne ke exact lessons milte hain.",
    questions: "sawaal", mcqs: "multiple-choice", opens: "open-ended", minutes: "min", start: "Practice shuru karo", resume: "Jahan chhoda tha wahin se shuru karo", best: "Best score", last: "Pichhla score",
    how: "Kaise kaam karta hai", how1: "Har sawaal ka jawaab waise do jaise asli interview mein dete. Multiple-choice pe turant feedback milta hai.", how2: "Open sawaalon mein pehle apna jawaab likho (ya bolo), phir model answer dekho aur jo points cover kiye unhe tick karo. Imaandaari se: yeh practice hai.", how3: "Report mein har skill area ka score, har galti ka explanation, aur har gap ke liye lessons milte hain.",
    q: "Sawaal", of: "/", area: "Area", correct: "Sahi", wrong: "Thoda galat", why: "Kyun", learn: "Seekho", next: "Agla sawaal", finish: "Meri report dekho",
    yourAnswer: "Aapka jawaab", placeholder: "Jawaab waise likho jaise interview mein bologe…", check: "Mera jawaab check karo", skip: "Skip", model: "Model answer",
    tickPoints: "Jo key points aapke jawaab mein the, unhe tick karo:", covered: "cover kiye",
    report: "Aapki interview report", overall: "Overall score", byArea: "Skill area ke hisaab se score", focus: "Kahan focus karna hai", focusNone: "Koi weak area nahi. Bahut badhiya! Open sawaalon ko bolkar practice karte raho.",
    missedIn: "Aapse chhoote", studyThese: "Yeh lessons padho", mistakes: "Aapki galtiyaan, samjhaayi hui", you: "Aapka jawaab", right: "Sahi jawaab", missedPoints: "Chhoote hue points",
    strengths: "Aapki strengths", more: "Taiyaari ke liye aur sawaal", retake: "Saare sawaal dobara", retryWrong: "Sirf galat wale dobara", toCourse: "Course pe jao", toResume: "Apna resume banao",
    verdictReady: "Interview-ready ✓", verdictAlmost: "Bas thoda aur", verdictPractise: "Practice jaari rakho",
    verdictReadyText: "Aapne zyaadatar sawaal acche se kiye. Open answers ko apne project numbers ke saath bolkar practice karo.",
    verdictAlmostText: "Acchi shuruaat. Neeche ke gaps band karo aur aap ready ho.",
    verdictPractiseText: "Neeche weak areas ke lessons padho, phir dobara do. Doosri baar mein zyaadatar log kaafi behtar karte hain.",
    switchRole: "Role badlo", honest: "Self-check wale jawaab hisse mein count hote hain: 5 mein se 3 points = 0.6 sawaal."
  }
};
let UI = UI_ALL.en;

const ROLE_IDS = Object.keys(ROLES);
let role = null;
let root = null; // element the app renders into
let embedded = false;
let customLessonLink = null; // (topic) => attributes string for an <a>, when embedded
// Questions in the chosen language: content/interview-hi.js overlays the English (same option order).
const HI = () => lang === "hi" && typeof INTERVIEW_HI !== "undefined" ? INTERVIEW_HI : null;
const localise = q => {
  const h = HI() && HI().questions[q.id];
  return h ? Object.assign({}, q, h, { area: HI().areas[q.area] || q.area }) : q;
};
const roleQuestions = r => INTERVIEW.questions.filter(q => q.roles.includes(r)).map(localise);
const results = () => store.get(LS_RESULTS) || {};
const defaultLessonHref = (r, topic) => LEARN_TRACKS[r].some(([, ids]) => ids.includes(topic))
  ? `learn.html?course=${r}&lesson=${topic}${lang === "hi" ? "&lang=hi" : ""}`
  : `learn/${lang === "hi" ? "hi/" : ""}${topic}.html`;
const lessonAttrs = topic => customLessonLink ? customLessonLink(topic) : `href="${defaultLessonHref(role, topic)}"`;
const lessonName = topic => LESSON_TOPICS[topic].title[lang === "hi" ? 1 : 0];
const minutesFor = qs => Math.round(qs.reduce((m, q) => m + (q.type === "mcq" ? 1 : 4), 0));

// A session: question order, answers and position. Kept in localStorage so a refresh resumes it.
let session = null;
const loadSession = () => {
  const s = store.get(LS_SESSION);
  session = s && s.role === role ? s : null;
};

function newSession(onlyIds) {
  const prev = results()[role];
  const attempt = ((prev && prev.attempts) || 0) + 1;
  let qs = roleQuestions(role);
  if (onlyIds) qs = qs.filter(q => onlyIds.includes(q.id));
  const mcqs = qs.filter(q => q.type === "mcq");
  const opens = qs.filter(q => q.type === "open");
  const order = optionOrder(`${role}:${attempt}`, mcqs.length).map(i => mcqs[i].id).concat(opens.map(q => q.id));
  session = { role, attempt, order, idx: 0, answers: {}, phase: "question", partial: !!onlyIds };
  store.set(LS_SESSION, session);
}
const saveSession = () => store.set(LS_SESSION, session);
const qById = id => localise(INTERVIEW.questions.find(q => q.id === id));

// ---------- scoring ----------
function scoreOf(q, a) {
  if (!a) return 0;
  if (q.type === "mcq") return a.choice === q.answer ? 1 : 0;
  return a.revealed ? (a.ticked || []).length / q.points.length : 0;
}

function buildReport() {
  const qs = session.order.map(qById);
  const areas = {};
  qs.forEach(q => {
    const s = scoreOf(q, session.answers[q.id]);
    const a = areas[q.area] || (areas[q.area] = { got: 0, total: 0, missed: [] });
    a.got += s;
    a.total += 1;
    if (s < 1) a.missed.push(q);
  });
  const got = Object.values(areas).reduce((s, a) => s + a.got, 0);
  const pct = Math.round((100 * got) / qs.length);
  return { qs, areas, pct };
}

// ---------- views ----------
function render() {
  const app = root;
  if (!role) app.innerHTML = pickView();
  else if (!session || session.phase === "intro") app.innerHTML = introView();
  else if (session.phase === "report") app.innerHTML = reportView();
  else app.innerHTML = questionView();
  if (!embedded) document.title = `${role ? `${ROLES[role].title} interview practice` : "AI interview practice"} | AI Path Finder`;
  bind(app);
}

function pickView() {
  const res = results();
  return `<div class="learn-bar"><div><h2>${esc(UI.pick)}</h2><p class="muted">${esc(UI.pickIntro)}</p></div></div>
    <ul class="course-grid">${ROLE_IDS.map(r => {
      const qs = roleQuestions(r);
      return `<li><a class="course-card" href="?role=${r}">
        <span class="course-title">${esc(ROLES[r].title)}</span>
        <span class="course-tag">${esc(ROLES[r].tagline)}</span>
        <span class="course-meta">${qs.length} ${esc(UI.questions)} · ~${minutesFor(qs)} ${esc(UI.minutes)}</span>
        ${res[r] ? `<span class="small">${esc(UI.best)}: <strong>${res[r].best}%</strong></span>` : ""}
        <span class="course-cta">${esc(UI.start)} →</span></a></li>`;
    }).join("")}</ul>`;
}

function introView() {
  const qs = roleQuestions(role);
  const res = results()[role];
  const inProgress = store.get(LS_SESSION);
  const canResume = inProgress && inProgress.role === role && inProgress.phase === "question" && inProgress.idx > 0;
  return `<div class="learn-bar"><div><p class="eyebrow">🎤 Interview practice</p><h2>${esc(ROLES[role].title)}</h2>
      <p class="muted">${qs.length} ${esc(UI.questions)} (${qs.filter(q => q.type === "mcq").length} ${esc(UI.mcqs)} · ${qs.filter(q => q.type === "open").length} ${esc(UI.opens)}) · ~${minutesFor(qs)} ${esc(UI.minutes)}</p></div>
      ${switchLink()}</div>
    <div class="${box()}">
      ${res ? `<div class="score-strip"><span>${esc(UI.best)}: <strong>${res.best}%</strong></span><span>${esc(UI.last)}: <strong>${res.last}%</strong></span></div>` : ""}
      <h3>${esc(UI.how)}</h3>
      <ol class="path-list"><li>${esc(UI.how1)}</li><li>${esc(UI.how2)}</li><li>${esc(UI.how3)}</li></ol>
      <div class="lesson-nav">
        ${canResume ? `<button type="button" class="button btn-secondary" data-act="resume">${esc(UI.resume)}</button>` : "<span></span>"}
        <button type="button" class="button btn-primary" data-act="start">${esc(UI.start)} →</button>
      </div>
    </div>`;
}

function progressBar() {
  const done = session.idx;
  return `<div class="iv-progress"><span class="small">${esc(UI.q)} ${session.idx + 1} ${esc(UI.of)} ${session.order.length}</span>
    <span class="meter progress" aria-hidden="true"><span style="width:${Math.max(3, (100 * done) / session.order.length)}%"></span></span></div>`;
}

function questionView() {
  const q = qById(session.order[session.idx]);
  const a = session.answers[q.id] || {};
  const last = session.idx === session.order.length - 1;
  const learnLinks = q.topics.map(tp => `<a ${lessonAttrs(tp)}${embedded ? "" : ' target="_blank" rel="noopener"'}>${LESSON_TOPICS[tp].icon} ${esc(lessonName(tp))}</a>`).join(" · ");
  let body;
  if (q.type === "mcq") {
    const order = optionOrder(`${q.id}:${session.attempt}`, q.options.length);
    const answered = a.choice !== undefined;
    body = `<div class="quiz-opts">${order.map((i, pos) => {
        const cls = !answered ? "" : i === q.answer ? " right" : i === a.choice ? " wrong" : " dim";
        return `<button type="button" class="quiz-opt${cls}" data-choice="${i}" ${answered ? "disabled" : ""}><span class="quiz-letter">${"ABCD"[pos]}</span>${esc(q.options[i])}</button>`;
      }).join("")}</div>
      ${answered ? `<div class="quiz-feedback ${a.choice === q.answer ? "ok" : "miss"}" role="status"><strong>${esc(a.choice === q.answer ? UI.correct : UI.wrong)}.</strong> ${esc(q.why)}<p class="small" style="margin:6px 0 0">📖 ${esc(UI.learn)}: ${learnLinks}</p></div>` : ""}`;
  } else {
    body = `<label class="small" for="ans"><strong>${esc(UI.yourAnswer)}</strong></label>
      <textarea id="ans" class="iv-text" rows="6" placeholder="${esc(UI.placeholder)}" ${a.revealed ? "readonly" : ""}>${esc(a.text || "")}</textarea>
      ${a.revealed ? `
        <div class="iv-check"><p><strong>${esc(UI.tickPoints)}</strong></p>
          ${q.points.map((p, i) => `<label class="iv-point"><input type="checkbox" data-point="${i}" ${(a.ticked || []).includes(i) ? "checked" : ""}> ${esc(p)}</label>`).join("")}
          <p class="small muted">${(a.ticked || []).length} / ${q.points.length} ${esc(UI.covered)}</p>
        </div>
        <details class="iv-model" open><summary>${esc(UI.model)}</summary><p>${esc(q.model)}</p></details>
        <p class="small">📖 ${esc(UI.learn)}: ${learnLinks}</p>`
      : `<div class="lesson-nav" style="margin-top:10px"><button type="button" class="button btn-secondary btn-small" data-act="skip">${esc(UI.skip)}</button><button type="button" class="button btn-primary btn-small" data-act="reveal">${esc(UI.check)}</button></div>`}`;
  }
  const answered = q.type === "mcq" ? a.choice !== undefined : a.revealed;
  return `<div class="learn-bar"><div><p class="eyebrow">🎤 ${esc(ROLES[role].title)}</p>${progressBar()}</div></div>
    <article class="${box()} iv-q">
      <p class="lesson-meta">${esc(UI.area)}: ${esc(q.area)} · ${q.type === "mcq" ? esc(UI.mcqs) : esc(UI.opens)}</p>
      <h2 class="lesson-title">${esc(q.q)}</h2>
      ${body}
      <div class="lesson-nav"><span></span>
        <button type="button" class="button btn-primary" data-act="next" ${answered ? "" : "disabled"}>${esc(last ? UI.finish : UI.next)} →</button></div>
    </article>`;
}

function reportView() {
  const { qs, areas, pct } = buildReport();
  const verdict = pct >= 80 ? ["ok", UI.verdictReady, UI.verdictReadyText] : pct >= 60 ? ["warn", UI.verdictAlmost, UI.verdictAlmostText] : ["miss", UI.verdictPractise, UI.verdictPractiseText];
  const areaRows = Object.entries(areas).map(([name, a]) => ({ name, pct: Math.round((100 * a.got) / a.total), a })).sort((x, y) => x.pct - y.pct);
  const gaps = areaRows.filter(r => r.pct < 70);
  const strong = areaRows.filter(r => r.pct >= 80);
  const wrongMcq = qs.filter(q => q.type === "mcq" && scoreOf(q, session.answers[q.id]) < 1);
  const weakOpen = qs.filter(q => q.type === "open" && scoreOf(q, session.answers[q.id]) < 1);
  const missedIds = wrongMcq.concat(weakOpen).map(q => q.id);
  const topicsOf = list => [...new Set(list.flatMap(q => q.topics))];
  return `<div class="learn-bar"><div><p class="eyebrow">🎤 ${esc(ROLES[role].title)}</p><h2>${esc(UI.report)}</h2></div>
      ${switchLink()}</div>
    <article class="${box()}">
      <div class="iv-score ${verdict[0]}">
        <div class="iv-ring" style="--p:${pct}"><span>${pct}%</span></div>
        <div><p class="eyebrow">${esc(UI.overall)}</p><h3>${esc(verdict[1])}</h3><p>${esc(verdict[2])}</p><p class="tiny muted">${esc(UI.honest)}</p></div>
      </div>

      <h3>${esc(UI.byArea)}</h3>
      <ul class="iv-areas">${areaRows.map(r => `<li><span>${esc(r.name)}</span><span class="meter ${r.pct < 70 ? "have" : "progress"}" aria-hidden="true"><span style="width:${Math.max(3, r.pct)}%"></span></span><strong>${r.pct}%</strong></li>`).join("")}</ul>

      <h3>🎯 ${esc(UI.focus)}</h3>
      ${gaps.length ? gaps.map(g => `<div class="gap-card-iv">
          <p><strong>${esc(g.name)}</strong> · ${g.pct}%</p>
          <p class="small">${esc(UI.missedIn)}: ${g.a.missed.map(q => `“${esc(q.q)}”`).join("; ")}</p>
          <p class="small"><strong>📖 ${esc(UI.studyThese)}:</strong> ${topicsOf(g.a.missed).map(tp => `<a ${lessonAttrs(tp)}>${LESSON_TOPICS[tp].icon} ${esc(lessonName(tp))}</a>`).join(" · ")}</p>
        </div>`).join("") : `<p class="ok-text">${esc(UI.focusNone)}</p>`}

      ${strong.length ? `<h3>💪 ${esc(UI.strengths)}</h3><p>${strong.map(r => `<span class="chip chip-key">${esc(r.name)} · ${r.pct}%</span>`).join(" ")}</p>` : ""}

      ${wrongMcq.length || weakOpen.length ? `<h3>🔍 ${esc(UI.mistakes)}</h3>
        ${wrongMcq.map(q => {
          const a = session.answers[q.id];
          return `<div class="mistake">
            <p class="quiz-q">${esc(q.q)}</p>
            <p class="small"><span class="tag-wrong">${esc(UI.you)}</span> ${esc(q.options[a.choice])}</p>
            <p class="small"><span class="tag-right">${esc(UI.right)}</span> ${esc(q.options[q.answer])}</p>
            <p class="small muted"><strong>${esc(UI.why)}:</strong> ${esc(q.why)}</p>
            <p class="small">📖 ${q.topics.map(tp => `<a ${lessonAttrs(tp)}>${esc(lessonName(tp))}</a>`).join(" · ")}</p>
          </div>`;
        }).join("")}
        ${weakOpen.map(q => {
          const a = session.answers[q.id] || {};
          const missed = q.points.filter((_, i) => !(a.ticked || []).includes(i));
          return `<div class="mistake">
            <p class="quiz-q">${esc(q.q)}</p>
            <p class="small"><strong>${esc(UI.missedPoints)}:</strong></p><ul class="small">${missed.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
            <details class="iv-model"><summary>${esc(UI.model)}</summary><p>${esc(q.model)}</p></details>
          </div>`;
        }).join("")}` : ""}

      <h3>📝 ${esc(UI.more)}</h3>
      <ul>${((HI() && HI().extra[role]) || INTERVIEW.extra[role] || []).map(x => `<li>${esc(x)}</li>`).join("")}</ul>

      <div class="lesson-nav">
        ${missedIds.length ? `<button type="button" class="button btn-secondary" data-act="retry-wrong" data-ids="${missedIds.join(",")}">${esc(UI.retryWrong)} (${missedIds.length})</button>` : "<span></span>"}
        <button type="button" class="button btn-primary" data-act="retake">${esc(UI.retake)}</button>
      </div>
      ${embedded ? "" : `<p class="small" style="text-align:center"><a href="learn.html?course=${role}">${esc(UI.toCourse)}</a> · <a href="resume-builder.html?role=${role}">${esc(UI.toResume)}</a></p>`}
    </article>`;
}

const box = () => embedded ? "iv-box" : "lesson";
const switchLink = () => embedded ? "" : `<a class="link-btn small" href="interview.html">${esc(UI.switchRole)}</a>`;
function toTop() {
  if (!embedded) { window.scrollTo({ top: 0 }); return; }
  const r = root.getBoundingClientRect();
  if (r.top < 0) root.scrollIntoView({ block: "start" });
}

// ---------- events ----------
function bind(app) {
  const on = (sel, fn) => app.querySelectorAll(sel).forEach(el => el.addEventListener("click", fn));
  on('[data-act="start"]', () => { newSession(); render(); toTop(); });
  on('[data-act="resume"]', () => { session = store.get(LS_SESSION); render(); });
  on('[data-act="retake"]', () => { newSession(); render(); toTop(); });
  on('[data-act="retry-wrong"]', e => { newSession(e.currentTarget.dataset.ids.split(",")); render(); toTop(); });
  on("[data-choice]", e => {
    const q = qById(session.order[session.idx]);
    session.answers[q.id] = { choice: Number(e.currentTarget.dataset.choice) };
    saveSession();
    render();
  });
  const ta = app.querySelector("#ans");
  if (ta && !ta.readOnly) ta.addEventListener("input", () => {
    const q = qById(session.order[session.idx]);
    session.answers[q.id] = Object.assign(session.answers[q.id] || {}, { text: ta.value });
    saveSession();
  });
  on('[data-act="reveal"]', () => {
    const q = qById(session.order[session.idx]);
    session.answers[q.id] = Object.assign(session.answers[q.id] || {}, { revealed: true, ticked: [] });
    saveSession();
    render();
  });
  on('[data-act="skip"]', () => {
    const q = qById(session.order[session.idx]);
    session.answers[q.id] = { revealed: true, ticked: [], skipped: true };
    saveSession();
    render();
  });
  app.querySelectorAll("[data-point]").forEach(cb => cb.addEventListener("change", () => {
    const q = qById(session.order[session.idx]);
    const a = session.answers[q.id];
    const i = Number(cb.dataset.point);
    a.ticked = cb.checked ? [...new Set([...(a.ticked || []), i])] : (a.ticked || []).filter(x => x !== i);
    saveSession();
    render();
  }));
  on('[data-act="next"]', () => {
    if (session.idx < session.order.length - 1) { session.idx++; saveSession(); render(); toTop(); return; }
    session.phase = "report";
    saveSession();
    if (!session.partial) {
      const { pct } = buildReport();
      const all = results();
      const prev = all[role] || { best: 0, attempts: 0 };
      all[role] = { best: Math.max(prev.best, pct), last: pct, attempts: (prev.attempts || 0) + 1, date: new Date().toISOString().slice(0, 10) };
      store.set(LS_RESULTS, all);
    }
    render();
    toTop();
  });
}

function mount(el, opts = {}) {
  root = el;
  embedded = !!opts.embedded;
  customLessonLink = opts.lessonLink || null;
  lang = opts.lang || (store.get(LS_LANG) === "hi" ? "hi" : "en");
  UI = UI_ALL[lang];
  role = ROLE_IDS.includes(opts.role) ? opts.role : null;
  loadSession();
  render();
}

return { mount };
})();

if (typeof document !== "undefined" && document.getElementById("interviewApp")) {
  const r = new URLSearchParams(location.search).get("role");
  const el = document.getElementById("interviewApp");
  InterviewApp.mount(el, { role: r });
  // Page language switch (English / Hinglish), shared with the rest of the site.
  const paint = l => document.querySelectorAll("[data-site-lang]").forEach(b => { b.classList.toggle("active", b.dataset.siteLang === l); b.setAttribute("aria-pressed", b.dataset.siteLang === l); });
  let cur = (() => { try { return JSON.parse(localStorage.getItem("aipf:lang")) === "hi" ? "hi" : "en"; } catch (e) { return "en"; } })();
  paint(cur);
  document.querySelectorAll("[data-site-lang]").forEach(b => b.addEventListener("click", () => {
    cur = b.dataset.siteLang;
    try { localStorage.setItem("aipf:lang", JSON.stringify(cur)); } catch (e) { /* private mode */ }
    paint(cur);
    InterviewApp.mount(el, { role: new URLSearchParams(location.search).get("role"), lang: cur });
  }));
}
