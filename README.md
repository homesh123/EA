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

- **Crawlable content without JavaScript:** one landing page per role
  (`roles/<slug>.html`) with the roadmap, key facts, salary and FAQ. The homepage
  also has a static comparison table and a "Which AI role should I choose?" quick answer.
- **Structured data (JSON-LD):** Organization, WebSite and WebApplication;
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
