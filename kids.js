// AI for Kids: the level map (#kidsHub) and the games (#kidsGame[data-level]) for content/kids.js.
// Stars, badges and the child's name for the certificate are kept in this browser only.
// Every prompt and card has a 🔊 button (tts.js), so children who can't read yet can play.
(function () {
  const KEY = "aipf:kids";
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const load = k => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
  const keep = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } };
  const state = Object.assign({ stars: {}, sound: true, name: "" }, load(KEY) || {});
  const saveState = () => keep(KEY, state);
  const lang = load("aipf:lang") === "hi" ? "hi" : "en";
  const L = pair => (Array.isArray(pair) ? pair[lang === "hi" ? 1 : 0] : pair);
  const levels = KIDS.levels;
  const shuffle = arr => arr.map(x => [Math.random(), x]).sort((a, b) => a[0] - b[0]).map(x => x[1]);

  const UI = {
    en: {
      listen: "Listen", pause: "Pause", resume: "Resume", stop: "Stop", speed: "Speed", reading: "Reading aloud…", paused: "Paused", unsupported: "This browser can't read aloud",
      hear: "Hear it", next: "Next", great: "Great job!", oops: "Oops!", tryAgain: "Play again", nextLevel: "Next level", map: "Back to the map",
      stars: "stars", youEarned: "You earned", badge: "New badge", level: "Level", play: "Play", replay: "Play again", done: "Done",
      totalStars: "Your stars", badges: "Your badges", noBadges: "Finish a level to win your first badge!",
      certTitle: "Your AI Explorer certificate", certLocked: "Finish all 6 levels to unlock your certificate.", certName: "Your name", certPrint: "Print my certificate",
      certHeading: "Certificate of AI Exploring", certText: "has completed all six levels of AI for Kids and learned what AI is, how it learns, and how to use it smartly and safely.",
      certBy: "AI Path Finder · AI for Kids", soundOn: "Sound on", soundOff: "Sound off",
      robo: "Robo", roboThinks: "Robo thinks", because: "because it looks like", youSaid: "which you taught is", fruit: "a fruit", notFruit: "not a fruit",
      roboRight: "Robo is right!", roboWrong: "Robo learned a mistake from its lesson.", really: "is really", gotIt: "Got it! Robo is learning…",
      teachDoneGood: "Robo got {n} of {t} right because you taught it well!", teachDoneBad: "Robo got {n} of {t} right. When the examples are wrong, AI learns wrong things. Try teaching again!",
      tapHelper: "First tap a helper", nowJob: "Now tap its job", matched: "Matched!", aiUnderstood: "AI understood you!", aiConfused: "Hmm, that question is too unclear. AI might make anything!",
      patternOk: "You found the pattern!", answerIs: "The pattern says {a} comes next.",
      oneMistake: "Just 1 mistake. Well done!", mistakes: "{n} mistakes. Play again to win more stars!", perfect: "Perfect, no mistakes!", start: "Let's play!", progress: "{i} of {n}"
    },
    hi: {
      listen: "Suno", pause: "Roko", resume: "Phir chalao", stop: "Band karo", speed: "Speed", reading: "Padh kar suna rahe hain…", paused: "Ruka hua", unsupported: "Yeh browser padh kar nahi suna sakta",
      hear: "Suno", next: "Aage", great: "Shabaash!", oops: "Oops!", tryAgain: "Phir khelo", nextLevel: "Agla level", map: "Map pe wapas", stars: "stars", youEarned: "Aapko mile",
      badge: "Naya badge", level: "Level", play: "Khelo", replay: "Phir khelo", done: "Ho gaya",
      totalStars: "Aapke stars", badges: "Aapke badges", noBadges: "Pehla badge jeetne ke liye ek level poora karo!",
      certTitle: "Aapka AI Explorer certificate", certLocked: "Certificate pane ke liye saare 6 levels poore karo.", certName: "Aapka naam", certPrint: "Mera certificate print karo",
      certHeading: "AI Explorer Certificate", certText: "ne AI for Kids ke saare chhe levels poore kiye aur seekha ki AI kya hai, kaise seekhta hai, aur use smart aur safe tarike se kaise use karte hain.",
      certBy: "AI Path Finder · AI for Kids", soundOn: "Awaaz on", soundOff: "Awaaz off",
      robo: "Robo", roboThinks: "Robo sochta hai", because: "kyunki yeh is jaisa dikhta hai:", youSaid: "jise aapne sikhaya", fruit: "fruit hai", notFruit: "fruit nahi hai",
      roboRight: "Robo sahi hai!", roboWrong: "Robo ne apne lesson se galti seekh li.", really: "asal mein", gotIt: "Samajh gaya! Robo seekh raha hai…",
      teachDoneGood: "Robo ne {t} mein se {n} sahi kiye kyunki aapne accha sikhaya!", teachDoneBad: "Robo ne {t} mein se {n} sahi kiye. Jab examples galat hon, AI galat cheezein seekhta hai. Phir se sikhao!",
      tapHelper: "Pehle ek helper dabao", nowJob: "Ab uska kaam dabao", matched: "Mil gaya!", aiUnderstood: "AI aapki baat samajh gaya!", aiConfused: "Hmm, yeh sawaal bahut unclear hai. AI kuch bhi bana sakta hai!",
      patternOk: "Aapne pattern pakad liya!", answerIs: "Pattern ke hisaab se aage {a} aayega.",
      oneMistake: "Sirf 1 galti. Bahut badhiya!", mistakes: "{n} galtiyaan. Aur stars ke liye phir khelo!", perfect: "Perfect, koi galti nahi!", start: "Chalo khelte hain!", progress: "{n} mein se {i}"
    }
  }[lang];
  const t = (k, v = {}) => String(UI[k]).replace(/\{(\w+)\}/g, (_, x) => v[x]);

  // ---------- language, sound, speech, confetti ----------
  document.documentElement.classList.toggle("kids-hi", lang === "hi");
  document.querySelectorAll("[data-kids-lang]").forEach(b => {
    b.setAttribute("aria-pressed", b.dataset.kidsLang === lang);
    b.classList.toggle("active", b.dataset.kidsLang === lang);
    b.addEventListener("click", () => { keep("aipf:lang", b.dataset.kidsLang); location.reload(); });
  });
  let audio = null;
  function beep(good) {
    if (!state.sound) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      const notes = good ? [523, 659, 784] : [300, 220];
      notes.forEach((f, i) => {
        const o = audio.createOscillator(), g = audio.createGain();
        o.type = "sine"; o.frequency.value = f;
        g.gain.setValueAtTime(0.12, audio.currentTime + i * 0.11);
        g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + i * 0.11 + 0.18);
        o.connect(g); g.connect(audio.destination);
        o.start(audio.currentTime + i * 0.11); o.stop(audio.currentTime + i * 0.11 + 0.2);
      });
    } catch (e) { /* no audio */ }
  }
  const say = text => typeof LessonReader !== "undefined" && LessonReader.say(text, lang);
  const hearBtn = text => `<button type="button" class="kid-hear" data-say="${esc(text)}" aria-label="${esc(UI.hear)}">🔊</button>`;
  function confetti() {
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = document.createElement("div");
    box.className = "kid-confetti";
    box.setAttribute("aria-hidden", "true");
    box.innerHTML = Array.from({ length: 28 }, (_, i) => `<span style="left:${Math.random() * 100}%;animation-delay:${(Math.random() * 0.6).toFixed(2)}s">${["⭐", "🎉", "✨", "🎈", "🌟"][i % 5]}</span>`).join("");
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 2600);
  }
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-say]");
    if (b) { e.preventDefault(); say(b.dataset.say); }
  });
  const soundBtn = document.querySelector("[data-kids-sound]");
  if (soundBtn) {
    const paint = () => { soundBtn.textContent = state.sound ? `🔔 ${UI.soundOn}` : `🔕 ${UI.soundOff}`; soundBtn.setAttribute("aria-pressed", state.sound); };
    paint();
    soundBtn.addEventListener("click", () => { state.sound = !state.sound; saveState(); paint(); });
  }

  // Listen bar for the story: labels in the chosen language.
  const bar = document.querySelector("[data-reader]");
  if (bar && typeof LessonReader !== "undefined") {
    Object.assign(bar.dataset, { listen: UI.listen, pause: UI.pause, resume: UI.resume, reading: UI.reading, paused: UI.paused, unsupported: UI.unsupported });
    const stopBtn = bar.querySelector('[data-tts="stop"]');
    if (stopBtn) stopBtn.textContent = `⏹ ${UI.stop}`;
    LessonReader.attach(bar, document.querySelector(".kids-story") || document.querySelector("main"), lang);
  }

  const starsHtml = n => `<span class="kid-stars" aria-label="${n} ${UI.stars}">${[1, 2, 3].map(i => `<span class="${i <= n ? "on" : ""}">★</span>`).join("")}</span>`;
  const starsFor = mistakes => (mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1);

  // ---------- level map ----------
  const hub = document.getElementById("kidsHub");
  if (hub) renderHub();
  function renderHub() {
    const total = levels.reduce((s, l) => s + (state.stars[l.id] || 0), 0);
    const done = levels.filter(l => state.stars[l.id]);
    const all = done.length === levels.length;
    hub.innerHTML = `
      <div class="kid-score"><span>⭐ ${esc(UI.totalStars)}: <strong>${total} / ${levels.length * 3}</strong></span><span>🏅 ${done.length} / ${levels.length}</span></div>
      <ol class="kid-map">${levels.map((l, i) => {
        const s = state.stars[l.id] || 0;
        return `<li><a class="kid-level${s ? " done" : ""}" href="${l.id}.html" style="--c:${l.color}">
          <span class="kid-level-num">${esc(UI.level)} ${i + 1}</span>
          <span class="kid-level-icon" aria-hidden="true">${l.icon}</span>
          <strong>${esc(L(l.title))}</strong>
          <span class="small">${esc(L(l.tagline))}</span>
          ${starsHtml(s)}
          <span class="kid-level-go">${s ? esc(UI.replay) : esc(UI.play)} →</span>
        </a></li>`;
      }).join("")}</ol>
      <section class="kid-badges"><h2>🏅 ${esc(UI.badges)}</h2>
        ${done.length ? `<ul>${done.map(l => `<li><span aria-hidden="true">${l.badge.e}</span>${esc(L(l.badge.name))}</li>`).join("")}${all ? `<li class="champ"><span aria-hidden="true">🏆</span>AI Champion</li>` : ""}</ul>` : `<p class="muted">${esc(UI.noBadges)}</p>`}
      </section>
      <section class="kid-cert-box"><h2>📜 ${esc(UI.certTitle)}</h2>
        ${all ? `<label class="small">${esc(UI.certName)} <input type="text" class="rb-input" data-cert-name maxlength="40" value="${esc(state.name)}"></label>
          <div class="kid-cert" data-cert>${certHtml(state.name)}</div>
          <button type="button" class="button btn-primary" data-act="print-cert">🖨️ ${esc(UI.certPrint)}</button>`
        : `<p class="muted">${esc(UI.certLocked)}</p>`}
      </section>`;
    const name = hub.querySelector("[data-cert-name]");
    if (name) name.addEventListener("input", () => { state.name = name.value; saveState(); hub.querySelector("[data-cert]").innerHTML = certHtml(state.name); });
    const print = hub.querySelector('[data-act="print-cert"]');
    if (print) print.addEventListener("click", printCert);
  }
  function certHtml(name) {
    const d = new Date();
    return `<p class="kid-cert-top">🏆 ${esc(UI.certHeading)} 🏆</p>
      <p class="kid-cert-name">${esc(name || "_____________")}</p>
      <p>${esc(UI.certText)}</p>
      <p class="kid-cert-badges">${levels.map(l => l.badge.e).join(" ")}</p>
      <p class="small">${esc(UI.certBy)} · ${d.toLocaleDateString(lang === "hi" ? "en-IN" : "en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>`;
  }
  function printCert() {
    const f = document.createElement("iframe");
    f.setAttribute("aria-hidden", "true");
    f.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
    document.body.appendChild(f);
    const d = f.contentDocument;
    d.open();
    d.write(`<!doctype html><html><head><meta charset="utf-8"><title>AI Explorer certificate</title><base href="${esc(document.baseURI)}"><link rel="stylesheet" href="../styles.css">
<style>@page{size:landscape;margin:1cm}body{background:#fff;margin:0}.kid-cert{margin:0;min-height:90vh;box-sizing:border-box}</style></head><body><div class="kid-cert">${certHtml(state.name)}</div></body></html>`);
    d.close();
    let done = false;
    const go = () => { if (done) return; done = true; f.contentWindow.focus(); f.contentWindow.print(); setTimeout(() => f.remove(), 60000); };
    d.querySelector("link").addEventListener("load", go);
    setTimeout(go, 1500);
  }

  // ---------- games ----------
  const mount = document.getElementById("kidsGame");
  if (!mount) return;
  const idx = levels.findIndex(l => l.id === mount.dataset.level);
  const level = levels[idx];
  const game = level.game;
  let g; // per play state
  const live = () => mount.querySelector("[data-live]");

  function startGame() {
    g = { i: 0, mistakes: 0, answered: false, phase: "train", taught: {}, robo: [], pick: null, matched: [] };
    if (game.type === "sort" || game.type === "safe") g.items = shuffle(game.items);
    if (game.type === "match") g.jobs = shuffle(game.pairs.map((p, k) => k));
    render();
  }

  function head(prompt, i, n) {
    return `<div class="kid-game-head" style="--c:${level.color}">
      <p class="kid-prompt">${esc(L(prompt))} ${hearBtn(L(prompt))}</p>
      ${n ? `<div class="kid-dots" aria-label="${esc(t("progress", { i: i + 1, n }))}">${Array.from({ length: n }, (_, k) => `<span class="${k < i ? "past" : k === i ? "now" : ""}"></span>`).join("")}</div>` : ""}
    </div>`;
  }
  const feedback = (ok, text) => `<div class="kid-feedback ${ok ? "ok" : "miss"}" data-live role="status"><strong>${ok ? "✅ " + esc(UI.great) : "💭 " + esc(UI.oops)}</strong> ${esc(text)} ${hearBtn(text)}</div>`;
  const nextBtn = last => `<button type="button" class="button btn-primary kid-next" data-act="next">${esc(last ? UI.done : UI.next)} →</button>`;

  function render() {
    let html;
    if (g.phase === "end") html = endView();
    else if (game.type === "sort" || game.type === "safe") html = yesNoView();
    else if (game.type === "teach") html = teachView();
    else if (game.type === "pattern") html = patternView();
    else if (game.type === "match") html = matchView();
    else if (game.type === "prompt") html = promptView();
    mount.innerHTML = html;
    bind();
  }

  function yesNoView() {
    const it = g.items[g.i];
    const text = game.type === "safe" ? L(it.q) : L(it.name);
    const ok = g.answered && g.choice === (game.type === "safe" ? it.answer : it.ai);
    return `${head(game.prompt, g.i, g.items.length)}
      <div class="kid-card"><span class="kid-emoji" aria-hidden="true">${it.e}</span><p class="kid-card-text">${esc(text)} ${hearBtn(text)}</p></div>
      <div class="kid-choices">
        <button type="button" class="kid-choice yes${g.answered && g.choice === true ? " picked" : ""}" data-yn="1" ${g.answered ? "disabled" : ""}>${game.type === "sort" ? "🤖" : "👍"} ${esc(L(game.yes))}</button>
        <button type="button" class="kid-choice no${g.answered && g.choice === false ? " picked" : ""}" data-yn="0" ${g.answered ? "disabled" : ""}>${game.type === "sort" ? "🔧" : "👎"} ${esc(L(game.no))}</button>
      </div>
      ${g.answered ? feedback(ok, L(it.why)) + nextBtn(g.i === g.items.length - 1) : ""}`;
  }

  function teachView() {
    if (g.phase === "train") {
      const it = game.train[g.i];
      return `${head(game.prompt, g.i, game.train.length)}
        <div class="kid-card"><span class="kid-emoji" aria-hidden="true">${it.e}</span><p class="kid-card-text">${esc(L(it.name))} ${hearBtn(L(it.name))}</p></div>
        <div class="kid-choices">
          <button type="button" class="kid-choice yes" data-teach="1">🍓 ${esc(L(game.yes))}</button>
          <button type="button" class="kid-choice no" data-teach="0">🚫 ${esc(L(game.no))}</button>
        </div>
        <p class="kid-robo-say" data-live role="status">${g.i ? `🤖 ${esc(UI.gotIt)}` : ""}</p>
        <div class="kid-taught">${game.train.slice(0, g.i).map(x => `<span class="${g.taught[x.family] ? "f" : "n"}">${x.e}${g.taught[x.family] ? "🍓" : "🚫"}</span>`).join("")}</div>`;
    }
    const it = game.test[g.i];
    const teacher = game.train.find(x => x.family === it.family);
    const guess = g.taught[it.family];
    const right = guess === it.fruit;
    const said = `${UI.roboThinks} ${L(it.name)} ${guess ? UI.fruit : UI.notFruit}, ${UI.because} ${L(teacher.name)} ${teacher.e}, ${UI.youSaid} ${guess ? UI.fruit : UI.notFruit}.`;
    const truth = right ? UI.roboRight : `${UI.roboWrong} ${L(it.name)} ${UI.really} ${it.fruit ? UI.fruit : UI.notFruit}.`;
    return `${head(game.testPrompt, g.i, game.test.length)}
      <div class="kid-card"><span class="kid-emoji" aria-hidden="true">${it.e}</span><p class="kid-card-text">${esc(L(it.name))}</p></div>
      <p class="kid-robo-say">🤖 ${esc(said)} ${hearBtn(said)}</p>
      ${feedback(right, truth)}
      ${nextBtn(g.i === game.test.length - 1)}`;
  }

  function patternView() {
    const r = game.rounds[g.i];
    const ok = g.answered && g.choice === r.answer;
    return `${head(game.prompt, g.i, game.rounds.length)}
      <div class="kid-seq" aria-label="${esc(r.seq.join(" "))}">${r.seq.map(x => `<span>${x}</span>`).join("")}<span class="q">${g.answered ? r.options[r.answer] : "❓"}</span></div>
      <div class="kid-choices three">${r.options.map((o, k) => `<button type="button" class="kid-choice big${g.answered && k === r.answer ? " right" : g.answered && k === g.choice ? " wrongpick" : ""}" data-opt="${k}" ${g.answered ? "disabled" : ""}>${o}</button>`).join("")}</div>
      ${g.answered ? feedback(ok, ok ? UI.patternOk : t("answerIs", { a: r.options[r.answer] })) + nextBtn(g.i === game.rounds.length - 1) : ""}`;
  }

  function matchView() {
    const done = g.matched.length === game.pairs.length;
    return `${head(game.prompt, 0, 0)}
      <p class="kid-robo-say" data-live role="status">${done ? "" : g.pick === null ? esc(UI.tapHelper) : esc(UI.nowJob)}</p>
      <div class="kid-match">
        <ul class="kid-helpers">${game.pairs.map((p, k) => `<li><button type="button" class="kid-pill${g.pick === k ? " picked" : ""}${g.matched.includes(k) ? " matched" : ""}" data-helper="${k}" ${g.matched.includes(k) ? "disabled" : ""}><span aria-hidden="true">${p.e}</span> ${esc(L(p.name))}</button></li>`).join("")}</ul>
        <ul class="kid-jobs">${g.jobs.map(k => `<li><button type="button" class="kid-pill job${g.matched.includes(k) ? " matched" : ""}" data-job="${k}" ${g.matched.includes(k) ? "disabled" : ""}>${g.matched.includes(k) ? `<span aria-hidden="true">${game.pairs[k].e}</span> ` : ""}${esc(L(game.pairs[k].job))}</button></li>`).join("")}</ul>
      </div>
      ${done ? nextBtn(true) : ""}`;
  }

  function promptView() {
    const r = game.rounds[g.i];
    const ok = g.answered && g.choice === r.answer;
    return `${head(game.prompt, g.i, game.rounds.length)}
      <div class="kid-card"><span class="kid-emoji" aria-hidden="true">🎯</span><p class="kid-card-text">${esc(L(r.goal))} ${hearBtn(L(r.goal))}</p></div>
      <div class="kid-choices stack">${r.options.map((o, k) => `<button type="button" class="kid-choice prompt${g.answered && k === r.answer ? " right" : g.answered && k === g.choice ? " wrongpick" : ""}" data-opt="${k}" ${g.answered ? "disabled" : ""}>💬 “${esc(L(o))}”</button>`).join("")}</div>
      ${g.answered ? `<div class="kid-result" aria-hidden="true">${ok ? r.result : "🤷❓🎨"}</div>${feedback(ok, ok ? UI.aiUnderstood : UI.aiConfused)}${nextBtn(g.i === game.rounds.length - 1)}` : ""}`;
  }

  function endView() {
    const stars = g.stars;
    const prev = levels[idx + 1];
    const extra = game.type === "teach"
      ? t(g.roboRight === game.test.length ? "teachDoneGood" : "teachDoneBad", { n: g.roboRight, t: game.test.length }) : (g.mistakes === 1 ? UI.oneMistake : g.mistakes ? t("mistakes", { n: g.mistakes }) : UI.perfect);
    return `<div class="kid-end" style="--c:${level.color}">
      <p class="kid-end-emoji" aria-hidden="true">${stars === 3 ? "🏆" : stars === 2 ? "🎉" : "👍"}</p>
      <h2>${esc(UI.great)}</h2>
      <p>${esc(UI.youEarned)}</p>
      ${starsHtml(stars)}
      <p class="small">${esc(extra)} ${hearBtn(extra)}</p>
      <div class="kid-badge-won"><span aria-hidden="true">${level.badge.e}</span><span><small>${esc(UI.badge)}</small><strong>${esc(L(level.badge.name))}</strong></span></div>
      <p class="kid-remember">📌 ${esc(L(level.remember))}</p>
      <div class="kid-end-actions">
        <button type="button" class="button btn-secondary" data-act="again">🔄 ${esc(UI.tryAgain)}</button>
        ${prev ? `<a class="button btn-primary" href="${prev.id}.html">${esc(UI.nextLevel)}: ${prev.icon} ${esc(L(prev.title))} →</a>` : `<a class="button btn-primary" href="./">🏆 ${esc(UI.map)}</a>`}
      </div>
      <p><a href="./">🗺️ ${esc(UI.map)}</a></p>
    </div>`;
  }

  function finish() {
    if (game.type === "teach") {
      g.roboRight = game.test.filter(x => g.taught[x.family] === x.fruit).length;
      g.stars = g.roboRight === game.test.length ? 3 : g.roboRight >= game.test.length - 1 ? 2 : 1;
    } else g.stars = starsFor(g.mistakes);
    state.stars[level.id] = Math.max(state.stars[level.id] || 0, g.stars);
    saveState();
    g.phase = "end";
    render();
    beep(true);
    confetti();
    mount.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  function answer(ok) {
    g.answered = true;
    if (!ok) g.mistakes++;
    beep(ok);
    render();
    const fb = live();
    if (fb) fb.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  function next(total) {
    if (g.i >= total - 1) { finish(); return; }
    g.i++;
    g.answered = false;
    g.choice = null;
    render();
  }

  function bind() {
    const on = (sel, fn) => mount.querySelectorAll(sel).forEach(el => el.addEventListener("click", fn));
    on("[data-yn]", e => {
      const it = g.items[g.i];
      g.choice = e.currentTarget.dataset.yn === "1";
      answer(g.choice === (game.type === "safe" ? it.answer : it.ai));
    });
    on("[data-teach]", e => {
      const it = game.train[g.i];
      g.taught[it.family] = e.currentTarget.dataset.teach === "1";
      beep(true);
      if (g.i === game.train.length - 1) { g.phase = "test"; g.i = 0; render(); return; }
      g.i++;
      render();
    });
    on("[data-opt]", e => {
      const r = game.rounds[g.i];
      g.choice = Number(e.currentTarget.dataset.opt);
      answer(g.choice === r.answer);
    });
    on("[data-helper]", e => { g.pick = Number(e.currentTarget.dataset.helper); render(); });
    on("[data-job]", e => {
      if (g.pick === null) { say(UI.tapHelper); return; }
      const k = Number(e.currentTarget.dataset.job);
      if (k === g.pick) { g.matched.push(k); beep(true); }
      else { g.mistakes++; beep(false); e.currentTarget.classList.add("shake"); setTimeout(render, 450); g.pick = null; return; }
      g.pick = null;
      render();
    });
    on('[data-act="next"]', () => {
      if (game.type === "teach") next(game.test.length);
      else if (game.type === "match") finish();
      else next(game.type === "pattern" || game.type === "prompt" ? game.rounds.length : g.items.length);
    });
    on('[data-act="again"]', () => { startGame(); mount.scrollIntoView({ block: "start" }); });
  }

  startGame();
})();
