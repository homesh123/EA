// Lesson library, part 2: machine learning, maths and deep learning. Text fields are [English, Hinglish].
var LESSON_TOPICS = Object.assign(typeof LESSON_TOPICS !== "undefined" ? LESSON_TOPICS : {}, {
  "ml-how-machines-learn": {
    icon: "🧠", mins: 7,
    title: ["How machines learn: features, labels and training", "Machines kaise seekhti hain: features, labels aur training"],
    analogy: [
      "An experienced sabziwala can guess a mango's sweetness by its colour, smell and softness. Nobody taught them a formula. They learned from thousands of mangoes and customer feedback. In ML, colour, smell and softness are 'features', 'sweet or not' is the 'label', and those thousands of mangoes are the 'training data'.",
      "Ek experienced sabziwala aam ka rang, khushboo aur naramee dekhkar mithaas ka andaaza laga leta hai. Kisi ne usse formula nahi sikhaaya. Usne hazaaron aam aur customers ke feedback se seekha. ML mein rang, khushboo aur naramee 'features' hain, 'meetha hai ya nahi' 'label' hai, aur woh hazaaron aam 'training data' hain."
    ],
    explain: [
      "In supervised learning, the most common kind, you give the model examples with inputs (features) and the correct answer (label). Training means the model adjusts itself to make its guesses match the labels as closely as possible. After training, it predicts labels for new examples it has never seen. In unsupervised learning there are no labels, and the model finds structure on its own, for example grouping similar customers (clustering). The quality and quantity of examples matter more than a fancy algorithm.",
      "Supervised learning, jo sabse common hai, mein aap model ko examples dete ho: inputs (features) aur sahi jawaab (label). Training ka matlab hai ki model khud ko adjust karta hai taaki uske guesses labels se jitna ho sake utna match karein. Training ke baad woh naye examples ke labels predict karta hai, jo usne pehle kabhi nahi dekhe. Unsupervised learning mein labels nahi hote, model khud structure dhoondhta hai, jaise milte-julte customers ko group karna (clustering). Examples ki quality aur quantity fancy algorithm se zyaada matter karti hai."
    ],
    terms: [
      ["Feature", "An input the model looks at, e.g. area of a flat.", "Input jise model dekhta hai, jaise flat ka area."],
      ["Label", "The correct answer you want predicted, e.g. its price.", "Sahi jawaab jo predict karwana hai, jaise flat ka price."],
      ["Supervised vs unsupervised", "Learning with answers vs finding patterns without answers.", "Jawaabon ke saath seekhna vs bina jawaabon ke pattern dhoondhna."]
    ],
    example: {
      lang: "text",
      code: "Features (inputs)                       Label (answer)\narea=650 sqft, bhk=1, locality=Wakad  → ₹48 lakh\narea=1100 sqft, bhk=2, locality=Baner → ₹1.1 crore\n... 5,000 more flats ...\nNew flat: area=900, bhk=2, locality=Wakad → model predicts ≈ ₹70 lakh",
      note: ["The model learns how features relate to price, then applies that to a new flat.", "Model seekhta hai ki features ka price se kya rishta hai, phir naye flat pe apply karta hai."]
    },
    quiz: {
      q: ["Grouping customers into similar segments without any predefined groups is…", "Bina pehle se bane groups ke customers ko milte-julte segments mein baantna kya hai?"],
      options: [["Supervised learning", "Supervised learning"], ["Unsupervised learning", "Unsupervised learning"], ["Not machine learning", "Machine learning nahi hai"]],
      answer: 1,
      why: ["There are no labels. The model finds the groups itself, which is unsupervised learning (clustering).", "Koi labels nahi hain. Model groups khud dhoondhta hai, yeh unsupervised learning (clustering) hai."]
    },
    remember: ["Features in → label out. Training = learning from examples with known answers.", "Features andar → label bahar. Training = jaane-pehchaane jawaabon wale examples se seekhna."]
  },

  "ml-regression-classification": {
    icon: "🎯", mins: 6,
    title: ["Two kinds of prediction: regression and classification", "Do tarah ki prediction: regression aur classification"],
    analogy: [
      "A Swiggy app answers two different kinds of questions. 'How many minutes until delivery?' has a number as its answer: that's regression. 'Will this order be late: yes or no?' puts the order in a category: that's classification.",
      "Swiggy app do alag tarah ke sawaalon ke jawaab deta hai. 'Delivery mein kitne minute lagenge?' ka jawaab ek number hai: yeh regression hai. 'Kya yeh order late hoga: haan ya na?' order ko category mein daalta hai: yeh classification hai."
    ],
    explain: [
      "Regression predicts a continuous number, such as price, temperature or delivery time. Linear regression, the classic starting point, draws the best straight-line relationship between features and the number. Classification predicts a category, such as spam/not spam, fraud/genuine, or which of 10 product types. Logistic regression, despite its name, is a simple classification model that outputs a probability. Decision trees can do both. Always start with these simple models before trying anything complex.",
      "Regression ek continuous number predict karta hai, jaise price, temperature ya delivery time. Linear regression, jo classic starting point hai, features aur number ke beech sabse acchi seedhi line ka rishta banata hai. Classification ek category predict karta hai, jaise spam/not spam, fraud/genuine, ya 10 product types mein se kaunsa. Logistic regression, naam ke bawajood, ek simple classification model hai jo probability deta hai. Decision trees dono kar sakte hain. Kuch complex try karne se pehle hamesha in simple models se shuru karo."
    ],
    terms: [
      ["Regression", "Predicting a number, e.g. house price.", "Number predict karna, jaise ghar ka price."],
      ["Classification", "Predicting a category, e.g. spam or not.", "Category predict karna, jaise spam hai ya nahi."],
      ["Baseline", "The simplest possible prediction, which your model must beat.", "Sabse simple prediction, jise aapke model ko beat karna hai."]
    ],
    example: {
      lang: "python",
      code: "from sklearn.linear_model import LinearRegression, LogisticRegression\n\nreg = LinearRegression().fit(X_train, delivery_minutes)   # regression\nclf = LogisticRegression().fit(X_train, is_late)           # classification\n\nreg.predict(X_new)          # → [32.5] minutes\nclf.predict_proba(X_new)    # → [[0.8, 0.2]] → 20% chance of being late",
      note: ["Same features, two different questions, two different model types.", "Same features, do alag sawaal, do alag model types."]
    },
    quiz: {
      q: ["Predicting tomorrow's number of website visitors is…", "Kal website pe kitne visitors aayenge, yeh predict karna kya hai?"],
      options: [["Classification", "Classification"], ["Regression", "Regression"], ["Clustering", "Clustering"]],
      answer: 1,
      why: ["The answer is a number (a count of visitors), so it's regression.", "Jawaab ek number hai (visitors ki ginti), isliye yeh regression hai."]
    },
    remember: ["Number → regression. Category → classification. Start simple.", "Number → regression. Category → classification. Simple se shuru karo."]
  },

  "ml-train-test": {
    icon: "📝", mins: 7,
    title: ["Train/test split and overfitting", "Train/test split aur overfitting"],
    analogy: [
      "A student who memorises last year's question paper word for word scores 100% on that paper, then fails the real exam with new questions. That's overfitting. Teachers prevent it by keeping the real exam questions secret. In ML we do the same: we hide a 'test set' the model never sees during training.",
      "Jo student pichhle saal ka question paper shabd-shabd ratt leta hai, woh us paper mein 100% laata hai, lekin naye sawaalon wale asli exam mein fail ho jaata hai. Yeh hai overfitting. Teachers asli exam ke sawaal secret rakhkar isse rokte hain. ML mein hum bhi yahi karte hain: ek 'test set' chhupa ke rakhte hain jo model training ke dauraan kabhi nahi dekhta."
    ],
    explain: [
      "Split your data before training: typically 70–80% for training and 20–30% for testing. The model learns only from the training set, and you judge it only on the test set, which shows how it will do on new, real-world data. Overfitting means great training scores but poor test scores: the model memorised noise instead of learning patterns. Underfitting means poor scores on both: the model is too simple. Cross-validation repeats the split several times for a more reliable estimate.",
      "Training se pehle data split karo: aam taur pe 70–80% training ke liye aur 20–30% testing ke liye. Model sirf training set se seekhta hai, aur aap use sirf test set pe judge karte ho, jisse pata chalta hai ki woh naye, real-world data pe kaisa karega. Overfitting ka matlab hai training scores bahut acche lekin test scores kharab: model ne pattern seekhne ki jagah noise ratt liya. Underfitting ka matlab dono pe kharab scores: model bahut simple hai. Cross-validation split ko kai baar repeat karta hai, taaki estimate zyaada reliable ho."
    ],
    terms: [
      ["Test set", "Data hidden during training and used only for the final check.", "Training ke dauraan chhupa hua data, jo sirf final check ke liye use hota hai."],
      ["Overfitting", "Memorising the training data and failing on new data.", "Training data ratt lena aur naye data pe fail hona."],
      ["Cross-validation", "Repeating train/test splits to get a more trustworthy score.", "Train/test split kai baar repeat karna, taaki score pe zyaada bharosa ho."]
    ],
    example: {
      lang: "python",
      code: "from sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\nmodel.fit(X_train, y_train)\nprint(\"train:\", model.score(X_train, y_train))   # 0.99\nprint(\"test: \", model.score(X_test, y_test))     # 0.71  ← overfitting alarm 🚨",
      note: ["A big gap between train and test scores is the classic overfitting signal.", "Train aur test scores ke beech bada gap overfitting ka classic signal hai."]
    },
    quiz: {
      q: ["Training accuracy is 98% and test accuracy is 65%. What's happening?", "Training accuracy 98% hai aur test accuracy 65%. Kya ho raha hai?"],
      options: [["Underfitting", "Underfitting"], ["Overfitting", "Overfitting"], ["The model is perfect", "Model perfect hai"]],
      answer: 1,
      why: ["It does brilliantly on data it has seen and poorly on new data, which means it memorised rather than learned.", "Dekhe hue data pe bahut accha aur naye data pe kharab, matlab model ne seekha nahi, ratt liya."]
    },
    remember: ["Never judge a model on data it trained on.", "Model ko kabhi us data pe judge mat karo jis pe woh train hua hai."]
  },

  "ml-metrics": {
    icon: "📏", mins: 8,
    title: ["Measuring models: accuracy, precision and recall", "Models ko measure karna: accuracy, precision aur recall"],
    analogy: [
      "Airport security has two kinds of mistakes: stopping an innocent traveller (a false alarm) or missing a real threat. A scanner that never beeps is '99.99% accurate', because almost nobody is a threat, but it's useless! Precision asks: when it beeps, how often is it right? Recall asks: of all the real threats, how many did it catch?",
      "Airport security do tarah ki galtiyaan kar sakti hai: ek innocent passenger ko rokna (false alarm), ya asli khatre ko miss karna. Jo scanner kabhi beep hi na kare woh '99.99% accurate' hai, kyunki lagbhag koi khatra hota hi nahi, lekin bilkul bekaar hai! Precision poochta hai: jab beep hua, to kitni baar sahi tha? Recall poochta hai: saare asli khatron mein se kitne pakde?"
    ],
    explain: [
      "Accuracy, the share of predictions that are correct, is misleading when one class is rare, like fraud or disease. Always compare against a baseline, such as 'always predict the most common class'. Precision = correct positives ÷ everything you flagged. High precision means few false alarms. Recall = correct positives ÷ all actual positives. High recall means few misses. F1 combines both. Which matters more depends on the cost of each mistake: for cancer screening, recall is critical. For spam filters, precision matters so real emails aren't hidden. For regression, use errors like MAE (average absolute error).",
      "Accuracy, yaani sahi predictions ka hissa, tab misleading hoti hai jab ek class rare ho, jaise fraud ya bimaari. Hamesha ek baseline se compare karo, jaise 'hamesha sabse common class predict karo'. Precision = sahi positives ÷ jitne aapne flag kiye. High precision matlab kam false alarms. Recall = sahi positives ÷ saare asli positives. High recall matlab kam miss. F1 dono ko combine karta hai. Kaunsa zyaada zaroori hai, yeh har galti ki keemat pe depend karta hai: cancer screening mein recall critical hai. Spam filter mein precision zaroori hai taaki asli emails chhup na jaayein. Regression ke liye MAE (average absolute error) jaise errors use karo."
    ],
    terms: [
      ["Precision", "Of everything flagged, how much was truly positive.", "Jitna flag kiya, usmein se kitna sach mein positive tha."],
      ["Recall", "Of all true positives, how many were caught.", "Saare asli positives mein se kitne pakde gaye."],
      ["Confusion matrix", "A 2×2 table of correct and wrong yes/no predictions.", "Sahi aur galat yes/no predictions ki 2×2 table."]
    ],
    example: {
      lang: "text",
      code: "1,000 transactions, 10 are fraud.\nModel flags 20; 8 of them are real fraud.\n\nPrecision = 8 / 20 = 40%   (many false alarms)\nRecall    = 8 / 10 = 80%   (caught most fraud)\nAccuracy  = (8 + 978) / 1000 = 98.6%\nBaseline 'never fraud' accuracy = 99%  ← beats the model on accuracy!",
      note: ["Accuracy hides the story. Precision and recall reveal it.", "Accuracy kahani chhupa deti hai. Precision aur recall use dikhaate hain."]
    },
    quiz: {
      q: ["For a cancer screening model, which mistake is usually worse?", "Cancer screening model ke liye aam taur pe kaunsi galti zyaada buri hai?"],
      options: [["Low recall: missing real cases", "Low recall: asli cases miss karna"], ["Low precision: some false alarms", "Low precision: kuch false alarms"], ["Both are equally fine", "Dono barabar theek hain"]],
      answer: 0,
      why: ["A missed cancer case can be life-threatening, while a false alarm leads to another test. So recall matters most.", "Miss hua cancer case jaan le sakta hai, jabki false alarm ka matlab bas ek aur test. Isliye recall sabse zaroori hai."]
    },
    remember: ["Beat the baseline, and choose precision vs recall by the cost of each mistake.", "Baseline ko beat karo, aur har galti ki keemat dekhkar precision vs recall chuno."]
  },

  "ml-features": {
    icon: "🛠️", mins: 7,
    title: ["Feature engineering: turning raw data into useful inputs", "Feature engineering: raw data ko kaam ke inputs mein badalna"],
    analogy: [
      "A cricket selector doesn't just look at 'runs scored'. They compute strike rate, average against fast bowlers, and form over the last 5 matches. Those calculated numbers predict future performance far better than raw totals. Creating such helpful inputs is feature engineering.",
      "Cricket selector sirf 'kitne runs banaaye' nahi dekhta. Woh strike rate, fast bowlers ke against average, aur pichhle 5 matches ki form calculate karta hai. Yeh calculated numbers raw totals se kahin better future performance predict karte hain. Aise kaam ke inputs banaana feature engineering hai."
    ],
    explain: [
      "Models only see the numbers you give them, so better features often beat a better algorithm. Common techniques: extract parts of dates (day of week, festival season), create ratios (amount ÷ average amount), and encode categories as numbers (one-hot encoding). Scale numeric features so big numbers don't dominate. Fill missing values sensibly, perhaps adding a flag that says 'was missing'. Domain knowledge, meaning knowing the business, is your biggest advantage here. Never use information from the future, such as 'was refunded', to predict the past. That's data leakage.",
      "Model sirf woh numbers dekhta hai jo aap usse dete ho, isliye better features aksar better algorithm ko hara dete hain. Common techniques: dates ke hisse nikaalo (week ka din, tyohaar ka season), ratios banao (amount ÷ average amount), aur categories ko numbers mein badlo (one-hot encoding). Numeric features scale karo taaki bade numbers baaki sab pe haavi na hon. Missing values samajhdaari se bharo, chahe to ek 'missing tha' flag bhi jodo. Domain knowledge, yaani business ki samajh, yahan aapka sabse bada advantage hai. Kabhi bhi future ki information, jaise 'refund hua tha', past predict karne ke liye mat use karo. Yeh data leakage hai."
    ],
    terms: [
      ["One-hot encoding", "Turning a category like city into 0/1 columns.", "City jaisi category ko 0/1 columns mein badalna."],
      ["Scaling", "Putting numeric features on similar ranges.", "Numeric features ko milti-julti range mein laana."],
      ["Data leakage", "Accidentally giving the model info it won't have at prediction time.", "Galti se model ko aisi info dena jo prediction ke waqt uske paas nahi hogi."]
    ],
    example: {
      lang: "python",
      code: "df[\"order_hour\"] = df[\"created_at\"].dt.hour\ndf[\"is_weekend\"] = df[\"created_at\"].dt.dayofweek >= 5\ndf[\"amount_vs_usual\"] = df[\"amount\"] / df.groupby(\"user_id\")[\"amount\"].transform(\"mean\")\ndf = pd.get_dummies(df, columns=[\"city\"])     # one-hot encode city",
      note: ["'Amount vs this user's usual amount' is a classic fraud feature.", "'Amount vs is user ka usual amount' ek classic fraud feature hai."]
    },
    quiz: {
      q: ["To predict whether a loan will default, you include 'number of missed payments in the next 6 months'. What's wrong?", "Loan default predict karne ke liye aap 'agle 6 mahine mein miss hui payments' include karte ho. Galat kya hai?"],
      options: [["Nothing, it's a great feature", "Kuch nahi, yeh great feature hai"], ["Data leakage: it's future information", "Data leakage: yeh future ki information hai"], ["It needs scaling", "Isse scale karna padega"]],
      answer: 1,
      why: ["At decision time you can't know future missed payments. The model would look great in testing and fail in real use.", "Decision ke waqt future ki missed payments pata nahi hoti. Model testing mein shandaar dikhega aur real use mein fail hoga."]
    },
    remember: ["Good features + domain knowledge > fancy algorithms. Watch out for leakage.", "Acche features + domain knowledge > fancy algorithms. Leakage se bacho."]
  },

  "ml-trees": {
    icon: "🌲", mins: 6,
    title: ["Decision trees, random forests and boosting", "Decision trees, random forests aur boosting"],
    analogy: [
      "A bank officer decides on a loan by asking a series of questions: Is salary above ₹50k? Any past defaults? Job for more than 2 years? That flowchart is a decision tree. Asking 100 officers who each saw slightly different files, then taking a vote, is a random forest. Boosting is like a coaching class where each new tutor focuses on the questions previous students got wrong.",
      "Bank officer loan ka faisla sawaalon ki series se karta hai: salary ₹50k se zyaada hai? Pehle koi default? Naukri 2 saal se zyaada? Yeh flowchart decision tree hai. 100 officers se poochna, jinhone thodi alag files dekhi hain, aur phir vote lena random forest hai. Boosting ek coaching class jaisa hai jahan har naya tutor un sawaalon pe focus karta hai jo pichhle students se galat hue the."
    ],
    explain: [
      "A decision tree splits data with simple yes/no questions, which makes it easy to explain but prone to overfitting. A random forest trains many trees on random samples and averages their votes, which is more accurate and stable. Gradient boosting (XGBoost, LightGBM) builds trees one after another, each fixing the errors of the last. On tabular business data, like spreadsheets of customers or transactions, boosted trees are often the best-performing models, beating deep learning.",
      "Decision tree data ko simple yes/no sawaalon se split karta hai. Isse explain karna aasaan hai, lekin overfitting ka risk rehta hai. Random forest random samples pe bahut saare trees train karta hai aur unke votes ka average leta hai, jo zyaada accurate aur stable hai. Gradient boosting (XGBoost, LightGBM) trees ek ke baad ek banata hai, har naya tree pichhle ki galtiyaan theek karta hai. Tabular business data pe, jaise customers ya transactions ki spreadsheets, boosted trees aksar sabse accha perform karte hain, deep learning ko bhi peeche chhod dete hain."
    ],
    terms: [
      ["Decision tree", "A flowchart of yes/no questions that leads to a prediction.", "Yes/no sawaalon ka flowchart jo prediction tak le jaata hai."],
      ["Random forest", "Many trees voting together for a steadier answer.", "Bahut saare trees milkar vote karte hain, taaki jawaab zyaada stable ho."],
      ["Gradient boosting", "Trees built in sequence, each correcting earlier mistakes.", "Trees sequence mein bante hain, har ek pichhli galtiyaan sudhaarta hai."]
    ],
    example: {
      lang: "python",
      code: "from xgboost import XGBClassifier\nmodel = XGBClassifier(n_estimators=300, max_depth=4, learning_rate=0.05)\nmodel.fit(X_train, y_train)\nprint(model.score(X_test, y_test))\n# feature_importances_ shows which inputs mattered most",
      note: ["A strong default for spreadsheet-style data.", "Spreadsheet jaise data ke liye ek strong default."]
    },
    quiz: {
      q: ["For predicting customer churn from a table of 30 columns, a strong first choice is…", "30 columns wali table se customer churn predict karne ke liye ek strong pehla choice kya hai?"],
      options: [["A huge deep neural network", "Ek bahut bada deep neural network"], ["Gradient-boosted trees", "Gradient-boosted trees"], ["A chatbot", "Chatbot"]],
      answer: 1,
      why: ["Boosted trees are fast, accurate and explainable on tabular data. Try them before deep learning.", "Tabular data pe boosted trees fast, accurate aur explainable hain. Deep learning se pehle inhe try karo."]
    },
    remember: ["Tables → try boosted trees first.", "Tables ho to pehle boosted trees try karo."]
  },

  "ml-training-vs-inference": {
    icon: "🏭", mins: 6,
    title: ["Training vs inference: how ML runs in production", "Training vs inference: ML production mein kaise chalta hai"],
    analogy: [
      "A chef spends months perfecting a recipe in a test kitchen. That's training: slow, expensive, done occasionally. Then the restaurant serves that dish to hundreds of customers a day, quickly and consistently. That's inference. Running AI in production is mostly about the restaurant, not the test kitchen.",
      "Chef test kitchen mein mahino tak recipe perfect karta hai. Yeh training hai: slow, mehenga, kabhi-kabhi hota hai. Phir restaurant woh dish roz sainkdon customers ko jaldi aur same taste ke saath serve karta hai. Yeh inference hai. Production mein AI chalaana zyaadatar restaurant ke baare mein hai, test kitchen ke nahi."
    ],
    explain: [
      "Training uses lots of data and compute, often GPUs, to produce a model artifact: a saved file of learned parameters. Inference loads that artifact and makes predictions on new inputs, either in real time (an API answering in milliseconds) or in batches (scoring a million customers overnight). Inference has different priorities from training: latency, throughput, cost per request and reliability. Models are versioned like code, so you know exactly which model gave which answer. Infrastructure engineers usually own the inference side.",
      "Training mein bahut saara data aur compute lagta hai, aksar GPUs, aur isse ek model artifact banta hai: seekhe hue parameters ki saved file. Inference us artifact ko load karke naye inputs pe predictions karta hai, ya to real time mein (API jo milliseconds mein jawaab de) ya batches mein (raat bhar mein 10 lakh customers ko score karna). Inference ki priorities training se alag hain: latency, throughput, har request ki cost aur reliability. Models ko code ki tarah version kiya jaata hai, taaki pata rahe kis model ne kaunsa jawaab diya. Inference wala hissa aam taur pe infrastructure engineers sambhaalte hain."
    ],
    terms: [
      ["Model artifact", "The saved, trained model file that gets deployed.", "Saved, trained model ki file jo deploy hoti hai."],
      ["Inference", "Using a trained model to make predictions.", "Trained model se predictions karwana."],
      ["Batch vs real-time", "Scoring many items on a schedule vs answering each request instantly.", "Schedule pe bahut saare items score karna vs har request ka turant jawaab."]
    ],
    example: {
      lang: "text",
      code: "Training (weekly):   data → train.py on GPU → fraud_model_v12.pkl → registry\nInference (24×7):    UPI payment → API loads v12 → P(fraud)=0.03 → approve\n                     latency budget: < 50 ms per payment",
      note: ["Same model, two very different engineering problems.", "Model ek hi, lekin engineering ki do bilkul alag problems."]
    },
    quiz: {
      q: ["Scoring all 2 million customers for churn risk every night is…", "Har raat 20 lakh customers ka churn risk score karna kya hai?"],
      options: [["Real-time inference", "Real-time inference"], ["Batch inference", "Batch inference"], ["Training", "Training"]],
      answer: 1,
      why: ["It's prediction (inference) done on a schedule over many items, which is batch.", "Yeh prediction (inference) hai jo schedule pe bahut saare items pe hota hai, yaani batch."]
    },
    remember: ["Training creates the model. Inference serves it, fast, cheaply and reliably.", "Training model banata hai. Inference use serve karta hai: fast, sasta aur reliable."]
  },

  "math-vectors": {
    icon: "📐", mins: 8,
    title: ["Vectors and matrices: the language of AI", "Vectors aur matrices: AI ki bhasha"],
    analogy: [
      "Describe a phone with numbers: [price, battery, camera MP, weight] = [20000, 5000, 50, 190]. That list is a vector, and two phones with similar vectors are similar phones. A spreadsheet of 100 phones, each row a vector, is a matrix. AI models are mostly huge amounts of fast vector and matrix maths.",
      "Ek phone ko numbers se describe karo: [price, battery, camera MP, weight] = [20000, 5000, 50, 190]. Yeh list ek vector hai, aur milte-julte vectors wale do phones milte-julte phones hain. 100 phones ki spreadsheet, jismein har row ek vector hai, ek matrix hai. AI models zyaadatar bahut saari fast vector aur matrix maths hi hain."
    ],
    explain: [
      "A vector is an ordered list of numbers that represents something: a data row, an image or the meaning of a word. A matrix is a grid of numbers, i.e. many vectors stacked together. Key operations: the dot product measures how aligned two vectors are (the basis of similarity search), and matrix multiplication transforms vectors (what every neural-network layer does). Eigenvectors describe the main directions of variation in data. You don't need to compute these by hand; NumPy and PyTorch do it. But knowing what they mean makes papers and models readable.",
      "Vector numbers ki ordered list hai jo kisi cheez ko represent karti hai: data ki row, image, ya kisi word ka matlab. Matrix numbers ka grid hai, yaani bahut saare vectors ek ke upar ek. Key operations: dot product batata hai ki do vectors kitne ek hi direction mein hain (similarity search ka base), aur matrix multiplication vectors ko transform karta hai (har neural-network layer yahi karti hai). Eigenvectors data mein variation ki main directions batate hain. Inhe haath se calculate nahi karna padta; NumPy aur PyTorch kar dete hain. Lekin inka matlab samajhne se papers aur models padhne laayak ho jaate hain."
    ],
    terms: [
      ["Vector", "An ordered list of numbers describing one thing.", "Numbers ki ordered list jo ek cheez ko describe kare."],
      ["Dot product", "Multiply matching numbers and add them up. Higher means more aligned.", "Matching numbers multiply karke jodo. Zyaada value matlab zyaada aligned."],
      ["Matrix multiplication", "Transforming many vectors at once. The core work of a neural layer.", "Ek saath bahut saare vectors transform karna. Neural layer ka core kaam."]
    ],
    example: {
      lang: "python",
      code: "import numpy as np\nyou   = np.array([5, 1, 4])   # likes: cricket, cooking, movies (0–5)\nriya  = np.array([4, 0, 5])\nvikas = np.array([0, 5, 1])\nprint(you @ riya)    # 40 → very similar tastes\nprint(you @ vikas)   # 9  → quite different",
      note: ["The dot product as a simple 'taste similarity' score. Recommenders use this idea.", "Dot product ek simple 'pasand ki similarity' score ki tarah. Recommenders yahi idea use karte hain."]
    },
    quiz: {
      q: ["Two vectors have a large positive dot product. They are probably…", "Do vectors ka dot product bada positive hai. Woh shayad…"],
      options: [["Very different", "Bilkul alag hain"], ["Similar / pointing the same way", "Similar hain / same direction mein hain"], ["Empty", "Khaali hain"]],
      answer: 1,
      why: ["A large positive dot product means the vectors point in a similar direction, i.e. they're similar.", "Bada positive dot product matlab vectors milti-julti direction mein point karte hain, yaani similar hain."]
    },
    remember: ["Everything in AI becomes vectors, and similarity is just vector maths.", "AI mein sab kuch vectors ban jaata hai, aur similarity bas vector maths hai."]
  },

  "math-gradients": {
    icon: "⛰️", mins: 8,
    title: ["Gradients and gradient descent: how models improve", "Gradients aur gradient descent: models behtar kaise hote hain"],
    analogy: [
      "Imagine you're on a foggy hill at night and need to reach the bottom. You can't see far, so you feel the slope under your feet and take a small step downhill. Then you repeat. The slope is the gradient, each step is an update, and the step size is the learning rate. That's exactly how neural networks learn.",
      "Socho aap raat ko dhundh wali pahaadi pe ho aur neeche pahunchna hai. Door tak dikh nahi raha, isliye paon ke neeche dhalaan mehsoos karte ho aur neeche ki taraf chhota kadam lete ho. Phir yahi repeat karte ho. Dhalaan gradient hai, har kadam ek update hai, aur kadam ka size learning rate hai. Neural networks bilkul aise hi seekhte hain."
    ],
    explain: [
      "A model's 'loss' is a number measuring how wrong its predictions are. The gradient tells you which direction each parameter should move to reduce the loss, and how strongly. Gradient descent repeatedly nudges all parameters a little in that downhill direction. If the learning rate is too big you overshoot and bounce around; too small and training takes forever. Backpropagation is the efficient method, using the chain rule from calculus, that computes gradients for millions of parameters at once. Optimisers like Adam are smarter versions of gradient descent.",
      "Model ka 'loss' ek number hai jo batata hai ki uski predictions kitni galat hain. Gradient batata hai ki loss kam karne ke liye har parameter ko kis direction mein aur kitna hilna chahiye. Gradient descent baar-baar saare parameters ko us dhalaan ki taraf thoda-thoda khiskaata hai. Learning rate bahut bada ho to aap aage nikal jaate ho aur idhar-udhar uchhalte ho; bahut chhota ho to training mein bahut time lagta hai. Backpropagation woh efficient tareeka hai, calculus ke chain rule se, jo crore parameters ke gradients ek saath nikaalta hai. Adam jaise optimisers gradient descent ke smart versions hain."
    ],
    terms: [
      ["Loss", "A number measuring how wrong the model is. Lower is better.", "Number jo batata hai model kitna galat hai. Kam behtar hai."],
      ["Learning rate", "How big a step to take on each update.", "Har update pe kitna bada kadam lena hai."],
      ["Backpropagation", "The method that computes gradients through all the layers of a network.", "Woh tareeka jo network ki saari layers ke through gradients nikaalta hai."]
    ],
    example: {
      lang: "python",
      code: "# Find w so that w * 3 ≈ 12 (answer: 4)\nw, lr = 0.0, 0.05\nfor step in range(20):\n    pred = w * 3\n    loss = (pred - 12) ** 2\n    grad = 2 * (pred - 12) * 3     # slope of the loss\n    w -= lr * grad                 # step downhill\nprint(round(w, 3))   # → 4.0",
      note: ["The whole idea of training in 7 lines: predict, measure the error, step downhill, repeat.", "Training ka poora idea 7 lines mein: predict karo, galti naapo, dhalaan pe neeche kadam lo, repeat karo."]
    },
    quiz: {
      q: ["Training loss jumps up and down wildly and never settles. A likely fix is…", "Training loss bahut upar-neeche ho raha hai aur kabhi settle nahi hota. Shayad fix kya hai?"],
      options: [["Increase the learning rate", "Learning rate badhao"], ["Decrease the learning rate", "Learning rate ghatao"], ["Delete the test set", "Test set delete karo"]],
      answer: 1,
      why: ["Steps that are too big overshoot the bottom. Smaller steps settle down.", "Bahut bade kadam neeche wale point se aage nikal jaate hain. Chhote kadam settle ho jaate hain."]
    },
    remember: ["Gradient = which way is downhill. Learning = many small steps down the loss hill.", "Gradient = dhalaan kis taraf hai. Seekhna = loss ki pahaadi pe bahut saare chhote kadam neeche."]
  },

  "dl-neural-networks": {
    icon: "🕸️", mins: 8,
    title: ["Neural networks: layers that learn", "Neural networks: layers jo seekhti hain"],
    analogy: [
      "Think of a factory assembly line for recognising a handwritten digit. The first workers spot simple strokes and edges. The next combine them into curves and loops. The last workers say 'loop on top plus line below: that's a 9'. Each group of workers is a layer, and training teaches every worker what to look for.",
      "Handwritten digit pehchaanne ke liye ek factory assembly line socho. Pehle workers simple strokes aur edges pakadte hain. Agle unhe jodkar curves aur loops banaate hain. Aakhri workers kehte hain 'upar loop plus neeche line: yeh 9 hai'. Workers ka har group ek layer hai, aur training har worker ko sikhaati hai ki kya dhoondhna hai."
    ],
    explain: [
      "A neural network is layers of simple units (neurons). Each takes numbers in, multiplies them by learned weights, adds them up and passes the result through an activation function, like ReLU, that adds non-linearity. Stacking many layers ('deep' learning) lets the network learn increasingly complex patterns. Training runs forward (make a prediction), measures loss, then runs backpropagation and gradient descent to update the weights, over many passes (epochs). PyTorch is the most popular library. Convolutional networks (CNNs) specialise in images.",
      "Neural network simple units (neurons) ki layers hai. Har neuron numbers leta hai, unhe seekhe hue weights se multiply karta hai, jodta hai, aur result ko ReLU jaisi activation function se guzaarta hai, jo non-linearity jodti hai. Bahut saari layers stack karne se ('deep' learning) network zyaada complex patterns seekh paata hai. Training forward chalti hai (prediction karo), loss naapti hai, phir backpropagation aur gradient descent se weights update karti hai, kai passes (epochs) tak. PyTorch sabse popular library hai. Convolutional networks (CNNs) images mein specialist hain."
    ],
    terms: [
      ["Weight", "A learned number that controls how much an input matters.", "Seekha hua number jo decide karta hai ki input kitna matter karta hai."],
      ["Activation function", "A small function (e.g. ReLU) that lets networks learn non-straight-line patterns.", "Chhota function (jaise ReLU) jo networks ko tedhe-medhe patterns seekhne deta hai."],
      ["Epoch", "One full pass over the training data.", "Training data ka ek poora chakkar."]
    ],
    example: {
      lang: "python",
      code: "import torch.nn as nn\nmodel = nn.Sequential(\n    nn.Linear(784, 128), nn.ReLU(),   # 28×28 image → 128 features\n    nn.Linear(128, 64),  nn.ReLU(),\n    nn.Linear(64, 10)                 # scores for digits 0–9\n)",
      note: ["A small 3-layer network for handwritten digits.", "Handwritten digits ke liye ek chhota 3-layer network."]
    },
    quiz: {
      q: ["What do the 'weights' in a neural network represent?", "Neural network mein 'weights' kya represent karte hain?"],
      options: [["The size of the dataset", "Dataset ka size"], ["Learned numbers that decide how much each input matters", "Seekhe hue numbers jo decide karte hain ki har input kitna matter karta hai"], ["The GPU's memory", "GPU ki memory"]],
      answer: 1,
      why: ["Training adjusts the weights. They're what the network 'knows'.", "Training weights ko adjust karti hai. Network jo 'jaanta' hai, woh yahi weights hain."]
    },
    remember: ["Layers of weighted sums plus activations, trained by backprop.", "Weighted sums aur activations ki layers, backprop se train hoti hain."]
  },

  "dl-transformers": {
    icon: "🔦", mins: 8,
    title: ["Transformers and attention: how LLMs read", "Transformers aur attention: LLMs kaise padhte hain"],
    analogy: [
      "Read: 'The trophy didn't fit in the suitcase because it was too big.' What does 'it' mean? You automatically look back at 'trophy'. Attention lets a model do the same: for every word, it decides which other words to focus on. A transformer is built from many layers of this attention.",
      "Padho: 'Trophy suitcase mein fit nahi hui kyunki woh bahut badi thi.' 'Woh' kise bol rahe hain? Aap apne aap 'trophy' ki taraf wapas dekhte ho. Attention model ko yahi karne deta hai: har word ke liye woh decide karta hai ki baaki kin words pe focus karna hai. Transformer is attention ki bahut saari layers se bana hai."
    ],
    explain: [
      "Text is first split into tokens (word pieces) and each token becomes a vector (an embedding). In each transformer layer, self-attention lets every token gather information from every other token, weighted by relevance, so meaning depends on context ('bank' of a river vs a bank account). Stacking dozens of layers builds a deep understanding. Large language models (GPT, Claude, Llama) are giant transformers trained to predict the next token. Transformers also power modern image, speech and code models.",
      "Text pehle tokens (words ke tukde) mein toota jaata hai, aur har token ek vector (embedding) ban jaata hai. Har transformer layer mein self-attention har token ko baaki saare tokens se information lene deta hai, relevance ke hisaab se weighted, taaki matlab context pe depend kare (nadi ka 'bank' vs bank account). Darjanon layers stack karne se gehri samajh banti hai. Large language models (GPT, Claude, Llama) agla token predict karne ke liye train kiye gaye vishaal transformers hain. Modern image, speech aur code models bhi transformers pe chalte hain."
    ],
    terms: [
      ["Token", "A piece of text, roughly ¾ of an English word on average.", "Text ka tukda, English mein average ek word ka lagbhag ¾."],
      ["Self-attention", "Each token weighing how relevant every other token is.", "Har token tay karta hai ki baaki har token kitna relevant hai."],
      ["Context", "The surrounding text that shapes a word's meaning.", "Aas-paas ka text jo word ka matlab tay karta hai."]
    ],
    example: {
      lang: "text",
      code: "Sentence: \"I deposited cash at the bank\"\nAttention for 'bank' → strongest links: 'deposited' (0.41), 'cash' (0.33)\n→ model understands: bank = financial institution, not a river bank",
      note: ["Attention weights (illustrative numbers) show which words shaped the meaning.", "Attention weights (example numbers) dikhaate hain ki kin words ne matlab tay kiya."]
    },
    quiz: {
      q: ["What does attention help a transformer do?", "Attention transformer ki kya madad karta hai?"],
      options: [["Store files on disk", "Disk pe files store karna"], ["Use the context of other words to understand each word", "Har word samajhne ke liye doosre words ka context use karna"], ["Make training data smaller", "Training data chhota karna"]],
      answer: 1,
      why: ["Attention mixes in information from relevant words, so each word's meaning depends on context.", "Attention relevant words ki information milaata hai, taaki har word ka matlab context pe depend kare."]
    },
    remember: ["Tokens → vectors → many attention layers → next-token prediction.", "Tokens → vectors → bahut saari attention layers → agle token ki prediction."]
  },

  "dl-fine-tuning": {
    icon: "🎛️", mins: 7,
    title: ["Fine-tuning and LoRA: specialising a model", "Fine-tuning aur LoRA: model ko specialise karna"],
    analogy: [
      "An MBBS doctor already knows general medicine. To become a cardiologist they don't redo school. They spend a few focused years on hearts. Fine-tuning is the same: take a model that already knows language and train it a little more on your specific task. LoRA is like learning cardiology from compact notes instead of rewriting every textbook.",
      "MBBS doctor general medicine pehle se jaanta hai. Cardiologist banne ke liye woh school dobara nahi karta. Woh kuch focused saal dil pe lagaata hai. Fine-tuning bhi aisa hi hai: aisa model lo jo language pehle se jaanta hai, aur use aapke specific task pe thoda aur train karo. LoRA aisa hai jaise poori textbooks dobara likhne ki jagah compact notes se cardiology seekhna."
    ],
    explain: [
      "Pre-training a large model from scratch costs millions. Fine-tuning starts from a pre-trained open model (Llama, Mistral, Qwen) and continues training on your examples, such as support tickets with ideal replies. Full fine-tuning updates every weight, which is expensive. LoRA and other PEFT (parameter-efficient fine-tuning) methods freeze the original weights and train small add-on matrices, so you can fine-tune on a single GPU. QLoRA also compresses (quantises) the base model. Always compare against prompting and RAG first, because they're cheaper and often enough.",
      "Bade model ko zero se pre-train karna crore mein padta hai. Fine-tuning ek pre-trained open model (Llama, Mistral, Qwen) se shuru karke aapke examples pe training aage badhaata hai, jaise support tickets aur unke ideal replies. Full fine-tuning har weight update karta hai, jo mehenga hai. LoRA aur doosre PEFT (parameter-efficient fine-tuning) methods original weights ko freeze karke chhote add-on matrices train karte hain, isliye ek single GPU pe fine-tune ho jaata hai. QLoRA base model ko compress (quantise) bhi karta hai. Hamesha pehle prompting aur RAG se compare karo, kyunki woh saste hain aur aksar kaafi hote hain."
    ],
    terms: [
      ["Pre-trained model", "A model already trained on huge general data.", "Model jo pehle se bahut bade general data pe train ho chuka hai."],
      ["LoRA / PEFT", "Training small add-on weights instead of the whole model.", "Poore model ki jagah chhote add-on weights train karna."],
      ["Quantisation", "Storing weights with fewer bits to save memory.", "Memory bachaane ke liye weights ko kam bits mein store karna."]
    ],
    example: {
      lang: "python",
      code: "from peft import LoraConfig, get_peft_model\nconfig = LoraConfig(r=16, lora_alpha=32, target_modules=[\"q_proj\", \"v_proj\"])\nmodel = get_peft_model(base_model, config)\nmodel.print_trainable_parameters()\n# trainable: 0.1% of all parameters → fits on one GPU",
      note: ["Only a tiny fraction of the weights are trained.", "Weights ka sirf ek bahut chhota hissa train hota hai."]
    },
    quiz: {
      q: ["You want a model to answer from your company's latest policy documents, which change weekly. What should you try first?", "Aap chahte ho ki model company ke latest policy documents se jawaab de, jo har hafte badalte hain. Pehle kya try karoge?"],
      options: [["Fine-tune every week", "Har hafte fine-tune"], ["RAG: retrieve the documents at question time", "RAG: sawaal ke time documents retrieve karo"], ["Pre-train a new model", "Naya model pre-train karo"]],
      answer: 1,
      why: ["Fine-tuning teaches style and skills. For fresh, changing facts, RAG is cheaper and stays up to date.", "Fine-tuning style aur skills sikhaata hai. Naye, badalte facts ke liye RAG sasta hai aur up-to-date rehta hai."]
    },
    remember: ["Prompting → RAG → fine-tuning, in that order of cost.", "Cost ke order mein: prompting → RAG → fine-tuning."]
  },

  "research-papers": {
    icon: "📄", mins: 6,
    title: ["Reading and reproducing research papers", "Research papers padhna aur reproduce karna"],
    analogy: [
      "A food blogger claims a 10-minute biryani. You don't believe it until you cook it yourself with their exact steps. Reproducing a paper is the same: follow the method, run the code, and see if you get their results. That's the best proof that you truly understand it.",
      "Food blogger kehta hai 10 minute mein biryani ban jaati hai. Aap tab tak nahi maanoge jab tak unke exact steps se khud na banao. Paper reproduce karna bhi aisa hi hai: method follow karo, code chalao, aur dekho ki unke results aate hain ya nahi. Aapne sach mein samjha hai, iska yahi sabse accha saboot hai."
    ],
    explain: [
      "Don't read papers front to back on the first pass. Read the abstract, look at the figures, and read the conclusion. Ask what problem it solves and what the key idea is. On the second pass, read the method closely and note the datasets, metrics and baselines. To reproduce, start with the smallest experiment, match their settings, and log every run. If your numbers differ, investigate why: that's where real learning happens. Write up your reproduction with code on GitHub; for research roles it counts like a mini-publication.",
      "Pehli baar mein paper shuru se aakhir tak mat padho. Abstract padho, figures dekho, aur conclusion padho. Poocho: yeh kaunsi problem solve karta hai, aur key idea kya hai? Doosri baar method dhyaan se padho, aur datasets, metrics aur baselines note karo. Reproduce karne ke liye sabse chhote experiment se shuru karo, unki settings match karo, aur har run log karo. Agar aapke numbers alag aayein to wajah dhoondho: asli seekhna wahin hota hai. Apna reproduction code ke saath GitHub pe likho; research roles mein yeh ek mini-publication jaisa count hota hai."
    ],
    terms: [
      ["Abstract", "The paper's short summary: problem, idea and result.", "Paper ki chhoti summary: problem, idea aur result."],
      ["Baseline", "The previous best method the paper compares against.", "Pichhla best method jisse paper compare karta hai."],
      ["Ablation", "Removing one part to see how much it mattered.", "Ek hissa hata kar dekhna ki woh kitna zaroori tha."]
    ],
    example: {
      lang: "text",
      code: "Pass 1 (15 min):  title → abstract → figures → conclusion\nPass 2 (1–2 h):   method, datasets, metrics, baselines\nReproduce:        smallest experiment → match settings → log runs\nShare:            repo + README: 'their result vs mine, and why'",
      note: ["A repeatable routine that works for any ML paper.", "Ek repeatable routine jo kisi bhi ML paper ke liye kaam karta hai."]
    },
    quiz: {
      q: ["What should you read first when opening a new paper?", "Naya paper kholte hi sabse pehle kya padhna chahiye?"],
      options: [["The appendix", "Appendix"], ["The abstract, figures and conclusion", "Abstract, figures aur conclusion"], ["Every equation in order", "Har equation order mein"]],
      answer: 1,
      why: ["A quick first pass tells you whether the paper is worth a deep read.", "Pehla jaldi wala pass batata hai ki paper gehraai se padhne laayak hai ya nahi."]
    },
    remember: ["Skim first, then go deep, then reproduce. Reproduction is proof.", "Pehle skim, phir gehraai mein, phir reproduce. Reproduction hi saboot hai."]
  }
});

if (typeof module !== "undefined" && module.exports) module.exports = { LESSON_TOPICS };
