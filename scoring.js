// Scoring engine: turns raw answers into a validated profile, then ranks every role.
// Pure functions only (no DOM) so it runs in the browser and in Node tests.
(function (root) {
  const ROLE_DATA = typeof ROLES !== "undefined" ? ROLES : require("./roles.js").ROLES;
  const QUIZ = typeof QUESTIONS !== "undefined" ? QUESTIONS : require("./questions.js").QUESTIONS;

  const YEARS = { "0": 0.5, "1-3": 2, "3-7": 5, "7-12": 9, "12+": 14 };
  const ENG_ROLES = ["backend", "frontend", "fullstack", "mobile", "dataeng", "devops", "qa", "lead"];
  const BASE_HOURS_PER_WEEK = 10;

  const num = (v, d = 0) => (v === undefined || v === null || v === "" ? d : Number(v));
  const list = v => (Array.isArray(v) ? v : v ? [v] : []);

  // ---------- Profile & validation ----------
  function deriveProfile(a) {
    const notes = [];
    const langs = new Set(list(a.langs).filter(l => l !== "none"));
    let py = num(a.pythonLevel);
    let ml = num(a.ml);
    let math = num(a.math);
    const quiz = {};
    QUIZ.filter(q => q.quiz).forEach(q => {
      const v = a[q.id];
      quiz[q.quiz] = !v || v === "skip" ? null : v === q.correct;
    });

    // Consistency checks between related answers
    if (py >= 1) langs.add("python");
    if (langs.has("python") && py === 0) {
      py = 1;
      notes.push("You listed Python as a language but rated it 'None' — we treated your Python as Basic.");
    }
    const codes = langs.size > 0;
    if (!codes && ml >= 3) {
      ml = 2;
      notes.push("Training ML models normally needs some programming, and you didn't list a language — we treated your ML experience as 'built with AI tools/APIs'.");
    }
    if (quiz.math === false && math === 2) {
      math = 1;
      notes.push("You rated your maths as strong but missed the averages question — we used 'Okay' to be safe. A quick refresher will close this.");
    } else if (quiz.math === true && math === 0) {
      math = 0.5;
      notes.push("You rated your maths as weak but solved the averages question — you may be stronger than you think.");
    }
    if (quiz.stats === false && ml >= 3) {
      notes.push("You've trained models but the accuracy question tripped you up — we added evaluation metrics (precision/recall, baselines) to your gaps.");
    }

    const bg = a.background;
    const years = bg === "student" ? 0 : (YEARS[a.experience] ?? 0);
    let current = a.currentRole;
    if (bg === "aiml") current = "aiml";
    else if (bg !== "it" && bg !== "break") current = "nonit";

    const p = {
      bg, years, current, langs, codes, py, ml, math, quiz, notes,
      sql: num(a.sql), cloud: num(a.cloud),
      seniority: years >= 7 ? "senior" : years >= 3 ? "mid" : "entry",
      isEng: ENG_ROLES.includes(current),
      interests: new Set(list(a.interest)),
      work: a.workStyle,
      biz: a.bizDomain && a.bizDomain !== "none" ? a.bizDomain : null,
      goal: a.goal,
      motivation: a.motivation,
      hours: num(a.hours, BASE_HOURS_PER_WEEK),
      deadline: num(a.deadline),
      currentAiRole: bg === "aiml" ? a.currentAiRole : null,
      evalGap: quiz.stats === false
    };
    return p;
  }

  // ---------- Role signals ----------
  // Each signal: [weight, test(profile) -> 0..1, reason]. Negative weights are watch-outs.
  const has = (p, i) => p.interests.has(i);
  const SIGNALS = {
    "ai-fresher": [
      [6, p => (!p.codes ? 1 : p.py <= 1 && !p.isEng ? 0.6 : 0), "You're early in coding, so a strong foundation is the fastest route"],
      [5, p => (p.bg === "student" || p.bg === "graduate" ? 1 : 0), "As a student / graduate, a structured foundation path gets you job-ready"],
      [3, p => (p.goal === "firstjob" ? 1 : 0), "Your goal is a first job in tech — this path targets junior AI roles"],
      [2, p => (p.years < 1 ? 1 : 0), "Little work experience yet — the foundations matter most"],
      [2, p => (p.ml <= 1 ? 1 : 0), "You're new to ML, so we start from the basics"],
      [-7, p => (p.isEng && p.years >= 3 ? 1 : 0), "You already have engineering experience — a beginner path would waste it"],
      [-6, p => (p.ml >= 3 ? 1 : 0), "You already train models — you're past the foundations"],
      [-3, p => (p.py >= 2 && p.sql >= 2 ? 1 : 0), "Your Python and SQL are already solid"],
      [-4, p => (p.years >= 7 ? 1 : 0), "With your years of experience, a role that uses it will pay off faster than starting as a junior"]
    ],
    "ml-engineer": [
      [4, p => (p.ml === 3 ? 1 : p.ml === 4 ? 0.8 : p.ml === 2 ? 0.3 : 0), "You've already trained ML models"],
      [3, p => (p.py >= 2 ? 1 : p.py === 1 ? 0.3 : 0), "Your Python is at a working level"],
      [3, p => (p.math >= 2 ? 1 : p.math >= 1 ? 0.6 : 0), "Your maths comfort supports model work"],
      [4, p => (has(p, "model") ? 1 : 0), "You're excited by training and tuning models"],
      [2, p => (has(p, "data") ? 1 : 0), "You enjoy working with data"],
      [3, p => (p.work === "deep" ? 1 : p.work === "product" ? 0.5 : 0), "You like deep technical problem-solving"],
      [3, p => (["backend", "fullstack", "analyst", "dataeng"].includes(p.current) ? 1 : 0), "Your current work transfers well to building ML systems"],
      [2, p => (p.quiz.stats ? 1 : 0), "You spotted the accuracy trap — good ML intuition"],
      [-4, p => (p.py === 0 ? 1 : 0), "ML Engineering needs solid Python, which you're starting from zero"],
      [-3, p => (p.math === 0 ? 1 : 0), "ML Engineering needs comfortable statistics"]
    ],
    "data-engineer-ai": [
      [7, p => (p.current === "dataeng" ? 1 : p.current === "analyst" ? 0.6 : p.current === "backend" ? 0.2 : 0), "You already work with data pipelines / analytics — a direct bridge"],
      [4, p => (p.sql >= 3 ? 1 : p.sql === 2 ? 0.7 : 0), "Your SQL is strong"],
      [5, p => (has(p, "data") ? 1 : 0), "You enjoy working with data"],
      [3, p => (p.work === "systems" ? 1 : 0), "You like building reliable systems"],
      [1, p => (p.py >= 1 ? 1 : 0), "You have Python to build on"],
      [1, p => (p.quiz.systems ? 1 : 0), "You think about upstream data changes first"],
      [-4, p => (p.sql === 0 ? 1 : 0), "Data engineering is SQL-heavy and you're new to it"]
    ],
    "ai-product-engineer": [
      [6, p => (["frontend", "fullstack"].includes(p.current) ? 1 : p.current === "mobile" ? 0.8 : p.current === "backend" ? 0.4 : 0), "You already build apps — AI features are the next layer"],
      [3, p => (p.langs.has("js") ? 1 : 0), "JavaScript / TypeScript is the main stack for AI product UIs"],
      [5, p => (has(p, "build") ? 1 : 0), "You want to add AI features to apps"],
      [5, p => (p.work === "product" ? 1 : 0), "You love building things people use"],
      [2, p => (p.ml === 1 || p.ml === 2 ? 1 : 0), "You've already used or built with LLMs"],
      [2, p => (p.goal === "upskill" || p.goal === "freelance" ? 1 : 0), "It fits your goal of using AI in your work or own products"],
      [1, p => (p.math <= 1 ? 1 : 0), "It needs little advanced maths"],
      [-4, p => (!p.codes ? 1 : 0), "This is a coding role and you don't code yet"]
    ],
    "mlops-engineer": [
      [8, p => (p.current === "devops" ? 1 : p.current === "support" ? 0.4 : p.current === "backend" ? 0.3 : 0), "Your DevOps / operations background transfers almost directly"],
      [5, p => (p.cloud >= 3 ? 1 : p.cloud === 2 ? 0.6 : p.cloud === 1 ? 0.2 : 0), "You already have cloud and deployment skills"],
      [5, p => (has(p, "infra") ? 1 : 0), "You're interested in AI infrastructure"],
      [5, p => (p.work === "systems" ? 1 : 0), "You like making systems reliable at scale"],
      [2, p => (p.quiz.systems ? 1 : 0), "You checked what changed first — classic ops instinct"],
      [2, p => (p.ml >= 4 ? 1 : 0), "You've shipped ML to production"],
      [-4, p => (p.cloud === 0 && p.current !== "devops" ? 1 : 0), "MLOps is infrastructure-heavy and you haven't deployed to cloud yet"]
    ],
    "llm-agent-engineer": [
      [6, p => (has(p, "agents") ? 1 : 0), "Autonomous agents excite you"],
      [5, p => (p.work === "automate" ? 1 : 0), "You want to automate real work with AI"],
      [4, p => (p.ml === 2 ? 1 : p.ml === 1 ? 0.3 : p.ml >= 3 ? 0.5 : 0), "You've already built with LLM APIs"],
      [3, p => (p.py >= 2 ? 1 : p.py === 1 ? 0.4 : 0), "Your Python is ready for agent frameworks"],
      [4, p => (p.current === "backend" ? 1 : ["fullstack", "qa", "lead"].includes(p.current) ? 0.5 : 0), "Backend / automation experience is exactly what makes agents reliable"],
      [1, p => (has(p, "build") ? 1 : 0), "You like building AI features"],
      [-5, p => (!p.codes ? 1 : 0), "Agent engineering is a coding role and you don't code yet"]
    ],
    "ai-research-engineer": [
      [5, p => (p.math >= 2 ? 1 : 0), "Your maths is strong"],
      [6, p => (p.ml === 5 ? 1 : p.ml === 4 ? 0.5 : p.ml === 3 ? 0.4 : 0), "You already have hands-on model training experience"],
      [5, p => (has(p, "model") ? 1 : 0), "You're excited by how models learn"],
      [5, p => (p.work === "deep" ? 1 : 0), "You love deep technical problems"],
      [2, p => (p.quiz.math ? 1 : 0), "You solved the maths question"],
      [2, p => (p.quiz.stats ? 1 : 0), "You spotted the accuracy trap"],
      [2, p => (p.py >= 3 ? 1 : 0), "Your Python is advanced"],
      [-6, p => (p.math < 1 ? 1 : 0), "Research roles need strong maths, which you rated as weak"],
      [-4, p => (p.py <= 1 ? 1 : 0), "Research engineering needs advanced Python"],
      [-2, p => (p.ml < 4 ? 1 : 0), "Research roles are highly selective — expect to need published or reproduced research work"]
    ],
    "ai-forward-deployed-engineer": [
      [7, p => (p.work === "clients" ? 1 : 0), "You enjoy solving customers' problems hands-on"],
      [5, p => (has(p, "solutions") ? 1 : 0), "You care about business impact"],
      [4, p => (p.biz ? 1 : 0), "Your industry knowledge is a big advantage with clients"],
      [4, p => (p.seniority === "senior" ? 1 : p.seniority === "mid" ? 0.5 : 0), "Your years of experience build client trust"],
      [3, p => (p.current === "lead" ? 1 : ["backend", "fullstack", "devops", "dataeng"].includes(p.current) ? 0.5 : 0), "You've designed or built real systems"],
      [2, p => (p.quiz.framing ? 1 : 0), "You framed the business problem before reaching for tech"],
      [2, p => (p.py >= 2 ? 1 : p.codes ? 0.5 : 0), "You can write the code to deliver solutions"],
      [-5, p => (!p.codes ? 1 : 0), "Forward deployed roles need hands-on coding"],
      [-2, p => (p.years < 1 ? 1 : 0), "Client-facing roles usually want some work experience first"]
    ],
    "ai-product-manager": [
      [8, p => (p.current === "pm" ? 1 : p.current === "lead" ? 0.4 : 0), "You already manage products, projects or requirements"],
      [6, p => (p.work === "strategy" ? 1 : p.work === "clients" ? 0.3 : 0), "You like deciding what to build and why"],
      [4, p => (p.bg === "nonit" ? 1 : 0), "Domain experts from outside IT make strong AI PMs"],
      [3, p => (p.biz ? 1 : 0), "Your industry knowledge helps you find the right AI use cases"],
      [3, p => (p.quiz.framing ? 1 : 0), "You framed the business problem before reaching for tech"],
      [3, p => (has(p, "solutions") ? 1 : 0), "You care about business impact"],
      [2, p => (!p.codes ? 1 : 0), "This role does not require heavy coding"],
      [2, p => (p.seniority === "senior" ? 1 : p.seniority === "mid" ? 0.5 : 0), "Your experience leading work transfers"],
      [-3, p => (p.years < 1 && p.bg !== "nonit" ? 1 : 0), "PM roles usually want some work experience first"]
    ]
  };

  // Highest score a role can reach (sum of positive weights). Used to express fit as a %.
  const ROLE_MAX = {};
  Object.entries(SIGNALS).forEach(([id, sigs]) => {
    ROLE_MAX[id] = sigs.reduce((s, [w]) => s + Math.max(0, w), 0);
  });

  // ---------- Readiness, gaps & timeline ----------
  const SKILL_LABEL = { py: "Python", sql: "SQL & data", cloud: "Cloud & deployment", ml: "AI / ML hands-on", math: "Maths & statistics" };
  const LEVEL_MAX = { py: 3, sql: 3, cloud: 3, ml: 5, math: 2 };
  const GAP_ADVICE = {
    py: "Get to a comfortable Python level (functions, Pandas, small apps). CS50P and Kaggle Learn are free and fast.",
    sql: "Learn SQL JOINs and GROUP BY on real datasets — SQLBolt and Mode's tutorial take a couple of weeks.",
    cloud: "Deploy something yourself: Docker + a free-tier cloud service. It makes everything you build demo-able.",
    ml: "Build something real with AI: start with an LLM API project, then train a simple scikit-learn model.",
    math: "Refresh statistics and linear algebra — Khan Academy and 3Blue1Brown are free and visual."
  };

  function readiness(p, role) {
    const req = role.requires || {};
    const keys = Object.keys(req);
    if (!keys.length) return { pct: 100, gaps: [] };
    let total = 0;
    const gaps = [];
    keys.forEach(k => {
      const need = req[k], have = p[k];
      total += Math.min(1, have / need);
      if (have < need) gaps.push({ key: k, label: SKILL_LABEL[k], have, need, max: LEVEL_MAX[k], advice: GAP_ADVICE[k] });
    });
    gaps.sort((x, y) => (y.need - y.have) / y.max - (x.need - x.have) / x.max);
    if (p.evalGap && !gaps.some(g => g.key === "ml")) {
      gaps.push({ key: "eval", label: "Model evaluation", advice: "Learn why accuracy misleads on imbalanced data: baselines, precision, recall and F1." });
    }
    return { pct: Math.round((100 * total) / keys.length), gaps };
  }

  function parseWeeks(t) {
    const m = String(t).match(/(\d+)(?:\s*-\s*(\d+))?\s*week/);
    if (!m) return null;
    const lo = Number(m[1]), hi = Number(m[2] || m[1]);
    return (lo + hi) / 2;
  }

  // Personalised plan: fast-track steps the learner already knows and scale to their weekly hours.
  function plan(p, role) {
    let weeks = 0;
    const steps = role.roadmap.map(s => {
      const base = parseWeeks(s.time);
      const fast = !!s.fastTrack && Object.entries(s.fastTrack).every(([k, lvl]) => p[k] >= lvl);
      const w = base === null ? null : fast ? Math.max(0.5, base * 0.25) : base;
      if (w) weeks += w;
      return { ...s, fast, studyWeeks: w };
    });
    const studyHours = weeks * BASE_HOURS_PER_WEEK;
    const calendarWeeks = Math.ceil(studyHours / Math.max(1, p.hours));
    const months = Math.round((calendarWeeks / 4.33) * 10) / 10;
    return { steps, studyHours: Math.round(studyHours), calendarWeeks, months };
  }

  // ---------- Ranking ----------
  function rankRoles(answers) {
    const p = deriveProfile(answers);
    const results = Object.keys(SIGNALS).map(id => {
      let score = 0;
      const reasons = [], cautions = [];
      SIGNALS[id].forEach(([w, test, why]) => {
        const f = test(p);
        if (!f) return;
        score += w * f;
        if (w > 0 && w * f >= 2) reasons.push({ why, pts: w * f });
        if (w < 0) cautions.push(why);
      });
      reasons.sort((x, y) => y.pts - x.pts);
      // A near-perfect profile hits ~70% of all possible signals, so treat that as a full match.
      let fit = Math.round((100 * Math.max(0, score)) / (ROLE_MAX[id] * 0.7));
      fit = Math.max(5, Math.min(96, fit));
      if (p.currentAiRole === id) {
        fit = Math.round(fit * 0.4);
        cautions.unshift("You're already in this role and want a change, so we ranked it lower");
      }
      const role = ROLE_DATA[id];
      const r = readiness(p, role);
      return { id, score, fit, reasons: reasons.map(x => x.why), cautions, readiness: r.pct, gaps: r.gaps, plan: plan(p, role) };
    });
    results.sort((x, y) => y.fit - x.fit || y.score - x.score);
    return { profile: p, results };
  }

  // Transferable strengths shown on the result page
  const TRANSFER = {
    backend: "API design, databases and production debugging — the backbone of LLM apps and agents",
    frontend: "UI engineering — AI features live or die on UX (streaming, uncertainty, feedback)",
    fullstack: "End-to-end delivery — you can ship a complete AI feature on your own",
    mobile: "App development — on-device and mobile AI features are a growing niche",
    dataeng: "Data pipelines — every AI system depends on clean, fresh data",
    analyst: "SQL, analysis and metrics — the base of ML and AI evaluation",
    devops: "Cloud, CI/CD and reliability — exactly what AI platforms need",
    qa: "Testing mindset — AI evaluation is essentially testing non-deterministic systems",
    support: "Production operations and troubleshooting — valuable for MLOps and AI support engineering",
    pm: "Requirements, prioritisation and delivery — the core of AI product work",
    lead: "System design and leadership — AI teams badly need people who can make architecture calls",
    aiml: "Hands-on AI experience — you can pivot sideways much faster than someone starting out"
  };
  const BIZ_LABEL = { finance: "finance", healthcare: "healthcare", retail: "retail / e-commerce", logistics: "logistics / manufacturing", other: "your industry" };

  function strengths(p) {
    const out = [];
    if (TRANSFER[p.current]) out.push(TRANSFER[p.current]);
    if (p.biz) out.push(`Knowledge of ${BIZ_LABEL[p.biz]} — industry AI roles value it highly`);
    if (p.seniority === "senior") out.push(`${p.years}+ years of experience — judgement, communication and ownership transfer to any AI role`);
    if (p.py >= 2) out.push("Working Python — the main language of AI");
    if (p.cloud >= 2) out.push("Cloud and deployment skills — rare among AI learners");
    if (p.sql >= 2) out.push("Solid SQL — data skills underpin all AI work");
    if (p.ml >= 2) out.push("Hands-on AI building experience already");
    const q = p.quiz;
    const correct = Object.values(q).filter(v => v === true).length;
    if (correct >= 3) out.push(`Strong reasoning — you got ${correct} of 4 check questions right`);
    if (p.bg === "nonit" && !out.length) out.push("A fresh perspective from outside IT — domain experts are needed to make AI useful");
    if (!out.length) out.push("Motivation to learn — the most important ingredient at the start");
    return out;
  }

  const api = { deriveProfile, rankRoles, readiness, plan, strengths, parseWeeks, SIGNALS, ROLE_MAX };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Scoring = api;
})(this);
