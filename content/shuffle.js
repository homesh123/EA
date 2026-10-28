// Stable, seeded option order for quiz questions. The same seed always gives the same order, so
// a question looks the same on every visit and static pages match the app. Different questions
// (and interview retakes, which add the attempt number to the seed) get different orders, so the
// correct answer isn't always in the same position.
function optionOrder(seed, n) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
    h = Math.imul(h ^ (h >>> 13), 3266489909) >>> 0;
    const j = h % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

if (typeof module !== "undefined" && module.exports) module.exports = { optionOrder };
