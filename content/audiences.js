// "AI career for <background>" landing pages. The recommended roles on each page are not
// hand-picked: scripts/build.js runs the real scoring engine on the `profile` answers below,
// so these pages always agree with what the questionnaire would tell a typical person.
const QUIZ_OK = { quizMath: "12", quizStats: "baseline", quizSystems: "change", quizFraming: "define" };

const AUDIENCES = [
  {
    slug: "software-testers-qa",
    name: "Software testers and QA engineers",
    short: "QA / testers",
    query: "AI career for software testers",
    intro: "Manual and automation testers are some of the people most worried about AI, and also some of the best placed to move into it. Testing AI systems, checking whether an agent actually did its job, and building automated evaluation are QA work with new tools. The fastest moves keep your testing mindset and add Python and LLM skills.",
    tips: [
      "Learn Python first if you only know Java or no language. Most AI tooling is Python-first.",
      "Turn your test-automation experience into AI evaluation: build a small eval suite for a chatbot or agent and put it on GitHub.",
      "Search for 'AI QA engineer', 'LLM evaluation engineer' and 'AI automation engineer'. These titles are growing fast and value testing experience."
    ],
    profile: { background: "it", experience: "3-7", currentRole: "qa", motivation: "outdated", langs: ["java"], pythonLevel: "1", sql: "1", cloud: "1", ml: "1", math: "1", ...QUIZ_OK, workStyle: "automate", interest: ["agents", "build"], bizDomain: "none", goal: "switch", hours: "8", deadline: "6" }
  },
  {
    slug: "java-dotnet-backend-developers",
    name: "Java, .NET and backend developers",
    short: "Backend developers",
    query: "AI career for Java developers",
    intro: "If you build APIs and services in Java, .NET or Node, your skills are not outdated: AI products need exactly that. Agents and LLM features are backend systems that call models, tools and databases. You mostly need to add Python, LLM APIs, retrieval (RAG) and evaluation to what you already do.",
    tips: [
      "You don't need to master machine-learning theory to start. Build one LLM feature end-to-end in Python, such as a RAG service with an evaluation script.",
      "Your strengths are API design, reliability and debugging production systems. Make them visible in your AI projects with retries, observability and cost limits.",
      "Look for an AI feature inside your current company. An internal move is usually the fastest switch."
    ],
    profile: { background: "it", experience: "7-12", currentRole: "backend", motivation: "outdated", langs: ["java", "csharp"], pythonLevel: "1", sql: "2", cloud: "2", ml: "1", math: "1", ...QUIZ_OK, workStyle: "automate", interest: ["agents", "build"], bizDomain: "none", goal: "switch", hours: "8", deadline: "6" }
  },
  {
    slug: "frontend-full-stack-developers",
    name: "Frontend and full-stack developers",
    short: "Frontend / full-stack",
    query: "AI career for frontend developers",
    intro: "Most AI features people actually use, such as chat, search, copilots and summaries, live in a web or mobile UI. Frontend and full-stack developers who can ship these well, with streaming, citations and graceful failure, are in high demand. You keep your stack (React, TypeScript) and add LLM APIs, RAG and evaluation.",
    tips: [
      "Start with the Vercel AI SDK or the Anthropic / OpenAI SDKs in TypeScript, then learn enough Python to read AI examples.",
      "Ship 2–3 small, polished AI features with live URLs. For this role a demo beats a certificate.",
      "UX for AI (handling uncertainty, streaming, feedback buttons) is a real differentiator. Write about it in your project READMEs."
    ],
    profile: { background: "it", experience: "3-7", currentRole: "frontend", motivation: "growth", langs: ["js"], pythonLevel: "0", sql: "1", cloud: "1", ml: "1", math: "1", ...QUIZ_OK, workStyle: "product", interest: ["build"], bizDomain: "none", goal: "switch", hours: "8", deadline: "6" }
  },
  {
    slug: "devops-cloud-engineers",
    name: "DevOps, cloud and SRE engineers",
    short: "DevOps / cloud",
    query: "AI career for DevOps engineers",
    intro: "Running AI in production is an infrastructure problem: GPUs, model serving, autoscaling, cost, monitoring and reliability. DevOps, cloud and SRE engineers already have most of these skills, which makes MLOps / AI platform engineering one of the most direct switches into AI.",
    tips: [
      "Learn the ML basics (training vs inference, model artifacts, evaluation) so you can talk to ML teams in their language.",
      "Serve an open model with vLLM on Kubernetes and add dashboards for latency and cost. That one project covers most interview topics.",
      "Cost optimisation stories (GPU utilisation, caching, batching) are gold in interviews."
    ],
    profile: { background: "it", experience: "7-12", currentRole: "devops", motivation: "outdated", langs: ["python", "go"], pythonLevel: "2", sql: "1", cloud: "3", ml: "1", math: "1", ...QUIZ_OK, workStyle: "systems", interest: ["infra"], bizDomain: "none", goal: "switch", hours: "8", deadline: "6" }
  },
  {
    slug: "data-engineers-analysts",
    name: "Data engineers and BI analysts",
    short: "Data / BI",
    query: "AI career for data analysts",
    intro: "Every AI system depends on data, so data engineers and analysts start much closer to AI than they think. Data engineers can specialise in AI-ready data: feature pipelines, data quality, and document pipelines for RAG. Analysts with good SQL and statistics can move towards ML engineering.",
    tips: [
      "Add Python and Pandas to your SQL if you haven't already. It's the bridge to ML work.",
      "Build a pipeline that feeds a model or a RAG system, not just a dashboard. Show data quality checks and freshness monitoring.",
      "Analysts: your statistics and business sense are a head start for ML evaluation. Learn scikit-learn and model metrics next."
    ],
    profile: { background: "it", experience: "3-7", currentRole: "dataeng", motivation: "growth", langs: ["python"], pythonLevel: "2", sql: "3", cloud: "2", ml: "1", math: "1", ...QUIZ_OK, workStyle: "systems", interest: ["data", "model"], bizDomain: "retail", goal: "switch", hours: "8", deadline: "6" }
  },
  {
    slug: "freshers-mca-bca-graduates",
    name: "Freshers, students and MCA / BCA graduates",
    short: "Freshers / MCA",
    query: "AI career for freshers",
    intro: "Freshers and MCA / BCA / B.Tech graduates can get into AI, but the competition for junior roles is real. The way to stand out is a strong foundation (Python, statistics, SQL, machine learning) proven with two finished projects that have live demos, rather than a long list of certificates.",
    tips: [
      "Pick one path and finish it. Jumping between courses is the most common reason freshers stall.",
      "Build one classic ML project and one LLM project, each with a README, results and a live demo link.",
      "If you already have strong ML projects and Python, take the questionnaire. You may be ready for a direct ML Engineer path."
    ],
    profile: { background: "graduate", experience: "0", motivation: "growth", langs: ["python", "java"], pythonLevel: "1", sql: "1", cloud: "0", ml: "0", math: "1", ...QUIZ_OK, workStyle: "deep", interest: ["model", "build"], bizDomain: "none", goal: "firstjob", hours: "25", deadline: "6" }
  },
  {
    slug: "non-it-professionals",
    name: "Non-IT professionals (finance, healthcare, teaching, operations)",
    short: "Non-IT professionals",
    query: "AI career for non-IT professionals",
    intro: "You don't need to become a programmer to work in AI. Companies need people who understand a business deeply (finance, healthcare, retail, education, operations) and can decide where AI helps, define what good looks like, and lead adoption. Your domain knowledge is the scarce part. The AI literacy can be learned in a few months.",
    tips: [
      "Use AI tools every day in your current job and write down what works. That becomes your first case study.",
      "Learn enough to prototype with no-code tools and prompting, plus basic SQL and metrics.",
      "Target AI Product Manager, AI Business Analyst and AI Transformation roles in your own industry first, where your experience counts most."
    ],
    profile: { background: "nonit", experience: "7-12", motivation: "outdated", langs: ["none"], pythonLevel: "0", sql: "1", cloud: "0", ml: "1", math: "1", ...QUIZ_OK, workStyle: "strategy", interest: ["solutions"], bizDomain: "finance", goal: "switch", hours: "8", deadline: "12" }
  },
  {
    slug: "product-managers-business-analysts",
    name: "Product managers, project managers and business analysts",
    short: "PMs / BAs",
    query: "AI career for product managers",
    intro: "Product managers, project managers and business analysts already do the hardest part of AI product work: understanding users, defining problems and getting teams to deliver. Moving into AI product management means adding AI literacy, hands-on prototyping and the discipline of evaluating AI quality.",
    tips: [
      "Learn how LLMs fail (hallucinations, cost, latency) so you can make good trade-offs, not just write specs.",
      "Prototype ideas yourself with prompting and no-code tools before writing a PRD.",
      "Every AI feature needs an evaluation plan. Learn to write one, because it's the most common gap in AI PM interviews."
    ],
    profile: { background: "it", experience: "7-12", currentRole: "pm", motivation: "company", langs: ["none"], pythonLevel: "0", sql: "2", cloud: "0", ml: "1", math: "1", ...QUIZ_OK, workStyle: "strategy", interest: ["solutions", "build"], bizDomain: "retail", goal: "switch", hours: "8", deadline: "6" }
  },
  {
    slug: "senior-engineers-tech-leads",
    name: "Senior engineers, architects and tech leads (10+ years)",
    short: "Senior engineers",
    query: "AI career for senior software engineers",
    intro: "With 10+ years of experience, starting again as a junior is the wrong move. Your judgement, system design and stakeholder skills are what AI teams lack most. The highest-leverage options are roles that combine engineering depth with customer or business impact, such as forward deployed or solutions engineering, or leading AI platform and product work.",
    tips: [
      "Get hands-on quickly: build and deploy one real LLM integration yourself so you can lead credibly.",
      "Your industry knowledge plus AI is rare. Frame your experience as 'I can take AI from demo to production in X industry'.",
      "Volunteer to lead your company's first serious AI initiative. It's often the fastest route to an AI title."
    ],
    profile: { background: "it", experience: "12+", currentRole: "lead", motivation: "outdated", langs: ["java", "python"], pythonLevel: "2", sql: "2", cloud: "2", ml: "1", math: "1", ...QUIZ_OK, workStyle: "clients", interest: ["solutions", "build"], bizDomain: "healthcare", goal: "switch", hours: "4", deadline: "0" }
  }
];

if (typeof module !== "undefined" && module.exports) module.exports = { AUDIENCES };
