// Lesson library, part 1: foundations. Every text field is [English, Hinglish].
// Hinglish = Hindi written in Roman script, keeping technical terms in English.
var LESSON_TOPICS = Object.assign(typeof LESSON_TOPICS !== "undefined" ? LESSON_TOPICS : {}, {
  "what-is-ai": {
    icon: "🧭", mins: 5,
    title: ["What is AI? AI vs ML vs Deep Learning vs GenAI", "AI kya hai? AI vs ML vs Deep Learning vs GenAI"],
    analogy: [
      "Think of how a child learns to recognise a mango. Nobody gives them a rulebook. They see many mangoes, and someone says 'this is a mango' each time. Soon they recognise a new mango on their own. Machine learning works the same way: show the computer many examples and it learns the pattern.",
      "Socho ek bachcha aam pehchaanna kaise seekhta hai. Koi usse rulebook nahi deta. Woh bahut saare aam dekhta hai, aur har baar koi bolta hai 'yeh aam hai'. Kuch time baad woh naya aam khud pehchaan leta hai. Machine learning bhi aise hi kaam karta hai: computer ko bahut saare examples dikhao, aur woh pattern khud seekh leta hai."
    ],
    explain: [
      "AI (Artificial Intelligence) is the big umbrella: any computer system that does something we'd call 'smart'. Machine Learning (ML) is the part of AI where computers learn patterns from data instead of following hand-written rules. Deep Learning is a type of ML that uses large 'neural networks' and works well for images, speech and text. Generative AI (GenAI), like ChatGPT or Claude, is deep learning that creates new content: text, images, code. Most AI jobs today combine these with normal software engineering.",
      "AI (Artificial Intelligence) ek bada umbrella hai: koi bhi computer system jo 'smart' kaam kare. Machine Learning (ML) AI ka woh hissa hai jahan computer haath se likhe rules follow karne ke bajaye data se pattern seekhta hai. Deep Learning ML ka ek type hai jo bade 'neural networks' use karta hai, aur images, voice aur text ke liye bahut accha kaam karta hai. Generative AI (GenAI), jaise ChatGPT ya Claude, deep learning hi hai jo naya content banata hai: text, images, code. Aaj ki zyaadatar AI jobs in sab ko normal software engineering ke saath mix karti hain."
    ],
    terms: [
      ["Model", "A program that has learned patterns from data and can make predictions.", "Ek program jisne data se pattern seekh liye hain aur ab prediction kar sakta hai."],
      ["Training", "The process of showing a model lots of examples so it learns.", "Model ko bahut saare examples dikhakar sikhaane ka process."],
      ["Generative AI", "AI that creates new text, images, code or audio.", "AI jo naya text, image, code ya audio banata hai."]
    ],
    example: {
      lang: "text",
      code: "Rule-based (old way):  IF email contains 'lottery' THEN spam\nMachine learning:     Show 10,000 emails labelled spam / not spam\n                      → model learns the patterns itself\nGenerative AI:        'Write a polite reply to this email'\n                      → model writes a brand-new reply",
      note: ["Same goal (handle emails), three very different approaches.", "Goal ek hi hai (emails handle karna), lekin teen bilkul alag tareeke."]
    },
    quiz: {
      q: ["ChatGPT writing a new poem is an example of…", "ChatGPT ka ek naya poem likhna kiska example hai?"],
      options: [["Rule-based software", "Rule-based software"], ["Generative AI", "Generative AI"], ["A spreadsheet formula", "Spreadsheet formula"]],
      answer: 1,
      why: ["It creates new content that didn't exist before, which is what generative AI does.", "Yeh aisa naya content bana raha hai jo pehle exist nahi karta tha, aur yahi generative AI ka kaam hai."]
    },
    remember: ["AI ⊃ Machine Learning ⊃ Deep Learning ⊃ Generative AI. Each is a more specific part of the one before.", "AI ⊃ Machine Learning ⊃ Deep Learning ⊃ Generative AI. Har ek pichhle wale ka zyaada specific hissa hai."]
  },

  "py-basics": {
    icon: "🐍", mins: 7,
    title: ["Python basics: variables and data types", "Python basics: variables aur data types"],
    analogy: [
      "Your kitchen has labelled containers: 'sugar', 'salt', 'rice'. You put something inside and later find it by its label. A variable in Python is exactly that: a labelled container that holds a value. And just as you don't keep milk in a salt jar, each value has a type: a number, some text, or true/false.",
      "Aapki kitchen mein label lage dabbe hote hain: 'cheeni', 'namak', 'chawal'. Aap andar kuch rakhte ho aur baad mein label dekhkar dhoondh lete ho. Python mein variable bilkul yahi hai: ek label wala dabba jismein value rakhi jaati hai. Aur jaise aap namak ke dabbe mein doodh nahi rakhte, waise hi har value ka ek type hota hai: number, text, ya true/false."
    ],
    explain: [
      "Python is the most-used language in AI because it reads almost like English and has ready-made libraries for data and ML. You store information in variables using '='. The common data types are int (whole numbers), float (decimals), str (text in quotes) and bool (True or False). print() shows a value, and type() tells you what type it is. Most beginner bugs come from mixing types, such as adding a number to text.",
      "Python AI mein sabse zyaada use hone wali language hai, kyunki yeh lagbhag English jaisi padhi jaati hai aur isme data aur ML ke liye ready-made libraries hain. Information ko '=' se variables mein store karte hain. Common data types hain: int (poore number), float (decimal), str (quotes mein text) aur bool (True ya False). print() value dikhata hai, aur type() batata hai ki uska type kya hai. Beginners ke zyaadatar bugs types mix karne se aate hain, jaise number ko text mein jodna."
    ],
    terms: [
      ["Variable", "A name that points to a stored value, e.g. price = 20.", "Ek naam jo stored value ko point karta hai, jaise price = 20."],
      ["String (str)", "Text inside quotes, e.g. 'Masala chai'.", "Quotes ke andar text, jaise 'Masala chai'."],
      ["Boolean (bool)", "A value that is either True or False.", "Aisi value jo ya to True ho ya False."]
    ],
    example: {
      lang: "python",
      code: "item = \"Masala chai\"     # str\nprice = 20               # int\nrating = 4.5             # float\nin_stock = True          # bool\n\nprint(item, \"costs\", price)\nprint(type(rating))      # <class 'float'>\ntotal = price * 3        # 3 cups → 60",
      note: ["A tiny chai-stall menu stored in variables.", "Ek chhoti chai stall ka menu, variables mein store kiya hua."]
    },
    quiz: {
      q: ["What is the type of the value 4.5?", "Value 4.5 ka type kya hai?"],
      options: [["int", "int"], ["float", "float"], ["str", "str"]],
      answer: 1,
      why: ["Numbers with a decimal point are floats. Whole numbers are ints.", "Decimal point wale numbers float hote hain. Poore numbers int hote hain."]
    },
    remember: ["A variable is a labelled box, and every value inside it has a type.", "Variable ek label wala dabba hai, aur uske andar ki har value ka ek type hota hai."]
  },

  "py-logic": {
    icon: "🔁", mins: 8,
    title: ["Python logic: if/else, loops and functions", "Python logic: if/else, loops aur functions"],
    analogy: [
      "A traffic signal makes decisions: if red, stop; else if green, go. That's if/else. A washing machine repeats the same rinse cycle several times. That's a loop. And your mom's chai recipe is written once and reused every morning. That's a function: steps you package once and call whenever you need them.",
      "Traffic signal decision leta hai: agar red hai to ruko, warna agar green hai to chalo. Yeh hai if/else. Washing machine ek hi rinse cycle kai baar repeat karti hai. Yeh hai loop. Aur mummy ki chai ki recipe ek baar likhi hui hai aur roz subah reuse hoti hai. Yeh hai function: steps ko ek baar pack karo aur jab chahiye tab call karo."
    ],
    explain: [
      "Programs need to make decisions, repeat work and stay organised. 'if / elif / else' runs different code depending on a condition. A 'for' loop repeats code for each item in a collection, and a 'while' loop repeats until a condition becomes false. A function (made with 'def') bundles steps under a name, takes inputs (parameters) and gives back an output with 'return'. Good functions do one clear job, which makes code easier to test and reuse.",
      "Programs ko decisions lene padte hain, kaam repeat karna padta hai aur organised rehna padta hai. 'if / elif / else' condition ke hisaab se alag code chalata hai. 'for' loop collection ke har item ke liye code repeat karta hai, aur 'while' loop tab tak repeat karta hai jab tak condition false na ho jaaye. Function ('def' se banta hai) steps ko ek naam ke neeche bundle karta hai, inputs (parameters) leta hai aur 'return' se output deta hai. Achhe functions ek hi clear kaam karte hain, isliye code ko test aur reuse karna aasaan hota hai."
    ],
    terms: [
      ["Condition", "A question with a True/False answer, e.g. price > 100.", "Aisa sawaal jiska jawaab True/False ho, jaise price > 100."],
      ["Loop", "Code that repeats for each item or until a condition changes.", "Code jo har item ke liye, ya condition badalne tak, repeat hota hai."],
      ["Function", "A named, reusable block of code with inputs and an output.", "Naam wala, reusable code block jismein inputs aur ek output hota hai."]
    ],
    example: {
      lang: "python",
      code: "def bill(amount):\n    if amount >= 500:\n        return amount * 0.9   # 10% off on big orders\n    return amount\n\norders = [120, 650, 300]\nfor o in orders:\n    print(o, \"→\", bill(o))\n# 120 → 120, 650 → 585.0, 300 → 300",
      note: ["A kirana-store discount rule written once and used for every order.", "Kirana store ka discount rule ek baar likha aur har order ke liye use kiya."]
    },
    quiz: {
      q: ["You need to apply the same discount rule to 1,000 orders. What do you use?", "Aapko 1,000 orders pe same discount rule lagaana hai. Kya use karoge?"],
      options: [["Copy-paste the code 1,000 times", "Code 1,000 baar copy-paste karna"], ["A function inside a loop", "Loop ke andar function"], ["A single if statement", "Sirf ek if statement"]],
      answer: 1,
      why: ["Write the rule once as a function, then loop over the orders and call it for each one.", "Rule ko ek baar function mein likho, phir orders pe loop chala kar har ek ke liye call karo."]
    },
    remember: ["if = decide, loop = repeat, function = reuse.", "if = decide karo, loop = repeat karo, function = reuse karo."]
  },

  "py-collections": {
    icon: "🧺", mins: 7,
    title: ["Lists and dictionaries: storing many values", "Lists aur dictionaries: bahut saari values store karna"],
    analogy: [
      "A shopping list is ordered: first milk, then bread, then eggs. That's a Python list. Your phone's contact book links a name to a number: 'Amma → 98xxxx'. You look things up by name, not by position. That's a dictionary.",
      "Shopping list ordered hoti hai: pehle doodh, phir bread, phir ande. Yeh Python ki list hai. Phone ki contact book naam ko number se jodti hai: 'Amma → 98xxxx'. Aap position se nahi, naam se dhoondhte ho. Yeh dictionary hai."
    ],
    explain: [
      "Real data comes in groups, so Python has collections. A list [ ] keeps items in order and you access them by position, starting from 0. A dictionary { } stores key → value pairs and you look up values by key, which is very fast. A tuple ( ) is like a list that can't be changed, and a set keeps only unique items. Most data you'll see in AI work, such as JSON from APIs, is lists of dictionaries.",
      "Real data groups mein aata hai, isliye Python mein collections hain. List [ ] items ko order mein rakhti hai, aur aap unhe position se access karte ho, jo 0 se shuru hoti hai. Dictionary { } key → value pairs store karti hai, aur aap key se value dhoondhte ho, jo bahut fast hota hai. Tuple ( ) list jaisa hai lekin badla nahi ja sakta, aur set sirf unique items rakhta hai. AI kaam mein aap jo data dekhoge, jaise APIs ka JSON, woh zyaadatar dictionaries ki list hota hai."
    ],
    terms: [
      ["List", "An ordered collection: ['milk', 'bread'].", "Ordered collection: ['milk', 'bread']."],
      ["Dictionary", "Key → value pairs: {'name': 'Asha', 'city': 'Pune'}.", "Key → value pairs: {'name': 'Asha', 'city': 'Pune'}."],
      ["Index", "The position of an item in a list. The first item is index 0.", "List mein item ki position. Pehla item index 0 pe hota hai."]
    ],
    example: {
      lang: "python",
      code: "cart = [\"milk\", \"bread\", \"eggs\"]\nprint(cart[0])            # milk\ncart.append(\"tea\")\n\nprices = {\"milk\": 30, \"bread\": 45, \"eggs\": 72, \"tea\": 120}\ntotal = sum(prices[item] for item in cart)\nprint(total)              # 267",
      note: ["A list for what's in the cart, and a dictionary to look up each price.", "Cart ke items ke liye list, aur har item ka price dhoondhne ke liye dictionary."]
    },
    quiz: {
      q: ["You want to look up a student's marks by their roll number. Which is best?", "Aapko roll number se student ke marks dhoondhne hain. Sabse best kya hai?"],
      options: [["A list", "List"], ["A dictionary", "Dictionary"], ["A single string", "Ek string"]],
      answer: 1,
      why: ["A dictionary maps a key (roll number) straight to a value (marks), with no searching through positions.", "Dictionary key (roll number) ko seedha value (marks) se map karti hai, position mein dhoondhna nahi padta."]
    },
    remember: ["List = ordered line of items. Dictionary = look up by name (key).", "List = items ki ordered line. Dictionary = naam (key) se dhoondho."]
  },

  "git-github": {
    icon: "🌳", mins: 6,
    title: ["Git and GitHub: saving and sharing your work", "Git aur GitHub: apna kaam save aur share karna"],
    analogy: [
      "Writing an important document, people save 'report_final', 'report_final_v2', 'report_FINAL_really'. Git does this properly. Each 'commit' is a labelled save point you can go back to. GitHub is like Google Drive for code: it keeps your project online and shows recruiters what you've built.",
      "Important document likhte waqt log 'report_final', 'report_final_v2', 'report_FINAL_pakka' save karte hain. Git yahi kaam theek se karta hai. Har 'commit' ek label wala save point hai jahan aap wapas ja sakte ho. GitHub code ke liye Google Drive jaisa hai: aapka project online rakhta hai, aur recruiters ko dikhata hai ki aapne kya banaya hai."
    ],
    explain: [
      "Git is a version-control tool. It tracks every change to your files so you can see history, undo mistakes and work with others without overwriting each other's work. The basic cycle is: edit files → 'git add' (choose changes) → 'git commit' (save with a message) → 'git push' (upload to GitHub). Branches let you try something new without breaking the main version. Your public GitHub profile is often the first thing an AI hiring manager looks at.",
      "Git ek version-control tool hai. Yeh files ke har change ko track karta hai, taaki aap history dekh sako, galtiyaan undo kar sako, aur doosron ke saath kaam kar sako bina ek-doosre ka kaam overwrite kiye. Basic cycle hai: files edit karo → 'git add' (changes chuno) → 'git commit' (message ke saath save) → 'git push' (GitHub pe upload). Branches se aap main version ko tode bina kuch naya try kar sakte ho. AI hiring manager aksar sabse pehle aapki public GitHub profile hi dekhta hai."
    ],
    terms: [
      ["Commit", "A saved snapshot of your project with a short message.", "Project ka saved snapshot, ek chhote message ke saath."],
      ["Repository (repo)", "A project folder tracked by Git.", "Git se track hone wala project folder."],
      ["Branch", "A separate line of work, so you can experiment safely.", "Kaam ki alag line, taaki aap safely experiment kar sako."]
    ],
    example: {
      lang: "bash",
      code: "git init                         # start tracking this folder\ngit add analysis.py\ngit commit -m \"Add sales analysis\"\ngit push origin main             # upload to GitHub",
      note: ["Four commands you'll use every single day.", "Yeh chaar commands aap roz use karoge."]
    },
    quiz: {
      q: ["Which command creates a save point with a message?", "Kaunsi command message ke saath save point banati hai?"],
      options: [["git push", "git push"], ["git commit", "git commit"], ["git init", "git init"]],
      answer: 1,
      why: ["commit saves a snapshot locally. push then uploads your commits to GitHub.", "commit snapshot ko local save karta hai. Phir push aapke commits ko GitHub pe upload karta hai."]
    },
    remember: ["add → commit → push. Commit small and often, with clear messages.", "add → commit → push. Chhote aur baar-baar commits karo, saaf messages ke saath."]
  },

  "pandas": {
    icon: "🐼", mins: 8,
    title: ["Pandas: working with tables of data", "Pandas: data ki tables ke saath kaam karna"],
    analogy: [
      "If you've used Excel, you already know the idea: rows, columns, filters and totals. Pandas is Excel inside Python. The difference is that it handles millions of rows, never crashes on big files, and repeats your steps exactly every time.",
      "Agar aapne Excel use kiya hai, to idea aapko pehle se pata hai: rows, columns, filters aur totals. Pandas Python ke andar Excel hai. Fark yeh hai ki yeh lakhon rows handle kar leta hai, badi files pe crash nahi hota, aur har baar aapke steps bilkul same tarah repeat karta hai."
    ],
    explain: [
      "Pandas is the standard Python library for tabular data. A DataFrame is a table, and each column is a Series. With a few lines you can load a CSV, look at the first rows, filter, sort, fill in missing values, and group data to calculate totals or averages. Before any ML model can learn, data is almost always cleaned and shaped in Pandas. NumPy, which Pandas is built on, handles fast maths on arrays of numbers.",
      "Pandas tabular data ke liye standard Python library hai. DataFrame ek table hai, aur uska har column ek Series hai. Kuch hi lines mein aap CSV load kar sakte ho, pehli rows dekh sakte ho, filter aur sort kar sakte ho, missing values bhar sakte ho, aur data group karke totals ya averages nikaal sakte ho. Koi bhi ML model seekhne se pehle data lagbhag hamesha Pandas mein hi clean aur shape kiya jaata hai. NumPy, jis pe Pandas bana hai, numbers ke arrays pe fast maths karta hai."
    ],
    terms: [
      ["DataFrame", "A table with rows and named columns.", "Rows aur naam wale columns wali table."],
      ["Missing value (NaN)", "An empty cell. Must be handled before modelling.", "Khaali cell. Modelling se pehle isse handle karna zaroori hai."],
      ["groupby", "Split rows into groups and summarise each, e.g. sales per city.", "Rows ko groups mein baanto aur har group ka summary nikaalo, jaise har city ki sales."]
    ],
    example: {
      lang: "python",
      code: "import pandas as pd\n\ndf = pd.read_csv(\"orders.csv\")     # city, item, amount\nprint(df.head())                     # first 5 rows\ndf = df.dropna(subset=[\"amount\"])   # drop rows with no amount\nby_city = df.groupby(\"city\")[\"amount\"].sum().sort_values(ascending=False)\nprint(by_city.head(3))               # top 3 cities by sales",
      note: ["Load → clean → summarise. The everyday loop of data work.", "Load → clean → summarise. Data kaam ka roz ka loop."]
    },
    quiz: {
      q: ["You want total sales for each city. Which Pandas tool fits?", "Aapko har city ki total sales chahiye. Kaunsa Pandas tool sahi hai?"],
      options: [["head()", "head()"], ["groupby()", "groupby()"], ["read_csv()", "read_csv()"]],
      answer: 1,
      why: ["groupby splits rows by city, then sum() adds up the sales in each group.", "groupby rows ko city ke hisaab se baantta hai, phir sum() har group ki sales jodta hai."]
    },
    remember: ["DataFrame = table. Most AI projects start with load → clean → groupby.", "DataFrame = table. Zyaadatar AI projects load → clean → groupby se shuru hote hain."]
  },

  "stats-center-spread": {
    icon: "📊", mins: 7,
    title: ["Averages and spread: mean, median, variance", "Average aur spread: mean, median, variance"],
    analogy: [
      "Nine friends earn ₹30,000 a month and one earns ₹10 lakh. The 'average' (mean) salary comes out above ₹1.2 lakh, which describes nobody! The median, the middle person's salary, is ₹30,000 and tells the real story. And 'spread' asks whether everyone earns about the same or the numbers are all over the place.",
      "Nau dost ₹30,000 mahina kamaate hain aur ek ₹10 lakh. 'Average' (mean) salary ₹1.2 lakh se upar aati hai, jo kisi ki bhi nahi hai! Median, yaani beech wale insaan ki salary, ₹30,000 hai, aur asli kahani yahi batati hai. Aur 'spread' poochta hai ki sab lagbhag same kamaate hain, ya numbers idhar-udhar bikhre hue hain."
    ],
    explain: [
      "Before modelling, you describe your data. The mean is the sum divided by the count, and it's pulled around by extreme values (outliers). The median is the middle value after sorting, and it's robust to outliers. The mode is the most common value. Spread measures how scattered the numbers are: variance is the average squared distance from the mean, and standard deviation is its square root, in the same units as the data. Always check both the centre and the spread.",
      "Modelling se pehle data ko describe karte hain. Mean = sum ÷ count, aur yeh extreme values (outliers) ki wajah se kheench jaata hai. Median sort karne ke baad beech wali value hai, aur outliers se zyaada farak nahi padta. Mode sabse common value hai. Spread batata hai ki numbers kitne bikhre hue hain: variance mean se average squared doori hai, aur standard deviation uska square root hai, data ki units mein hi. Hamesha centre aur spread dono check karo."
    ],
    terms: [
      ["Mean", "The usual average: sum ÷ count.", "Normal average: sum ÷ count."],
      ["Median", "The middle value when sorted. Not fooled by outliers.", "Sort karne ke baad beech wali value. Outliers se dhokha nahi khaati."],
      ["Standard deviation", "The typical distance of values from the mean.", "Values ki mean se typical doori."]
    ],
    example: {
      lang: "python",
      code: "import statistics as st\nsalaries = [30, 30, 30, 30, 30, 30, 30, 30, 30, 1000]  # in ₹ thousand\nprint(st.mean(salaries))    # 127.0  ← misleading\nprint(st.median(salaries))  # 30.0   ← the real picture\nprint(round(st.stdev(salaries), 1))  # 306.7 ← huge spread",
      note: ["One outlier changes the mean a lot but barely moves the median.", "Ek outlier mean ko bahut badal deta hai, lekin median ko lagbhag nahi hilaata."]
    },
    quiz: {
      q: ["House prices in a city include a few very expensive villas. Which describes a typical house better?", "City ke house prices mein kuch bahut mehenge villas bhi hain. Typical ghar ko kaun better describe karega?"],
      options: [["Mean", "Mean"], ["Median", "Median"], ["Maximum", "Maximum"]],
      answer: 1,
      why: ["A few villas pull the mean up. The median stays at the middle house.", "Kuch villas mean ko upar kheench dete hain. Median beech wale ghar pe hi rehta hai."]
    },
    remember: ["Use the median when there are outliers, and always look at the spread too.", "Outliers hon to median use karo, aur spread bhi hamesha dekho."]
  },

  "stats-probability": {
    icon: "🎲", mins: 7,
    title: ["Probability and distributions", "Probability aur distributions"],
    analogy: [
      "The weather app says '70% chance of rain'. That doesn't mean it rains for 70% of the day. It means that on days like this, it rained 7 times out of 10. AI models talk the same way: '92% likely spam' is a probability, not a certainty.",
      "Weather app bolta hai '70% chance of rain'. Iska matlab yeh nahi ki din ke 70% hisse mein baarish hogi. Matlab hai ki aise dinon mein 10 mein se 7 baar baarish hui thi. AI models bhi aise hi baat karte hain: '92% likely spam' ek probability hai, guarantee nahi."
    ],
    explain: [
      "Probability is a number from 0 (impossible) to 1 (certain) that says how likely something is. A distribution describes how likely each possible value is. The normal distribution, or bell curve, is common: heights, exam scores and measurement errors cluster around the average and thin out at the extremes. Many ML models output probabilities, and you choose a threshold, say 0.5, to turn them into decisions. Conditional probability, P(A given B), is the chance of A when you already know B happened.",
      "Probability 0 (impossible) se 1 (pakka) tak ka number hai jo batata hai ki kuch hone ke kitne chances hain. Distribution batati hai ki har possible value kitni likely hai. Normal distribution, yaani bell curve, bahut common hai: height, exam scores aur measurement errors average ke aas-paas jama hote hain, aur extremes pe kam ho jaate hain. Bahut saare ML models probability output karte hain, aur aap ek threshold chunte ho, jaise 0.5, unhe decision mein badalne ke liye. Conditional probability, P(A given B), A ka chance hai jab aapko pata ho ki B ho chuka hai."
    ],
    terms: [
      ["Probability", "How likely something is, from 0 to 1.", "Kuch hone ka chance, 0 se 1 tak."],
      ["Normal distribution", "The bell-shaped curve where most values sit near the average.", "Ghante (bell) jaisi curve jahan zyaadatar values average ke paas hoti hain."],
      ["Threshold", "The cut-off that turns a probability into a yes/no decision.", "Cut-off jo probability ko yes/no decision mein badalta hai."]
    ],
    example: {
      lang: "text",
      code: "Model says: P(fraud) = 0.83 for this UPI transaction\nThreshold 0.5  → flag it  ✅\nThreshold 0.9  → let it pass\n\nLower threshold = catch more fraud, but annoy more honest customers.",
      note: ["Choosing a threshold is a business decision, not just a maths one.", "Threshold chunna sirf maths ka nahi, business ka decision bhi hai."]
    },
    quiz: {
      q: ["A model says an email is 'spam with probability 0.6'. What does that mean?", "Model bolta hai email 'spam with probability 0.6' hai. Iska matlab kya hai?"],
      options: [["It is definitely spam", "Yeh pakka spam hai"], ["It's more likely spam than not, but not certain", "Spam hone ke chances zyaada hain, lekin pakka nahi"], ["60% of the email is spam", "Email ka 60% hissa spam hai"]],
      answer: 1,
      why: ["0.6 means that out of many similar emails, about 6 in 10 would be spam. It's likely, not certain.", "0.6 ka matlab hai ki aisi bahut saari emails mein se lagbhag 10 mein se 6 spam hongi. Likely hai, pakka nahi."]
    },
    remember: ["Model outputs are usually probabilities, and you pick the threshold.", "Model ka output aksar probability hota hai, aur threshold aap chunte ho."]
  },

  "stats-correlation": {
    icon: "🔗", mins: 6,
    title: ["Correlation vs causation, and sampling bias", "Correlation vs causation, aur sampling bias"],
    analogy: [
      "Ice-cream sales and drowning cases both rise in summer. They're correlated, but ice cream doesn't cause drowning. Hot weather causes both. And if you survey only people at a gym about fitness habits, your results won't represent the whole city. That's sampling bias.",
      "Garmiyon mein ice-cream ki sales aur doobne ke cases dono badhte hain. Dono correlated hain, lekin ice-cream doobne ki wajah nahi hai. Garmi dono ki wajah hai. Aur agar aap fitness habits ka survey sirf gym wale logon se karoge, to result poore shehar ko represent nahi karega. Yeh hai sampling bias."
    ],
    explain: [
      "Correlation means two things move together. Causation means one actually makes the other happen. ML models are excellent at finding correlations but cannot, on their own, prove causation, so be careful with claims like 'feature X causes Y'. Sampling bias happens when your data doesn't represent the real world, and a model trained on biased data will make biased predictions. Before trusting any result, ask who is missing from this data and what else could explain the pattern.",
      "Correlation ka matlab hai do cheezein saath-saath badalti hain. Causation ka matlab hai ek cheez sach mein doosri ko cause karti hai. ML models correlations dhoondhne mein bahut ache hain, lekin khud causation prove nahi kar sakte, isliye 'feature X causes Y' jaise claims mein savdhaan raho. Sampling bias tab hota hai jab aapka data real duniya ko represent nahi karta, aur biased data pe train hua model biased predictions karega. Kisi bhi result pe bharosa karne se pehle poocho: is data mein kaun missing hai, aur is pattern ko aur kya explain kar sakta hai?"
    ],
    terms: [
      ["Correlation", "Two variables tend to move together.", "Do variables saath-saath badalte hain."],
      ["Causation", "One thing directly causes the other.", "Ek cheez seedha doosri ko cause karti hai."],
      ["Sampling bias", "Data that doesn't represent the full population.", "Aisa data jo poori population ko represent nahi karta."]
    ],
    example: {
      lang: "text",
      code: "Finding: users who use the app's dark mode spend more money.\n❌ 'Dark mode makes people spend more' (causation claim)\n✅ Maybe power users like dark mode AND spend more.\n   Test it: an A/B experiment that randomly switches dark mode on.",
      note: ["A randomised experiment is how you move from correlation to causation.", "Correlation se causation tak pahunchne ka tareeka randomised experiment hai."]
    },
    quiz: {
      q: ["A hiring model is trained only on past hires from one city. What's the risk?", "Hiring model sirf ek city ke purane hires pe train hua hai. Risk kya hai?"],
      options: [["It will be slower", "Woh slow hoga"], ["Sampling bias: it may unfairly score people from other cities", "Sampling bias: doosri cities ke logon ko galat score de sakta hai"], ["No risk at all", "Koi risk nahi"]],
      answer: 1,
      why: ["The training data doesn't represent everyone the model will judge.", "Training data un sab logon ko represent nahi karta jinhe model judge karega."]
    },
    remember: ["Correlation is not causation, and biased data gives biased AI.", "Correlation causation nahi hai, aur biased data se biased AI banta hai."]
  },

  "sql-basics": {
    icon: "🗄️", mins: 7,
    title: ["SQL basics: asking a database questions", "SQL basics: database se sawaal poochna"],
    analogy: [
      "A library has a catalogue. You don't search every shelf. You ask, 'Show me all books by Premchand published after 1920, sorted by title.' SQL is the language for asking a database exactly that kind of question.",
      "Library mein ek catalogue hota hai. Aap har shelf nahi dhoondhte. Aap poochte ho: 'Premchand ki saari books dikhao jo 1920 ke baad chhapi, title ke hisaab se sorted.' SQL database se bilkul aisa sawaal poochne ki language hai."
    ],
    explain: [
      "Most company data lives in relational databases: tables with rows and columns. SQL (Structured Query Language) reads that data. SELECT picks columns, FROM picks the table, WHERE filters rows, ORDER BY sorts, and LIMIT caps the number of rows. Aggregates like COUNT, SUM and AVG summarise data. GROUP BY gives you one summary per group, and HAVING filters those groups. Nearly every data, ML and AI-product role uses SQL every week.",
      "Zyaadatar company data relational databases mein hota hai: rows aur columns wali tables. SQL (Structured Query Language) us data ko padhta hai. SELECT columns chunta hai, FROM table chunta hai, WHERE rows filter karta hai, ORDER BY sort karta hai, aur LIMIT rows ki ginti limit karta hai. COUNT, SUM aur AVG jaise aggregates data ka summary nikaalte hain. GROUP BY har group ka ek summary deta hai, aur HAVING un groups ko filter karta hai. Lagbhag har data, ML aur AI-product role mein SQL har hafte use hota hai."
    ],
    terms: [
      ["SELECT … FROM", "Choose which columns to read, and from which table.", "Kaunse columns padhne hain, aur kis table se."],
      ["WHERE", "Keep only rows that match a condition.", "Sirf woh rows rakho jo condition match karti hain."],
      ["GROUP BY", "Summarise rows per group, e.g. orders per city.", "Har group ka summary, jaise har city ke orders."]
    ],
    example: {
      lang: "sql",
      code: "SELECT city, COUNT(*) AS orders, AVG(amount) AS avg_bill\nFROM orders\nWHERE order_date >= '2026-01-01'\nGROUP BY city\nHAVING COUNT(*) > 100\nORDER BY orders DESC\nLIMIT 5;",
      note: ["The top 5 busiest cities this year, and their average bill.", "Is saal ki top 5 sabse busy cities, aur unka average bill."]
    },
    quiz: {
      q: ["Which clause keeps only orders above ₹500?", "Kaunsa clause sirf ₹500 se upar ke orders rakhega?"],
      options: [["ORDER BY amount", "ORDER BY amount"], ["WHERE amount > 500", "WHERE amount > 500"], ["GROUP BY amount", "GROUP BY amount"]],
      answer: 1,
      why: ["WHERE filters rows by a condition. ORDER BY only sorts them.", "WHERE condition se rows filter karta hai. ORDER BY sirf sort karta hai."]
    },
    remember: ["SELECT what → FROM where → WHERE which rows → GROUP BY → ORDER BY.", "SELECT kya → FROM kahan se → WHERE kaunsi rows → GROUP BY → ORDER BY."]
  },

  "sql-joins": {
    icon: "🧩", mins: 7,
    title: ["SQL JOINs: combining tables", "SQL JOINs: tables ko jodna"],
    analogy: [
      "Your school kept one register for student names and roll numbers, and another for marks by roll number. To print 'name + marks', you match the two registers on roll number. A JOIN does that matching for database tables.",
      "School mein ek register mein students ke naam aur roll number hote the, aur doosre mein roll number ke hisaab se marks. 'Naam + marks' print karne ke liye aap dono registers ko roll number se match karte ho. JOIN database tables ke liye yahi matching karta hai."
    ],
    explain: [
      "Databases split data into separate tables to avoid repetition, such as customers and orders, linked by a key like customer_id. A JOIN brings them back together. An INNER JOIN keeps only rows that match in both tables. A LEFT JOIN keeps every row from the left table, with blanks where there's no match, which is perfect for questions like 'customers who never ordered'. Joining on the wrong key, or getting duplicate matches, is the most common source of wrong numbers.",
      "Repetition se bachne ke liye databases data ko alag tables mein baant dete hain, jaise customers aur orders, jo customer_id jaisi key se jude hote hain. JOIN unhe wapas jodta hai. INNER JOIN sirf woh rows rakhta hai jo dono tables mein match karti hain. LEFT JOIN left table ki har row rakhta hai, aur jahan match na ho wahan khaali chhod deta hai, jo 'kin customers ne kabhi order nahi kiya' jaise sawaalon ke liye perfect hai. Galat key pe join karna, ya duplicate matches aana, galat numbers ki sabse common wajah hai."
    ],
    terms: [
      ["Primary / foreign key", "An ID that uniquely identifies a row, and the column in another table that points to it.", "Row ko unique pehchaanne wali ID, aur doosri table ka column jo us ID ko point karta hai."],
      ["INNER JOIN", "Only rows that match in both tables.", "Sirf woh rows jo dono tables mein match karein."],
      ["LEFT JOIN", "All rows from the left table, plus matches from the right if there are any.", "Left table ki saari rows, aur right se match ho to woh bhi."]
    ],
    example: {
      lang: "sql",
      code: "-- Customers who have never placed an order\nSELECT c.name\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id\nWHERE o.id IS NULL;",
      note: ["A LEFT JOIN plus 'IS NULL' finds the rows with no match.", "LEFT JOIN aur 'IS NULL' milkar woh rows dhoondhte hain jinka match nahi hai."]
    },
    quiz: {
      q: ["You need every product, including ones that never sold. Which join?", "Aapko har product chahiye, woh bhi jo kabhi nahi bike. Kaunsa join?"],
      options: [["INNER JOIN products with sales", "Products ka sales ke saath INNER JOIN"], ["LEFT JOIN from products to sales", "Products se sales tak LEFT JOIN"], ["No join is needed", "Join ki zaroorat nahi"]],
      answer: 1,
      why: ["A LEFT JOIN keeps all products even when no sales row matches. An INNER JOIN would drop them.", "LEFT JOIN saare products rakhta hai, chahe sales ki koi row match na kare. INNER JOIN unhe hata deta."]
    },
    remember: ["INNER = only matches. LEFT = keep everything on the left.", "INNER = sirf matches. LEFT = left ki saari rows rakho."]
  },

  "data-modeling": {
    icon: "🏗️", mins: 7,
    title: ["Data modelling: designing tables for analysis", "Data modelling: analysis ke liye tables design karna"],
    analogy: [
      "A supermarket bill lists what happened: items, quantities, amounts. That's a 'fact'. Separately, the store keeps details about products (brand, category) and stores (city, size). Those are 'dimensions'. Keeping the bills slim and the details in their own tables makes every report faster and cleaner.",
      "Supermarket ka bill batata hai kya hua: items, quantity, amount. Yeh 'fact' hai. Alag se store products (brand, category) aur stores (city, size) ki details rakhta hai. Yeh 'dimensions' hain. Bills ko halka rakhna aur details ko unki apni tables mein rakhna har report ko fast aur saaf banata hai."
    ],
    explain: [
      "Analytics databases (data warehouses like BigQuery or Snowflake) are designed differently from app databases. The classic design is a star schema: a central fact table of events (sales, clicks, trips) with numeric measures, surrounded by dimension tables that describe the who, what, where and when. Window functions such as running totals, ranks and 'previous value' let you analyse sequences without messy self-joins. A good model makes common questions easy and wrong answers hard.",
      "Analytics databases (BigQuery ya Snowflake jaise data warehouses) app databases se alag design hote hain. Classic design star schema hai: beech mein events (sales, clicks, trips) ki fact table, numeric measures ke saath, aur uske chaaron taraf dimension tables jo kaun, kya, kahan aur kab describe karti hain. Window functions, jaise running totals, ranks aur 'pichhli value', bina messy self-joins ke sequences analyse karne dete hain. Achha model common sawaalon ko aasaan aur galat jawaabon ko mushkil bana deta hai."
    ],
    terms: [
      ["Fact table", "Events with numbers, e.g. each sale and its amount.", "Numbers wale events, jaise har sale aur uska amount."],
      ["Dimension table", "Descriptive details, e.g. product name or store city.", "Describe karne wali details, jaise product ka naam ya store ki city."],
      ["Window function", "A calculation across related rows, such as a rank or running total.", "Related rows pe calculation, jaise rank ya running total."]
    ],
    example: {
      lang: "sql",
      code: "SELECT store_id, sale_date, amount,\n       SUM(amount) OVER (PARTITION BY store_id ORDER BY sale_date) AS running_total\nFROM fact_sales;",
      note: ["A running total per store, with no self-join needed.", "Har store ka running total, bina self-join ke."]
    },
    quiz: {
      q: ["In a star schema, where does the 'product category' column belong?", "Star schema mein 'product category' column kahan hona chahiye?"],
      options: [["The fact table", "Fact table mein"], ["A product dimension table", "Product dimension table mein"], ["Repeated in every table", "Har table mein repeat"]],
      answer: 1,
      why: ["Category describes the product, so it lives in the product dimension, which the fact table links to.", "Category product ko describe karti hai, isliye woh product dimension mein rehti hai, jisse fact table judti hai."]
    },
    remember: ["Facts = what happened (numbers). Dimensions = descriptions.", "Facts = kya hua (numbers). Dimensions = descriptions."]
  }
});

if (typeof module !== "undefined" && module.exports) module.exports = { LESSON_TOPICS };
