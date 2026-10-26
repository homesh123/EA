const QUESTIONS = [
  { id: "background", q: "What best describes you right now?", clarify: "Pick the one that fits you — no wrong answers.",
    options: [
      { value: "swexp", label: "Software Engineer", desc: "I already work in IT / software" },
      { value: "fresher", label: "Fresher / Student", desc: "I am new, still learning" },
      { value: "mca", label: "MCA / BCA Graduate", desc: "I have a computer applications degree" },
      { value: "careerchange", label: "Career Changer", desc: "I come from a non-IT field (accountant, teacher, etc.)" },
      { value: "other", label: "Other Background", desc: "Something else — that is fine" }
    ]},
  { id: "experience", q: "How many years of work experience do you have?", clarify: "0 is fine if you have not started working yet.",
    options: [
      { value: "0-2", label: "0–2 years", desc: "Fresher or early career" },
      { value: "2-5", label: "2–5 years", desc: "Individual contributor" },
      { value: "5-10", label: "5–10 years", desc: "Senior / lead engineer" },
      { value: "10+", label: "10+ years", desc: "Staff / principal engineer" }
    ]},
  { id: "domain", q: "What kind of work do you currently do (if any)?", clarify: "If you have not worked yet, pick 'No domain yet'.",
    options: [
      { value: "backend", label: "Backend Services", desc: "APIs, microservices, servers" },
      { value: "frontend", label: "Frontend / Web Apps", desc: "React, Vue, UI engineering" },
      { value: "fullstack", label: "Full-Stack", desc: "End-to-end application development" },
      { value: "dataeng", label: "Data Engineering", desc: "Pipelines, ETL, warehouses" },
      { value: "devops", label: "DevOps / SRE / Cloud", desc: "Infrastructure, CI/CD, reliability" },
      { value: "mobile", label: "Mobile Development", desc: "iOS, Android, Flutter" },
      { value: "testing", label: "Testing / QA", desc: "Manual or automation testing" },
      { value: "none", label: "No domain yet", desc: "Just starting out" }
    ]},
  { id: "lang", q: "Which programming languages are you comfortable with?", clarify: "If you know none yet, pick 'None yet' — we will handle it.",
    options: [
      { value: "python", label: "Python", desc: "Strong AI ecosystem" },
      { value: "js", label: "JavaScript / TypeScript", desc: "Web + full-stack" },
      { value: "java", label: "Java", desc: "Enterprise backend" },
      { value: "csharp", label: "C# / .NET", desc: "Enterprise & game dev" },
      { value: "cpp", label: "C / C++", desc: "Systems, performance" },
      { value: "go", label: "Go / Rust", desc: "Cloud native" },
      { value: "none", label: "None yet", desc: "Starting from scratch" }
    ]},
  { id: "ml", q: "What is your experience with AI / Machine Learning so far?", clarify: "ML = teaching computers to learn from data. No experience is completely fine.",
    options: [
      { value: "none", label: "None", desc: "I have not done any ML yet" },
      { value: "use", label: "User of ML", desc: "I have used AI APIs or prebuilt models" },
      { value: "basic", label: "Basic", desc: "I have trained simple models before" },
      { value: "adv", label: "Advanced", desc: "I have built production ML systems" }
    ]},
  { id: "math", q: "How comfortable are you with math (statistics, algebra)?", clarify: "This helps us pick the right depth — weak is fine, we start easy.",
    options: [
      { value: "weak", label: "Weak", desc: "I need to start from basics" },
      { value: "ok", label: "Okay", desc: "I am comfortable with basics" },
      { value: "strong", label: "Strong", desc: "I know advanced math topics" }
    ]},
  { id: "interest", q: "What part of AI excites you the most?", clarify: "Pick whatever sounds most interesting to you.",
    options: [
      { value: "build", label: "Building AI features", desc: "Adding AI into apps/products" },
      { value: "model", label: "Training / tuning models", desc: "Teaching computers to learn" },
      { value: "data", label: "Working with data", desc: "Cleaning and analyzing data" },
      { value: "agents", label: "Autonomous agents", desc: "AI that plans and acts on its own" },
      { value: "infra", label: "AI infrastructure", desc: "Running AI systems reliably at scale" }
    ]},
  { id: "goal", q: "What do you want to achieve?", clarify: "This decides whether we aim for a full switch or a side path.",
    options: [
      { value: "switch", label: "Switch into an AI role", desc: "Move fully into AI/ML" },
      { value: "upskill", label: "Upskill in current role", desc: "Add AI to my existing job" },
      { value: "freelance", label: "Freelance / side projects", desc: "Build AI products on the side" },
      { value: "start", label: "Start from scratch", desc: "Enter the field for the first time" }
    ]}
];

function scoreRole(answers) {
  const scores = {};
  const add = (role, points) => { scores[role] = (scores[role] || 0) + points; };

  if (answers.background === "fresher" || answers.background === "mca" || answers.lang === "none" || answers.goal === "start") {
    return ["ai-fresher"];
  }
  if (answers.background === "careerchange" || answers.background === "other") {
    if (answers.ml === "none" || answers.ml === "use") {
      return ["ai-fresher", "ai-product-engineer"];
    }
  }

  const ml = answers.ml, interest = answers.interest, domain = answers.domain, lang = answers.lang, math = answers.math, goal = answers.goal;

  if (ml === "none") { add("ml-engineer", 2); add("ai-product-engineer", 3); add("llm-agent-engineer", 2); }
  if (ml === "use") { add("ai-product-engineer", 3); add("llm-agent-engineer", 3); add("ml-engineer", 2); }
  if (ml === "basic") { add("ml-engineer", 3); add("ai-research-engineer", 2); add("mlops-engineer", 1); }
  if (ml === "adv") { add("ai-research-engineer", 3); add("mlops-engineer", 3); add("ml-engineer", 2); }

  if (interest === "build") { add("ai-product-engineer", 3); add("llm-agent-engineer", 2); }
  if (interest === "model") { add("ai-research-engineer", 3); add("ml-engineer", 2); }
  if (interest === "data") { add("data-engineer-ai", 3); add("ml-engineer", 1); }
  if (interest === "agents") { add("llm-agent-engineer", 3); add("ai-product-engineer", 1); }
  if (interest === "infra") { add("mlops-engineer", 3); add("data-engineer-ai", 1); }

  if (domain === "backend" || domain === "fullstack") { add("ml-engineer", 1); add("ai-product-engineer", 1); add("llm-agent-engineer", 1); }
  if (domain === "frontend") { add("ai-product-engineer", 2); }
  if (domain === "dataeng") { add("data-engineer-ai", 3); add("ml-engineer", 1); }
  if (domain === "devops") { add("mlops-engineer", 3); add("data-engineer-ai", 1); }
  if (domain === "mobile") { add("ai-product-engineer", 2); }
  if (domain === "testing") { add("ml-engineer", 1); add("mlops-engineer", 1); add("data-engineer-ai", 1); }

  if (lang === "python") { add("ml-engineer", 1); add("data-engineer-ai", 1); add("ai-research-engineer", 1); add("llm-agent-engineer", 1); }
  if (lang === "js") { add("ai-product-engineer", 2); }
  if (lang === "java" || lang === "csharp") { add("mlops-engineer", 1); add("ml-engineer", 1); }
  if (lang === "cpp") { add("ai-research-engineer", 1); add("mlops-engineer", 1); }

  if (math === "strong") { add("ai-research-engineer", 2); add("ml-engineer", 1); }
  if (math === "weak") { add("ai-product-engineer", 1); add("llm-agent-engineer", 1); add("mlops-engineer", 1); }

  if (goal === "upskill") { add("ai-product-engineer", 1); add("llm-agent-engineer", 1); }
  if (goal === "freelance") { add("ai-product-engineer", 1); add("llm-agent-engineer", 1); }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return sorted.slice(0, 2).map(s => s[0]);
}

const state = { answers: {}, step: 0 };

function renderForm() {
  const q = QUESTIONS[state.step];
  const form = document.getElementById("form");
  form.innerHTML = "";
  const qEl = document.createElement("p");
  qEl.className = "question";
  qEl.textContent = q.q;
  form.appendChild(qEl);
  if (q.clarify) {
    const c = document.createElement("p");
    c.style.color = "var(--muted)";
    c.style.fontSize = "13px";
    c.textContent = q.clarify;
    form.appendChild(c);
  }
  const opts = document.createElement("div");
  opts.className = "options";
  q.options.forEach(opt => {
    const div = document.createElement("div");
    div.className = "option" + (state.answers[q.id] === opt.value ? " selected" : "");
    div.innerHTML = `<div class="dot"></div><div><div class="opt-text">${opt.label}</div><div class="opt-desc">${opt.desc}</div></div>`;
    div.addEventListener("click", () => { state.answers[q.id] = opt.value; renderForm(); });
    opts.appendChild(div);
  });
  form.appendChild(opts);

  const nav = document.createElement("div");
  nav.className = "nav";
  const back = document.createElement("button");
  back.className = "button btn-secondary";
  back.textContent = "Back";
  back.disabled = state.step === 0;
  back.addEventListener("click", () => { state.step--; renderForm(); });
  const next = document.createElement("button");
  next.className = "button btn-primary";
  next.textContent = state.step === QUESTIONS.length - 1 ? "Get my path" : "Next";
  next.disabled = !state.answers[q.id];
  next.addEventListener("click", () => {
    if (state.step < QUESTIONS.length - 1) { state.step++; renderForm(); }
    else showResult();
  });
  nav.appendChild(back);
  nav.appendChild(next);
  form.appendChild(nav);

  document.getElementById("currentStep").textContent = state.step + 1;
  document.getElementById("totalSteps").textContent = QUESTIONS.length;
  document.getElementById("progressFill").style.width = (state.step / QUESTIONS.length * 100) + "%";
}

function showResult() {
  const roles = scoreRole(state.answers);
  const form = document.getElementById("form");
  form.innerHTML = "";
  const intro = document.createElement("p");
  intro.className = "question";
  intro.textContent = "Based on your answers, here are your best-fit AI paths:";
  form.appendChild(intro);

  roles.forEach(roleId => {
    const role = ROLES[roleId];
    const card = document.createElement("div");
    card.className = "role-card result";
    const steps = role.roadmap.map(r => `
      <li><strong>Step ${r.step} - ${r.title}</strong> (${r.time})<br>
      What: ${r.what}<br>
      Why learn it: This is a core skill for the role.<br>
      Sources: ${r.sources}<br>
      When to do it: ${r.sequence}</li>`).join("");
    card.innerHTML = `
      <h2>${role.title}</h2>
      <p class="why">${role.why}</p>
      <div class="skill-list">${role.skills.map(s => `<span class="skill">${s}</span>`).join("")}</div>
      <div class="roadmap"><strong>Learning roadmap (sequence, time, sources):</strong><ol>${steps}</ol></div>
    `;
    form.appendChild(card);
  });

  const note = document.createElement("p");
  note.style.color = "var(--muted)";
  note.style.fontSize = "13px";
  note.style.marginTop = "16px";
  note.textContent = "Tip: Follow the roadmap in order. Build at least one portfolio project before applying.";
  form.appendChild(note);

  document.getElementById("progressFill").style.width = "100%";
}

renderForm();
