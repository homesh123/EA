// Lesson library, part 5: product, client work and career. Text fields are [English, Hinglish].
var LESSON_TOPICS = Object.assign(typeof LESSON_TOPICS !== "undefined" ? LESSON_TOPICS : {}, {
  "problem-framing": {
    icon: "🎯", mins: 7,
    title: ["Problem framing: should AI solve this, and how?", "Problem framing: kya AI ko yeh solve karna chahiye, aur kaise?"],
    analogy: [
      "A patient walks into a clinic and says 'give me antibiotics'. A good doctor first asks what the symptoms are, since when, and what has been tried. Often the real need is different from the request. When a client says 'we need an AI chatbot', a good AI professional diagnoses before prescribing.",
      "Patient clinic mein aakar kehta hai 'mujhe antibiotics de do'. Achha doctor pehle poochta hai: kya symptoms hain, kab se hain, kya try kiya. Aksar asli zaroorat request se alag hoti hai. Jab client kehta hai 'humein AI chatbot chahiye', to achha AI professional dawai likhne se pehle diagnose karta hai."
    ],
    explain: [
      "Start from the problem, not the technology. Ask who has the problem, how often, and what it costs today. Define success as a measurable metric ('cut average ticket handling time from 9 to 5 minutes'). Check whether the data and workflow exist to support a solution. Then pick the simplest approach that works, which might be a rule, a dashboard, a classic ML model, an LLM feature or an agent. AI is a good fit when the task is frequent, pattern-based, tolerant of occasional errors and backed by data. It's a poor fit when every mistake is costly and rules already work.",
      "Technology se nahi, problem se shuru karo. Poocho: problem kisko hai, kitni baar hoti hai, aur aaj iski kya keemat hai? Success ko measurable metric mein define karo ('average ticket handling time 9 se 5 minute karna'). Check karo ki solution ke liye data aur workflow maujood hain ya nahi. Phir sabse simple approach chuno jo kaam kare, chahe woh ek rule ho, dashboard, classic ML model, LLM feature ya agent. AI tab sahi fit hai jab task baar-baar hota ho, pattern-based ho, kabhi-kabhi ki galti bardaasht ho, aur data ho. Tab sahi nahi jab har galti mehengi ho aur rules pehle se kaam kar rahe hon."
    ],
    terms: [
      ["Success metric", "A number that shows whether the solution worked.", "Number jo dikhaaye ki solution ne kaam kiya ya nahi."],
      ["Baseline", "How things perform today, without the new solution.", "Naye solution ke bina aaj cheezein kaise chal rahi hain."],
      ["Simplest viable approach", "The least complex solution that meets the goal.", "Sabse kam complex solution jo goal poora kare."]
    ],
    example: {
      lang: "text",
      code: "Ask: \"Build an AI chatbot for our support team\"\nDiscovery: 60% of tickets are 'where is my order?'\nBaseline:  9 min average handling, 30k tickets/month\nBetter fix: auto-reply with live order status (API) + LLM drafts for the rest\nMetric:    handling time 9 → 5 min, CSAT ≥ 4.3",
      note: ["Diagnosis changed the solution, and made it cheaper and more effective.", "Diagnosis ne solution badal diya, aur use sasta aur zyaada effective bana diya."]
    },
    quiz: {
      q: ["A client asks for 'AI to stop customers leaving'. What's the best first step?", "Client kehta hai 'customers ko chhodne se rokne ke liye AI chahiye'. Sabse accha pehla step kya hai?"],
      options: [["Train a deep learning model right away", "Turant deep learning model train karo"], ["Define 'leaving', measure the baseline and check what data exists", "'Chhodna' define karo, baseline naapo, aur dekho kaunsa data hai"], ["Build a chatbot", "Chatbot banao"]],
      answer: 1,
      why: ["Without a clear definition, baseline and data, any model is a guess.", "Saaf definition, baseline aur data ke bina har model ek andaaza hai."]
    },
    remember: ["Problem → metric → data → simplest solution. Diagnose before you prescribe.", "Problem → metric → data → sabse simple solution. Dawai se pehle diagnosis."]
  },

  "stakeholder-communication": {
    icon: "🗣️", mins: 6,
    title: ["Explaining AI to non-technical people", "Non-technical logon ko AI samjhaana"],
    analogy: [
      "A good CA doesn't explain tax law section by section to a shop owner. They say: 'If you do X, you save ₹40,000 this year, and here's the one risk.' Explaining AI to business people works the same way: lead with the outcome, use their words, and be honest about risks.",
      "Achha CA dukaandaar ko tax law section by section nahi samjhaata. Woh kehta hai: 'Agar aap X karoge, to is saal ₹40,000 bachenge, aur ek risk yeh hai.' Business logon ko AI samjhaana bhi aisa hi hai: nateeje se shuru karo, unke shabd use karo, aur risks ke baare mein imaandaar raho."
    ],
    explain: [
      "Forward deployed engineers, PMs and consultants spend much of their time with people who don't care about embeddings. They care about time, money, risk and their customers. Structure updates as: the outcome or decision needed, the evidence (a demo or numbers), the risks and how they're handled, then next steps. Replace jargon with analogies. Show a working prototype early, since it beats ten slides. Listen more than you talk in discovery meetings, and confirm requirements in writing. Be upfront about what AI can't do: trust is your most valuable asset.",
      "Forward deployed engineers, PMs aur consultants ka bahut time aise logon ke saath jaata hai jinhe embeddings se matlab nahi. Unhe time, paisa, risk aur apne customers se matlab hai. Updates aise structure karo: nateeja ya chahiye decision, saboot (demo ya numbers), risks aur unhe kaise sambhaal rahe ho, phir next steps. Jargon ki jagah analogies use karo. Working prototype jaldi dikhao, kyunki woh das slides se behtar hai. Discovery meetings mein bolne se zyaada suno, aur requirements likhit mein confirm karo. AI kya nahi kar sakta, yeh pehle hi saaf batao: bharosa aapki sabse keemti cheez hai."
    ],
    terms: [
      ["Stakeholder", "Anyone affected by, or deciding on, the project.", "Koi bhi jo project se affect hota ho ya uspe decide karta ho."],
      ["Discovery", "Meetings to understand the real problem, users and constraints.", "Asli problem, users aur constraints samajhne ki meetings."],
      ["Executive summary", "The 3–4 line version: outcome, evidence, risk, ask.", "3–4 line ka version: nateeja, saboot, risk, maang."]
    ],
    example: {
      lang: "text",
      code: "❌ \"We implemented hybrid retrieval with a re-ranker and improved MRR@10 by 0.18.\"\n✅ \"The assistant now finds the right policy 9 times out of 10, up from 7.\n    Agents save ~4 minutes per ticket (≈ ₹6 lakh/month).\n    Risk: rare wrong answers → it always shows its source.\n    Decision needed: roll out to 2 more teams?\"",
      note: ["Same work, explained as outcome → evidence → risk → ask.", "Kaam same hai, bas nateeja → saboot → risk → maang ki tarah samjhaaya gaya."]
    },
    quiz: {
      q: ["What should you lead with when updating a business leader?", "Business leader ko update dete waqt shuruaat kis se karni chahiye?"],
      options: [["Model architecture details", "Model architecture ki details"], ["The business outcome and the decision you need", "Business nateeja aur aapko kaunsa decision chahiye"], ["Your tech stack", "Aapka tech stack"]],
      answer: 1,
      why: ["Leaders decide on outcomes and risks. Give them that first, and details on request.", "Leaders nateejon aur risks pe decide karte hain. Pehle woh do, details maangne pe."]
    },
    remember: ["Outcome → evidence → risk → ask. Analogies over jargon. Demos over slides.", "Nateeja → saboot → risk → maang. Jargon se behtar analogies. Slides se behtar demos."]
  },

  "build-vs-buy": {
    icon: "⚖️", mins: 6,
    title: ["AI literacy for decisions: build vs buy, cost and limits", "Decisions ke liye AI literacy: build vs buy, cost aur limits"],
    analogy: [
      "For your shop's billing, you could hire developers to build software, or subscribe to a ready app for ₹500 a month. If billing isn't what makes your shop special, you buy. The same choice comes up with AI: use an existing AI product or API, customise one, or build your own model.",
      "Dukaan ki billing ke liye aap developers rakh kar software banwa sakte ho, ya ₹500 mahine mein ready app subscribe kar sakte ho. Agar billing aapki dukaan ko khaas nahi banaati, to aap kharidte ho. AI mein bhi yahi choice aati hai: existing AI product ya API use karo, use customise karo, ya apna model banao."
    ],
    explain: [
      "Most companies should not train their own foundation models. The usual ladder is: buy an off-the-shelf AI tool → use a model API with good prompts → add RAG over your data → fine-tune → build custom models. Climb only when the step below fails. Costs include API tokens, engineering time, evals, monitoring and the human review needed for errors. Know the limits: models hallucinate, can be inconsistent, struggle with exact calculation unless given tools, and data privacy rules may restrict which providers you can use. Good AI decisions weigh value, cost, risk and time to launch.",
      "Zyaadatar companies ko apne foundation models train nahi karne chahiye. Normal seedhi yeh hai: off-the-shelf AI tool kharido → acche prompts ke saath model API use karo → apne data pe RAG jodo → fine-tune karo → custom models banao. Upar tabhi chadho jab neeche wala step fail ho. Costs mein API tokens, engineering time, evals, monitoring aur galtiyon ke liye zaroori human review shaamil hai. Limits jaano: models hallucinate karte hain, inconsistent ho sakte hain, tools ke bina exact calculation mein mushkil hoti hai, aur data privacy rules tay kar sakte hain ki kaunse providers use kar sakte ho. Acche AI decisions value, cost, risk aur launch ke time ko tolte hain."
    ],
    terms: [
      ["Foundation model", "A large general-purpose model (GPT, Claude, Llama) that others build on.", "Bada general-purpose model (GPT, Claude, Llama) jis pe doosre cheezein banaate hain."],
      ["Total cost of ownership", "All costs over time: API, people, monitoring and errors.", "Time ke saath saare costs: API, log, monitoring aur galtiyaan."],
      ["Vendor lock-in", "Becoming dependent on one provider in a way that's hard to change.", "Ek provider pe aisi dependency jo badalna mushkil ho."]
    ],
    example: {
      lang: "text",
      code: "Need: summarise 2,000 customer calls/day\nBuy:   speech-analytics SaaS ≈ ₹2 lakh/month, live in 2 weeks\nBuild: transcription + LLM API ≈ ₹60k/month + 2 engineers × 3 months\nDecision: buy now, revisit build if volume ×5 or custom insights are needed",
      note: ["A clear, numbers-based decision with a trigger for revisiting it.", "Saaf, numbers-based decision, aur dobara sochne ka trigger bhi."]
    },
    quiz: {
      q: ["A company wants an internal Q&A bot over its policies. What's usually the right first approach?", "Company ko apni policies pe internal Q&A bot chahiye. Aam taur pe sahi pehla approach kya hai?"],
      options: [["Train a foundation model from scratch", "Zero se foundation model train karo"], ["A model API with RAG over the policy documents", "Policy documents pe RAG ke saath model API"], ["Hire a research lab", "Research lab hire karo"]],
      answer: 1,
      why: ["API + RAG is cheap, fast and keeps answers current. Training from scratch is overkill.", "API + RAG sasta, fast hai aur jawaab current rakhta hai. Zero se training bahut zyaada hai."]
    },
    remember: ["Buy → API → RAG → fine-tune → build. Climb only when needed.", "Buy → API → RAG → fine-tune → build. Zaroorat ho tabhi upar chadho."]
  },

  "no-code-prototyping": {
    icon: "🧱", mins: 6,
    title: ["Prototyping AI ideas with low-code tools", "Low-code tools se AI ideas ka prototype banaana"],
    analogy: [
      "Before opening a restaurant, smart owners run a weekend food stall to test whether people like the menu. A no-code AI prototype is that food stall: in a day you can test whether an idea is useful, before spending months of engineering on it.",
      "Restaurant kholne se pehle samajhdaar owners weekend food stall lagaate hain, yeh dekhne ke liye ki logon ko menu pasand aata hai ya nahi. No-code AI prototype wahi food stall hai: engineering ke mahine lagaane se pehle, ek din mein test kar sakte ho ki idea kaam ka hai ya nahi."
    ],
    explain: [
      "PMs, analysts and domain experts can now prototype real AI workflows without heavy coding. Use AI assistant projects with uploaded documents to test a RAG-style Q&A idea. Use automation tools (n8n, Zapier, Make) with AI steps to chain triggers like 'new email' → classify → draft a reply → log to a sheet. Use Streamlit or simple templates for a clickable demo. Test with 5–10 real users and real data, and note where it fails. A working prototype sharpens requirements, wins buy-in and gives engineers a clear target.",
      "PMs, analysts aur domain experts ab bina zyaada coding ke asli AI workflows ka prototype bana sakte hain. RAG-style Q&A idea test karne ke liye documents upload karke AI assistant projects use karo. Automation tools (n8n, Zapier, Make) mein AI steps jodkar triggers chain karo, jaise 'nayi email' → classify → reply draft → sheet mein log. Clickable demo ke liye Streamlit ya simple templates use karo. 5–10 asli users aur asli data ke saath test karo, aur note karo ki kahan fail hota hai. Working prototype requirements ko saaf karta hai, logon ka saath jeetta hai, aur engineers ko clear target deta hai."
    ],
    terms: [
      ["Prototype", "A quick, rough version built to test an idea.", "Idea test karne ke liye jaldi bana kaccha version."],
      ["Workflow automation", "Connecting apps so steps run automatically on a trigger.", "Apps ko jodna taaki trigger pe steps apne aap chalein."],
      ["User testing", "Watching real users try the prototype to learn what works.", "Asli users ko prototype use karte dekhna, taaki pata chale kya kaam karta hai."]
    ],
    example: {
      lang: "text",
      code: "Idea: auto-triage HR emails\nDay 1 prototype (no code):\n  Trigger: new email in hr@ inbox\n  AI step: classify → leave | payroll | policy | other; draft a reply\n  Action:  add a row to a Google Sheet for HR to review\nWeek 1: 200 emails, 84% classified right, payroll drafts need work → clear spec for engineering",
      note: ["A one-day test produced real numbers and a sharper spec.", "Ek din ke test se asli numbers aur zyaada saaf spec mila."]
    },
    quiz: {
      q: ["What's the main purpose of a no-code AI prototype?", "No-code AI prototype ka main purpose kya hai?"],
      options: [["To replace the production system", "Production system ko replace karna"], ["To quickly test whether the idea is useful, with real users and data", "Asli users aur data ke saath jaldi test karna ki idea kaam ka hai ya nahi"], ["To avoid talking to users", "Users se baat karne se bachna"]],
      answer: 1,
      why: ["Prototypes reduce risk by learning fast and cheaply before big investment.", "Prototypes bade investment se pehle jaldi aur saste mein seekhkar risk kam karte hain."]
    },
    remember: ["Prototype in days, test with real users, then write the spec.", "Dino mein prototype, asli users ke saath test, phir spec likho."]
  },

  "ab-testing": {
    icon: "🆎", mins: 7,
    title: ["Metrics and A/B testing for AI features", "AI features ke liye metrics aur A/B testing"],
    analogy: [
      "A chai stall owner wonders if a new ginger recipe sells better. Switching completely and comparing with last month is unfair, because weather and festivals change sales. Instead, for two weeks they randomly serve the old recipe to half the customers and the new one to the other half, then compare. That's an A/B test.",
      "Chai stall wala sochta hai ki nayi adrak wali recipe zyaada bikegi ya nahi. Poori tarah badal kar pichhle mahine se compare karna galat hoga, kyunki mausam aur tyohaar sales badal dete hain. Iski jagah do hafte tak woh aadhe customers ko random tarah se purani recipe deta hai aur aadhon ko nayi, phir compare karta hai. Yahi A/B test hai."
    ],
    explain: [
      "Before launching an AI feature, define its success metric (resolution rate, time saved, conversion), guardrail metrics that must not get worse (complaints, cost, latency), and how big an improvement matters. An A/B test randomly splits users into control (old) and treatment (new) groups so that the only systematic difference is the feature, which lets you claim causation. Run it long enough to reach statistical significance, and don't peek and stop early. For AI, combine offline evals before launch with online A/B results after it.",
      "AI feature launch karne se pehle uska success metric define karo (resolution rate, time bachaya, conversion), guardrail metrics jo kharab nahi hone chahiye (complaints, cost, latency), aur kitna improvement matter karta hai. A/B test users ko random tarah se control (purana) aur treatment (naya) groups mein baantta hai, taaki dono mein systematic fark sirf feature ka ho, aur aap causation claim kar sako. Itni der chalao ki statistical significance mile, aur beech mein jhaank kar jaldi band mat karo. AI ke liye launch se pehle offline evals aur launch ke baad online A/B results, dono milaao."
    ],
    terms: [
      ["Control / treatment", "The group without the change vs the group with it.", "Bina change wala group vs change wala group."],
      ["Guardrail metric", "A metric that must not get worse while you optimise another.", "Metric jo kharab nahi hona chahiye jab aap doosra optimise karo."],
      ["Statistical significance", "Confidence that a difference isn't just random luck.", "Bharosa ki fark sirf random kismat nahi hai."]
    ],
    example: {
      lang: "text",
      code: "Feature: AI-suggested replies for support agents\nSuccess:   handling time  9.1 → 6.8 min (treatment) ✅ significant\nGuardrail: CSAT           4.4 → 4.4                 ✅ unchanged\nGuardrail: cost/ticket    +₹1.2                     ✅ within budget\nDecision: roll out to 100%",
      note: ["One success metric, guardrails, and a clear go / no-go call.", "Ek success metric, guardrails, aur saaf go / no-go faisla."]
    },
    quiz: {
      q: ["Why randomly assign users in an A/B test?", "A/B test mein users ko random tarah se kyun baantte hain?"],
      options: [["It's easier to code", "Code karna aasaan hai"], ["So the feature is the only systematic difference between groups", "Taaki groups ke beech sirf feature ka systematic fark ho"], ["To make the test shorter", "Test chhota karne ke liye"]],
      answer: 1,
      why: ["Randomisation balances everything else, so the difference can be attributed to the feature.", "Randomisation baaki sab balance kar deta hai, isliye fark feature ki wajah se maana ja sakta hai."]
    },
    remember: ["Define success and guardrails first, then randomise and wait for significance.", "Pehle success aur guardrails define karo, phir randomise karo aur significance ka intezaar karo."]
  },

  "ai-prd": {
    icon: "📋", mins: 7,
    title: ["Writing an AI product spec (PRD) with an eval plan", "Eval plan ke saath AI product spec (PRD) likhna"],
    analogy: [
      "When you hire a contractor to renovate a kitchen, a good brief says what you want, the budget, the must-haves, what's off-limits and how you'll inspect the work. An AI PRD is that brief for an AI feature, with one extra part normal software doesn't need: how you'll judge answers that can be 'mostly right'.",
      "Kitchen renovate karne ke liye contractor rakhte waqt, acche brief mein hota hai: kya chahiye, budget, zaroori cheezein, kya nahi karna, aur kaam kaise check karoge. AI PRD AI feature ke liye wahi brief hai, ek extra hisse ke saath jo normal software ko nahi chahiye: 'zyaadatar sahi' ho sakne wale jawaabon ko kaise judge karoge."
    ],
    explain: [
      "A good AI PRD covers the user and problem, the success metric, scope and non-goals, and the user experience, including what happens when the AI is unsure or wrong. Add the AI-specific sections too: the data and context the model needs, the approach (prompting, RAG, fine-tuning), the eval plan (an eval set, quality bar, how it's measured), risks (hallucination, privacy, bias, prompt injection) and mitigations, cost and latency budgets, human oversight, and launch criteria. Writing the eval plan before building forces everyone to agree on what 'good' means.",
      "Acche AI PRD mein hota hai: user aur problem, success metric, scope aur non-goals, aur user experience, jismein yeh bhi ki AI unsure ya galat ho to kya hoga. AI-specific sections bhi jodo: model ko kaunsa data aur context chahiye, approach (prompting, RAG, fine-tuning), eval plan (eval set, quality bar, kaise naapenge), risks (hallucination, privacy, bias, prompt injection) aur unke mitigations, cost aur latency budgets, human oversight, aur launch criteria. Banaane se pehle eval plan likhne se sab 'accha' ka matlab ek jaisa maan lete hain."
    ],
    terms: [
      ["Non-goals", "Things the feature deliberately won't do.", "Cheezein jo feature jaan-boojhkar nahi karega."],
      ["Quality bar", "The minimum eval score needed to launch.", "Launch ke liye zaroori minimum eval score."],
      ["Launch criteria", "Conditions that must be met before going live.", "Live jaane se pehle poori hone wali shartein."]
    ],
    example: {
      lang: "text",
      code: "AI PRD: Policy assistant for branch staff\nProblem:   staff spend ~25 min/day searching policy PDFs\nMetric:    time-to-answer < 1 min; 90% answers correct (eval set of 100 real questions)\nApproach:  model API + RAG over policy docs, citations required\nNon-goals: no customer-facing use in v1; no advice outside the policies\nRisks:     wrong answer → always cite + 'confirm with manager' for loans > ₹10L\nLaunch:    ≥ 90% on evals, < 3 s p95 latency, legal sign-off",
      note: ["The eval set and quality bar are decided before any code is written.", "Eval set aur quality bar code likhne se pehle hi tay ho jaate hain."]
    },
    quiz: {
      q: ["What's the key section an AI PRD needs that a normal PRD often lacks?", "Aisa kaunsa key section hai jo AI PRD mein chahiye lekin normal PRD mein aksar nahi hota?"],
      options: [["A colour palette", "Colour palette"], ["An eval plan and quality bar for AI outputs", "AI outputs ke liye eval plan aur quality bar"], ["A list of competitors", "Competitors ki list"]],
      answer: 1,
      why: ["AI outputs vary, so you must define in advance how quality is measured and what's good enough.", "AI outputs badalte rehte hain, isliye pehle se define karna padta hai ki quality kaise naapoge aur kitna accha kaafi hai."]
    },
    remember: ["Problem, metric, scope, UX for failure, eval plan, risks, launch bar.", "Problem, metric, scope, failure ke liye UX, eval plan, risks, launch bar."]
  },

  "portfolio": {
    icon: "🏆", mins: 6,
    title: ["Building a portfolio project that gets interviews", "Aisa portfolio project banaana jo interviews dilaaye"],
    analogy: [
      "A wedding photographer doesn't win clients with certificates. They win with an album of real weddings. Your portfolio is your album: 2–3 finished, real-looking projects with results and a live demo convince a hiring manager far more than ten course certificates.",
      "Wedding photographer certificates se clients nahi jeetta. Woh asli shaadiyon ke album se jeetta hai. Aapka portfolio aapka album hai: 2–3 poore, asli jaise lagne wale projects, results aur live demo ke saath, hiring manager ko das course certificates se kahin zyaada convince karte hain."
    ],
    explain: [
      "Pick a real problem, ideally from your current industry, where your domain knowledge shows. Scope it small enough to finish in 2–4 weeks. Make it end-to-end: data → model or LLM → app or API → deployment, plus an evaluation with real numbers. The README matters as much as the code: the problem, approach, architecture diagram, results, limitations, and how to run it. Add a live demo link and a 2-minute video. One polished, deployed project beats many half-done notebooks, and talking through your trade-offs is great interview material.",
      "Ek asli problem chuno, ho sake to apni current industry se, jahan aapka domain knowledge dikhe. Scope itna chhota rakho ki 2–4 hafte mein poora ho jaaye. End-to-end banao: data → model ya LLM → app ya API → deployment, saath mein asli numbers wala evaluation. README code jitna hi zaroori hai: problem, approach, architecture diagram, results, limitations, aur chalaane ka tareeka. Live demo link aur 2 minute ka video jodo. Ek polished, deployed project bahut saare aadhe-adhoore notebooks se behtar hai, aur apne trade-offs samjhaana interview ke liye shaandaar material hai."
    ],
    terms: [
      ["End-to-end", "Covering every stage from raw data to a usable app.", "Raw data se usable app tak har stage cover karna."],
      ["README", "The project's front page: what, why, how and results.", "Project ka front page: kya, kyun, kaise aur results."],
      ["Live demo", "A link where anyone can try the project.", "Link jahan koi bhi project try kar sake."]
    ],
    example: {
      lang: "text",
      code: "Project: GST invoice extractor (for an ex-accountant moving into AI)\n  Problem:  manual entry of 300 invoices/month\n  Build:    PDF → LLM structured extraction → validation rules → Streamlit app\n  Eval:     50 real invoices: 94% fields correct, 100% flagged when unsure\n  Shipped:  live demo + 2-min video + README with architecture & limits",
      note: ["Domain knowledge plus AI, finished and measured. That's what stands out.", "Domain knowledge plus AI, poora bana aur naapa hua. Yahi alag dikhta hai."]
    },
    quiz: {
      q: ["Which portfolio impresses hiring managers most?", "Kaunsa portfolio hiring managers ko sabse zyaada impress karta hai?"],
      options: [["Ten course certificates", "Das course certificates"], ["Two finished, deployed projects with evals and clear READMEs", "Do poore, deployed projects, evals aur saaf READMEs ke saath"], ["Twenty unfinished notebooks", "Bees adhoore notebooks"]],
      answer: 1,
      why: ["Finished, measured, deployed work proves you can do the job.", "Poora, naapa hua, deployed kaam saabit karta hai ki aap job kar sakte ho."]
    },
    remember: ["Real problem, end-to-end, evaluated, deployed and well explained.", "Asli problem, end-to-end, evaluated, deployed aur achhe se samjhaaya hua."]
  },

  "job-search": {
    icon: "💼", mins: 6,
    title: ["Landing the AI role: resume, applications and interviews", "AI role paana: resume, applications aur interviews"],
    analogy: [
      "Selling a house, you don't list 'has walls and a roof'. You lead with what buyers care about: 'sea-facing, 5 minutes from the metro, renovated kitchen'. A resume works the same way: lead with results the employer cares about, in their language, backed by proof.",
      "Ghar bechte waqt aap 'deewarein aur chhat hai' nahi likhte. Aap woh likhte ho jo khareedne wale ko chahiye: 'sea-facing, metro se 5 minute, nayi kitchen'. Resume bhi aise hi kaam karta hai: employer ko jo nateeje chahiye unse shuru karo, unki bhasha mein, saboot ke saath."
    ],
    explain: [
      "Tailor your resume to the role's keywords, and write bullets as action + result + number ('Built a RAG assistant that cut policy look-up time by 70%'). Put AI projects near the top, with links. Reframe past experience in AI terms: test automation becomes AI evaluation, backend APIs become LLM integration. Apply to the specific titles from your roadmap, and try internal moves at your current company. Prepare for coding rounds, system design (ML or LLM system design for AI roles), and deep-dives into your projects. Apply consistently, track applications, and learn from each interview.",
      "Resume ko role ke keywords ke hisaab se tailor karo, aur bullets action + nateeja + number ki tarah likho ('RAG assistant banaaya jisne policy dhoondhne ka time 70% kam kiya'). AI projects links ke saath upar rakho. Purane experience ko AI ki bhasha mein dikhao: test automation AI evaluation ban jaata hai, backend APIs LLM integration ban jaati hain. Apne roadmap ke specific titles pe apply karo, aur current company mein internal move bhi try karo. Coding rounds, system design (AI roles ke liye ML ya LLM system design) aur apne projects ke deep-dives ki taiyaari karo. Lagaataar apply karo, applications track karo, aur har interview se seekho."
    ],
    terms: [
      ["Impact bullet", "A resume line written as action + result + number.", "Resume ki line jo action + nateeja + number ki tarah likhi ho."],
      ["System design round", "An interview where you design a whole system on a whiteboard.", "Interview jahan whiteboard pe poora system design karna hota hai."],
      ["Internal mobility", "Moving to an AI role inside your current company.", "Apni current company ke andar AI role mein jaana."]
    ],
    example: {
      lang: "text",
      code: "❌ \"Worked on testing of various modules.\"\n✅ \"Built an LLM evaluation suite (120 cases) for a support chatbot; caught 14\n    regressions before release and raised answer accuracy from 78% → 91%.\"\n\nWeekly rhythm: 10 tailored applications · 2 referral asks · 1 mock interview",
      note: ["Same experience, rewritten in AI terms with measurable impact.", "Experience same hai, bas AI ki bhasha mein aur naape jaa sakne wale impact ke saath likha gaya."]
    },
    quiz: {
      q: ["Which resume bullet is strongest?", "Kaunsa resume bullet sabse strong hai?"],
      options: [["Responsible for AI tasks", "AI tasks ki zimmedaari"], ["Built a churn model with XGBoost that improved retention-campaign ROI by 22%", "XGBoost se churn model banaaya jisne retention-campaign ROI 22% badhaaya"], ["Familiar with machine learning", "Machine learning se parichit"]],
      answer: 1,
      why: ["It shows what you did, how, and the measurable result.", "Yeh dikhaata hai ki aapne kya kiya, kaise kiya, aur naapa ja sakne wala nateeja."]
    },
    remember: ["Action + result + number. Reframe your experience in AI terms. Apply steadily.", "Action + nateeja + number. Apna experience AI ki bhasha mein likho. Lagaataar apply karo."]
  }
});

if (typeof module !== "undefined" && module.exports) module.exports = { LESSON_TOPICS };
