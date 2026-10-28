// AI for Kids (ages 5+): six short levels with Robo the robot. Each level has a tiny story,
// a game, a fun fact and a badge. Text is [English, Hinglish] and written to be read aloud
// (the Listen button reads it, so children who can't read yet can play with a grown-up nearby).
// Game types (kids.js renders them):
//   sort    tap 🤖 "uses AI" or 🔧 "no AI" for each card
//   teach   label training examples, then Robo guesses new ones from what it was taught
//   pattern pick what comes next in a sequence
//   match   pair each AI helper with its job
//   prompt  pick the clearer instruction for the AI
//   safe    yes or no questions about using AI wisely and safely
var KIDS = (function () {
  const levels = [
    {
      id: "what-is-ai", icon: "🤖", color: "#ff8a3d",
      title: ["What is AI?", "AI kya hai?"],
      tagline: ["Meet Robo and find AI around you", "Robo se milo aur apne aas paas AI dhoondho"],
      story: [
        ["Hi! I'm Robo 🤖. I'm a computer helper.", "Hi! Main Robo hoon 🤖. Main ek computer helper hoon."],
        ["Most computers only do exactly what people tell them, one step at a time. A calculator always adds the same way.", "Zyaadatar computers sirf wahi karte hain jo log unhe bolte hain, ek ek step karke. Calculator hamesha ek hi tarah jodta hai."],
        ["AI is a special kind of computer brain that can learn, a little bit like you! When you see lots of cats, you learn what a cat looks like. AI also learns by looking at lots and lots of examples.", "AI ek special computer dimaag hai jo seekh sakta hai, thoda thoda aapki tarah! Jab aap bahut saari billiyan dekhte ho, aap seekh jaate ho ki billi kaisi dikhti hai. AI bhi bahut saare examples dekhkar seekhta hai."],
        ["AI is hiding in many things you use: the phone that opens when it sees your face, the speaker that answers your questions, and the app that suggests cartoons you might like.", "AI bahut si cheezon mein chhupa hai: phone jo aapka chehra dekhkar khul jaata hai, speaker jo aapke sawaalon ka jawaab deta hai, aur app jo aapko cartoons suggest karta hai."]
      ],
      fact: ["The words AI mean Artificial Intelligence: artificial means made by people, and intelligence means being smart.", "AI ka matlab hai Artificial Intelligence: artificial matlab insaan ka banaya hua, aur intelligence matlab samajhdaari."],
      game: {
        type: "sort",
        prompt: ["Does it use AI? Tap 🤖 if it can learn, or 🔧 if it just follows rules.", "Kya isme AI hai? Agar yeh seekh sakta hai to 🤖 dabao, agar sirf rules follow karta hai to 🔧."],
        yes: ["Uses AI", "AI hai"], no: ["No AI", "AI nahi"],
        items: [
          { e: "🗣️", name: ["A voice assistant that answers questions", "Voice assistant jo sawaalon ka jawaab deta hai"], ai: true, why: ["It understands your voice and finds an answer. That's AI!", "Yeh aapki awaaz samajhta hai aur jawaab dhoondhta hai. Yeh AI hai!"] },
          { e: "🥄", name: ["A spoon", "Chammach"], ai: false, why: ["A spoon can't learn anything. It just helps you eat!", "Chammach kuch nahi seekh sakta. Bas khaane mein madad karta hai!"] },
          { e: "📱", name: ["A phone that unlocks when it sees your face", "Phone jo aapka chehra dekhkar khulta hai"], ai: true, why: ["It learned what your face looks like. That's AI!", "Isne seekha ki aapka chehra kaisa dikhta hai. Yeh AI hai!"] },
          { e: "🧮", name: ["A calculator", "Calculator"], ai: false, why: ["A calculator follows fixed maths rules. It never learns anything new.", "Calculator maths ke fixed rules follow karta hai. Woh kabhi kuch naya nahi seekhta."] },
          { e: "📺", name: ["A video app that suggests cartoons", "Video app jo cartoons suggest karta hai"], ai: true, why: ["It learns what you like to watch and suggests more. That's AI!", "Yeh seekhta hai aapko kya dekhna pasand hai aur aur bhi suggest karta hai. Yeh AI hai!"] },
          { e: "⚽", name: ["A football", "Football"], ai: false, why: ["A football is great fun, but it can't think or learn.", "Football bahut mazedaar hai, par yeh soch ya seekh nahi sakti."] },
          { e: "🗺️", name: ["A map app that finds the fastest way", "Map app jo sabse tez raasta dhoondhta hai"], ai: true, why: ["It learns where the traffic is and picks a faster road. That's AI!", "Yeh seekhta hai traffic kahan hai aur tez raasta chunta hai. Yeh AI hai!"] },
          { e: "💡", name: ["A light switch", "Light ka switch"], ai: false, why: ["A switch only goes on and off. No learning there!", "Switch sirf on aur off hota hai. Isme koi seekhna nahi!"] }
        ]
      },
      remember: ["AI is a computer brain that learns from examples.", "AI ek computer dimaag hai jo examples se seekhta hai."],
      badge: { e: "🔍", name: ["AI Explorer", "AI Explorer"] }
    },
    {
      id: "how-ai-learns", icon: "🍎", color: "#2fb36c",
      title: ["How does AI learn?", "AI kaise seekhta hai?"],
      tagline: ["Be Robo's teacher!", "Robo ke teacher bano!"],
      story: [
        ["Robo wants to learn what a fruit is. Can you be Robo's teacher?", "Robo seekhna chahta hai ki fruit kya hota hai. Kya aap Robo ke teacher banoge?"],
        ["A good teacher shows examples and says the right answer: this is a fruit, this is not a fruit.", "Accha teacher examples dikhata hai aur sahi jawaab batata hai: yeh fruit hai, yeh fruit nahi hai."],
        ["After seeing enough examples, Robo can make a guess about new things it has never seen before.", "Kaafi examples dekhne ke baad Robo un nayi cheezon ke baare mein bhi andaaza laga sakta hai jo usne pehle kabhi nahi dekhi."],
        ["But if the teacher makes a mistake, Robo learns the mistake too! That's why AI needs lots of good, correct examples.", "Lekin agar teacher galti kare, to Robo galti bhi seekh leta hai! Isiliye AI ko bahut saare acche, sahi examples chahiye."]
      ],
      fact: ["Real AI often learns from millions of examples. A photo app may look at millions of cat photos before it can spot a cat!", "Asli AI aksar laakhon examples se seekhta hai. Ek photo app billi pehchaanne se pehle laakhon billi ki photos dekh sakta hai!"],
      game: {
        type: "teach",
        prompt: ["Teach Robo! Tap 🍓 Fruit or 🚫 Not fruit for each picture.", "Robo ko sikhao! Har picture ke liye 🍓 Fruit ya 🚫 Not fruit dabao."],
        yes: ["Fruit", "Fruit"], no: ["Not fruit", "Fruit nahi"],
        testPrompt: ["Now Robo will guess some new pictures, using what you taught. Let's see!", "Ab Robo nayi pictures ka andaaza lagayega, jo aapne sikhaya uske hisaab se. Dekhte hain!"],
        train: [
          { e: "🍎", name: ["Apple", "Seb"], fruit: true, family: "apple" },
          { e: "🥕", name: ["Carrot", "Gaajar"], fruit: false, family: "veg" },
          { e: "🍌", name: ["Banana", "Kela"], fruit: true, family: "banana" },
          { e: "🚗", name: ["Car", "Gaadi"], fruit: false, family: "vehicle" },
          { e: "🍇", name: ["Grapes", "Angoor"], fruit: true, family: "berry" },
          { e: "🧸", name: ["Teddy bear", "Teddy bear"], fruit: false, family: "toy" }
        ],
        test: [
          { e: "🍏", name: ["Green apple", "Hara seb"], fruit: true, family: "apple" },
          { e: "🚌", name: ["Bus", "Bus"], fruit: false, family: "vehicle" },
          { e: "🫐", name: ["Blueberries", "Blueberries"], fruit: true, family: "berry" },
          { e: "🪀", name: ["Yo-yo toy", "Yo-yo khilauna"], fruit: false, family: "toy" }
        ]
      },
      remember: ["AI learns from examples, so the examples must be correct.", "AI examples se seekhta hai, isliye examples sahi hone chahiye."],
      badge: { e: "🧑‍🏫", name: ["Robo's Teacher", "Robo ke Teacher"] }
    },
    {
      id: "patterns", icon: "🧩", color: "#7b61ff",
      title: ["AI loves patterns", "AI ko patterns pasand hain"],
      tagline: ["Spot what comes next", "Batao aage kya aayega"],
      story: [
        ["A pattern is something that repeats, like day and night, or red, blue, red, blue.", "Pattern woh cheez hai jo baar baar aati hai, jaise din aur raat, ya red, blue, red, blue."],
        ["AI is a super pattern finder. It looks at lots of information and notices what usually comes next.", "AI ek super pattern dhoondhne wala hai. Woh bahut saari jaankari dekhta hai aur notice karta hai ki aksar aage kya aata hai."],
        ["That's how your phone guesses the next word when you type a message, and how a music app guesses the next song you'll like.", "Isi tarah aapka phone message type karte waqt agla shabd guess karta hai, aur music app guess karta hai ki aapko agla kaunsa gaana pasand aayega."]
      ],
      fact: ["Chatbots like ChatGPT work by guessing the next word again and again, very, very fast!", "ChatGPT jaise chatbots agla shabd baar baar guess karke kaam karte hain, bahut hi tezi se!"],
      game: {
        type: "pattern",
        prompt: ["What comes next? Tap the right answer.", "Aage kya aayega? Sahi jawaab dabao."],
        rounds: [
          { seq: ["🔴", "🔵", "🔴", "🔵", "🔴"], options: ["🔵", "🔴", "🟢"], answer: 0 },
          { seq: ["🐶", "🐱", "🐶", "🐱", "🐶"], options: ["🐶", "🐭", "🐱"], answer: 2 },
          { seq: ["☀️", "🌙", "☀️", "🌙", "☀️"], options: ["☀️", "🌙", "⭐"], answer: 1 },
          { seq: ["1", "2", "3", "4", "5"], options: ["7", "6", "5"], answer: 1 },
          { seq: ["🍎", "🍎", "🍌", "🍎", "🍎"], options: ["🍌", "🍎", "🍇"], answer: 0 },
          { seq: ["🌱", "🌿", "🌳", "🌱", "🌿"], options: ["🌱", "🍂", "🌳"], answer: 2 }
        ]
      },
      remember: ["AI finds patterns in information to guess what comes next.", "AI jaankari mein patterns dhoondhta hai taaki guess kar sake aage kya aayega."],
      badge: { e: "🧩", name: ["Pattern Pro", "Pattern Pro"] }
    },
    {
      id: "ai-helpers", icon: "🦸", color: "#1e9bd7",
      title: ["AI helpers all around us", "Humare aas paas AI helpers"],
      tagline: ["Match each helper to its job", "Har helper ko uske kaam se milao"],
      story: [
        ["AI helpers are everywhere, helping people every day.", "AI helpers har jagah hain, roz logon ki madad karte hain."],
        ["Some help doctors look at X-ray pictures. Some help farmers know when plants need water. Some help cars stop safely.", "Kuch doctors ki X-ray pictures dekhne mein madad karte hain. Kuch farmers ko batate hain ki paudhon ko kab paani chahiye. Kuch gaadiyon ko safely rokne mein madad karte hain."],
        ["AI doesn't replace people. It's a helper that makes people faster and better at their jobs.", "AI logon ki jagah nahi leta. Yeh ek helper hai jo logon ko unke kaam mein tez aur behtar banata hai."]
      ],
      fact: ["Some AI can help find animals in forest camera photos, so people can count and protect tigers!", "Kuch AI jungle ke camera photos mein jaanwar dhoondhne mein madad karta hai, taaki log tigers gin sakein aur unki raksha kar sakein!"],
      game: {
        type: "match",
        prompt: ["Tap a helper, then tap the job it does.", "Ek helper dabao, phir uska kaam dabao."],
        pairs: [
          { e: "🗺️", name: ["Map app", "Map app"], job: ["Finds the fastest way home", "Ghar ka sabse tez raasta dhoondhta hai"] },
          { e: "🎵", name: ["Music app", "Music app"], job: ["Suggests songs you may like", "Aapko pasand aane wale gaane suggest karta hai"] },
          { e: "🩺", name: ["Doctor's AI", "Doctor ka AI"], job: ["Helps spot illness in X-ray pictures", "X-ray pictures mein bimaari dhoondhne mein madad karta hai"] },
          { e: "🌾", name: ["Farm AI", "Kheti ka AI"], job: ["Tells farmers when plants need water", "Farmers ko batata hai paudhon ko kab paani chahiye"] },
          { e: "🗣️", name: ["Translator", "Translator"], job: ["Turns Hindi words into English", "Hindi shabdon ko English mein badalta hai"] },
          { e: "🚗", name: ["Smart car", "Smart car"], job: ["Helps the car stop if something is in front", "Saamne kuch ho to gaadi rokne mein madad karta hai"] }
        ]
      },
      remember: ["AI is a helper that makes people better at their jobs.", "AI ek helper hai jo logon ko unke kaam mein behtar banata hai."],
      badge: { e: "🦸", name: ["Helper Finder", "Helper Finder"] }
    },
    {
      id: "talking-to-ai", icon: "💬", color: "#e2467a",
      title: ["Talking to AI", "AI se baat karna"],
      tagline: ["Ask clear questions, get great answers", "Saaf sawaal poochho, badhiya jawaab pao"],
      story: [
        ["Some AI can talk with you. It's called a chatbot. You type or say something, and it answers.", "Kuch AI aapse baat kar sakta hai. Use chatbot kehte hain. Aap kuch likhte ya bolte ho, aur woh jawaab deta hai."],
        ["AI does its best work when you ask clearly. If you say draw an animal, it could draw anything!", "AI tab sabse accha kaam karta hai jab aap saaf poochho. Agar aap kaho ek jaanwar banao, to woh kuch bhi bana sakta hai!"],
        ["But if you say draw a happy orange cat sleeping on a blue pillow, AI knows exactly what you want.", "Lekin agar aap kaho ek khush orange billi banao jo neele takiye pe so rahi hai, to AI ko bilkul pata hai aapko kya chahiye."],
        ["Always use chatbots with a grown-up nearby.", "Chatbot hamesha kisi bade ke saath hi use karo."]
      ],
      fact: ["Telling AI clearly what you want has a special name: prompting. Grown-up engineers practise it too!", "AI ko saaf batana ki aapko kya chahiye, iska ek special naam hai: prompting. Bade engineers bhi iski practice karte hain!"],
      game: {
        type: "prompt",
        prompt: ["Which question will help AI give you what you want?", "Kaunsa sawaal AI ko wahi dene mein madad karega jo aapko chahiye?"],
        rounds: [
          { goal: ["You want a picture of a red car on a road.", "Aapko sadak pe laal gaadi ki picture chahiye."], options: [["Draw something", "Kuch bana do"], ["Draw a red car driving on a road", "Sadak pe chalti laal gaadi banao"]], answer: 1, result: "🚗🛣️" },
          { goal: ["You want a short story about a brave puppy.", "Aapko ek bahadur puppy ki chhoti kahani chahiye."], options: [["Tell me a short story about a brave puppy who saves a kitten", "Ek bahadur puppy ki chhoti kahani sunao jo billi ke bachche ko bachata hai"], ["Tell me a story", "Kahani sunao"]], answer: 0, result: "🐶🦸🐱" },
          { goal: ["You need help with a maths sum: 23 + 15.", "Aapko maths ke sawaal mein madad chahiye: 23 + 15."], options: [["Help me with maths", "Maths mein madad karo"], ["Show me step by step how to add 23 and 15", "Step by step dikhao 23 aur 15 kaise jodte hain"]], answer: 1, result: "2️⃣3️⃣➕1️⃣5️⃣🟰3️⃣8️⃣" },
          { goal: ["You want ideas for a birthday party with a space theme.", "Aapko space theme wali birthday party ke ideas chahiye."], options: [["Give me 5 fun ideas for a space themed birthday party for kids", "Bachchon ki space theme birthday party ke 5 mazedaar ideas do"], ["Party", "Party"]], answer: 0, result: "🚀🎂🪐🎈" }
        ]
      },
      remember: ["Clear questions help AI give better answers.", "Saaf sawaal AI ko behtar jawaab dene mein madad karte hain."],
      badge: { e: "💬", name: ["Question Master", "Question Master"] }
    },
    {
      id: "safe-and-smart", icon: "🛡️", color: "#f2b705",
      title: ["Be smart and safe with AI", "AI ke saath smart aur safe raho"],
      tagline: ["Robo can make mistakes too", "Robo bhi galti kar sakta hai"],
      story: [
        ["AI is clever, but it is not always right. Sometimes it makes up answers that sound true but are wrong.", "AI hoshiyaar hai, par hamesha sahi nahi hota. Kabhi kabhi woh aise jawaab bana deta hai jo sahi lagte hain par galat hote hain."],
        ["So be a detective 🕵️: check important answers with a book, your teacher or a parent.", "Isliye detective bano 🕵️: zaroori jawaab kitaab, teacher ya mummy papa se check karo."],
        ["Keep your secrets safe. Never tell an AI your home address, your school's name, your phone number or any password.", "Apne secrets safe rakho. AI ko kabhi apna ghar ka pata, school ka naam, phone number ya koi password mat batao."],
        ["AI should help you think, not do all your thinking. Use it to understand your homework, not to copy the answers!", "AI aapko sochne mein madad kare, aapki jagah na soche. Homework samajhne ke liye use karo, jawaab copy karne ke liye nahi!"]
      ],
      fact: ["When AI makes up something that isn't true, grown-ups call it a hallucination. Even very smart AI does it sometimes.", "Jab AI kuch aisa bana deta hai jo sach nahi hai, to bade log ise hallucination kehte hain. Bahut smart AI bhi kabhi kabhi aisa karta hai."],
      game: {
        type: "safe",
        prompt: ["Yes or no? Tap your answer.", "Haan ya nahi? Apna jawaab dabao."],
        yes: ["Yes", "Haan"], no: ["No", "Nahi"],
        items: [
          { e: "☀️", q: ["Robo says the Sun goes around the Earth. Should you believe it without checking?", "Robo kehta hai Sooraj Dharti ke chakkar lagata hai. Kya bina check kiye maan loge?"], answer: false, why: ["No! The Earth goes around the Sun. Always check surprising answers.", "Nahi! Dharti Sooraj ke chakkar lagati hai. Hairaan karne wale jawaab hamesha check karo."] },
          { e: "🏠", q: ["A chatbot asks for your home address. Should you tell it?", "Chatbot aapke ghar ka pata poochta hai. Kya batana chahiye?"], answer: false, why: ["No! Your address is private. Tell a grown-up if any app asks for it.", "Nahi! Aapka pata private hai. Agar koi app pooche to kisi bade ko batao."] },
          { e: "👩‍🏫", q: ["Can you ask a grown-up to check what AI tells you?", "Kya aap AI ki baat kisi bade se check karwa sakte ho?"], answer: true, why: ["Yes! Checking with a grown-up is a super smart move.", "Haan! Bade se check karwana bahut smart kaam hai."] },
          { e: "🔑", q: ["Is it OK to share your password with an AI?", "Kya AI ko apna password batana theek hai?"], answer: false, why: ["No! Passwords are secret. Never share them with apps or chatbots.", "Nahi! Password secret hote hain. Apps ya chatbots ko kabhi mat batao."] },
          { e: "🤖", q: ["Can AI be wrong sometimes?", "Kya AI kabhi kabhi galat ho sakta hai?"], answer: true, why: ["Yes! AI makes mistakes, just like people do.", "Haan! AI bhi galtiyaan karta hai, bilkul logon ki tarah."] },
          { e: "📚", q: ["Is it better to use AI to understand your homework than to copy its answer?", "Kya AI se homework samajhna jawaab copy karne se behtar hai?"], answer: true, why: ["Yes! Understanding helps your brain grow. Copying doesn't.", "Haan! Samajhne se dimaag badhta hai. Copy karne se nahi."] }
        ]
      },
      remember: ["Check AI's answers, and keep your private things private.", "AI ke jawaab check karo, aur apni private cheezein private rakho."],
      badge: { e: "🛡️", name: ["Safety Hero", "Safety Hero"] }
    }
  ];

  const why = [
    ["When you grow up, AI will be part of many jobs: doctors, farmers, artists, teachers and even astronauts use it.", "Jab aap bade hoge, AI bahut saari jobs ka hissa hoga: doctors, farmers, artists, teachers aur astronauts bhi ise use karte hain."],
    ["Learning AI helps you be a creator, not just a user. You can build your own games, robots and helpers!", "AI seekhne se aap sirf use karne wale nahi, banane wale bante ho. Aap apne games, robots aur helpers bana sakte ho!"],
    ["It makes you a great problem solver: you learn to think in steps, spot patterns and check answers.", "Isse aap problem solve karne mein badhiya bante ho: steps mein sochna, patterns dhoondhna aur jawaab check karna seekhte ho."],
    ["You'll know how to use AI safely and wisely, which is a superpower for life.", "Aap AI ko safely aur samajhdaari se use karna jaanoge, jo zindagi bhar ki superpower hai."]
  ];

  // Real, child-friendly next steps (all free) for older kids with a grown-up.
  const nextSteps = [
    ["Teachable Machine", "https://teachablemachine.withgoogle.com/", ["Teach a computer to recognise your own pictures and sounds, in the browser.", "Browser mein computer ko apni pictures aur awaazein pehchaanna sikhao."]],
    ["Quick, Draw!", "https://quickdraw.withgoogle.com/", ["Doodle and watch an AI guess what you're drawing.", "Doodle banao aur dekho AI kaise guess karta hai aap kya bana rahe ho."]],
    ["Scratch", "https://scratch.mit.edu/", ["Make your own games and stories with coding blocks.", "Coding blocks se apne games aur kahaniyaan banao."]],
    ["Code.org AI lessons", "https://code.org/ai", ["Free AI activities and videos made for students.", "Students ke liye bani free AI activities aur videos."]]
  ];

  const parents = [
    ["Ages 5 to 7: play together. Press 🔊 Listen so the story is read aloud, and talk about each answer.", "5 se 7 saal: saath mein khelo. 🔊 Suno dabao taaki kahani padh kar sunayi jaaye, aur har jawaab pe baat karo."],
    ["Ages 8 to 12: children can play alone, then try the next steps below with you.", "8 se 12 saal: bachche akele khel sakte hain, phir aapke saath neeche diye next steps try karein."],
    ["Each level takes about 5 minutes. There's no sign up, no ads, and nothing leaves your browser.", "Har level lagbhag 5 minute ka hai. Koi sign up nahi, koi ads nahi, aur kuch bhi browser se bahar nahi jaata."],
    ["The safety level teaches children not to share personal details with chatbots and to check answers with an adult.", "Safety level bachchon ko sikhata hai ki chatbots ko personal details na batayein aur jawaab kisi bade se check karein."]
  ];

  return { levels, why, nextSteps, parents };
})();

if (typeof module !== "undefined" && module.exports) module.exports = { KIDS };
