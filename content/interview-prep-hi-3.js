// Hinglish interview prep, part 3: MLOps, data, forward deployed, product, freshers, design,
// behaviour and closing. See interview-prep-hi-1.js.
var INTERVIEW_PREP_HI = Object.assign(typeof INTERVIEW_PREP_HI !== "undefined" ? INTERVIEW_PREP_HI : {}, {
  "drift": {
    q: "Data drift aur concept drift mein kya fark hai? Bina labels ke inhe kaise pakadoge?",
    answer: "Data drift tab hai jab inputs badal jaate hain, jaise naya customer segment ya sensor recalibrate hua, par outcome se rishta wahi rehta hai. Concept drift tab hai jab rishta hi badal jaata hai, jaise fraudsters naye tarike apnaate hain, to wahi inputs ab kuch aur matlab rakhte hain. Fresh labels ke bina, main input features ke distributions ko training baseline se PSI ya KS test jaise statistics se compare karta hoon, predictions aur confidence scores ka distribution dekhta hoon, aur complaints ya manual overrides jaise business signals track karta hoon. Labels baad mein aayein to har time window ki asli performance nikaalta hoon.",
    points: ["Data drift = inputs badle; concept drift = rishta badla", "Feature aur prediction distributions monitor karo (PSI, KS)", "Labels der se aayein to proxy signals", "Labels aane pe asli performance naapo"],
    check: "Lagbhag har loop mein MLOps ka core topic."
  },
  "monitoring-what": {
    q: "Production mein model ke liye kya kya monitor karoge?",
    answer: "Chaar layers. System health: latency, error rates, throughput, CPU, GPU aur memory. Data: missing values, schema changes, training ke mukaable feature distributions. Model: prediction distribution, confidence, aur labels aane pe asli accuracy. Business: woh metric jiske liye model bana hai, jaise fraud ka nuksaan ya conversion. Har alert ka ek action ho, jaise \"on call ko page karo\" ya \"retrain karo\", warna log alerts ignore karte hain. System metrics ke liye Prometheus aur Grafana, aur data ke liye Evidently jaisa drift tool.",
    points: ["System, data, model aur business layers", "Baseline se comparison", "Alerts actions se jude", "Example tools"],
    check: "Production models ki poori ownership."
  },
  "ctr-drop": {
    q: "Click through rate raaton raat 20% gir gaya, par input distributions normal dikhte hain. Model drift hai ya bug?",
    answer: "Achanak raaton raat girna slow drift nahi, bug ya badlaav jaisa lagta hai. Main is order mein check karunga: kya kuch deploy hua, jaise naya model, feature pipeline ya front end change? Kya logging ya metric khud toota hai, jaise clicks record hi nahi ho rahe? Kya features der se ya default values ke saath aa rahe hain, jo aggregate distributions mein na dikhe? Kya saare users mein hai ya ek platform, region ya app version mein? Holdout ya pichhle model se compare karunga. Sab theek nikle tabhi concept drift sochunga, jaise tyohaar ya competitor ka event, aur retrain karunga.",
    points: ["Achanak = pehle badlaav ya bug pe shaq", "Deploys, logging, der se ya default features check karo", "Platform, region, version se segment karo", "Phir asli drift socho"],
    check: "Shaant, systematic incident debugging."
  },
  "docker-k8s": {
    q: "Model ko containerise karke Kubernetes pe kaise serve karoge?",
    answer: "Ek chhoti API likho, jaise FastAPI, jo startup pe model ek baar load kare aur predict endpoint aur health check de. Dockerfile likho slim base image, pinned dependencies aur model ke saath, ya to image mein ya start pe registry se download. Kubernetes pe kai replicas wala Deployment banao, resource requests aur limits ke saath, health endpoint pe readiness aur liveness probes, aage ek Service, aur CPU ya request rate pe Horizontal Pod Autoscaler. GPU ke liye nvidia.com/gpu resources maango aur GPU node pools use karo.",
    points: ["Model ek baar load karne wali API; health endpoint", "Dockerfile: slim image, pinned versions", "Deployment, Service, probes, resource limits", "Autoscaling; zaroorat ho to GPU requests"],
    check: "Deployment ki hands on skills."
  },
  "cicd-ml": {
    q: "Machine learning ke liye CI/CD kaisa dikhta hai?",
    answer: "Normal CI/CD jaisa, plus data aur models. CI: har code change pe unit tests, data validation tests aur sample pe chhoti training run taaki errors pakde jaayein. Training pipelines schedule pe ya naya data aane pe chalti hain, parameters aur metrics experiment tracker mein log karti hain, aur model registry mein register karti hain. CD: naya model tabhi promote hota hai jab fixed evaluation set pe current wale ko hara de aur bias aur latency jaise checks paas kare, phir canary ya shadow deployment se dheere rollout, metrics gire to automatic rollback.",
    points: ["Code aur data ke tests; chhota training smoke test", "Tracked, reproducible training aur model registry", "Fixed evals pe promotion gates", "Rollback ke saath dheere rollout"],
    check: "Process ki maturity."
  },
  "reproducible": {
    q: "Model training reproducible kaise banate ho?",
    answer: "Result pe asar daalne wali har cheez ka version rakho: code git se, data snapshot ya DVC jaise tool se, environment Docker image aur pinned packages se, aur configuration aur hyperparameters tracked config file mein. Random seeds set karo. Har run ko uske code commit, data version, parameters, metrics aur bane model ke saath MLflow jaise experiment tracker mein log karo. Tab koi bhi mahino baad model dobara chala ya samjha sakta hai, jo audits ke liye bhi zaroori hai.",
    points: ["Code, data, environment aur config ke versions", "Seeds", "Experiment tracking jo sab ko model se jode"],
    check: "Engineering discipline."
  },
  "rollout": {
    q: "Naya model offline behtar dikha par production ki chinta hai. Safely rollout kaise karoge?",
    answer: "Step by step. Pehle shadow mode: naya model asli traffic pe predictions karta hai, par users ko purane model ka output milta hai, to predictions, latency aur errors safely compare kar sakta hoon. Phir canary: chhota hissa, jaise 5%, traffic naye model ko bhejo aur technical aur business metrics dekho. Theek rahe to dheere badhao, ya proper A/B test chalao. Purana model ready rakho taaki rollback ek switch ho. Success aur rollback criteria shuru karne se pehle tay karo.",
    points: ["Shadow deployment", "Chhote traffic pe canary, phir badhao ya A/B test", "Pehle se tay success aur rollback criteria", "Ek click rollback"],
    check: "Production mein risk management."
  },
  "llm-serving-gpu": {
    q: "Open source LLM ko GPUs pe efficiently kaise serve karoge?",
    answer: "Plain web server ke bajaye LLM ke liye bana inference server use karo, jaise vLLM ya TGI. Inme continuous batching hoti hai, jo chalte batch mein nayi requests jodti hai taaki GPU busy rahe, aur KV cache memory sambhaalne ke liye paged attention. Quality poori karne wala sabse chhota model chuno, aur saste GPUs pe fit karne ke liye 8 bit ya 4 bit quantisation socho. Phir queue length ya tokens per second pe autoscale karo, max token limits lagao, aur time to first token, tokens per second, GPU memory aur per request cost monitor karo.",
    points: ["LLM inference server (vLLM, TGI)", "Continuous batching, paged KV cache", "Sahi size aur quantised models", "Autoscale aur latency, throughput, cost monitor"],
    check: "LLM infrastructure ab zyaadatar MLOps interviews ka hissa hai."
  },
  "llmops": {
    q: "LLM applications chalaana classic ML models se kaise alag hai?",
    answer: "Kai nayi cheezein sambhaalni padti hain. Prompts code hain, to unhe versioning, review aur testing chahiye. Har prompt ya model change pe evaluation suites chalni chahiye, kyunki ek accuracy number nahi hota. Cost per request aur per feature monitor karni padti hai, kyunki tokens ke saath badhti hai. Providers models update karte hain, to versions pin karta hoon aur upgrade se pehle evals dobara chalata hoon. Chain ya agent ke har step ki logging aur tracing debugging ke liye zaroori hai. Aur safety checks: prompt injection, logs mein personal data, aur content filters.",
    points: ["Prompt versioning aur testing", "Release gates ke roop mein eval suites", "Token cost monitoring", "Model version pinning, tracing, safety controls"],
    check: "2026 mein interviews mein LLMOps badh raha hai."
  },
  "etl-elt": {
    q: "ETL aur ELT mein kya fark hai? Aajkal kaunsa zyaada common hai?",
    answer: "ETL matlab extract, transform, phir load: data warehouse mein aane se pehle saaf aur reshape hota hai. ELT matlab extract, pehle raw data load, phir warehouse ke andar SQL se transform, aksar dbt ke saath. Ab ELT zyaada common hai kyunki BigQuery, Snowflake aur Databricks jaise cloud warehouses powerful aur scale karne mein saste hain, aur raw data rakhne se logic badalne pe transformations dobara bana sakte ho. ETL tab bhi use hota hai jab data aane se pehle saaf ya mask karna zaroori ho, jaise compliance ke liye personal data hatana.",
    points: ["ETL: load se pehle transform; ELT: raw load, warehouse mein transform", "Cloud warehouses aur dbt ke saath ELT aage", "Dobara banaane ke liye raw data rakho", "Data pehle mask karna ho to ETL"],
    check: "Modern data stack ki samajh."
  },
  "idempotent": {
    q: "Pipeline aise kaise design karoge ki reruns aur backfills se data double count na ho?",
    answer: "Har step idempotent banao: do baar chalaao to wahi result jo ek baar chalaane pe. Practically, data partition se process karta hoon, jaise ek baar mein ek date, aur us partition ko overwrite ya unique key pe MERGE karke likhta hoon, bina soche append kabhi nahi. Partition tay karne ke liye processing time nahi, data ki event date use karta hoon. Phir pichhle mahine ka backfill bas un dates ko dobara chalaana hai. Run ke baad check jodta hoon ki row counts aur totals source se match karein.",
    points: ["Idempotency ki definition", "Date se partition; partition overwrite ya keys pe MERGE/upsert", "Event time vs processing time", "Reconciliation checks"],
    check: "Reliability ki soch; 2026 ka bada data engineering topic."
  },
  "spark-shuffle": {
    q: "Spark mein shuffle kya hai, aur data skew kaise sambhaaloge?",
    answer: "Filter ya map jaise narrow transformations har partition ke andar kaam karte hain. groupBy ya join jaise wide transformations ko same key wali rows ek machine pe chahiye, to Spark data network pe le jaata hai. Yahi shuffle hai, aur aksar sabse slow hissa. Skew tab hai jab ek key ki baaki se bahut zyaada rows hon, jaise ek bahut bada customer, to ek task ghanton chalta hai aur baaki khaali baithe rehte hain. Fix: join mein chhoti table broadcast karo taaki shuffle na ho; hot key pe random suffix jod ke salt karo; jaldi filter ya pre aggregate karo; aur adaptive query execution ko skewed partitions todne do.",
    points: ["Narrow vs wide transformations; shuffle = network pe data", "Skew = asamaan keys; ek slow task", "Broadcast joins, salting, jaldi aggregation, AQE"],
    check: "Spark performance ki gehraai."
  },
  "partitioning": {
    q: "Data lake mein Parquet aur partitioning kyun use karte hain?",
    answer: "Parquet columnar file format hai: har column ko saath rakhta hai aur acche se compress karta hai. Analytics queries aksar kuch hi columns padhti hain, to Parquet CSV se kaafi kam data padhta hai, aur schema aur types bhi rakhta hai. Partitioning data ko date jaise column se folders mein baantti hai, to pichhle hafte ki query sirf un folders ko padhti hai, ise partition pruning kehte hain. Main woh partition columns chunta hoon jinpe queries filter karti hain, aur bahut saari chhoti files se bachta hoon jo sab slow karti hain, unhe regularly compact karke.",
    points: ["Columnar, compressed, typed", "Common filters pe partition pruning", "Zyaada partitioning aur chhoti files se bacho"],
    check: "Performance aur cost ke liye storage ki buniyaad."
  },
  "data-quality-checks": {
    q: "Pipeline mein kaunse data quality checks lagaoge?",
    answer: "Boundaries pe checks: jab data aaye aur publish hone se pehle. Schema: expected columns aur types. Completeness: row counts pichhle dino ke mukaable expected range mein, aur zaroori fields NULL nahi. Validity: values allowed range ya list mein, jaise age 0 se 120. Uniqueness: primary keys unique. Freshness: sabse naya data kaafi recent. Consistency: totals source se match. dbt tests ya Great Expectations jaise tools ise aasaan banate hain. Critical failures pipeline rokte hain; chhote waale alert bhejte hain.",
    points: ["Schema, volume, nulls, ranges, uniqueness, freshness, reconciliation", "Ingestion pe aur publish se pehle", "Critical pe roko, chhote pe alert", "Tools: dbt tests, Great Expectations"],
    check: "Kharab data chupke se AI models todta hai; woh bachaav dekhna chahte hain."
  },
  "batch-stream": {
    q: "Batch ke bajaye streaming kab chunoge?",
    answer: "Batch data ko schedule pe chunks mein process karta hai, jaise har ghante ya raat ko; yeh simple, sasta aur theek karne mein aasaan hai. Streaming events ko lagaataar seconds mein process karta hai, Kafka aur Flink ya Spark Streaming jaise tools se. Streaming tabhi chunta hoon jab business ko tez reaction chahiye: payment ke dauraan fraud detection, live recommendations, ya real time alerts. Daily reports ya model training ke liye batch behtar. Kai systems dono use karte hain: real time features ke liye streaming, corrections aur history ke liye batch.",
    points: ["Batch: scheduled, simple, sasta", "Streaming: lagaataar, kam latency, zyaada complex", "Business ki latency zaroorat se chuno, examples ke saath", "Hybrid common hai"],
    check: "Architecture ki samajh."
  },
  "scd": {
    q: "Slowly changing dimension, type 2, kya hai?",
    answer: "Customer address jaisi dimensions waqt ke saath badalti hain. Type 1 purani value overwrite kar deta hai, to history kho jaati hai. Type 2 history rakhta hai: kuch badle to purani row ko end date aur is_current = false se band karo, aur nayi value, nayi start date aur is_current = true ke saath nayi row daalo. Is tarah pichhle saal ki sale us address se judti hai jo customer ka tab tha. Sahi historical reports aur us waqt jo pata tha uske hisaab se training data banane ke liye zaroori hai.",
    points: ["Type 1 overwrite; type 2 history rakhta hai", "Start aur end dates plus current flag", "Sahi point in time joins, ML training data samet"],
    check: "Warehouses ke liye data modelling basics."
  },
  "star-schema": {
    q: "Star schema mein fact aur dimension tables samjhao.",
    answer: "Fact table events ya measurements rakhti hai, jaise har order quantity aur amount ke saath, plus dimensions ki keys. Dimension tables descriptive context rakhti hain, jaise customer, product, date aur store. Ise star isliye kehte hain kyunki fact table beech mein aur dimensions chaaron taraf. Isse analytics queries simple aur tez hoti hain: \"har mahine har product category ki total sales\" bas fact se do dimensions ka join aur group by hai. Grain sahi rakhna, yaani fact table ki ek row kya represent karti hai, sabse zaroori design decision hai.",
    points: ["Facts = events aur measures; dimensions = descriptive context", "Star layout analytics simple karta hai", "Pehle grain tay karo"],
    check: "Modelling ki buniyaad."
  },
  "llm-pipeline": {
    q: "Aisi pipeline design karo jo roz 10,000 documents LLM se process kare, jaise invoices se fields nikaalna.",
    answer: "Naye documents object storage mein lo aur har document ka ek job queue pe daalo. Workers jobs uthaate hain, zaroorat ho to OCR se text nikaalte hain, structured output schema ke saath LLM call karte hain, result code se validate karte hain aur document ID, model version aur prompt version ke saath table mein likhte hain. LLM ki rate limits workers ki tay ginti aur exponential backoff wale retries se sambhaalo. Document ID se processing idempotent rakho taaki retries duplicate na karein. Failures aur low confidence results review queue mein bhejo. Har document ka cost budget ke against track karo, aur accuracy check ke liye outputs ka regularly sample lo.",
    points: ["Queue based, har document pe idempotent", "Structured output plus validation", "Rate limit handling: concurrency control, backoff retries", "Dead letter ya review queue; cost aur quality monitoring"],
    check: "2026 ka favourite: classic data engineering plus LLM ki haqeeqat."
  },
  "vector-fresh": {
    q: "Source documents update ya delete hon to vector index sync kaise rakhoge?",
    answer: "Index ko kisi bhi derived dataset ki tarah treat karo. Har chunk ko document ID aur position se stable ID do, aur content ka hash rakho. Sync job, change events se ya schedule pe, naye, badle aur delete hue documents dhoondhti hai; badle hue mein sirf un chunks ko dobara embed karke upsert karti hai jinka hash badla; delete hue ke chunks hata deti hai, taaki bot kabhi hataya hua content cite na kare. Har vector pe embedding model ka version bhi rakhta hoon, kyunki model badalne ka matlab sab dobara embed karna.",
    points: ["Stable chunk IDs aur content hashes", "Incremental upserts; deletes propagate", "Change data capture ya scheduled sync", "Embedding model version track"],
    check: "Production RAG data engineering."
  },
  "vague-customer": {
    q: "Customer kehta hai, \"Humein AI use karna hai.\" Pehli meeting mein kya karoge?",
    answer: "Main AI se nahi, unki problem se shuru karta hoon. Poochhta hoon: abhi sabse dard bhara ya mehenga process kaunsa hai? Kaun karta hai, kitni baar, aur success kaise naapte hain? Kaunsa data aur systems involved hain? Phir ek do use cases chunta hoon jo high value hon, jinka data available ho aur AI thoda galat ho to kam risk ho, aur ek success metric pe sehmati banata hoon, jaise \"invoice processing time 50% kam\". Meeting ek saaf agle step pe khatam: kuch hafton mein asli data ke saath chhota proof of concept.",
    points: ["Pehle problem: dard, kitni baar, owner, current metric", "Available data aur systems", "Use cases value, feasibility aur risk se chuno", "Naapne layak goal aur chhota agla step tay karo"],
    check: "Customer discovery. Dekhte hain solve karne se pehle poochhte ho ya nahi."
  },
  "integrate-legacy": {
    q: "AI system ko customer ke legacy systems se securely kaise jodoge?",
    answer: "Pehle systems ka map banao: kaunsa data kahan hai, kaunsi APIs hain, aur security aur compliance ke rules kya hain. Production ko seedha chhoone ke bajaye existing APIs ya replicated database se read only access lo. Access ke liye customer ka identity system use karo, taaki users wahi dekhein jo pehle se dekh sakte hain, aur secrets vault mein rakho. Agar data unke network se bahar na ja sake, to unke cloud ya on premises deploy karo, shaayad open model ke saath. Har AI action audit ke liye log karo, aur unke systems mein kuch bhi automatic likhne se pehle aise suggestions se shuru karo jinhe insaan approve kare.",
    points: ["Pehle systems, data aur constraints ka map", "Least privilege, pehle read only, existing APIs", "Customer ka SSO aur permissions; secrets management", "Data jahan rehna chahiye wahan deploy; audit logs; writes se pehle human approval"],
    check: "Enterprise ki haqeeqat, forward deployed kaam ka core."
  },
  "customer-pushback": {
    q: "Customer aisa feature maangta hai jo aapko lagta hai kaam nahi karega. Kaise sambhaaloge?",
    answer: "Pehle samjho woh kyun chahte hain; aksar request ke peeche asli zaroorat hoti hai jo doosre tarike se poori ho sakti hai. Phir apni chinta saboot ke saath batao, raay ke saath nahi: jaise \"aapke 100 documents pe test mein fully automatic approval 12% baar galat tha\". Aisa alternative do jo asli goal poora kare, jaise automatic drafts aur ek click approval. Phir bhi try karna chahein to agreed success criteria ke saath chhota, time boxed pilot propose karo, taaki data decide kare. Izzat se aur unke result pe focus rakho.",
    points: ["Asli zaroorat dhoondho", "Data use karo, behtar ho to unka data", "Goal poora karne wala alternative do", "Agreed criteria ke saath time boxed experiment"],
    check: "Bina authority ke influence; customer ke saath maturity."
  },
  "demo-fail": {
    q: "Customer ke saamne aapka AI demo fail ho gaya. Kya karoge?",
    answer: "Shaant raho aur imaandaar: \"Yeh galat jawaab hai, chaliye dikhata hoon kyun hua.\" Phir use use karo: trace kholo, dikhao kaunsa document retrieve hua aur kahan galat hua, aur samjhao evaluation set se ise kaise pakdenge aur theek karenge. Customers un logon pe zyaada bharosa karte hain jo apne system ki galtiyaan samajhte hain, bajaye unke jo dikhaate hain ki koi galti nahi hoti. Baad mein case eval set mein jodo, theek karo, aur result ke saath follow up karo. Agli baar unke asli data se rehearse karo aur ek recorded backup rakho.",
    points: ["Shaant raho, maano", "Ise control dikhaane mein badlo: trace, samjhao, fix ka plan", "Fix ke saath follow up", "Bachaav: asli data se rehearse, backup recording"],
    check: "Pressure mein sanyam aur imaandaari."
  },
  "pm-metrics": {
    q: "AI feature ke success metrics kaise define karoge?",
    answer: "Layers mein, taaki koi ek number problems na chhupaaye. Model quality: eval set pe accuracy, hallucination rate ya rubric scores. User outcome: kya madad mili? Task completion, bacha time, users AI output kitna edit karte hain. Adoption aur engagement: kitne eligible users try karte hain aur wapas aate hain. Business: revenue, per ticket cost ya retention. Saath mein guardrail metrics jo bigadne nahi chahiye, jaise complaints, latency aur per use cost. Bahut accurate feature jo koi use na kare woh bhi fail hai, aur popular feature jiska error rate zyaada ho woh risk hai.",
    points: ["Layers: model quality, user outcome, adoption, business", "Guardrails: errors, latency, cost, complaints", "Leading vs lagging metrics", "Koi metric akela nahi"],
    check: "Sabse common AI PM analytical sawaal."
  },
  "pm-when-not-ai": {
    q: "Problem solve karne ke liye AI kab use NAHI karna chahiye?",
    answer: "Jab simple rule ya normal software use reliably solve kar de, jaise PIN code ka format check karna. Jab galtiyaan bahut mehngi hon aur pakdi na ja sakein, jab tak insaan har output review na kare. Jab data na ho, ya kharab ho. Jab users ko exact, samjhaane layak decisions chahiye, jaise kuch regulated decisions. Aur jab per use cost value se zyaada ho. Main hamesha poochhta hoon: sabse simple chalne wala solution kya hai, aur kya AI ki flexibility uske error rate aur cost ke layak hai?",
    points: ["Rules kaam karte hain", "Na sehne layak ya na pakdi jaane wali galtiyaan", "Data nahi ya kharab", "Explainability ya regulation ki zaroorat", "Cost value se zyaada"],
    check: "Samajh. Sahi case mein \"AI mat use karo\" kehna strong signal hai."
  },
  "pm-define-good": {
    q: "Kaise pata chalega ki aapka AI feature launch ke layak hai?",
    answer: "Banane se pehle team ke saath \"accha\" define karta hoon: expected outputs ke saath asli examples ka set aur scoring rubric, aksar har important category ke 100 ya zyaada, asli tickets ya documents se. Launch thresholds tay karte hain, jaise common cases pe 90% sahi aur safety cases pe zero critical errors, aur current baseline, aksar insaanon, se compare karte hain. Phir asli users ke saath limited beta, layered metrics track karte hain, aur jab offline evals aur asli usage dono bar paar karein tab bada launch. Launch ke baad bhi har change pe evals chalte rehte hain.",
    points: ["Banane se pehle accha define: eval set aur rubric", "Launch thresholds, zero tolerance categories samet", "Current baseline se compare", "Asli users ke saath beta, phir bada launch; evals chalte rehte hain"],
    check: "2026 mein evals sabse high signal AI PM topic hai."
  },
  "pm-build-buy": {
    q: "Apna model banana, fine tune karna, ya GPT ya Claude jaisi API use karna, kaise decide karoge?",
    answer: "Strong provider ki API se shuru karo, kyunki yeh seekhne ka sabse tez tarika hai ki feature mein value hai ya nahi. Banane ya fine tune karne ka tab socho jab saaf wajah ho: humare volume pe cost bahut zyaada hai aur chhota tuned model quality match kar sakta hai; data humare environment se bahar nahi ja sakta; latency ki sakht zaroorat hai; ya task bahut specialised hai aur humare paas accha data hai. Total cost compare karta hoon, use maintain karne wale engineers samet, apne eval set pe quality, privacy aur vendor lock in, aur system aisa banata hoon ki model badla ja sake.",
    points: ["Value validate karne ke liye pehle API", "Banane ki wajah: scale pe cost, privacy, latency, specialisation", "Total cost aur apne evals pe quality compare", "Model badalne layak rakho"],
    check: "Business aur technical trade off ki soch."
  },
  "pm-prioritise": {
    q: "Aapke paas paanch AI feature ideas hain aur capacity ek ki. Kaise chunoge?",
    answer: "Main unhe value, feasibility aur risk pe score karta hoon. Value: kitne users, problem kitni dard bhari, aur business impact. AI ke liye feasibility: kya data hai, kya aaj ke models zaroori quality pe kaam kar sakte hain, aur kya quality naap sakte hain? Risk: galat hone pe kya hoga? Phir woh chunta hoon jiski value zyaada ho, jaldi prototype se feasibility sabit ho, aur galtiyon se nuksaan kam ho, aur decision scores ke saath samjhaata hoon taaki stakeholders conclusion ke bajaye assumptions pe sawaal karein.",
    points: ["Value, feasibility, risk", "AI specific feasibility: data, model capability, naapne layak", "Assumptions test karne ke liye jaldi prototypes", "Paardarshi reasoning"],
    check: "Structured prioritisation."
  },
  "ml-project-steps": {
    q: "Machine learning project mein shuru se aakhir tak kaunse steps follow karte ho?",
    answer: "Ek, jinhe zaroorat hai unke saath problem aur success metric samjho. Do, data ikattha karo aur explore karo: size, missing values, distributions aur saaf galtiyaan. Teen, data saaf karo aur features banao. Chaar, training, validation aur test sets mein baanto. Paanch, simple baseline train karo, phir behtar models, validation data pe compare karte hue. Chhe, final model ko test set pe ek baar evaluate karo aur uski galtiyaan dekho. Saat, deploy karo, jaise API ya Streamlit app. Aath, monitor karo aur data badle to retrain karo.",
    points: ["Pehle problem aur metric", "Data exploration aur cleaning", "Baseline, phir validation pe sudhaar", "Test ek baar, deploy, monitor"],
    check: "Kya aap poora life cycle dekhte ho, sirf model.fit() nahi?"
  },
  "eda": {
    q: "Naya dataset mila. Use kaise explore karoge?",
    answer: "Shape aur column types se shuru karta hoon, phir pehli kuch rows dekh ke samajhta hoon har column ka matlab kya hai. Phir har column ke missing values, duplicates, aur mean, median, minimum aur maximum jaise basic statistics, jo negative age jaisi namumkin values dikha dete hain. Histograms se distributions aur categories ki ginti plot karta hoon. Phir rishte dekhta hoon: har feature ka target se rishta, aur features ke beech correlations. Hairaan karne wali baatein aur data owner ke liye sawaal likh leta hoon, kyunki kai problems poochh ke hi samajh aati hain.",
    points: ["Shape, types, sample rows", "Missing values, duplicates, summary stats, outliers", "Distributions aur target se rishte", "Data owner ke liye sawaal note karo"],
    check: "Practical data samajh; freshers se aksar yeh step by step poochha jaata hai."
  },
  "f-learning": {
    q: "Aapne AI kaise seekha, aur abhi kya seekh rahe ho?",
    answer: "Concrete aur imaandaar raho. \"Maine Python aur statistics se shuru kiya, phir ek structured machine learning course kiya aur Kaggle datasets pe chhote projects banaye. Sabse bada jump end to end projects banane se aaya: loan default model jo Streamlit pe deploy kiya, aur LLM API ke saath PDF question answering app. Abhi main LLM apps ko sahi se evaluate karna seekh raha hoon, kyunki mere pehle version ne galat jawaab diye jo test set banane tak mujhe pata nahi chale.\"",
    points: ["Saaf learning path", "Sirf certificates nahi, projects", "Abhi kya seekh rahe ho aur kyun", "Jo nahi aata uske baare mein imaandaari"],
    check: "Freshers ke liye seekhne ki kshamta sabse zaroori hai."
  },
  "f-spam": {
    q: "Spam email classifier kaise banaoge?",
    answer: "Pehle poochho: spam kise kehte hain, aur kaunsi galti badtar hai? Aam taur pe asli email ko spam mein daalna badtar hai, to precision zaroori. Data: spam ya not spam label wale emails. Features: text ko numbers mein badlo, TF IDF se, plus links ki ginti ya sender ki history jaise simple signals. Model: logistic regression ya naive Bayes ka baseline, jo text pe accha chalta hai, phir zaroorat ho to fine tuned chhote language model se compare. Test set pe precision aur recall se evaluate karo, aur aisa threshold chuno jisse false positives bahut kam hon. Service ke roop mein deploy karo, users ke \"spam nahi\" corrections lo, aur regularly retrain karo kyunki spammers tarike badalte hain.",
    points: ["Kaunsi galti badtar hai yeh poochho", "Text features (TF IDF) plus extra signals", "Pehle simple baseline", "Precision focused threshold; feedback aur retraining"],
    check: "Fresher ka classic design sawaal: acchi reasoning ke saath poori, simple pipeline."
  },
  "f-notice-bot": {
    q: "Students ke sawaalon ka jawaab college notices aur PDFs se dene wala chatbot kaise banaoge?",
    answer: "Main RAG use karunga. Pehle notices aur PDFs ikattha karo, text nikaalo, kuch paragraphs ke chunks mein todo, embeddings banao aur vector database mein rakho. Student sawaal poochhe to sawaal ka embedding banao, sabse milte julte chunks dhoondho, aur LLM ko bhejo is instruction ke saath ki sirf unhi se jawaab de aur bataaye kis notice se aaya. Kuch relevant na mile to saaf bole aur office ka raasta bataaye. 30 asli student sawaalon se test karta, failures theek karta, Streamlit se deploy karta, aur feedback button jodta.",
    points: ["RAG: ingest, chunk, embed, store", "Retrieve karo aur citations ke saath jawaab", "Jawaab na ho to \"pata nahi\"", "Test set, deployment, feedback"],
    check: "Kya fresher realistic GenAI project end to end design kar sakta hai?"
  },
  "design-rag": {
    q: "Ek chatbot design karo jo 50,000 internal documents se employees ke sawaalon ke jawaab de.",
    answer: "Pehle clarify: users kaun hain, kaunse document types, kitni baar badalte hain, zaroori latency, aur kaun kya dekh sakta hai. Ingestion: har source ke connectors, text extraction, structure ke hisaab se chunking, embeddings, aur metadata aur permissions ke saath vector store. Query: baatcheet ka hissa ho to sawaal rewrite karo, user ki permissions se filter kiya hybrid search, rerank, aur top chunks LLM ko is instruction ke saath ki cite kare aur na pata ho to bataaye. Quality: asli employee sawaalon ka eval set, retrieval recall aur answer faithfulness naapo. Operations: logging, feedback buttons, cost aur latency monitoring, aur documents badlein to incremental reindexing.",
    points: ["Pehle clarifying sawaal", "Ingestion: connectors, chunking, embeddings, metadata, permissions", "Query: rewrite, hybrid search, permission filter, rerank, citations ke saath grounded jawaab", "Evals, feedback, monitoring, index freshness"],
    check: "Sabse common LLM system design sawaal."
  },
  "design-support-agent": {
    q: "Ek AI agent design karo jo customer support sambhaale, refunds samet.",
    answer: "Scope clarify karo: kaunsi requests, kaunse systems, refund limits, bhashaayein. Architecture: agent ko order dhoondhna, refund policy check karna, refund banana aur insaan ko handoff jaise tools milte hain, har ek validated parameters aur least privilege ke saath. Policy code mein enforce hoti hai, sirf prompt mein nahi: jaise ₹2,000 se upar ya policy se bahar refunds hamesha human approval maangte hain. Help articles pe RAG se jawaab ground karo. Prompt injection ke khilaaf guardrails, aur account ke kisi action se pehle identity verification. Sandbox mein asli recorded conversations se evaluate karo: sahi resolution, galat actions, escalation rate aur per conversation cost. Pehle ek category ke liye launch, insaan sample review karein.",
    points: ["Scope aur limits clarify", "Least privilege tools; policy code mein", "Risky actions ke liye human approval; identity checks", "Sandbox evals; phased launch; metrics"],
    check: "Safety ke saath agent design; FDE aur agent roles mein popular."
  },
  "design-recsys": {
    q: "2 million products wali e commerce site ke liye recommendation system design karo.",
    answer: "Clarify: recommendations kahan dikhengi, goal (clicks, purchases), latency budget aur available data. Do stages. Candidate generation: 2 million products ko jaldi kuch sau tak laao, collaborative filtering ya two tower embeddings plus category mein popular jaise simple sources se. Ranking: zyaada detailed model, jaise gradient boosting ya neural ranker, user, product aur context features se candidates score karta hai, phir business rules stock aur variety sambhaalte hain. Cold start: naye users ko popular aur contextual items; naye products ke liye category aur text embeddings jaise content features. Offline recall aur NDCG se evaluate, phir purchases pe online A/B test. Precomputed embeddings aur fresh features ke liye feature store se serve.",
    points: ["Goal aur latency clarify", "Do stage: candidate generation, phir ranking", "Users aur items ka cold start", "Offline metrics, phir A/B test; feature store ke saath serving"],
    check: "Classic ML system design."
  },
  "design-fraud": {
    q: "150 ms latency budget wala real time fraud detection system design karo.",
    answer: "Clarify karo miss hue fraud aur galat decline ki keemat kya hai, aur review team kitna sambhaal sakti hai. Features: stream se nikle real time features jaise is card se pichhle 10 minute mein kitni transactions, plus feature store se historical features; latency ke liye kuch features ka thoda purana hona maan lo. Model: gradient boosting, tabular data pe tez aur mazboot, business trade off ke hisaab se threshold, aur beech ki band manual review ko. Serving: kam latency service, features memory ya Redis mein cached, aur model slow ho to fallback rule. Labels chargebacks se der se aate hain, to drift monitor karo aur regularly retrain karo, aur bilkul naye fraud patterns ke liye rules rakho.",
    points: ["Har galti ki keemat clarify", "Streaming plus stored features; staleness trade off", "Tez model, review band ke saath threshold", "Fallback ke saath low latency serving; der se labels, drift, retraining"],
    check: "Latency, features aur business trade offs ek saath."
  },
  "design-llm-serving": {
    q: "1,000 requests per second pe LLM serve karne wala platform design karo.",
    answer: "Model size, prompt aur output length, aur latency targets clarify karo, khaaskar time to first token. Requests ek gateway se jaati hain jisme authentication, har customer ki rate limits aur routing ho. Uske peeche GPU servers ka pool jo vLLM jaisa inference engine continuous batching aur paged KV cache ke saath chalata hai, queue depth pe autoscale. Repeat prompts ke liye prefix aur response cache, aur simple requests chhote model pe. Har GPU ke tokens per second se capacity estimate karo, peak ke liye headroom rakho, aur zones mein faila do. Time to first token, tokens per second, queue time, errors aur per thousand tokens cost monitor karo, aur naye model versions canaries se rollout.",
    points: ["Sizes aur latency targets clarify", "Gateway: auth, rate limits, routing", "Batching wala inference engine, queue pe autoscaling", "Caching, model routing, capacity planning, monitoring, canaries"],
    check: "LLM infrastructure system design."
  },
  "design-pipeline": {
    q: "Daily sales analytics aur ML demand forecast ko data dene wali pipeline design karo.",
    answer: "Sources: change data capture se order database, product catalogue aur store data. Raw data date se partition karke lake ya warehouse mein lao. dbt se saaf staging tables mein transform, phir orders fact table aur product, store aur date dimensions wala star schema. ML team same models se bani feature table padhti hai, taaki analytics aur ML ek baat bolein. Airflow se orchestrate, har task date se idempotent, layers ke beech data quality tests, aur data der se ya galat ho to alerts. Backfills bas date partitions ke reruns. Lineage aur owners document karo taaki log jaanein numbers kahan se aate hain.",
    points: ["Sources aur ingestion (CDC)", "Raw → staging → modelled layers (star schema)", "ML ke liye shared feature tables", "Orchestration, idempotency, quality tests, backfills, lineage"],
    check: "End to end data architecture."
  },
  "fd-decomposition": {
    q: "Ek logistics company missed deliveries kam karna chahti hai. Kaise approach karoge?",
    answer: "Solve karne se pehle clarify: missed delivery kise kehte hain, kitni hoti hain, kitne ki padti hain, aur kaunsa data hai, jaise GPS, delivery attempts, addresses aur customer contacts? Problem ko wajahon mein todo: galat addresses, customer ghar pe nahi, routing aur time windows, aur capacity. Har ek ka asar unke data se naapo, phir sabse tez jeet propose karo. Jaise order ke time addresses saaf aur verify karne ke liye LLM plus geocoding, aur no show predict karne wala model jo ek din pehle confirmation message bheje. Metric tay karo, ek shehar mein control group ke saath pilot, phir scale. Poore waqt dekho ki operations staff asal mein kya use karega.",
    points: ["Definitions, scale, cost aur data clarify", "Root causes mein todo; data se har ek naapo", "Tez, high impact interventions chuno (AI aur non AI)", "Control group ke saath pilot; metric; scale up"],
    check: "FDE roles ka main filter round decomposition case hai."
  },
  "pm-design-feature": {
    q: "Hospital doctors ko discharge summaries likhne mein madad karne wala AI feature design karo.",
    answer: "Users: busy doctors; goal: tez aur sahi summaries. Dard: likhne mein 20 se 30 minute lagte hain, notes, labs aur medication lists se copy karke. Solution: AI patient record se summary ka draft banata hai, har baat uske source se judi, aur doctor review, edit aur sign karta hai. Kabhi auto send nahi. Risks: galat medicines ya chhooti allergies, to medication lists ke liye code checks aur unsure cheezein highlight. Privacy: patient data hospital ke approved environment mein. Metrics: signed summary tak ka time, draft aur final ke beech edit distance, review mein pakde critical errors, aur har ward mein doctors ka adoption. Pehle ek ward mein doctors ke feedback ke saath launch.",
    points: ["User, dard aur current workflow", "Sources ke saath draft; insaan sign off kare", "Risk controls aur privacy", "Layered metrics; phased launch"],
    check: "Asli daav wale AI ke liye product sense."
  },
  "pm-tutor-useless": {
    q: "Humne AI tutor launch kiya. 10% se kam users ko pasand hai, zyaadatar ko bekaar lagta hai. Kya karoge?",
    answer: "Pehle batwaara samjho. Woh 10% kaun hain: kaunsi class, subject ya use case? Aur baaki ke liye \"bekaar\" ka matlab kya: galat jawaab, bahut generic, bahut slow, ya jo chahiye tha woh nahi? Main asli conversations padhunga, dekhunga users kahan chhodte hain, aur dono groups se baat karunga. Agar 10% ka ek saaf use case hai, jaise maths ki exam revision, to wahan double down: us case ki quality evals se sudhaaro, aur onboarding badlo taaki naye users usi se shuru karein. Baaki ke liye top failure wajahein theek karo ya jin segments mein fit nahi wahan feature dikhaana band karo.",
    points: ["Pasand karne wale vs baaki ko alag karo", "Conversations, funnels, interviews se diagnose", "Jo use case chal raha hai uspe double down", "Top failures theek karo ya audience chhoti karo"],
    check: "Ulajhe AI launch pe analytical product soch."
  },
  "pe-feature-design": {
    q: "Team chat app ke liye AI \"is thread ka summary do\" feature design karo.",
    answer: "Clarify: thread kitna lamba, bhashaayein, latency target aur privacy rules. Flow: user summarise dabaaye to backend woh messages laaye jo user dekh sakta hai, bahut lambe threads ko kaate ya chunks banaaye, aur LLM ko prompt bheje jo decisions, khule sawaal aur owners ke saath action items structured format mein maange. Result \"draft\" label aur source messages ke links ke saath UI mein stream karo. Summaries cache karo aur naye messages aane pe incremental update. Asli threads ke set se evaluate karo, chhoote decisions aur gadhe hue facts ke liye score. Usage, thumbs down aur per summary cost track karo.",
    points: ["Constraints clarify", "Permission ke hisaab se messages, lambe threads ki chunking", "Structured prompt; source links ke saath streaming UI", "Caching, evals, metrics"],
    check: "Full stack AI feature design."
  },
  "pe-latency-debug": {
    q: "Kal se aapke AI feature ka response time double ho gaya. Kaise investigate karoge?",
    answer: "Check karo kya badla: deploys, prompt changes, model version change, ya provider ka status issue. Phir traces se dhoondho kaunsa step slow hua: retrieval, LLM call, tool call ya humara code. Agar LLM call hai, to dekho prompts ya outputs lambe hue ya nahi, jaise bada retrieved context ya aisa prompt change jo jawaab lambe karta hai, ya provider ki latency badhi. Agar humara hai, to database queries, cache hit rate aur traffic volume dekho. Wajah theek karo, zaroorat ho to rollback, aur har step pe latency alert jodo taaki agli baar jaldi pakde.",
    points: ["Kya badla? deploys, prompts, models, provider", "Har step ke traces se jagah dhoondho", "Token count badalna common wajah", "Theek ya rollback; har step pe alerts"],
    check: "AI systems ki systematic debugging."
  },
  "b-project": {
    q: "Apne kisi project ke baare mein batao jispe aapko garv hai.",
    answer: "STAR use karo aur apne decisions pe gehraai se jao. \"Situation: humari support team baar baar ke sawaalon se pareshaan thi. Task: main help docs se jawaab dene wala assistant banana chahta tha. Action: maine RAG pipeline banayi, par pehla version sirf 60% test sawaal sahi kar raha tha. Maine 80 asli sawaalon ka evaluation set banaya, dekha ki zyaadatar failures tables ke beech se katne se the, structure ke hisaab se chunking pe gaya aur reranking jodi. Result: sahi jawaab 86% tak pahunche, aur pilot mein lagbhag ek chauthai tickets bina agent ke solve hue.\" Har step pe \"yeh kyun chuna?\" ke liye ready raho.",
    points: ["STAR structure", "Aapke apne decisions aur trade offs", "Ek problem jo aayi aur kaise solve ki", "Naapne layak result; alag kya karte"],
    check: "Ownership, gehraai aur imaandaari. Zyaadatar interviews yahan 10 se 20 minute lagaate hain."
  },
  "b-failure": {
    q: "Aisa samay batao jab aapka banaya kuch fail hua.",
    answer: "Seekh wali asli failure chuno, nakli nahi. \"Maine ek classification model ship kiya jo offline 92% accuracy ke saath badhiya dikha, par do hafte mein users ne complain kiya. Maine data randomly split kiya tha, aur same customers training aur test dono mein the, to score zyaada optimistic tha. Maine manager ke saath zimmedaari li, customer se dobara split kiya, realistic 81% mila, aur features sudhaar ke 86% tak pahuncha. Tab se split se pehle hamesha poochhta hoon data kaise grouped hai, aur evaluation setup ka review apni checklist mein jod liya.\"",
    points: ["Asli failure jisme aap zimmedaar the", "Turant kya kiya", "Imaandaari se root cause", "Kaam karne ke tarike mein tikaau badlaav"],
    check: "Ownership aur seekhna. Doosron pe dosh daalna red flag hai."
  },
  "b-conflict": {
    q: "Kisi teammate ya stakeholder ke saath asehmati ke baare mein batao.",
    answer: "Dikhao ki aap data aur izzat ke saath asehmat hote ho. \"Ek product manager humara AI reply feature saare customers ke liye launch karna chahte the. Mujhe chinta thi kyunki humare tests mein woh kabhi kabhi refund policies gadh deta tha. Seedha na kehne ke bajaye maine paanch asli examples aur eval set ka error rate dikhaya, aur agent approval ke saath 10% tickets pe launch propose kiya. Humne badhaane ke criteria pe sehmati banayi. Do hafte baad error rate threshold se neeche tha aur humne badhaaya. Rishta accha raha kyunki humne common goal pe focus kiya.\"",
    points: ["Situation aur dono nazariye imaandaari se", "Authority nahi, saboot use kiya", "Samjhauta ya experiment", "Result aur baad ka rishta"],
    check: "Collaboration aur influence."
  },
  "b-explain": {
    q: "Koi technical concept aise samjhao jaise main technical nahi hoon.",
    answer: "Apne kaam se kuch chuno aur rozmarra ki misaal do. Jaise RAG samjhaana: \"Socho ek bahut smart naya employee jisne bahut padha hai par humari company ke baare mein kuch nahi jaanta. Policy ka sawaal poochho to woh confidently guess kar sakta hai. RAG aisa hai jaise jawaab se pehle use humari policy manual ke sahi pages de dena, aur page dikhane ko kehna. To jawaab humare asli documents pe based hote hain, aur aap check kar sakte ho.\" Phir samajh check karo: \"Kya yeh samajh aaya?\"",
    points: ["Rozmarra ki misaal", "Jargon nahi, ya samjhaaya hua", "Sunne wale ke liye kyun zaroori", "Samajh check karo"],
    check: "Communication, FDE, PM aur senior roles ke liye zaroori."
  },
  "b-ambiguity": {
    q: "Aisa samay batao jab aapne unclear problem pe kaam kiya.",
    answer: "\"Mere manager ne kaha 'onboarding sudhaarne ke liye AI use karo'. Yeh vague tha, to maine pehle paanch naye joiners aur do HR logon se baat ki aur sabse bada dard dhoondha: naye joiners pehle mahine mein Slack pe wahi 40 sawaal poochhte the. Maine ek goal ke saath ek page ka proposal likha, un sawaalon ko aadha karna, aur do hafte mein simple FAQ assistant banaya. Ek mahine baad repeat sawaal lagbhag 45% kam hue. Maine seekha ki kuch banane se pehle vague request ko ek naapne layak problem mein badlo.\"",
    points: ["Problem kaise clarify ki (log, data)", "Naapne layak goal mein badla", "Chhote se shuru, iterate kiya", "Result aur seekh"],
    check: "Ambiguity mein aaraam, FDE aur PM roles ke liye critical."
  },
  "b-keep-up": {
    q: "AI ke tez badlaavon ke saath kaise up to date rehte ho?",
    answer: "Specific raho aur dikhao ki shor chhaante ho. \"Main sab kuch nahi, kuch high quality sources follow karta hoon: main model providers ke release notes, do newsletters, aur kuch important aaye to papers. Par zyaadatar banake seekhta hoon: kuch naya aaye, jaise naya tool calling feature, to ek hafte mein chhote project pe try karta hoon aur kya chala uska chhota note likhta hoon. Models upgrade karte waqt apne evals mein kya badla woh bhi dekhta hoon, jo headlines padhne se zyaada sikhata hai.\"",
    points: ["Specific sources, \"sab kuch\" nahi", "Banake seekhna", "Haal ka example", "Hype ko zaroori cheez se alag karna"],
    check: "Tez field mein seekhne ki aadatein."
  },
  "b-ai-tools": {
    q: "Kaam mein AI coding assistants kaise use karte ho, aur kaise pakka karte ho ki code sahi hai?",
    answer: "Imaandaar aur zimmedaar raho. \"Main roz AI assistants boilerplate, tests, anjaan libraries aur code samajhne ke liye use karta hoon. Par output ko naye colleague ke code ki tarah treat karta hoon: accept karne se pehle har line padhta hoon, pakka karta hoon ki tests hain, authentication aur SQL jaise security wale hisse khud check karta hoon, aur secrets ya confidential data kabhi un tools mein paste nahi karta jo approved nahi. Isse main tez hota hoon, par jo ship karta hoon uski zimmedaari meri hai.\"",
    points: ["Sabse zyaada madad kahan milti hai", "Review, tests aur verification", "Security aur confidentiality", "Zimmedaari aapki rehti hai"],
    check: "2026 ke zyaadatar engineering loops mein: productive aur zimmedaar."
  },
  "ask-them": {
    q: "Kya aapke humse koi sawaal hain?",
    answer: "Hamesha haan bolo aur do teen asli sawaal poochho. Acche sawaal: \"Pehle 6 mahine mein is role mein success kaisa dikhega?\", \"Team abhi AI ke saath sabse badi chunauti kya face kar rahi hai?\", \"Ship karne se pehle model ya feature quality kaise evaluate karte ho?\", \"Team ka kitna time naye features aur kitna maintenance mein jaata hai?\", aur \"Yahan acche se karne wale logon mein common kya hai?\". Technical round mein leave ya salary mat poochho, aur website pe likhi baatein mat poochho.",
    points: ["2 ya 3 soche samjhe sawaal poochho", "Success, chunautiyon, kaam ke tarike ke baare mein", "Quality aur impact mein dilchaspi dikhao", "Basic ya sirf apne baare ke sawaal se bacho"],
    check: "Utsukta aur seriousness. \"Koi sawaal nahi\" bhaari pad sakta hai."
  },
  "salary": {
    q: "Aapki salary expectations kya hain?",
    answer: "Pehle research karo, Glassdoor, AmbitionBox, levels.fyi aur aise roles wale logon se, phir range do jo role pe based ho, current pay pe nahi. \"Is role aur level ke liye Bangalore mein meri research aur experience ke hisaab se main ₹22 se ₹28 lakh fixed dekh raha hoon. Overall package ke hisaab se flexible hoon, aur sabse zyaada role mein dilchaspi hai.\" Agar current salary pe zor dein to bata sakte ho, par baat naye role ki market range pe wapas laao. Turant accept ya reject mat karo; offer likhit mein maango.",
    points: ["Naye role ki market ranges research karo", "Current pay nahi, role pe based range do", "Overall package pe flexibility batao", "Decide karne se pehle offer likhit mein lo"],
    check: "Confidence aur taiyaari. Shaant, researched range aapka offer bachaati hai."
  }
});

if (typeof module !== "undefined" && module.exports) module.exports = { INTERVIEW_PREP_HI };
