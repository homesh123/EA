// UI for the questionnaire and results. Data lives in questions.js / roles.js,
// all recommendation logic in scoring.js.
const STORE_KEY = "aipf:v2";
const PROGRESS_KEY = "aipf:progress";
const AUTO_ADVANCE_MS = 280;

const STAY_UPDATED = [
  { title: "YouTube", items: [
    ["3Blue1Brown", "https://www.youtube.com/@3blue1brown", "Maths, visually"],
    ["Andrej Karpathy", "https://www.youtube.com/@AndrejKarpathy", "Deep learning from scratch"],
    ["StatQuest", "https://www.youtube.com/@statquest", "Statistics & ML, simply"],
    ["Hugging Face", "https://www.youtube.com/@HuggingFace", "Open models & LLMs"]
  ]},
  { title: "GitHub repos", items: [
    ["huggingface/transformers", "https://github.com/huggingface/transformers", "Open models"],
    ["langchain-ai/langgraph", "https://github.com/langchain-ai/langgraph", "Agents"],
    ["pytorch/pytorch", "https://github.com/pytorch/pytorch", "Deep learning"],
    ["modelcontextprotocol", "https://github.com/modelcontextprotocol", "Tools for AI agents"]
  ]},
  { title: "Free courses", items: [
    ["DeepLearning.AI short courses", "https://www.deeplearning.ai/short-courses/", "1–2 hour hands-on courses"],
    ["fast.ai", "https://course.fast.ai/", "Practical deep learning"],
    ["Google ML Crash Course", "https://developers.google.com/machine-learning/crash-course", "ML fundamentals"],
    ["Hugging Face Learn", "https://huggingface.co/learn", "LLMs, agents, fine-tuning"]
  ]},
  { title: "Communities", items: [
    ["r/MachineLearning", "https://www.reddit.com/r/MachineLearning/", "Research & industry"],
    ["r/LocalLLaMA", "https://www.reddit.com/r/LocalLLaMA/", "Open models"],
    ["Hugging Face Discord", "https://huggingface.co/join/discord", "Builders' community"],
    ["DataTalksClub", "https://datatalks.club/", "Free zoomcamps & Slack"]
  ]}
];

const MOTIVATION_MSG = {
  outdated: "Good news: your experience is not wasted. This plan builds on what you already know, so you are upgrading your career, not starting over.",
  growth: "AI roles are among the fastest-growing and best-paid in tech. This plan focuses on the skills employers are hiring for now.",
  company: "Your company adopting AI is your best opportunity. Volunteer for the first AI project while you follow this plan — an internal move is often the fastest switch.",
  curious: "Curiosity is the best fuel for learning AI. Build small things often and share them — that turns interest into a career.",
  unhappy: "A sideways move inside AI is much faster than a fresh start. Your AI experience carries straight over to the roles below."
};

// ---------- state ----------
const storage = {
  get(key) { try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; } },
  set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* private mode */ } }
};
const freshState = () => ({ view: "intro", answers: {}, qid: null, roleId: null });
let state = Object.assign(freshState(), storage.get(STORE_KEY) || {});
let advanceTimer = null;
const save = () => storage.set(STORE_KEY, state);

const visibleQuestions = () => QUESTIONS.filter(q => !q.showIf || q.showIf(state.answers));
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const $ = sel => document.querySelector(sel);
const hasAnswer = q => {
  const v = state.answers[q.id];
  return q.multi ? Array.isArray(v) && v.length > 0 : v !== undefined && v !== "";
};

function go(view, extra = {}) {
  clearTimeout(advanceTimer);
  Object.assign(state, { view }, extra);
  save();
  render();
  const card = $("#app");
  if (card.getBoundingClientRect().top < 0) card.scrollIntoView({ behavior: "smooth", block: "start" });
}

function render() {
  const app = $("#app");
  app.className = "card view-" + state.view;
  document.body.dataset.view = state.view;
  $("#progressWrap").hidden = state.view !== "question";
  if (state.view === "question") renderQuestion(app);
  else if (state.view === "review") renderReview(app);
  else if (state.view === "result") renderResult(app);
  else renderIntro(app);
}

// ---------- intro ----------
function renderIntro(app) {
  const qs = visibleQuestions();
  const answered = qs.filter(hasAnswer).length;
  const resume = answered > 0;
  app.innerHTML = `
    <div class="intro">
      <h2>Not sure which AI role fits you?</h2>
      <p class="lead">Answer about 20 short questions about your background, skills, how you like to work and your goals. We'll match you to the AI roles that fit, show why, and give you a step-by-step plan based on your hours per week.</p>
      <ul class="intro-points">
        <li><strong>9 AI career paths</strong> compared: engineering, data, infrastructure, research, client-facing and product roles</li>
        <li><strong>Builds on your experience</strong>: shows which of your current skills carry over, so you don't start from zero</li>
        <li><strong>Checks your answers</strong>: 4 quick reasoning questions to double-check your self-ratings</li>
        <li><strong>A realistic timeline</strong>: steps you already know are shortened, and the plan fits the hours you have</li>
      </ul>
      <p class="fine">About 4 minutes · No sign-up · Your answers stay in your browser</p>
      <div class="nav nav-start">
        ${resume ? `<button class="button btn-secondary" data-act="restart">Start over</button>` : ""}
        <button class="button btn-primary" data-act="start">${resume ? `Continue (${answered}/${qs.length} answered)` : "Start the questionnaire"}</button>
      </div>
    </div>`;
  app.querySelector('[data-act="start"]').onclick = () => {
    const next = qs.find(q => !hasAnswer(q));
    if (!next) return go("result");
    go("question", { qid: next.id });
  };
  const r = app.querySelector('[data-act="restart"]');
  if (r) r.onclick = restart;
}

function restart() {
  if (!confirm("Clear your answers and start over?")) return;
  state = freshState();
  go("question", { qid: QUESTIONS[0].id });
}

// ---------- questions ----------
function renderQuestion(app) {
  const qs = visibleQuestions();
  let idx = qs.findIndex(q => q.id === state.qid);
  if (idx < 0) idx = 0;
  const q = qs[idx];
  state.qid = q.id;
  const val = state.answers[q.id];
  const selected = q.multi ? new Set(Array.isArray(val) ? val : []) : null;
  const isLast = idx === qs.length - 1;
  const firstQuiz = q.quiz && !qs[idx - 1]?.quiz;

  $("#progressFill").style.width = Math.round((idx / qs.length) * 100) + "%";
  $("#progressLabel").textContent = `${SECTIONS[q.section]} · Question ${idx + 1} of ${qs.length}`;

  app.innerHTML = `
    ${firstQuiz ? `<div class="callout"><strong>Quick reasoning check — 4 questions.</strong> These help us check your self-ratings, which makes the recommendation more accurate. There's no penalty for skipping.</div>` : ""}
    <h2 class="question" id="qTitle" tabindex="-1">${esc(q.q)}</h2>
    ${q.clarify ? `<p class="clarify">${esc(q.clarify)}</p>` : ""}
    ${q.multi ? `<p class="multi-hint">Select all that apply</p>` : ""}
    <div class="options${q.options.length > 6 ? " options-grid" : ""}" role="${q.multi ? "group" : "radiogroup"}" aria-labelledby="qTitle">
      ${q.options.map((o, i) => {
        const on = q.multi ? selected.has(o.value) : val === o.value;
        return `<button type="button" class="option${on ? " selected" : ""}" role="${q.multi ? "checkbox" : "radio"}" aria-checked="${on}" data-value="${esc(o.value)}">
          <span class="${q.multi ? "box" : "dot"}" aria-hidden="true"></span>
          <span class="opt-body"><span class="opt-text">${esc(o.label)}</span>${o.desc ? `<span class="opt-desc">${esc(o.desc)}</span>` : ""}</span>
          ${i < 9 ? `<kbd class="opt-key" aria-hidden="true">${i + 1}</kbd>` : ""}
        </button>`;
      }).join("")}
    </div>
    <div class="nav">
      <button type="button" class="button btn-secondary" data-act="back">${idx === 0 ? "Home" : "Back"}</button>
      <button type="button" class="button btn-primary" data-act="next" ${hasAnswer(q) ? "" : "disabled"}>${isLast ? "See my AI career path" : "Next"}</button>
    </div>
    <p class="kbd-hint">Tip: press <kbd>1</kbd>–<kbd>9</kbd> to choose and <kbd>Enter</kbd> to continue</p>`;

  app.querySelectorAll(".option").forEach(btn => {
    btn.onclick = () => choose(q, btn.dataset.value);
  });
  app.querySelector('[data-act="back"]').onclick = () => idx === 0 ? go("intro") : go("question", { qid: qs[idx - 1].id });
  app.querySelector('[data-act="next"]').onclick = () => next(q);
  $("#qTitle").focus({ preventScroll: true });
}

function choose(q, value) {
  clearTimeout(advanceTimer);
  if (q.multi) {
    let arr = Array.isArray(state.answers[q.id]) ? [...state.answers[q.id]] : [];
    if (arr.includes(value)) arr = arr.filter(v => v !== value);
    else if (q.exclusive && value === q.exclusive) arr = [value];
    else arr = arr.filter(v => v !== q.exclusive).concat(value);
    state.answers[q.id] = arr;
    save();
    render();
  } else {
    state.answers[q.id] = value;
    save();
    render();
    advanceTimer = setTimeout(() => next(q), AUTO_ADVANCE_MS);
  }
}

function next(q) {
  clearTimeout(advanceTimer);
  if (!hasAnswer(q)) return;
  const qs = visibleQuestions();
  const idx = qs.findIndex(x => x.id === q.id);
  // Coming from the review screen, jump back there once all questions are answered.
  if (state.returnToReview && qs.every(hasAnswer)) return go("review", { returnToReview: false });
  if (idx < qs.length - 1) go("question", { qid: qs[idx + 1].id });
  else go("result", { roleId: null });
}

document.addEventListener("keydown", e => {
  if (state.view !== "question" || e.altKey || e.ctrlKey || e.metaKey) return;
  const n = Number(e.key);
  if (n >= 1 && n <= 9) {
    const btn = document.querySelectorAll("#app .option")[n - 1];
    if (btn) { e.preventDefault(); btn.click(); }
  } else if (e.key === "Enter" && !(e.target instanceof HTMLButtonElement)) {
    const nextBtn = $('#app [data-act="next"]');
    if (nextBtn && !nextBtn.disabled) { e.preventDefault(); nextBtn.click(); }
  }
});

// ---------- review ----------
function renderReview(app) {
  const qs = visibleQuestions();
  const label = q => {
    const v = state.answers[q.id];
    const vals = Array.isArray(v) ? v : [v];
    const txt = vals.map(x => q.options.find(o => o.value === x)?.label).filter(Boolean).join(", ");
    return txt || `<em class="muted">Not answered</em>`;
  };
  app.innerHTML = `
    <h2 class="question">Review your answers</h2>
    <p class="clarify">Change any answer and we'll update your recommendation straight away.</p>
    <ol class="review-list">
      ${qs.map(q => `<li><div><span class="review-q">${esc(q.q)}</span><span class="review-a">${q.quiz ? (hasAnswer(q) ? "Answered" : "<em class='muted'>Not answered</em>") : label(q)}</span></div>
        <button type="button" class="link-btn" data-q="${q.id}">Change</button></li>`).join("")}
    </ol>
    <div class="nav"><button type="button" class="button btn-primary" data-act="done">See my updated results</button></div>`;
  app.querySelectorAll("[data-q]").forEach(b => b.onclick = () => go("question", { qid: b.dataset.q, returnToReview: true }));
  app.querySelector('[data-act="done"]').onclick = () => {
    const missing = qs.find(q => !hasAnswer(q));
    missing ? go("question", { qid: missing.id, returnToReview: true }) : go("result", { roleId: null });
  };
}

// ---------- results ----------
const fitLabel = f => f >= 80 ? "Excellent fit" : f >= 60 ? "Strong fit" : f >= 40 ? "Possible fit" : "Weak fit";
const fmtMonths = m => m < 1 ? `${Math.max(1, Math.round(m * 4.33))} weeks` : `${m} months`;
const meter = (pct, cls = "") => `<span class="meter ${cls}" aria-hidden="true"><span style="width:${Math.max(3, pct)}%"></span></span>`;
const PACES = [4, 8, 15, 25];
const DAY = 864e5;

// Roadmap progress per role: { done: [stepNumbers], start: "YYYY-MM-DD" }. Older versions stored a bare array.
function getProgress(roleId) {
  const raw = (storage.get(PROGRESS_KEY) || {})[roleId];
  const prog = Array.isArray(raw) ? { done: raw } : raw || { done: [] };
  return { done: new Set(prog.done || []), start: prog.start || null };
}
function setProgress(roleId, prog) {
  const all = storage.get(PROGRESS_KEY) || {};
  all[roleId] = { done: [...prog.done], start: prog.start };
  storage.set(PROGRESS_KEY, all);
}
const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
const isoDate = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const parseIso = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const addWeeks = (d, w) => new Date(d.getTime() + Math.round(w * 7) * DAY);
const fmtDate = (d, year) => d.toLocaleDateString(undefined, year ? { day: "numeric", month: "short", year: "numeric" } : { day: "numeric", month: "short" });

function renderResult(app) {
  const { profile: p, results } = Scoring.rankRoles(state.answers);
  const top = results[0];
  const sel = results.find(r => r.id === state.roleId) || top;
  const topRole = ROLES[top.id];

  $("#progressFill").style.width = "100%";

  app.innerHTML = `
    <nav class="result-nav" aria-label="Result sections">
      <a href="#sec-overview">Overview</a><a href="#sec-role">Role</a><a href="#sec-roadmap">Roadmap</a><a href="#sec-profile">Your profile</a><a href="#sec-resources">Resources</a>
    </nav>
    <section class="result-hero" id="sec-overview">
      <p class="eyebrow">Your best-fit AI path</p>
      <h2>${esc(topRole.title)}</h2>
      <p class="tagline">${esc(topRole.tagline)}</p>
      <div class="stats">
        <div class="stat"><span class="stat-num">${top.fit}%</span><span class="stat-label">${fitLabel(top.fit)}</span></div>
        <div class="stat"><span class="stat-num">${top.readiness}%</span><span class="stat-label">Skills you already have</span></div>
        <div class="stat"><span class="stat-num">${fmtMonths(top.plan.months)}</span><span class="stat-label">To job-ready at ${p.hours} h/week</span></div>
      </div>
      ${top.reasons.length ? `<h3>Why this fits you</h3><ul class="reasons">${top.reasons.slice(0, 4).map(r => `<li>${esc(r)}</li>`).join("")}</ul>` : ""}
      ${MOTIVATION_MSG[p.motivation] ? `<p class="motivation">${esc(MOTIVATION_MSG[p.motivation])}</p>` : ""}
      <a class="button btn-primary hero-cta" href="#sec-roadmap">See my step-by-step roadmap ↓</a>
    </section>

    <section class="block">
      <h3>Your top matches</h3>
      <p class="muted small">Pick a role to see its plan, gaps and roadmap.</p>
      <div class="match-grid">
        ${results.slice(0, 3).map((r, i) => matchCard(r, i, sel.id)).join("")}
      </div>
      <details class="all-roles">
        <summary>Compare all ${results.length} AI paths</summary>
        <ul>${results.map(r => `<li><button type="button" class="link-btn" data-role="${r.id}">${esc(ROLES[r.id].title)}</button>${meter(r.fit)}<span class="pct">${r.fit}%</span></li>`).join("")}</ul>
      </details>
    </section>

    <section class="block role-detail" id="sec-role">${roleDetail(sel, p, sel.id === top.id)}</section>
    <section class="block roadmap-section" id="sec-roadmap" aria-labelledby="rmTitle"></section>
    <section class="block profile" id="sec-profile">${profileSection(p)}</section>

    <section class="block stay" id="sec-resources">
      <h3>Stay updated</h3>
      <div class="stay-grid">
        ${STAY_UPDATED.map(g => `<div class="stay-card"><h4>${esc(g.title)}</h4><ul>${g.items.map(([n, u, d]) => `<li><a href="${u}" target="_blank" rel="noopener">${esc(n)}</a><span class="muted small"> — ${esc(d)}</span></li>`).join("")}</ul></div>`).join("")}
      </div>
    </section>

    <div class="actions">
      <button type="button" class="button btn-secondary" data-act="edit">Edit answers</button>
      <button type="button" class="button btn-secondary" data-act="copy">Copy my plan</button>
      <button type="button" class="button btn-secondary" data-act="print">Print / save PDF</button>
      <button type="button" class="button btn-ghost" data-act="restart">Start over</button>
    </div>`;

  renderRoadmap(sel, p);
  app.querySelectorAll("[data-role]").forEach(b => b.onclick = () => {
    state.roleId = b.dataset.role;
    save();
    renderResult(app);
    $("#sec-role").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  app.querySelectorAll(".result-nav a, .hero-cta").forEach(a => a.onclick = e => {
    e.preventDefault();
    $(a.getAttribute("href")).scrollIntoView({ behavior: "smooth", block: "start" });
  });
  app.querySelector('[data-act="edit"]').onclick = () => go("review");
  app.querySelector('[data-act="restart"]').onclick = restart;
  app.querySelector('[data-act="print"]').onclick = () => window.print();
  app.querySelector('[data-act="copy"]').onclick = e => copyPlan(e.currentTarget, sel, p);
}

function matchCard(r, i, selId) {
  const role = ROLES[r.id];
  return `<button type="button" class="match${r.id === selId ? " active" : ""}" data-role="${r.id}" aria-pressed="${r.id === selId}">
    <span class="match-rank">${i === 0 ? "Best match" : `#${i + 1}`}</span>
    <span class="match-title">${esc(role.title)}</span>
    <span class="match-tag">${esc(role.tagline)}</span>
    <span class="match-meter">${meter(r.fit)}<span class="pct">${r.fit}% fit</span></span>
    <span class="match-meta">${r.readiness}% ready · ~${fmtMonths(r.plan.months)}</span>
  </button>`;
}

function profileSection(p) {
  const quizQs = QUESTIONS.filter(q => q.quiz);
  return `
    <h3>How we read your profile</h3>
    <div class="profile-cols">
      <div>
        <h4>Strengths you can build on</h4>
        <ul class="ticks">${Scoring.strengths(p).map(s => `<li>${esc(s)}</li>`).join("")}</ul>
      </div>
      <div>
        <h4>Reasoning check</h4>
        <ul class="quiz-results">${quizQs.map(q => {
          const r = p.quiz[q.quiz];
          const cls = r === null ? "skip" : r ? "ok" : "miss";
          return `<li class="${cls}"><strong>${esc(q.skill)}</strong> — ${r === null ? "skipped" : r ? "correct" : "worth revisiting"}<br><span class="muted small">${esc(q.explain)}</span></li>`;
        }).join("")}</ul>
      </div>
    </div>
    ${p.notes.length ? `<div class="callout callout-info"><strong>We adjusted a few answers for accuracy:</strong><ul>${p.notes.map(n => `<li>${esc(n)}</li>`).join("")}</ul></div>` : ""}`;
}

function roleDetail(r, p, isTop) {
  const role = ROLES[r.id];
  return `
    <div class="detail-head">
      <h2>${esc(role.title)}</h2>
      <span class="fit-pill">${r.fit}% fit · ${fitLabel(r.fit)}</span>
    </div>
    <p class="why">${esc(role.why)}</p>
    ${!isTop && r.reasons.length ? `<h4>Why it could fit you</h4><ul class="reasons">${r.reasons.slice(0, 4).map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
    ${r.cautions.length ? `<div class="callout callout-warn"><strong>Watch-outs:</strong><ul>${r.cautions.map(c => `<li>${esc(c)}</li>`).join("")}</ul></div>` : ""}

    <div class="detail-cols">
      <div>
        <h4>Job titles to search for</h4>
        <div class="chips">${role.titles.map(t => `<span class="chip">${esc(t)}</span>`).join("")}</div>
        <h4>Core skills</h4>
        <div class="chips">${role.skills.map((s, i) => `<span class="chip${i < 3 ? " chip-key" : ""}">${esc(s)}</span>`).join("")}</div>
      </div>
      <div>
        <h4>Market</h4>
        <dl class="market">
          <dt>Demand</dt><dd>${esc(role.market.demand)}</dd>
          <dt>US pay</dt><dd>${esc(role.market.pay)}</dd>
          <dt>India pay</dt><dd>${esc(role.market.payIndia)}</dd>
        </dl>
        <p class="muted tiny">Indicative ranges from Levels.fyi, Glassdoor, AmbitionBox and 2026 salary guides. Sources disagree, and pay varies a lot by city and company type (product companies and AI startups pay well above IT services).</p>
      </div>
    </div>

    <h4>Your skill gaps for this role</h4>
    ${r.gaps.length ? `<ul class="gaps">${r.gaps.map(g => `<li>
        <div class="gap-head"><strong>${esc(g.label)}</strong>${g.need !== undefined ? `<span class="gap-meter">${meter((g.have / g.max) * 100, "have")}<span class="tiny muted">you: ${levelName(g.key, g.have)} → needed: ${levelName(g.key, g.need)}</span></span>` : ""}</div>
        <p class="small">${esc(g.advice)}</p></li>`).join("")}</ul>`
      : `<p class="small ok-text">No major gaps. You already meet the core skill levels, so focus on portfolio projects and applying.</p>`}
    <p class="small guide-link"><a href="roles/${role.slug}.html">Read the full ${esc(role.title)} guide →</a></p>`;
}

const LEVEL_NAMES = {
  py: ["none", "basic", "comfortable", "advanced"],
  sql: ["none", "basic", "comfortable", "advanced"],
  cloud: ["none", "basic", "comfortable", "advanced"],
  ml: ["none", "used AI tools", "built with LLM APIs", "trained models", "shipped ML", "research"],
  math: ["weak", "okay", "strong"]
};
const levelName = (k, v) => (LEVEL_NAMES[k] || [])[Math.floor(v)] ?? v;

// ---------- roadmap planner ----------
function renderRoadmap(r, p, keepOpen) {
  const sec = $("#sec-roadmap");
  const role = ROLES[r.id];
  const pl = r.plan;
  const prog = getProgress(r.id);
  const start = prog.start ? parseIso(prog.start) : today();
  const finish = addWeeks(start, pl.totalWeeks);
  const steps = pl.steps;
  const doneCount = steps.filter(s => prog.done.has(s.step)).length;
  const allDone = doneCount === steps.length;
  const nextStep = steps.find(s => !prog.done.has(s.step));
  const open = keepOpen || new Set(nextStep ? [nextStep.step] : []);
  const total = pl.totalWeeks || 1;

  let timeline = "";
  if (p.deadline && pl.months > p.deadline) {
    const needHours = Math.ceil(pl.studyHours / (p.deadline * 4.33));
    timeline = `<div class="callout callout-warn"><strong>Timeline check:</strong> at ${p.hours} h/week this takes about ${fmtMonths(pl.months)}, longer than your ${p.deadline}-month target. You'd need about <strong>${needHours} h/week</strong> to hit it. Try a faster pace above, or treat the target as "interview-ready" and keep learning on the job.</div>`;
  } else if (p.deadline) {
    timeline = `<div class="callout callout-ok"><strong>On track:</strong> about ${fmtMonths(pl.months)} at ${p.hours} h/week fits your ${p.deadline}-month target.</div>`;
  }

  // Month ticks for the timeline axis
  const ticks = [];
  for (let m = 1; m * 4.33 < total; m++) ticks.push(`<span class="tick" style="left:${(m * 4.33 / total) * 100}%">${fmtDate(addWeeks(start, m * 4.33)).replace(/^\d+\s*/, "")}</span>`);

  sec.innerHTML = `
    <div class="rm-head">
      <div>
        <p class="eyebrow">Your roadmap</p>
        <h3 id="rmTitle">${esc(role.title)}: ${steps.length} steps</h3>
        <p class="muted small">≈ ${pl.studyHours} study hours · ${prog.start ? "started" : "starting"} ${fmtDate(start, true)} · finish around <strong>${fmtDate(finish, true)}</strong></p>
      </div>
      <div class="pace" role="group" aria-label="Study hours per week">
        <span class="pace-label">Your pace</span>
        ${PACES.map(h => `<button type="button" class="pace-btn${h === p.hours ? " active" : ""}" data-pace="${h}" aria-pressed="${h === p.hours}">${h} h/wk</button>`).join("")}
      </div>
    </div>
    ${timeline}

    <div class="rm-timeline" role="img" aria-label="Timeline: ${steps.length} steps from ${fmtDate(start, true)} to ${fmtDate(finish, true)}">
      <div class="rm-bar">
        ${steps.filter(s => s.endWeek > s.startWeek).map(s => `<button type="button" class="seg${prog.done.has(s.step) ? " done" : ""}${s.fast ? " fast" : ""}${nextStep && s.step === nextStep.step ? " next" : ""}"
          style="width:${((s.endWeek - s.startWeek) / total) * 100}%" data-goto="${s.step}" title="Step ${s.step}: ${esc(s.title)}">${s.step}</button>`).join("")}
      </div>
      <div class="rm-axis"><span>${fmtDate(start)}</span>${ticks.join("")}<span>${fmtDate(finish)}</span></div>
      <div class="rm-legend tiny muted"><span class="lg lg-todo"></span>To do <span class="lg lg-next"></span>Up next <span class="lg lg-fast"></span>Fast-track <span class="lg lg-done"></span>Done</div>
    </div>

    ${allDone ? `<div class="up-next complete">
        <p class="eyebrow">Roadmap complete 🎉</p>
        <h4>You've finished every step. Now apply.</h4>
        <p class="small">Search for these titles: ${role.titles.map(esc).join(", ")}. Put your projects at the top of your resume and keep shipping small things while you interview.</p>
      </div>` : nextStep ? `<div class="up-next">
        <p class="eyebrow">Up next · Step ${nextStep.step} of ${steps.length}</p>
        <h4>${esc(nextStep.title)}</h4>
        <p class="small">${esc(nextStep.what)}</p>
        <p class="small"><strong>Start with:</strong> ${esc(nextStep.sources.split(",")[0])}</p>
        <p class="tiny muted">${stepWhen(nextStep, start)}</p>
        <div class="up-next-actions">
          <button type="button" class="button btn-primary" data-done="${nextStep.step}">Mark step ${nextStep.step} done</button>
          <button type="button" class="button btn-secondary" data-goto="${nextStep.step}">View details</button>
        </div>
      </div>` : ""}

    <div class="rm-toolbar">
      <span class="small"><strong>${doneCount}</strong> of ${steps.length} done</span>
      ${meter((doneCount / steps.length) * 100, "progress")}
      <button type="button" class="link-btn small" data-expand="1">Expand all</button>
      <button type="button" class="link-btn small" data-expand="0">Collapse all</button>
    </div>
    <ol class="roadmap">
      ${steps.map(s => stepItem(s, prog.done.has(s.step), open.has(s.step), nextStep && s.step === nextStep.step, start)).join("")}
    </ol>
    <div class="rm-actions">
      <button type="button" class="button btn-secondary" data-act="ics">Add to my calendar (.ics)</button>
      <span class="muted small">Tick each step when you finish it. Progress is saved in this browser. <span class="badge-fast">Fast-track</span> steps cover skills you already have, so a quick revision is enough.</span>
    </div>`;

  const rerender = () => {
    const opened = new Set([...sec.querySelectorAll(".roadmap details[open]")].map(d => Number(d.closest(".step").dataset.step)));
    renderRoadmap(r, p, opened);
  };
  const toggleDone = (step, on) => {
    const pr = getProgress(r.id);
    on ? pr.done.add(step) : pr.done.delete(step);
    if (!pr.start) pr.start = isoDate(today());
    setProgress(r.id, pr);
  };
  sec.querySelectorAll(".step input[type=checkbox]").forEach(cb => cb.onchange = () => {
    toggleDone(Number(cb.closest(".step").dataset.step), cb.checked);
    rerender();
  });
  sec.querySelectorAll("[data-done]").forEach(b => b.onclick = () => {
    toggleDone(Number(b.dataset.done), true);
    renderRoadmap(r, p);
  });
  sec.querySelectorAll("[data-goto]").forEach(b => b.onclick = () => {
    const li = sec.querySelector(`.step[data-step="${b.dataset.goto}"]`);
    li.querySelector("details").open = true;
    li.scrollIntoView({ behavior: "smooth", block: "center" });
    li.classList.add("flash");
    setTimeout(() => li.classList.remove("flash"), 1200);
  });
  sec.querySelectorAll("[data-expand]").forEach(b => b.onclick = () => {
    sec.querySelectorAll(".roadmap details").forEach(d => d.open = b.dataset.expand === "1");
  });
  sec.querySelectorAll("[data-pace]").forEach(b => b.onclick = () => {
    state.answers.hours = b.dataset.pace;
    save();
    renderResult($("#app"));
    $("#sec-roadmap").scrollIntoView({ block: "start" });
  });
  sec.querySelector('[data-act="ics"]').onclick = () => downloadIcs(role, steps, start);
}

function stepWhen(s, start) {
  if (s.endWeek <= s.startWeek) return `From ${fmtDate(addWeeks(start, s.startWeek), true)}, ongoing`;
  const a = Math.floor(s.startWeek) + 1, b = Math.max(a, Math.ceil(s.endWeek));
  return `Week${a === b ? ` ${a}` : `s ${a}–${b}`} · ${fmtDate(addWeeks(start, s.startWeek))} – ${fmtDate(addWeeks(start, s.endWeek))} · ~${s.studyHours} study hours`;
}

function stepItem(s, isDone, open, isNext, start) {
  const list = (cls, title, items) => items && items.length ? `<div class="${cls}"><span class="step-label">${title}</span><ul>${items.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>` : "";
  const time = s.studyWeeks === null ? s.time : s.fast ? `~${Math.max(1, s.studyHours)} h revision` : s.time;
  return `<li class="step${isDone ? " done" : ""}${s.fast ? " fast" : ""}${isNext ? " next" : ""}" data-step="${s.step}">
    <label class="step-check" title="Mark step ${s.step} as done"><input type="checkbox" ${isDone ? "checked" : ""} aria-label="Mark step ${s.step}, ${esc(s.title)}, as done"><span class="step-num">${s.step}</span></label>
    <details ${open ? "open" : ""}>
      <summary><span class="step-title">${esc(s.title)}</span><span class="step-badges">${isNext ? `<span class="badge-next">Up next</span>` : ""}${s.fast ? `<span class="badge-fast">Fast-track</span>` : ""}<span class="badge-time">${esc(time)}</span></span></summary>
      <div class="step-body">
        <p class="step-when">${stepWhen(s, start)}</p>
        <p>${esc(s.what)}</p>
        ${s.why ? `<p class="step-why"><strong>Why it matters:</strong> ${esc(s.why)}</p>` : ""}
        <p class="small"><strong>Learn from:</strong> ${esc(s.sources)}</p>
        <p class="small muted"><strong>When:</strong> ${esc(s.sequence)}</p>
        <div class="step-lists">
          ${list("sub", "What you'll learn", s.subTopics)}
          ${list("must", "Must-know", s.keyHighlights)}
          ${list("notes", "Tips", s.mindNotes)}
        </div>
        ${s.starterProjects ? `<div class="projects"><span class="step-label">Project ideas</span>${s.starterProjects.map(sp => `
          <div class="project"><strong>${esc(sp.name)}</strong> — ${esc(sp.description)}
            <div class="tiny muted">Suggested files: ${sp.files.map(esc).join(", ")}</div>
            <a class="small" href="https://github.com/search?q=${encodeURIComponent(sp.name)}&type=repositories" target="_blank" rel="noopener">Find similar projects on GitHub →</a></div>`).join("")}</div>` : ""}
      </div>
    </details>
  </li>`;
}

// Calendar export: one all-day event per study step, plus a reminder to start applying.
function downloadIcs(role, steps, start) {
  const fmt = d => isoDate(d).replace(/-/g, "");
  const text = s => String(s).replace(/\\/g, "\\\\").replace(/[,;]/g, m => "\\" + m).replace(/\n/g, "\\n");
  const fold = line => line.length <= 74 ? line : line.match(/.{1,73}/g).join("\r\n ");
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
  const events = steps.map(s => {
    const from = addWeeks(start, s.startWeek);
    const to = s.endWeek > s.startWeek ? addWeeks(start, s.endWeek) : new Date(from.getTime() + DAY);
    return ["BEGIN:VEVENT", `UID:aipf-${role.slug}-${s.step}@ai-path-finder`, `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${fmt(from)}`, `DTEND;VALUE=DATE:${fmt(to > from ? to : new Date(from.getTime() + DAY))}`,
      `SUMMARY:${text(`AI roadmap · Step ${s.step}: ${s.title}`)}`,
      `DESCRIPTION:${text(`${s.what}\n\nLearn from: ${s.sources}`)}`, "TRANSP:TRANSPARENT", "END:VEVENT"].map(fold).join("\r\n");
  });
  const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//AI Path Finder//Roadmap//EN", "CALSCALE:GREGORIAN", ...events, "END:VCALENDAR"].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  a.download = `${role.slug}-roadmap.ics`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
}

function copyPlan(btn, r, p) {
  const role = ROLES[r.id];
  const text = [
    `My AI career path: ${role.title} (${r.fit}% fit)`,
    `Job-ready in ~${fmtMonths(r.plan.months)} at ${p.hours} h/week`,
    "",
    "Why it fits:", ...r.reasons.slice(0, 4).map(x => `- ${x}`),
    "",
    "Roadmap:", ...r.plan.steps.map(s => `${s.step}. ${s.title} (${s.fast ? "fast-track" : s.time})`),
    "",
    `Made with AI Path Finder — ${location.href.split("#")[0]}`
  ].join("\n");
  const done = () => { btn.textContent = "Copied ✓"; setTimeout(() => (btn.textContent = "Copy my plan"), 1800); };
  if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
  else fallbackCopy(text, done);
}

function fallbackCopy(text, done) {
  const ta = document.createElement("textarea");
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ }
  ta.remove();
}

// Open every roadmap step when printing so the PDF contains the full plan.
window.addEventListener("beforeprint", () => document.querySelectorAll(".roadmap details").forEach(d => d.open = true));

render();
