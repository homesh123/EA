# AI Path Finder: AI Career Consultation

A free, self-contained web app for people whose skills are going out of date, or
who want to move into AI and don't know which track to choose. A short questionnaire
recommends the best-fit AI role and a personalised learning roadmap, based on the
person's experience, abilities, working style and goals.

Live: https://homesh123.github.io/ai-career-advisor/

## How it works

1. **Questionnaire (about 20 questions, 5 sections).** Covers background, experience and
   current work, skill levels (Python, SQL, cloud, AI/ML, maths), a short **reasoning
   check**, preferred working style, interests, industry, goals, weekly study hours
   and target date. Questions that don't apply are skipped (for example, students
   don't see "current role").
2. **Validation.** Contradictory answers are corrected and explained. For example,
   "Python: none" while listing Python, or "maths: strong" while missing the maths
   check. The four reasoning questions (numbers, data intuition, systems thinking,
   problem framing) back up the self-ratings.
3. **Scoring** (`scoring.js`). Each role has weighted signals, and each signal comes
   with a human-readable reason. The result shows:
   - **Fit %**: how well the role suits the person.
   - **Readiness %**: how many of the role's core skills they already have.
   - **Why it fits** and **watch-outs**.
   - **Transferable strengths** from their current job.
   - **Skill gaps** with advice.
4. **Personalised roadmap planner.** Steps the person already knows are marked
   *fast-track* and shortened. Each step gets a week range and real dates at the
   person's pace. The pace can be changed on the results page, and the plan is
   checked against their target date. The roadmap also has:
   - a timeline bar and an "Up next" card;
   - progress tracking saved in the browser;
   - export to a calendar (.ics) file.

## Learn → practise → interview → resume

Each role has a complete path: **Overview → Lessons → Practice tasks → Interview prep guide →
Scored interview practice → Resume builder**. All of it runs inside the course on `learn.html`, so a
learner never has to leave the page: lessons from other courses open there as "extra lessons", the
scored practice (`InterviewApp`) and the resume builder (`ResumeBuilder`) are mounted inside it.
The homepage section "Learn for your target AI role" lets people pick a role, read what it involves
and who it suits, then start.

- **Animated diagrams** (`content/visuals.js`): 21 lessons include an animated SVG diagram, for
  example a ball rolling down the loss curve, attention arcs, the RAG pipeline, the agent loop and
  pods scaling. They're animated like GIFs but stay sharp, weigh a few KB, and become still images
  when the device asks for reduced motion.
- **Practice tasks** (`content/tasks.js`): 3 per role (starter, core, portfolio), each with steps,
  a deliverable and "done when" criteria, in English and Hinglish.
- **Interview prep guide** (`content/interview-prep.js`): 108 questions compiled from 2026 interview
  guides and candidate reports (sources listed in the file and on each page), 33 to 50 per role.
  - In the order a real interview goes: opening, fundamentals, role skills, design and cases,
    projects and behaviour, closing questions and salary.
  - Each has an easy model answer to study, the points a strong answer covers, what the interviewer
    is really checking, and links to the lessons that teach it.
  - The typical interview rounds for each role, and "I can answer this" tracking.
  - The static `interview/<slug>.html` pages include the full guide (with FAQ structured data).
- **Interview practice** (`interview.html`, `content/interview.js`): role-specific question sets.
  - Multiple-choice questions are scored automatically, with options shuffled per attempt.
  - Open questions are self-checked against key points and a model answer.
  - The report shows a score per skill area, explains every mistake, links the lessons for each gap,
    and offers "retry only what I missed".
  - Static Q&A pages per role (`interview/<slug>.html`) help with search.
- **Resume builder** (`resume-builder.html`, `resume-builder.js`):
  1. Start: upload a resume (PDF via pdf.js loaded on demand, Word .docx read with a tiny built in
     ZIP reader, or .txt), paste text, start from the role's sample, or start blank. Files are read in
     the browser and never uploaded.
  2. Target role and skills: ATS keyword match for the chosen role, tick missing skills to add them,
     use the role's headline and a summary idea.
  3. Template: Classic, Modern or Compact, all single column with standard headings.
  4. Edit and download: form editor with live preview, a "human tone" check (dashes, hyphenated
     words, buzzwords, bullets without numbers, with one click fixes), PDF (print of the resume only)
     or Word download.
  - "Use my resume for the career questionnaire" pre-fills the answers the resume clearly shows
    (experience, background, main work area, languages, Python, SQL, cloud, ML level, industry);
    the questionnaire then flags them for review.
- **Sample resumes** (`resumes/`, `content/resumes.js`): one ATS-friendly sample per role, written
  to sound human (no dashes or hyphenated phrasing, checked by a test).
  - Editable in the browser, with a live keyword checklist.
  - Downloads as Word (.doc), PDF (print) or plain text.
  - Tests check every ATS keyword appears in the resume and every experience bullet has a number.

## Learn section (English and Hinglish)

`learn.html` has a free course for each of the 9 roles. Each course follows that role's
roadmap step by step, starting with a "Start here" lesson.

- **54 lessons**, each with:
  - a real-life analogy (chai stall, Swiggy, cricket, kirana store…);
  - a plain-language explanation;
  - key terms;
  - a worked example (code or scenario) with a copy button;
  - step by step: how it works or how to do it;
  - common mistakes to avoid;
  - a quick check with instant feedback;
  - questions learners usually ask, with answers;
  - a one-line takeaway.
- **Two languages:** every lesson and the course screens can be read in English or Hinglish
  (Hindi in Roman script, with technical terms kept in English).
- **Listen (read aloud):** every lesson has a 🔊 Listen button that reads it aloud with the
  browser's built-in speech (no server, works offline), highlighting the part being read. It has
  pause/resume, stop and 0.75×–1.5× speed. Hinglish uses a Hindi (India) voice when the device has
  one. Code blocks and the quiz answer are not read.
- **Connected to the roadmap:** the course recommends the user's best-fit role and marks
  steps they already know. Finishing all lessons in a step offers to tick that step on their roadmap.
  The results page links each roadmap step to its lessons.
- **Saved progress:** completed lessons, quiz answers, language and last lesson are stored
  in the browser. Arrow keys move between lessons.
- **Crawlable copies:** every lesson also has a static page in both languages
  (`learn/<id>.html`, `learn/hi/<id>.html`) with `hreflang` links between them, so search
  engines and AI assistants can find and cite them.

Lesson content lives in `content/lessons-*.js` (`[English, Hinglish]` pairs); the step by step,
mistakes and learner questions are in `content/deep-*.js`. Which lessons
belong to each course and step is set in `content/learn-tracks.js`. The tests check that both
languages are complete, quiz answers are valid, every roadmap step has lessons, and prerequisites
come first.

## AI for kids (ages 5+)

`kids/` has a playful section for children: a hub with Robo's adventure map and six levels
(`content/kids.js`, games in `kids.js`, pages generated by `scripts/build.js`):

1. **What is AI?** Tap 🤖 or 🔧: which things use AI?
2. **How does AI learn?** The child teaches Robo fruits, then Robo guesses new pictures from what it
   was taught (teach it wrong and Robo gets it wrong).
3. **AI loves patterns.** What comes next?
4. **AI helpers all around us.** Match each helper to its job.
5. **Talking to AI.** Pick the clearer question.
6. **Be smart and safe.** Yes or no questions about checking answers and keeping private things private.

Every story and prompt can be read aloud (🔊), so children who can't read yet can play with a grown-up.
Stars, badges and an "AI Champion" printable certificate are saved in the browser only. English and
Hinglish, with sound effects that can be turned off, and a note for parents with free next steps.

## Roles covered

AI Foundations (freshers) · ML Engineer · Data Engineer (AI) · AI Product Engineer ·
MLOps / AI Platform Engineer · LLM / Agent Engineer · AI Research Engineer ·
AI Forward Deployed Engineer · AI Product Manager

## Project structure

| File | Purpose |
|---|---|
| `index.html` | Page shell, FAQ, SEO / structured data |
| `questions.js` | Questionnaire definition (sections, conditional questions, reasoning check) |
| `roles.js` | Role catalogue: requirements, market info, roadmaps |
| `scoring.js` | Profile validation, role ranking, readiness, gaps, timeline (no DOM; also runs in Node) |
| `app.js` | UI: intro, questions, review, results |
| `scripts/build.js` | Generates the static, crawlable pages from `roles.js` (see below) |
| `roles/*.html` | Generated landing page per AI role (do not edit by hand) |
| `for/*.html` | Generated "best AI roles for <background>" pages, ranked by the real scoring engine |
| `guide/*.html` | Generated guide ("How to choose the right AI role") and methodology page |
| `content/` | Hand-written copy: background pages, the guide, and the lesson library and course structure for Learn |
| `learn.html`, `learn.js` | The Learn section (interactive courses) |
| `tts.js` | "Listen" read-aloud player for lessons (Web Speech API) |
| `learn/*.html`, `learn/hi/*.html` | Generated static lesson pages in English and Hinglish |
| `interview.html`, `interview.js` | Scored interview practice (`InterviewApp`, also mounted in Learn); `interview/*.html` are generated prep guides and Q&A pages |
| `resume-builder.html`, `resume-builder.js` | Resume builder (`ResumeBuilder`, also mounted in Learn) |
| `resumes/*.html`, `resume.js` | Generated, editable ATS resume samples |
| `home.js` | Homepage role picker ("Learn for your target AI role") |
| `sitemap.xml`, `llms.txt` | Generated; `robots.txt`, `og-image.png`, `favicon.svg` are static |
| `tests/` | Persona tests for the recommendation logic, plus SEO / site checks |

## Development

No build step. Open `index.html` in a browser, or serve the folder with any static server.

```bash
npm run build   # regenerate role pages, the homepage comparison table, sitemap.xml and llms.txt
npm test        # recommendation tests + site checks (Node 18+, no dependencies)
```

After editing `roles.js`, or the FAQ in `index.html`, run `npm run build`. The tests fail if the
generated files are out of date. Bump `UPDATED` in `scripts/build.js` when content changes,
so `lastmod` and the "Updated" dates stay accurate.

## SEO, AEO and GEO

- **Search intent:** the homepage targets "AI career consultation", "AI role consultation" and
  "AI career counselling" (title, `<h1>`, description and FAQ), with a "How it works" section.
- **Long-tail pages:** "best AI roles for <background>" pages (QA testers, Java/.NET developers,
  DevOps, data, freshers/MCA, non-IT, PMs/BAs, senior engineers). Their recommendations come
  from `scoring.js`, so they always match the questionnaire.
- **Guide and methodology:** a 5-step "how to choose an AI role" framework with data tables, and
  a public methodology page listing every scoring signal. Answer engines can cite both.
- **Crawlable content without JavaScript:** one landing page per role
  (`roles/<slug>.html`) with the roadmap, key facts, salary and FAQ. The homepage
  also has a static comparison table and a "Which AI role should I choose?" quick answer.
- **Structured data (JSON-LD):** Organization, WebSite, WebApplication, Service (AI career
  consultation) and HowTo;
  ItemList of roles; and an FAQPage generated from the visible FAQ. Each role page
  also has WebPage, BreadcrumbList, Occupation (with US and India salary ranges),
  HowTo and FAQPage.
- **Answer-engine friendly:** each role page starts with a direct "Quick answer" and a
  key-facts table, then gives question-style headings.
- **AI crawlers:** `llms.txt` gives LLMs a plain-text summary. `robots.txt` explicitly
  allows GPTBot, ClaudeBot, PerplexityBot and Google-Extended.
- **Sharing and housekeeping:** sitemap with `lastmod`, canonical URLs, Open Graph and
  Twitter cards with `og-image.png`, a favicon, and a custom `404.html`.

When you change weights in `scoring.js` or add a role, add or adjust a persona in
`tests/personas.js` that describes who the change is for. The tests also run 20,000
random answer sets to check that nothing crashes and every role can still be recommended.

## License

MIT
