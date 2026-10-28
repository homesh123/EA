// Hinglish text for the role overview and roadmap step names shown in the Learn section.
// English stays in roles.js (used by the questionnaire, results and SEO pages).
var ROLES_HI = {
  "ai-fresher": {
    tagline: "Pehle buniyaad banao, phir junior AI / ML role pao",
    why: "Aap tech ke safar ki shuruaat mein ho, isliye sabse tez raasta mazboot buniyaad hai: Python, data aur core machine learning, portfolio projects se sabit. Yeh raasta Junior ML Engineer, AI Engineer Trainee ya Data Analyst (AI) roles tak le jaata hai.",
    bestFor: "Students, graduates aur coding mein naye log",
    steps: ["Python basics", "Git, GitHub aur data sambhaalna", "Statistics aur probability basics", "SQL aur data basics", "Machine learning fundamentals", "LLMs aur Generative AI ka parichay", "2 portfolio projects banao", "Junior roles ke liye apply karo"]
  },
  "ml-engineer": {
    tagline: "ML models banao, train karo aur asli products mein ship karo",
    why: "Sabse sahi tab jab aapki engineering skills mazboot hon aur aapko data aur code dono pasand hon. ML Engineers models ko reliable product features mein badalte hain, yeh sabse established AI engineering role hai.",
    bestFor: "Backend aur data developers jinhe data aur maths pasand hai",
    steps: ["Data aur statistics ke liye Python ka refresh", "Classic machine learning", "Deep learning aur transformers", "Model deployment aur serving", "MLOps basics", "2 end to end portfolio projects banao", "ML Engineer roles target karo"]
  },
  "data-engineer-ai": {
    tagline: "Woh data pipelines banao jin par har AI system tika hai",
    why: "Sabse sahi tab jab aapko data, SQL aur reliable systems pasand hon. AI utna hi accha hai jitna uska data, aur teams ko aise engineers chahiye jo models aur RAG systems ke liye saaf, fresh, acche se sambhaala hua data de sakein.",
    bestFor: "Data engineers, BI analysts aur SQL heavy developers",
    steps: ["SQL aur data modelling mein gehraai", "Pipeline tools: Airflow, dbt, Spark", "ML ke liye data: features aur quality", "LLMs ke liye data: embeddings aur vector stores", "Streaming plus batch portfolio project", "AI data teams target karo"]
  },
  "ai-product-engineer": {
    tagline: "Aise AI features ship karo jo users ko pasand aayein: chat, search, copilots",
    why: "Web, mobile aur full stack developers ke liye sabse sahi. Aapki app banaane ki taakat bani rehti hai aur uske upar LLM APIs, RAG aur evaluation judte hain. Yeh sabse tez switch mein se ek hai kyunki zyaadatar kaam abhi bhi product engineering hai.",
    bestFor: "Frontend, full stack aur mobile developers",
    steps: ["LLM API fundamentals", "Kaam chalau Python", "Vector database ke saath RAG", "AI ke liye evaluation, guardrails aur UX", "3 AI feature demos ship karo", "AI product roles target karo"]
  },
  "mlops-engineer": {
    tagline: "AI ko bade scale pe reliably aur saste mein chalao",
    why: "DevOps, cloud, SRE aur backend engineers ke liye sabse sahi. Aapki infrastructure skills lagbhag seedhe kaam aati hain, aap uske upar model serving, GPUs, LLM gateways aur ML pipelines jodte ho.",
    bestFor: "DevOps, cloud, SRE aur infrastructure engineers",
    steps: ["Infra engineers ke liye ML concepts", "Automation ke liye Python", "Model packaging aur serving", "AI workloads ke liye Kubernetes", "ML pipelines aur monitoring", "AI platform roles target karo"]
  },
  "llm-agent-engineer": {
    tagline: "Aise AI agents banao jo plan karein, tools use karein aur kaam poora karein",
    why: "Backend aur automation soch wale engineers ke liye sabse sahi. Agents LLMs ko tools, APIs aur workflows se jodte hain, aur reliable services banaane ka aapka anubhav hi agents ko production mein chalaata hai.",
    bestFor: "Backend developers aur automation / QA engineers",
    steps: ["LLM APIs, prompting aur tool use", "AI engineering ke liye Python", "Agent frameworks aur MCP", "Aisa agent banao jo asli kaam kare", "Evaluation, observability aur safety", "Agent engineering roles target karo"]
  },
  "ai-research-engineer": {
    tagline: "Models train karo, fine tune karo aur unki seemaayein aage badhao",
    why: "Sabse sahi agar aapka maths mazboot hai, gehre technical problems pasand hain aur aap is pe kaam karna chahte ho ki models kaise seekhte hain. Bar ooncha hai aur raasta lamba, par yeh sabse gehra technical AI role hai.",
    bestFor: "Mazboot maths wale log jinhe gehra technical kaam pasand hai",
    steps: ["Maths mazboot karo", "Deep learning gehraai se", "Open models fine tune karna", "Ek paper reproduce karo", "Research engineering roles target karo"]
  },
  "ai-forward-deployed-engineer": {
    tagline: "Asli businesses ke andar AI deploy karo, customers ke saath hands on",
    why: "Experienced engineers ke liye sabse sahi jinhe code jitne hi log pasand hain, khaaskar industry knowledge ke saath. Aap customers ke saath unke systems samajhte ho aur custom AI solutions banate ho: thoda engineer, thoda solution architect, thoda consultant. AI labs aur enterprise AI companies iske liye kaafi hire karti hain.",
    bestFor: "Senior engineers jinhe clients pasand hain aur jo ek industry jaante hain",
    steps: ["LLM APIs, RAG aur tool use", "Python pe pakad", "Enterprise integration, security aur compliance", "Discovery, scoping aur communication", "Industry solution portfolio", "Forward deployed aur solutions roles target karo"]
  },
  "ai-product-manager": {
    tagline: "Tay karo AI kya banaye, aur use safal banao",
    why: "Product/project managers, business analysts, team leads aur non IT fields ke domain experts ke liye sabse sahi. Bahut coding ki zaroorat nahi: aapko samajhna hai AI kya kar sakta hai aur kya nahi, sahi problems define karni hain, quality naapni hai aur teams ko ship karwaana hai.",
    bestFor: "PMs, BAs, team leads aur non IT domain experts",
    steps: ["Decision lene walon ke liye AI ki samajh", "Hands on prototyping (low code)", "Data aur metrics basics", "AI product discovery, evaluation aur risk", "AI product case studies", "AI PM / transformation roles target karo"]
  }
};

if (typeof module !== "undefined" && module.exports) module.exports = { ROLES_HI };
