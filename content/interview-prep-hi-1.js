// Hinglish version of the interview prep guide, part 1: opening and fundamentals.
// Keyed by question id from content/interview-prep.js; `points` match the English points one to one.
// The Learn section shows these when Hinglish is selected, with the English answer one tap away,
// because the interview itself happens in English.
var INTERVIEW_PREP_HI = Object.assign(typeof INTERVIEW_PREP_HI !== "undefined" ? INTERVIEW_PREP_HI : {}, {
  "tell-me": {
    q: "Apne baare mein batao.",
    answer: "Present, past, future ka formula use karo, 60 se 90 second mein. Present: \"Main ek Java backend developer hoon, fintech company mein 4 saal se payment APIs banata hoon.\" Past: \"Pichhle ek saal mein main AI ki taraf badha. Maine RAG aur evaluation set ke saath document question answering app banaya, aur kaam pe LLM se support tickets classify kiye, jisse manual triage lagbhag 30% kam hua.\" Future: \"Ab main full time AI engineer banna chahta hoon, aur yeh role isliye fit hai kyunki aap asli backend systems ke upar LLM features banate ho, jahan meri strengths milti hain.\"",
    points: ["Present: abhi ka role aur ek concrete kaam", "Past: 1 ya 2 experiences jo is role tak laate hain, number ke saath", "Future: yeh role aur company agla logical step kyun hai", "2 minute se kam rakho; poora resume mat sunao"],
    check: "Kya aap apne baare mein saaf, relevant kahani bata sakte ho? Yeh communication ka test bhi hai: detail se zyaada structure aur confidence matter karte hain."
  },
  "why-ai": {
    q: "Aap AI mein kyun aana chahte ho, aur yahi role kyun?",
    answer: "Asli wajah do aur use saboot se jodo. \"Testing ke kaam mein main baar baar ek hi problem dekhta tha: hazaaron test cases haath se likhe aur check kiye jaate the. Jab maine LLM se test cases draft karwaaye to ghante bache, par usne galtiyaan bhi ki jo mujhe pakadni padi. Wahin se mujhe reliable AI systems banane mein interest aaya. Tab se maine RAG aur evaluation pe projects kiye hain. Main is role ke liye apply kar raha hoon kyunki isme users tak AI features pahunchaana hai, aur mera quality aur testing ka background AI output evaluate karne mein seedha kaam aata hai.\"",
    points: ["Ek specific moment ya problem jisse interest jaaga (\"AI future hai\" nahi)", "Saboot ki aapne kuch kiya: courses poore kiye, projects banaye", "Aapka purana experience is role mein kaise kaam aata hai", "Sirf AI nahi, yahi role kyun"],
    check: "Kya aapka interest sachcha hai aur action se backed hai? Interviewers ko dar hota hai ki hype ke peeche bhaagne wale jaldi interest kho dete hain."
  },
  "why-company": {
    q: "Aap yahan kaam kyun karna chahte ho?",
    answer: "Dikhao ki homework kiya hai. Unke product ki ek baat, unke kaam karne ke tarike ki ek baat, aur dono ko apne se jodo. \"Maine aapka app expense reports ke liye use kiya hai, aur notice kiya ki receipt scanning haal mein kaafi behtar hui, to maine aapka engineering blog padha. Mujhe pasand aaya ki aapki team batati hai models ko kaise evaluate karti hai, kyunki mujhe AI quality naapne mein dilchaspi hai. Aur aap India mein small businesses ko serve karte ho, to us market ke liye mera experience pehle din se kaam aayega.\"",
    points: ["Unke product ya users ki koi specific baat", "Unki team, values ya engineering approach ki koi baat", "Aap fit kyun ho: apne skills se seedha link", "Aise jawaab nahi jo har company pe fit ho (\"great culture\", \"bada brand\")"],
    check: "Kya aapne company ke baare mein research ki hai, aur kya aap tikoge?"
  },
  "no-ai-title": {
    q: "Aapke paas abhi AI ka job title nahi hai. Hum aapko kisi aise insaan ke bajaye kyun lein jiske paas hai?",
    answer: "Defensive mat bano. Gap ko strength mein badlo. \"Sahi sawaal hai. Main production experience laata hoon: 5 saal asli systems ship aur support kiye, incidents sambhaale, stakeholders ke saath kaam kiya. Bahut saare AI projects demo ke baad isi stage pe fail hote hain. AI ki taraf, maine evaluation ke saath do end to end projects banaye hain jo main aapko dikha sakta hoon. To aapko aisa insaan milega jo jaldi seekhta hai aur pehle se jaanta hai software ko production mein kaise chalate hain.\"",
    points: ["Ek sentence mein shaanti se maano", "Transferable strengths batao (production, domain, communication)", "AI skills ka saboot do: projects, results, code", "Kya kami hai nahi, kya deliver karoge uspe khatam karo"],
    check: "Weakness ke mushkil sawaal ko kaise sambhaalte ho? Shaant, imaandaar aur saboot wala jawaab defensive se behtar hai."
  },
  "ai-ml-dl": {
    q: "AI, machine learning, deep learning aur generative AI mein kya fark hai?",
    answer: "Yeh ek ke andar ek circles hain. AI bada goal hai: computers se aise kaam karwana jo samajhdaar lagein. Machine learning uska ek tarika hai: rules likhne ke bajaye computer examples se patterns seekhta hai. Deep learning machine learning hai jisme kai layers wale neural networks hote hain, jo images, audio aur text ke liye accha kaam karta hai. Generative AI deep learning models, jaise LLMs, use karke naya content banata hai, jaise text, images ya code, sirf label predict nahi karta.",
    points: ["AI ⊃ ML ⊃ deep learning; GenAI deep learning ki ek application hai", "ML haath se likhe rules ke bajaye data se seekhta hai", "Har ek ka ek example (spam filter, image pehchaanna, ChatGPT)"],
    check: "Kya aap basics bina jargon ke samjha sakte ho? Freshers aur PMs ke liye aksar yahi pehla technical sawaal hota hai."
  },
  "sup-unsup": {
    q: "Supervised, unsupervised aur reinforcement learning samjhao, har ek ke example ke saath.",
    answer: "Supervised learning un examples se seekhta hai jinke saath sahi jawaab (labels) hota hai. Jaise emails jinpe spam ya not spam likha hai, to model spam predict karna seekhta hai. Unsupervised mein labels nahi hote; model khud structure dhoondhta hai, jaise customers ko behaviour ke hisaab se groups mein baantna. Reinforcement learning trial and error aur rewards se seekhta hai, jaise game khelne wala agent ya robot jise kaam acche se karne pe reward milta hai. LLMs bhi jawaab behtar banane ke liye human feedback se reinforcement learning use karte hain.",
    points: ["Supervised = labelled data, ek known target predict karta hai", "Unsupervised = labels nahi, groups ya patterns dhoondhta hai", "Reinforcement = actions, rewards, trial and error se seekhna", "Har ek ka asli example"],
    check: "Basic vocabulary, aur kya aap turant examples de sakte ho."
  },
  "overfitting": {
    q: "Overfitting kya hai, aur ise kaise rokte ho?",
    answer: "Overfitting tab hota hai jab model training data ko, uske noise samet, ratt leta hai. Training data pe bahut accha score karta hai par naye data pe kharab. Jaise student jo pichhle saal ke answers ratt leta hai par naya sawaal solve nahi kar paata. Pehchaan: training accuracy bahut zyaada aur validation accuracy kaafi kam. Rokne ke tarike: zyaada data, simple model, regularisation, cross validation, early stopping, aur neural networks mein dropout.",
    points: ["Definition: training data pe accha, naye data pe kharab", "Kaise pakdein: train aur validation scores compare karo", "Kam se kam teen fixes: zyaada data, simple model, regularisation, early stopping, dropout", "Ulta underfitting bhi batao"],
    check: "Sabse zyaada poochha jaane wala ML concept. Woh sirf definition nahi, pakadne ka tarika bhi sunna chahte hain."
  },
  "bias-variance": {
    q: "Bias variance trade off kya hai?",
    answer: "Bias woh error hai jo bahut simple model se aata hai, jo asli patterns miss kar deta hai. Yeh underfitting hai. Variance woh error hai jo aise model se aata hai jo training data pe bahut sensitive ho, data thoda badla to model bahut badal jaata hai. Yeh overfitting hai. Model complex karne se aam taur pe bias kam aur variance zyaada hota hai. Goal woh sweet spot hai jahan naye data pe total error sabse kam ho, jo validation data se milta hai. Jaise curved data pe seedhi line high bias hai; bahut gehra decision tree high variance.",
    points: ["Bias = bahut simple, underfit", "Variance = bahut sensitive, overfit", "Complexity ek ko doosre se badalti hai; validation error se chuno", "Har ek ka example"],
    check: "Kya aap samajhte ho models kyun fail hote hain, sirf train karna nahi."
  },
  "train-val-test": {
    q: "Data ko training, validation aur test sets mein kyun baantte hain?",
    answer: "Training set se model seekhta hai. Validation set banate waqt use hota hai, models compare karne aur depth ya learning rate jaisi settings tune karne ke liye. Test set aakhir tak band rakha jaata hai taaki pata chale model naye data pe asal mein kaisa karega. Agar test set pe tune karoge, to dheere dheere usi pe overfit ho jaoge aur final number zyaada optimistic hoga. Time wale data mein time se split karo: past pe train, future pe test.",
    points: ["Train = seekhna, validation = chunna aur tune karna, test = aakhri imaandaar check", "Test set pe kabhi tune mat karo", "Time series mein time se split; leakage se bachne ke liye user ya group se split"],
    check: "Experiment discipline. Kai candidates validation set ka role bhool jaate hain."
  },
  "leakage": {
    q: "Data leakage kya hai? Example do.",
    answer: "Leakage tab hota hai jab aisi information training mein aa jaati hai jo prediction ke time available nahi hogi, to model testing mein badhiya dikhta hai aur production mein fail hota hai. Classic example: customer cancel karega ya nahi, predict karte hue \"refund issued\" jaisa feature daalna, jo cancel hone ke baad hi hota hai. Doosra: split se pehle poore data ke statistics se features scale karna, jisse test set training ko influence karta hai. Bachne ke liye har feature pe poochho: prediction ke moment pe kya yeh value mujhe pata hogi? Aur saari preprocessing training split ke andar karo.",
    points: ["Definition: future ya target ki information training features mein", "Concrete example (outcome ke baad wala feature, split se pehle preprocessing, splits mein duplicate rows)", "Lakshan: shaq hone layak high scores", "Bachaav: point in time features, sirf train pe fit hui pipelines"],
    check: "Experienced ML candidates ka favourite, kyunki yeh asli kaam ka anubhav dikhata hai."
  },
  "precision-recall": {
    q: "Precision aur recall samjhao. Kab ek ko doosre se zyaada chunoge?",
    answer: "Precision: model ne jitne positive flag kiye, unme se kitne sach mein positive the. Recall: saare asli positives mein se model ne kitne pakde. Cancer screening ya fraud detection mein asli case miss karna bahut mehenga hai, to high recall chahiye, chahe kuch false alarms aayein. Spam filter mein asli email ko spam mein daalna bura hai, to high precision chahiye. Ek number chahiye to F1 dono ko jodta hai, aur decision threshold badal kar dono ke beech balance badal sakte ho.",
    points: ["Precision = positive predictions kitne sahi", "Recall = asli positives kitne cover hue", "Kaunsi galti mehengi hai uske hisaab se chuno, example ke saath", "Threshold trade off control karta hai; F1 dono ko balance karta hai"],
    check: "Kya aap metric ko business ki keemat se jod sakte ho."
  },
  "accuracy-trap": {
    q: "Aapka model 99% accurate hai, par business kehta hai bekaar hai. Yeh kaise ho sakta hai?",
    answer: "Shaayad classes imbalanced hain. Agar sirf 1% transactions fraud hain, to jo model hamesha \"fraud nahi\" bole woh 99% accurate hai aur ek bhi fraud nahi pakadta. Accuracy yeh chhupa deti hai. Main confusion matrix, rare class ka precision aur recall, aur PR AUC dekhunga. Phir business goal check karunga: shaayad unhe 80% fraud pakadna hai aur false alarms itne kam rakhne hain ki review team sambhaal sake, aur main threshold usi hisaab se tune karunga.",
    points: ["Class imbalance accuracy ko misleading banata hai", "Confusion matrix, precision, recall, PR AUC use karo", "Metric ko business goal aur team capacity se jodo", "Fixes: threshold tuning, class weights, resampling"],
    check: "Kya aap headline number se aage soch sakte ho? 2026 ke interviews mein bahut common."
  },
  "regularisation": {
    q: "Regularisation kya hai? L1 aur L2 mein kya fark hai?",
    answer: "Regularisation loss mein bade weights ke liye penalty jodta hai, jisse model simple rehta hai aur overfitting kam hoti hai. L2 (ridge) weights ke square pe penalty lagata hai, to saare weights dheere dheere zero ki taraf chhote hote hain par exactly zero kam hi hote hain. L1 (lasso) absolute value pe penalty lagata hai, jo kuch weights ko bilkul zero kar deta hai, to yeh feature selection bhi karta hai. Neural networks mein dropout aur weight decay bhi use hote hain, jo practice mein L2 jaisa hai.",
    points: ["Loss mein weight size ki penalty", "L2 smoothly chhota karta hai; L1 kuch weights ko exactly zero karta hai", "Strength ek hyperparameter hai jo validation data pe tune hota hai"],
    check: "Standard ML theory; follow up aa sakta hai ki L1 zeros kyun banata hai."
  },
  "trees-boosting": {
    q: "Random forest aur gradient boosting mein kya fark hai?",
    answer: "Dono bahut saare decision trees jodte hain. Random forest bahut saare gehre trees alag alag, rows aur features ke random samples pe train karta hai, phir unke votes ka average leta hai. Isse variance kam hota hai aur yeh mushkil se tootta hai. Gradient boosting chhote trees ek ke baad ek train karta hai, har naya tree pichhlon ki galtiyaan theek karta hai. Boosting, jaise XGBoost ya LightGBM, aam taur pe tabular data pe sabse acchi accuracy deta hai par dhyaan se tuning chahiye, aur zyaada trees se overfit ho sakta hai.",
    points: ["Forest = parallel trees, average, variance kam", "Boosting = ek ke baad ek trees jo galtiyaan sudhaarte hain, bias kam", "Tables ke liye boosting aksar sabse mazboot; forest robust default"],
    check: "Tabular data ka practical knowledge, jo aaj bhi zyaadatar industry ML hai."
  },
  "gradient-descent": {
    q: "Gradient descent simple shabdon mein samjhao. Learning rate kya karta hai?",
    answer: "Socho aap kohre mein pahaad pe ho aur neeche jaana hai. Aap mehsoos karte ho zameen kis taraf dhalaan hai aur us taraf ek kadam lete ho, baar baar. Gradient descent model ke error ke saath yahi karta hai: gradient batata hai kis direction mein error badhta hai, to hum weights ko ulti direction mein chhota kadam dete hain. Learning rate kadam ka size hai. Bahut bada to aage nikal jaoge aur uchhaloge; bahut chhota to training bahut slow. Practice mein mini batches aur Adam jaise optimisers use hote hain.",
    points: ["Loss = model kitna galat hai; gradient = sabse tez badhne ki direction", "Weights ko gradient ke ulta update karo", "Learning rate = kadam ka size, bahut bada ya bahut chhota hone ka risk", "Mini batch SGD ya Adam ka zikr"],
    check: "Kya aap samajhte ho models asal mein kaise seekhte hain?"
  },
  "llm-how": {
    q: "LLM text kaise generate karta hai?",
    answer: "LLM ek neural network, transformer, hai jo bahut saare text pe agla token predict karne ke liye train hua hai. Token ek shabd ya shabd ka tukda hai. Jab aap prompt bhejte ho, woh tokens mein toota jaata hai, model har mumkin agle token ki probability nikaalta hai, ek chunta hai, text mein jodta hai, aur khatam hone tak yahi repeat karta hai. Temperature jaisi settings tay karti hain chunaav kitna random ho. Kyunki yeh facts dekhne ke bajaye sahi lagne wala text predict karta hai, yeh confidently galat jawaab bhi de sakta hai, jise hallucination kehte hain.",
    points: ["Agla token predict karne ke liye trained", "Loop mein ek ek token generate karta hai", "Temperature randomness control karta hai", "Hallucination kyun hoti hai yeh samjhata hai"],
    check: "Basic GenAI samajh, jo ab lagbhag har role mein poochi jaati hai."
  },
  "tokens-context": {
    q: "Tokens aur context window kya hain, aur product mein kyun matter karte hain?",
    answer: "Tokens text ke woh tukde hain jo model padhta aur likhta hai; English mein ek token lagbhag teen chauthai shabd hai. Context window woh maximum tokens hain jo model ek saath sambhaal sakta hai, jisme prompt, documents, chat history aur jawaab sab shaamil hain. Teen wajah se matter karte hain: cost, kyunki APIs per token charge karti hain; latency, kyunki zyaada tokens mein zyaada time; aur quality, kyunki documents fit na hon to chunna padta hai kya daalein, isiliye retrieval use karte hain.",
    points: ["Token ≈ shabd ka hissa; pricing aur limits tokens mein", "Context window mein input aur output dono", "Cost, speed aur model kya dekh sakta hai, sab pe asar"],
    check: "Kya aap cost aur limits ke baare mein soch sakte ho, sirf API call nahi?"
  },
  "temperature": {
    q: "Temperature aur top p kya control karte hain? Data extraction ke liye kya use karoge?",
    answer: "Dono agla token chunte waqt randomness control karte hain. Temperature probabilities ko badalta hai: kam temperature pe model sabse likely tokens chunta hai, to zyaada consistent; zyaada temperature pe zyaada creative aur alag. Top p choices ko sabse chhote token set tak seemit karta hai jinki probability milkar p ho. Extraction ya classification ke liye main temperature 0 ya uske paas, aur fixed output format rakhunga, kyunki same input pe same, sahi output chahiye. Brainstorming ke liye badhaunga.",
    points: ["Dono token chunne ki randomness control karte hain", "Kam = consistent, zyaada = creative", "Extraction: temperature 0 ke paas aur structured output"],
    check: "Practical prompting samajh."
  },
  "embeddings": {
    q: "Embeddings kya hain, aur kis kaam aate hain?",
    answer: "Embedding numbers ki list hai jo text, image ya item ka matlab represent karti hai. Milte julte matlab wali cheezon ke vectors paas paas hote hain. To \"password reset kaise karun\" aur \"login bhool gaya\" paas aa jaate hain, chahe ek bhi shabd common na ho. Embeddings semantic search, RAG, recommendations, clustering aur duplicates dhoondhne mein use hoti hain. Inhe vector database mein rakhte hain jo cosine similarity se sabse paas ke vectors jaldi dhoondhta hai.",
    points: ["Matlab pakadne wale numbers; milta julta matlab = paas ke vectors", "Uses: semantic search, RAG, recommendations, dedup", "Similarity cosine se; vector index mein store"],
    check: "Har LLM role ka core building block."
  },
  "py-structures": {
    q: "Python mein list, tuple, set aur dictionary mein kya fark hai? Kab kaunsa use karoge?",
    answer: "List ordered aur badalne layak collection hai; sequences ke liye jinme jodte ho, jaise process karne wali rows. Tuple ordered hai par badal nahi sakta; fixed records jaise coordinates ke liye, aur dictionary key ban sakta hai. Set unique items rakhta hai aur membership check bahut tez; duplicates hataane ya \"kya yeh ID dekhi hai?\" ke liye. Dictionary keys ko values se map karti hai, tez lookup ke saath; jaise user ID se user details. Set ya dict mein membership check average O(1) hai, list mein O(n).",
    points: ["List: ordered, mutable", "Tuple: ordered, immutable, hashable", "Set: unique, tez membership", "Dict: key se value, tez lookup; O(1) vs O(n) ka zikr"],
    check: "Python pe pakad, aur kya aap performance ke baare mein sochte ho."
  },
  "py-generators": {
    q: "Python mein generator kya hai, aur badi files ke liye kyun useful hai?",
    answer: "Generator values ek ek karke, jab maangi jaayein tab deta hai, yield se, poori list memory mein banaane ke bajaye. Agar 20 GB ki log file process karni hai, to use list mein padhne se machine crash ho jaayegi. Generator se ek line padho aur process karo, to memory chhoti rehti hai. Generators LLM responses stream karne aur pipelines ke liye bhi badhiya hain jahan har step pichhle se data kheenchta hai.",
    points: ["Lazy: ek baar mein ek item yield karta hai", "Bade data ke liye constant memory", "Examples: badi files padhna, streaming, batching"],
    check: "Kya aap asli data size pe chalne wala code likh sakte ho."
  },
  "sql-joins": {
    q: "INNER JOIN aur LEFT JOIN example ke saath samjhao.",
    answer: "INNER JOIN sirf woh rows deta hai jo dono tables mein match hon. LEFT JOIN left table ki har row deta hai, saath mein right ke matches; match na ho to right ke columns NULL. Example: customers aur orders. Inner join se sirf woh customers jinhone order kiya. Customers se left join karo to saare customers, aur jinka order ID NULL hai woh kabhi order nahi kiye, inactive customers dhoondhne ka common tarika.",
    points: ["Inner = sirf matching rows", "Left = saari left rows, match na ho to NULL", "Left join plus IS NULL se missing matches dhoondho", "Join key unique na ho to duplicate rows ka dhyaan rakho"],
    check: "Sabse common SQL basic. Duplicate rows ke trap ka zikr alag dikhata hai."
  },
  "sql-window": {
    q: "Window functions kya hain? ROW_NUMBER, RANK aur DENSE_RANK samjhao.",
    answer: "Window functions related rows pe calculation karte hain bina unhe GROUP BY ki tarah ek row mein samete. Jaise running total ya har employee ki apne department mein salary rank, OVER (PARTITION BY department ORDER BY salary DESC) se. Ties pe: ROW_NUMBER ties mein bhi 1, 2, 3 jaise unique numbers deta hai, isliye deterministic banane ke liye tie breaker column jodo. RANK ties ko same number deta hai aur phir skip karta hai, jaise 1, 1, 3. DENSE_RANK same number deta hai bina gap, jaise 1, 1, 2. LAG aur LEAD se row ko pichhli ya agli row se compare karte ho.",
    points: ["Rows ki window pe calculation, har row bani rehti hai", "PARTITION BY groups banata hai, ORDER BY order tay karta hai", "Ties pe ROW_NUMBER vs RANK vs DENSE_RANK", "Uses: har group mein top N, running totals, badlaav ke liye LAG aur LEAD"],
    check: "2026 mein zyaadatar data SQL rounds ka core window functions hain."
  },
  "sql-topn": {
    q: "Har category mein revenue ke hisaab se top 3 products nikaalne wali query likho.",
    answer: "Main har category ke andar products ko rank karke filter karunga. Pehle subquery ya CTE mein har product ka revenue nikaalo aur DENSE_RANK() OVER (PARTITION BY category ORDER BY revenue DESC) AS rnk jodo. Phir WHERE rnk <= 3 wali rows lo. Bolkar batao ties kaise sambhaal rahe ho: DENSE_RANK tied products rakhta hai, to 3 se zyaada rows aa sakti hain; exactly 3 chahiye to product ID jaise tie breaker ke saath ROW_NUMBER use karo.",
    points: ["Har product ka revenue nikaalne ke liye CTE", "Category ke hisaab se partition kiya window rank", "Outer query mein rank ≤ 3 filter (window function seedhe WHERE mein filter nahi hota)", "Ties kaise sambhaale batao"],
    check: "Classic SQL task. Tie handling samjhaana maturity dikhata hai."
  },
  "correlation-causation": {
    q: "Correlation aur causation mein kya fark hai? Causation kaise prove karoge?",
    answer: "Correlation matlab do cheezein saath badhti ghatti hain; causation matlab ek doosre ko cause karti hai. Ice cream ki bikri aur doobne ke cases saath badhte hain kyunki dono garmi mein badhte hain, ice cream doobne ki wajah nahi. Products mein, naya feature use karne wale users zyaada tik sakte hain sirf isliye kyunki woh pehle se zyaada engaged the. Causation dikhane ka best tool randomised A/B test hai: feature randomly aadhe users ko do, taaki systematic fark sirf feature ka ho, phir results compare karo.",
    points: ["Correlation ≠ causation; chhupe teesre factors (confounders)", "Selection bias: opt in karne wale alag hote hain", "Randomised experiment sabse pakka tarika"],
    check: "Decisions ke liye statistical soch; PMs aur analysts ke liye zaroori."
  }
});

if (typeof module !== "undefined" && module.exports) module.exports = { INTERVIEW_PREP_HI };

// Hinglish stage titles and typical interview rounds for the prep guide.
var INTERVIEW_PREP_HI_META = {
  stages: {
    start: ["Shuruaat: aapke baare mein", "Lagbhag har interview yahin se shuru hota hai. Yeh jawaab tone set karte hain, isliye inhe shabd ba shabd taiyaar karo aur bolkar practice karo."],
    basics: ["Fundamentals", "Basics check karne ke chhote concept sawaal. 3 se 5 sentences mein, ek example ke saath jawaab do."],
    core: ["Role ki skills", "Is role ke interview ka technical dil. Interviewers follow up sawaalon se gehre jaate hain, isliye sirf definition nahi, kyun bhi samjho."],
    design: ["Design aur case sawaal", "Khule sawaal jinka ek sahi jawaab nahi. Pehle clarify karo, phir jawaab ko structure do, phir trade offs, naapne aur failure cases ki baat karo."],
    behaviour: ["Projects aur behaviour", "STAR method use karo: Situation, Task, Action, Result. Result mein jab ho sake ek number daalo."],
    ask: ["Aakhir mein: aapke sawaal aur salary", "Aakhri paanch minute matter karte hain. Acche sawaal dikhate hain aap serious ho; shaant salary jawaab aapka offer bachaata hai."]
  },
  rounds: {
    "ai-fresher": ["HR ya recruiter screen (15 se 30 min): background, AI kyun, notice period", "Online test: aptitude, Python basics, kuch SQL aur ML MCQs", "Technical interview: ML concepts simple shabdon mein, Python aur SQL sawaal, aapke project ki gehri baat", "Managerial ya HR round: attitude, seekhne ki kshamta, salary"],
    "ml-engineer": ["Recruiter screen", "Coding round: Python data structures, kabhi kabhi scratch se ML algorithm (logistic regression, k means)", "ML fundamentals: bias aur variance, metrics, overfitting, feature engineering", "ML system design: recommendation, fraud ya ranking system end to end", "Behavioural aur project ki gehri baat"],
    "data-engineer-ai": ["Recruiter screen", "SQL round: joins, window functions, har group mein top N, deduplication", "Python ya Spark round: transformations, skew, performance", "Pipeline aur data modelling design: batch vs streaming, idempotency, backfills, AI ke liye data (documents, embeddings)", "Behavioural: incidents aur data quality ki kahaniyaan"],
    "ai-product-engineer": ["Recruiter screen", "Coding round: practical full stack ya API task, aksar LLM call ke saath", "AI feature design: user ki zaroorat se prompt, retrieval, evals aur UX tak", "System design: latency, cost, streaming, caching, reliability", "Aapke banaye AI feature ki gehri baat, plus behavioural"],
    "mlops-engineer": ["Recruiter screen", "Coding ya scripting round: Python, Docker, kabhi kabhi Kubernetes YAML", "MLOps concepts: models ke liye CI/CD, registries, monitoring aur drift", "System design: models serve aur scale karna (GPUs pe LLMs samet), rollouts aur rollbacks", "Incident aur behavioural round"],
    "llm-agent-engineer": ["Recruiter screen", "Coding round: chhoti LLM app banao ya theek karo (tool calling, parsing, retries)", "RAG aur evals ki gehraai: retrieval quality, galat jawaab debug karna, LLM as judge", "System design: security, cost aur latency limits ke saath agent ya RAG system", "Project ki gehri baat aur behavioural"],
    "ai-research-engineer": ["Recruiter screen", "ML coding: PyTorch ya NumPy mein scratch se attention, training loop ya loss", "Maths aur fundamentals: gradients, softmax aur cross entropy, optimisation", "Research discussion: ek paper jo acche se jaante ho, aapka pichhla kaam, experiment design aur ablations", "Behavioural aur team fit"],
    "ai-forward-deployed-engineer": ["Recruiter screen", "Coding round: practical, aksar data wrangling ya API integration", "Decomposition case (sabse mushkil round): ek vague customer problem ko hisson mein todna, interviewer customer bante hain", "Technical gehraai: production LLM systems (RAG, evals, agents) aur enterprise integration", "Customer aur behavioural round: ambiguity, pushback, communication"],
    "ai-product-manager": ["Recruiter screen", "Product sense: ek user group ke liye AI feature design karo", "Analytical aur metrics: layered metrics, A/B tests, girawat ka diagnosis", "AI ki gehraai: evals, hallucinations, model choice, build vs buy, cost", "Behavioural aur leadership: influence, prioritisation, stakeholder conflict"]
  }
};
if (typeof module !== "undefined" && module.exports) module.exports.INTERVIEW_PREP_HI_META = INTERVIEW_PREP_HI_META;
