// Sample resumes, one per role, written for applicant tracking systems (ATS): single column,
// standard section headings, plain text (no tables, icons or images), keywords from real job
// descriptions, and impact bullets (action + result + number). Contact details are placeholders.
// Each sample shows a realistic career-switch profile for that role; companies are fictional.
// `keywords` are the terms an ATS is likely to scan for; tests check they all appear in the resume.
var RESUMES = (function () {
  const CONTACT = "City, India · +91 98XXX XXXXX · your.name@email.com · linkedin.com/in/yourname · github.com/yourname";
  return {
    "ai-fresher": {
      target: "Junior Machine Learning Engineer / AI Engineer Trainee",
      persona: "MCA graduate with a data internship",
      contact: CONTACT,
      summary: "MCA graduate and aspiring Machine Learning Engineer with hands-on projects in Python, SQL and scikit-learn. Built and deployed a loan-default classification model and an LLM-powered document Q&A app. Strong foundation in statistics, data cleaning and model evaluation, with a habit of shipping finished, documented work on GitHub.",
      skills: [
        ["Programming", "Python, SQL, Git, GitHub, Jupyter"],
        ["Data & ML", "Pandas, NumPy, scikit-learn, Machine Learning, Classification, Regression, Data Cleaning, Feature Engineering, Model Evaluation (precision, recall, F1)"],
        ["Statistics", "Descriptive Statistics, Probability, Hypothesis Testing"],
        ["AI & Tools", "LLM APIs, Prompt Engineering, Streamlit, Data Visualization (Matplotlib, Seaborn)"]
      ],
      projectsFirst: true,
      projects: [
        { name: "Loan Default Prediction · Python, scikit-learn, Streamlit", link: "github.com/yourname/loan-default", bullets: [
          "Trained Logistic Regression and Random Forest Classification models on 30,000 loan records; improved recall on defaults from 0.41 (baseline) to 0.74 at 0.68 precision.",
          "Handled missing values, outliers and class imbalance; documented every Data Cleaning decision in the README.",
          "Deployed an interactive Streamlit demo used by 120+ visitors from LinkedIn."
        ] },
        { name: "PDF Question-Answering Bot · Python, LLM API, Embeddings", link: "github.com/yourname/pdf-qa", bullets: [
          "Built an LLM app that answers questions from uploaded PDFs with source citations, using chunking and embeddings.",
          "Wrote a 25-question evaluation set; reduced unsupported answers from 9 to 2 by adding a 'not found' rule to the prompt."
        ] },
        { name: "Bengaluru Restaurant Analysis · Pandas, SQL", link: "github.com/yourname/restaurant-analysis", bullets: [
          "Cleaned 50,000 restaurant records with Pandas and NumPy and answered 6 business questions with SQL and groupby analysis.",
          "Showed with median-based Statistics that cost-for-two drives ratings less than delivery availability."
        ] }
      ],
      experience: [
        { title: "Data Analyst Intern", company: "Contoso Retail Pvt. Ltd.", location: "Pune", dates: "Jan 2025 – Jun 2025", bullets: [
          "Automated a weekly sales report with Python and SQL, cutting preparation time from 4 hours to 20 minutes.",
          "Built a dashboard tracking 12 KPIs across 40 stores, used in weekly regional reviews."
        ] }
      ],
      education: [["Master of Computer Applications (MCA)", "Your University · 2025 · CGPA 8.1"], ["Bachelor of Computer Applications (BCA)", "Your College · 2023"]],
      certifications: ["Machine Learning Specialization — DeepLearning.AI (Coursera)", "Google Machine Learning Crash Course"],
      keywords: ["Python", "SQL", "Machine Learning", "scikit-learn", "Pandas", "NumPy", "Statistics", "Git", "Classification", "Regression", "LLM", "Streamlit", "Data Cleaning", "Feature Engineering"]
    },

    "ml-engineer": {
      target: "Machine Learning Engineer",
      persona: "Backend engineer (6 years) moving into ML engineering",
      contact: CONTACT,
      summary: "Machine Learning Engineer with 6 years of backend experience in fintech and 2 years building production ML. Shipped an XGBoost fraud model serving 1.5M daily predictions through FastAPI and Docker, with MLflow tracking and drift monitoring. Combines strong software engineering with Feature Engineering, model evaluation and MLOps.",
      skills: [
        ["Languages", "Python, SQL, Java"],
        ["Machine Learning", "scikit-learn, XGBoost, LightGBM, PyTorch, Feature Engineering, Model Evaluation, A/B Testing"],
        ["MLOps & Serving", "Model Deployment, FastAPI, Docker, MLflow, Model Monitoring, CI/CD (GitHub Actions)"],
        ["Data & Cloud", "PostgreSQL, Spark, AWS (S3, SageMaker, ECS), Airflow"]
      ],
      projectsFirst: false,
      experience: [
        { title: "Senior Software Engineer (ML)", company: "Northwind Payments Pvt. Ltd.", location: "Bengaluru", dates: "Apr 2021 – Present", bullets: [
          "Built and deployed an XGBoost fraud-detection model with 40 engineered features; raised fraud recall from 0.62 to 0.81 at constant precision, saving an estimated ₹3.2 crore a year.",
          "Served the model through FastAPI and Docker on AWS ECS at 1.5M predictions/day with p95 latency of 38 ms.",
          "Introduced MLflow experiment tracking and a model registry, cutting time-to-production for new models from 6 weeks to 10 days.",
          "Set up Model Monitoring for data drift across 40 features with automated retraining alerts; caught a festival-season drift 5 days before it affected approvals.",
          "Ran an A/B Testing rollout with risk and product teams, confirming a 22% drop in chargebacks with no increase in false declines."
        ] },
        { title: "Software Engineer", company: "Fabrikam Logistics", location: "Hyderabad", dates: "Jul 2018 – Mar 2021", bullets: [
          "Developed Java and Python microservices for shipment tracking handling 300K requests/day.",
          "Built a delivery-time Regression model in scikit-learn that reduced late-delivery estimates by 18%."
        ] }
      ],
      projects: [
        { name: "Product Recommendation Service · PyTorch, FastAPI", link: "github.com/yourname/recsys", bullets: [
          "Implemented a two-tower recommender in PyTorch on 2M interactions; improved recall@20 by 31% over a popularity baseline."
        ] }
      ],
      education: [["B.Tech, Computer Science", "Your University · 2018"]],
      certifications: ["AWS Certified Machine Learning – Specialty", "Machine Learning Engineering for Production (MLOps) — DeepLearning.AI"],
      keywords: ["Python", "PyTorch", "scikit-learn", "XGBoost", "Feature Engineering", "Model Deployment", "FastAPI", "Docker", "MLflow", "MLOps", "SQL", "AWS", "A/B Testing", "Model Monitoring"]
    },

    "data-engineer-ai": {
      target: "Data Engineer (AI / ML Platforms)",
      persona: "Data engineer (5 years) specialising in AI-ready data",
      contact: CONTACT,
      summary: "Data Engineer with 5 years of experience building reliable ETL and streaming pipelines on Snowflake, Airflow, dbt and Spark. Recently built the RAG ingestion pipeline and vector database that power an internal AI assistant for 4,000 employees. Focused on Data Quality, Data Modeling and pipelines that are idempotent, tested and monitored.",
      skills: [
        ["Languages", "SQL, Python"],
        ["Data Platforms", "Snowflake, BigQuery, PostgreSQL, Apache Spark, Kafka"],
        ["Orchestration & Modeling", "Apache Airflow, dbt, Data Modeling (star schema), ETL / ELT, Data Pipelines"],
        ["AI Data", "Embeddings, Vector Database (pgvector), RAG ingestion, Feature Store"],
        ["Quality & Ops", "Data Quality (Great Expectations, dbt tests), Docker, CI/CD"]
      ],
      projectsFirst: false,
      experience: [
        { title: "Data Engineer II", company: "Contoso Retail Pvt. Ltd.", location: "Gurugram", dates: "Jan 2022 – Present", bullets: [
          "Built 35 Apache Airflow DAGs and 120 dbt models feeding Snowflake, processing 80M rows/day with 99.7% on-time delivery.",
          "Designed a star-schema Data Modeling layer for sales and inventory that cut dashboard query time by 65%.",
          "Built a RAG ingestion pipeline (chunking, Embeddings, pgvector Vector Database) with incremental re-indexing, keeping 25,000 policy documents fresh within 1 hour.",
          "Added Data Quality tests and freshness alerts that reduced data incidents from 9 to 2 per quarter.",
          "Streamed 12K clickstream events/second through Kafka and Apache Spark Structured Streaming, refreshing recommendation features every 30 seconds."
        ] },
        { title: "Data Engineer", company: "Fabrikam Logistics", location: "Hyderabad", dates: "Jun 2020 – Dec 2021", bullets: [
          "Migrated 40 legacy ETL jobs from cron scripts to Airflow, eliminating manual re-runs.",
          "Built SQL and Python pipelines that produced daily ML training datasets for 3 delivery-time models, cutting data prep time by 70%."
        ] }
      ],
      projects: [
        { name: "RAG Ingestion Pipeline · Airflow, pgvector, Python", link: "github.com/yourname/rag-ingest", bullets: [
          "Open-source pipeline that detects changed documents by hash, re-embeds only those chunks and reports retrieval hit rate (89% top-4)."
        ] }
      ],
      education: [["B.E., Information Technology", "Your University · 2020"]],
      certifications: ["SnowPro Core Certification", "Google Cloud Professional Data Engineer"],
      keywords: ["SQL", "Python", "Apache Airflow", "dbt", "Apache Spark", "Kafka", "Data Modeling", "ETL", "Data Quality", "Snowflake", "Vector Database", "Embeddings", "RAG", "Data Pipelines"]
    },

    "ai-product-engineer": {
      target: "AI Product Engineer / Full-Stack Engineer (AI)",
      persona: "Full-stack developer (4 years) moving into AI product engineering",
      contact: CONTACT,
      summary: "Full-stack engineer with 4 years of React, TypeScript and Node.js experience, now shipping LLM-powered product features. Built a streaming AI assistant with RAG and citations used by 9,000 customers a month, backed by an evaluation suite and feedback loop. Strong in product UX for AI, Prompt Engineering and turning prototypes into reliable features.",
      skills: [
        ["Languages", "TypeScript, JavaScript, Python, SQL"],
        ["Frontend & Backend", "React, Next.js, Node.js, FastAPI, REST APIs"],
        ["AI", "LLM APIs (Anthropic, OpenAI), Vercel AI SDK, RAG, Vector Database (pgvector), Prompt Engineering, Structured Output, Streaming"],
        ["Quality", "LLM Evaluation, A/B Testing, Observability, Jest, Playwright"]
      ],
      projectsFirst: false,
      experience: [
        { title: "Software Engineer II (AI Features)", company: "Woodgrove Travel Tech", location: "Bengaluru", dates: "Mar 2023 – Present", bullets: [
          "Shipped a Streaming AI trip-assistant in Next.js and the Vercel AI SDK; 9,000 monthly active users with a 4.5/5 rating.",
          "Built RAG over 3,000 help articles with pgvector and citations, deflecting 27% of support tickets in an A/B Testing rollout.",
          "Created an LLM Evaluation suite of 150 real queries; improved correct-and-cited answers from 72% to 91% through Prompt Engineering and retrieval fixes.",
          "Added structured JSON output with schema validation for itinerary extraction, cutting production parsing errors from 4% to 0.",
          "Cut LLM cost per conversation by 38% with response caching and model routing."
        ] },
        { title: "Frontend Developer", company: "Tailspin Media", location: "Pune", dates: "Jul 2021 – Feb 2023", bullets: [
          "Built React and TypeScript dashboards used by 200 editors; improved Lighthouse performance from 61 to 94.",
          "Developed Node.js APIs for content scheduling serving 50K requests/day."
        ] }
      ],
      projects: [
        { name: "Chat-with-your-Docs · Next.js, RAG, evals", link: "github.com/yourname/docs-chat", bullets: [
          "Open-source RAG starter with citations, a 'not found' rule, 👍/👎 feedback and a one-command eval script (380+ GitHub stars)."
        ] }
      ],
      education: [["B.Tech, Electronics and Communication", "Your University · 2021"]],
      certifications: ["Building Systems with the ChatGPT API — DeepLearning.AI", "Meta Front-End Developer Certificate"],
      keywords: ["TypeScript", "React", "Next.js", "Node.js", "Python", "LLM", "RAG", "Vector Database", "Prompt Engineering", "LLM Evaluation", "Streaming", "Vercel AI SDK", "A/B Testing", "FastAPI"]
    },

    "mlops-engineer": {
      target: "MLOps Engineer / AI Platform Engineer",
      persona: "DevOps / SRE engineer (8 years) moving into AI platforms",
      contact: CONTACT,
      summary: "Platform engineer with 8 years in DevOps and SRE, now building infrastructure for ML and LLM workloads. Runs a Kubernetes-based Model Serving platform with vLLM on GPU nodes for 6 product teams, with autoscaling, an LLM gateway and cost observability. Brings production reliability, CI/CD and Terraform discipline to MLOps.",
      skills: [
        ["Infrastructure", "Kubernetes, Docker, Helm, Terraform, AWS (EKS, EC2, S3), GPU scheduling"],
        ["MLOps & Serving", "MLOps, Model Serving, vLLM, KServe, MLflow, Model Registry, CI/CD (GitHub Actions, Argo CD)"],
        ["Observability", "Prometheus, Grafana, OpenTelemetry, Observability, SLOs, on-call"],
        ["Languages", "Python, Go, Bash"]
      ],
      projectsFirst: false,
      experience: [
        { title: "Senior Platform Engineer (AI Infrastructure)", company: "Northwind Payments Pvt. Ltd.", location: "Bengaluru", dates: "Feb 2022 – Present", bullets: [
          "Built a Kubernetes Model Serving platform with vLLM on GPU node pools for 6 teams; raised GPU utilisation from 22% to 68%.",
          "Introduced an LLM gateway with per-team rate limits, budgets and provider fallback, cutting monthly LLM spend by ₹18 lakh.",
          "Automated ML training and promotion pipelines with CI/CD, MLflow and a Model Registry, reducing model release time from 2 weeks to 1 day.",
          "Defined SLOs and Observability dashboards in Prometheus and Grafana (time-to-first-token, p95 latency, cost per request).",
          "Codified all infrastructure in Terraform and Helm charts, enabling new environments in 30 minutes."
        ] },
        { title: "DevOps Engineer", company: "Fabrikam Logistics", location: "Chennai", dates: "Jun 2017 – Jan 2022", bullets: [
          "Migrated 80 services to Docker and Kubernetes (EKS), improving deployment frequency 5x.",
          "Led incident response for a 24×7 platform, reducing MTTR from 70 to 20 minutes."
        ] }
      ],
      projects: [
        { name: "LLM Serving Benchmark · vLLM, Kubernetes, Python", link: "github.com/yourname/llm-serving-bench", bullets: [
          "Benchmarked TTFT, tokens/sec and cost per 1,000 requests across batch sizes and GPUs; published a self-host vs API decision guide."
        ] }
      ],
      education: [["B.E., Computer Engineering", "Your University · 2017"]],
      certifications: ["Certified Kubernetes Administrator (CKA)", "AWS Certified DevOps Engineer – Professional"],
      keywords: ["Kubernetes", "Docker", "Helm", "Terraform", "CI/CD", "MLOps", "MLflow", "vLLM", "GPU", "Prometheus", "Grafana", "Python", "AWS", "Model Serving", "Observability"]
    },

    "llm-agent-engineer": {
      target: "LLM / AI Agent Engineer",
      persona: "Java backend engineer (9 years) moving into agent engineering",
      contact: CONTACT,
      summary: "Backend engineer with 9 years of Java and Python experience building high-scale payment APIs, now specialising in LLM and AI Agents. Built a support-triage agent with Tool Calling, an MCP server and LangGraph that resolves 34% of tickets end to end, with guardrails, evaluation and full observability. Strong in reliable distributed systems applied to agentic AI.",
      skills: [
        ["Languages", "Python, Java, SQL"],
        ["LLM & Agents", "LLM APIs, AI Agents, LangGraph, Tool Calling, MCP (Model Context Protocol), RAG, Prompt Engineering, Structured Output"],
        ["Backend", "FastAPI, Pydantic, Spring Boot, REST, Kafka, PostgreSQL, Redis"],
        ["Quality & Safety", "Evaluation (eval suites, LLM-as-judge), Guardrails, Prompt-injection defence, Observability (Langfuse, OpenTelemetry)"]
      ],
      projectsFirst: false,
      experience: [
        { title: "Senior Software Engineer (AI Agents)", company: "Woodgrove Bank", location: "Mumbai", dates: "Jan 2021 – Present", bullets: [
          "Built a customer-support triage agent with LangGraph, Tool Calling and an MCP server exposing ticket, order and policy tools; resolves 34% of tickets end to end.",
          "Designed Guardrails: max-step limits, per-ticket cost budgets and human approval for refunds, with zero unauthorised actions in 6 months.",
          "Created an Evaluation suite of 300 real tickets; raised task success from 71% to 89% and cut cost per ticket by 41%.",
          "Added RAG over 1,800 policy documents with permission filters, and Observability traces for every agent step.",
          "Hardened agents against prompt injection with input isolation and output checks; blocked 100% of 40 red-team attacks."
        ] },
        { title: "Software Engineer", company: "Northwind Payments Pvt. Ltd.", location: "Bengaluru", dates: "Aug 2016 – Dec 2020", bullets: [
          "Built Java (Spring Boot) payment APIs handling 2M requests/day at 99.95% availability.",
          "Developed Kafka-based reconciliation services that cut settlement mismatches by 60%."
        ] }
      ],
      projects: [
        { name: "Open-source MCP Server for Ticketing · Python, FastAPI, Pydantic", link: "github.com/yourname/mcp-tickets", bullets: [
          "MCP server exposing 6 typed tools with input validation and audit logs; used by 3 internal teams."
        ] }
      ],
      education: [["B.Tech, Computer Science", "Your University · 2016"]],
      certifications: ["AI Agents in LangGraph — DeepLearning.AI", "Oracle Certified Professional, Java SE"],
      keywords: ["Python", "LLM", "AI Agents", "LangGraph", "Tool Calling", "MCP", "RAG", "FastAPI", "Pydantic", "Evaluation", "Prompt Engineering", "Guardrails", "Observability", "Java"]
    },

    "ai-research-engineer": {
      target: "AI Research Engineer / Applied Scientist",
      persona: "ML engineer with a strong maths background moving into research engineering",
      contact: CONTACT,
      summary: "Research-minded ML engineer with an M.Tech in Computer Science and 3 years training Deep Learning models in PyTorch. Fine-tuned 7B Transformers with LoRA and PEFT for Indic-language tasks, improving task accuracy by 18 points over prompting baselines. Reproduced two published papers end to end, with code and write-ups on Hugging Face and GitHub.",
      skills: [
        ["Deep Learning", "PyTorch, Transformers, Fine-tuning, LoRA, PEFT, QLoRA, Hugging Face (Transformers, Datasets, TRL), NLP"],
        ["Training at Scale", "Distributed Training (DDP, FSDP), Mixed Precision, CUDA basics, Experiment Tracking (Weights & Biases)"],
        ["Maths", "Linear Algebra, Probability, Optimisation, Statistics"],
        ["Engineering", "Python, NumPy, Evaluation design, Git, Docker"]
      ],
      projectsFirst: false,
      experience: [
        { title: "Machine Learning Engineer (Applied Research)", company: "Fabrikam AI Labs", location: "Bengaluru", dates: "Jul 2022 – Present", bullets: [
          "Fine-tuned 7B open Transformers with LoRA and PEFT for Hindi and Tamil summarisation; improved ROUGE-L by 18 points over prompting baselines.",
          "Built Evaluation pipelines combining automatic metrics and human ratings, with ablations that guided a 30% cut in training cost.",
          "Scaled training to 8 GPUs with Distributed Training (FSDP) and mixed precision, reducing epoch time from 9 h to 1.4 h.",
          "Tracked 400+ runs with Experiment Tracking in Weights & Biases, making results reproducible across the team."
        ] },
        { title: "Data Scientist", company: "Contoso Retail Pvt. Ltd.", location: "Pune", dates: "Jun 2021 – Jun 2022", bullets: [
          "Built PyTorch demand-forecasting models across 400 stores, reducing forecast error by 12%."
        ] }
      ],
      projects: [
        { name: "Paper Reproduction: LoRA vs Full Fine-tuning on Indic NLP · PyTorch", link: "huggingface.co/yourname", bullets: [
          "Reproduced the paper's main result within 1.2 points; ran 3 ablations (rank, target modules, data size) and published code, adapters and a write-up."
        ] },
        { name: "Mini-GPT from Scratch · PyTorch, CUDA", link: "github.com/yourname/mini-gpt", bullets: [
          "Implemented multi-head attention and a 25M-parameter Transformer trained on 50MB of text; analysed scaling with model size."
        ] }
      ],
      education: [["M.Tech, Computer Science (Machine Learning)", "Your University · 2021"], ["B.Tech, Mathematics and Computing", "Your University · 2019"]],
      certifications: ["Deep Learning Specialization — DeepLearning.AI", "Hugging Face NLP Course"],
      keywords: ["PyTorch", "Deep Learning", "Transformers", "Fine-tuning", "LoRA", "PEFT", "Hugging Face", "Distributed Training", "Python", "Linear Algebra", "Experiment Tracking", "NLP", "Evaluation", "CUDA"]
    },

    "ai-forward-deployed-engineer": {
      target: "AI Forward Deployed Engineer / AI Solutions Engineer",
      persona: "Tech lead (12 years) in healthcare IT moving into client-facing AI",
      contact: CONTACT,
      summary: "Technical lead with 12 years in healthcare IT, combining hands-on Python and API Integration with Client-facing Solution Architecture. Delivered LLM and RAG solutions for 4 hospital networks, from Requirements Gathering to production, meeting HIPAA and DPDP Compliance and Security reviews. Known for rapid Prototyping and clear Stakeholder Management with clinical and business leaders.",
      skills: [
        ["AI & Engineering", "Python, LLM APIs, RAG, Prompt Engineering, API Integration, FastAPI, SQL"],
        ["Architecture", "Solution Architecture, Cloud (Azure, AWS), SSO / OAuth, Legacy system integration (HL7, FHIR)"],
        ["Security & Compliance", "Security reviews, PII masking, Audit logging, Compliance (HIPAA, DPDP Act, SOC 2)"],
        ["Client Delivery", "Requirements Gathering, Prototyping, Stakeholder Management, Client-facing workshops, Executive presentations"]
      ],
      projectsFirst: false,
      experience: [
        { title: "Technical Lead, AI Solutions", company: "Fabrikam Health Systems", location: "Hyderabad", dates: "Apr 2020 – Present", bullets: [
          "Led Client-facing discovery and Prototyping for 4 hospital networks; converted 3 pilots into production contracts worth ₹6.5 crore.",
          "Built a permission-aware RAG assistant over 12,000 clinical policies with SSO, PII masking and Audit logging; cut policy look-up time by 70%.",
          "Designed Solution Architecture integrating LLM services with legacy HL7/FHIR systems through secure API Integration.",
          "Passed HIPAA and DPDP Compliance and Security reviews for 4 clients on the first attempt by involving their security teams from week one.",
          "Presented outcomes to 12 CXO-level stakeholders; Stakeholder Management turned a 4-month-stalled project into the client's top-rated initiative."
        ] },
        { title: "Senior Software Engineer", company: "Contoso Healthcare IT", location: "Bengaluru", dates: "Jun 2013 – Mar 2020", bullets: [
          "Built Java and Python integrations for lab and billing systems across 60 hospitals.",
          "Led Requirements Gathering workshops and mentored a team of 6 engineers."
        ] }
      ],
      projects: [
        { name: "Claims Document Automation Prototype · Python, LLM, FastAPI", link: "github.com/yourname/claims-ai", bullets: [
          "Two-week prototype extracting and validating insurance-claim fields; 93% field accuracy on 200 real (masked) claims."
        ] }
      ],
      education: [["B.Tech, Computer Science", "Your University · 2013"]],
      certifications: ["Microsoft Certified: Azure AI Engineer Associate", "AWS Certified Solutions Architect – Associate"],
      keywords: ["Python", "LLM", "RAG", "Solution Architecture", "Stakeholder Management", "Client-facing", "API Integration", "SSO", "Security", "Compliance", "HIPAA", "Prototyping", "Requirements Gathering", "Cloud"]
    },

    "ai-product-manager": {
      target: "AI Product Manager",
      persona: "Product manager (7 years) in retail moving into AI product management",
      contact: CONTACT,
      summary: "Product Manager with 7 years in retail and e-commerce, now leading Generative AI products. Launched an LLM shopping assistant and an AI agent-assist tool, defining AI Product Strategy, PRDs with evaluation plans and A/B Testing that lifted conversion by 6.4%. Combines User Research, SQL-driven Metrics and Responsible AI practices with strong Stakeholder Management.",
      skills: [
        ["Product", "Product Management, AI Product Strategy, Roadmap, PRD, User Research, Prioritisation, Go-to-market"],
        ["AI", "Generative AI, LLM capabilities and limits, RAG concepts, Evaluation (eval sets, quality bars), Prototyping (no-code, prompting), Responsible AI"],
        ["Data", "SQL, Metrics design, A/B Testing, Dashboards (Looker, Tableau)"],
        ["Leadership", "Stakeholder Management, Cross-functional leadership, Executive communication"]
      ],
      projectsFirst: false,
      experience: [
        { title: "Senior Product Manager, AI", company: "Contoso Retail Pvt. Ltd.", location: "Bengaluru", dates: "Jun 2022 – Present", bullets: [
          "Defined AI Product Strategy and Roadmap for 3 Generative AI features; secured ₹4 crore budget with a value-vs-feasibility case.",
          "Launched an LLM shopping assistant; A/B Testing showed a 6.4% conversion lift with no rise in return rate (guardrail).",
          "Wrote PRDs with Evaluation plans and quality bars (≥ 90% on 150 real queries) agreed with engineering before build.",
          "Ran User Research with 40 shoppers and 25 support agents; Prototyping with no-code tools cut discovery time from 6 weeks to 2.",
          "Established Responsible AI reviews covering bias, privacy and hallucination risks, adopted across 4 product teams."
        ] },
        { title: "Product Manager", company: "Tailspin E-commerce", location: "Gurugram", dates: "Jul 2018 – May 2022", bullets: [
          "Owned checkout for 2M monthly users; improved completion by 9% through SQL-driven funnel Metrics and experiments.",
          "Led Stakeholder Management across 5 teams to deliver a new payments flow 3 weeks early."
        ] }
      ],
      projects: [
        { name: "AI PRD Case Study: Agent-Assist for Customer Support", link: "yourname.notion.site/ai-prd", bullets: [
          "Public PRD with problem sizing, eval set, risk register and launch criteria; prototype reduced handling time by 31% in a 5-agent pilot."
        ] }
      ],
      education: [["MBA, Marketing and Analytics", "Your Business School · 2018"], ["B.Com", "Your College · 2016"]],
      certifications: ["AI for Everyone — DeepLearning.AI", "Product Management Certification — Your Institute"],
      keywords: ["Product Management", "AI Product Strategy", "LLM", "Generative AI", "PRD", "Evaluation", "A/B Testing", "SQL", "Stakeholder Management", "Roadmap", "User Research", "Metrics", "Responsible AI", "Prototyping"]
    }
  };
})();

if (typeof module !== "undefined" && module.exports) module.exports = { RESUMES };
