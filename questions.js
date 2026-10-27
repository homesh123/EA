// Questionnaire definition. Questions are grouped into sections; `showIf` hides
// questions that do not apply (e.g. "current role" for students). `quiz` marks the
// short reasoning check used to validate self-ratings; `correct` is never shown.
const SECTIONS = {
  about: "About you",
  skills: "Your skills today",
  check: "Quick reasoning check",
  style: "How you like to work",
  goals: "Goals & time"
};

const ROLE_CHOICES = [
  { value: "ml-engineer", label: "ML Engineer" },
  { value: "data-engineer-ai", label: "Data Engineer (AI)" },
  { value: "ai-product-engineer", label: "AI Product / Full-Stack AI Engineer" },
  { value: "mlops-engineer", label: "MLOps / AI Platform Engineer" },
  { value: "llm-agent-engineer", label: "LLM / Agent Engineer" },
  { value: "ai-research-engineer", label: "Research Engineer / Applied Scientist" },
  { value: "ai-forward-deployed-engineer", label: "Forward Deployed / Solutions Engineer" },
  { value: "ai-product-manager", label: "AI Product Manager" },
  { value: "other", label: "Data Scientist / Other AI role" }
];

const QUESTIONS = [
  { id: "background", section: "about", q: "Which best describes you right now?", clarify: "Pick the closest — there are no wrong answers.",
    options: [
      { value: "it", label: "Working in software / IT", desc: "Developer, tester, DevOps, data, support, PM, architect…" },
      { value: "aiml", label: "Already in an AI / ML role", desc: "But I want a better-fit AI role" },
      { value: "nonit", label: "Working in a non-IT field", desc: "Finance, healthcare, teaching, sales, operations…" },
      { value: "graduate", label: "Graduate, not working yet", desc: "MCA / BCA / B.Tech / B.Sc and looking for a first job" },
      { value: "student", label: "Student", desc: "Still studying" },
      { value: "break", label: "Returning after a career break", desc: "Getting back into work" }
    ]},
  { id: "experience", section: "about", q: "How many years of work experience do you have?", clarify: "Count all professional work, IT or not.",
    showIf: a => a.background !== "student",
    options: [
      { value: "0", label: "Less than 1 year", desc: "Just starting out" },
      { value: "1-3", label: "1–3 years", desc: "Early career" },
      { value: "3-7", label: "3–7 years", desc: "Experienced individual contributor" },
      { value: "7-12", label: "7–12 years", desc: "Senior / lead" },
      { value: "12+", label: "12+ years", desc: "Principal, architect or manager" }
    ]},
  { id: "currentRole", section: "about", q: "What is (or was) your main area of work?", clarify: "We use this to find the skills you can carry into AI — they are worth more than you think.",
    showIf: a => a.background === "it" || a.background === "break",
    options: [
      { value: "backend", label: "Backend development", desc: "APIs, microservices, Java / .NET / Node / Python services" },
      { value: "frontend", label: "Frontend / web UI", desc: "React, Angular, Vue" },
      { value: "fullstack", label: "Full-stack development", desc: "End-to-end web applications" },
      { value: "mobile", label: "Mobile development", desc: "Android, iOS, Flutter, React Native" },
      { value: "dataeng", label: "Data engineering / ETL", desc: "Pipelines, Spark, warehouses" },
      { value: "analyst", label: "Data / BI analyst", desc: "SQL, Excel, Power BI, Tableau" },
      { value: "devops", label: "DevOps / Cloud / SRE", desc: "CI/CD, Kubernetes, infrastructure" },
      { value: "qa", label: "Testing / QA", desc: "Manual or automation testing" },
      { value: "support", label: "IT support / operations", desc: "Production support, admin, L1–L3" },
      { value: "pm", label: "Product / project manager or BA", desc: "Requirements, roadmaps, delivery" },
      { value: "lead", label: "Architect / tech lead / eng manager", desc: "Design decisions and leading teams" },
      { value: "nonit", label: "Mainly non-IT work", desc: "My experience is outside software" }
    ]},
  { id: "currentAiRole", section: "about", q: "Which AI role are you in today?", clarify: "We will look for a better-fit role instead of recommending the one you already have.",
    showIf: a => a.background === "aiml",
    options: ROLE_CHOICES.map(r => ({ value: r.value, label: r.label, desc: "" }))},
  { id: "motivation", section: "about", q: "What is pushing you towards AI right now?", clarify: "This shapes how fast and how far we suggest you move.",
    options: [
      { value: "outdated", label: "My skills feel outdated", desc: "Worried about relevance, layoffs or fewer openings" },
      { value: "growth", label: "Better salary and growth", desc: "AI roles pay and grow faster" },
      { value: "company", label: "My company is adopting AI", desc: "I want to lead that, not be left behind" },
      { value: "curious", label: "Genuine curiosity", desc: "I enjoy the technology" },
      { value: "unhappy", label: "Unhappy in my current AI role", desc: "The work does not suit me" }
    ]},

  { id: "langs", section: "skills", multi: true, exclusive: "none", q: "Which programming languages can you write code in?", clarify: "Select all that apply. Only count languages you could build something small in today.",
    options: [
      { value: "python", label: "Python", desc: "The main language of AI" },
      { value: "js", label: "JavaScript / TypeScript", desc: "Web, Node, full-stack" },
      { value: "java", label: "Java / Kotlin", desc: "Enterprise backend, Android" },
      { value: "csharp", label: "C# / .NET", desc: "Enterprise apps" },
      { value: "cpp", label: "C / C++", desc: "Systems, performance" },
      { value: "go", label: "Go / Rust", desc: "Cloud-native, systems" },
      { value: "none", label: "None yet", desc: "I don't code (yet) — that's fine" }
    ]},
  { id: "pythonLevel", section: "skills", q: "How would you rate your Python?", clarify: "Be honest — this decides where your roadmap starts.",
    options: [
      { value: "0", label: "None", desc: "Never written Python" },
      { value: "1", label: "Basic", desc: "Variables, loops, functions" },
      { value: "2", label: "Comfortable", desc: "Pandas / NumPy, small scripts and apps" },
      { value: "3", label: "Advanced", desc: "Packages, testing, async, production code" }
    ]},
  { id: "sql", section: "skills", q: "How comfortable are you with SQL and data?", clarify: "Almost every AI system starts with data.",
    options: [
      { value: "0", label: "None", desc: "No database experience" },
      { value: "1", label: "Basic", desc: "SELECT, WHERE, simple reports" },
      { value: "2", label: "Comfortable", desc: "JOINs, GROUP BY, schema design" },
      { value: "3", label: "Advanced", desc: "Tuning, warehouses, Spark, NoSQL" }
    ]},
  { id: "cloud", section: "skills", q: "How much cloud / deployment experience do you have?", clarify: "Getting AI into production is mostly an engineering job.",
    options: [
      { value: "0", label: "None", desc: "Never deployed anything" },
      { value: "1", label: "Basic", desc: "Used the AWS / Azure / GCP console" },
      { value: "2", label: "Comfortable", desc: "Docker, VMs, storage, basic CI/CD" },
      { value: "3", label: "Advanced", desc: "Kubernetes, Terraform, production on-call" }
    ]},
  { id: "ml", section: "skills", q: "What have you done with AI / ML so far?", clarify: "Pick the most advanced thing you've actually done.",
    options: [
      { value: "0", label: "Nothing yet", desc: "Completely new to AI" },
      { value: "1", label: "Used AI tools", desc: "ChatGPT, Copilot, Claude for daily work" },
      { value: "2", label: "Built with LLM APIs", desc: "Called an LLM API, built a chatbot or RAG demo" },
      { value: "3", label: "Trained ML models", desc: "scikit-learn / PyTorch in notebooks or courses" },
      { value: "4", label: "Shipped ML to production", desc: "Models used by real users" },
      { value: "5", label: "Research-level work", desc: "Papers, novel models, large-scale training" }
    ]},
  { id: "math", section: "skills", q: "How comfortable are you with math (statistics, algebra)?", clarify: "Weak is completely fine — several AI roles need very little math.",
    options: [
      { value: "0", label: "Weak", desc: "I would need to relearn the basics" },
      { value: "1", label: "Okay", desc: "Averages, percentages, basic probability" },
      { value: "2", label: "Strong", desc: "Linear algebra, calculus, statistics" }
    ]},

  { id: "quizMath", section: "check", quiz: "math", correct: "12", skill: "Numeric reasoning", explain: "4 × 10 = 40 in total, and 8 + 9 + 11 = 28, so the fourth number is 12.", q: "The average of four numbers is 10. Three of them are 8, 9 and 11. What is the fourth?", clarify: "Quick check — no calculator needed. You can skip any of these.",
    options: [
      { value: "10", label: "10", desc: "" },
      { value: "12", label: "12", desc: "" },
      { value: "14", label: "14", desc: "" },
      { value: "skip", label: "Not sure / skip", desc: "" }
    ]},
  { id: "quizStats", section: "check", quiz: "stats", correct: "baseline", skill: "Data intuition", explain: "With a 1% disease rate, a model that always says \"healthy\" is 99% accurate yet useless. Always compare against a baseline and look at precision and recall.", q: "A model is 99% accurate at spotting a disease that only 1% of people have. Is it a good model?", clarify: "Think about what 99% really means here.",
    options: [
      { value: "great", label: "Yes — 99% is excellent", desc: "" },
      { value: "baseline", label: "Not necessarily", desc: "Saying \"healthy\" to everyone is also 99% accurate" },
      { value: "data", label: "Only if it was trained on a lot of data", desc: "" },
      { value: "skip", label: "Not sure / skip", desc: "" }
    ]},
  { id: "quizSystems", section: "check", quiz: "systems", correct: "change", skill: "Systems thinking", explain: "When behaviour changes without a code change, something around the code changed: model version, source documents or input data. Check those first.", q: "An AI chatbot gave correct answers last week. This week, with no code changes, its answers are wrong. What do you check first?", clarify: "There is one best first step.",
    options: [
      { value: "rewrite", label: "Rewrite it in a faster language", desc: "" },
      { value: "change", label: "What changed around it", desc: "The model version, the documents it reads, or the input data" },
      { value: "gpu", label: "Add more GPUs", desc: "" },
      { value: "skip", label: "Not sure / skip", desc: "" }
    ]},
  { id: "quizFraming", section: "check", quiz: "framing", correct: "define", skill: "Problem framing", explain: "Good AI work starts by defining the problem and checking the data. The simplest approach that works usually wins.", q: "A retail client says: \"Use AI to stop customers leaving us.\" What is the best first step?", clarify: "This one is about problem-solving, not tech.",
    options: [
      { value: "model", label: "Train a deep learning model right away", desc: "" },
      { value: "define", label: "Agree what \"leaving\" means and what data exists", desc: "Then pick the simplest approach that works" },
      { value: "chatbot", label: "Build a chatbot for the website", desc: "" },
      { value: "skip", label: "Not sure / skip", desc: "" }
    ]},

  { id: "workStyle", section: "style", q: "Which kind of workday sounds most like you?", clarify: "Go with your gut — this is one of the strongest signals for role fit.",
    options: [
      { value: "deep", label: "Deep focus on hard technical problems", desc: "Experiments, models, papers, maths" },
      { value: "product", label: "Building features people use", desc: "Apps, UIs, shipping things quickly" },
      { value: "systems", label: "Making systems reliable at scale", desc: "Pipelines, infrastructure, performance" },
      { value: "automate", label: "Automating work with AI", desc: "Agents and workflows that do tasks end-to-end" },
      { value: "clients", label: "Solving customers' problems hands-on", desc: "Workshops, integrations, being on site" },
      { value: "strategy", label: "Deciding what to build and why", desc: "Product vision, priorities, leading people" }
    ]},
  { id: "interest", section: "style", multi: true, q: "Which parts of AI excite you?", clarify: "Select all that apply.",
    options: [
      { value: "build", label: "Adding AI features to apps", desc: "Chat, search, summarisation, copilots" },
      { value: "agents", label: "Autonomous agents", desc: "AI that plans, uses tools and acts" },
      { value: "model", label: "Training and fine-tuning models", desc: "How models actually learn" },
      { value: "data", label: "Working with data", desc: "Pipelines, quality, analytics" },
      { value: "infra", label: "AI infrastructure", desc: "Serving, GPUs, monitoring, cost" },
      { value: "solutions", label: "Business impact", desc: "Using AI to solve real business problems" }
    ]},
  { id: "bizDomain", section: "style", q: "Which industry do you know best?", clarify: "Industry knowledge + AI skills is a rare and well-paid combination.",
    options: [
      { value: "none", label: "None in particular", desc: "General software / no specific industry" },
      { value: "finance", label: "Finance / banking / accounting", desc: "" },
      { value: "healthcare", label: "Healthcare / pharma", desc: "" },
      { value: "retail", label: "Retail / e-commerce", desc: "" },
      { value: "logistics", label: "Logistics / manufacturing", desc: "" },
      { value: "other", label: "Another industry", desc: "Education, telecom, insurance, government…" }
    ]},

  { id: "goal", section: "goals", q: "What do you want to achieve?", clarify: "",
    options: [
      { value: "switch", label: "Switch fully into an AI role", desc: "A new job title with AI in it" },
      { value: "upskill", label: "Use AI in my current role", desc: "Stay relevant and become the AI person on my team" },
      { value: "freelance", label: "Freelance / build my own AI products", desc: "Side projects or a business" },
      { value: "firstjob", label: "Get my first job in tech", desc: "Through AI" }
    ]},
  { id: "hours", section: "goals", q: "How many hours a week can you realistically study?", clarify: "We use this to turn the roadmap into a real calendar estimate.",
    options: [
      { value: "4", label: "Under 5 hours", desc: "Busy schedule — slow and steady" },
      { value: "8", label: "5–10 hours", desc: "A few evenings a week" },
      { value: "15", label: "10–20 hours", desc: "Serious part-time effort" },
      { value: "25", label: "20+ hours", desc: "Nearly full-time" }
    ]},
  { id: "deadline", section: "goals", q: "By when do you want to be job-ready?", clarify: "We will tell you honestly if the timeline is realistic.",
    options: [
      { value: "3", label: "Within 3 months", desc: "" },
      { value: "6", label: "Within 6 months", desc: "" },
      { value: "12", label: "Within a year", desc: "" },
      { value: "0", label: "No fixed deadline", desc: "" }
    ]}
];

if (typeof module !== "undefined" && module.exports) module.exports = { QUESTIONS, SECTIONS, ROLE_CHOICES };
