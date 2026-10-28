// Lesson library, part 4: engineering, MLOps and data platforms. Text fields are [English, Hinglish].
var LESSON_TOPICS = Object.assign(typeof LESSON_TOPICS !== "undefined" ? LESSON_TOPICS : {}, {
  "api-serving": {
    icon: "🚪", mins: 7,
    title: ["Serving a model as an API with FastAPI", "Model ko FastAPI se API ke roop mein serve karna"],
    analogy: [
      "A restaurant kitchen (your model) shouldn't take orders from customers directly. A waiter (the API) takes a clear order from a menu, passes it to the kitchen, and brings back the dish. Other apps, like a website or mobile app, talk to your model only through this waiter.",
      "Restaurant ki kitchen (aapka model) ko seedha customers se order nahi lena chahiye. Waiter (API) menu se saaf order leta hai, kitchen tak pahunchaata hai, aur dish wapas laata hai. Doosri apps, jaise website ya mobile app, aapke model se sirf isi waiter ke through baat karti hain."
    ],
    explain: [
      "A model in a notebook helps nobody. Wrapping it in a web API makes it usable by any app. FastAPI is the popular Python framework: you define an endpoint (like POST /predict), describe the input with a Pydantic model (which validates types automatically), load the model once at startup, and return a JSON response. FastAPI also generates interactive docs at /docs. Add a health-check endpoint, input validation, timeouts and logging. These are what make it production-ready.",
      "Notebook mein pada model kisi ke kaam ka nahi. Use web API mein wrap karne se koi bhi app use use kar sakti hai. FastAPI popular Python framework hai: aap ek endpoint define karte ho (jaise POST /predict), input ko Pydantic model se describe karte ho (jo types automatically validate karta hai), model ko startup pe ek baar load karte ho, aur JSON response lautaate ho. FastAPI /docs pe interactive docs bhi bana deta hai. Health-check endpoint, input validation, timeouts aur logging jodo. Inhi se woh production-ready banta hai."
    ],
    terms: [
      ["Endpoint", "A URL plus method that does one job, e.g. POST /predict.", "URL aur method jo ek kaam karta hai, jaise POST /predict."],
      ["Pydantic model", "A class describing the expected input, with automatic validation.", "Class jo expected input describe karti hai, automatic validation ke saath."],
      ["Latency", "How long a request takes to get a response.", "Request ka response aane mein kitna time lagta hai."]
    ],
    example: {
      lang: "python",
      code: "from fastapi import FastAPI\nfrom pydantic import BaseModel\nimport joblib\n\napp = FastAPI()\nmodel = joblib.load(\"price_model.pkl\")   # loaded once at startup\n\nclass Flat(BaseModel):\n    area_sqft: float\n    bhk: int\n\n@app.post(\"/predict\")\ndef predict(flat: Flat):\n    price = model.predict([[flat.area_sqft, flat.bhk]])[0]\n    return {\"price_lakh\": round(price, 1)}",
      note: ["Run with: uvicorn app:app. Any app can now POST a flat and get a price.", "uvicorn app:app se chalao. Ab koi bhi app flat POST karke price le sakti hai."]
    },
    quiz: {
      q: ["Why load the model at startup instead of inside the predict function?", "Model ko predict function ke andar ki jagah startup pe load kyun karte hain?"],
      options: [["It's required by Python", "Python mein zaroori hai"], ["Loading on every request would make each request slow", "Har request pe load karne se har request slow ho jaayegi"], ["It uses less disk", "Disk kam lagti hai"]],
      answer: 1,
      why: ["Loading a model can take seconds. Do it once and reuse it for every request.", "Model load hone mein seconds lag sakte hain. Ek baar karo aur har request ke liye reuse karo."]
    },
    remember: ["Model → API endpoint → any app can use it. Validate inputs and log everything.", "Model → API endpoint → koi bhi app use kare. Inputs validate karo aur sab log karo."]
  },

  "docker": {
    icon: "📦", mins: 7,
    title: ["Docker: packaging your app so it runs anywhere", "Docker: app ko pack karna taaki kahin bhi chale"],
    analogy: [
      "Moving house, you pack everything for the kitchen (utensils, spices, gas regulator) into one labelled box so it works in the new home. A Docker container packs your app with its exact Python version and libraries, so it runs the same on your laptop, a server or the cloud. No more 'it works on my machine'.",
      "Ghar shift karte waqt aap kitchen ka saara saamaan (bartan, masaale, gas regulator) ek label wale box mein pack karte ho, taaki naye ghar mein bhi kaam kare. Docker container aapki app ko uske exact Python version aur libraries ke saath pack karta hai, taaki woh laptop, server ya cloud pe ek jaisi chale. Ab 'mere laptop pe to chal raha tha' wali problem nahi."
    ],
    explain: [
      "A Dockerfile is a recipe: start from a base image (like python:3.12-slim), copy your code, install requirements, and set the command to run. 'docker build' turns the recipe into an image, a frozen package, and 'docker run' starts a container from it. Images can be pushed to a registry and pulled by any server. Containers are the standard unit of deployment for model APIs, and Kubernetes runs containers at scale. Keep images small and never bake secrets into them.",
      "Dockerfile ek recipe hai: base image se shuru karo (jaise python:3.12-slim), apna code copy karo, requirements install karo, aur chalane wali command set karo. 'docker build' recipe ko image mein badalta hai, ek frozen package, aur 'docker run' usse container start karta hai. Images ko registry pe push karke kisi bhi server pe pull kar sakte ho. Model APIs deploy karne ki standard unit containers hi hain, aur Kubernetes containers ko bade scale pe chalata hai. Images chhoti rakho, aur secrets kabhi image ke andar mat daalo."
    ],
    terms: [
      ["Image", "A packaged, read-only snapshot of an app and its environment.", "App aur uske environment ka packed, read-only snapshot."],
      ["Container", "A running instance of an image.", "Image ka chalta hua instance."],
      ["Registry", "Storage for images, like Docker Hub or a cloud registry.", "Images ka storage, jaise Docker Hub ya cloud registry."]
    ],
    example: {
      lang: "dockerfile",
      code: "FROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nCMD [\"uvicorn\", \"app:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]\n\n# docker build -t price-api . && docker run -p 8000:8000 price-api",
      note: ["Six lines that make your model API portable.", "Chhe lines jo aapki model API ko portable bana deti hain."]
    },
    quiz: {
      q: ["What problem does Docker mainly solve?", "Docker mainly kaunsi problem solve karta hai?"],
      options: [["Making models more accurate", "Models ko zyaada accurate banaana"], ["'It works on my machine but not on the server'", "'Mere laptop pe chalta hai, server pe nahi'"], ["Writing SQL", "SQL likhna"]],
      answer: 1,
      why: ["Containers package the exact environment, so the app behaves the same everywhere.", "Containers exact environment pack karte hain, isliye app har jagah ek jaisi chalti hai."]
    },
    remember: ["Dockerfile (recipe) → image (package) → container (running app).", "Dockerfile (recipe) → image (package) → container (chalti app)."]
  },

  "kubernetes": {
    icon: "☸️", mins: 8,
    title: ["Kubernetes: running containers at scale", "Kubernetes: containers ko bade scale pe chalaana"],
    analogy: [
      "A big wedding caterer doesn't run one stove. A manager watches many cooking stations, adds stations when guests pour in, replaces a cook who falls sick, and makes sure food keeps flowing. Kubernetes is that manager for containers: it keeps the right number running, restarts failures and scales up with traffic.",
      "Badi shaadi ka caterer ek chulha nahi chalata. Ek manager kai cooking stations pe nazar rakhta hai, mehmaan badhne pe stations badhaata hai, beemar cook ko replace karta hai, aur khaana lagaataar chalta rehta hai. Kubernetes containers ke liye wahi manager hai: sahi number mein containers chalaata hai, fail hone pe restart karta hai, aur traffic ke saath scale karta hai."
    ],
    explain: [
      "You tell Kubernetes the desired state ('run 3 copies of my model API, each with 2 GB of memory and 1 GPU') and it makes reality match. Key objects: a Pod is one or more running containers, a Deployment keeps N pods healthy and handles rolling updates, a Service gives pods a stable address, and a HorizontalPodAutoscaler adds pods when load rises. For AI, you also schedule GPU nodes and set resource limits so one model can't starve another. Helm packages all this YAML into reusable charts. Start locally with kind or minikube.",
      "Aap Kubernetes ko desired state batate ho ('meri model API ki 3 copies chalao, har ek ko 2 GB memory aur 1 GPU'), aur woh asliyat ko usse match karta hai. Key objects: Pod ek ya zyaada chalte containers hai, Deployment N pods ko healthy rakhta hai aur rolling updates sambhaalta hai, Service pods ko stable address deta hai, aur HorizontalPodAutoscaler load badhne pe pods badhaata hai. AI ke liye GPU nodes schedule karte ho aur resource limits set karte ho, taaki ek model doosre ke resources na kha jaaye. Helm is saare YAML ko reusable charts mein pack karta hai. Local pe kind ya minikube se shuru karo."
    ],
    terms: [
      ["Pod", "The smallest unit Kubernetes runs: one or more containers.", "Kubernetes ki sabse chhoti unit: ek ya zyaada containers."],
      ["Deployment", "Keeps a set number of pods running and updates them safely.", "Pods ki ek fixed ginti chalaata hai aur unhe safely update karta hai."],
      ["Autoscaling", "Automatically adding or removing pods based on load.", "Load ke hisaab se apne aap pods badhaana ya ghataana."]
    ],
    example: {
      lang: "yaml",
      code: "apiVersion: apps/v1\nkind: Deployment\nmetadata: { name: price-api }\nspec:\n  replicas: 3\n  selector: { matchLabels: { app: price-api } }\n  template:\n    metadata: { labels: { app: price-api } }\n    spec:\n      containers:\n        - name: api\n          image: registry.example.com/price-api:1.4\n          resources: { limits: { memory: \"2Gi\", cpu: \"1\" } }",
      note: ["'Keep 3 copies of version 1.4 running, each limited to 2 GB.' Kubernetes does the rest.", "'Version 1.4 ki 3 copies chalao, har ek 2 GB tak limited.' Baaki Kubernetes karta hai."]
    },
    quiz: {
      q: ["Traffic triples during a sale. What adds more pods automatically?", "Sale mein traffic teen guna ho gaya. Apne aap aur pods kaun jodta hai?"],
      options: [["A Service", "Service"], ["A HorizontalPodAutoscaler", "HorizontalPodAutoscaler"], ["A Dockerfile", "Dockerfile"]],
      answer: 1,
      why: ["The autoscaler watches load (e.g. CPU or requests) and changes the replica count.", "Autoscaler load (jaise CPU ya requests) dekhta hai aur replicas ki ginti badalta hai."]
    },
    remember: ["Declare the desired state, and Kubernetes keeps it true: restarts, scaling, updates.", "Desired state batao, Kubernetes use sach rakhta hai: restarts, scaling, updates."]
  },

  "gpu-serving": {
    icon: "⚡", mins: 7,
    title: ["Serving LLMs efficiently: GPUs, batching and cost", "LLMs ko efficiently serve karna: GPUs, batching aur cost"],
    analogy: [
      "An auto-rickshaw carrying one passenger at a time is slow and expensive per person. A bus that waits a few seconds to fill up moves far more people for the same fuel. LLM servers 'batch' many user requests together on one GPU for the same reason: much better throughput and lower cost per request.",
      "Ek baar mein ek passenger le jaane wala auto slow aur per person mehenga padta hai. Bus thode second rukkar bharti hai aur utne hi fuel mein kahin zyaada log le jaati hai. LLM servers isi wajah se ek GPU pe bahut saari user requests ko 'batch' karte hain: kahin behtar throughput, aur har request ki cost kam."
    ],
    explain: [
      "Self-hosting open models (Llama, Qwen, Mistral) needs GPUs, and GPUs are expensive. Inference servers like vLLM or TGI maximise GPU use with continuous batching (adding new requests mid-flight) and efficient memory for the conversation cache. Key metrics: time to first token (how fast the reply starts), tokens per second, p95 latency and cost per 1,000 requests. Quantisation shrinks models to fit cheaper GPUs, caching repeated prompts saves money, and an LLM gateway in front routes traffic, enforces budgets and falls back between providers.",
      "Open models (Llama, Qwen, Mistral) khud host karne ke liye GPUs chahiye, aur GPUs mehenge hain. vLLM ya TGI jaise inference servers continuous batching (chalti requests ke beech nayi requests jodna) aur conversation cache ke liye efficient memory se GPU ka poora use karte hain. Key metrics: time to first token (jawaab kitni jaldi shuru hota hai), tokens per second, p95 latency aur har 1,000 requests ki cost. Quantisation models ko chhota karke saste GPUs mein fit karta hai, repeat prompts ki caching paise bachaati hai, aur saamne laga LLM gateway traffic route karta hai, budgets lagaata hai aur providers ke beech fallback karta hai."
    ],
    terms: [
      ["Batching", "Processing many requests together to use the GPU fully.", "GPU ka poora use karne ke liye bahut saari requests ek saath process karna."],
      ["Time to first token", "How quickly the first words of a reply appear.", "Jawaab ke pehle words kitni jaldi dikhte hain."],
      ["p95 latency", "95% of requests are faster than this. It captures the slow tail.", "95% requests isse fast hain. Slow wali requests isse pakdi jaati hain."]
    ],
    example: {
      lang: "bash",
      code: "pip install vllm\nvllm serve Qwen/Qwen2.5-7B-Instruct --max-model-len 8192\n# → OpenAI-compatible API on :8000 with continuous batching built in\n\n# Track: time-to-first-token, tokens/sec, p95 latency, GPU utilisation, ₹ per 1k requests",
      note: ["One command gives you a batched, production-style LLM server.", "Ek command se batched, production-style LLM server mil jaata hai."]
    },
    quiz: {
      q: ["Your GPU sits at 20% utilisation while users wait. What helps most?", "Users wait kar rahe hain aur GPU sirf 20% use ho raha hai. Sabse zyaada kya madad karega?"],
      options: [["Buy more GPUs", "Aur GPUs khareedo"], ["An inference server with continuous batching", "Continuous batching wala inference server"], ["A bigger model", "Bada model"]],
      answer: 1,
      why: ["Batching packs more requests onto the same GPU, raising utilisation and throughput.", "Batching same GPU pe zyaada requests daalta hai, jisse utilisation aur throughput badhte hain."]
    },
    remember: ["Batch requests, measure latency and cost, and quantise and cache where you can.", "Requests batch karo, latency aur cost naapo, aur jahan ho sake quantise aur cache karo."]
  },

  "mlops-tracking": {
    icon: "🗂️", mins: 7,
    title: ["MLOps: experiment tracking and model registries", "MLOps: experiment tracking aur model registries"],
    analogy: [
      "A good cook trying new biryani recipes writes down every attempt: rice brand, spice amounts, cooking time and how it tasted. Without notes, they can never recreate the best one. Experiment tracking is that notebook for ML, and a model registry is the shelf of approved, labelled recipes the restaurant actually serves.",
      "Achha cook naye biryani recipes try karte waqt har koshish likhta hai: chawal ka brand, masaalon ki quantity, pakane ka time aur taste kaisa tha. Notes ke bina woh sabse acchi wali kabhi dobara nahi bana paayega. Experiment tracking ML ke liye wahi notebook hai, aur model registry approved, label wali recipes ki shelf hai jo restaurant asal mein serve karta hai."
    ],
    explain: [
      "MLOps is DevOps for machine learning: making model training reproducible and deployment reliable. Experiment tracking tools (MLflow, Weights & Biases) automatically log each run's code version, data version, parameters, metrics and output model, so you can compare runs and reproduce the best. A model registry stores approved model versions with stages like 'staging' and 'production', so deployments always pick a known, tested version and you can roll back instantly. CI/CD for ML adds automated tests and evals before a model is promoted.",
      "MLOps machine learning ke liye DevOps hai: model training ko reproducible aur deployment ko reliable banaana. Experiment tracking tools (MLflow, Weights & Biases) har run ka code version, data version, parameters, metrics aur output model automatically log karte hain, taaki aap runs compare kar sako aur best wala dobara bana sako. Model registry approved model versions ko 'staging' aur 'production' jaise stages ke saath store karti hai, taaki deployment hamesha jaana-pehchaana, tested version uthaaye aur aap turant roll back kar sako. ML ke liye CI/CD model promote hone se pehle automated tests aur evals jodta hai."
    ],
    terms: [
      ["Experiment run", "One training attempt with its settings and results logged.", "Ek training koshish, uski settings aur results ke log ke saath."],
      ["Model registry", "A versioned store of approved models and their stages.", "Approved models aur unke stages ka versioned store."],
      ["Reproducibility", "Being able to recreate the exact same model again.", "Bilkul same model dobara bana paana."]
    ],
    example: {
      lang: "python",
      code: "import mlflow\nwith mlflow.start_run(run_name=\"xgb-depth4\"):\n    mlflow.log_params({\"max_depth\": 4, \"lr\": 0.05, \"data\": \"orders_2026_09\"})\n    model.fit(X_train, y_train)\n    mlflow.log_metric(\"recall\", 0.81)\n    mlflow.sklearn.log_model(model, \"model\", registered_model_name=\"fraud\")",
      note: ["Every run is recorded, and the best one goes to the registry.", "Har run record hota hai, aur best wala registry mein jaata hai."]
    },
    quiz: {
      q: ["A new model version performs badly in production. What lets you recover fastest?", "Naya model version production mein kharab perform kar raha hai. Sabse jaldi recover kaise hoga?"],
      options: [["Retraining from memory", "Yaad se dobara train karna"], ["Rolling back to the previous version in the model registry", "Model registry mein pichhle version pe roll back karna"], ["Deleting the logs", "Logs delete karna"]],
      answer: 1,
      why: ["The registry keeps tested versions, so rollback is a one-step change.", "Registry tested versions rakhti hai, isliye rollback ek step ka kaam hai."]
    },
    remember: ["Log every run, register every shipped model, and always be able to roll back.", "Har run log karo, har ship hua model register karo, aur hamesha roll back kar sako."]
  },

  "mlops-monitoring": {
    icon: "📡", mins: 7,
    title: ["Monitoring models: drift and silent failures", "Models ki monitoring: drift aur chupke se hone wale failures"],
    analogy: [
      "A demand-forecasting model trained before Diwali suddenly sees completely different shopping patterns during the festival season. Nothing 'crashed', but its predictions are now wrong. Like a car slowly going out of alignment, models drift as the world changes, and you only notice if you keep checking.",
      "Diwali se pehle train hua demand-forecasting model tyohaar ke season mein achanak bilkul alag shopping patterns dekhta hai. Kuch 'crash' nahi hua, lekin uski predictions ab galat hain. Jaise gaadi ki alignment dheere-dheere bigadti hai, waise hi duniya badalne pe models drift hote hain, aur pata tabhi chalta hai jab aap check karte rehte ho."
    ],
    explain: [
      "Software errors are loud. Model errors are often silent. Data drift means the inputs change: new user types, new products, a changed upstream field. Concept drift means the relationship changes: what used to signal fraud no longer does. Monitor input distributions, prediction distributions, data quality and, when labels arrive, real accuracy. For LLM apps, trace every request (prompt, retrieved docs, output, cost, latency) and track user feedback. Set alerts and a retraining or rollback plan before you need them.",
      "Software errors shor machaate hain. Model errors aksar chupchaap hote hain. Data drift matlab inputs badal gaye: naye tarah ke users, naye products, upstream ka koi field badal gaya. Concept drift matlab rishta badal gaya: jo pehle fraud ka signal tha, ab nahi hai. Input distributions, prediction distributions, data quality aur, labels aane pe, asli accuracy monitor karo. LLM apps ke liye har request trace karo (prompt, retrieve hue docs, output, cost, latency) aur user feedback track karo. Alerts aur retraining ya rollback ka plan zaroorat se pehle bana ke rakho."
    ],
    terms: [
      ["Data drift", "Input data looks different from the training data.", "Input data training data se alag dikhne lagta hai."],
      ["Concept drift", "The real-world relationship the model learned has changed.", "Model ne jo real-world rishta seekha tha, woh badal gaya."],
      ["Tracing", "Recording each request's steps, inputs and outputs for debugging.", "Debugging ke liye har request ke steps, inputs aur outputs record karna."]
    ],
    example: {
      lang: "text",
      code: "Weekly monitor — fraud model v12\n  avg transaction amount   ₹1,240 → ₹2,980   ⚠️ data drift (festival season)\n  % flagged as fraud       1.1%  → 4.6%     ⚠️ prediction shift\n  confirmed-fraud recall   0.81  → 0.62     🚨 alert → retrain with recent data",
      note: ["Watch the inputs, the outputs and, when you can, the true outcomes.", "Inputs, outputs aur, jab ho sake, asli nateeje dekhte raho."]
    },
    quiz: {
      q: ["Model accuracy slowly drops over months with no code changes. Most likely cause?", "Bina code change ke mahino mein model accuracy dheere-dheere gir rahi hai. Sabse likely wajah?"],
      options: [["A syntax error", "Syntax error"], ["Drift: the real-world data or relationships changed", "Drift: real-world data ya rishte badal gaye"], ["Too many tests", "Bahut zyaada tests"]],
      answer: 1,
      why: ["When the world changes, a frozen model gets stale. That's drift.", "Duniya badalti hai to frozen model purana pad jaata hai. Yahi drift hai."]
    },
    remember: ["Models decay silently. Monitor inputs, outputs and outcomes, with alerts.", "Models chupchaap kharab hote hain. Inputs, outputs aur nateeje alerts ke saath monitor karo."]
  },

  "data-pipelines": {
    icon: "🚰", mins: 8,
    title: ["Data pipelines: ETL, Airflow, dbt and Spark", "Data pipelines: ETL, Airflow, dbt aur Spark"],
    analogy: [
      "Mumbai's dabbawalas collect lunchboxes from homes, sort them at stations, and deliver them to offices, on schedule, every day, almost without mistakes. A data pipeline does the same for data: extract it from apps, transform and clean it, and load it where analysts and models need it, reliably and on time.",
      "Mumbai ke dabbawale gharon se tiffin uthaate hain, stations pe sort karte hain, aur offices tak pahunchaate hain, schedule pe, roz, lagbhag bina galti ke. Data pipeline data ke liye yahi karti hai: apps se data nikaalo (extract), clean aur transform karo, aur wahan load karo jahan analysts aur models ko chahiye, reliably aur time pe."
    ],
    explain: [
      "ETL / ELT means extract (from databases, APIs, files), transform (clean, join, aggregate) and load (into a warehouse or lake). Airflow orchestrates the steps: a DAG defines tasks, their order, schedules, retries and alerts. dbt writes transformations as tested SQL models inside the warehouse. Spark processes data too big for one machine by splitting work across a cluster. Good pipelines are idempotent (safe to re-run), monitored for freshness, and documented, because every AI system downstream depends on them.",
      "ETL / ELT matlab extract (databases, APIs, files se), transform (clean, join, aggregate) aur load (warehouse ya lake mein). Airflow steps ko orchestrate karta hai: DAG tasks, unka order, schedules, retries aur alerts define karta hai. dbt transformations ko warehouse ke andar tested SQL models ke roop mein likhta hai. Spark ek machine ke liye bahut bade data ko cluster mein kaam baant kar process karta hai. Acchi pipelines idempotent hoti hain (dobara chalaana safe), freshness ke liye monitor hoti hain, aur documented hoti hain, kyunki aage ka har AI system unhi pe depend karta hai."
    ],
    terms: [
      ["ETL / ELT", "Extract, transform, load: moving and shaping data.", "Extract, transform, load: data ko le jaana aur shape dena."],
      ["DAG", "A graph of tasks with dependencies, run on a schedule (Airflow).", "Dependencies wale tasks ka graph, schedule pe chalta hai (Airflow)."],
      ["Idempotent", "Running it twice gives the same result as running it once.", "Do baar chalaane pe bhi result ek baar jaisa hi aata hai."]
    ],
    example: {
      lang: "python",
      code: "from airflow.decorators import dag, task\nfrom datetime import datetime\n\n@dag(schedule=\"0 2 * * *\", start_date=datetime(2026, 1, 1), catchup=False)\ndef daily_orders():\n    @task(retries=3)\n    def extract(): ...          # pull yesterday's orders from the app DB\n    @task\n    def transform(rows): ...    # clean, dedupe, join with customers\n    @task\n    def load(df): ...           # write to warehouse table fact_orders\n    load(transform(extract()))\n\ndaily_orders()",
      note: ["Runs every night at 2 am with retries. The pattern behind most data platforms.", "Har raat 2 baje retries ke saath chalti hai. Zyaadatar data platforms isi pattern pe chalte hain."]
    },
    quiz: {
      q: ["Yesterday's pipeline failed halfway. Why does it matter that it's idempotent?", "Kal ki pipeline aadhe mein fail ho gayi. Idempotent hona kyun zaroori hai?"],
      options: [["It runs faster", "Woh fast chalti hai"], ["You can safely re-run it without duplicating data", "Bina data duplicate kiye use safely dobara chala sakte ho"], ["It doesn't need a schedule", "Use schedule ki zaroorat nahi"]],
      answer: 1,
      why: ["Re-runs are normal in data work, and idempotency prevents double-counting.", "Data kaam mein re-runs normal hain, aur idempotency double-counting se bachaati hai."]
    },
    remember: ["Extract → transform → load, orchestrated, tested, re-runnable and monitored.", "Extract → transform → load: orchestrated, tested, dobara chalne laayak aur monitored."]
  },

  "data-quality": {
    icon: "🧹", mins: 6,
    title: ["Data quality: catching bad data early", "Data quality: kharab data jaldi pakadna"],
    analogy: [
      "A good restaurant checks vegetables at the back door, before they reach the kitchen. Rotten tomatoes caught there cost nothing; caught on a customer's plate, they cost the restaurant's reputation. Data quality checks are that back-door inspection for data.",
      "Achha restaurant sabziyaan kitchen tak pahunchne se pehle hi back door pe check karta hai. Wahan pakde gaye sade tamatar ka koi nuksaan nahi; customer ki plate pe pakde gaye to restaurant ki izzat ka nuksaan. Data quality checks data ke liye wahi back-door inspection hain."
    ],
    explain: [
      "Bad data quietly breaks models and dashboards. Check data automatically at each pipeline stage: completeness (no unexpected nulls), validity (ages between 0 and 120, valid email formats), uniqueness (no duplicate order IDs), consistency (totals match their line items), and freshness (data arrived on time). Tools like Great Expectations or dbt tests codify these rules and fail the pipeline or alert when they break. For ML, also check label quality and class balance, and keep a data contract with upstream teams so schema changes don't surprise you.",
      "Kharab data chupchaap models aur dashboards tod deta hai. Pipeline ke har stage pe data automatically check karo: completeness (unexpected nulls nahi), validity (umar 0 se 120 ke beech, sahi email format), uniqueness (duplicate order IDs nahi), consistency (totals unke line items se match karein), aur freshness (data time pe aaya). Great Expectations ya dbt tests jaise tools in rules ko code mein likhte hain, aur rule tootne pe pipeline fail karte hain ya alert bhejte hain. ML ke liye label quality aur class balance bhi check karo, aur upstream teams ke saath data contract rakho, taaki schema changes achanak pareshaan na karein."
    ],
    terms: [
      ["Validation rule", "A check data must pass, e.g. amount ≥ 0.", "Check jo data ko pass karna hi hai, jaise amount ≥ 0."],
      ["Freshness", "Whether data is as recent as expected.", "Data utna naya hai ya nahi jitna hona chahiye."],
      ["Data contract", "An agreement on schema and quality between data producers and consumers.", "Data bhejne aur use karne wali teams ke beech schema aur quality ka agreement."]
    ],
    example: {
      lang: "yaml",
      code: "# dbt tests on the orders model\nmodels:\n  - name: fact_orders\n    columns:\n      - name: order_id\n        tests: [unique, not_null]\n      - name: amount\n        tests:\n          - dbt_utils.accepted_range: { min_value: 0 }\n      - name: status\n        tests:\n          - accepted_values: { values: ['placed', 'delivered', 'cancelled'] }",
      note: ["Rules live next to the data and run on every pipeline run.", "Rules data ke saath rehte hain aur har pipeline run pe chalte hain."]
    },
    quiz: {
      q: ["Where is the cheapest place to catch a bad value?", "Kharab value pakadne ki sabse sasti jagah kaunsi hai?"],
      options: [["In the CEO's dashboard", "CEO ke dashboard mein"], ["Early in the pipeline, with automated checks", "Pipeline mein jaldi, automated checks se"], ["After the model is retrained", "Model retrain hone ke baad"]],
      answer: 1,
      why: ["The earlier you catch it, the fewer systems it pollutes.", "Jitna jaldi pakdoge, utne kam systems usse kharab honge."]
    },
    remember: ["Check completeness, validity, uniqueness, consistency and freshness, automatically.", "Completeness, validity, uniqueness, consistency aur freshness automatically check karo."]
  },

  "streaming": {
    icon: "🌊", mins: 7,
    title: ["Streaming data: Kafka and real-time pipelines", "Streaming data: Kafka aur real-time pipelines"],
    analogy: [
      "Batch processing is like reading the morning newspaper: yesterday's news, all at once. Streaming is like a live cricket score app: every ball updates instantly. Fraud detection, live delivery tracking and real-time recommendations need the live-score approach.",
      "Batch processing subah ka akhbaar padhne jaisa hai: kal ki khabrein, sab ek saath. Streaming live cricket score app jaisa hai: har ball pe turant update. Fraud detection, live delivery tracking aur real-time recommendations ko live-score wala tareeka chahiye."
    ],
    explain: [
      "In streaming, events (a click, a payment, a GPS ping) flow continuously. Apache Kafka is the standard backbone: producers write events to topics, Kafka stores them durably in order, and consumers read them at their own pace. Stream processors (Spark Structured Streaming, Flink) compute things on the fly, such as rolling counts and features for fraud models. Streaming adds complexity: late or duplicate events, ordering and exactly-once guarantees. Start with batch, and add streaming only where freshness truly matters.",
      "Streaming mein events (click, payment, GPS ping) lagaataar bahte rehte hain. Apache Kafka standard backbone hai: producers events ko topics mein likhte hain, Kafka unhe order mein durably store karta hai, aur consumers apni speed se padhte hain. Stream processors (Spark Structured Streaming, Flink) chalte-chalte cheezein calculate karte hain, jaise rolling counts aur fraud models ke features. Streaming complexity badhaati hai: late ya duplicate events, ordering aur exactly-once guarantees. Batch se shuru karo, aur streaming sirf wahan jodo jahan freshness sach mein zaroori hai."
    ],
    terms: [
      ["Event", "A single fact that happened at a time, e.g. 'payment of ₹499 at 10:02'.", "Kisi time pe hua ek fact, jaise '10:02 pe ₹499 ki payment'."],
      ["Topic", "A named stream of events in Kafka.", "Kafka mein events ki naam wali stream."],
      ["Consumer", "A service that reads and processes events from a topic.", "Service jo topic se events padhti aur process karti hai."]
    ],
    example: {
      lang: "text",
      code: "UPI app ──payment event──▶ Kafka topic 'payments'\n                                  │\n          ┌───────────────────────┼───────────────────────┐\n   fraud scorer            live dashboard          warehouse loader\n   (reacts in < 1 s)       (updates per second)    (hourly batch)",
      note: ["One stream, many independent consumers, each at its own speed.", "Ek stream, kai independent consumers, har ek apni speed se."]
    },
    quiz: {
      q: ["Which use case most needs streaming instead of a nightly batch?", "Kis use case ko nightly batch ki jagah streaming sabse zyaada chahiye?"],
      options: [["Monthly finance report", "Monthly finance report"], ["Blocking a fraudulent payment as it happens", "Fraud payment ko hote hi block karna"], ["Yearly HR summary", "Yearly HR summary"]],
      answer: 1,
      why: ["Fraud must be stopped in seconds. A report tomorrow is too late.", "Fraud ko seconds mein rokna hai. Kal ki report bahut der hai."]
    },
    remember: ["Batch = periodic, simpler. Streaming = real-time, more complex. Use it when seconds matter.", "Batch = periodic, simple. Streaming = real-time, complex. Jab seconds matter karein tab use karo."]
  },

  "security-compliance": {
    icon: "🔐", mins: 8,
    title: ["Enterprise AI: integration, security and compliance", "Enterprise AI: integration, security aur compliance"],
    analogy: [
      "A hospital lets a visiting specialist in, but with a visitor badge that opens only certain doors, every entry logged, and no patient files leaving the building. Bringing AI into a company works the same way: it connects to legacy systems through controlled doors, sees only what each user is allowed to see, and leaves an audit trail.",
      "Hospital visiting specialist ko andar aane deta hai, lekin aise visitor badge ke saath jo sirf kuch darwaaze kholta hai, har entry log hoti hai, aur koi patient file building se bahar nahi jaati. Company mein AI laana bhi aise hi kaam karta hai: woh legacy systems se controlled darwaazon ke through judta hai, har user ko sirf wahi dikhata hai jo use dekhne ki permission hai, aur audit trail chhodta hai."
    ],
    explain: [
      "Enterprise AI projects succeed or fail on integration and trust, not the model. Connect to existing systems (CRMs, ERPs, document stores) through their APIs with proper authentication (SSO, OAuth, service accounts). Make RAG permission-aware: retrieve only documents the asking user is allowed to see. Protect personal data (PII) by masking it before it reaches the model, and know where data is stored and processed (data residency). Log every prompt, tool call and answer for audits. Map requirements to frameworks like GDPR, India's DPDP Act, HIPAA or SOC 2 with the client's security team early.",
      "Enterprise AI projects model se nahi, integration aur bharose se safal ya fail hote hain. Existing systems (CRMs, ERPs, document stores) se unki APIs ke through, sahi authentication (SSO, OAuth, service accounts) ke saath judo. RAG ko permission-aware banao: sirf woh documents retrieve karo jo poochne wale user ko dekhne ki permission hai. Personal data (PII) ko model tak pahunchne se pehle mask karke bachao, aur pata rakho ki data kahan store aur process hota hai (data residency). Audits ke liye har prompt, tool call aur jawaab log karo. Client ki security team ke saath shuru mein hi requirements ko GDPR, India ke DPDP Act, HIPAA ya SOC 2 jaise frameworks se map karo."
    ],
    terms: [
      ["PII", "Personally identifiable information: names, phone numbers, Aadhaar, addresses.", "Personally identifiable information: naam, phone number, Aadhaar, address."],
      ["Permission-aware retrieval", "Search that respects each user's access rights.", "Search jo har user ke access rights ka dhyaan rakhe."],
      ["Audit log", "A tamper-resistant record of who did what, and when.", "Kisne kab kya kiya, iska aisa record jise badla na ja sake."]
    ],
    example: {
      lang: "text",
      code: "HR assistant asks: \"What is Priya's salary?\"\n  1. Identify the user via SSO → role = 'team lead'\n  2. Retrieval filter: only documents this role can read → salary files excluded\n  3. Answer: \"I can't share individual salary details.\"\n  4. Audit log: user, question, documents checked, answer, timestamp",
      note: ["Security is enforced by the system, not by hoping the model refuses.", "Security system lagaata hai. Model ke mana karne ki ummeed pe nahi chhodi jaati."]
    },
    quiz: {
      q: ["Two employees ask the same RAG bot about confidential plans. What should differ?", "Do employees same RAG bot se confidential plans ke baare mein poochte hain. Kya alag hona chahiye?"],
      options: [["Nothing, same answer for both", "Kuch nahi, dono ko same jawaab"], ["The documents retrieved, based on each person's permissions", "Har insaan ki permissions ke hisaab se retrieve hone wale documents"], ["Only the font", "Sirf font"]],
      answer: 1,
      why: ["Permission-aware retrieval ensures each user only sees content they're allowed to.", "Permission-aware retrieval yeh pakka karta hai ki har user sirf wahi content dekhe jiski use permission hai."]
    },
    remember: ["Enforce access, mask PII, log everything, and involve security early.", "Access enforce karo, PII mask karo, sab log karo, aur security team ko jaldi shaamil karo."]
  }
});

if (typeof module !== "undefined" && module.exports) module.exports = { LESSON_TOPICS };
