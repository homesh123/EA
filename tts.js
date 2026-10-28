// "Listen" for lessons, using the browser's built-in speech synthesis (no server, no cost).
// Reads every element marked [data-read] inside a lesson, in page order, highlighting the part
// being read. Long text is split into sentences because some browsers stop long utterances early.
// Usage: LessonReader.attach(barElement, lessonElement, "en" | "hi").
var LessonReader = (function () {
  const synth = typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null;
  const supported = !!(synth && typeof SpeechSynthesisUtterance !== "undefined");
  let queue = [];
  let state = "idle"; // idle | playing | paused
  let current = null; // { bar, container, lang }
  let rate = 1;
  let seq = 0; // bumps on stop/restart so callbacks from cancelled sentences are ignored
  let speaking = null; // the sentence being read, so a speed change can restart it
  let stalled = false; // a sentence ended while paused: resume must start the next one itself
  try { rate = Number(localStorage.getItem("aipf:tts-rate")) || 1; } catch (e) { /* ignore */ }

  // Emoji are read out as their names ("house", "light bulb"), so strip them first.
  const clean = s => s.replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "").replace(/\s*\n+\s*/g, ". ").replace(/\s{2,}/g, " ").trim();

  function sentences(text) {
    const parts = text.match(/[^.!?;]+[.!?;]*/g) || [text];
    const out = [];
    parts.forEach(p => {
      const s = p.trim();
      if (!s) return;
      if (out.length && (out[out.length - 1] + " " + s).length < 180) out[out.length - 1] += " " + s;
      else out.push(s);
    });
    return out;
  }

  function pickVoice(lang) {
    const voices = synth.getVoices();
    const want = lang === "hi" ? ["hi-IN", "en-IN"] : ["en-IN", "en-GB", "en-US", "en"];
    for (const w of want) {
      const v = voices.find(x => x.lang && x.lang.replace("_", "-").toLowerCase().startsWith(w.toLowerCase()));
      if (v) return v;
    }
    return null;
  }

  function setHighlight(el) {
    if (!current) return;
    current.container.querySelectorAll(".reading").forEach(x => x.classList.remove("reading"));
    if (el) {
      el.classList.add("reading");
      const r = el.getBoundingClientRect();
      if (r.top < 60 || r.bottom > window.innerHeight) el.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }

  function updateBar() {
    if (!current) return;
    const { bar } = current;
    const btn = bar.querySelector('[data-tts="play"]');
    const stop = bar.querySelector('[data-tts="stop"]');
    const status = bar.querySelector('[data-tts="status"]');
    const d = bar.dataset;
    btn.textContent = state === "playing" ? `⏸ ${d.pause}` : state === "paused" ? `▶ ${d.resume}` : `🔊 ${d.listen}`;
    btn.setAttribute("aria-pressed", state === "playing");
    stop.hidden = state === "idle";
    bar.classList.toggle("is-reading", state !== "idle");
    if (status) status.textContent = state === "playing" ? d.reading : state === "paused" ? d.paused : "";
  }

  function speakNext() {
    if (!current) return;
    if (state !== "playing") { stalled = state === "paused"; return; }
    const item = queue.shift();
    if (!item) { stop(); return; }
    speaking = item;
    setHighlight(item.el);
    const id = ++seq;
    const u = new SpeechSynthesisUtterance(item.text);
    const voice = pickVoice(current.lang);
    if (voice) u.voice = voice;
    u.lang = voice ? voice.lang : current.lang === "hi" ? "hi-IN" : "en-IN";
    u.rate = rate;
    u.onend = () => { if (id === seq) speakNext(); };
    u.onerror = () => { if (id === seq) speakNext(); };
    synth.speak(u);
  }

  function start() {
    seq++;
    synth.cancel();
    queue = [];
    current.container.querySelectorAll("[data-read]").forEach(el => {
      const prefix = el.dataset.readPrefix ? `${el.dataset.readPrefix}. ` : "";
      const text = clean(prefix + (el.dataset.readText || el.innerText));
      sentences(text).forEach(s => queue.push({ el, text: s }));
    });
    state = "playing";
    updateBar();
    speakNext();
  }

  function stop() {
    seq++;
    speaking = null;
    stalled = false;
    if (synth) synth.cancel();
    queue = [];
    state = "idle";
    setHighlight(null);
    updateBar();
  }

  function attach(bar, container, lang) {
    if (!bar) return;
    // A new lesson view replaces the old one: stop reading the old content.
    if (current && current.bar !== bar) stop();
    if (!supported) {
      bar.querySelector('[data-tts="play"]').disabled = true;
      bar.querySelector('[data-tts="status"]').textContent = bar.dataset.unsupported;
      return;
    }
    current = { bar, container, lang };
    const speed = bar.querySelector('[data-tts="rate"]');
    if (speed) {
      speed.value = String(rate);
      speed.addEventListener("change", () => {
        rate = Number(speed.value) || 1;
        try { localStorage.setItem("aipf:tts-rate", String(rate)); } catch (e) { /* ignore */ }
        if (state === "playing" && speaking) { // restart the current sentence at the new speed
          seq++;
          synth.cancel();
          queue.unshift(speaking);
          speakNext();
        }
      });
    }
    bar.querySelector('[data-tts="play"]').addEventListener("click", () => {
      if (state === "idle") start();
      else if (state === "playing") { synth.pause(); state = "paused"; updateBar(); }
      else {
        synth.resume(); state = "playing"; updateBar();
        if (stalled) { stalled = false; speakNext(); }
      }
    });
    bar.querySelector('[data-tts="stop"]').addEventListener("click", stop);
    updateBar();
  }

  if (typeof window !== "undefined") window.addEventListener("pagehide", () => synth && synth.cancel());
  // Some browsers load voices asynchronously; touching the list early makes them available sooner.
  if (supported) { synth.getVoices(); if (synth.addEventListener) synth.addEventListener("voiceschanged", () => {}); }

  // Player bar markup, shared by the Learn app and the static lesson pages. `ui` holds the
  // translated labels (listen, pause, resume, stop, speed, reading, paused, unsupported).
  function barHtml(ui) {
    const a = s => String(s).replace(/"/g, "&quot;");
    return `<div class="listen-bar" data-reader data-listen="${a(ui.listen)}" data-pause="${a(ui.pause)}" data-resume="${a(ui.resume)}" data-reading="${a(ui.reading)}" data-paused="${a(ui.paused)}" data-unsupported="${a(ui.unsupported)}">
      <button type="button" class="listen-btn" data-tts="play" aria-pressed="false">🔊 ${ui.listen}</button>
      <button type="button" class="listen-stop" data-tts="stop" hidden>⏹ ${ui.stop}</button>
      <label class="listen-rate"><span class="sr-only">${ui.speed}</span><select data-tts="rate" aria-label="${a(ui.speed)}">
        <option value="0.75">0.75×</option><option value="1" selected>1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option></select></label>
      <span class="small muted" data-tts="status" role="status"></span>
    </div>`;
  }

  return { attach, stop, supported, sentences, clean, barHtml };
})();

if (typeof module !== "undefined" && module.exports) module.exports = { LessonReader };
