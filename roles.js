const ROLES = {
  "ai-fresher": {
    title: "AI Beginner (Start with ML Engineer)",
    why: "You are new. We start from absolute basics and build up to an ML Engineer role.",
    skills: ["Python", "Statistics", "Fundamentals of ML", "SQL", "Git"],
    roadmap: [
      { step: 1, title: "Python Basics", what: "Variables, loops, functions, data structures. Python is the #1 language in AI because most ML libraries are written in it.", time: "2-3 weeks", sources: "freeCodeCamp (free), Codecademy Python (free), CS50P Harvard (free)", sequence: "Start here." },
      { step: 2, title: "Statistics & Probability Basics", what: "Mean, median, variance, distributions, p-values. Statistics tells you whether an AI model result is real or random noise.", time: "2 weeks", sources: "Khan Academy Statistics (free), 3Blue1Brown Essence of Statistics YouTube (free)", sequence: "After Python basics." },
      { step: 3, title: "Fundamentals of Machine Learning", what: "Supervised learning: regression (predict numbers) and classification (predict categories). Understand training data vs test data, overfitting, and accuracy.", time: "4-6 weeks", sources: "Machine Learning by Andrew Ng Coursera (audit free), Google ML Crash Course (free)", sequence: "After statistics." },
      { step: 4, title: "SQL & Data Basics", what: "Querying data from databases. AI models need data, and most company data lives in SQL databases.", time: "1-2 weeks", sources: "SQL for Data Analysis freeCodeCamp (free), Mode Analytics SQL tutorials (free)", sequence: "Can run parallel with step 3." },
      { step: 5, title: "Build 1-2 Portfolio Projects", what: "Apply everything: e.g. an image classifier or a sentiment analysis bot. A portfolio proves you can actually build.", time: "3-4 weeks", sources: "Kaggle datasets (free), GitHub (free)", sequence: "After steps 1-4." },
      { step: 6, title: "Apply for Junior Roles", what: "Target titles: Junior ML Engineer, AI Trainee, ML Intern, Data Analyst (AI track).", time: "ongoing", sources: "LinkedIn, Naukri, company career pages", sequence: "After portfolio." }
    ]
  },
  "ml-engineer": {
    title: "ML Engineer",
    why: "Best fit when you have solid software engineering skills and want to build and ship ML models into products.",
    skills: ["Python", "Scikit-learn / PyTorch", "Model serving", "MLOps basics", "SQL"],
    roadmap: [
      { step: 1, title: "Refresh Python & Statistics", what: "Python data libraries (NumPy, Pandas) and basic statistics. Building blocks of every ML model.", time: "1-2 weeks", sources: "NumPy/Pandas fast track freeCodeCamp (free), Kaggle Learn (free)", sequence: "Start here if math is weak." },
      { step: 2, title: "Classic Machine Learning", what: "Supervised learning algorithms: linear regression, logistic regression, decision trees, clustering. Foundation before deep learning.", time: "4-6 weeks", sources: "Machine Learning by Andrew Ng Coursera (audit free), fast.ai Practical Deep Learning (free)", sequence: "After Python refresh." },
      { step: 3, title: "Deep Learning Basics", what: "Neural networks, backpropagation. PyTorch is the most popular library for research and industry ML.", time: "4-6 weeks", sources: "fast.ai (free), Deep Learning Specialization Andrew Ng Coursera (audit free)", sequence: "After classic ML." },
      { step: 4, title: "Model Deployment & Serving", what: "Turning a notebook model into an API. Learn FastAPI and Docker so your model can be used by other applications.", time: "2-3 weeks", sources: "FastAPI official tutorial (free), Docker getting started (free)", sequence: "After training a model." },
      { step: 5, title: "MLOps Basics", what: "Experiment tracking (Weights & Biases), model registries, CI/CD for ML. MLOps = DevOps for machine learning models.", time: "2-3 weeks", sources: "MLOps Fundamentals Google (free), W&B docs (free)", sequence: "After deployment." },
      { step: 6, title: "Build 2-3 Portfolio Projects", what: "End-to-end projects: e.g. a fraud detection API or a recommendation system with a deployed endpoint.", time: "4-6 weeks", sources: "Kaggle competitions, GitHub", sequence: "After steps 1-5." }
    ]
  }
, "data-engineer-ai": {
    title: "Data Engineer (AI focus)",
    why: "Best fit when you already work with data pipelines and want to specialize in AI-ready data.",
    skills: ["Python", "Spark / Airflow", "SQL", "Data warehouses", "Feature stores"],
    roadmap: [
      { step: 1, title: "Strengthen Data Pipeline Tooling", what: "Airflow for scheduling jobs, dbt for transforming data. These tools orchestrate how data moves.", time: "3-4 weeks", sources: "Airflow official tutorial (free), dbt Learn (free)", sequence: "Start here." },
      { step: 2, title: "Learn Feature Engineering for ML", what: "Creating features = turning raw data into inputs ML models can learn from. This is 80 percent of real ML work.", time: "2-3 weeks", sources: "Feature Engineering for Machine Learning (book), Kaggle Learn (free)", sequence: "After pipelines." },
      { step: 3, title: "Understand Data Quality and Labeling", what: "Data quality checks, cleaning, and labeling pipelines. Bad data equals bad AI, no matter how good your model is.", time: "2 weeks", sources: "Great Expectations docs (free), labeling tool docs", sequence: "After features." },
      { step: 4, title: "Build a Streaming and Batch Pipeline Project", what: "A real project: e.g. a pipeline that ingests clickstream data, cleans it, and feeds a model.", time: "4 weeks", sources: "Kafka docs (free), Spark structured streaming (free)", sequence: "After steps 1-3." },
      { step: 5, title: "Target Data Platform Teams", what: "Apply for: Data Engineer (AI/ML), ML Data Engineer, Analytics Engineer roles.", time: "ongoing", sources: "LinkedIn, company career pages", sequence: "After portfolio." }
    ]
  },
  "ai-product-engineer": {
    title: "AI Product Engineer",
    why: "Best fit for full-stack/frontend engineers who want to embed LLM features into user products.",
    skills: ["JavaScript/TypeScript", "LLM APIs", "Vector DBs", "Prompt engineering", "Web frameworks"],
    roadmap: [
      { step: 1, title: "Learn LLM API Usage", what: "LLM = Large Language Model (e.g. GPT, Claude). You call them via API to add text/AI features to your app. Start with OpenAI or Anthropic API.", time: "1-2 weeks", sources: "OpenAI API docs (free), Anthropic API docs (free)", sequence: "Start here." },
      { step: 2, title: "Build RAG with a Vector DB", what: "RAG = Retrieval Augmented Generation. It lets the LLM answer questions using your own documents. Vector DBs (Pinecone, pgvector) store document embeddings for fast search.", time: "3-4 weeks", sources: "Pinecone learn (free), LangChain RAG tutorial (free)", sequence: "After LLM APIs." },
      { step: 3, title: "Study Prompt Engineering Patterns", what: "Prompt engineering = writing better instructions to get better outputs from LLMs. Techniques: few-shot prompting, chain-of-thought, system prompts.", time: "1-2 weeks", sources: "Prompt Engineering Guide (promptengineering.ai, free)", sequence: "After RAG." },
      { step: 4, title: "Ship 3 AI Feature Demos", what: "Build real features: a chatbot, an AI summarizer, an AI code assistant. Deploy them so you can show employers.", time: "4-5 weeks", sources: "Vercel (free), GitHub Pages (free)", sequence: "After steps 1-3." },
      { step: 5, title: "Target AI Product / Full-Stack Roles", what: "Apply for: AI Product Engineer, Full-Stack Engineer (AI), LLM Engineer roles.", time: "ongoing", sources: "LinkedIn, company career pages", sequence: "After portfolio." }
    ]
  }

, "mlops-engineer": {
    title: "MLOps / AI Platform Engineer",
    why: "Best fit for DevOps/SRE backgrounds who want to build reliable AI infrastructure.",
    skills: ["Kubernetes", "CI/CD", "Python", "Model registries", "Observability"],
    roadmap: [
      { step: 1, title: "Learn ML Model Packaging and Serving", what: "Understand how to package a model and serve it. MLflow and FastAPI are common tools.", time: "2-3 weeks", sources: "MLflow docs (free), FastAPI tutorial (free)", sequence: "Start here." },
      { step: 2, title: "Master Kubernetes and Helm for Model Serving", what: "K8s = Kubernetes, a platform for deploying and scaling applications. Helm = package manager for K8s. These let you serve models at scale.", time: "3-4 weeks", sources: "Kubernetes official tutorials (free), Helm docs (free)", sequence: "After model serving." },
      { step: 3, title: "Build an MLOps Pipeline", what: "An MLOps pipeline connects training, deployment, and monitoring. Tools: GitHub Actions, MLflow, or KubeFlow.", time: "4 weeks", sources: "KubeFlow docs (free), GitHub Actions docs (free)", sequence: "After K8s." },
      { step: 4, title: "Study Model Monitoring and Drift Detection", what: "Model drift = when a model's accuracy drops over time as the world changes. Monitoring catches this early.", time: "2 weeks", sources: "Evidently AI docs (free), WhyLabs docs (free)", sequence: "After pipeline." },
      { step: 5, title: "Target AI Platform / MLOps Roles", what: "Apply for: MLOps Engineer, AI Platform Engineer, ML Infrastructure Engineer roles.", time: "ongoing", sources: "LinkedIn, company career pages", sequence: "After portfolio." }
    ]
  },
  "llm-agent-engineer": {
    title: "LLM / Agent Engineer",
    why: "Best fit for engineers excited by autonomous agents and LLM-powered workflows.",
    skills: ["Python", "LLM orchestration (LangChain/LlamaIndex)", "Vector DBs", "API design", "Evaluation"],
    roadmap: [
      { step: 1, title: "Master LLM APIs and Prompting", what: "LLM = Large Language Model. Learn how to call OpenAI, Anthropic, or open-source models via API and write good prompts.", time: "1-2 weeks", sources: "OpenAI API docs (free), Anthropic API docs (free)", sequence: "Start here." },
      { step: 2, title: "Learn Agent Frameworks", what: "Agent frameworks like LangGraph and AutoGen let you build AI that can use tools, plan tasks, and work autonomously.", time: "3-4 weeks", sources: "LangGraph docs (free), AutoGen docs (free)", sequence: "After LLM APIs." },
      { step: 3, title: "Build an Autonomous Agent Project", what: "A real agent: e.g. one that researches a topic, writes a report, and uses tools to complete it without human help.", time: "4 weeks", sources: "LangChain tutorials (free), GitHub", sequence: "After frameworks." },
      { step: 4, title: "Study Evaluation and Safety for Agents", what: "Agent evaluation = measuring if the agent actually completes tasks correctly. Safety = preventing harmful or hallucinated outputs.", time: "2 weeks", sources: "DeepMind agent safety guide (free), LangChain evaluation docs (free)", sequence: "After project." },
      { step: 5, title: "Target Agent / Automation Engineering Roles", what: "Apply for: AI Agent Engineer, LLM Engineer, Automation Engineer (AI) roles.", time: "ongoing", sources: "LinkedIn, company career pages", sequence: "After portfolio." }
    ]
  },
  "ai-research-engineer": {
    title: "AI Research Engineer",
    why: "Best fit if you have strong math and want to train and tune advanced models.",
    skills: ["PyTorch", "Linear algebra", "Deep learning", "Experiment tracking", "HPC basics"],
    roadmap: [
      { step: 1, title: "Strengthen Math", what: "Linear algebra (matrices, vectors), calculus, and probability. These are the language of AI research.", time: "3-4 weeks", sources: "3Blue1Brown Linear Algebra YouTube (free), Khan Academy (free)", sequence: "Start here if math is weak." },
      { step: 2, title: "Deep Dive into Deep Learning", what: "CNNs for images, Transformers for text, and how they are trained. PyTorch is the dominant research library.", time: "6-8 weeks", sources: "Deep Learning by Ian Goodfellow (book), fast.ai (free)", sequence: "After math." },
      { step: 3, title: "Fine-Tune Open-Source Models", what: "LoRA and PEFT = techniques to adapt large pre-trained models with much less data and compute. Very high industry demand.", time: "4 weeks", sources: "Hugging Face PEFT docs (free), LoRA paper", sequence: "After deep learning." },
      { step: 4, title: "Contribute to a Research Project or Paper", what: "Publishing or contributing shows deep expertise. Start with small papers or Kaggle competitions.", time: "ongoing", sources: "arXiv (free), Kaggle competitions, GitHub", sequence: "After fine-tuning." },
      { step: 5, title: "Target Research Engineering / Applied Scientist Roles", what: "Apply for: AI Research Engineer, Applied Scientist, ML Scientist roles at labs and big tech.", time: "ongoing", sources: "Company career pages, LinkedIn", sequence: "After portfolio." }
    ]
  , "ai-forward-deployed-engineer": {
    title: "AI Forward Deployed Engineer (AI FD)",
    why: "You work directly with customers to understand their legacy systems and integrate customized AI solutions. A mix of solution architect and product manager — companies like OpenAI and Anthropic hire these roles to deploy AI on client sites.",
    skills: ["Python", "LLM APIs", "Solution design", "Client communication", "Compliance & security basics", "API integration"],
    roadmap: [
      { step: 1, title: "Learn LLM APIs and Prompting", what: "LLM = Large Language Model. Learn to call OpenAI, Anthropic, or open-source models via API and write good prompts. This is the technical foundation.", time: "1-2 weeks", sources: "OpenAI API docs (free), Anthropic API docs (free)", sequence: "Start here." },
      { step: 2, title: "Study Solution Architecture for AI", what: "Learn how to map a client business problem to an AI solution. Understand legacy system integration, compliance, and security constraints.", time: "2-3 weeks", sources: "AWS/Azure AI solution guides (free), system design primers", sequence: "After LLM APIs." },
      { step: 3, title: "Build Custom AI Integrations", what: "Integrate AI into real client workflows: RAG over their documents, AI assistants for their processes, automation of their tasks.", time: "3-4 weeks", sources: "LangChain tutorials (free), Pinecone/pgvector docs (free)", sequence: "After solution design." },
      { step: 4, title: "Practice Client Communication and Presentation", what: "Forward deployed engineers spend significant time with clients. Practice explaining technical AI solutions to non-technical stakeholders.", time: "ongoing", sources: "Public speaking practice, case studies", sequence: "Parallel with step 3." },
      { step: 5, title: "Target Forward Deployed / Solutions Roles", what: "Apply for: AI Forward Deployed Engineer, Solutions Engineer (AI), Customer Engineer (AI) at AI companies.", time: "ongoing", sources: "LinkedIn, AI company career pages", sequence: "After portfolio." }
    ]
  }
  }
};
