// Deeper lesson content, part 3: generative AI and LLM applications. See deep-foundations.js.
var LESSON_DEEP = Object.assign(typeof LESSON_DEEP !== "undefined" ? LESSON_DEEP : {}, {
  "llm-what": {
    steps: [
      ["Your text is split into tokens (pieces of words). \"Unbelievable\" might become \"un\", \"believ\", \"able\".", "Aapka text tokens (shabdon ke tukde) mein toota jaata hai. \"Unbelievable\" ban sakta hai \"un\", \"believ\", \"able\"."],
      ["Everything the model sees at once, your instructions, documents, chat history and its own answer, must fit in the context window.", "Model ek saath jo kuch dekhta hai, aapke instructions, documents, chat history aur uska khud ka jawaab, sab context window mein fit hona chahiye."],
      ["The model predicts a probability for every possible next token, picks one, appends it, and repeats.", "Model har mumkin agle token ki probability nikaalta hai, ek chunta hai, jodta hai, aur repeat karta hai."],
      ["Temperature controls how adventurous that pick is: low for facts and formats, higher for brainstorming.", "Temperature tay karta hai woh chunaav kitna adventurous ho: facts aur formats ke liye kam, brainstorming ke liye zyaada."],
      ["It has no memory between API calls. Chat apps resend the conversation each time, which is why long chats cost more.", "API calls ke beech isko kuch yaad nahi rehta. Chat apps har baar poori baatcheet dobara bhejti hain, isliye lambi chats mehengi padti hain."]
    ],
    mistakes: [
      ["Treating answers as facts. LLMs produce plausible text; verify anything important or ground it with sources.", "Jawaabon ko facts maan lena. LLMs sahi lagne wala text banate hain; zaroori cheezein verify karo ya sources se ground karo."],
      ["Ignoring the knowledge cutoff. A model doesn't know events after its training data unless you give it that information.", "Knowledge cutoff ignore karna. Model training data ke baad ki baatein nahi jaanta jab tak aap woh jaankari na do."]
    ],
    faq: [
      [["How many tokens is a page of text?", "Ek page text mein kitne tokens?"], ["Roughly 500 to 700 tokens for a page of English. Hindi and other scripts often use more tokens for the same meaning.", "English ke ek page mein lagbhag 500 se 700 tokens. Hindi aur doosri scripts aksar same matlab ke liye zyaada tokens leti hain."]],
      [["Why does the same prompt give different answers?", "Same prompt alag jawaab kyun deta hai?"], ["Because a token is sampled from probabilities. Lower the temperature (towards 0) for more consistent output.", "Kyunki token probabilities se sample hota hai. Zyaada consistent output ke liye temperature kam karo (0 ki taraf)."]]
    ]
  },

  "llm-prompting": {
    steps: [
      ["State the role and the goal: \"You are a support assistant for a bank. Answer customer questions about cards.\"", "Role aur goal batao: \"You are a support assistant for a bank. Answer customer questions about cards.\""],
      ["Give the context the model needs: the policy text, the customer's plan, today's date.", "Model ko jo context chahiye do: policy text, customer ka plan, aaj ki date."],
      ["Spell out rules and limits: answer only from the policy, say \"I don't know\" otherwise, keep it under 100 words.", "Rules aur limits saaf likho: sirf policy se jawaab do, warna \"I don't know\" kaho, 100 shabdon se kam rakho."],
      ["Show one or two examples of a good answer, and define the output format (bullets, JSON with named fields).", "Acche jawaab ke ek do examples dikhao, aur output format define karo (bullets, naam wale fields ke saath JSON)."],
      ["Test on 20 or more real inputs, look at failures, adjust one thing at a time, and keep versions of your prompt.", "20 ya zyaada asli inputs pe test karo, failures dekho, ek baar mein ek cheez badlo, aur prompt ke versions rakho."]
    ],
    mistakes: [
      ["Vague prompts like \"make it better\". Say what better means: shorter, friendlier, with a call to action.", "\"Behtar banao\" jaise vague prompts. Batao behtar ka matlab kya: chhota, friendly, call to action ke saath."],
      ["Judging a prompt on one or two tries. Prompts that look great on one example often fail on others.", "Ek do try mein prompt judge karna. Ek example pe badhiya dikhne wale prompts aksar doosron pe fail hote hain."],
      ["Putting secrets or private data in prompts sent to tools that aren't approved by your company.", "Company se approved na hon aise tools ko bheje prompts mein secrets ya private data daalna."]
    ],
    faq: [
      [["Do long prompts work better?", "Kya lambe prompts behtar kaam karte hain?"], ["Clear beats long. Include what's needed, remove what isn't. Long irrelevant context can confuse the model and costs more.", "Saaf, lambe se behtar hai. Jo zaroori hai woh daalo, jo nahi woh hatao. Lamba bekaar context model ko confuse kar sakta hai aur mehenga bhi padta hai."]],
      [["What is chain of thought?", "Chain of thought kya hai?"], ["Asking the model to reason step by step before answering. It helps on maths and multi step problems; many modern models do it internally.", "Model se jawaab se pehle step by step sochne ko kehna. Maths aur multi step problems mein madad karta hai; kai naye models yeh andar hi karte hain."]]
    ]
  },

  "llm-api": {
    steps: [
      ["Create an API key in the provider's console and store it in an environment variable, never in code.", "Provider ke console mein API key banao aur use environment variable mein rakho, code mein kabhi nahi."],
      ["Send a request with the model name, a system message (instructions) and user messages; read the text from the response.", "Model ka naam, system message (instructions) aur user messages ke saath request bhejo; response se text padho."],
      ["Log input and output token counts. Cost = tokens × price per token, so you can estimate cost per user.", "Input aur output token counts log karo. Cost = tokens × per token price, isse per user cost ka andaaza lagta hai."],
      ["Handle failures: set a timeout, retry rate limit (429) and server errors with exponential backoff, and show a friendly message if all retries fail.", "Failures sambhalo: timeout set karo, rate limit (429) aur server errors pe exponential backoff ke saath retry karo, aur sab retries fail hon to friendly message dikhao."],
      ["Stream long answers so users see text immediately, and set a max token limit to control cost.", "Lambe jawaab stream karo taaki users ko turant text dikhe, aur cost control ke liye max token limit lagao."]
    ],
    mistakes: [
      ["Committing API keys to GitHub. Bots find them within minutes; rotate the key immediately if it happens.", "API keys GitHub pe commit karna. Bots minuton mein dhoondh lete hain; aisa ho to turant key badlo."],
      ["Calling the API from browser code, which exposes your key. Call it from your server.", "Browser code se API call karna, jisse key khul jaati hai. Apne server se call karo."],
      ["No usage limits. A bug or abuse can create a huge bill; set budgets and per user limits.", "Koi usage limit nahi. Ek bug ya misuse bahut bada bill bana sakta hai; budgets aur per user limits lagao."]
    ],
    faq: [
      [["Which model should I start with?", "Kis model se shuru karun?"], ["Start with a strong general model to prove the feature works, then test smaller, cheaper models on your eval set and switch where quality holds.", "Feature kaam karta hai yeh prove karne ke liye ek strong general model se shuru karo, phir apne eval set pe chhote, saste models test karo aur jahan quality bani rahe wahan switch karo."]],
      [["Is my data used for training?", "Kya mera data training ke liye use hota hai?"], ["Policies differ by provider and plan. Business API plans usually don't train on your data by default, but always check the current terms.", "Policies provider aur plan ke hisaab se alag hain. Business API plans aam taur pe default mein aapke data pe train nahi karte, par current terms hamesha check karo."]]
    ]
  },

  "llm-tool-use": {
    steps: [
      ["Write a normal function, for example get_order_status(order_id).", "Ek normal function likho, jaise get_order_status(order_id)."],
      ["Describe it to the model: name, what it does, and a JSON schema of its parameters.", "Model ko iske baare mein batao: naam, kya karta hai, aur parameters ka JSON schema."],
      ["When the user asks \"where is order 4512?\", the model replies with a tool call: get_order_status with order_id 4512.", "Jab user poochhe \"order 4512 kahan hai?\", model tool call se jawaab deta hai: get_order_status, order_id 4512."],
      ["Your code validates the arguments, checks permissions, runs the function and sends the result back.", "Aapka code arguments validate karta hai, permissions check karta hai, function chalata hai aur result wapas bhejta hai."],
      ["The model uses the result to answer the user, or calls another tool if needed.", "Model result se user ko jawaab deta hai, ya zaroorat ho to doosra tool call karta hai."]
    ],
    mistakes: [
      ["Trusting arguments blindly. The model can invent an order ID or a wrong amount; validate everything.", "Arguments pe aankh band karke bharosa. Model order ID ya galat amount bana sakta hai; sab validate karo."],
      ["Giving powerful tools without limits, like delete or refund with no confirmation step.", "Bina limits ke powerful tools dena, jaise delete ya refund bina confirmation step ke."],
      ["Too many similar tools with vague descriptions. The model picks the wrong one; keep tools few and clearly described.", "Vague descriptions wale bahut saare milte julte tools. Model galat chunta hai; tools kam aur saaf described rakho."]
    ],
    faq: [
      [["Does the model run my code?", "Kya model mera code chalata hai?"], ["No. It only says which tool to call with which arguments. Your application runs it and decides whether to allow it.", "Nahi. Woh sirf batata hai kaunsa tool kin arguments ke saath call karna hai. Aapki application use chalati hai aur tay karti hai allow karna hai ya nahi."]],
      [["Can it call several tools at once?", "Kya ek saath kai tools call kar sakta hai?"], ["Many models support parallel tool calls, for example checking stock in three warehouses at once. Your code runs them and returns all results.", "Kai models parallel tool calls support karte hain, jaise teen warehouses mein ek saath stock check karna. Aapka code unhe chalata hai aur saare results lautata hai."]]
    ]
  },

  "llm-agents": {
    steps: [
      ["Give the agent a clear goal and a small set of tools.", "Agent ko ek saaf goal aur kuch tools do."],
      ["Loop: the model plans the next step, calls a tool, reads the result, and decides again.", "Loop: model agla step plan karta hai, tool call karta hai, result padhta hai, aur phir decide karta hai."],
      ["Set limits: maximum steps, maximum cost and a timeout, so it can't loop forever.", "Limits lagao: maximum steps, maximum cost aur timeout, taaki hamesha loop na chale."],
      ["Require human approval before risky actions like payments, emails to customers or deleting data.", "Payments, customers ko emails ya data delete jaise risky actions se pehle human approval zaroori karo."],
      ["Log every step (a trace) so you can see why it did what it did, and evaluate on realistic tasks.", "Har step log karo (trace) taaki dekh sako usne jo kiya kyun kiya, aur realistic tasks pe evaluate karo."]
    ],
    mistakes: [
      ["Using an agent where a fixed workflow works. Fixed steps are cheaper, faster and easier to test.", "Jahan fixed workflow kaam kare wahan agent lagana. Fixed steps saste, tez aur test karne mein aasaan hain."],
      ["No stopping rules, leading to runaway loops and big bills.", "Rukne ke rules na hona, jisse loops bhaagte rehte hain aur bill bada hota hai."],
      ["Letting web pages or documents give the agent instructions (prompt injection). Treat them as data.", "Web pages ya documents ko agent ko instructions dene dena (prompt injection). Unhe data maano."]
    ],
    faq: [
      [["What's the difference between an agent and a chatbot?", "Agent aur chatbot mein kya fark hai?"], ["A chatbot mostly answers. An agent takes actions with tools over several steps to complete a task.", "Chatbot zyaadatar jawaab deta hai. Agent kai steps mein tools se actions leta hai taaki kaam poora ho."]],
      [["Do I need a framework like LangGraph?", "Kya LangGraph jaisa framework chahiye?"], ["Not to start. A simple loop in your own code teaches you the most. Frameworks help later with state, retries and multi step flows.", "Shuru mein nahi. Apne code mein simple loop sabse zyaada sikhata hai. Frameworks baad mein state, retries aur multi step flows mein madad karte hain."]]
    ]
  },

  "llm-mcp": {
    steps: [
      ["An MCP server wraps a system (tickets, files, a database) and exposes tools, resources and prompts in a standard format.", "MCP server ek system (tickets, files, database) ko wrap karta hai aur tools, resources aur prompts standard format mein deta hai."],
      ["An MCP client lives inside an AI app (an assistant, an IDE, your own agent) and connects to one or more servers.", "MCP client ek AI app (assistant, IDE, aapka apna agent) ke andar rehta hai aur ek ya zyaada servers se judta hai."],
      ["The client lists the server's tools and passes them to the model, which can then call them.", "Client server ke tools ki list leta hai aur model ko deta hai, phir model unhe call kar sakta hai."],
      ["Calls flow through the client to the server, which runs them with its own authentication and permissions.", "Calls client se server tak jaati hain, jo apne authentication aur permissions ke saath unhe chalata hai."],
      ["Build once, reuse everywhere: the same server works with every MCP compatible app.", "Ek baar banao, har jagah use karo: wahi server har MCP compatible app ke saath chalta hai."]
    ],
    mistakes: [
      ["Installing MCP servers from unknown sources. A server can read data and take actions; treat it like any software you install.", "Anjaan sources se MCP servers install karna. Server data padh sakta hai aur actions le sakta hai; ise kisi bhi install kiye software ki tarah dekho."],
      ["Exposing write or delete tools by default. Start read only and add powerful tools carefully.", "Default mein write ya delete tools dena. Read only se shuru karo aur powerful tools dhyaan se jodo."]
    ],
    faq: [
      [["Is MCP only for one company's models?", "Kya MCP sirf ek company ke models ke liye hai?"], ["No. It's an open protocol supported by many AI apps and model providers.", "Nahi. Yeh open protocol hai jise kai AI apps aur model providers support karte hain."]],
      [["MCP or normal tool calling?", "MCP ya normal tool calling?"], ["They work together. Tool calling is how the model asks for an action; MCP is a standard way to package and share those tools across apps.", "Dono saath kaam karte hain. Tool calling woh tarika hai jisse model action maangta hai; MCP un tools ko apps ke beech pack aur share karne ka standard tarika hai."]]
    ]
  },

  "embeddings": {
    steps: [
      ["Send text to an embedding model; you get back a vector of hundreds of numbers.", "Text embedding model ko bhejo; badle mein sainkdon numbers ka vector milta hai."],
      ["Do this for every document chunk and store the vectors, with the text and metadata, in a vector database.", "Har document chunk ke liye yeh karo aur vectors ko text aur metadata ke saath vector database mein store karo."],
      ["At search time, embed the user's query the same way.", "Search ke time user ki query ko bhi same tarah embed karo."],
      ["Find the nearest vectors with cosine similarity; the vector database does this quickly even for millions.", "Cosine similarity se sabse paas ke vectors dhoondo; vector database laakhon mein bhi yeh jaldi karta hai."],
      ["Return the matching chunks, optionally filtered by metadata (department, date, permissions).", "Match hue chunks lautao, chaaho to metadata se filter karke (department, date, permissions)."]
    ],
    mistakes: [
      ["Mixing embedding models. Vectors from different models aren't comparable; re-embed everything when you switch.", "Embedding models mix karna. Alag models ke vectors compare nahi ho sakte; switch karo to sab dobara embed karo."],
      ["Relying only on vector search for exact codes, names or IDs. Add keyword search (hybrid).", "Exact codes, naam ya IDs ke liye sirf vector search pe nirbhar rehna. Keyword search bhi jodo (hybrid)."]
    ],
    faq: [
      [["Do I need a special vector database?", "Kya special vector database chahiye?"], ["Not always. For small projects, pgvector in PostgreSQL or even an in memory library works. Dedicated databases help at large scale.", "Hamesha nahi. Chhote projects ke liye PostgreSQL mein pgvector ya in memory library bhi chal jaati hai. Bade scale pe dedicated databases kaam aate hain."]],
      [["Do embeddings work for Hindi?", "Kya embeddings Hindi ke liye kaam karti hain?"], ["Multilingual embedding models do, and can even match a Hindi question to an English document. Test with your own examples.", "Multilingual embedding models karte hain, aur Hindi sawaal ko English document se match bhi kar sakte hain. Apne examples se test karo."]]
    ]
  },

  "rag": {
    steps: [
      ["Collect and clean the documents: remove duplicates, old versions and junk text.", "Documents ikattha karo aur saaf karo: duplicates, purane versions aur bekaar text hatao."],
      ["Chunk them along headings and paragraphs, a few hundred tokens each, and keep title, section and date as metadata.", "Headings aur paragraphs ke hisaab se chunks banao, har ek kuch sau tokens ka, aur title, section aur date metadata mein rakho."],
      ["Embed the chunks and store them; for each question, retrieve the top matches (ideally hybrid search plus a reranker).", "Chunks embed karke store karo; har sawaal ke liye top matches nikaalo (behtar hai hybrid search plus reranker)."],
      ["Prompt: \"Answer only from the sources below and cite them. If they don't contain the answer, say so.\"", "Prompt mein likho: \"Answer only from the sources below and cite them. If they don't contain the answer, say so.\" Yaani sirf sources se jawaab, citation ke saath, aur jawaab na mile to saaf bolo."],
      ["Build an eval set of real questions; measure retrieval (was the right chunk found?) and answers (correct and faithful?) separately.", "Asli sawaalon ka eval set banao; retrieval (sahi chunk mila?) aur answers (sahi aur source ke mutaabik?) alag alag naapo."]
    ],
    mistakes: [
      ["Fixed size chunks that cut tables and lists in half. Respect document structure.", "Fixed size chunks jo tables aur lists ko beech se kaat dete hain. Document ka structure maano."],
      ["Stuffing 30 chunks into the prompt. More isn't better; a few relevant chunks usually beat many.", "Prompt mein 30 chunks thoos dena. Zyaada behtar nahi; kuch relevant chunks aksar bahut saaron se behtar hain."],
      ["Ignoring permissions, so users see documents they shouldn't. Filter at retrieval time.", "Permissions ignore karna, jisse users woh documents dekh lete hain jo nahi dekhne chahiye. Retrieval ke time filter karo."]
    ],
    faq: [
      [["RAG or a bigger context window?", "RAG ya bada context window?"], ["Even with huge context windows, RAG is usually cheaper, faster and more accurate, because the model sees only what's relevant. For one small document, just put it in the prompt.", "Bahut bade context windows ke saath bhi RAG aksar sasta, tez aur zyaada accurate hai, kyunki model sirf relevant cheez dekhta hai. Ek chhote document ke liye seedha prompt mein daal do."]],
      [["How do I keep the index up to date?", "Index ko up to date kaise rakhun?"], ["Run a sync job that re-embeds changed documents and deletes removed ones, triggered by changes or on a schedule.", "Ek sync job chalao jo badle documents dobara embed kare aur hataye gaye documents delete kare, changes pe ya schedule pe."]]
    ]
  },

  "llm-evals": {
    steps: [
      ["Write down what good means for your feature, with examples of good and bad outputs.", "Likho aapke feature ke liye accha ka matlab kya hai, acche aur bure outputs ke examples ke saath."],
      ["Collect 50 to 200 real inputs: common cases, edge cases and past failures.", "50 se 200 asli inputs ikattha karo: common cases, edge cases aur purane failures."],
      ["Choose how to score each: code checks where possible (valid JSON, right category), a rubric for open answers.", "Har ek ko score karne ka tarika chuno: jahan ho sake code checks (valid JSON, sahi category), open answers ke liye rubric."],
      ["Use an LLM judge for the rubric only after checking it agrees with human ratings on a sample.", "Rubric ke liye LLM judge tabhi use karo jab sample pe check kar lo ki woh human ratings se sehmat hai."],
      ["Run the eval on every prompt or model change, track the score over time, and add every new production failure to the set.", "Har prompt ya model change pe eval chalao, waqt ke saath score track karo, aur har naya production failure set mein jodo."]
    ],
    mistakes: [
      ["Testing by trying a few prompts by hand ('vibe checks'). It misses regressions you didn't think to try.", "Haath se kuch prompts try karke test karna ('vibe checks'). Jo aapne try karne ka socha nahi woh regressions chhoot jaate hain."],
      ["An eval set made only of easy examples. Include the tricky and adversarial ones.", "Sirf aasaan examples wala eval set. Mushkil aur adversarial wale bhi daalo."]
    ],
    faq: [
      [["How many examples do I need?", "Kitne examples chahiye?"], ["Start with 50 good ones; that already catches most regressions. Grow towards hundreds per important category over time.", "50 acche examples se shuru karo; inse hi zyaadatar regressions pakad mein aa jaate hain. Waqt ke saath har important category ke liye sainkdon tak badhao."]],
      [["What are online evals?", "Online evals kya hain?"], ["Signals from real usage after launch: thumbs up or down, edits to AI output, escalations to humans, task completion.", "Launch ke baad asli usage ke signals: thumbs up ya down, AI output mein edits, insaanon tak escalations, task completion."]]
    ]
  },

  "llm-safety": {
    steps: [
      ["Ground answers in sources and allow \"I don't know\" to reduce hallucinations.", "Hallucinations kam karne ke liye jawaab sources pe based rakho aur \"I don't know\" kehne do."],
      ["Treat user input and retrieved content as data, never as instructions; mark them clearly in the prompt.", "User input aur retrieved content ko data maano, instructions kabhi nahi; prompt mein unhe saaf mark karo."],
      ["Give tools the least privilege, and require confirmation for risky actions.", "Tools ko kam se kam privilege do, aur risky actions ke liye confirmation zaroori karo."],
      ["Filter inputs and outputs: block personal data leaving the system, unsafe content and secrets.", "Inputs aur outputs filter karo: personal data ka bahar jaana, unsafe content aur secrets block karo."],
      ["Red team regularly: try known attacks and add them to your eval set.", "Regularly red team karo: jaane maane attacks try karo aur unhe eval set mein jodo."]
    ],
    mistakes: [
      ["Relying on \"please don't reveal the system prompt\" as security. Instructions in a prompt are not access control.", "\"please don't reveal the system prompt\" ko security maan lena. Prompt ke instructions access control nahi hain."],
      ["Logging full conversations with personal data without consent or protection.", "Bina consent ya protection ke personal data wali poori conversations log karna."]
    ],
    faq: [
      [["Can prompt injection be fully prevented?", "Kya prompt injection poori tarah rok sakte hain?"], ["Not today. You reduce the impact with layers: limited tools, confirmations, output checks and monitoring.", "Aaj nahi. Layers se asar kam karte ho: limited tools, confirmations, output checks aur monitoring."]],
      [["Who is responsible for AI mistakes?", "AI ki galtiyon ke liye zimmedaar kaun?"], ["The company deploying it. That's why high stakes uses need human review, clear disclaimers and audit logs.", "Jo company use deploy karti hai. Isiliye high stakes uses mein human review, saaf disclaimers aur audit logs chahiye."]]
    ]
  },

  "ai-ux": {
    steps: [
      ["Set expectations: label AI output as a draft or suggestion, and say what it can and can't do.", "Expectations set karo: AI output ko draft ya suggestion label karo, aur batao woh kya kar sakta hai kya nahi."],
      ["Show sources or reasons so users can check quickly.", "Sources ya reasons dikhao taaki users jaldi check kar sakein."],
      ["Make editing and undo easy; never auto apply important changes.", "Edit aur undo aasaan banao; important changes kabhi apne aap apply mat karo."],
      ["Design the failure path: what happens when the AI is unsure, slow or wrong? Offer a fallback or a human.", "Failure ka raasta design karo: AI unsure, slow ya galat ho to kya hoga? Fallback ya insaan ka option do."],
      ["Collect feedback in the flow (thumbs, edits) and review it weekly to improve prompts and evals.", "Flow ke andar feedback lo (thumbs, edits) aur prompts aur evals sudhaarne ke liye har hafte review karo."]
    ],
    mistakes: [
      ["Hiding that content is AI generated. Users trust products more when it's clear.", "Chhupana ki content AI ne banaya. Saaf ho to users product pe zyaada bharosa karte hain."],
      ["A blank chat box as the only interface. Suggest example prompts or put AI where users already work.", "Sirf ek khaali chat box interface. Example prompts suggest karo ya AI wahan rakho jahan users pehle se kaam karte hain."]
    ],
    faq: [
      [["Chat interface or buttons?", "Chat interface ya buttons?"], ["For repeated, well defined tasks, a button (\"Summarise\", \"Draft reply\") is faster. Chat suits open ended exploration.", "Baar baar ke, saaf defined tasks ke liye button (\"Summarise\", \"Draft reply\") tez hai. Open ended exploration ke liye chat theek hai."]],
      [["How do I show uncertainty?", "Uncertainty kaise dikhayein?"], ["Highlight parts that need checking, show sources, or say \"I'm not sure\" and offer options, rather than showing raw confidence numbers.", "Jo hisse check karne hain unhe highlight karo, sources dikhao, ya \"I'm not sure\" kaho aur options do, raw confidence numbers dikhaane ke bajaye."]]
    ]
  }
});

if (typeof module !== "undefined" && module.exports) module.exports = { LESSON_DEEP };
