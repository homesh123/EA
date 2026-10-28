// Homepage "Learn for your target AI role" picker: tabs switch between role briefs. Without
// JavaScript every brief stays visible, so the content is always readable and crawlable.
(function () {
  const tabs = [...document.querySelectorAll("[data-hub]")];
  const panels = [...document.querySelectorAll("[data-hub-panel]")];
  if (!tabs.length) return;
  let saved = null;
  try { saved = (JSON.parse(localStorage.getItem("aipf:v2")) || {}).roleId; } catch (e) { /* ignore */ }
  function show(id, focus) {
    tabs.forEach(t => {
      const on = t.dataset.hub === id;
      t.setAttribute("aria-selected", on);
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    panels.forEach(p => { p.hidden = p.dataset.hubPanel !== id; });
  }
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => show(t.dataset.hub));
    t.addEventListener("keydown", e => {
      const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      show(tabs[(i + d + tabs.length) % tabs.length].dataset.hub, true);
    });
  });
  show(tabs.some(t => t.dataset.hub === saved) ? saved : tabs[0].dataset.hub);
})();
