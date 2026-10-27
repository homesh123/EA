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
  { id: "interest", q: "What part of AI excites you?", multi: true, clarify: "Select all that apply — you can pick more than one.",
    options: [
      { value: "build", label: "Building AI features", desc: "Adding AI into apps/products" },
      { value: "model", label: "Training / tuning models", desc: "Teaching computers to learn" },
      { value: "data", label: "Working with data", desc: "Cleaning and analyzing data" },
      { value: "agents", label: "Autonomous agents", desc: "AI that plans and acts on its own" },
      { value: "infra", label: "AI infrastructure", desc: "Running AI systems reliably at scale" },
      { value: "solutions", label: "Client solutions", desc: "Solving real business problems with AI" }
    ]},
  { id: "goal", q: "What do you want to achieve?", clarify: "This decides whether we aim for a full switch or a side path.",
    options: [
      { value: "switch", label: "Switch into an AI role", desc: "Move fully into AI/ML" },
      { value: "upskill", label: "Upskill in current role", desc: "Add AI to my existing job" },
      { value: "freelance", label: "Freelance / side projects", desc: "Build AI products on the side" },
      { value: "start", label: "Start from scratch", desc: "Enter the field for the first time" }
    ]},
  { id: "aiRoleComfort", q: "Are you already in an AI role? If yes, how comfortable are you?", clarify: "If youre already in AI but unhappy, we can find a better-fit role.",
    options: [
      { value: "none", label: "Not in AI yet", desc: "Im new to AI or not working in AI" },
      { value: "comfortable", label: "Comfortable", desc: "Im happy in my current AI role" },
      { value: "uncomfortable", label: "Not comfortable", desc: "Im in AI but want to switch to a different AI role" }
    ]},
  { id: "pythonLevel", q: "What is your Python comfort level?", clarify: "Python is the #1 language for AI. Be honest — this shapes your starting point.",
    options: [
      { value: "none", label: "None", desc: "I don't know Python yet" },
      { value: "basic", label: "Basic", desc: "Variables, loops, functions" },
      { value: "comfortable", label: "Comfortable", desc: "Pandas, NumPy, data manipulation" },
      { value: "advanced", label: "Advanced", desc: "Classes, decorators, packaging, virtual environments" }
    ]},
  { id: "cloud", q: "What cloud experience do you have?", clarify: "Cloud skills matter for AI Platform / MLOps roles.",
    options: [
      { value: "none", label: "None", desc: "I haven't used cloud platforms" },
      { value: "basic", label: "Basic", desc: "I've used AWS/Azure/GCP console briefly" },
      { value: "comfortable", label: "Comfortable", desc: "EC2, S3, IAM, basic deployment" },
      { value: "advanced", label: "Advanced", desc: "Kubernetes, Terraform, CI/CD, serverless" }
    ]},
  { id: "db", q: "What is your database experience?", clarify: "Data skills are critical for Data Engineer and AI Product roles.",
    options: [
      { value: "none", label: "None", desc: "No database experience" },
      { value: "basic", label: "Basic", desc: "Simple SQL queries (SELECT, WHERE)" },
      { value: "comfortable", label: "Comfortable", desc: "JOINs, aggregations, schema design" },
      { value: "advanced", label: "Advanced", desc: "Optimization, partitioning, NoSQL, data warehouses" }
    ]},
  { id: "bizDomain", q: "What business domain do you know best?", clarify: "Domain expertise + AI = high-value roles (FinTech AI, HealthTech AI, etc.).",
    options: [
      { value: "none", label: "None / General", desc: "No specific domain expertise" },
      { value: "finance", label: "Finance / Accounting", desc: "Banking, auditing, financial analysis" },
      { value: "healthcare", label: "Healthcare", desc: "Hospitals, clinics, medical data" },
      { value: "retail", label: "Retail / E-commerce", desc: "Online stores, inventory, sales" },
      { value: "logistics", label: "Logistics / Supply Chain", desc: "Shipping, warehousing, transportation" },
      { value: "other", label: "Other", desc: "Manufacturing, education, real estate, etc." }
    ]},
  { id: "learnStyle", q: "How do you prefer to learn?", clarify: "This helps shape the recommended resources.",
    options: [
      { value: "self", label: "Self-paced", desc: "Free tutorials, documentation, practice projects" },
      { value: "structured", label: "Structured courses", desc: "Coursera, Udemy, bootcamps with syllabus" },
      { value: "mixed", label: "Mix of both", desc: "Courses + hands-on projects" }
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
  const interests = Array.isArray(interest) ? interest : (interest ? [interest] : []);

  if (ml === "none") { add("ml-engineer", 2); add("ai-product-engineer", 3); add("llm-agent-engineer", 2); }
  if (ml === "use") { add("ai-product-engineer", 3); add("llm-agent-engineer", 3); add("ml-engineer", 2); }
  if (ml === "basic") { add("ml-engineer", 3); add("ai-research-engineer", 2); add("mlops-engineer", 1); }
  if (ml === "adv") { add("ai-research-engineer", 3); add("mlops-engineer", 3); add("ml-engineer", 2); }

  if (interests.includes("build")) { add("ai-product-engineer", 3); add("llm-agent-engineer", 2); }
  if (interests.includes("model")) { add("ai-research-engineer", 3); add("ml-engineer", 2); }
  if (interests.includes("data")) { add("data-engineer-ai", 3); add("ml-engineer", 1); }
  if (interests.includes("agents")) { add("llm-agent-engineer", 3); add("ai-product-engineer", 1); }
  if (interests.includes("infra")) { add("mlops-engineer", 3); add("data-engineer-ai", 1); }
  if (interests.includes("solutions")) { add("ai-forward-deployed-engineer", 3); add("ai-product-engineer", 1); }

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

  // New question scoring
  if (state.answers.pythonLevel === "python" || state.answers.pythonLevel === "comfortable" || state.answers.pythonLevel === "advanced") add("ml-engineer", 1); add("data-engineer-ai", 1); add("ai-research-engineer", 1);
  if (state.answers.pythonLevel === "basic") add("ai-product-engineer", 1); add("llm-agent-engineer", 1);
  if (state.answers.pythonLevel === "none") { add("ai-product-engineer", 1); add("ai-fresher", 1); }

  if (state.answers.cloud === "advanced") { add("mlops-engineer", 2); add("ai-research-engineer", 1); }
  if (state.answers.cloud === "comfortable") add("mlops-engineer", 1);
  if (state.answers.cloud === "basic") add("mlops-engineer", 1);

  if (state.answers.db === "advanced") { add("data-engineer-ai", 2); add("ml-engineer", 1); }
  if (state.answers.db === "comfortable") add("data-engineer-ai", 1);

  if (state.answers.bizDomain === "finance" || state.answers.bizDomain === "healthcare" || state.answers.bizDomain === "retail" || state.answers.bizDomain === "logistics") { add("ai-forward-deployed-engineer", 2); add("ai-product-engineer", 1); }

  if (state.answers.learnStyle === "structured") { /* lighter self-paced load */ }

  // AI role comfort scoring
  if (state.answers.aiRoleComfort === "uncomfortable") {
    add("ai-product-engineer", 2);
    add("ai-forward-deployed-engineer", 2);
    add("mlops-engineer", 1);
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return sorted.slice(0, 2).map(s => s[0]);
}

const state = { answers: {}, step: 0 };

function parseWeeks(s) {
  const m = s.match(/(\d+)-(\d+)/);
  return m ? [parseInt(m[1]), parseInt(m[2])] : [0, 0];
}

function totalWeeks(roadmap) {
  let lo = 0, hi = 0;
  roadmap.forEach(r => {
    const [a, b] = parseWeeks(r.time);
    lo += a; hi += b;
  });
  return [lo, hi];
}

function fmtDuration(weeks) {
  const w = Math.round((weeks[0] + weeks[1]) / 2);
  if (w < 6) return w + " weeks";
  const months = w / 4.3;
  if (months < 12) return months.toFixed(1) + " months";
  return (months / 12).toFixed(1) + " years";
}

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
  const current = state.answers[q.id];
  const selectedSet = q.multi ? new Set(Array.isArray(current) ? current : (current ? [current] : [])) : null;
  q.options.forEach(opt => {
    const div = document.createElement("div");
    const sel = q.multi ? selectedSet.has(opt.value) : (current === opt.value);
    div.className = "option" + (sel ? " selected" : "");
    div.innerHTML = `<div class="dot"></div><div><div class="opt-text">${opt.label}</div><div class="opt-desc">${opt.desc}</div></div>`;
    div.addEventListener("click", () => {
      if (q.multi) {
        let arr = Array.isArray(current) ? [...current] : (current ? [current] : []);
        const idx = arr.indexOf(opt.value);
        if (idx >= 0) arr.splice(idx, 1); else arr.push(opt.value);
        state.answers[q.id] = arr;
      } else {
        state.answers[q.id] = opt.value;
      }
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
  next.textContent = state.step === QUESTIONS.length - 1 ? "Find my exact path" : "Next";
  const val = state.answers[q.id];
  const hasAnswer = q.multi ? (Array.isArray(val) && val.length > 0) : !!val;
  next.disabled = !hasAnswer;
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
  intro.textContent = "Based on your experience, abilities, and interests, here is your exact AI career path:";
  form.appendChild(intro);

  roles.forEach(roleId => {
    const role = ROLES[roleId];
    const [lo, hi] = totalWeeks(role.roadmap);
    const totalLabel = fmtDuration([lo, hi]);
    const steps = role.roadmap.map(r => `
      <li>
        <strong>Step ${r.step} — ${r.title}</strong>
        <span class="step-time">⏱ ${r.time}</span>
        <div class="step-what">${r.what}</div>
        <div class="step-why"><em>Why this matters:</em> This is a core skill for the role. Mastering it gives you the ability employers look for.</div>
        <div class="step-sources"><strong>Learn from:</strong> ${r.sources}</div>
        <div class="step-seq"><strong>Do it when:</strong> ${r.sequence}</div>
      </li>`).join("");
    const card = document.createElement("div");
    card.className = "role-card result";
    card.innerHTML = `
      <h2>${role.title}</h2>
      <p class="total-time">Total estimated learning time: <strong>${totalLabel}</strong> (approx. ${lo}–${hi} weeks)</p>
      <p class="why">${role.why}</p>
      <div class="skill-list">${role.skills.map(s => `<span class="skill">${s}</span>`).join("")}</div>
      <div class="roadmap"><strong>Step-by-step roadmap (follow in this exact order):</strong><ol>${steps}</ol></div>
    `;
    form.appendChild(card);
  });

  const note = document.createElement("p");
  note.style.color = "var(--muted)";
  note.style.fontSize = "13px";
  note.style.marginTop = "16px";
  note.textContent = "Tip: Follow the roadmap in order — each step builds the ability needed for the next. Build at least one portfolio project before applying.";
  form.appendChild(note);

  // Gap analysis based on answers
  const gapDiv = document.createElement("div");
  gapDiv.style.marginTop = "20px";
  gapDiv.style.padding = "16px";
  gapDiv.style.background = "rgba(255,255,255,.04)";
  gapDiv.style.borderRadius = "10px";
  gapDiv.style.borderLeft = "4px solid var(--accent2)";
  
  const gaps = [];
  if (state.answers.lang === "none" || state.answers.lang === "java" || state.answers.lang === "csharp" || state.answers.lang === "cpp") gaps.push("<strong>Learn Python first:</strong> Python is the #1 language in AI. Most ML/LLM libraries are Python-first. Start with CS50P or freeCodeCamp Python.");
  if (state.answers.math === "weak") gaps.push("<strong>Refresh math:</strong> Linear algebra, statistics, and calculus are needed to understand how models work. Khan Academy and 3Blue1Brown are free.");
  if (state.answers.ml === "none") gaps.push("<strong>Start with classic ML:</strong> Before LLMs, learn supervised learning (regression/classification) and evaluation metrics.");
  if (state.answers.lang === "js" && state.answers.domain === "frontend") gaps.push("<strong>Leverage your frontend:</strong> AI Product Engineer is a strong fit — embed LLM features into web apps using JavaScript/TypeScript.");
  if (state.answers.domain === "backend" || state.answers.domain === "devops") gaps.push("<strong>Leverage your backend:</strong> AI Platform/MLOps Engineer fits well — focus on model serving, Kubernetes, and observability.");
  if (state.answers.experience === "5-10" || state.answers.experience === "10+") gaps.push("<strong>Consider AI Forward Deployed Engineer:</strong> With your experience, client-facing AI roles (OpenAI, Anthropic hire these) value domain knowledge + communication.");
  if (state.answers.aiRoleComfort === "uncomfortable") gaps.push("<strong>Already in AI but unhappy?</strong> Consider switching to AI Product Engineer (build AI features), AI Forward Deployed Engineer (client-facing solutions), or MLOps Engineer (infrastructure). Your AI experience is valuable—just need to pivot to a better-fit role.");
  
  gapDiv.innerHTML = "<strong style='color:var(--accent2)'>⚡ Gap analysis &amp; next steps:</strong><ul>" + gaps.map(g => "<li>" + g + "</li>").join("") + "</ul>";
  form.appendChild(gapDiv);

  document.getElementById("progressFill").style.width = "100%";
}

renderForm();

  // Market insights section
  const marketDiv = document.createElement("div");
  marketDiv.style.marginTop = "24px";
  marketDiv.style.padding = "20px";
  marketDiv.style.background = "linear-gradient(180deg,#fdfbf7,#f9f5ea)";
  marketDiv.style.border = "1px solid #e5d8c9";
  marketDiv.style.borderRadius = "12px";
  marketDiv.style.boxShadow = "var(--shadow)";

  const marketHTML =
    '<h3 style="font-size:1rem;font-weight:700;margin:0 0 12px;color:#1d1d1f;text-transform:uppercase;letter-spacing:0.5px;">Market Insights — AI Roles & Salaries (2026)</h3>' +
    '<p style="color:#86868b;font-size:0.875rem;margin-bottom:12px;">Based on data from Levels.fyi, Glassdoor, and job postings at Google, Meta, Amazon, Apple, NVIDIA, Microsoft, OpenAI, Anthropic:</p>' +
    '<div style="display:flex;flex-wrap:wrap;gap:16px;">' +
    '<div style="flex:1;min-width:200px;background:#fff;border:1px solid var(--border);border-radius:10px;padding:16px;">' +
    '<h4 style="margin:0 0 8px;font-size:0.9rem;color:#1d1d1f;">ML Engineer</h4>' +
    '<p style="font-size:0.85rem;color:#86868b;margin-bottom:8px;"><strong>Big Tech:</strong> $280k–$400k TC</p>' +
    '<p style="font-size:0.85rem;color:#86868b;margin-bottom:8px;"><strong>Startups:</strong> $180k–$300k TC</p>' +
    '<p style="font-size:0.85rem;color:#86868b;"><strong>Key skills:</strong> Python, PyTorch, MLOps, system design</p>' +
    '</div>' +
    '<div style="flex:1;min-width:200px;background:#fff;border:1px solid var(--border);border-radius:10px;padding:16px;">' +
    '<h4 style="margin:0 0 8px;font-size:0.9rem;color:#1d1d1f;">AI Product Engineer</h4>' +
    '<p style="font-size:0.85rem;color:#86868b;margin-bottom:8px;"><strong>Big Tech:</strong> $250k–$350k TC</p>' +
    '<p style="font-size:0.85rem;color:#86868b;margin-bottom:8px;"><strong>Startups:</strong> $160k–$260k TC</p>' +
    '<p style="font-size:0.85rem;color:#86868b;"><strong>Key skills:</strong> LLM APIs, RAG, JavaScript, prompt engineering</p>' +
    '</div>' +
    '<div style="flex:1;min-width:200px;background:#fff;border:1px solid var(--border);border-radius:10px;padding:16px;">' +
    '<h4 style="margin:0 0 8px;font-size:0.9rem;color:#1d1d1f;">MLOps / AI Platform</h4>' +
    '<p style="font-size:0.85rem;color:#86868b;margin-bottom:8px;"><strong>Big Tech:</strong> $260k–$380k TC</p>' +
    '<p style="font-size:0.85rem;color:#86868b;margin-bottom:8px;"><strong>Startups:</strong> $170k–$280k TC</p>' +
    '<p style="font-size:0.85rem;color:#86868b;"><strong>Key skills:</strong> Kubernetes, CI/CD, model serving, observability</p>' +
    '</div>' +
    '<div style="flex:1;min-width:200px;background:#fff;border:1px solid var(--border);border-radius:10px;padding:16px;">' +
    '<h4 style="margin:0 0 8px;font-size:0.9rem;color:#1d1d1f;">LLM / Agent Engineer</h4>' +
    '<p style="font-size:0.85rem;color:#86868b;margin-bottom:8px;"><strong>Big Tech:</strong> $300k–$450k TC</p>' +
    '<p style="font-size:0.85rem;color:#86868b;margin-bottom:8px;"><strong>Startups:</strong> $200k–$350k TC</p>' +
    '<p style="font-size:0.85rem;color:#86868b;"><strong>Key skills:</strong> LangChain/LangGraph, vector DBs, agent frameworks</p>' +
    '</div>' +
    '<div style="flex:1;min-width:200px;background:#fff;border:1px solid var(--border);border-radius:10px;padding:16px;">' +
    '<h4 style="margin:0 0 8px;font-size:0.9rem;color:#1d1d1f;">AI Forward Deployed</h4>' +
    '<p style="font-size:0.85rem;color:#86868b;margin-bottom:8px;"><strong>Big Tech:</strong> $250k–$400k TC</p>' +
    '<p style="font-size:0.85rem;color:#86868b;margin-bottom:8px;"><strong>Startups:</strong> $170k–$280k TC</p>' +
    '<p style="font-size:0.85rem;color:#86868b;"><strong>Key skills:</strong> Client solutions, LLM integration, data engineering</p>' +
    '</div>' +
    '<div style="flex:1;min-width:200px;background:#fff;border:1px solid var(--border);border-radius:10px;padding:16px;">' +
    '<h4 style="margin:0 0 8px;font-size:0.9rem;color:#1d1d1f;">AI Research Engineer</h4>' +
    '<p style="font-size:0.85rem;color:#86868b;margin-bottom:8px;"><strong>Big Tech:</strong> $350k–$600k TC</p>' +
    '<p style="font-size:0.85rem;color:#86868b;margin-bottom:8px;"><strong>Startups:</strong> $220k–$380k TC</p>' +
    '<p style="font-size:0.85rem;color:#86868b;"><strong>Key skills:</strong> PyTorch, deep learning, research papers, fine-tuning</p>' +
    '</div>' +
    '</div>' +
    '<p style="font-size:0.8rem;color:#aeaeb2;margin-top:12px;">Sources: Levels.fyi, Glassdoor, company H-1B filings, job postings. Salaries are total compensation (base + equity + bonus) for US roles.</p>' +
    '</div>';
  form.appendChild(marketDiv);
