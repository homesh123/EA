// Deeper lesson content, part 4: engineering, MLOps and data. See deep-foundations.js.
var LESSON_DEEP = Object.assign(typeof LESSON_DEEP !== "undefined" ? LESSON_DEEP : {}, {
  "api-serving": {
    steps: [
      ["Load the model once when the app starts, not on every request.", "App start hote hi model ek baar load karo, har request pe nahi."],
      ["Define the input with a Pydantic model so FastAPI validates types and required fields automatically.", "Input ko Pydantic model se define karo taaki FastAPI types aur required fields khud validate kare."],
      ["Write a POST /predict endpoint that preprocesses, predicts and returns JSON with the prediction and model version.", "POST /predict endpoint likho jo preprocess kare, predict kare aur prediction aur model version ke saath JSON lautaye."],
      ["Add GET /health for load balancers, and log each request's latency and errors.", "Load balancers ke liye GET /health jodo, aur har request ki latency aur errors log karo."],
      ["Run it with uvicorn, test it with the automatic /docs page, and write a few automated tests.", "Ise uvicorn se chalao, automatic /docs page se test karo, aur kuch automated tests likho."]
    ],
    mistakes: [
      ["No input validation: a missing field crashes the service or gives garbage predictions.", "Input validation nahi: ek missing field service crash kar deta hai ya bekaar predictions deta hai."],
      ["Slow work inside the request, like loading files or calling slow services without timeouts.", "Request ke andar slow kaam, jaise files load karna ya bina timeout slow services call karna."]
    ],
    faq: [
      [["Why FastAPI and not Flask?", "FastAPI kyun, Flask kyun nahi?"], ["Both work. FastAPI gives automatic validation, async support and interactive docs, which suit ML APIs well.", "Dono chalte hain. FastAPI automatic validation, async support aur interactive docs deta hai, jo ML APIs ke liye accha hai."]],
      [["How do I handle many requests at once?", "Ek saath bahut requests kaise sambhalun?"], ["Run several worker processes or replicas behind a load balancer, and batch predictions where the model supports it.", "Load balancer ke peeche kai worker processes ya replicas chalao, aur jahan model support kare wahan predictions batch karo."]]
    ]
  },

  "docker": {
    steps: [
      ["Write a Dockerfile: start FROM a slim Python image, COPY requirements.txt, RUN pip install, COPY your code, set the CMD.", "Dockerfile likho: slim Python image FROM se shuru, requirements.txt COPY, pip install RUN, apna code COPY, CMD set karo."],
      ["Build the image: docker build -t my-model:1.0 .", "Image build karo: docker build -t my-model:1.0 ."],
      ["Run a container: docker run -p 8000:8000 my-model:1.0, then open localhost:8000.", "Container chalao: docker run -p 8000:8000 my-model:1.0, phir localhost:8000 kholo."],
      ["Pass configuration and secrets as environment variables, not baked into the image.", "Configuration aur secrets environment variables se do, image mein band mat karo."],
      ["Push the image to a registry so servers and Kubernetes can pull the exact same thing.", "Image ko registry pe push karo taaki servers aur Kubernetes bilkul wahi cheez pull kar sakein."]
    ],
    mistakes: [
      ["Huge images with build tools and data inside. Use slim bases, .dockerignore and multi stage builds.", "Build tools aur data andar wali bahut badi images. Slim bases, .dockerignore aur multi stage builds use karo."],
      ["Using the 'latest' tag in production. Pin versions so you know exactly what's running.", "Production mein 'latest' tag use karna. Versions pin karo taaki pata ho exactly kya chal raha hai."]
    ],
    faq: [
      [["Is Docker the same as a virtual machine?", "Kya Docker virtual machine jaisa hi hai?"], ["No. Containers share the host's operating system kernel, so they're much lighter and start in seconds.", "Nahi. Containers host ke operating system kernel ko share karte hain, isliye bahut halke hain aur seconds mein start hote hain."]],
      [["Can containers use GPUs?", "Kya containers GPU use kar sakte hain?"], ["Yes, with the NVIDIA container toolkit and CUDA base images.", "Haan, NVIDIA container toolkit aur CUDA base images ke saath."]]
    ]
  },

  "kubernetes": {
    steps: [
      ["A Pod runs one or more containers. A Deployment keeps a set number of identical Pods running and replaces failed ones.", "Pod ek ya zyaada containers chalata hai. Deployment tay ginti ke ek jaise Pods chalu rakhta hai aur kharab hue badal deta hai."],
      ["A Service gives the Pods one stable address and spreads traffic across them.", "Service Pods ko ek stable address deti hai aur traffic unme baantti hai."],
      ["Set resource requests and limits (CPU, memory, GPU) so the scheduler places Pods correctly.", "Resource requests aur limits (CPU, memory, GPU) set karo taaki scheduler Pods sahi jagah rakhe."],
      ["Add readiness and liveness probes so traffic only reaches healthy Pods.", "Readiness aur liveness probes jodo taaki traffic sirf healthy Pods tak pahunche."],
      ["Use a Horizontal Pod Autoscaler to add Pods when load rises, and roll out new versions gradually.", "Load badhne pe Pods jodne ke liye Horizontal Pod Autoscaler use karo, aur naye versions dheere dheere roll out karo."]
    ],
    mistakes: [
      ["No resource limits: one Pod eats all memory and takes the node down.", "Resource limits nahi: ek Pod saari memory kha jaata hai aur node gira deta hai."],
      ["No readiness probe: traffic hits Pods still loading a large model and requests fail.", "Readiness probe nahi: traffic un Pods pe jaata hai jo abhi bada model load kar rahe hain aur requests fail hoti hain."]
    ],
    faq: [
      [["Do I need Kubernetes for my first model?", "Kya pehle model ke liye Kubernetes chahiye?"], ["Usually not. A managed service (Cloud Run, App Runner, a PaaS) is simpler. Kubernetes pays off when you run many services at scale.", "Aam taur pe nahi. Managed service (Cloud Run, App Runner, PaaS) simple hai. Kubernetes tab faayda deta hai jab bahut saari services scale pe chalti hain."]],
      [["What is Helm?", "Helm kya hai?"], ["A package manager for Kubernetes: it templates the YAML for an app so you can install and upgrade it with one command.", "Kubernetes ka package manager: yeh app ke YAML ko template karta hai taaki ek command se install aur upgrade ho sake."]]
    ]
  },

  "gpu-serving": {
    steps: [
      ["Pick the smallest model that meets your quality bar on your eval set.", "Woh sabse chhota model chuno jo aapke eval set pe quality bar paar kare."],
      ["Consider quantisation (8 bit or 4 bit) to fit on cheaper GPUs with little quality loss; measure it.", "Saste GPUs pe fit karne ke liye quantisation (8 bit ya 4 bit) socho, quality thodi hi girti hai; naap ke dekho."],
      ["Serve with an LLM inference engine (vLLM, TGI) for continuous batching and efficient KV cache memory.", "Continuous batching aur efficient KV cache memory ke liye LLM inference engine (vLLM, TGI) se serve karo."],
      ["Measure time to first token, tokens per second and cost per 1,000 requests under realistic load.", "Realistic load pe time to first token, tokens per second aur 1,000 requests ka cost naapo."],
      ["Autoscale on queue length, cache repeated prompts, and route easy requests to smaller models.", "Queue length pe autoscale karo, repeat prompts cache karo, aur aasaan requests chhote models pe bhejo."]
    ],
    mistakes: [
      ["Comparing GPUs only by price per hour. Compare cost per request at your real traffic.", "GPUs ko sirf per hour price se compare karna. Apne asli traffic pe per request cost compare karo."],
      ["Self hosting by default. At low volume, an API is often cheaper and far simpler.", "Default mein self hosting. Kam volume pe API aksar sasti aur bahut simple hoti hai."]
    ],
    faq: [
      [["What is batching and why does it help?", "Batching kya hai aur kyun madad karti hai?"], ["Processing many requests together keeps the GPU busy. Continuous batching adds new requests into a running batch instead of waiting.", "Bahut saari requests ek saath process karne se GPU busy rehta hai. Continuous batching intezaar karne ke bajaye naye requests chalte batch mein jod deti hai."]],
      [["When should we self host an LLM?", "LLM kab self host karein?"], ["When data can't leave your environment, when volume is high enough that it's cheaper, or when you need a fine tuned open model.", "Jab data aapke environment se bahar na ja sake, jab volume itna ho ki sasta pade, ya jab fine tuned open model chahiye."]]
    ]
  },

  "mlops-tracking": {
    steps: [
      ["Log every training run: parameters, metrics, code commit and data version (MLflow or a similar tool).", "Har training run log karo: parameters, metrics, code commit aur data version (MLflow ya waisa tool)."],
      ["Save the trained model and its preprocessing as one artifact.", "Trained model aur uska preprocessing ek artifact ke roop mein save karo."],
      ["Register good models in a model registry with a version and a stage (staging, production).", "Acche models ko model registry mein version aur stage (staging, production) ke saath register karo."],
      ["Promote a model only if it beats the current one on a fixed evaluation set.", "Model tabhi promote karo jab woh fixed evaluation set pe current wale ko hara de."],
      ["Deploy by version, so rolling back is just pointing to the previous version.", "Version se deploy karo, taaki rollback bas pichhle version ki taraf ishaara karna ho."]
    ],
    mistakes: [
      ["Keeping results in notebooks and spreadsheets. Nobody can reproduce or compare them later.", "Results notebooks aur spreadsheets mein rakhna. Baad mein koi reproduce ya compare nahi kar paata."],
      ["Changing the evaluation data between runs, so scores aren't comparable.", "Runs ke beech evaluation data badalna, jisse scores compare nahi ho paate."]
    ],
    faq: [
      [["Is MLflow the only option?", "Kya MLflow hi ek option hai?"], ["No. Weights & Biases, cloud tools (SageMaker, Vertex AI) and others do similar things. The habit matters more than the tool.", "Nahi. Weights & Biases, cloud tools (SageMaker, Vertex AI) aur doosre bhi aisa hi karte hain. Tool se zyaada aadat zaroori hai."]],
      [["How do I version data?", "Data ka version kaise rakhun?"], ["Use dated snapshots, table versions in your warehouse or lakehouse, or tools like DVC, and record the version with each run.", "Dated snapshots, warehouse ya lakehouse mein table versions, ya DVC jaise tools use karo, aur har run ke saath version record karo."]]
    ]
  },

  "mlops-monitoring": {
    steps: [
      ["System health: latency, errors and throughput, with alerts.", "System health: latency, errors aur throughput, alerts ke saath."],
      ["Data: compare live feature distributions with training data (for example with PSI); watch for missing values and schema changes.", "Data: live feature distributions ko training data se compare karo (jaise PSI se); missing values aur schema changes pe nazar rakho."],
      ["Predictions: watch the share of each predicted class and the confidence scores over time.", "Predictions: har predicted class ka hissa aur confidence scores waqt ke saath dekho."],
      ["Real performance: when true labels arrive (days or weeks later), compute accuracy, precision and recall by week.", "Asli performance: jab true labels aayein (din ya hafton baad), har hafte accuracy, precision aur recall nikalo."],
      ["Act: each alert has an owner and an action, such as investigate the pipeline, retrain or roll back.", "Action lo: har alert ka ek owner aur ek action ho, jaise pipeline check karo, retrain karo ya rollback karo."]
    ],
    mistakes: [
      ["Monitoring only uptime. The service can be up while predictions are silently wrong.", "Sirf uptime monitor karna. Service chalu ho sakti hai jabki predictions chupke se galat hon."],
      ["Too many noisy alerts, so people ignore them. Alert only on what needs action.", "Bahut saare shor wale alerts, jisse log unhe ignore karne lagte hain. Sirf us pe alert karo jis pe action chahiye."]
    ],
    faq: [
      [["How often should I retrain?", "Kitni baar retrain karun?"], ["When monitoring shows drift or falling performance, or on a regular schedule if your data changes predictably. Always evaluate before replacing a model.", "Jab monitoring drift ya girti performance dikhaye, ya agar data predictable tarah se badalta hai to regular schedule pe. Model badalne se pehle hamesha evaluate karo."]],
      [["What tools are used?", "Kaunse tools use hote hain?"], ["Prometheus and Grafana for system metrics, Evidently or similar for drift, and your warehouse for performance reports.", "System metrics ke liye Prometheus aur Grafana, drift ke liye Evidently ya waisa tool, aur performance reports ke liye aapka warehouse."]]
    ]
  },

  "data-pipelines": {
    steps: [
      ["Extract: pull data from sources (databases, APIs, files) on a schedule or when it changes.", "Extract: sources (databases, APIs, files) se schedule pe ya badalne pe data nikaalo."],
      ["Load the raw data into a warehouse or lake unchanged, so you can always rebuild.", "Raw data ko bina badle warehouse ya lake mein load karo, taaki hamesha dobara bana sako."],
      ["Transform with SQL (dbt) or Spark into clean, modelled tables.", "SQL (dbt) ya Spark se saaf, modelled tables mein transform karo."],
      ["Orchestrate the steps with Airflow (or similar): order, schedule, retries and alerts.", "Steps ko Airflow (ya waise tool) se orchestrate karo: order, schedule, retries aur alerts."],
      ["Make each run idempotent by processing one date partition at a time and overwriting it.", "Har run ko idempotent banao, ek baar mein ek date partition process karke use overwrite karke."]
    ],
    mistakes: [
      ["Appending data on every run, so a retry doubles the numbers.", "Har run pe data append karna, jisse retry pe numbers double ho jaate hain."],
      ["No tests between steps, so bad data quietly reaches dashboards and models.", "Steps ke beech tests nahi, jisse kharab data chupke se dashboards aur models tak pahunch jaata hai."]
    ],
    faq: [
      [["Spark or SQL?", "Spark ya SQL?"], ["If your warehouse handles the volume, SQL with dbt is simpler. Use Spark for very large data, complex processing or unstructured data.", "Agar warehouse volume sambhaal leta hai to dbt ke saath SQL simple hai. Bahut bade data, complex processing ya unstructured data ke liye Spark."]],
      [["What changes for AI pipelines?", "AI pipelines ke liye kya badalta hai?"], ["More unstructured data (PDFs, emails), steps that call LLMs or embedding models with rate limits and costs, and vector indexes to keep fresh.", "Zyaada unstructured data (PDFs, emails), aise steps jo rate limits aur cost ke saath LLMs ya embedding models call karte hain, aur fresh rakhne wale vector indexes."]]
    ]
  },

  "data-quality": {
    steps: [
      ["Check the schema: expected columns and types arrived.", "Schema check karo: expected columns aur types aaye."],
      ["Check volume: row counts within a normal range compared with recent days.", "Volume check karo: row counts haal ke dino ke mukaable normal range mein."],
      ["Check values: no NULLs in required fields, values within allowed ranges, unique keys really unique.", "Values check karo: required fields mein NULL nahi, values allowed range mein, unique keys sach mein unique."],
      ["Check freshness: the newest data is recent enough.", "Freshness check karo: sabse naya data kaafi recent hai."],
      ["Decide what happens on failure: stop the pipeline for critical issues, alert for minor ones, and tell data consumers.", "Fail hone pe kya hoga tay karo: critical issues pe pipeline roko, chhote pe alert, aur data use karne walon ko batao."]
    ],
    mistakes: [
      ["Checking quality only at the end. Catch problems where data enters, before they spread.", "Quality sirf aakhir mein check karna. Problems wahin pakdo jahan data aata hai, failne se pehle."],
      ["No owner for each data source, so failures bounce between teams.", "Har data source ka owner nahi, jisse failures teams ke beech ghoomte rehte hain."]
    ],
    faq: [
      [["Which tools help?", "Kaunse tools madad karte hain?"], ["dbt tests, Great Expectations, Soda and built in warehouse constraints. Start simple with a few SQL checks.", "dbt tests, Great Expectations, Soda aur warehouse ke built in constraints. Kuch SQL checks se simple shuru karo."]],
      [["What is a data contract?", "Data contract kya hai?"], ["An agreement between the team producing data and the teams using it about schema, meaning and quality, so changes don't break things silently.", "Data banane wali team aur use karne wali teams ke beech schema, matlab aur quality ka agreement, taaki changes chupke se cheezein na todein."]]
    ]
  },

  "streaming": {
    steps: [
      ["Producers send events (a payment, a click) to a Kafka topic as they happen.", "Producers events (payment, click) hote hi Kafka topic pe bhejte hain."],
      ["Kafka stores them in order, in partitions, for a set time, so several consumers can read independently.", "Kafka unhe order mein, partitions mein, tay time ke liye store karta hai, taaki kai consumers alag alag padh sakein."],
      ["Consumers (Flink, Spark Streaming or a simple service) process events: filter, enrich, compute running counts.", "Consumers (Flink, Spark Streaming ya simple service) events process karte hain: filter, enrich, running counts."],
      ["Results go to a database, a feature store for real time ML features, or an alert.", "Results database, real time ML features ke liye feature store, ya alert mein jaate hain."],
      ["Handle duplicates and late events: design consumers to be idempotent and use event time windows.", "Duplicates aur late events sambhalo: consumers idempotent banao aur event time windows use karo."]
    ],
    mistakes: [
      ["Choosing streaming when hourly batch meets the need. Streaming is harder to build and run.", "Jab hourly batch kaafi ho tab streaming chunna. Streaming banana aur chalana mushkil hai."],
      ["Assuming each event arrives exactly once and in order. Plan for duplicates and delays.", "Maan lena ki har event bilkul ek baar aur order mein aayega. Duplicates aur deri ke liye plan karo."]
    ],
    faq: [
      [["Is Kafka a database?", "Kya Kafka database hai?"], ["Not really. It's a durable event log for moving data between systems. You still store results in databases.", "Asal mein nahi. Yeh systems ke beech data le jaane ke liye durable event log hai. Results abhi bhi databases mein store karte ho."]],
      [["Where does streaming help AI?", "Streaming AI mein kahan madad karti hai?"], ["Real time features for fraud and recommendations, and keeping search or vector indexes up to date within seconds.", "Fraud aur recommendations ke real time features, aur search ya vector indexes ko seconds mein up to date rakhne mein."]]
    ]
  },

  "security-compliance": {
    steps: [
      ["Map the data: what personal or confidential data does the AI system touch, and where does it go?", "Data ka map banao: AI system kaunsa personal ya confidential data chhoota hai, aur woh kahan jaata hai?"],
      ["Choose deployment and vendors that meet the rules: data residency, no training on your data, signed agreements.", "Rules poore karne wale deployment aur vendors chuno: data residency, aapke data pe training nahi, signed agreements."],
      ["Use the company's identity system (SSO) and permissions, so the AI never shows users more than they could already see.", "Company ka identity system (SSO) aur permissions use karo, taaki AI users ko kabhi usse zyaada na dikhaye jitna woh pehle dekh sakte the."],
      ["Mask or remove personal data where it isn't needed, and keep secrets in a vault.", "Jahan zaroori na ho wahan personal data mask ya hatao, aur secrets vault mein rakho."],
      ["Keep audit logs of AI actions and decisions, and document risks and controls for reviews.", "AI ke actions aur decisions ke audit logs rakho, aur reviews ke liye risks aur controls document karo."]
    ],
    mistakes: [
      ["Leaving security review to the end. Involve security and legal teams early; it saves months.", "Security review aakhir tak chhodna. Security aur legal teams ko jaldi shaamil karo; mahine bachte hain."],
      ["Sending customer data to unapproved AI tools during prototyping.", "Prototyping ke dauraan customer data unapproved AI tools ko bhejna."]
    ],
    faq: [
      [["Which laws matter in India?", "India mein kaunse kaanoon matter karte hain?"], ["The Digital Personal Data Protection Act (DPDP) governs personal data, plus sector rules (RBI for banking, for example). Global customers bring GDPR and others.", "Digital Personal Data Protection Act (DPDP) personal data pe laagu hota hai, saath mein sector rules (jaise banking ke liye RBI). Global customers ke saath GDPR aur doosre bhi."]],
      [["Can we use cloud LLMs with confidential data?", "Kya confidential data ke saath cloud LLMs use kar sakte hain?"], ["Often yes, with enterprise agreements, the right region, no training on your data and proper access controls. Some cases still need self hosted models.", "Aksar haan, enterprise agreements, sahi region, aapke data pe training nahi aur sahi access controls ke saath. Kuch cases mein abhi bhi self hosted models chahiye."]]
    ]
  }
});

if (typeof module !== "undefined" && module.exports) module.exports = { LESSON_DEEP };
