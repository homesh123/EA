const fs = require('fs');
let s = fs.readFileSync('/workspace/app/roles.js','utf8');

// Add starter projects to data-engineer-ai
const old1 = '      { step: 5, title: "Target Data Platform Teams", what: "Apply for: Data Engineer (AI/ML), ML Data Engineer, Analytics Engineer roles.", time: "ongoing", sources: "LinkedIn, company career pages", sequence: "After portfolio.", subTopics: ["Resume tailoring", "Interview prep", "Portfolio presentation"], mindNotes: ["Highlight pipeline projects", "Show production experience"], keyHighlights: ["Highlight deployed pipelines", "Show data quality work", "Target AI data teams"] }';
const repl1 = '      { step: 5, title: "Target Data Platform Teams", what: "Apply for: Data Engineer (AI/ML), ML Data Engineer, Analytics Engineer roles.", time: "ongoing", sources: "LinkedIn, company career pages", sequence: "After portfolio.", subTopics: ["Resume tailoring", "Interview prep", "Portfolio presentation"], mindNotes: ["Highlight pipeline projects", "Show production experience"], keyHighlights: ["Highlight deployed pipelines", "Show data quality work", "Target AI data teams"], starterProjects: [ { name: "ETL Pipeline", url: "https://github.com/machine-learning-for-everyone/etl-pipeline", description: "Extract, Transform, Load pipeline using Python and Airflow", files: ["etl.py", "dag.py", "requirements.txt", "README.md"] }, { name: "Feature Store", url: "https://github.com/machine-learning-for-everyone/feature-store", description: "Simple feature store for ML models using PostgreSQL", files: ["feature_store.py", "schema.sql", "requirements.txt", "README.md"] } ] }';

if (s.includes(old1)) { s = s.replace(old1, repl1); console.log('data-engineer-ai updated'); }
else { console.log('data-engineer-ai OLD NOT FOUND'); }

// Add starter projects to ai-product-engineer
const old2 = '      { step: 5, title: "Target AI Product / Full-Stack Roles", what: "Apply for: AI Product Engineer, Full-Stack Engineer (AI), LLM Engineer roles.", time: "ongoing", sources: "LinkedIn, company career pages", sequence: "After portfolio.", subTopics: ["Resume building", "Interview prep", "Portfolio presentation"], mindNotes: ["Highlight shipped features", "Show live demos"], keyHighlights: ["Link to live demos", "Explain your architecture", "Target AI product teams"] }';
const repl2 = '      { step: 5, title: "Target AI Product / Full-Stack Roles", what: "Apply for: AI Product Engineer, Full-Stack Engineer (AI), LLM Engineer roles.", time: "ongoing", sources: "LinkedIn, company career pages", sequence: "After portfolio.", subTopics: ["Resume building", "Interview prep", "Portfolio presentation"], mindNotes: ["Highlight shipped features", "Show live demos"], keyHighlights: ["Link to live demos", "Explain your architecture", "Target AI product teams"], starterProjects: [ { name: "AI Chatbot", url: "https://github.com/machine-learning-for-everyone/ai-chatbot", description: "Simple chatbot using OpenAI API and React", files: ["chatbot.py", "index.html", "requirements.txt", "README.md"] }, { name: "AI Summarizer", url: "https://github.com/machine-learning-for-everyone/ai-summarizer", description: "Text summarization app using LLM APIs", files: ["summarizer.py", "app.py", "requirements.txt", "README.md"] } ] }';

if (s.includes(old2)) { s = s.replace(old2, repl2); console.log('ai-product-engineer updated'); }
else { console.log('ai-product-engineer OLD NOT FOUND'); }

fs.writeFileSync('/workspace/app/roles.js', s);
console.log('Done');