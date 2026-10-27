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
4. **Personalised roadmap.** Steps the person already knows are marked *fast-track*
   and shortened. The timeline is converted to calendar months using their weekly
   hours and checked against their target date. Progress ticks are saved in the
   browser.

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
| `tests/` | Persona-based tests for the recommendation logic |

## Development

No build step. Open `index.html` in a browser, or serve the folder with any static server.

```bash
npm test   # runs the persona tests with Node's built-in test runner (Node 18+)
```

When you change weights in `scoring.js` or add a role, add or adjust a persona in
`tests/personas.js` that describes who the change is for. The tests also run 20,000
random answer sets to check that nothing crashes and every role can still be recommended.

## License

MIT
