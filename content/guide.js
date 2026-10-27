// Hand-written copy for guide/how-to-choose-an-ai-role.html. Tables on that page are generated
// from roles.js / audiences.js by scripts/build.js so the numbers never drift from the app.
const GUIDE = {
  slug: "how-to-choose-an-ai-role",
  title: "How to Choose the Right AI Role in 2026: A 5-Step Framework",
  h1: "How to choose the right AI role: a 5-step framework",
  description: "Confused about which AI role to pick? Use this 5-step framework, with comparison tables for coding, maths, time and pay, to choose an AI career that fits your experience, then validate it with one small project.",
  quickAnswer: "Pick the AI role that reuses most of what you already do, matches the kind of work you enjoy every day, and fits your honest comfort with coding and maths and the hours you can study. Then test it with one small project before you commit months to it. For most working professionals that means an adjacent move rather than starting over: backend to LLM / Agent Engineer, frontend to AI Product Engineer, DevOps to MLOps, data to AI Data Engineer, and PMs or domain experts to AI Product Manager.",
  intro: "Most people who feel stuck about AI careers are not short of courses. They are short of clarity. There are at least nine distinct AI roles, each needing very different skills, and job titles are used inconsistently. This framework is the same logic our free AI career consultation uses, written out so you can apply it yourself.",
  steps: [
    { h: "Start from what you already do", p: "The fastest and least risky move into AI is the one that reuses the most of your current experience. Years spent building APIs, running infrastructure, testing software or managing products are not wasted: each maps naturally to an AI role. Starting from zero as a junior should be a last resort for experienced people.", table: "background" },
    { h: "Choose by the work you enjoy, not the job title", p: "Two AI roles with similar pay can feel completely different day to day. Ask yourself which of these days you would happily repeat for years. This was the single strongest signal for role fit when we tested the questionnaire.", table: "workstyle" },
    { h: "Be honest about coding and maths", p: "Some AI roles need strong maths (research), some need solid coding but little maths (agent, product and platform engineering), and some need neither at an advanced level (AI product management). Choosing a role that fights your weak spots makes the path much longer.", table: "requirements" },
    { h: "Fit the role to the time you actually have", p: "A role that takes 3 months at 20 hours a week takes about a year at 5 hours a week. Pick a path you can finish at your real pace. Finishing one path beats starting three.", table: "time" },
    { h: "Validate with one small project before committing", p: "Before you spend months on a path, build one weekend-sized project typical of the role. If you enjoy the work and want to keep going, you've chosen well. If you dread it, try the next role on your list. It costs you a weekend, not a year.", table: "projects" }
  ],
  workStyles: [
    ["Deep focus on hard technical problems: experiments, models, maths", ["ai-research-engineer", "ml-engineer"]],
    ["Building features people use and shipping quickly", ["ai-product-engineer"]],
    ["Making systems reliable at scale: pipelines, infrastructure", ["mlops-engineer", "data-engineer-ai"]],
    ["Automating real work with AI agents and workflows", ["llm-agent-engineer"]],
    ["Solving customers' problems hands-on", ["ai-forward-deployed-engineer"]],
    ["Deciding what to build and why, and leading people", ["ai-product-manager"]]
  ],
  mistakes: [
    ["Chasing the highest-paid title.", "Research roles pay the most but need strong maths and years of depth. A role that fits you will out-earn one you can't reach."],
    ["Collecting certificates instead of building.", "Hiring managers look at what you've shipped. Two finished projects with live demos beat ten course certificates."],
    ["Starting from zero when an adjacent move exists.", "If you have 5+ years in software, a beginner path wastes your strongest asset: your experience."],
    ["Following hype titles.", "Titles like 'prompt engineer' come and go. Choose a role defined by durable skills: building, data, infrastructure, evaluation, product judgement."],
    ["Waiting until you feel ready.", "Start applying when you're about two-thirds through your roadmap. Interviews show you what to learn next."]
  ],
  faq: [
    ["I'm confused between two AI roles. How do I decide?", "Build one small project typical of each role, for example a RAG chatbot for AI Product Engineer and a tool-using agent for LLM / Agent Engineer, and notice which one you want to keep improving. Then compare which role reuses more of your current experience."],
    ["Which AI role is easiest to get into in 2026?", "There is no universally easy role, but adjacent moves are the fastest: AI Product Engineer for web developers, MLOps for DevOps engineers and AI Data Engineer for data engineers. These usually take 3–5 months at about 10 hours a week because most of the core skills are already in place."],
    ["Is it too late to move into AI with 10+ years of experience?", "No. Senior people are well placed for AI Forward Deployed Engineer, AI platform leadership and AI Product Manager roles, where judgement, system design and stakeholder skills matter more than knowing the latest framework."],
    ["Do I need a master's degree or PhD to work in AI?", "Only for research-heavy roles at top labs. Engineering, data, platform, forward deployed and product roles hire mainly on demonstrated skills and shipped projects."]
  ]
};

if (typeof module !== "undefined" && module.exports) module.exports = { GUIDE };
