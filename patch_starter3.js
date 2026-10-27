const fs = require('fs');
let s = fs.readFileSync('/workspace/app/roles.js','utf8');

// Add starter projects to mlops-engineer
const old1 = '      { step: 5, title: "Target AI Platform / MLOps Roles", what: "Apply for: MLOps Engineer, AI Platform Engineer, ML Infrastructure Engineer roles.", time: "ongoing", sources: "LinkedIn, company career pages", sequence: "After portfolio.", subTopics: ["Resume tailoring", "Interview prep", "Portfolio presentation"], mindNotes: ["Highlight infrastructure projects", "Show reliability focus"], keyHighlights: ["Highlight deployed infrastructure", "Show CI/CD experience", "Target platform teams"] }';
const repl1 = '      { step: 5, title: "Target AI Platform / MLOps Roles", what: "Apply for: MLOps Engineer, AI Platform Engineer, ML Infrastructure Engineer roles.", time: "ongoing", sources: "LinkedIn, company career pages", sequence: "After portfolio.", subTopics: ["Resume tailoring", "Interview prep", "Portfolio presentation"], mindNotes: ["Highlight infrastructure projects", "Show reliability focus"], keyHighlights: ["Highlight deployed infrastructure", "Show CI/CD experience", "Target platform teams"], starterProjects: [ { name: "Model Serving API", url: "https://github.com/machine-learning-for-everyone/model-serving-api", description: "Deploy a ML model as REST API with FastAPI and Docker", files: ["app.py", "model.pkl", "Dockerfile", "requirements.txt", "README.md"] }, { name: "ML Pipeline", url: "https://github.com/machine-learning-for-everyone/ml-pipeline", description: "CI/CD pipeline for ML models with GitHub Actions", files: ["pipeline.py", ".github/workflows/ci.yml", "requirements.txt", "README.md"] } ] }';

if (s.includes(old1)) { s = s.replace(old1, repl1); console.log('mlops-engineer updated'); }
else { console.log('mlops-engineer OLD NOT FOUND'); }

// Add starter projects to llm-agent-engineer
const old2 = '      { step: 5, title: "Target Agent / Automation Engineering Roles", what: "Apply for: AI Agent Engineer, LLM Engineer, Automation Engineer (AI) roles.", time: "ongoing", sources: "LinkedIn, company career pages", sequence: "After portfolio.", subTopics: ["Resume building", "Interview prep", "Portfolio presentation"], mindNotes: ["Highlight autonomous agents", "Show tool integration"], keyHighlights: ["Link to agent demos", "Explain agent architecture", "Target agent engineering roles"] }';
const repl2 = '      { step: 5, title: "Target Agent / Automation Engineering Roles", what: "Apply for: AI Agent Engineer, LLM Engineer, Automation Engineer (AI) roles.", time: "ongoing", sources: "LinkedIn, company career pages", sequence: "After portfolio.", subTopics: ["Resume building", "Interview prep", "Portfolio presentation"], mindNotes: ["Highlight autonomous agents", "Show tool integration"], keyHighlights: ["Link to agent demos", "Explain agent architecture", "Target agent engineering roles"], starterProjects: [ { name: "Research Agent", url: "https://github.com/machine-learning-for-everyone/research-agent", description: "Autonomous research agent using LangChain", files: ["agent.py", "tools.py", "requirements.txt", "README.md"] }, { name: "Code Assistant", url: "https://github.com/machine-learning-for-everyone/code-assistant", description: "AI code assistant using LLM APIs", files: ["assistant.py", "tools.py", "requirements.txt", "README.md"] } ] }';

if (s.includes(old2)) { s = s.replace(old2, repl2); console.log('llm-agent-engineer updated'); }
else { console.log('llm-agent-engineer OLD NOT FOUND'); }

fs.writeFileSync('/workspace/app/roles.js', s);
console.log('Done');