// Deeper lesson content, part 2: machine learning, maths and deep learning. See deep-foundations.js.
var LESSON_DEEP = Object.assign(typeof LESSON_DEEP !== "undefined" ? LESSON_DEEP : {}, {
  "ml-how-machines-learn": {
    steps: [
      ["Define what to predict (the label): will this customer cancel next month, yes or no?", "Tay karo kya predict karna hai (label): kya yeh customer agle mahine cancel karega, haan ya nahi?"],
      ["Choose the inputs (features) a person would look at: months as a customer, complaints, usage trend, plan price.", "Inputs (features) chuno jo ek insaan dekhta: kitne mahine se customer hai, complaints, usage trend, plan ki keemat."],
      ["Collect past examples where you know both the features and the real outcome.", "Purane examples ikattha karo jahan features aur asli result dono pata hon."],
      ["Train: the algorithm adjusts its internal numbers until its guesses on these examples are as close as possible to the real answers.", "Train karo: algorithm apne andar ke numbers tab tak adjust karta hai jab tak in examples pe uske guesses asli answers ke jitne paas ho sakein."],
      ["Test on examples it has never seen. Only that score tells you how it will do in real life.", "Un examples pe test karo jo usne kabhi nahi dekhe. Sirf yahi score batata hai asal zindagi mein kaisa karega."]
    ],
    mistakes: [
      ["Using features you won't have at prediction time, like 'refund issued' when predicting cancellation.", "Aise features use karna jo prediction ke time pe nahi honge, jaise cancellation predict karte waqt 'refund issued'."],
      ["Too few or unrepresentative examples. A model trained only on metro customers may fail for small towns.", "Bahut kam ya ek tarfa examples. Sirf metro customers pe train model chhote shehron ke liye fail ho sakta hai."]
    ],
    faq: [
      [["How much data do I need?", "Kitna data chahiye?"], ["It depends on the problem. Simple tabular problems can work with a few thousand rows; images or text usually need more, unless you start from a pretrained model.", "Problem pe depend karta hai. Simple tabular problems kuch hazaar rows se chal sakte hain; images ya text ko aksar zyaada chahiye, jab tak pretrained model se shuru na karo."]],
      [["What does the model actually 'learn'?", "Model asal mein kya 'seekhta' hai?"], ["Numbers called parameters or weights. Training sets them so that the features map to the right answers as often as possible.", "Numbers jinhe parameters ya weights kehte hain. Training inhe aise set karti hai ki features zyaada se zyaada baar sahi answers tak pahunchein."]]
    ]
  },

  "ml-regression-classification": {
    steps: [
      ["Ask what the answer looks like. A number (price, delivery days) means regression. A category (spam or not, which product type) means classification.", "Poochho jawaab kaisa dikhta hai. Number (keemat, delivery din) matlab regression. Category (spam ya nahi, kaunsa product type) matlab classification."],
      ["For regression, start with linear regression; measure error in real units (MAE: off by ₹1,200 on average).", "Regression ke liye linear regression se shuru karo; error asli units mein naapo (MAE: average ₹1,200 ka fark)."],
      ["For classification, start with logistic regression; it gives a probability you can threshold.", "Classification ke liye logistic regression se shuru karo; yeh probability deta hai jis pe threshold laga sakte ho."],
      ["Compare with a dumb baseline: always predict the average, or always the most common class.", "Ek seedhe baseline se compare karo: hamesha average predict karo, ya hamesha sabse common class."],
      ["Then try stronger models (random forest, gradient boosting) and keep the simplest one that clearly wins.", "Phir strong models try karo (random forest, gradient boosting) aur sabse simple jo saaf jeete use rakho."]
    ],
    mistakes: [
      ["Treating categories as numbers, like city codes 1, 2, 3, so the model thinks city 3 is 'more' than city 1. Use one hot encoding.", "Categories ko numbers maan lena, jaise city codes 1, 2, 3, to model sochta hai city 3 city 1 se 'zyaada' hai. One hot encoding use karo."],
      ["Using accuracy for regression or MAE for classification. Each type has its own metrics.", "Regression ke liye accuracy ya classification ke liye MAE use karna. Har type ke apne metrics hain."]
    ],
    faq: [
      [["Why is it called logistic 'regression' if it classifies?", "Classify karta hai to logistic 'regression' kyun kehte hain?"], ["Historical naming: it predicts a number, the probability, which is then turned into a class with a threshold.", "Purana naam hai: yeh ek number, probability, predict karta hai, jise threshold se class mein badla jaata hai."]],
      [["Can one model do both?", "Kya ek model dono kar sakta hai?"], ["Many algorithms have both versions, like decision trees and gradient boosting. You pick the version that matches your target.", "Kai algorithms ke dono versions hote hain, jaise decision trees aur gradient boosting. Target ke hisaab se version chuno."]]
    ]
  },

  "ml-train-test": {
    steps: [
      ["Split before anything else: about 70% train, 15% validation, 15% test.", "Sabse pehle split karo: lagbhag 70% train, 15% validation, 15% test."],
      ["Train on the training set only, and fit cleaning steps (like scaling) on it too.", "Sirf training set pe train karo, aur cleaning steps (jaise scaling) bhi usi pe fit karo."],
      ["Compare models and settings on the validation set.", "Models aur settings ko validation set pe compare karo."],
      ["Watch the gap: if training is much better than validation, you're overfitting. Simplify or add data.", "Fark dekho: agar training validation se kaafi behtar hai, to overfitting hai. Simple karo ya data badhao."],
      ["Use the test set once, at the end, for the number you report.", "Test set ek hi baar use karo, aakhir mein, jo number report karna hai uske liye."]
    ],
    mistakes: [
      ["Random splits for time based data. Train on the past, test on the future, like in real use.", "Time based data ke liye random split. Past pe train karo, future pe test, jaise asli use mein hota hai."],
      ["Same customer in train and test. The model memorises the customer; split by customer instead.", "Ek hi customer train aur test dono mein. Model customer ko yaad kar leta hai; customer ke hisaab se split karo."],
      ["Checking the test score again and again while tuning. It stops being an honest test.", "Tuning karte hue baar baar test score dekhna. Phir woh imaandaar test nahi rehta."]
    ],
    faq: [
      [["What is cross validation?", "Cross validation kya hai?"], ["Splitting training data into k parts and rotating which part validates. It gives a more stable estimate when data is small.", "Training data ko k hisson mein baantna aur baari baari ek hissa validation ke liye rakhna. Data kam ho to zyaada stable estimate deta hai."]],
      [["How do I fix underfitting?", "Underfitting kaise theek karun?"], ["The model is too simple: add better features, use a more powerful model, or train longer.", "Model bahut simple hai: behtar features daalo, zyaada powerful model lo, ya zyaada der train karo."]]
    ]
  },

  "ml-metrics": {
    steps: [
      ["Build the confusion matrix: true positives, false positives, false negatives, true negatives.", "Confusion matrix banao: true positives, false positives, false negatives, true negatives."],
      ["Compute precision = TP ÷ (TP + FP) and recall = TP ÷ (TP + FN).", "Precision = TP ÷ (TP + FP) aur recall = TP ÷ (TP + FN) nikalo."],
      ["Ask the business which mistake costs more: a missed fraud, or a blocked genuine customer?", "Business se poochho kaunsi galti mehengi hai: miss hua fraud, ya block hua asli customer?"],
      ["Move the threshold (0.5 is not sacred) to get the precision and recall balance you need.", "Threshold khiskao (0.5 pathar ki lakeer nahi) taaki zaroori precision aur recall ka balance mile."],
      ["Report the chosen metric on the test set, compared with the baseline.", "Chuna hua metric test set pe baseline ke saath compare karke report karo."]
    ],
    mistakes: [
      ["Celebrating high accuracy on imbalanced data. Check what the 'always no' baseline scores.", "Imbalanced data pe high accuracy ka jashn manana. Dekho 'hamesha nahi' baseline kitna score karta hai."],
      ["Picking a metric the business doesn't care about. Translate it: 'we catch 8 of 10 frauds and wrongly block 1 in 500 customers'.", "Aisa metric chunna jiski business ko parwah nahi. Translate karo: 'hum 10 mein se 8 fraud pakadte hain aur 500 mein se 1 customer galti se block karte hain'."]
    ],
    faq: [
      [["What is ROC AUC vs PR AUC?", "ROC AUC aur PR AUC kya hain?"], ["Both summarise performance over all thresholds. For rare positives, PR AUC is more informative because ROC AUC can look great even when precision is poor.", "Dono saare thresholds pe performance summarise karte hain. Rare positives ke liye PR AUC zyaada kaam ka hai kyunki ROC AUC tab bhi accha dikh sakta hai jab precision kharab ho."]],
      [["Which metrics for regression?", "Regression ke liye kaunse metrics?"], ["MAE (average size of error), RMSE (punishes big errors more) and MAPE (error in percent). Pick the one that matches how errors hurt.", "MAE (error ka average size), RMSE (bade errors ko zyaada saza) aur MAPE (percent mein error). Woh chuno jo galtiyon ke asar se match kare."]]
    ]
  },

  "ml-features": {
    steps: [
      ["Brainstorm with domain experts: what signals do they use today to decide?", "Domain experts ke saath brainstorm karo: aaj woh decide karne ke liye kaunse signals dekhte hain?"],
      ["Create ratios and differences: EMI to income ratio, change in spending vs last month.", "Ratios aur differences banao: EMI aur income ka ratio, pichhle mahine se kharch mein badlaav."],
      ["Create time features: days since last login, day of week, festival season flag.", "Time features banao: last login se kitne din, hafte ka din, festival season flag."],
      ["Encode categories (one hot or target encoding), handle missing values and scale numbers if the model needs it.", "Categories encode karo (one hot ya target encoding), missing values sambhalo aur model ko zaroorat ho to numbers scale karo."],
      ["Keep features that improve validation scores; drop the rest to keep the model simple.", "Jo features validation score sudhaarein unhe rakho; baaki hata do taaki model simple rahe."]
    ],
    mistakes: [
      ["Leakage: features calculated using future information or the answer itself.", "Leakage: future ki information ya khud answer se bane features."],
      ["Computing features differently in training and in the live app. Use one shared function or pipeline.", "Training aur live app mein features alag tarah se banana. Ek hi shared function ya pipeline use karo."]
    ],
    faq: [
      [["Do deep learning models need feature engineering?", "Kya deep learning models ko feature engineering chahiye?"], ["Less for images and text, because they learn features from raw data. For tabular business data, good features still matter a lot.", "Images aur text ke liye kam, kyunki woh raw data se features seekhte hain. Tabular business data ke liye acche features abhi bhi bahut matter karte hain."]],
      [["How do I know which features matter?", "Kaise pata chale kaunse features matter karte hain?"], ["Use feature importance or SHAP values, and test by removing a feature and seeing if validation scores drop.", "Feature importance ya SHAP values use karo, aur ek feature hata kar dekho ki validation score girta hai ya nahi."]]
    ]
  },

  "ml-trees": {
    steps: [
      ["A decision tree asks yes/no questions: is income > ₹50k? Has the customer missed a payment? Each answer leads to the next question, ending in a prediction.", "Decision tree haan/nahi sawaal poochta hai: income > ₹50k hai? Customer ne payment miss kiya? Har jawaab agle sawaal tak le jaata hai, aakhir mein prediction."],
      ["One deep tree memorises data (overfits). Limit depth or the minimum examples per leaf.", "Ek gehra tree data ratt leta hai (overfit). Depth ya har leaf ke minimum examples limit karo."],
      ["Random forest: train hundreds of trees on random samples and average their votes. More stable.", "Random forest: random samples pe sainkdon trees train karo aur unke votes ka average lo. Zyaada stable."],
      ["Gradient boosting (XGBoost, LightGBM): build small trees one after another, each fixing earlier mistakes. Usually the most accurate on tables.", "Gradient boosting (XGBoost, LightGBM): chhote trees ek ke baad ek banao, har ek pichhli galtiyaan sudhaarta hai. Tables pe aksar sabse accurate."],
      ["Tune a few key settings (number of trees, depth, learning rate) using validation data and early stopping.", "Kuch key settings (trees ki ginti, depth, learning rate) validation data aur early stopping se tune karo."]
    ],
    mistakes: [
      ["Too many boosting rounds without early stopping, which overfits.", "Early stopping ke bina bahut saare boosting rounds, jo overfit karta hai."],
      ["Trusting default feature importance blindly; it can favour features with many unique values. Cross check with SHAP or permutation importance.", "Default feature importance pe aankh band karke bharosa; yeh zyaada unique values wale features ko favour kar sakta hai. SHAP ya permutation importance se cross check karo."]
    ],
    faq: [
      [["Do trees need scaled features?", "Kya trees ko scaled features chahiye?"], ["No. Trees split on thresholds, so scaling doesn't change them. That's one reason they're easy to use.", "Nahi. Trees thresholds pe split karte hain, isliye scaling se farak nahi padta. Isiliye yeh use karne mein aasaan hain."]],
      [["Why not use deep learning for tables?", "Tables ke liye deep learning kyun nahi?"], ["On typical business tables, gradient boosting is usually as good or better, faster to train and easier to explain.", "Aam business tables pe gradient boosting aksar utna hi ya zyaada accha, train karne mein tez aur samjhaane mein aasaan hota hai."]]
    ]
  },

  "ml-training-vs-inference": {
    steps: [
      ["Training happens occasionally (daily, weekly) on lots of past data, often on powerful machines.", "Training kabhi kabhi hoti hai (daily, weekly) bahut saare purane data pe, aksar powerful machines pe."],
      ["The result is a saved model file plus its preprocessing steps, stored with a version.", "Nateeja ek saved model file aur uske preprocessing steps, version ke saath stored."],
      ["Inference uses that model to predict for new inputs, either in batches (score all customers nightly) or in real time (per request).", "Inference us model se naye inputs pe predict karta hai, ya to batch mein (raat ko saare customers score) ya real time mein (har request pe)."],
      ["Real time inference must be fast and reliable, so it runs behind an API with monitoring.", "Real time inference tez aur reliable hona chahiye, isliye yeh monitoring ke saath API ke peeche chalta hai."],
      ["Over time data changes, so you monitor results and retrain with fresh data.", "Waqt ke saath data badalta hai, isliye results monitor karo aur fresh data se retrain karo."]
    ],
    mistakes: [
      ["Saving the model without its preprocessing. Predictions break or silently go wrong in production.", "Model ko uske preprocessing ke bina save karna. Production mein predictions toot jaati hain ya chupke se galat ho jaati hain."],
      ["Building real time serving when a nightly batch would do. Batch is simpler and cheaper.", "Jab raat ka batch kaafi ho tab real time serving banana. Batch simple aur sasta hai."]
    ],
    faq: [
      [["Which costs more, training or inference?", "Kya zyaada mehenga hai, training ya inference?"], ["For most companies, inference, because it runs constantly for every user. For LLMs, inference cost is the main bill unless you train your own models.", "Zyaadatar companies ke liye inference, kyunki yeh har user ke liye lagaataar chalta hai. LLMs mein jab tak apna model train na karo, inference ka bill hi main hota hai."]],
      [["Does a model keep learning while in use?", "Kya model use hote hue seekhta rehta hai?"], ["Usually no. It's fixed until you retrain it. Online learning exists but is rarer and riskier.", "Aam taur pe nahi. Retrain karne tak woh fixed rehta hai. Online learning hoti hai par kam aur zyaada risky."]]
    ]
  },

  "math-vectors": {
    steps: [
      ["A vector is a list of numbers: a house as [3 bedrooms, 1200 sq ft, 8 km from centre].", "Vector numbers ki list hai: ek ghar jaise [3 bedrooms, 1200 sq ft, centre se 8 km]."],
      ["A matrix is a table of numbers: many houses, one row each.", "Matrix numbers ki table hai: bahut saare ghar, har ek ki ek row."],
      ["The dot product multiplies matching numbers and adds them. A model's prediction is often a dot product of features and weights.", "Dot product matching numbers ko multiply karke jodta hai. Model ka prediction aksar features aur weights ka dot product hota hai."],
      ["Matrix multiplication does many dot products at once. GPUs are fast at exactly this, which is why they power AI.", "Matrix multiplication ek saath bahut saare dot products karta hai. GPUs isi mein tez hain, isliye AI unpe chalta hai."],
      ["Cosine similarity compares the direction of two vectors. Similar meanings have similar directions, which powers semantic search.", "Cosine similarity do vectors ki direction compare karti hai. Milte julte matlab ki direction milti julti hoti hai, isi se semantic search chalta hai."]
    ],
    mistakes: [
      ["Mixing up shapes. A (3×2) matrix can only multiply something with 2 rows. Print shapes when debugging.", "Shapes mein gadbad. (3×2) matrix sirf 2 rows wali cheez se multiply ho sakti hai. Debug karte waqt shapes print karo."],
      ["Comparing vectors with very different scales (rupees vs counts) without scaling. One feature dominates distances.", "Bahut alag scale wale vectors (rupees vs counts) bina scaling compare karna. Ek feature distance pe haavi ho jaata hai."]
    ],
    faq: [
      [["How much linear algebra do I need?", "Kitni linear algebra chahiye?"], ["For most engineering roles: vectors, dot products, matrix multiplication and shapes. Research roles need much more.", "Zyaadatar engineering roles ke liye: vectors, dot products, matrix multiplication aur shapes. Research roles ko bahut zyaada chahiye."]],
      [["What is NumPy's role?", "NumPy ka kya role hai?"], ["NumPy stores vectors and matrices efficiently and does fast maths on them. Pandas and most ML libraries are built on top of it.", "NumPy vectors aur matrices ko efficiently store karta hai aur unpe tez maths karta hai. Pandas aur zyaadatar ML libraries iske upar bani hain."]]
    ]
  },

  "math-gradients": {
    steps: [
      ["Start with random weights; the model's predictions are bad.", "Random weights se shuru karo; model ke predictions kharab hote hain."],
      ["Measure how bad with a loss function (for example, average squared error).", "Loss function se naapo kitne kharab (jaise average squared error)."],
      ["Compute the gradient: for each weight, which direction makes the loss go up, and how steeply.", "Gradient nikalo: har weight ke liye, kis direction mein loss badhta hai aur kitni tezi se."],
      ["Update each weight a small step in the opposite direction: weight = weight − learning_rate × gradient.", "Har weight ko ulti direction mein chhota step do: weight = weight − learning_rate × gradient."],
      ["Repeat over many mini batches until the loss stops improving on validation data.", "Bahut saare mini batches pe repeat karo jab tak validation data pe loss sudharna band na ho."]
    ],
    mistakes: [
      ["Learning rate too high: loss jumps around or explodes. Too low: training crawls. Try a few values.", "Learning rate bahut zyaada: loss uchhalta hai ya phat jaata hai. Bahut kam: training rengti hai. Kuch values try karo."],
      ["Not plotting the loss curve. It's the quickest way to see if training is working.", "Loss curve plot na karna. Training chal rahi hai ya nahi dekhne ka sabse tez tarika yahi hai."]
    ],
    faq: [
      [["Do I need to calculate gradients by hand?", "Kya gradients haath se nikalne padenge?"], ["No. Frameworks like PyTorch compute them automatically (autograd). Understanding the idea is what matters.", "Nahi. PyTorch jaise frameworks inhe khud nikaalte hain (autograd). Idea samajhna zaroori hai."]],
      [["What is Adam?", "Adam kya hai?"], ["An optimiser that adapts the step size for each weight using recent gradients. It's a strong default for neural networks.", "Ek optimiser jo recent gradients se har weight ka step size adjust karta hai. Neural networks ke liye mazboot default hai."]]
    ]
  },

  "dl-neural-networks": {
    steps: [
      ["Input layer: the raw numbers (pixels, word embeddings, features).", "Input layer: raw numbers (pixels, word embeddings, features)."],
      ["Hidden layers: each neuron computes a weighted sum of its inputs and passes it through an activation like ReLU, so the network can learn curves, not just straight lines.", "Hidden layers: har neuron apne inputs ka weighted sum nikaalta hai aur ReLU jaise activation se guzaarta hai, taaki network sirf seedhi line nahi, curves bhi seekh sake."],
      ["Output layer: a number for regression, or probabilities (softmax) for classes.", "Output layer: regression ke liye number, ya classes ke liye probabilities (softmax)."],
      ["Training: forward pass to predict, loss to measure error, backpropagation to compute gradients, optimiser to update weights.", "Training: predict karne ke liye forward pass, error naapne ke liye loss, gradients ke liye backpropagation, weights update karne ke liye optimiser."],
      ["Regularise with dropout, weight decay and early stopping, and use pretrained models whenever possible.", "Dropout, weight decay aur early stopping se regularise karo, aur jab ho sake pretrained models use karo."]
    ],
    mistakes: [
      ["Training a big network from scratch on a small dataset. Fine tune a pretrained model instead.", "Chhote dataset pe bada network shuru se train karna. Iske bajaye pretrained model fine tune karo."],
      ["Not normalising inputs. Neural networks train poorly when inputs have very different scales.", "Inputs normalise na karna. Inputs ke scale bahut alag hon to neural networks theek se train nahi hote."]
    ],
    faq: [
      [["Why are they called 'deep'?", "Inhe 'deep' kyun kehte hain?"], ["Because they have many layers stacked. Each layer builds more abstract features from the previous one: edges, shapes, then objects.", "Kyunki inme bahut saari layers ek ke upar ek hoti hain. Har layer pichhli se zyaada abstract features banati hai: edges, shapes, phir objects."]],
      [["PyTorch or TensorFlow?", "PyTorch ya TensorFlow?"], ["PyTorch is the most common choice in research and most new projects today. The concepts transfer either way.", "Aaj research aur zyaadatar naye projects mein PyTorch sabse common hai. Concepts dono mein kaam aate hain."]]
    ]
  },

  "dl-transformers": {
    steps: [
      ["Split text into tokens and turn each token into a vector (embedding), plus information about its position.", "Text ko tokens mein todo aur har token ko vector (embedding) banao, saath mein uski position ki jaankari."],
      ["Self attention: each token compares itself with every other token (query vs keys) to decide which ones matter for its meaning.", "Self attention: har token khud ko baaki har token se compare karta hai (query vs keys) yeh tay karne ke liye ki uske matlab ke liye kaunse zaroori hain."],
      ["It then mixes in information from the important tokens (values). 'Bank' near 'river' becomes different from 'bank' near 'loan'.", "Phir zaroori tokens ki information (values) mila leta hai. 'River' ke paas wala 'bank' 'loan' ke paas wale 'bank' se alag ban jaata hai."],
      ["Stack many such layers, each with attention and a small feed forward network, connected by residuals and normalisation.", "Aisi bahut saari layers stack karo, har ek mein attention aur chhota feed forward network, residuals aur normalisation se jude."],
      ["For an LLM, the final layer predicts the next token. Generating text repeats this one token at a time.", "LLM ke liye aakhri layer agla token predict karti hai. Text generate karna yahi ek ek token karke repeat karta hai."]
    ],
    mistakes: [
      ["Thinking attention cost is small. It grows with the square of the text length, which is why long contexts are expensive.", "Yeh sochna ki attention ka kharch chhota hai. Yeh text ki lambai ke square ke saath badhta hai, isliye lambe contexts mehenge hain."],
      ["Confusing training (learning weights) with prompting (using a trained model). Most product work is the second.", "Training (weights seekhna) aur prompting (trained model use karna) ko mix karna. Zyaadatar product kaam doosra wala hai."]
    ],
    faq: [
      [["What is multi head attention?", "Multi head attention kya hai?"], ["Several attention mechanisms in parallel, each free to focus on different relationships, like grammar in one head and meaning in another.", "Kai attention mechanisms ek saath, har ek alag rishton pe dhyaan de sakta hai, jaise ek head grammar pe aur doosra matlab pe."]],
      [["Are transformers only for text?", "Kya transformers sirf text ke liye hain?"], ["No. They power image, audio, video and multimodal models too, by turning those inputs into tokens as well.", "Nahi. Image, audio, video aur multimodal models bhi inhi se chalte hain, un inputs ko bhi tokens mein badal kar."]]
    ]
  },

  "dl-fine-tuning": {
    steps: [
      ["First try prompting and RAG. Fine tune only if you need a consistent style, format or behaviour they can't give.", "Pehle prompting aur RAG try karo. Fine tune tabhi karo jab aisa consistent style, format ya behaviour chahiye jo woh na de sakein."],
      ["Collect a few hundred to a few thousand high quality examples of input and ideal output.", "Input aur ideal output ke kuch sau se kuch hazaar high quality examples ikattha karo."],
      ["Choose a base model and use LoRA, so you train small adapter weights instead of the whole model.", "Base model chuno aur LoRA use karo, taaki poore model ke bajaye chhote adapter weights train hon."],
      ["Train for a few epochs, watching validation loss to avoid overfitting.", "Kuch epochs train karo, overfitting se bachne ke liye validation loss dekhte raho."],
      ["Evaluate against the base model on your eval set before using it. Keep the adapter versioned.", "Use karne se pehle apne eval set pe base model ke against evaluate karo. Adapter ko versioned rakho."]
    ],
    mistakes: [
      ["Fine tuning to add facts. It's unreliable for knowledge; RAG is better for that.", "Facts jodne ke liye fine tuning. Knowledge ke liye yeh unreliable hai; uske liye RAG behtar hai."],
      ["Low quality or inconsistent training examples. The model copies your mistakes faithfully.", "Low quality ya inconsistent training examples. Model aapki galtiyaan bhi wafaadaari se copy karta hai."]
    ],
    faq: [
      [["How much does fine tuning cost?", "Fine tuning kitne ki padti hai?"], ["With LoRA on a small open model, it can run on a single GPU for a few hours. Hosted fine tuning APIs charge per training token.", "Chhote open model pe LoRA ke saath yeh ek GPU pe kuch ghanton mein ho sakti hai. Hosted fine tuning APIs training token ke hisaab se charge karti hain."]],
      [["What is QLoRA?", "QLoRA kya hai?"], ["LoRA on a base model stored in 4 bit precision, which cuts memory so large models can be fine tuned on modest GPUs.", "4 bit precision mein stored base model pe LoRA, jo memory kam karta hai taaki bade models chhote GPUs pe fine tune ho sakein."]]
    ]
  },

  "research-papers": {
    steps: [
      ["First pass (10 minutes): read the title, abstract, figures and conclusion. What problem, what idea, what result?", "Pehla pass (10 minute): title, abstract, figures aur conclusion padho. Kya problem, kya idea, kya result?"],
      ["Second pass: read the method carefully and write the core idea in three sentences of your own.", "Doosra pass: method dhyaan se padho aur core idea apne teen sentences mein likho."],
      ["Check the experiments: which datasets, which baselines, how big is the gain, and are there ablations?", "Experiments check karo: kaunse datasets, kaunse baselines, gain kitna bada hai, aur ablations hain ya nahi?"],
      ["Reproduce the smallest experiment, using official code if available, and compare your numbers.", "Sabse chhota experiment reproduce karo, official code ho to use karke, aur apne numbers compare karo."],
      ["Write a short blog post or notes: what worked, what didn't, what you'd try next.", "Chhota blog post ya notes likho: kya chala, kya nahi, aage kya try karoge."]
    ],
    mistakes: [
      ["Reading every paper start to finish. Skim many, read a few deeply.", "Har paper shuru se aakhir tak padhna. Bahut saare skim karo, kuch gehraai se padho."],
      ["Trusting a result from one run. Check variance across random seeds before believing small gains.", "Ek run ke result pe bharosa. Chhote gains maanne se pehle alag random seeds pe variance dekho."]
    ],
    faq: [
      [["Where do I find good papers?", "Acche papers kahan milenge?"], ["arXiv for preprints, conference proceedings (NeurIPS, ICML, ACL), and curated lists or newsletters that summarise important work.", "Preprints ke liye arXiv, conference proceedings (NeurIPS, ICML, ACL), aur curated lists ya newsletters jo important kaam summarise karte hain."]],
      [["The maths is too hard. What do I do?", "Maths bahut mushkil hai. Kya karun?"], ["Skip it on the first pass, understand the idea from figures and code, then return to the equations one at a time with a notebook.", "Pehle pass mein chhod do, idea figures aur code se samjho, phir notebook ke saath ek ek equation pe wapas aao."]]
    ]
  }
});

if (typeof module !== "undefined" && module.exports) module.exports = { LESSON_DEEP };
