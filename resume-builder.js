// Resume builder: upload a resume (PDF, Word .docx or pasted text) or start from a role's sample,
// pick the target role and add the skills it asks for, choose an ATS-safe template, edit, and
// download as PDF (print dialog) or Word. Everything runs in the browser: files are never uploaded.
// The resume can also pre-fill the career questionnaire (aipf:v2) with what it reveals.
// ResumeBuilder.mount(el, { role, lang, embedded }) renders it anywhere: resume-builder.html mounts
// it on #builderApp; the Learn section mounts it inside a course.
var ResumeBuilder = (function () {
  const KEY = "aipf:builder";
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  };
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const PDFJS = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/";

  const UI_ALL = {
    en: {
      title: "Resume builder", intro: "Upload your resume or start from a sample, choose the AI role you want, add the skills it needs, pick a template and download it as PDF or Word.",
      private: "🔒 Your file is read inside your browser. Nothing is uploaded to any server.",
      steps: ["Start", "Target role & skills", "Template", "Edit & download"],
      upload: "Upload your resume", uploadHint: "PDF, Word (.docx) or .txt", choose: "Choose a file", drop: "or drop it here",
      paste: "Paste your resume text", pasteHint: "Copy everything from your current resume and paste it here.", usePaste: "Use this text",
      sample: "Start from the sample", sampleHint: "A realistic, ATS-friendly resume for this role. Replace the details with yours.",
      blank: "Start blank", blankHint: "Empty sections with the right headings, ready to fill in.",
      reading: "Reading your file…", readOk: "Done! We found {n} sections. Check them in the next steps.",
      readFail: "We couldn't read this file. Try a .docx file, or paste the text instead.", scanned: "This PDF looks like a scanned image, so it has no text to read. Paste the text instead, or upload a .docx.",
      continueBtn: "Continue", back: "Back", next: "Next",
      role: "Which role are you applying for?", match: "ATS keyword match", have: "Already in your resume", missing: "Missing: tick the ones you really have",
      addSel: "Add ticked skills", added: "Added to your skills section.", custom: "Add another skill", addBtn: "Add",
      headline: "Headline", useHeadline: "Use “{t}” as my headline", summaryIdea: "Summary idea from the sample", useSummary: "Use as a starting point",
      honestNote: "Only add skills you can talk about in an interview. They will ask.",
      template: "Choose a template", templateNote: "All five are single column with standard headings and real text, so applicant tracking systems read them correctly. Preview is A4 with page breaks marked.",
      tpl: {
        harvard: ["Harvard Classic", "The format career offices recommend: Calibri style, centred name, clear rules. Safe everywhere."],
        executive: ["Executive Serif", "Elegant serif type and quiet navy accents. Great for senior and lead roles."],
        modern: ["Modern Minimal", "Clean sans serif, generous white space, subtle blue accent. The default for tech."],
        impact: ["Impact", "Adds a Selected Impact strip with your 3 best numbers at the top. Great for AI and product roles."],
        compact: ["Compact", "Tighter spacing to fit more on one page, for experienced profiles."]
      },
      impact: "Selected impact (optional: up to 3 short lines with numbers, shown in a strip in the Impact template)", suggestImpact: "Suggest from my bullets",
      score: "Resume score", scoreIntro: "Scored on a 100 point rubric used by popular resume skills: keywords, numbers, bullet quality, structure and tone.", fixFirst: "Fix these first",
      parts: { keywords: "Keyword coverage", placement: "Keywords in your experience", title: "Headline matches the role", parse: "Standard sections (ATS safe)", quant: "Results with numbers", bullets: "Bullet quality", scope: "Experience and progression", length: "Length", human: "Sounds human", hygiene: "Details and hygiene" },
      tips: {
        keywords: "Add the missing role skills you really have (step 2).", placement: "Mention your key skills inside experience or project bullets, not only in Skills.",
        title: "Use a headline that names the target role, like the suggestion in step 2.", parse: "Keep standard sections: Summary, Skills, Experience or Projects, Education.",
        quant: "Add a number to each achievement: %, ₹, time saved, users, scale.", bullets: "Start each bullet with an action verb (Built, Reduced, Led…) and avoid “Responsible for”. Keep bullets 8 to 40 words.",
        scope: "Add dates to each role and at least one project or second role to show progression.", length: "Trim to 1 page if you have under 5 years of experience, 2 pages at most.",
        human: "Use the tone check fixes below: no dashes, no hyphen chains, no buzzwords.", hygiene: "Replace placeholders with your real name, email and phone, and remove duplicate bullets."
      },
      coach: "Write bullets as: Accomplished X, measured by Y, by doing Z. Action verb + what you did + tech or context + result with a number.",
      verbs: "Strong verbs", pages: "{n} page(s)", pageEnds: "Page {n} ends here", tech: "Tip: add a line starting with Tech: under a role to list its tools, it shows in small italics.",
      edit: "Edit your resume", preview: "Live preview", name: "Full name", contact: "Contact line", summary: "Professional summary", skills: "Skills (one group per line, like Languages: Python, SQL)",
      sectionHint: "One line per role or project, like Data Analyst | Contoso, Pune | Jan 2023 to Present. Start achievement lines with •",
      up: "Move up", pdf: "Download PDF", word: "Download Word", copy: "Copy as text", startOver: "Start over",
      pdfNote: "In the print window, choose “Save as PDF”. The text stays selectable, so ATS can read it.",
      wordOk: "Word file downloaded. Open it in Word or Google Docs and save as .docx if needed.", copied: "Copied as plain text.",
      confirmOver: "Start over? Your current resume in the builder will be cleared.",
      check: "Human tone check", checkIntro: "Recruiters prefer resumes that sound like a person wrote them.",
      dashes: "{n} dashes (— or –). Plain commas and “to” read more naturally.", fixDashes: "Replace dashes",
      hyphens: "Hyphenated words: {w}", fixHyphens: "Write them without hyphens",
      buzz: "Overused phrases: {w}. Show it with a result instead.", noNumbers: "{n} achievement lines have no number. Add a result like time saved, %, ₹ or users.",
      allGood: "Reads naturally. Nice work.", quiz: "Use my resume for the career questionnaire", quizHint: "We'll fill the answers your resume already shows (experience, skills, background). You check them and answer the rest.",
      quizDone: "Filled {n} answers. Opening the questionnaire…", fromFile: "From your file", saved: "Saved in this browser"
    },
    hi: {
      title: "Resume builder", intro: "Apna resume upload karo ya sample se shuru karo, jo AI role chahiye woh chuno, uske skills add karo, template chuno aur PDF ya Word mein download karo.",
      private: "🔒 Aapki file aapke browser ke andar hi padhi jaati hai. Kisi server pe upload nahi hoti.",
      steps: ["Shuru", "Role aur skills", "Template", "Edit aur download"],
      upload: "Apna resume upload karo", uploadHint: "PDF, Word (.docx) ya .txt", choose: "File chuno", drop: "ya yahan drop karo",
      paste: "Resume ka text paste karo", pasteHint: "Apne current resume se sab copy karke yahan paste karo.", usePaste: "Yeh text use karo",
      sample: "Sample se shuru karo", sampleHint: "Is role ke liye ek realistic, ATS friendly resume. Details apni daal do.",
      blank: "Khaali se shuru karo", blankHint: "Sahi headings ke saath khaali sections, bharne ke liye ready.",
      reading: "Aapki file padh rahe hain…", readOk: "Ho gaya! {n} sections mile. Agle steps mein check karo.",
      readFail: "Yeh file padh nahi paaye. .docx try karo, ya text paste karo.", scanned: "Yeh PDF scanned image lagti hai, isme padhne layak text nahi hai. Text paste karo ya .docx upload karo.",
      continueBtn: "Aage badho", back: "Peeche", next: "Aage",
      role: "Kis role ke liye apply kar rahe ho?", match: "ATS keyword match", have: "Aapke resume mein pehle se hai", missing: "Missing: jo sach mein aate hain unhe tick karo",
      addSel: "Tick kiye skills add karo", added: "Skills section mein add ho gaye.", custom: "Koi aur skill add karo", addBtn: "Add",
      headline: "Headline", useHeadline: "“{t}” ko headline banao", summaryIdea: "Sample se summary ka idea", useSummary: "Isse shuru karo",
      honestNote: "Sirf wahi skills add karo jin par interview mein baat kar sako. Woh poochhenge.",
      template: "Template chuno", templateNote: "Paancho single column hain, standard headings aur asli text ke saath, isliye ATS inhe sahi padhta hai. Preview A4 size ka hai, page breaks marked hain.",
      tpl: {
        harvard: ["Harvard Classic", "Woh format jo career offices suggest karte hain: Calibri style, beech mein naam, saaf lines. Har jagah safe."],
        executive: ["Executive Serif", "Sundar serif font aur halke navy accents. Senior aur lead roles ke liye badhiya."],
        modern: ["Modern Minimal", "Saaf sans serif, khuli jagah, halka blue accent. Tech ke liye default."],
        impact: ["Impact", "Upar aapke 3 best numbers ki Selected Impact strip. AI aur product roles ke liye badhiya."],
        compact: ["Compact", "Kam spacing taaki ek page mein zyaada aaye, experienced profiles ke liye."]
      },
      impact: "Selected impact (optional: numbers wali 3 chhoti lines, Impact template mein strip mein dikhti hain)", suggestImpact: "Mere bullets se suggest karo",
      score: "Resume score", scoreIntro: "Popular resume skills ke 100 point rubric pe score: keywords, numbers, bullet quality, structure aur tone.", fixFirst: "Pehle yeh theek karo",
      parts: { keywords: "Keyword coverage", placement: "Experience mein keywords", title: "Headline role se match", parse: "Standard sections (ATS safe)", quant: "Numbers ke saath results", bullets: "Bullet quality", scope: "Experience aur progression", length: "Lambai", human: "Insaan jaisa likha", hygiene: "Details aur safai" },
      tips: {
        keywords: "Jo role skills sach mein aati hain unhe add karo (step 2).", placement: "Key skills ko sirf Skills mein nahi, experience ya project bullets mein bhi likho.",
        title: "Aisi headline rakho jisme target role ho, jaise step 2 ka suggestion.", parse: "Standard sections rakho: Summary, Skills, Experience ya Projects, Education.",
        quant: "Har achievement mein number daalo: %, ₹, bacha time, users, scale.", bullets: "Har bullet action verb se shuru karo (Built, Reduced, Led…) aur “Responsible for” se bacho. Bullets 8 se 40 shabd.",
        scope: "Har role ke saath dates daalo aur kam se kam ek project ya doosra role, taaki progression dikhe.", length: "5 saal se kam experience ho to 1 page, zyaada se zyaada 2 page.",
        human: "Neeche tone check ke fixes use karo: dashes nahi, hyphen nahi, buzzwords nahi.", hygiene: "Placeholders ki jagah apna asli naam, email aur phone daalo, aur duplicate bullets hatao."
      },
      coach: "Bullets aise likho: Accomplished X, measured by Y, by doing Z. Action verb + kya kiya + tech ya context + number ke saath result.",
      verbs: "Mazboot verbs", pages: "{n} page", pageEnds: "Page {n} yahan khatam", tech: "Tip: role ke neeche Tech: se shuru line likho, uske tools chhote italic mein dikhenge.",
      edit: "Resume edit karo", preview: "Live preview", name: "Poora naam", contact: "Contact line", summary: "Professional summary", skills: "Skills (har line mein ek group, jaise Languages: Python, SQL)",
      sectionHint: "Har role ya project ki ek line, jaise Data Analyst | Contoso, Pune | Jan 2023 to Present. Achievement lines • se shuru karo",
      up: "Upar le jao", pdf: "PDF download", word: "Word download", copy: "Text copy karo", startOver: "Phir se shuru",
      pdfNote: "Print window mein “Save as PDF” chuno. Text selectable rehta hai, isliye ATS padh paata hai.",
      wordOk: "Word file download ho gayi. Word ya Google Docs mein kholo aur zaroorat ho to .docx mein save karo.", copied: "Plain text copy ho gaya.",
      confirmOver: "Phir se shuru karein? Builder ka current resume clear ho jaayega.",
      check: "Human tone check", checkIntro: "Recruiters ko aise resume pasand hain jo ek insaan ne likhe lagte hain.",
      dashes: "{n} dashes (— ya –). Simple comma aur “to” zyada natural lagte hain.", fixDashes: "Dashes hatao",
      hyphens: "Hyphen wale words: {w}", fixHyphens: "Bina hyphen ke likho",
      buzz: "Ghise pite phrases: {w}. Iske badle ek result dikhao.", noNumbers: "{n} achievement lines mein koi number nahi. Result daalo jaise time bacha, %, ₹ ya users.",
      allGood: "Natural lagta hai. Badhiya.", quiz: "Mere resume se career questionnaire bharo", quizHint: "Jo jawaab aapka resume pehle se batata hai (experience, skills, background) hum bhar denge. Aap check karo aur baaki ke jawaab do.",
      quizDone: "{n} jawaab bhar diye. Questionnaire khol rahe hain…", fromFile: "Aapki file se", saved: "Is browser mein save hua"
    }
  };

  let root = null, embedded = false, lang = "en", UI = UI_ALL.en;
  let S = null; // { step, role, template, doc, rawText }
  const save = () => store.set(KEY, S);
  const t = (k, vars = {}) => String(UI[k]).replace(/\{(\w+)\}/g, (_, v) => vars[v]);
  const roleIds = () => Object.keys(ROLES);

  // ---------- document model ----------
  // doc = { name, headline, contact, summary, skills, sections: [{ id, title, text }] }
  // Section text: one line per entry ("Title | Company, City | Dates"), lines starting with • are bullets.
  const SECTION_TITLES = { experience: "Professional Experience", projects: "Projects", education: "Education", certifications: "Certifications", achievements: "Achievements" };
  const blankDoc = () => ({
    name: "", headline: "", contact: "", summary: "", skills: "", impact: "",
    sections: ["experience", "projects", "education", "certifications"].map(id => ({ id, title: SECTION_TITLES[id], text: "" }))
  });

  function sampleDoc(role) {
    const r = RESUMES[role];
    const exp = r.experience.map(e => `${e.title} | ${e.company}, ${e.location} | ${e.dates}\n${e.bullets.map(b => `• ${b}`).join("\n")}`).join("\n\n");
    const proj = r.projects.map(p => `${p.name} | ${p.link}\n${p.bullets.map(b => `• ${b}`).join("\n")}`).join("\n\n");
    const sections = [
      { id: "experience", title: SECTION_TITLES.experience, text: exp },
      { id: "projects", title: SECTION_TITLES.projects, text: proj },
      { id: "education", title: SECTION_TITLES.education, text: r.education.map(([d, s]) => `${d} | ${s}`).join("\n") },
      { id: "certifications", title: SECTION_TITLES.certifications, text: r.certifications.map(c => `• ${c}`).join("\n") }
    ];
    if (r.projectsFirst) sections.unshift(sections.splice(1, 1)[0]);
    const doc = { name: "Your Name", headline: r.target, contact: r.contact, summary: r.summary, skills: r.skills.map(([k, v]) => `${k}: ${v}`).join("\n"), impact: "", sections };
    doc.impact = suggestImpact(doc).join("\n");
    return doc;
  }

  // ---------- reading files ----------
  async function readFile(file) {
    const name = file.name.toLowerCase();
    const buf = await file.arrayBuffer();
    if (name.endsWith(".pdf") || file.type === "application/pdf") return pdfText(buf);
    if (name.endsWith(".docx")) return docxText(buf);
    if (name.endsWith(".txt") || name.endsWith(".md") || file.type.startsWith("text/")) return new TextDecoder().decode(buf);
    if (name.endsWith(".doc")) {
      // Old binary .doc can't be parsed in the browser; our own "Word" downloads are HTML, which can.
      const s = new TextDecoder().decode(buf);
      if (/<html/i.test(s)) { const d = new DOMParser().parseFromString(s, "text/html"); return d.body.innerText || d.body.textContent; }
    }
    throw new Error("unsupported");
  }

  // Minimal ZIP reader for .docx: find word/document.xml through the central directory and inflate it.
  async function unzipEntry(buf, wanted) {
    const v = new DataView(buf);
    let eocd = -1;
    for (let i = buf.byteLength - 22; i >= Math.max(0, buf.byteLength - 66000); i--) if (v.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
    if (eocd < 0) throw new Error("not a zip");
    const count = v.getUint16(eocd + 10, true);
    let p = v.getUint32(eocd + 16, true);
    for (let n = 0; n < count; n++) {
      const method = v.getUint16(p + 10, true), size = v.getUint32(p + 20, true);
      const nameLen = v.getUint16(p + 28, true), extraLen = v.getUint16(p + 30, true), commentLen = v.getUint16(p + 32, true);
      const local = v.getUint32(p + 42, true);
      const fname = new TextDecoder().decode(new Uint8Array(buf, p + 46, nameLen));
      if (fname === wanted) {
        const start = local + 30 + v.getUint16(local + 26, true) + v.getUint16(local + 28, true);
        const data = new Uint8Array(buf, start, size);
        if (method === 0) return new TextDecoder().decode(data);
        const stream = new Blob([data]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
        return await new Response(stream).text();
      }
      p += 46 + nameLen + extraLen + commentLen;
    }
    throw new Error("no document.xml");
  }

  async function docxText(buf) {
    const xml = await unzipEntry(buf, "word/document.xml");
    const d = new DOMParser().parseFromString(xml, "application/xml");
    const W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
    return [...d.getElementsByTagNameNS(W, "p")].map(par => {
      const text = [...par.getElementsByTagNameNS(W, "t")].map(x => x.textContent).join("").replace(/\s+/g, " ").trim();
      const isList = par.getElementsByTagNameNS(W, "numPr").length > 0;
      return text && isList && !/^[•\-*▪●◦]/.test(text) ? `• ${text}` : text;
    }).join("\n");
  }

  let pdfReady = null;
  function loadPdfJs() {
    if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
    if (!pdfReady) pdfReady = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = PDFJS + "pdf.min.js";
      s.onload = () => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS + "pdf.worker.min.js"; resolve(window.pdfjsLib); };
      s.onerror = () => { pdfReady = null; reject(new Error("pdf.js failed to load")); };
      document.head.appendChild(s);
    });
    return pdfReady;
  }

  async function pdfText(buf) {
    const lib = await loadPdfJs();
    const pdf = await lib.getDocument({ data: new Uint8Array(buf) }).promise;
    const lines = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const content = await (await pdf.getPage(i)).getTextContent();
      let line = "", lastY = null;
      content.items.forEach(it => {
        const y = Math.round(it.transform[5]);
        if (lastY !== null && Math.abs(y - lastY) > 2 && line.trim()) { lines.push(line.trim()); line = ""; }
        line += it.str;
        lastY = y;
        if (it.hasEOL && line.trim()) { lines.push(line.trim()); line = ""; lastY = null; }
      });
      if (line.trim()) lines.push(line.trim());
    }
    return lines.join("\n");
  }

  // ---------- understanding resume text ----------
  const HEADINGS = [
    ["summary", /^(professional\s+)?(summary|profile|objective|career objective|about me|career summary)$/],
    ["skills", /^(technical\s+|key\s+|core\s+)?(skills|competencies|core competencies|skills & tools|tools & technologies|technologies|skill set)$/],
    ["experience", /^(professional\s+|work\s+|relevant\s+)?(experience|employment|employment history|work history|career history)$/],
    ["projects", /^(academic\s+|personal\s+|key\s+)?projects$/],
    ["education", /^(education|academics|academic background|qualifications|educational qualifications)$/],
    ["certifications", /^(certifications?|certificates|courses|training|licenses & certifications)$/],
    ["achievements", /^(achievements|awards|honou?rs|accomplishments|awards & achievements)$/]
  ];
  const headingOf = line => {
    const s = line.toLowerCase().replace(/[:|]+$/, "").replace(/\s+/g, " ").trim();
    if (s.length > 40) return null;
    const hit = HEADINGS.find(([, re]) => re.test(s));
    return hit ? hit[0] : null;
  };
  const CONTACT_RE = /@|\+?\d[\d\s()-]{8,}\d|linkedin|github\.com|portfolio|www\./i;
  const BULLET_RE = /^\s*[•\-*▪●◦‣·o]\s+/;

  function parseResume(text) {
    const lines = text.replace(/\r/g, "").split("\n").map(l => l.replace(/\s+/g, " ").replace(/ /g, " ").trim()).filter(Boolean);
    const doc = blankDoc();
    doc.sections.forEach(s => { s.text = ""; });
    const top = [];
    let current = null;
    const buckets = {};
    lines.forEach(line => {
      const h = headingOf(line);
      if (h) { current = h; buckets[h] = buckets[h] || []; return; }
      if (!current) top.push(line);
      else buckets[current].push(line);
    });
    // Header: name, headline and contact details from the lines before the first heading.
    const contacts = [];
    top.forEach(l => {
      if (CONTACT_RE.test(l)) contacts.push(l.split(/\s+[|•·]\s+|\s*\|\s*/).join(" · "));
      else if (!doc.name && l.split(" ").length <= 5) doc.name = l;
      else if (!doc.headline && l.length < 80) doc.headline = l;
      else doc.summary += (doc.summary ? " " : "") + l;
    });
    doc.contact = contacts.join(" · ");
    if (buckets.summary) doc.summary = (doc.summary ? doc.summary + " " : "") + buckets.summary.join(" ");
    if (buckets.skills) doc.skills = buckets.skills.map(l => l.replace(BULLET_RE, "")).join("\n");
    const joinWrapped = arr => {
      const out = [];
      arr.forEach(l => {
        const isBullet = BULLET_RE.test(l);
        const prev = out[out.length - 1];
        // A PDF wraps long bullets onto several lines: glue lines that continue a bullet.
        if (!isBullet && prev && prev.startsWith("• ") && (/^[a-z(,&]/.test(l) || !/[.!?;]$/.test(prev))) {
          if (!/\|/.test(l) && !/\b(19|20)\d{2}\b/.test(l)) { out[out.length - 1] = prev + " " + l; return; }
        }
        out.push(isBullet ? `• ${l.replace(BULLET_RE, "")}` : l);
      });
      return out;
    };
    // Put a blank line before each new entry header, so entries are easy to see while editing.
    const asText = arr => joinWrapped(arr).map((l, i, all) => (i > 0 && !l.startsWith("• ") && all[i - 1].startsWith("• ") ? "\n" : "") + l).join("\n");
    ["experience", "projects", "education"].forEach(id => { if (buckets[id]) doc.sections.find(s => s.id === id).text = asText(buckets[id]); });
    if (buckets.certifications) doc.sections.find(s => s.id === "certifications").text = buckets.certifications.map(l => `• ${l.replace(BULLET_RE, "")}`).join("\n");
    if (buckets.achievements) doc.sections.push({ id: "achievements", title: SECTION_TITLES.achievements, text: buckets.achievements.map(l => `• ${l.replace(BULLET_RE, "")}`).join("\n") });
    const found = Object.keys(buckets).length + (doc.name ? 1 : 0);
    return { doc, found };
  }

  // What a resume says about the questionnaire's answers (questions.js ids and values).
  function profileFromText(text, expText = "") {
    const s = " " + text.toLowerCase() + " ";
    const exp = expText.toLowerCase();
    const has = re => re.test(s);
    const a = {};
    // Experience: an explicit "N years", or the span between the earliest year and now.
    const now = new Date().getFullYear();
    let years = null;
    const m = s.match(/(\d{1,2})\+?\s*(years|yrs)/);
    if (m) years = Number(m[1]);
    else {
      // Earliest year in the experience section to now (falls back to the whole text minus study years).
      const src = /\b(19|20)\d{2}\b/.test(exp) ? exp : s;
      const ys = [...src.matchAll(/\b(19[89]\d|20[0-4]\d)\b/g)].map(x => Number(x[1])).filter(y => y <= now);
      const first = ys.length ? Math.min(...ys) : null;
      if (first && /present|current|till date|to date|now/.test(src)) years = Math.max(0, now - first - (src === s && has(/b\.?tech|bca|mca|b\.?sc|degree|university|college/) ? 3 : 0));
    }
    if (years !== null) a.experience = years < 1 ? "0" : years < 3 ? "1-3" : years < 7 ? "3-7" : years < 12 ? "7-12" : "12+";
    const isAi = has(/machine learning engineer|ml engineer|data scientist|ai engineer|applied scientist|research scientist/);
    const isIt = has(/developer|engineer|software|tester|qa\b|devops|analyst|programmer|architect|sre\b|product manager|scrum/);
    if (isAi) a.background = "aiml";
    else if (isIt) a.background = "it";
    else if (a.experience === "0" || (!a.experience && has(/student|fresher|graduate|internship|intern\b/))) a.background = "graduate";
    else if (text.trim().length > 200) a.background = "nonit";
    if (a.background === "it" || a.background === "aiml") {
      const scores = {
        qa: /\b(qa|quality assurance|tester|testing|selenium|test automation|test cases)\b/g, devops: /\b(devops|sre|kubernetes|terraform|ci\/cd|jenkins|ansible)\b/g,
        dataeng: /\b(data engineer|etl|spark|airflow|data pipeline|dbt|snowflake|databricks)\b/g, analyst: /\b(power bi|tableau|data analyst|business intelligence|bi analyst|excel)\b/g,
        frontend: /\b(react|angular|vue|frontend|front end|css|ui developer)\b/g, fullstack: /\b(full stack|fullstack|mern|mean stack)\b/g,
        mobile: /\b(android|ios|flutter|react native|swift|kotlin)\b/g, backend: /\b(backend|back end|spring|microservices|rest api|\.net|node\.js|django|java developer)\b/g,
        pm: /\b(product manager|business analyst|scrum master|product owner|project manager|roadmap)\b/g, lead: /\b(architect|tech lead|technical lead|engineering manager|team lead)\b/g,
        support: /\b(production support|it support|l2|l3|incident management|service desk)\b/g
      };
      const best = Object.entries(scores).map(([k, re]) => [k, (s.match(re) || []).length]).sort((x, y) => y[1] - x[1])[0];
      if (best && best[1] > 0) a.currentRole = best[0];
    }
    const langs = [];
    if (has(/\bpython\b/)) langs.push("python");
    if (has(/\b(javascript|typescript|node\.js|react)\b/)) langs.push("js");
    if (has(/\b(java|kotlin|spring)\b/)) langs.push("java");
    if (has(/\b(c#|\.net|asp\.net)/)) langs.push("csharp");
    if (has(/\bc\+\+|\bc\/c\+\+/)) langs.push("cpp");
    if (has(/\b(golang|go lang|rust)\b/)) langs.push("go");
    if (langs.length) a.langs = langs;
    if (langs.includes("python")) a.pythonLevel = has(/\b(pytest|asyncio|packag|fastapi|django|flask)\b/) ? "3" : has(/\b(pandas|numpy|scikit|pytorch)\b/) ? "2" : "1";
    if (has(/\bsql\b|mysql|postgres|oracle|sql server/)) a.sql = has(/spark|snowflake|bigquery|redshift|warehouse|query optimi|tuning/) ? "3" : has(/join|postgres|mysql|schema|stored procedure/) ? "2" : "1";
    if (has(/\b(aws|azure|gcp|google cloud|docker|kubernetes)\b/)) a.cloud = has(/kubernetes|terraform|eks|aks|gke|helm/) ? "3" : has(/docker|ci\/cd|github actions|jenkins|ec2|lambda/) ? "2" : "1";
    if (has(/neurips|icml|iclr|acl\b|arxiv|publication|published paper/)) a.ml = "5";
    else if (has(/deployed (a |the )?(ml|machine learning|model)|production (ml|model)|mlflow|model monitoring|model serving|sagemaker/)) a.ml = "4";
    else if (has(/scikit|pytorch|tensorflow|keras|xgboost|trained (a |the )?model|random forest|(linear|logistic) regression|regression model|classification model|classifier/)) a.ml = "3";
    else if (has(/\b(llm|rag|langchain|openai|prompt engineering|chatbot|gpt|embeddings|vector database)\b/)) a.ml = "2";
    else if (has(/chatgpt|copilot|claude|gemini/)) a.ml = "1";
    if (has(/\b(bank|fintech|payments|insurance|finance|accounting|lending)\b/)) a.bizDomain = "finance";
    else if (has(/\b(hospital|health|pharma|clinical|medical)\b/)) a.bizDomain = "healthcare";
    else if (has(/\b(retail|e-?commerce|ecommerce|store|fmcg)\b/)) a.bizDomain = "retail";
    else if (has(/\b(logistics|supply chain|manufactur|warehouse operations|shipment)\b/)) a.bizDomain = "logistics";
    return a;
  }

  function fillQuestionnaire() {
    const text = S.rawText || docText(S.doc);
    const exp = (S.doc.sections.find(x => x.id === "experience") || {}).text || "";
    const found = profileFromText(text, exp);
    const st = Object.assign({ view: "intro", answers: {}, qid: null, roleId: null }, store.get("aipf:v2") || {});
    let n = 0;
    Object.entries(found).forEach(([k, v]) => {
      const cur = st.answers[k];
      if (cur === undefined || cur === "" || (Array.isArray(cur) && !cur.length)) { st.answers[k] = v; n++; }
    });
    st.view = "intro";
    store.set("aipf:v2", st);
    store.set("aipf:prefill", { count: n, fields: Object.keys(found), at: Date.now() });
    return n;
  }

  // ---------- rendering the resume ----------
  const isTail = s => /\b(19|20)\d{2}\b|present|current|\.com|\.io|\.site|\.dev|github|linkedin|\//i.test(s);
  function entriesHtml(text, listOnly) {
    const out = [];
    let open = null;
    const close = () => { if (open) { out.push(`<ul>${open.join("")}</ul>`); open = null; } };
    text.split("\n").map(l => l.trim()).forEach(l => {
      if (!l) { close(); return; }
      if (/^tech\s*:/i.test(l)) { close(); out.push(`<p class="rs-tech">${esc(l.replace(/^tech\s*:\s*/i, ""))}</p>`); return; }
      if (l.startsWith("•") || l.startsWith("- ") || l.startsWith("* ") || listOnly) {
        (open = open || []).push(`<li>${esc(l.replace(/^[•\-*]\s*/, ""))}</li>`);
        return;
      }
      close();
      const parts = l.split(/\s+\|\s+/);
      const tail = parts.length > 1 && isTail(parts[parts.length - 1]) ? parts.pop() : "";
      out.push(`<p class="rs-entry-head"><span><strong>${esc(parts[0])}</strong>${parts.slice(1).map(x => `, ${esc(x)}`).join("")}</span>${tail ? ` <span class="rs-dates">${esc(tail)}</span>` : ""}</p>`);
    });
    close();
    return out.join("");
  }

  function sheetHtml(doc) {
    const skills = doc.skills.split("\n").map(l => l.trim()).filter(Boolean).map(l => {
      const i = l.indexOf(":");
      return i > 0 && i < 40 ? `<li><strong>${esc(l.slice(0, i))}:</strong> ${esc(l.slice(i + 1).trim())}</li>` : `<li>${esc(l)}</li>`;
    }).join("");
    const impact = (doc.impact || "").split("\n").map(l => l.replace(/^[•\-*]\s*/, "").trim()).filter(Boolean).slice(0, 3);
    return `<header class="rs-head">
        <h2 class="rs-name">${esc(doc.name || "Your Name")}</h2>
        ${doc.headline ? `<p class="rs-title">${esc(doc.headline)}</p>` : ""}
        ${doc.contact ? `<p class="rs-contact">${contactHtml(doc.contact)}</p>` : ""}
      </header>
      ${doc.summary ? `<section><h3>Professional Summary</h3><p>${esc(doc.summary)}</p></section>` : ""}
      ${impact.length ? `<section class="rs-impact"><h3>Selected Impact</h3><ul>${impact.map(x => `<li>${esc(x)}</li>`).join("")}</ul></section>` : ""}
      ${skills ? `<section><h3>Skills</h3><ul class="rs-skills">${skills}</ul></section>` : ""}
      ${doc.sections.filter(s => s.text.trim()).map(s => `<section><h3>${esc(s.title)}</h3>${entriesHtml(s.text, s.id === "certifications" || s.id === "achievements")}</section>`).join("")}`;
  }

  // Contact line with clickable email and profile links (still plain text for ATS).
  function contactHtml(line) {
    return line.split(/\s*[·|]\s*/).filter(Boolean).map(part => {
      const p = part.trim();
      if (/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(p)) return `<a href="mailto:${esc(p)}">${esc(p)}</a>`;
      if (/^(https?:\/\/)?(www\.)?(linkedin\.com|github\.com|[\w-]+\.(dev|io|site|me))\//i.test(p)) return `<a href="${esc(/^https?:/i.test(p) ? p : "https://" + p)}">${esc(p.replace(/^https?:\/\//, ""))}</a>`;
      return esc(p);
    }).join(" · ");
  }

  // Up to 3 strongest achievements (bullets with %, ₹ or big numbers), shortened for the impact strip.
  function suggestImpact(doc) {
    const bullets = doc.sections.filter(x => ["experience", "projects"].includes(x.id)).flatMap(x => x.text.split("\n")).filter(l => l.trim().startsWith("•")).map(l => l.replace(/^•\s*/, "").trim());
    const weight = b => (/%/.test(b) ? 3 : 0) + (/₹|\$|crore|lakh/i.test(b) ? 3 : 0) + (/\d[\d,.]*\s?(m|k|million)\b/i.test(b) ? 2 : 0) + (/\d/.test(b) ? 1 : 0) + (/\b(improv|reduc|increas|cut|rais|sav|grew|lift|drop|halv|doubl)/i.test(b) && /\d/.test(b) ? 1 : 0);
    // Keep the clause that carries the number, so "…; improved recall by 31%" keeps its 31%.
    const best = b => b.split(/;\s|\.\s/).map(c => c.trim()).sort((x, y) => weight(y) - weight(x))[0];
    const tidy = c => { const c2 = c.replace(/\.$/, ""); return c2.charAt(0).toUpperCase() + c2.slice(1); };
    return bullets.filter(b => weight(b) > 0).sort((a, b) => weight(b) - weight(a)).slice(0, 3).map(b => tidy(best(b)));
  }

  const docText = doc => [doc.name, doc.headline, doc.contact, "", "PROFESSIONAL SUMMARY", doc.summary, "", "SKILLS", doc.skills,
    ...(doc.impact ? ["", "SELECTED IMPACT", doc.impact] : []),
    ...doc.sections.filter(s => s.text.trim()).flatMap(s => ["", s.title.toUpperCase(), s.text])].join("\n").replace(/\n{3,}/g, "\n\n").trim();

  // Inline styles for the Word download, one set per template (Word ignores external CSS).
  const WORD_CSS = {
    harvard: `body{font-family:Calibri,Carlito,Arial,sans-serif;font-size:10.5pt;color:#000;line-height:1.25}.rs-head{text-align:center}h2{font-size:16pt;margin:0}.rs-title{font-size:11pt}.rs-contact{font-size:9.5pt}h3{font-size:11.5pt;text-transform:uppercase;border-bottom:1px solid #000;margin:10pt 0 4pt;padding-bottom:1pt}.rs-tech{font-style:italic;color:#555;font-size:9.5pt}`,
    executive: `body{font-family:Cambria,Georgia,serif;font-size:10.5pt;color:#1a1a1a;line-height:1.3}.rs-head{text-align:center;border-bottom:3px double #1f2a44;padding-bottom:6pt}h2{font-size:22pt;margin:0;letter-spacing:1.5pt;color:#1f2a44}.rs-title{font-size:11pt;color:#1f2a44;letter-spacing:1pt;text-transform:uppercase}.rs-contact{font-size:9.5pt}h3{font-size:10.5pt;letter-spacing:2pt;text-transform:uppercase;color:#1f2a44;border-bottom:1px solid #b8bfcc;margin:12pt 0 4pt;padding-bottom:2pt}.rs-tech{font-style:italic;color:#555;font-size:9.5pt}`,
    modern: `body{font-family:Calibri,Arial,sans-serif;font-size:10.5pt;color:#1e293b;line-height:1.3}h2{font-size:20pt;margin:0;color:#0f172a}.rs-title{font-size:11pt;color:#2a5db0}.rs-contact{font-size:9.5pt;color:#475569}h3{font-size:9.5pt;letter-spacing:1.5pt;text-transform:uppercase;color:#2a5db0;border-bottom:1px solid #cbd5e1;margin:12pt 0 4pt;padding-bottom:2pt}.rs-tech{font-style:italic;color:#64748b;font-size:9.5pt}`,
    impact: `body{font-family:Calibri,Arial,sans-serif;font-size:10.5pt;color:#1e293b;line-height:1.3}h2{font-size:20pt;margin:0;color:#0f172a}.rs-title{font-size:11pt;color:#0f766e}.rs-contact{font-size:9.5pt;color:#475569}h3{font-size:9.5pt;letter-spacing:1.5pt;text-transform:uppercase;color:#0f766e;border-bottom:1px solid #99d5cc;margin:12pt 0 4pt;padding-bottom:2pt}.rs-impact li{font-weight:bold}.rs-tech{font-style:italic;color:#64748b;font-size:9.5pt}`,
    compact: `body{font-family:Calibri,Arial,sans-serif;font-size:9.5pt;color:#000;line-height:1.15}h2{font-size:15pt;margin:0}.rs-title{font-size:10pt}.rs-contact{font-size:9pt}h3{font-size:10pt;text-transform:uppercase;border-bottom:1px solid #777;margin:7pt 0 2pt;padding-bottom:1pt}.rs-tech{font-style:italic;color:#555;font-size:9pt}`
  };
  WORD_CSS.classic = WORD_CSS.harvard; // an older saved choice

  // ---------- human tone check ----------
  const KEEP_HYPHEN = /^(scikit-learn|t-sql|wi-fi|e-mail|x-ray|co-op|gpt-\w+|llama-\w+|[a-z]+-\d[\w.]*)$/i;
  const BUZZ = ["results-driven", "results driven", "synergy", "go-getter", "hardworking", "hard-working", "team player", "detail-oriented", "detail oriented", "dynamic", "passionate", "self-starter", "think outside the box", "proven track record", "dedicated professional", "leveraged"];
  function toneCheck(doc) {
    const all = [doc.headline, doc.summary, doc.skills, ...doc.sections.map(s => s.text)].join("\n");
    const dashes = (all.match(/[—–]|(?<=\S) - (?=\S)/g) || []).length;
    const hyphenWords = [...new Set((all.match(/\b[A-Za-z]+(?:-[A-Za-z]+)+\b/g) || []).filter(w => !KEEP_HYPHEN.test(w)))];
    const buzz = BUZZ.filter(b => all.toLowerCase().includes(b));
    const bullets = doc.sections.filter(s => ["experience", "projects"].includes(s.id)).flatMap(s => s.text.split("\n").filter(l => l.trim().startsWith("•")));
    const noNum = bullets.filter(b => !/\d/.test(b)).length;
    return { dashes, hyphenWords, buzz, noNum };
  }
  function mapDoc(fn) {
    ["headline", "summary", "skills"].forEach(k => { S.doc[k] = fn(S.doc[k]); });
    S.doc.sections.forEach(s => { s.text = fn(s.text); });
  }
  // "Jan 2023 – Present" → "Jan 2023 to Present"; any other dash becomes a comma.
  const fixDashes = s => s.replace(/(\d)\s*(?:[–—]|(?<=\d) - )\s*(?=\d|present|current|now|till|date)/gi, "$1 to ")
    .replace(/\s*[—–]\s*/g, ", ").replace(/(?<=\S) - (?=\S)/g, ", ");
  const fixHyphens = s => s.replace(/\b[A-Za-z]+(?:-[A-Za-z]+)+\b/g, w => KEEP_HYPHEN.test(w) ? w : /^e-commerce$/i.test(w) ? w.replace("-", "") : w.replace(/-/g, " "));

  // ---------- resume score (100 points) ----------
  // Rubric adapted from popular open source Claude resume skills: keyword coverage 25, placement 10,
  // title 5, parse safety 10, quantification 15, bullet quality 10, scope 10, length 5, humanisation 5,
  // hygiene 5. It only measures what's on the page; it never invents content.
  const ACTION = /^(built|led|designed|developed|shipped|launched|reduced|increased|improved|cut|automated|created|delivered|drove|migrated|scaled|optimi[sz]ed|implemented|owned|grew|saved|deployed|wrote|trained|fine tuned|analy[sz]ed|introduced|set up|ran|defined|presented|managed|mentored|raised|architected|engineered|established|streamlined|resolved|negotiated|partnered|won|achieved|accelerated|boosted|halved|doubled|lowered|secured|published|reproduced|evaluated|instrumented|integrated|rebuilt|refactored|replaced|consolidated|standardi[sz]ed|piloted|converted|enabled|tested|validated|modelled|modeled|forecast|documented|coached|hired|spearheaded|orchestrated|containeri[sz]ed)\b/i;
  const WEAK = /^(responsible for|worked on|helped|assisted|involved in|participated|duties included|handled|tasked with)/i;
  const VERBS = ["Built", "Shipped", "Reduced", "Increased", "Automated", "Led", "Designed", "Migrated", "Scaled", "Cut", "Launched", "Improved"];
  function scoreResume(doc, role) {
    const r = RESUMES[role];
    const all = docText(doc).toLowerCase();
    const kws = [...new Set(r.keywords.concat(ROLES[role].skills || []))];
    const present = kws.filter(k => all.includes(k.toLowerCase()));
    const work = doc.sections.filter(x => ["experience", "projects"].includes(x.id)).map(x => x.text).join("\n");
    const bullets = work.split("\n").map(l => l.trim()).filter(l => l.startsWith("•")).map(l => l.replace(/^•\s*/, ""));
    const words = all.split(/\s+/).filter(Boolean).length;
    const years = (() => { const m = all.match(/(\d{1,2})\+?\s*(years|yrs)/); return m ? Number(m[1]) : 0; })();
    const pages = Math.max(1, Math.ceil(words / 560));
    const tone = toneCheck(doc);
    const titleWords = (ROLES[role].title + " " + r.target).toLowerCase().split(/[^a-z]+/).filter(w => w.length > 2 && !["engineer", "path", "focus", "the", "and"].includes(w));
    const has = re => re.test(all);
    const entries = doc.sections.filter(x => x.id === "experience").flatMap(x => x.text.split("\n")).filter(l => l.trim() && !l.trim().startsWith("•") && !/^tech\s*:/i.test(l.trim()));
    const dated = entries.filter(l => /\b(19|20)\d{2}\b/.test(l)).length;
    const projects = doc.sections.filter(x => x.id === "projects").some(x => x.text.trim());
    const dupes = bullets.length - new Set(bullets.map(b => b.toLowerCase())).size;
    const parts = {
      keywords: [Math.round(25 * present.length / Math.max(1, kws.length)), 25],
      placement: [present.length ? Math.round(10 * present.filter(k => work.toLowerCase().includes(k.toLowerCase())).length / present.length) : 0, 10],
      title: [titleWords.some(w => (doc.headline || "").toLowerCase().includes(w)) ? 5 : (doc.headline ? 2 : 0), 5],
      parse: [(doc.summary ? 2.5 : 0) + (doc.skills ? 2.5 : 0) + (work.trim() ? 2.5 : 0) + (doc.sections.some(x => x.id === "education" && x.text.trim()) ? 2.5 : 0), 10],
      quant: [bullets.length ? Math.round(15 * bullets.filter(b => /\d/.test(b)).length / bullets.length) : 0, 15],
      bullets: [bullets.length ? Math.round(10 * bullets.filter(b => ACTION.test(b) && !WEAK.test(b) && b.split(/\s+/).length >= 8 && b.split(/\s+/).length <= 40).length / bullets.length) : 0, 10],
      scope: [(dated ? 5 : entries.length ? 2 : 0) + (entries.length > 1 || projects ? 3 : 0) + (/\d/.test(doc.summary || "") ? 2 : 0), 10],
      length: [pages <= (years >= 5 ? 2 : 1) ? 5 : pages <= 2 ? 3 : 0, 5],
      human: [Math.max(0, 5 - (tone.dashes ? 1 : 0) - (tone.hyphenWords.length ? 1 : 0) - (tone.buzz.length ? 2 : 0)), 5],
      hygiene: [(doc.name && !/your name/i.test(doc.name) ? 1 : 0) + (has(/[^\s@]+@[^\s@]+\.[a-z]{2,}/) && !has(/your\.name@/) ? 1 : 0) + (has(/\+?\d[\d\s()-]{8,}\d/) && !has(/xxx/) ? 1 : 0) + (!has(/yourname|your university|your college/) ? 1 : 0) + (dupes ? 0 : 1), 5]
    };
    const total = Math.round(Object.values(parts).reduce((t, [g]) => t + g, 0));
    return { total, parts, pages };
  }

  function scoreHtml() {
    const sc = scoreResume(S.doc, S.role);
    const rows = Object.entries(sc.parts);
    const weak = rows.filter(([, [g, m]]) => g < m * 0.8).sort((a, b) => (a[1][0] / a[1][1]) - (b[1][0] / b[1][1])).slice(0, 3);
    return `<details class="rb-score" open><summary><span class="iv-ring small" style="--p:${sc.total}"><span>${sc.total}</span></span>
        <span><strong>${esc(UI.score)}: ${sc.total} / 100</strong><br><span class="tiny muted">${esc(UI.scoreIntro)}</span></span></summary>
      <ul class="rb-score-rows">${rows.map(([k, [g, m]]) => `<li><span>${esc(UI.parts[k])}</span><span class="meter ${g < m * 0.6 ? "have" : "progress"}" aria-hidden="true"><span style="width:${Math.max(3, 100 * g / m)}%"></span></span><strong>${Math.round(g)}/${m}</strong></li>`).join("")}</ul>
      ${weak.length ? `<p class="small"><strong>🎯 ${esc(UI.fixFirst)}:</strong></p><ul class="small">${weak.map(([k]) => `<li>${esc(UI.tips[k])}</li>`).join("")}</ul>` : ""}
    </details>`;
  }

  // Professional fonts for the preview and PDF (Carlito matches Calibri's metrics).
  const FONTS = "https://fonts.googleapis.com/css2?family=Carlito:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap";
  function loadFonts() {
    if (typeof document === "undefined" || document.querySelector("link[data-rb-fonts]")) return;
    const l = document.createElement("link");
    l.rel = "stylesheet"; l.href = FONTS; l.setAttribute("data-rb-fonts", "");
    document.head.appendChild(l);
  }

  // Scale the A4 preview to fit its column and mark where pages break.
  function fitPaper() {
    root.querySelectorAll(".rb-thumb").forEach(th => { th.querySelector(".rb-sheet").style.transform = `scale(${th.clientWidth / 794})`; });
    const wrap = root.querySelector(".rb-paper");
    if (!wrap) return;
    const sheet = wrap.querySelector(".rb-sheet");
    const scale = Math.min(1, wrap.clientWidth / 794);
    sheet.style.transform = `scale(${scale})`;
    const h = sheet.offsetHeight;
    wrap.style.height = `${Math.ceil(h * scale)}px`;
    const pageH = 1123;
    const n = Math.max(1, Math.ceil((h - 4) / pageH));
    sheet.querySelectorAll(".rb-break").forEach(x => x.remove());
    for (let i = 1; i < n; i++) {
      const m = document.createElement("div");
      m.className = "rb-break"; m.style.top = `${i * pageH}px`; m.setAttribute("aria-hidden", "true");
      m.textContent = t("pageEnds", { n: i });
      sheet.appendChild(m);
    }
    const pc = root.querySelector("[data-pages]");
    if (pc) pc.textContent = `📄 ${t("pages", { n })}`;
  }

  // ---------- views ----------
  function render() {
    const steps = UI.steps.map((label, i) => `<li><button type="button" class="rb-step${S.step === i + 1 ? " current" : ""}" data-step="${i + 1}" ${i > 0 && !S.doc ? "disabled" : ""}${S.step === i + 1 ? ' aria-current="step"' : ""}><span class="rb-num">${i + 1}</span>${esc(label)}</button></li>`).join("");
    const body = S.step === 1 || !S.doc ? startView() : S.step === 2 ? roleView() : S.step === 3 ? templateView() : editView();
    root.innerHTML = `<div class="rb">
      ${embedded ? "" : `<p class="muted">${esc(UI.intro)}</p>`}
      <ol class="rb-steps">${steps}</ol>
      <div class="rb-body">${body}</div>
    </div>`;
    bind();
    fitPaper();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitPaper);
  }

  function startView() {
    const role = ROLES[S.role];
    return `<p class="small rb-private">${esc(UI.private)}</p>
      <div class="rb-start">
        <section class="rb-card rb-upload" data-drop>
          <span class="rb-icon" aria-hidden="true">📤</span><h3>${esc(UI.upload)}</h3><p class="small muted">${esc(UI.uploadHint)}</p>
          <label class="button btn-primary btn-small rb-file">${esc(UI.choose)}<input type="file" accept=".pdf,.docx,.txt,.doc,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain" data-file hidden></label>
          <p class="tiny muted">${esc(UI.drop)}</p>
          <p class="small" data-read-status role="status"></p>
        </section>
        <section class="rb-card">
          <span class="rb-icon" aria-hidden="true">📄</span><h3>${esc(UI.sample)}</h3><p class="small muted">${esc(UI.sampleHint)}</p>
          <label class="small">${esc(UI.role)}<select data-role-select class="rb-select">${roleIds().map(r => `<option value="${r}"${r === S.role ? " selected" : ""}>${esc(ROLES[r].title)}</option>`).join("")}</select></label>
          <button type="button" class="button btn-secondary btn-small" data-act="sample">${esc(UI.sample)} →</button>
        </section>
        <section class="rb-card">
          <span class="rb-icon" aria-hidden="true">✏️</span><h3>${esc(UI.blank)}</h3><p class="small muted">${esc(UI.blankHint)}</p>
          <button type="button" class="button btn-secondary btn-small" data-act="blank">${esc(UI.blank)} →</button>
        </section>
      </div>
      <details class="rb-paste">
        <summary>📋 ${esc(UI.paste)}</summary>
        <p class="small muted">${esc(UI.pasteHint)}</p>
        <textarea class="iv-text" rows="8" data-paste></textarea>
        <button type="button" class="button btn-secondary btn-small" data-act="paste">${esc(UI.usePaste)}</button>
      </details>
      ${S.doc ? `<div class="lesson-nav"><span class="small muted">${role ? esc(role.title) : ""}</span><button type="button" class="button btn-primary" data-step="2">${esc(UI.continueBtn)} →</button></div>` : ""}`;
  }

  function roleView() {
    const r = RESUMES[S.role];
    const text = docText(S.doc).toLowerCase();
    const kws = [...new Set(r.keywords.concat(ROLES[S.role].skills || []))];
    const have = kws.filter(k => text.includes(k.toLowerCase()));
    const miss = kws.filter(k => !text.includes(k.toLowerCase()));
    const pct = Math.round((100 * have.length) / kws.length);
    return `<label class="rb-role"><strong>${esc(UI.role)}</strong>
        <select data-role-select class="rb-select">${roleIds().map(id => `<option value="${id}"${id === S.role ? " selected" : ""}>${esc(ROLES[id].title)}</option>`).join("")}</select></label>
      <div class="rb-match"><div class="iv-ring" style="--p:${pct}"><span>${pct}%</span></div>
        <div><p class="eyebrow">${esc(UI.match)}</p><p class="small muted">${have.length} / ${kws.length} · ${esc(UI.honestNote)}</p></div></div>
      ${have.length ? `<h4>✓ ${esc(UI.have)}</h4><p>${have.map(k => `<span class="chip chip-key">${esc(k)}</span>`).join(" ")}</p>` : ""}
      ${miss.length ? `<h4>${esc(UI.missing)}</h4>
        <div class="rb-miss">${miss.map(k => `<label class="iv-point"><input type="checkbox" data-kw="${esc(k)}"> ${esc(k)}</label>`).join("")}</div>
        <button type="button" class="button btn-primary btn-small" data-act="add-kw">${esc(UI.addSel)}</button>` : ""}
      <div class="rb-inline"><input type="text" class="rb-input" data-custom placeholder="${esc(UI.custom)}" aria-label="${esc(UI.custom)}"><button type="button" class="button btn-secondary btn-small" data-act="add-custom">${esc(UI.addBtn)}</button></div>
      <p class="small ok-text" data-added role="status"></p>
      <h4>${esc(UI.headline)}</h4>
      <p class="small">${esc(S.doc.headline || "—")}</p>
      ${S.doc.headline !== r.target ? `<button type="button" class="link-btn small" data-act="headline">${esc(t("useHeadline", { t: r.target }))}</button>` : ""}
      <details class="rb-idea"><summary>💡 ${esc(UI.summaryIdea)}</summary><p class="small">${esc(r.summary)}</p>
        <button type="button" class="link-btn small" data-act="use-summary">${esc(UI.useSummary)}</button></details>
      ${navButtons(1, 3)}`;
  }

  function templateView() {
    return `<h3>${esc(UI.template)}</h3><p class="small muted">${esc(UI.templateNote)}</p>
      <div class="rb-templates">${Object.keys(UI.tpl).map(k => `<button type="button" class="rb-tpl${S.template === k ? " current" : ""}" data-tpl="${k}" aria-pressed="${S.template === k}">
          <span class="rb-thumb"><span class="resume-sheet rb-sheet tpl-${k}">${sheetHtml(S.doc)}</span></span>
          <strong>${esc(UI.tpl[k][0])}</strong><span class="small muted">${esc(UI.tpl[k][1])}</span></button>`).join("")}</div>
      ${navButtons(2, 4)}`;
  }

  function toneItems() {
    const tone = toneCheck(S.doc);
    const issues = [];
    if (tone.dashes) issues.push(`<li>${esc(t("dashes", { n: tone.dashes }))} <button type="button" class="link-btn small" data-act="fix-dashes">${esc(UI.fixDashes)}</button></li>`);
    if (tone.hyphenWords.length) issues.push(`<li>${esc(t("hyphens", { w: tone.hyphenWords.slice(0, 8).join(", ") }))} <button type="button" class="link-btn small" data-act="fix-hyphens">${esc(UI.fixHyphens)}</button></li>`);
    if (tone.buzz.length) issues.push(`<li>${esc(t("buzz", { w: tone.buzz.join(", ") }))}</li>`);
    if (tone.noNum) issues.push(`<li>${esc(t("noNumbers", { n: tone.noNum }))}</li>`);
    return issues.join("") || `<li class="ok-text">${esc(UI.allGood)}</li>`;
  }

  function editView() {
    const d = S.doc;
    const field = (k, label, rows) => rows
      ? `<label class="rb-field"><span>${esc(label)}</span><textarea class="iv-text" rows="${rows}" data-field="${k}">${esc(d[k])}</textarea></label>`
      : `<label class="rb-field"><span>${esc(label)}</span><input type="text" class="rb-input" data-field="${k}" value="${esc(d[k])}"></label>`;
    return `<div class="rb-edit">
      <div class="rb-form">
        <h3>${esc(UI.edit)}</h3>
        ${field("name", UI.name)}${field("headline", UI.headline)}${field("contact", UI.contact)}
        ${field("summary", UI.summary, 4)}${field("skills", UI.skills, 4)}
        <label class="rb-field"><span>${esc(UI.impact)}</span><textarea class="iv-text" rows="3" data-field="impact">${esc(d.impact || "")}</textarea></label>
        <p class="small"><button type="button" class="link-btn small" data-act="suggest-impact">✨ ${esc(UI.suggestImpact)}</button></p>
        <div class="rb-coach"><p class="small"><strong>✍️ ${esc(UI.coach)}</strong></p>
          <p class="small">${esc(UI.verbs)}: ${VERBS.map(v => `<span class="chip">${v}</span>`).join(" ")}</p>
          <p class="tiny muted">${esc(UI.tech)}</p></div>
        ${d.sections.map((s, i) => `<div class="rb-field"><span class="rb-sec-head"><input type="text" class="rb-input rb-sec-title" data-sec-title="${i}" value="${esc(s.title)}" aria-label="Section title">
            ${i > 0 ? `<button type="button" class="link-btn small" data-up="${i}" title="${esc(UI.up)}">↑ ${esc(UI.up)}</button>` : ""}</span>
          <textarea class="iv-text rb-mono" rows="${Math.min(14, Math.max(4, s.text.split("\n").length + 1))}" data-sec="${i}">${esc(s.text)}</textarea></div>`).join("")}
        <p class="tiny muted">${esc(UI.sectionHint)}</p>
        <section class="rb-tone"><h4>🗣️ ${esc(UI.check)}</h4><p class="small muted">${esc(UI.checkIntro)}</p>
          <ul class="small" data-tone>${toneItems()}</ul></section>
      </div>
      <div class="rb-preview">
        <div class="resume-toolbar">
          <button type="button" class="button btn-primary btn-small" data-act="pdf">⬇️ ${esc(UI.pdf)}</button>
          <button type="button" class="button btn-secondary btn-small" data-act="word">📄 ${esc(UI.word)}</button>
          <button type="button" class="button btn-secondary btn-small" data-act="copy">📋 ${esc(UI.copy)}</button>
          <span class="small muted" data-status role="status"></span>
        </div>
        <p class="tiny muted">${esc(UI.pdfNote)} <span data-pages></span></p>
        <div data-score>${scoreHtml()}</div>
        <div class="rb-paper"><article class="resume-sheet rb-sheet rb-print tpl-${S.template}" aria-label="${esc(UI.preview)}">${sheetHtml(d)}</article></div>
        <div class="rb-quiz"><p class="small"><strong>🧭 ${esc(UI.quiz)}</strong><br><span class="muted">${esc(UI.quizHint)}</span></p>
          <button type="button" class="button btn-secondary btn-small" data-act="quiz">${esc(UI.quiz)} →</button></div>
        <p class="small" style="text-align:right"><button type="button" class="link-btn small" data-act="over">${esc(UI.startOver)}</button></p>
      </div>
    </div>
    ${navButtons(3, 0)}`;
  }

  const navButtons = (prev, next) => `<div class="lesson-nav">
      ${prev ? `<button type="button" class="button btn-secondary" data-step="${prev}">← ${esc(UI.back)}</button>` : "<span></span>"}
      ${next ? `<button type="button" class="button btn-primary" data-step="${next}">${esc(UI.next)} →</button>` : "<span></span>"}</div>`;

  // ---------- events ----------
  function go(step) {
    S.step = step;
    save();
    render();
    const r = root.getBoundingClientRect();
    if (r.top < 0) root.scrollIntoView({ block: "start" });
  }
  const say = (sel, msg) => { const el = root.querySelector(sel); if (el) { el.textContent = msg; } };

  async function useFile(file) {
    say("[data-read-status]", UI.reading);
    try {
      const text = await readFile(file);
      if (!text || text.replace(/\s/g, "").length < 40) { say("[data-read-status]", UI.scanned); return; }
      useText(text);
    } catch (e) {
      say("[data-read-status]", UI.readFail);
    }
  }
  function useText(text) {
    const { doc, found } = parseResume(text);
    S.doc = doc;
    S.rawText = text;
    save();
    say("[data-read-status]", t("readOk", { n: found }));
    setTimeout(() => go(2), 700);
  }

  function addSkills(list) {
    if (!list.length) return;
    const lines = S.doc.skills.split("\n").filter(l => l.trim());
    const i = lines.findIndex(l => /^additional skills:/i.test(l));
    if (i >= 0) lines[i] += ", " + list.join(", ");
    else lines.push("Additional Skills: " + list.join(", "));
    S.doc.skills = lines.join("\n");
    save();
    render();
    say("[data-added]", UI.added);
  }

  function refreshPreview() {
    save();
    const sheet = root.querySelector(".rb-preview .rb-sheet");
    if (sheet) sheet.innerHTML = sheetHtml(S.doc);
    fitPaper();
    clearTimeout(refreshPreview.t);
    refreshPreview.t = setTimeout(() => {
      const tone = root.querySelector("[data-tone]");
      if (tone) { tone.innerHTML = toneItems(); bindTone(); }
      const sc = root.querySelector("[data-score]");
      if (sc) { const open = sc.querySelector("details") ? sc.querySelector("details").open : true; sc.innerHTML = scoreHtml(); sc.querySelector("details").open = open; }
    }, 500);
  }
  function bindTone() {
    root.querySelectorAll('[data-act="fix-dashes"]').forEach(b => b.onclick = () => { mapDoc(fixDashes); save(); render(); });
    root.querySelectorAll('[data-act="fix-hyphens"]').forEach(b => b.onclick = () => { mapDoc(fixHyphens); save(); render(); });
  }

  function bind() {
    const on = (sel, fn) => root.querySelectorAll(sel).forEach(el => el.addEventListener("click", fn));
    on("[data-step]", e => { const n = Number(e.currentTarget.dataset.step); if (n === 1 || S.doc) go(n); });
    const file = root.querySelector("[data-file]");
    if (file) file.addEventListener("change", () => file.files[0] && useFile(file.files[0]));
    const drop = root.querySelector("[data-drop]");
    if (drop) {
      ["dragenter", "dragover"].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add("over"); }));
      ["dragleave", "drop"].forEach(ev => drop.addEventListener(ev, () => drop.classList.remove("over")));
      drop.addEventListener("drop", e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) useFile(f); });
    }
    root.querySelectorAll("[data-role-select]").forEach(sel => sel.addEventListener("change", () => { S.role = sel.value; save(); if (S.step === 2) render(); }));
    on('[data-act="sample"]', () => { S.doc = sampleDoc(S.role); S.rawText = ""; save(); go(2); });
    on('[data-act="blank"]', () => { S.doc = blankDoc(); S.rawText = ""; save(); go(2); });
    on('[data-act="paste"]', () => { const v = root.querySelector("[data-paste]").value; if (v.trim().length > 20) useText(v); });
    on('[data-act="add-kw"]', () => addSkills([...root.querySelectorAll("[data-kw]:checked")].map(c => c.dataset.kw)));
    on('[data-act="add-custom"]', () => { const v = root.querySelector("[data-custom]").value.trim(); if (v) addSkills([v]); });
    const custom = root.querySelector("[data-custom]");
    if (custom) custom.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); const v = custom.value.trim(); if (v) addSkills([v]); } });
    on('[data-act="suggest-impact"]', () => { S.doc.impact = suggestImpact(S.doc).join("\n"); save(); render(); });
    on('[data-act="headline"]', () => { S.doc.headline = RESUMES[S.role].target; save(); render(); });
    on('[data-act="use-summary"]', () => { S.doc.summary = RESUMES[S.role].summary; save(); render(); });
    on("[data-tpl]", e => { S.template = e.currentTarget.dataset.tpl; save(); render(); });
    root.querySelectorAll("[data-field]").forEach(el => el.addEventListener("input", () => { S.doc[el.dataset.field] = el.value; refreshPreview(); }));
    root.querySelectorAll("[data-sec]").forEach(el => el.addEventListener("input", () => { S.doc.sections[Number(el.dataset.sec)].text = el.value; refreshPreview(); }));
    root.querySelectorAll("[data-sec-title]").forEach(el => el.addEventListener("input", () => { S.doc.sections[Number(el.dataset.secTitle)].title = el.value; refreshPreview(); }));
    on("[data-up]", e => { const i = Number(e.currentTarget.dataset.up); const s = S.doc.sections; [s[i - 1], s[i]] = [s[i], s[i - 1]]; save(); render(); });
    bindTone();
    on('[data-act="pdf"]', printPdf);
    on('[data-act="word"]', () => {
      const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>Resume</title>
<style>@page{margin:1.8cm 2cm}p{margin:0 0 4pt}ul{margin:2pt 0 6pt 18pt;padding:0}li{margin:0 0 2pt}.rs-title{font-weight:bold;font-size:12pt}.rs-contact{font-size:10pt}.rs-entry-head{margin-top:6pt}.rs-dates{float:right}.rs-skills{list-style:none;margin-left:0}${WORD_CSS[S.template]}</style></head><body>${sheetHtml(S.doc)}</body></html>`;
      download("﻿" + html, "application/msword", fileName("doc"));
      say("[data-status]", UI.wordOk);
    });
    on('[data-act="copy"]', () => {
      const text = docText(S.doc);
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => say("[data-status]", UI.copied), () => download(text, "text/plain", fileName("txt")));
      else download(text, "text/plain", fileName("txt"));
    });
    on('[data-act="quiz"]', () => {
      const n = fillQuestionnaire();
      say("[data-status]", t("quizDone", { n }));
      setTimeout(() => { location.href = "./#app"; }, 600);
    });
    on('[data-act="over"]', () => { if (confirm(UI.confirmOver)) { S = { step: 1, role: S.role, template: S.template, doc: null, rawText: "" }; save(); go(1); } });
  }

  // Print only the resume, from a hidden frame, so the page around it never affects the PDF.
  function printPdf() {
    const f = document.createElement("iframe");
    f.setAttribute("aria-hidden", "true");
    f.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
    document.body.appendChild(f);
    const d = f.contentDocument;
    d.open();
    d.write(`<!doctype html><html><head><meta charset="utf-8"><title>${esc(fileName("pdf").replace(/\.pdf$/, ""))}</title><base href="${esc(document.baseURI)}">
<link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="${FONTS}"><style>@page{size:A4;margin:${S.template === "compact" ? "0.55in 0.6in" : "0.7in 0.75in"}}html,body{background:#fff;margin:0}.resume-sheet{border:none !important;box-shadow:none !important;width:auto !important;max-width:none !important;padding:0 !important;transform:none !important;border-radius:0 !important}</style></head>
<body><article class="resume-sheet rb-sheet tpl-${S.template}">${sheetHtml(S.doc)}</article></body></html>`);
    d.close();
    let printed = false;
    const go = () => { if (printed) return; printed = true; f.contentWindow.focus(); f.contentWindow.print(); setTimeout(() => f.remove(), 60000); };
    const ready = () => (d.fonts && d.fonts.ready ? d.fonts.ready.then(go) : go());
    let loaded = 0;
    d.querySelectorAll("link").forEach(l => { const done = () => { if (++loaded === 2) ready(); }; l.addEventListener("load", done); l.addEventListener("error", done); });
    setTimeout(go, 2500);
  }

  const fileName = ext => `${(S.doc.name || "Resume").replace(/[^\p{L}\p{N}]+/gu, "")}Resume.${ext}`;
  function download(content, type, name) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([content], { type }));
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  }

  function mount(el, opts = {}) {
    root = el;
    embedded = !!opts.embedded;
    lang = opts.lang === "hi" ? "hi" : "en";
    UI = UI_ALL[lang];
    const saved = store.get(KEY);
    S = Object.assign({ step: 1, role: null, template: "harvard", doc: null, rawText: "" }, saved || {});
    if (!UI.tpl[S.template]) S.template = "harvard";
    if (S.doc && S.doc.impact === undefined) S.doc.impact = "";
    loadFonts();
    if (!mount.resize) { mount.resize = true; window.addEventListener("resize", () => fitPaper()); }
    if (opts.role && ROLES[opts.role] && (!saved || !saved.doc || opts.forceRole)) S.role = opts.role;
    if (!ROLES[S.role]) S.role = roleIds()[0];
    if (!S.doc) S.step = 1;
    render();
  }

  return { mount, parseResume, profileFromText, sheetHtml, sampleDoc, toneCheck, fixDashes, fixHyphens, docText, scoreResume, suggestImpact };
})();

if (typeof module !== "undefined" && module.exports) module.exports = { ResumeBuilder };
if (typeof document !== "undefined" && document.getElementById("builderApp")) {
  const q = new URLSearchParams(location.search);
  const el = document.getElementById("builderApp");
  let cur = (() => { try { return JSON.parse(localStorage.getItem("aipf:lang")) === "hi" ? "hi" : "en"; } catch (e) { return "en"; } })();
  ResumeBuilder.mount(el, { role: q.get("role"), lang: cur, forceRole: !!q.get("role") });
  const paint = l => document.querySelectorAll("[data-site-lang]").forEach(b => { b.classList.toggle("active", b.dataset.siteLang === l); b.setAttribute("aria-pressed", b.dataset.siteLang === l); });
  paint(cur);
  document.querySelectorAll("[data-site-lang]").forEach(b => b.addEventListener("click", () => {
    cur = b.dataset.siteLang;
    try { localStorage.setItem("aipf:lang", JSON.stringify(cur)); } catch (e) { /* private mode */ }
    paint(cur);
    ResumeBuilder.mount(el, { lang: cur });
  }));
}
