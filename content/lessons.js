// Node entry point that merges every lesson file. In the browser, the lesson files are loaded
// with plain <script> tags and merge themselves into the global LESSON_TOPICS object.
const LESSON_TOPICS = Object.assign({},
  require("./lessons-foundations.js").LESSON_TOPICS,
  require("./lessons-ml.js").LESSON_TOPICS,
  require("./lessons-genai.js").LESSON_TOPICS,
  require("./lessons-engineering.js").LESSON_TOPICS,
  require("./lessons-product-career.js").LESSON_TOPICS
);
const LESSON_FILES = ["lessons-foundations.js", "lessons-ml.js", "lessons-genai.js", "lessons-engineering.js", "lessons-product-career.js"];
// Deeper content per lesson (step by step, common mistakes, learner questions), same grouping.
const DEEP_FILES = ["deep-foundations.js", "deep-ml.js", "deep-genai.js", "deep-engineering.js", "deep-product-career.js"];
const LESSON_DEEP = Object.assign({}, ...DEEP_FILES.map(f => require("./" + f).LESSON_DEEP));

module.exports = { LESSON_TOPICS, LESSON_FILES, LESSON_DEEP, DEEP_FILES, ...require("./learn-tracks.js") };
