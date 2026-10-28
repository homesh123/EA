// Deeper lesson content, part 5: product, business and career. See deep-foundations.js.
var LESSON_DEEP = Object.assign(typeof LESSON_DEEP !== "undefined" ? LESSON_DEEP : {}, {
  "problem-framing": {
    steps: [
      ["Write the problem in business terms: \"Agents spend 6 minutes per ticket finding the right policy.\"", "Problem business ki bhasha mein likho: \"Agents har ticket pe sahi policy dhoondhne mein 6 minute lagaate hain.\""],
      ["Measure today's baseline: how long, how many, how much it costs, how often it goes wrong.", "Aaj ka baseline naapo: kitna time, kitne, kitna kharch, kitni baar galat hota hai."],
      ["List solutions from simplest to most complex: a better process, a rule, search, classic ML, an LLM, an agent.", "Solutions simple se complex ki taraf list karo: behtar process, rule, search, classic ML, LLM, agent."],
      ["Check feasibility: is the data available, can it be measured, and what happens when the AI is wrong?", "Feasibility check karo: data hai, naap sakte hain, aur AI galat ho to kya hoga?"],
      ["Agree one success metric and a small pilot with a deadline.", "Ek success metric aur deadline ke saath chhote pilot pe sehmati banao."]
    ],
    mistakes: [
      ["Starting from the technology (\"let's use agents\") instead of the problem.", "Problem ke bajaye technology se shuru karna (\"chalo agents use karte hain\")."],
      ["No baseline, so nobody can prove the AI made things better.", "Baseline nahi, to koi prove nahi kar sakta ki AI ne cheezein behtar ki."]
    ],
    faq: [
      [["How do I spot a good AI use case?", "Accha AI use case kaise pehchaanun?"], ["Frequent, costly, mostly text or pattern based work, where a draft or suggestion helps and mistakes can be caught.", "Baar baar hone wala, mehenga, zyaadatar text ya pattern based kaam, jahan draft ya suggestion madad kare aur galtiyaan pakdi ja sakein."]],
      [["What if the data doesn't exist yet?", "Agar data abhi hai hi nahi to?"], ["Start collecting it, or begin with an LLM that needs fewer examples, and log real usage to build a dataset over time.", "Ikattha karna shuru karo, ya aise LLM se shuru karo jise kam examples chahiye, aur waqt ke saath dataset banane ke liye asli usage log karo."]]
    ]
  },

  "stakeholder-communication": {
    steps: [
      ["Start with the outcome they care about: time saved, money, risk, customers.", "Us nateeje se shuru karo jiski unhe parwah hai: bacha time, paisa, risk, customers."],
      ["Explain how it works with one everyday analogy, not technical terms.", "Kaise kaam karta hai ek rozmarra ki misaal se samjhao, technical shabdon se nahi."],
      ["Be honest about limits: how often it's wrong, and what protects against that.", "Limits ke baare mein imaandaar raho: kitni baar galat hota hai, aur usse kya bachata hai."],
      ["Show, don't tell: a short demo on their real data convinces more than slides.", "Batao mat, dikhao: unke asli data pe chhota demo slides se zyaada convince karta hai."],
      ["End with a clear decision or next step you need from them.", "Ek saaf decision ya agle step ke saath khatam karo jo aapko unse chahiye."]
    ],
    mistakes: [
      ["Overpromising (\"it will be 100% accurate\"). It destroys trust at the first mistake.", "Zyaada vaada karna (\"yeh 100% accurate hoga\"). Pehli galti pe hi bharosa toot jaata hai."],
      ["Drowning people in metrics they can't interpret. Translate numbers into impact.", "Logon ko aise metrics mein dubona jo woh samajh na sakein. Numbers ko impact mein translate karo."]
    ],
    faq: [
      [["How do I explain accuracy to a business leader?", "Business leader ko accuracy kaise samjhaun?"], ["In counts and consequences: \"Out of 100 invoices, it reads 95 correctly; the other 5 are flagged for a person to check.\"", "Ginti aur nateejon mein: \"100 invoices mein se 95 sahi padhta hai; baaki 5 ek insaan ke check ke liye flag hote hain.\""]],
      [["What if a stakeholder is afraid AI will replace their team?", "Agar stakeholder ko dar ho ki AI unki team ko replace kar dega?"], ["Acknowledge it, show how the tool removes boring work, involve the team in testing, and share how roles will change.", "Maano, dikhao tool kaise boring kaam hataata hai, team ko testing mein shaamil karo, aur batao roles kaise badlenge."]]
    ]
  },

  "build-vs-buy": {
    steps: [
      ["Define the need precisely: task, volume, quality bar, latency and data sensitivity.", "Zaroorat saaf define karo: task, volume, quality bar, latency aur data sensitivity."],
      ["Check what exists: a SaaS product, a model API, an open model you can host.", "Dekho kya maujood hai: SaaS product, model API, open model jo host kar sakte ho."],
      ["Test the top two options on your own eval set, not on vendor demos.", "Top do options ko apne eval set pe test karo, vendor demos pe nahi."],
      ["Compare total cost over a year: usage, infrastructure, engineers to build and maintain, and switching cost.", "Saal bhar ka total cost compare karo: usage, infrastructure, banane aur maintain karne wale engineers, aur switch karne ka cost."],
      ["Decide, and keep an exit path: wrap vendors behind your own interface so you can switch.", "Decide karo, aur nikalne ka raasta rakho: vendors ko apne interface ke peeche rakho taaki switch kar sako."]
    ],
    mistakes: [
      ["Building custom models for problems a good API already solves well.", "Aisi problems ke liye custom models banana jo ek acchi API pehle se acche se solve karti hai."],
      ["Comparing only per token price and ignoring engineering and maintenance time.", "Sirf per token price compare karna aur engineering aur maintenance time ignore karna."]
    ],
    faq: [
      [["How do I estimate LLM cost per month?", "Mahine ka LLM cost kaise estimate karun?"], ["Requests per month × (input tokens × input price + output tokens × output price). Add a margin for retries and growth.", "Mahine ki requests × (input tokens × input price + output tokens × output price). Retries aur growth ke liye margin jodo."]],
      [["Are open source models good enough?", "Kya open source models kaafi acche hain?"], ["For many tasks, yes, especially after fine tuning. Test them on your eval set against an API model before deciding.", "Kai tasks ke liye haan, khaaskar fine tuning ke baad. Decide karne se pehle apne eval set pe API model ke against test karo."]]
    ]
  },

  "no-code-prototyping": {
    steps: [
      ["Write the user's task in one sentence and pick 10 real examples.", "User ka task ek sentence mein likho aur 10 asli examples chuno."],
      ["Build the flow in a low code tool or a simple Streamlit app: input, prompt, output.", "Low code tool ya simple Streamlit app mein flow banao: input, prompt, output."],
      ["Run your 10 examples and note where it fails.", "Apne 10 examples chalao aur note karo kahan fail hota hai."],
      ["Put it in front of 3 to 5 real users and watch them use it, without helping.", "3 se 5 asli users ke saamne rakho aur bina madad kiye unhe use karte dekho."],
      ["Decide: build properly, change direction, or stop. Write down why.", "Decide karo: theek se banao, direction badlo, ya ruk jao. Kyun, yeh likh lo."]
    ],
    mistakes: [
      ["Treating the prototype as production. It usually lacks security, monitoring and error handling.", "Prototype ko production maan lena. Isme aksar security, monitoring aur error handling nahi hoti."],
      ["Testing only with your own made up examples instead of real user inputs.", "Asli user inputs ke bajaye sirf apne banaye examples se test karna."]
    ],
    faq: [
      [["Which tools can non coders use?", "Non coders kaunse tools use kar sakte hain?"], ["Workflow tools with AI steps (like Zapier or n8n), spreadsheet AI functions, and AI app builders. Pick one your company allows.", "AI steps wale workflow tools (jaise Zapier ya n8n), spreadsheet AI functions, aur AI app builders. Jo company allow kare woh chuno."]],
      [["How long should a prototype take?", "Prototype mein kitna time lagna chahiye?"], ["Days, not months. If it takes longer, the scope is too big; cut it to the single most important task.", "Din, mahine nahi. Zyaada lage to scope bahut bada hai; use sabse zaroori ek task tak kaato."]]
    ]
  },

  "ab-testing": {
    steps: [
      ["Write a hypothesis: \"AI reply drafts will cut handling time by 15% without lowering satisfaction.\"", "Hypothesis likho: \"AI reply drafts handling time 15% kam karenge, satisfaction giraaye bina.\""],
      ["Pick one primary metric and a few guardrail metrics that must not get worse.", "Ek primary metric aur kuch guardrail metrics chuno jo bigadne nahi chahiye."],
      ["Randomly split users (or agents) into control and treatment, and estimate how many you need and for how long.", "Users (ya agents) ko randomly control aur treatment mein baanto, aur andaaza lagao kitne chahiye aur kitne din."],
      ["Run the full planned duration without peeking and stopping early.", "Poori planned duration chalao, beech mein jhaank kar jaldi band mat karo."],
      ["Analyse the difference with confidence intervals, check guardrails and segments, then decide.", "Confidence intervals ke saath fark analyse karo, guardrails aur segments check karo, phir decide karo."]
    ],
    mistakes: [
      ["Stopping as soon as results look good. Early peeks produce false wins.", "Results acche dikhte hi band kar dena. Jaldi jhaankne se jhoothi jeet milti hai."],
      ["Testing many metrics and celebrating whichever moved. Decide the primary metric beforehand.", "Bahut saare metrics test karna aur jo hila uska jashn manana. Primary metric pehle tay karo."]
    ],
    faq: [
      [["What is statistical significance in simple words?", "Statistical significance simple shabdon mein kya hai?"], ["How unlikely the difference would be if the change had no real effect. It doesn't tell you the effect is big or valuable.", "Agar change ka koi asli asar na hota to yeh fark kitna unlikely hota. Yeh nahi batata ki asar bada ya keemti hai."]],
      [["What if we can't randomise?", "Agar randomise na kar sakein to?"], ["Use a phased rollout by region or team, compare before and after carefully, and be honest that the evidence is weaker.", "Region ya team ke hisaab se phased rollout karo, pehle aur baad dhyaan se compare karo, aur imaandaari se maano ki saboot kamzor hai."]]
    ]
  },

  "ai-prd": {
    steps: [
      ["Problem and users: who has the pain, how big it is, and today's baseline.", "Problem aur users: dard kise hai, kitna bada hai, aur aaj ka baseline."],
      ["Solution and scope: what the AI does, what it doesn't, and where humans stay in the loop.", "Solution aur scope: AI kya karta hai, kya nahi, aur kahan insaan loop mein rehte hain."],
      ["Quality bar: the eval set, how it's scored, and the launch thresholds (including zero tolerance cases).", "Quality bar: eval set, kaise score hota hai, aur launch thresholds (zero tolerance cases samet)."],
      ["Risks and mitigations: wrong answers, privacy, abuse, cost; and the fallback for each.", "Risks aur unke upaay: galat jawaab, privacy, misuse, cost; aur har ek ka fallback."],
      ["Metrics and rollout: layered success metrics, guardrails, a phased launch plan and a review date.", "Metrics aur rollout: layered success metrics, guardrails, phased launch plan aur review date."]
    ],
    mistakes: [
      ["Writing \"the AI should be accurate\" with no measurable definition.", "Bina naapne layak definition ke \"AI accurate hona chahiye\" likhna."],
      ["Leaving out what happens when the AI fails. That's often the most important part of the spec.", "AI fail ho to kya hoga yeh chhod dena. Aksar spec ka sabse zaroori hissa yahi hota hai."]
    ],
    faq: [
      [["How is an AI PRD different from a normal PRD?", "AI PRD normal PRD se kaise alag hai?"], ["It adds an eval plan and quality thresholds, explicit failure handling, data needs, cost per use and model change management.", "Isme eval plan aur quality thresholds, saaf failure handling, data ki zaroorat, per use cost aur model change management judte hain."]],
      [["Who writes the eval set?", "Eval set kaun likhta hai?"], ["Usually the PM with domain experts and engineers together. Domain experts define what a correct answer is.", "Aam taur pe PM, domain experts aur engineers milkar. Domain experts tay karte hain sahi jawaab kya hai."]]
    ]
  },

  "portfolio": {
    steps: [
      ["Pick a real problem from your current or past domain (banking, testing, retail), not a generic tutorial.", "Apne current ya purane domain (banking, testing, retail) se asli problem chuno, generic tutorial nahi."],
      ["Build it end to end: data, model or LLM pipeline, a simple UI or API, deployed with a public link.", "End to end banao: data, model ya LLM pipeline, simple UI ya API, public link ke saath deployed."],
      ["Add evaluation with real numbers: \"answers 84% of 50 test questions correctly\".", "Asli numbers ke saath evaluation jodo: \"50 test sawaalon mein se 84% sahi jawaab\"."],
      ["Write a great README: problem, demo GIF, how it works, results, what you'd improve.", "Badhiya README likho: problem, demo GIF, kaise kaam karta hai, results, kya sudhaaroge."],
      ["Share it: a LinkedIn post or short write up explaining one interesting decision you made.", "Share karo: LinkedIn post ya chhota write up jisme ek dilchasp decision samjhao jo aapne liya."]
    ],
    mistakes: [
      ["Ten unfinished tutorial projects. Two finished, deployed, measured projects are far stronger.", "Das adhoore tutorial projects. Do poore, deployed, measured projects kahin zyaada mazboot hain."],
      ["No numbers. Without evaluation, a recruiter can't tell if it works.", "Koi numbers nahi. Evaluation ke bina recruiter nahi bata sakta ki yeh kaam karta hai."]
    ],
    faq: [
      [["How many projects do I need?", "Kitne projects chahiye?"], ["Two or three strong ones aligned with the role you want. Quality and relevance beat quantity.", "Jo role chahiye usse jude do ya teen mazboot projects. Quality aur relevance ginti se behtar hain."]],
      [["Can I use AI tools to build my portfolio?", "Kya portfolio banane ke liye AI tools use kar sakta hoon?"], ["Yes, everyone does, but you must understand every line. Interviewers will ask why you made each decision.", "Haan, sab karte hain, par aapko har line samajhni chahiye. Interviewers poochenge har decision kyun liya."]]
    ]
  },

  "job-search": {
    steps: [
      ["Pick one target role and tailor your resume to it with the exact skills from real job descriptions.", "Ek target role chuno aur asli job descriptions ke exact skills ke saath resume uske hisaab se banao."],
      ["Lead with AI projects and results if you're switching careers, and rewrite past work to show transferable skills.", "Career switch kar rahe ho to AI projects aur results pehle rakho, aur purane kaam ko transferable skills dikhaane ke liye dobara likho."],
      ["Apply through referrals where possible: message people in target teams with a specific, short note.", "Jahan ho sake referrals se apply karo: target teams ke logon ko ek specific, chhota note bhejo."],
      ["Prepare for interviews in order: introduction, fundamentals, role skills, design, behavioural stories, questions to ask.", "Interviews ki taiyaari order mein karo: introduction, fundamentals, role skills, design, behavioural stories, poochne wale sawaal."],
      ["Track applications in a sheet, follow up after a week, and learn from every rejection.", "Applications ek sheet mein track karo, ek hafte baad follow up karo, aur har rejection se seekho."]
    ],
    mistakes: [
      ["Sending the same resume to every job. Tailored resumes pass ATS and impress recruiters far more often.", "Har job ko same resume bhejna. Tailored resumes ATS aur recruiters dono ko kahin zyaada baar paas karte hain."],
      ["Waiting until you feel 100% ready. Start applying once you have two solid projects and keep learning.", "100% ready mehsoos hone tak intezaar karna. Do mazboot projects hote hi apply karna shuru karo aur seekhte raho."]
    ],
    faq: [
      [["Should I switch internally first?", "Kya pehle company ke andar switch karun?"], ["If your company has AI projects, an internal move is often the fastest path: you already have trust and domain knowledge.", "Agar company mein AI projects hain, to internal move aksar sabse tez raasta hai: bharosa aur domain knowledge pehle se hai."]],
      [["Will I have to take a pay cut?", "Kya salary kam leni padegi?"], ["Not usually if you move to a role that uses your experience, like a backend engineer becoming an LLM engineer. Starting from zero in a new field is when cuts happen.", "Aam taur pe nahi, agar aap aise role mein jao jo aapka experience use kare, jaise backend engineer se LLM engineer. Naye field mein zero se shuru karne pe kami hoti hai."]]
    ]
  }
});

if (typeof module !== "undefined" && module.exports) module.exports = { LESSON_DEEP };
