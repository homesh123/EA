const QUESTIONS = [
  { id: "years", q: "How many years of professional software experience do you have?", options: [
    { value: "0-2", label: "0–2 years (early career)", desc: "New grad or junior developer" },
    { value: "2-5", label: "2–5 years", desc: "Solid individual contributor" },
    { value: "5-10", label: "5–10 years", desc: "Senior / lead engineer" },
    { value: "10+", label: "10+ years", desc: "Staff / principal engineer" }
  ]},
  { id: "domain", q: "What domain do you currently work in?", options: [
    { value: "backend", label: "Backend services", desc: "APIs, microservices, servers" },
    { value: "frontend", label: "Frontend / web apps", desc: "React, Vue, UI engineering" },
    { value: "fullstack", label: "Full-stack", desc: "End-to-end application development" },
    { value: "dataeng", label: "Data engineering", desc: "Pipelines, ETL, warehouses" },
    { value: "devops", label: "DevOps / SRE / Cloud", desc: "Infrastructure, CI/CD, reliability" },
    { value: "mobile", label: "Mobile development", desc: "iOS, Android, Flutter" },
    { value: "other", label: "Other (QA, PM, etc.)", desc: "Adjacent software role" }
  ]},
  { id: "lang", q: "Which programming languages are you most comfortable with?", options: [
    { value: "python", label: "Python", desc: "Strong AI ecosystem" },
    { value: "js", label: "JavaScript / TypeScript", desc: "Web + full-stack" },
    { value: "java", label: "Java", desc: "Enterprise backend" },
    { value: "csharp", label: "C# / .NET", desc: "Enterprise & game dev" },
    { value: "cpp", label: "C / C++", desc: "Systems, performance" },
    { value: "go", label: "Go / Rust", desc: "Cloud native" },
    { value: "other", label: "Other", desc: "PHP, Ruby, etc." }
  ]},
  { id: "ml", q: "What is your current experience with Machine Learning / AI?", options: [
    { value: "none", label: "None", desc: "No prior ML experience" },
    { value: "use", label: "User of ML", desc: "Use APIs / prebuilt models" },
    { value: "basic", label: "Basic", desc: "Trained simple models" },
    { value: "adv", label: "Advanced", desc: "Production ML systems" }
  ]},
  { id: "math", q: "How comfortable are you with math (linear algebra, stats, calculus)?", options: [
    { value: "weak", label: "Weak", desc: "Needs a refresher" },
    { value: "ok", label: "Okay", desc: "Comfortable with basics" },
    { value: "strong", label: "Strong", desc: "Familiar with advanced topics" }
  ]},
  { id: "interest", q: "What excites you most about AI?", options: [
    { value: "build", label: "Building AI features", desc: "Embed AI into products" },
    { value: "model", label: "Training / tuning models", desc: "Research-adjacent work" },
    { value: "data", label: "Working with data", desc: "Insights, pipelines" },
    { value: "agents", label: "Autonomous agents / automation", desc: "LLM-powered workflows" },
    { value: "infra", label: "AI infrastructure / MLOps", desc: "Scale & reliability" }
  ]},
  { id: "goal", q: "What is your primary goal?", options: [
    { value: "switch", label: "Switch into an AI role", desc: "New career direction" },
    { value: "upskill", label: "Upskill within current role", desc: "Add AI to current job" },
    { value: "freelance", label: "Freelance / side projects", desc: "Build AI products" }
  ]}
];

const ROLES = {
  "ml-engineer": {
    title: "ML Engineer",
    why: "Best fit when you have solid software engineering + want to build and ship models into products.",
    skills: ["Python", "Scikit-learn / PyTorch", "Model serving", "MLOps basics", "SQL"],
    roadmap: ["1. Refresh Python & statistics", "2. Learn classic ML (supervised/unsupervised)", "3. Build 2-3 portfolio projects (end-to-end)", "4. Learn model deployment (FastAPI, Docker)", "5. Apply to ML Engineer roles"]
  },
  "data-engineer-ai": {
    title: "Data Engineer (AI focus)",
    why: "Best fit when you already work with data pipelines and want to specialize in AI-ready data.",
    skills: ["Python", "Spark / Airflow", "SQL", "Data warehouses", "Feature stores"],
    roadmap: ["1. Strengthen data pipeline tooling (Airflow, dbt)", "2. Learn feature engineering for ML", "3. Understand data quality & labeling", "4. Build a streaming + batch pipeline project", "5. Target data platform teams in AI companies"]
  },
  "ai-product-engineer": {
    title: "AI Product Engineer",
    why: "Best fit for full-stack/frontend engineers who want to embed LLM features into user products.",
    skills: ["JavaScript/TypeScript", "LLM APIs", "Vector DBs", "Prompt engineering", "Web frameworks"],
    roadmap: ["1. Learn LLM API usage (OpenAI, Anthropic)", "2. Build RAG with a vector DB (Pinecone/pgvector)", "3. Study prompt engineering patterns", "4. Ship 3 AI feature demos in your stack", "5. Target AI product / full-stack roles"]
  },
  "mlops-engineer": {
    title: "MLOps / AI Platform Engineer",
    why: "Best fit for DevOps/SRE backgrounds who want to build reliable AI infrastructure.",
    skills: ["Kubernetes", "CI/CD", "Python", "Model registries", "Observability"],
    roadmap: ["1. Learn ML model packaging & serving", "2. Master K8s + Helm for model serving", "3. Build an MLOps pipeline (training -> deploy -> monitor)", "4. Study model monitoring & drift detection", "5. Target AI platform / MLOps roles"]
  },
  "llm-agent-engineer": {
    title: "LLM / Agent Engineer",
    why: "Best fit for engineers excited by autonomous agents and LLM-powered workflows.",
    skills: ["Python", "LLM orchestration (LangChain/LlamaIndex)", "Vector DBs", "API design", "Evaluation"],
    roadmap: ["1. Master LLM APIs and prompting", "2. Learn agent frameworks (LangGraph, AutoGen)", "3. Build an autonomous agent project", "4. Study evaluation & safety for agents", "5. Target agent/automation engineering roles"]
  },
  "ai-research-engineer": {
    title: "AI Research Engineer",
    why: "Best fit if you have strong math + want to train and tune models.",
    skills: ["PyTorch", "Linear algebra", "Deep learning", "Experiment tracking", "HPC basics"],
    roadmap: ["1. Strengthen math (linear algebra, calculus, stats)", "2. Deep dive into deep learning (CNNs, Transformers)", "3. Fine-tune open-source models (LoRA/PEFT)", "4. Contribute to a research project or paper", "5. Target research engineering / applied scientist roles"]
  }
};

const state = { answers: {}, step: 0 };

function scoreRole(answers) {
  const scores = {};
  const ml = answers.ml;
  const interest = answers.interest;
  const domain = answers.domain;
  const lang = answers.lang;
  const math = answers.math;
  const goal = answers.goal;

  const add = (role, points) => { scores[role] = (scores[role] || 0) + points; };

  // ML experience baseline
  if (ml === "none") { add("ml-engineer", 2); add("ai-product-engineer", 3); add("llm-agent-engineer", 2); }
  if (ml === "use") { add("ai-product-engineer", 3); add("llm-agent-engineer", 3); add("ml-engineer", 2); }
  if (ml === "basic") { add("ml-engineer", 3); add("ai-research-engineer", 2); add("mlops-engineer", 1); }
  if (ml === "adv") { add("ai-research-engineer", 3); add("mlops-engineer", 3); add("ml-engineer", 2); }

  // Interest signals
  if (interest === "build") { add("ai-product-engineer", 3); add("llm-agent-engineer", 2); }
  if (interest === "model") { add("ai-research-engineer", 3); add("ml-engineer", 2); }
  if (interest === "data") { add("data-engineer-ai", 3); add("ml-engineer", 1); }
  if (interest === "agents") { add("llm-agent-engineer", 3); add("ai-product-engineer", 1); }
  if (interest === "infra") { add("mlops-engineer", 3); add("data-engineer-ai", 1); }

  // Domain fit
  if (domain === "backend" || domain === "fullstack") { add("ml-engineer", 1); add("ai-product-engineer", 1); add("llm-agent-engineer", 1); }
  if (domain === "frontend") { add("ai-product-engineer", 2); }
  if (domain === "dataeng") { add("data-engineer-ai", 3); add("ml-engineer", 1); }
  if (domain === "devops") { add("mlops-engineer", 3); add("data-engineer-ai", 1); }
  if (domain === "mobile") { add("ai-product-engineer", 2); }

  // Language fit
  if (lang === "python") { add("ml-engineer", 1); add("data-engineer-ai", 1); add("ai-research-engineer", 1); add("llm-agent-engineer", 1); }
  if (lang === "js") { add("ai-product-engineer", 2); }
  if (lang === "java" || lang === "csharp") { add("mlops-engineer", 1); add("ml-engineer", 1); }
  if (lang === "cpp") { add("ai-research-engineer", 1); add("mlops-engineer", 1); }

  // Math comfort
  if (math === "strong") { add("ai-research-engineer", 2); add("ml-engineer", 1); }
  if (math === "weak") { add("ai-product-engineer", 1); add("llm-agent-engineer", 1); add("mlops-engineer", 1); }

  // Goal adjustment
  if (goal === "switch") { /* keep scores */ }
  if (goal === "upskill") { add("ai-product-engineer", 1); add("llm-agent-engineer", 1); }
  if (goal === "freelance") { add("ai-product-engineer", 1); add("llm-agent-engineer", 1); }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, 2).map(s => s[0]);
  return top;
}

function renderForm() {
  const q = QUESTIONS[state.step];
  const form = document.getElementById("form");
  form.innerHTML = "";
  const qEl = document.createElement("p");
  qEl.className = "question";
  qEl.textContent = q.q;
  form.appendChild(qEl);

  const opts = document.createElement("div");
  opts.className = "options";
  q.options.forEach(opt => {
    const div = document.createElement("div");
    div.className = "option" + (state.answers[q.id] === opt.value ? " selected" : "");
    div.innerHTML = `<div class="dot"></div><div><div class="opt-text">${opt.label}</div><div class="opt-desc">${opt.desc}</div></div>`;
    div.addEventListener("click", () => {
      state.answers[q.id] = opt.value;
      renderForm();
    });
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
  document.getElementById("progressFill").style.width = ((state.step) / QUESTIONS.length * 100) + "%";
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
    card.innerHTML = `
      <h2>${role.title}</h2>
      <p class="why">${role.why}</p>
      <div class="skill-list">
        ${role.skills.map(s => `<span class="skill">${s}</span>`).join("")}
      </div>
      <div class="roadmap"><strong>Learning roadmap:</strong><ol>${role.roadmap.map(r => `<li>${r}</li>`).join("")}</ol></div>
    `;
    form.appendChild(card);
  });

  const note = document.createElement("p");
  note.style.color = "var(--muted)";
  note.style.fontSize = "13px";
  note.style.marginTop = "16px";
  note.textContent = "Tip: Start with the first roadmap item of your top match, build one portfolio project, then apply.";
  form.appendChild(note);

  document.getElementById("progressFill").style.width = "100%";
}

renderForm();
