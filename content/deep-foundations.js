// Deeper lesson content, part 1: foundations. For each lesson:
//  steps    = how it works (or how to do it), step by step
//  mistakes = common beginner mistakes and how to avoid them
//  faq      = questions learners usually ask, with short answers
// Text fields are [English, Hinglish], like the lesson files. Shown inside each lesson after the
// explanation, so a learner never has to leave the page to fill a gap.
var LESSON_DEEP = Object.assign(typeof LESSON_DEEP !== "undefined" ? LESSON_DEEP : {}, {
  "what-is-ai": {
    steps: [
      ["Traditional software: a programmer writes the rules (if amount > ₹50,000 then ask for OTP). The computer follows them exactly.", "Traditional software: programmer rules likhta hai (agar amount > ₹50,000 to OTP maango). Computer unhe exactly follow karta hai."],
      ["Machine learning: instead of rules, we give thousands of examples with answers (these transactions were fraud, these weren't). The computer finds the pattern itself.", "Machine learning: rules ke bajaye hum hazaaron examples answers ke saath dete hain (yeh transactions fraud the, yeh nahi). Computer pattern khud dhoondhta hai."],
      ["Deep learning: the same idea with very large neural networks, which can learn from raw images, sound and text without us describing features.", "Deep learning: wahi idea bahut bade neural networks ke saath, jo raw images, awaaz aur text se seekh sakte hain, bina humare features bataaye."],
      ["Generative AI: deep learning models trained on huge amounts of text or images, so they can create new text, images or code when you ask in plain language.", "Generative AI: deep learning models jo bahut saare text ya images pe train hue hain, isliye aap simple bhasha mein poochho to naya text, images ya code bana dete hain."],
      ["AI jobs: most real work is building software around these models: getting data, connecting them to apps, testing quality and running them reliably.", "AI jobs: zyaadatar asli kaam in models ke around software banana hai: data laana, apps se jodna, quality test karna aur unhe reliably chalana."]
    ],
    mistakes: [
      ["Thinking AI 'understands' like a human. It finds patterns in data; it can be confidently wrong, so always check important outputs.", "Yeh sochna ki AI insaan ki tarah 'samajhta' hai. Woh data mein patterns dhoondhta hai; confidently galat bhi ho sakta hai, isliye important output hamesha check karo."],
      ["Using AI where a simple rule works. If 'if this, then that' solves it reliably, you don't need ML.", "Jahan simple rule kaam kare wahan AI lagana. Agar 'yeh hai to woh karo' se kaam reliably ho jaata hai, to ML ki zaroorat nahi."],
      ["Believing you need a PhD. Most AI roles need programming, data skills and good judgement; heavy maths is needed mainly for research roles.", "Yeh maanna ki PhD chahiye. Zyaadatar AI roles mein programming, data skills aur acchi samajh chahiye; bhaari maths mainly research roles mein lagta hai."]
    ],
    faq: [
      [["Is ChatGPT machine learning or deep learning?", "ChatGPT machine learning hai ya deep learning?"], ["Both. It's a deep learning model (a transformer), and deep learning is a kind of machine learning. Because it generates text, it's also called generative AI.", "Dono. Yeh ek deep learning model (transformer) hai, aur deep learning machine learning ka hi type hai. Text generate karta hai, isliye ise generative AI bhi kehte hain."]],
      [["Will AI replace software engineers?", "Kya AI software engineers ko replace kar dega?"], ["It changes the job more than it removes it. Engineers who use AI tools well and can build reliable AI features are in high demand. The risk is for people who don't adapt.", "Yeh job ko khatam karne se zyaada badalta hai. Jo engineers AI tools acche se use karte hain aur reliable AI features bana sakte hain unki demand bahut hai. Risk unke liye hai jo adapt nahi karte."]]
    ]
  },

  "py-basics": {
    steps: [
      ["Install Python 3 (or open Google Colab in your browser, nothing to install) and run print(\"Hello\").", "Python 3 install karo (ya browser mein Google Colab kholo, kuch install nahi karna) aur print(\"Hello\") chalao."],
      ["Create variables: name = \"Asha\", age = 28, salary = 55000.5, is_active = True. Python works out the type from the value.", "Variables banao: name = \"Asha\", age = 28, salary = 55000.5, is_active = True. Python value dekhkar type khud samajh leta hai."],
      ["Check a type with type(age). Convert with int(\"42\"), float(\"3.5\") or str(100). Input from users and files usually arrives as text.", "type(age) se type check karo. int(\"42\"), float(\"3.5\") ya str(100) se convert karo. Users aur files se input aksar text ke roop mein aata hai."],
      ["Combine values with f-strings: f\"{name} earns {salary}\". Do maths with + - * / and // (whole division) and % (remainder).", "f-strings se values jodo: f\"{name} earns {salary}\". Maths + - * / se karo, // (poora divide) aur % (remainder) bhi hain."],
      ["Practise by writing tiny programs: a tip calculator, an EMI calculator, a temperature converter.", "Chhote programs likhkar practice karo: tip calculator, EMI calculator, temperature converter."]
    ],
    mistakes: [
      ["Adding text and numbers: \"Age: \" + 28 gives an error. Use f\"Age: {28}\" or str(28).", "Text aur number jodna: \"Age: \" + 28 error deta hai. f\"Age: {28}\" ya str(28) use karo."],
      ["Forgetting that input() returns text: input() + 5 fails. Convert first with int(input()).", "Bhoolna ki input() text deta hai: input() + 5 fail hoga. Pehle int(input()) se convert karo."],
      ["Using = (assign) when you mean == (compare). x = 5 sets x; x == 5 asks whether x is 5.", "Compare karna ho aur = (assign) likh dena. x = 5 x set karta hai; x == 5 poochta hai ki x 5 hai kya."]
    ],
    faq: [
      [["Which Python version should I learn?", "Kaunsa Python version seekhun?"], ["Python 3, the latest stable version. Python 2 is retired. Small differences between 3.x versions won't matter while learning.", "Python 3, latest stable version. Python 2 band ho chuka hai. 3.x versions ke chhote fark seekhte waqt matter nahi karte."]],
      [["Do I need a powerful laptop?", "Kya powerful laptop chahiye?"], ["No. Any laptop runs Python. For heavier AI work later, free cloud notebooks like Google Colab give you GPUs.", "Nahi. Koi bhi laptop Python chala leta hai. Baad mein bhaari AI kaam ke liye Google Colab jaise free cloud notebooks GPU dete hain."]]
    ]
  },

  "py-logic": {
    steps: [
      ["Decisions with if / elif / else: if marks >= 90: grade = \"A\" elif marks >= 75: grade = \"B\" else: grade = \"C\". Indentation (4 spaces) shows what's inside each block.", "if / elif / else se decisions: if marks >= 90: grade = \"A\" elif marks >= 75: grade = \"B\" else: grade = \"C\". Indentation (4 spaces) batata hai kya block ke andar hai."],
      ["Repeat with for: for city in [\"Pune\", \"Delhi\"]: print(city). Use range(5) to repeat 5 times.", "for se repeat karo: for city in [\"Pune\", \"Delhi\"]: print(city). 5 baar repeat karne ke liye range(5)."],
      ["Repeat until something changes with while: while balance < target: balance += saving. Make sure the loop can end.", "Jab tak kuch badle na tab tak while se repeat: while balance < target: balance += saving. Dhyaan rakho loop khatam ho sake."],
      ["Package logic in a function: def emi(principal, rate, months): ... return value. Call it with different inputs instead of copying code.", "Logic ko function mein pack karo: def emi(principal, rate, months): ... return value. Code copy karne ke bajaye alag inputs ke saath call karo."],
      ["Test functions with small known cases: if emi(100000, 0, 10) should be 10000, check it with assert.", "Functions ko chhote known cases se test karo: agar emi(100000, 0, 10) 10000 hona chahiye, to assert se check karo."]
    ],
    mistakes: [
      ["Wrong indentation: mixing tabs and spaces or forgetting to indent after a colon causes errors or wrong logic.", "Galat indentation: tabs aur spaces mix karna ya colon ke baad indent bhoolna errors ya galat logic deta hai."],
      ["Infinite while loops: the condition never becomes false. Always update the variable you check.", "Infinite while loops: condition kabhi false nahi hoti. Jo variable check kar rahe ho use hamesha update karo."],
      ["Printing inside a function instead of returning. print shows a value; return gives it back so other code can use it.", "Function mein return ki jagah print karna. print sirf dikhata hai; return value wapas deta hai taaki doosra code use kar sake."]
    ],
    faq: [
      [["When should I use for vs while?", "for aur while mein kab kaunsa?"], ["Use for when you know what to go through (a list, a range). Use while when you repeat until a condition changes and don't know how many times.", "for tab jab pata ho kis cheez pe chalna hai (list, range). while tab jab condition badalne tak repeat karna ho aur pata na ho kitni baar."]],
      [["How big should a function be?", "Function kitna bada hona chahiye?"], ["Small enough to describe in one sentence. If you need 'and' twice to describe it, split it into two functions.", "Itna chhota ki ek sentence mein samjha sako. Agar describe karne mein do baar 'aur' lagana pade, to do functions mein tod do."]]
    ]
  },

  "py-collections": {
    steps: [
      ["List: an ordered collection you can change. scores = [72, 88, 95]; scores.append(60); scores[0] is the first item.", "List: ordered collection jise badal sakte ho. scores = [72, 88, 95]; scores.append(60); scores[0] pehla item hai."],
      ["Dictionary: look things up by a key. emp = {\"name\": \"Ravi\", \"city\": \"Pune\"}; emp[\"city\"] gives \"Pune\". Use emp.get(\"age\", 0) when a key may be missing.", "Dictionary: key se cheezein dhoondo. emp = {\"name\": \"Ravi\", \"city\": \"Pune\"}; emp[\"city\"] se \"Pune\" milta hai. Key missing ho sakti hai to emp.get(\"age\", 0) use karo."],
      ["Set: unique values with fast membership checks. seen = set(); if user_id in seen: ... Great for removing duplicates.", "Set: unique values, membership check bahut tez. seen = set(); if user_id in seen: ... Duplicates hataane ke liye badhiya."],
      ["Loop over them: for k, v in emp.items(): print(k, v). Most real data is a list of dictionaries, like rows from an API.", "Inpe loop chalao: for k, v in emp.items(): print(k, v). Zyaadatar asli data dictionaries ki list hota hai, jaise API ki rows."],
      ["Build new lists quickly with comprehensions: high = [s for s in scores if s > 80].", "Comprehensions se jaldi nayi lists banao: high = [s for s in scores if s > 80]."]
    ],
    mistakes: [
      ["Searching a big list with 'in' inside a loop. It gets very slow; convert to a set first.", "Loop ke andar badi list mein 'in' se dhoondhna. Bahut slow hota hai; pehle set mein convert karo."],
      ["KeyError from emp[\"age\"] when the key doesn't exist. Use .get() or check 'if \"age\" in emp'.", "Key na ho to emp[\"age\"] se KeyError. .get() use karo ya 'if \"age\" in emp' check karo."],
      ["Changing a list while looping over it. Build a new list instead.", "Loop chalate hue list badalna. Iske bajaye nayi list banao."]
    ],
    faq: [
      [["List or dictionary: how do I choose?", "List ya dictionary: kaise chunu?"], ["If you access items by position or just go through them in order, use a list. If you look items up by a name or ID, use a dictionary.", "Agar items position se access karte ho ya order mein chalte ho, to list. Agar naam ya ID se dhoondhte ho, to dictionary."]],
      [["What is JSON and how does it relate?", "JSON kya hai aur iska kya rishta hai?"], ["JSON is the text format APIs use. It maps directly to Python dictionaries and lists: json.loads(text) gives you dicts and lists, json.dumps(data) turns them back into text.", "JSON woh text format hai jo APIs use karti hain. Yeh seedha Python dictionaries aur lists mein map hota hai: json.loads(text) se dicts aur lists milti hain, json.dumps(data) wapas text bana deta hai."]]
    ]
  },

  "git-github": {
    steps: [
      ["Start tracking a project: git init in the folder (or clone an existing repo with git clone <url>).", "Project track karna shuru karo: folder mein git init (ya existing repo ke liye git clone <url>)."],
      ["Save a checkpoint: git add file.py (choose what to save), then git commit -m \"Add EMI calculator\" (save with a message).", "Checkpoint save karo: git add file.py (kya save karna hai chuno), phir git commit -m \"Add EMI calculator\" (message ke saath save)."],
      ["Work safely on a branch: git switch -c new-feature. Your main code stays untouched until you merge.", "Branch pe safely kaam karo: git switch -c new-feature. Merge karne tak main code ko kuch nahi hota."],
      ["Share it: create a repo on GitHub and git push. Others (and recruiters) can now see your code.", "Share karo: GitHub pe repo banao aur git push karo. Ab doosre (aur recruiters) aapka code dekh sakte hain."],
      ["Write a README: what the project does, how to run it, a screenshot and results. This is what people read first.", "README likho: project kya karta hai, kaise chalana hai, screenshot aur results. Log sabse pehle yahi padhte hain."]
    ],
    mistakes: [
      ["Committing secrets like API keys or passwords. Put them in a .env file and add .env to .gitignore.", "API keys ya passwords jaise secrets commit karna. Unhe .env file mein rakho aur .env ko .gitignore mein daalo."],
      ["One giant commit at the end. Commit small steps with clear messages; it tells the story of your work.", "Aakhir mein ek bada commit. Chhote steps clear messages ke saath commit karo; yeh aapke kaam ki kahani batata hai."],
      ["Uploading huge data files. Keep data out of git; share a download link or a small sample instead.", "Bahut badi data files upload karna. Data ko git se bahar rakho; download link ya chhota sample do."]
    ],
    faq: [
      [["What's the difference between Git and GitHub?", "Git aur GitHub mein kya fark hai?"], ["Git is the tool on your computer that tracks versions. GitHub is a website that hosts Git repositories so you can share and collaborate.", "Git aapke computer pe tool hai jo versions track karta hai. GitHub ek website hai jo Git repositories host karti hai taaki aap share aur collaborate kar sako."]],
      [["Do recruiters really look at GitHub?", "Kya recruiters sach mein GitHub dekhte hain?"], ["For AI roles, often yes, especially for career switchers. Two or three clean projects with good READMEs prove skills better than certificates.", "AI roles ke liye aksar haan, khaaskar career switchers ke liye. Acche README wale do teen clean projects certificates se zyaada skills prove karte hain."]]
    ]
  },

  "pandas": {
    steps: [
      ["Load data: df = pd.read_csv(\"sales.csv\"). A DataFrame is a table: rows and named columns.", "Data load karo: df = pd.read_csv(\"sales.csv\"). DataFrame ek table hai: rows aur naam wale columns."],
      ["Look before you analyse: df.head(), df.shape, df.info() (types and missing values), df.describe() (summary numbers).", "Analyse karne se pehle dekho: df.head(), df.shape, df.info() (types aur missing values), df.describe() (summary numbers)."],
      ["Select and filter: df[\"city\"], df[df[\"amount\"] > 1000], df[[\"city\", \"amount\"]].", "Select aur filter: df[\"city\"], df[df[\"amount\"] > 1000], df[[\"city\", \"amount\"]]."],
      ["Clean: df.dropna(), df.fillna(0), df.drop_duplicates(), pd.to_datetime(df[\"date\"]).", "Saaf karo: df.dropna(), df.fillna(0), df.drop_duplicates(), pd.to_datetime(df[\"date\"])."],
      ["Summarise: df.groupby(\"city\")[\"amount\"].sum().sort_values(ascending=False). This one line answers many business questions.", "Summarise: df.groupby(\"city\")[\"amount\"].sum().sort_values(ascending=False). Yeh ek line kai business sawaalon ka jawaab deti hai."]
    ],
    mistakes: [
      ["Not checking data types: numbers stored as text (\"1,200\") won't add up. Clean and convert with pd.to_numeric.", "Data types check na karna: text mein save numbers (\"1,200\") jud nahi paayenge. pd.to_numeric se saaf karke convert karo."],
      ["Looping row by row with for. Pandas operations on whole columns are much faster.", "for se row by row loop chalana. Pandas mein poore column pe operations bahut tez hote hain."],
      ["Dropping missing values without thinking. You may delete most of your data or bias it; first check how many and why.", "Bina soche missing values drop karna. Aap zyaadatar data mita sakte ho ya bias daal sakte ho; pehle dekho kitne hain aur kyun."]
    ],
    faq: [
      [["Pandas or SQL: which should I use?", "Pandas ya SQL: kaunsa use karun?"], ["Both. Use SQL to pull and aggregate data inside the database, then pandas for exploration, cleaning and ML preparation in Python.", "Dono. Database ke andar data nikalne aur aggregate karne ke liye SQL, phir Python mein exploration, cleaning aur ML prep ke liye pandas."]],
      [["My file is too big for pandas. What now?", "Meri file pandas ke liye bahut badi hai. Ab kya?"], ["Read only needed columns (usecols), read in chunks (chunksize), or use tools built for big data like Polars, DuckDB or Spark.", "Sirf zaroori columns padho (usecols), chunks mein padho (chunksize), ya bade data ke tools jaise Polars, DuckDB ya Spark use karo."]]
    ]
  },

  "stats-center-spread": {
    steps: [
      ["Mean: add all values and divide by how many. Good for symmetric data like heights.", "Mean: saari values jodo aur ginti se divide karo. Heights jaise symmetric data ke liye accha."],
      ["Median: sort the values and take the middle one. Use it when there are extreme values, like salaries or house prices.", "Median: values sort karo aur beech wali lo. Jab extreme values hon, jaise salaries ya ghar ki keemat, tab use karo."],
      ["Spread: range (max minus min) is quick but sensitive. Standard deviation tells how far values typically are from the mean.", "Spread: range (max minus min) jaldi milta hai par sensitive hai. Standard deviation batata hai values aam taur par mean se kitni door hain."],
      ["Percentiles: the 90th percentile is the value 90% of data is below. Used for things like delivery time or API latency (p90, p99).", "Percentiles: 90th percentile woh value hai jiske neeche 90% data hai. Delivery time ya API latency (p90, p99) jaisi cheezon ke liye use hota hai."],
      ["Always plot a histogram: two datasets can have the same mean but very different shapes.", "Hamesha histogram banao: do datasets ka mean same ho sakta hai par shape bilkul alag."]
    ],
    mistakes: [
      ["Reporting only the average. 'Average delivery time is 2 days' hides that 10% of orders take a week.", "Sirf average batana. 'Average delivery 2 din' yeh chhupa deta hai ki 10% orders ek hafta lete hain."],
      ["Using the mean for skewed data like income. A few very high values pull it up; the median is more honest.", "Income jaise skewed data ke liye mean use karna. Kuch bahut badi values use upar kheench leti hain; median zyaada sachcha hai."]
    ],
    faq: [
      [["What's the difference between variance and standard deviation?", "Variance aur standard deviation mein kya fark hai?"], ["Standard deviation is the square root of variance. It's in the same units as your data (rupees, seconds), so it's easier to interpret.", "Standard deviation variance ka square root hai. Yeh data ki units (rupees, seconds) mein hota hai, isliye samajhna aasaan hai."]],
      [["Why do tech teams talk about p99 latency?", "Tech teams p99 latency ki baat kyun karti hain?"], ["Because averages hide the slow cases users actually notice. p99 means 99% of requests are faster than this; the slowest 1% often matter most to unhappy users.", "Kyunki average un slow cases ko chhupa deta hai jo users ko mehsoos hote hain. p99 matlab 99% requests isse tez hain; sabse slow 1% aksar naraaz users ke liye sabse zaroori hote hain."]]
    ]
  },

  "stats-probability": {
    steps: [
      ["Probability is a number from 0 (impossible) to 1 (certain). A fair coin landing heads is 0.5.", "Probability 0 (namumkin) se 1 (pakka) tak ka number hai. Seedha sikka heads aane ki probability 0.5 hai."],
      ["Combine events: 'and' for independent events multiplies (two heads = 0.5 × 0.5 = 0.25); 'or' for exclusive events adds.", "Events jodna: independent events ke 'and' mein multiply (do heads = 0.5 × 0.5 = 0.25); exclusive events ke 'or' mein add."],
      ["Conditional probability: P(fraud | flagged) is the chance it's fraud given it was flagged. It can be very different from P(flagged | fraud).", "Conditional probability: P(fraud | flagged) yaani flag hua hai to fraud hone ka chance. Yeh P(flagged | fraud) se bahut alag ho sakta hai."],
      ["Distributions describe how values spread: the normal (bell curve) for heights or errors; skewed ones for income or waiting times.", "Distributions batate hain values kaise faili hain: heights ya errors ke liye normal (bell curve); income ya waiting time ke liye skewed."],
      ["Models output probabilities (0.83 chance of churn). You choose a threshold to turn them into decisions.", "Models probabilities dete hain (churn ka 0.83 chance). Inhe decisions mein badalne ke liye aap threshold chunte ho."]
    ],
    mistakes: [
      ["Ignoring the base rate: a 95% accurate test for a rare disease still produces mostly false alarms.", "Base rate ignore karna: rare bimaari ka 95% accurate test bhi zyaadatar false alarms dega."],
      ["The gambler's fallacy: after five heads, tails is not 'due'. Independent events have no memory.", "Gambler's fallacy: paanch heads ke baad tails 'aana hi chahiye' nahi hai. Independent events ki memory nahi hoti."]
    ],
    faq: [
      [["How much probability do I need for AI jobs?", "AI jobs ke liye kitni probability chahiye?"], ["For most engineering roles: basic probability, conditional probability and the idea of distributions. Research roles need much more.", "Zyaadatar engineering roles ke liye: basic probability, conditional probability aur distributions ka idea. Research roles mein bahut zyaada chahiye."]],
      [["Is a model's 0.9 score really a 90% chance?", "Kya model ka 0.9 score sach mein 90% chance hai?"], ["Only if the model is calibrated. Many models are over-confident; you can check calibration by comparing predicted scores with how often things actually happened.", "Sirf tab jab model calibrated ho. Kai models zyaada confident hote hain; predicted scores ko asal mein kitni baar hua usse compare karke calibration check kar sakte ho."]]
    ]
  },

  "stats-correlation": {
    steps: [
      ["Correlation measures how two things move together, from −1 (opposite) through 0 (no link) to +1 (together).", "Correlation naapta hai do cheezein saath kaise chalti hain, −1 (ulta) se 0 (koi rishta nahi) se +1 (saath) tak."],
      ["Look for a third factor (confounder): umbrella sales and traffic jams rise together because of rain.", "Teesra factor (confounder) dhoondo: chhatri ki bikri aur traffic jam dono baarish ki wajah se badhte hain."],
      ["Check who is in your data (sampling bias): a survey of app users says nothing about people who uninstalled.", "Dekho data mein kaun hai (sampling bias): app users ka survey un logon ke baare mein kuch nahi batata jinhone app hata diya."],
      ["To prove cause, run a randomised experiment (A/B test): randomly split users so the only difference is the change you made.", "Cause prove karne ke liye randomised experiment (A/B test) karo: users ko randomly baanto taaki farak sirf aapke change ka ho."],
      ["When you can't experiment, be careful with words: say 'is associated with', not 'causes'.", "Jab experiment na ho sake, shabd dhyaan se chuno: 'causes' nahi, 'is associated with' bolo."]
    ],
    mistakes: [
      ["Concluding a feature works because its users are happier. Engaged users choose features, not the other way round.", "Yeh maan lena ki feature kaam karta hai kyunki uske users zyaada khush hain. Engaged users feature chunte hain, ulta nahi."],
      ["Training models on biased samples, like only approved loans. The model never learns about people who were rejected.", "Biased samples pe model train karna, jaise sirf approved loans. Model reject hue logon ke baare mein kabhi nahi seekhta."]
    ],
    faq: [
      [["Can ML models find causes?", "Kya ML models causes dhoondh sakte hain?"], ["Standard ML finds correlations useful for prediction, not causes. Causal questions need experiments or special causal inference methods.", "Normal ML prediction ke liye useful correlations dhoondhta hai, causes nahi. Causal sawaalon ke liye experiments ya special causal inference methods chahiye."]],
      [["Is a correlation of 0.3 weak?", "Kya 0.3 ka correlation weak hai?"], ["It's modest, but it can still matter in business. Also, correlation only measures straight-line relationships; always plot the data.", "Yeh thoda hai, par business mein phir bhi matter kar sakta hai. Aur correlation sirf seedhi line wale rishte naapta hai; hamesha data plot karo."]]
    ]
  },

  "sql-basics": {
    steps: [
      ["SELECT the columns you want FROM a table: SELECT name, city FROM customers;", "Jo columns chahiye unhe table se SELECT karo: SELECT name, city FROM customers;"],
      ["Filter rows with WHERE: WHERE city = 'Pune' AND signup_date >= '2026-01-01'.", "WHERE se rows filter karo: WHERE city = 'Pune' AND signup_date >= '2026-01-01'."],
      ["Summarise with GROUP BY: SELECT city, COUNT(*) AS customers FROM customers GROUP BY city;", "GROUP BY se summarise karo: SELECT city, COUNT(*) AS customers FROM customers GROUP BY city;"],
      ["Filter groups with HAVING (after grouping) and sort with ORDER BY ... DESC, then LIMIT 10 for a top 10.", "Groups ko HAVING se filter karo (grouping ke baad) aur ORDER BY ... DESC se sort karo, phir top 10 ke liye LIMIT 10."],
      ["Practise on a free sample database (SQLite, or online SQL playgrounds) with real business questions.", "Free sample database (SQLite, ya online SQL playgrounds) pe asli business sawaalon ke saath practice karo."]
    ],
    mistakes: [
      ["Using WHERE to filter aggregates: WHERE COUNT(*) > 5 fails. Use HAVING for conditions on groups.", "Aggregates ko WHERE se filter karna: WHERE COUNT(*) > 5 fail hoga. Groups ki conditions ke liye HAVING use karo."],
      ["Comparing with NULL using =. Use IS NULL or IS NOT NULL.", "NULL ko = se compare karna. IS NULL ya IS NOT NULL use karo."],
      ["SELECT * on huge tables in production. Select only the columns you need; it's faster and cheaper.", "Production ki badi tables pe SELECT *. Sirf zaroori columns select karo; tez aur sasta hai."]
    ],
    faq: [
      [["Which SQL should I learn: MySQL, PostgreSQL, SQL Server?", "Kaunsa SQL seekhun: MySQL, PostgreSQL, SQL Server?"], ["The basics are almost identical in all of them. PostgreSQL is a great default; you can switch easily later.", "Basics sab mein lagbhag same hain. PostgreSQL accha default hai; baad mein aasaani se switch kar sakte ho."]],
      [["Why do AI roles need SQL?", "AI roles ko SQL kyun chahiye?"], ["Most company data lives in databases and warehouses. Training data, evaluation data and metrics usually start with a SQL query.", "Zyaadatar company data databases aur warehouses mein hota hai. Training data, evaluation data aur metrics aksar SQL query se shuru hote hain."]]
    ]
  },

  "sql-joins": {
    steps: [
      ["Find the shared key: orders.customer_id matches customers.id.", "Common key dhoondo: orders.customer_id customers.id se match karta hai."],
      ["INNER JOIN keeps only matches: customers who have orders.", "INNER JOIN sirf matches rakhta hai: woh customers jinke orders hain."],
      ["LEFT JOIN keeps every row from the left table; missing matches become NULL. Customers with no orders show NULL order columns.", "LEFT JOIN left table ki har row rakhta hai; match na ho to NULL. Bina order wale customers ke order columns NULL dikhte hain."],
      ["Find what's missing: LEFT JOIN ... WHERE orders.id IS NULL lists customers who never ordered.", "Jo missing hai dhoondo: LEFT JOIN ... WHERE orders.id IS NULL un customers ki list deta hai jinhone kabhi order nahi kiya."],
      ["Check row counts before and after a join. If they jump unexpectedly, your key isn't unique and rows are being duplicated.", "Join se pehle aur baad row count check karo. Agar achanak badh jaaye, to key unique nahi hai aur rows duplicate ho rahi hain."]
    ],
    mistakes: [
      ["Joining on a non unique key and double counting revenue. Aggregate first, or join on a truly unique key.", "Non unique key pe join karke revenue double count karna. Pehle aggregate karo, ya sach mein unique key pe join karo."],
      ["Putting a filter on the right table in WHERE after a LEFT JOIN, which silently turns it into an INNER JOIN. Put that condition in the ON clause.", "LEFT JOIN ke baad right table ka filter WHERE mein lagana, jo chupke se use INNER JOIN bana deta hai. Woh condition ON clause mein daalo."]
    ],
    faq: [
      [["When do I use RIGHT or FULL OUTER JOIN?", "RIGHT ya FULL OUTER JOIN kab use karun?"], ["RIGHT JOIN is just a LEFT JOIN with tables swapped, so most people use LEFT. FULL OUTER keeps unmatched rows from both sides, useful for reconciling two systems.", "RIGHT JOIN bas tables ulat kar LEFT JOIN hai, isliye zyaadatar log LEFT use karte hain. FULL OUTER dono taraf ki unmatched rows rakhta hai, do systems ko reconcile karne mein kaam aata hai."]],
      [["Are joins slow?", "Kya joins slow hote hain?"], ["Not with indexes on the join keys and sensible filters. In warehouses, joining huge tables can be costly, so filter early.", "Join keys pe indexes aur sahi filters ho to nahi. Warehouses mein bahut badi tables join karna mehenga ho sakta hai, isliye pehle filter karo."]]
    ]
  },

  "data-modeling": {
    steps: [
      ["Decide the grain: what does one row mean? One order, one order line, or one customer per day?", "Grain tay karo: ek row ka matlab kya hai? Ek order, ek order line, ya har din ek customer?"],
      ["Create a fact table for events and numbers (order_id, date_id, product_id, quantity, amount).", "Events aur numbers ke liye fact table banao (order_id, date_id, product_id, quantity, amount)."],
      ["Create dimension tables for descriptions (product name and category, customer city, calendar dates).", "Descriptions ke liye dimension tables banao (product naam aur category, customer city, calendar dates)."],
      ["Connect them with keys in a star shape: facts in the middle, dimensions around.", "Inhe keys se star shape mein jodo: beech mein facts, chaaron taraf dimensions."],
      ["Document each table and column, and add tests (unique keys, no NULLs where not allowed).", "Har table aur column document karo, aur tests lagao (unique keys, jahan allowed nahi wahan NULL nahi)."]
    ],
    mistakes: [
      ["Mixing grains in one table, like daily totals and individual orders together. Sums become wrong.", "Ek table mein alag grains mix karna, jaise daily totals aur individual orders saath. Sums galat ho jaate hain."],
      ["Overwriting history: if a customer moves city and you overwrite it, old sales get the new city. Keep history where it matters.", "History overwrite karna: customer ki city badli aur aapne overwrite kar di, to purani sales bhi nayi city dikhayengi. Jahan zaroori ho history rakho."]
    ],
    faq: [
      [["Normalised tables or a star schema?", "Normalised tables ya star schema?"], ["Apps use normalised tables to avoid duplicate data while writing. Analytics uses star schemas because they make reading and reporting simple and fast.", "Apps likhte waqt duplicate data se bachne ke liye normalised tables use karti hain. Analytics star schema use karta hai kyunki padhna aur reporting aasaan aur tez hoti hai."]],
      [["Why does data modelling matter for AI?", "AI ke liye data modelling kyun zaroori hai?"], ["Clean, well defined tables make features and training data trustworthy. Many 'model problems' are really data definition problems.", "Saaf, achhi tarah defined tables features aur training data ko bharosemand banati hain. Kai 'model problems' asal mein data definition problems hote hain."]]
    ]
  }
});

if (typeof module !== "undefined" && module.exports) module.exports = { LESSON_DEEP };
