const tabs = document.querySelectorAll(".tab-button");
const panels = document.querySelectorAll(".tab-panel");
const vocabList = document.getElementById("vocab-list");
const vocabSearch = document.getElementById("vocab-search");
const topicFilters = document.getElementById("topic-filters");
const reviewDifficultButton = document.getElementById("review-difficult");
const notesList = document.getElementById("notes-list");
const flashcardFront = document.getElementById("flashcard-front");
const flashcardBack = document.getElementById("flashcard-back");
const showAnswerButton = document.getElementById("show-answer");
const nextCardButton = document.getElementById("next-card");
const speakCardButton = document.getElementById("speak-card");
const difficultReview = document.getElementById("difficult-review");
const quizList = document.getElementById("quiz-list");
const checkQuizButton = document.getElementById("check-quiz");
const resetQuizButton = document.getElementById("reset-quiz");
const quizResult = document.getElementById("quiz-result");
const quizHistory = document.getElementById("quiz-history");
const writingForm = document.getElementById("writing-form");
const writingText = document.getElementById("writing-text");
const writingFeedback = document.getElementById("writing-feedback");
const clearWritingButton = document.getElementById("clear-writing");
const writingPromptText = document.getElementById("writing-prompt-text");
const nextWritingPromptButton = document.getElementById("next-writing-prompt");
const showWritingModelButton = document.getElementById("show-writing-model");
const writingModel = document.getElementById("writing-model");
const feedbackForm = document.getElementById("feedback-form");
const feedbackText = document.getElementById("feedback-text");
const feedbackStatus = document.getElementById("feedback-status");
const clearFeedbackButton = document.getElementById("clear-feedback");
const translateForm = document.getElementById("translate-form");
const translateInput = document.getElementById("translate-input");
const translateOutput = document.getElementById("translate-output");
const speakTranslationButton = document.getElementById("speak-translation");

const storageKeys = {
  difficult: "spanish-learning-difficult",
  feedback: "spanish-learning-feedback",
  writing: "spanish-learning-writing",
  quizHistory: "spanish-learning-quiz-history",
  writingPromptIndex: "spanish-learning-writing-prompt-index"
};

const vocabulary = [
  { id: "hablar", spanish: "hablar", english: "to speak", day: "Day 1", topic: "verbs", example: "Yo hablo español." },
  { id: "comer", spanish: "comer", english: "to eat", day: "Day 1", topic: "verbs", example: "Ellos comen pizza." },
  { id: "vivir", spanish: "vivir", english: "to live", day: "Day 1", topic: "verbs", example: "Yo vivo en Florida." },
  { id: "estudiar", spanish: "estudiar", english: "to study", day: "Day 1", topic: "verbs", example: "Nosotros estudiamos español." },
  { id: "trabajar", spanish: "trabajar", english: "to work", day: "Day 1", topic: "verbs", example: "Yo trabajo en casa." },
  { id: "cocinar", spanish: "cocinar", english: "to cook", day: "Day 1", topic: "verbs", example: "Yo cocino en casa." },
  { id: "limpiar", spanish: "limpiar", english: "to clean", day: "Day 1", topic: "verbs", example: "Ella limpia." },
  { id: "casa", spanish: "la casa", english: "the house", day: "Day 1", topic: "places", example: "Yo vivo en casa." },
  { id: "escuela", spanish: "la escuela", english: "the school", day: "Day 1", topic: "places", example: "Nosotros estudiamos en la escuela." },
  { id: "comida", spanish: "la comida", english: "food / meal", day: "Day 1", topic: "places", example: "Ellos comen la comida." },
  { id: "ser", spanish: "ser", english: "to be", day: "Day 2", topic: "verbs", example: "Yo soy de Florida." },
  { id: "estar", spanish: "estar", english: "to be", day: "Day 2", topic: "verbs", example: "Yo estoy en casa." },
  { id: "estudiante", spanish: "estudiante", english: "student", day: "Day 2", topic: "places", example: "Yo soy un estudiante de español." },
  { id: "hoy", spanish: "hoy", english: "today", day: "Day 2", topic: "questions", example: "Hoy estoy cansado." },
  { id: "cansado", spanish: "cansado", english: "tired", day: "Day 2", topic: "feelings", example: "Hoy estoy cansado." },
  { id: "ocupado", spanish: "ocupado", english: "busy", day: "Day 2", topic: "feelings", example: "Hoy estoy ocupado." },
  { id: "contento", spanish: "contento", english: "happy", day: "Day 2", topic: "feelings", example: "Hoy estoy contento." },
  { id: "ir", spanish: "ir", english: "to go", day: "Day 3", topic: "verbs", example: "Yo voy a casa." },
  { id: "tener", spanish: "tener", english: "to have", day: "Day 3", topic: "verbs", example: "Yo tengo trabajo." },
  { id: "hacer", spanish: "hacer", english: "to do / to make", day: "Day 3", topic: "verbs", example: "Yo hago la comida en casa." },
  { id: "querer", spanish: "querer", english: "to want", day: "Day 3", topic: "verbs", example: "Yo quiero pizza." },
  { id: "tranquilo", spanish: "tranquilo", english: "calm", day: "Day 3", topic: "feelings", example: "Hoy estoy tranquilo." },
  { id: "nervioso", spanish: "nervioso", english: "nervous", day: "Day 3", topic: "feelings", example: "Hoy estoy nervioso." },
  { id: "orgulloso", spanish: "orgulloso", english: "proud", day: "Day 3", topic: "feelings", example: "Hoy estoy orgulloso." },
  { id: "que", spanish: "¿Qué?", english: "What?", day: "Day 4", topic: "questions", example: "¿Qué quieres comer hoy?" },
  { id: "donde", spanish: "¿Dónde?", english: "Where?", day: "Day 4", topic: "questions", example: "¿Dónde vas hoy?" },
  { id: "cuando", spanish: "¿Cuándo?", english: "When?", day: "Day 4", topic: "questions", example: "¿Cuándo vas a la escuela?" },
  { id: "como", spanish: "¿Cómo?", english: "How?", day: "Day 4", topic: "questions", example: "¿Cómo estás hoy?" },
  { id: "quien", spanish: "¿Quién?", english: "Who?", day: "Day 4", topic: "questions", example: "¿Quién?" }
];

const noteDays = [
  {
    title: "Day 1",
    focus: "Regular present tense verbs",
    points: [
      "Learned the three infinitive groups: -ar, -er, and -ir.",
      "Practiced regular present-tense forms such as hablo, vives, hablamos, and comen.",
      "Built simple real-life sentences about Florida, Maryland, home, school, work, and food."
    ],
    examples: [
      "Yo hablo español.",
      "Nosotros vivimos en Florida.",
      "Ellos trabajan en casa."
    ]
  },
  {
    title: "Day 2",
    focus: "Ser and estar",
    points: [
      "Separated identity and origin uses of ser from location and condition uses of estar.",
      "Practiced forms such as soy, eres, somos, estoy, estás, and están.",
      "Reviewed common mistakes such as using ser for location."
    ],
    examples: [
      "Yo soy de Florida.",
      "Yo estoy en casa.",
      "Hoy estoy ocupado, pero contento."
    ]
  },
  {
    title: "Day 3",
    focus: "Ir, tener, hacer, querer",
    points: [
      "Added four high-frequency verbs for daily life.",
      "Used yo and nosotros forms such as voy, tengo, hago, quiero, vamos, tenemos, hacemos, and queremos.",
      "Practiced feelings with estar plus adjectives."
    ],
    examples: [
      "Yo voy a casa.",
      "Nosotros hacemos la tarea.",
      "Hoy estoy cansado pero ocupado."
    ]
  },
  {
    title: "Day 4",
    focus: "Basic questions",
    points: [
      "Learned question words such as qué, dónde, cuándo, cómo, and quién.",
      "Practiced yes/no questions and question patterns with ir, tener, hacer, querer, and estar.",
      "Used short question-and-answer models for speaking practice."
    ],
    examples: [
      "¿Dónde vas hoy?",
      "¿Qué haces en casa?",
      "¿Estás cansado hoy?"
    ]
  }
];

const flashcards = [
  { front: "Translate: I speak Spanish.", back: "Yo hablo español." },
  { front: "Translate: We are in Florida.", back: "Nosotros estamos en Florida." },
  { front: "Which verb means 'to want'?", back: "querer" },
  { front: "How do you ask: How are you today?", back: "¿Cómo estás hoy?" },
  { front: "Translate: Today I am calm.", back: "Hoy estoy tranquilo." },
  { front: "How do you say: Where are you going today?", back: "¿Dónde vas hoy?" }
];

const quizQuestions = [
  {
    prompt: "Which form is correct for 'we live'?",
    options: ["nosotros vive", "nosotros vivimos", "nosotros viven"],
    answer: "nosotros vivimos",
    explanation: "Use the nosotros ending for regular -ir verbs: vivir -> vivimos."
  },
  {
    prompt: "Choose the correct sentence for location.",
    options: ["Nosotros somos en Florida.", "Nosotros estamos en Florida.", "Nosotros es en Florida."],
    answer: "Nosotros estamos en Florida.",
    explanation: "Use estar for location. Ser is not used for where a person is."
  },
  {
    prompt: "Which verb means 'to have'?",
    options: ["tener", "hacer", "querer"],
    answer: "tener",
    explanation: "Tener means 'to have'. Hacer means 'to do/make', and querer means 'to want'."
  },
  {
    prompt: "What does '¿Qué?' mean?",
    options: ["When?", "What?", "Who?"],
    answer: "What?",
    explanation: "¿Qué? is the basic question word for 'What?'."
  }
];

const writingPrompts = [
  {
    english: "I am from Florida. Today I am at home. I study Spanish and I work at home.",
    spanish: "Yo soy de Florida. Hoy estoy en casa. Yo estudio español y trabajo en casa.",
    checks: [
      { test: (text) => /\bsoy\b/i.test(text), message: "Use 'soy' for identity or origin: 'I am from Florida' -> 'Yo soy de Florida.'" },
      { test: (text) => /\bestoy en casa\b/i.test(text), message: "Use 'estoy en casa' for location. In Spanish, location uses estar, not ser." },
      { test: (text) => /\bestudio español\b/i.test(text), message: "Include 'Yo estudio español' to show the action 'I study Spanish'." },
      { test: (text) => /\btrabajo en casa\b/i.test(text), message: "Use 'trabajo en casa' for 'I work at home'." }
    ]
  },
  {
    english: "Today I am tired but calm. I want pizza. I make food at home.",
    spanish: "Hoy estoy cansado pero tranquilo. Yo quiero pizza. Yo hago la comida en casa.",
    checks: [
      { test: (text) => /\bestoy cansado\b/i.test(text), message: "Use 'estoy cansado' for 'I am tired'. Feelings usually use estar." },
      { test: (text) => /\btranquilo\b/i.test(text), message: "Include 'tranquilo' for 'calm'." },
      { test: (text) => /\bquiero pizza\b/i.test(text), message: "Use 'quiero pizza' for 'I want pizza'." },
      { test: (text) => /\bhago la comida en casa\b/i.test(text), message: "Use 'hago la comida en casa' for 'I make food at home'." }
    ]
  },
  {
    english: "We study Spanish at school. We live in Florida. Today we are busy.",
    spanish: "Nosotros estudiamos español en la escuela. Nosotros vivimos en Florida. Hoy estamos ocupados.",
    checks: [
      { test: (text) => /\bnosotros estudiamos español\b/i.test(text), message: "Use the nosotros form 'estudiamos' for 'we study'." },
      { test: (text) => /\ben la escuela\b/i.test(text), message: "Include 'en la escuela' for 'at school'." },
      { test: (text) => /\bnosotros vivimos en florida\b/i.test(text), message: "Use 'vivimos' for 'we live'." },
      { test: (text) => /\bestamos ocupad/i.test(text), message: "Use estar for temporary condition: 'we are busy' -> 'estamos ocupados/ocupadas'." }
    ]
  },
  {
    english: "Where are you going today? I go to school. What do you want to eat today? I want pizza.",
    spanish: "¿Dónde vas hoy? Yo voy a la escuela. ¿Qué quieres comer hoy? Yo quiero pizza.",
    checks: [
      { test: (text) => /¿dónde vas hoy\?/i.test(text) || /dónde vas hoy/i.test(text), message: "The first sentence should ask '¿Dónde vas hoy?'." },
      { test: (text) => /\bvoy a la escuela\b/i.test(text), message: "Use 'voy a la escuela' for 'I go to school'." },
      { test: (text) => /¿qué quieres comer hoy\?/i.test(text) || /qué quieres comer hoy/i.test(text), message: "The second question should be '¿Qué quieres comer hoy?'." },
      { test: (text) => /\bquiero pizza\b/i.test(text), message: "Use 'quiero pizza' for 'I want pizza'." }
    ]
  }
];

const translationMap = [
  { pattern: /\bi am from florida\b/gi, replacement: "Yo soy de Florida" },
  { pattern: /\bi am at home\b/gi, replacement: "Yo estoy en casa" },
  { pattern: /\btoday i am at home\b/gi, replacement: "Hoy estoy en casa" },
  { pattern: /\btoday i am tired\b/gi, replacement: "Hoy estoy cansado" },
  { pattern: /\btoday i am busy\b/gi, replacement: "Hoy estoy ocupado" },
  { pattern: /\btoday i am calm\b/gi, replacement: "Hoy estoy tranquilo" },
  { pattern: /\bi study spanish\b/gi, replacement: "Yo estudio español" },
  { pattern: /\bwe study spanish\b/gi, replacement: "Nosotros estudiamos español" },
  { pattern: /\bi work at home\b/gi, replacement: "Yo trabajo en casa" },
  { pattern: /\bi work in the house\b/gi, replacement: "Yo trabajo en casa" },
  { pattern: /\bi want pizza\b/gi, replacement: "Yo quiero pizza" },
  { pattern: /\bi want to study spanish\b/gi, replacement: "Yo quiero estudiar español" },
  { pattern: /\bi go to school\b/gi, replacement: "Yo voy a la escuela" },
  { pattern: /\bwhere are you going today\??\b/gi, replacement: "¿Dónde vas hoy?" },
  { pattern: /\bhow are you today\??\b/gi, replacement: "¿Cómo estás hoy?" }
];

let currentFlashcard = 0;
let activeTopic = "all";
let currentWritingPrompt = 0;

function getStoredArray(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function setStoredArray(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function activateTab(tabName) {
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === tabName));
  panels.forEach((panel) => panel.classList.toggle("active", panel.id === tabName));
}

function speakText(text) {
  if (!("speechSynthesis" in window)) {
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-ES";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function renderTopicFilters() {
  const topics = ["all", ...new Set(vocabulary.map((item) => item.topic))];
  topicFilters.innerHTML = topics.map((topic) => `
    <button
      type="button"
      class="filter-chip ${topic === activeTopic ? "active-chip" : ""}"
      data-topic="${topic}"
    >${topic}</button>
  `).join("");

  topicFilters.querySelectorAll(".filter-chip").forEach((button) => {
    button.addEventListener("click", () => {
      activeTopic = button.dataset.topic;
      renderTopicFilters();
      applyVocabularyFilters();
    });
  });
}

function toggleDifficultWord(id) {
  const difficult = getStoredArray(storageKeys.difficult);
  const next = difficult.includes(id)
    ? difficult.filter((item) => item !== id)
    : [...difficult, id];
  setStoredArray(storageKeys.difficult, next);
  applyVocabularyFilters();
  renderDifficultReview();
}

function applyVocabularyFilters(showOnlyDifficult = false) {
  const term = vocabSearch.value.trim().toLowerCase();
  const difficult = getStoredArray(storageKeys.difficult);
  const items = vocabulary.filter((item) => {
    const matchesSearch = [item.spanish, item.english, item.day, item.example, item.topic]
      .some((value) => value.toLowerCase().includes(term));
    const matchesTopic = activeTopic === "all" || item.topic === activeTopic;
    const matchesDifficult = !showOnlyDifficult || difficult.includes(item.id);
    return matchesSearch && matchesTopic && matchesDifficult;
  });
  renderVocabulary(items, difficult, showOnlyDifficult);
}

function renderVocabulary(items, difficultWords, difficultMode) {
  if (items.length === 0) {
    vocabList.innerHTML = `<div class="result-box muted">${difficultMode ? "No difficult words match the current filter." : "No vocabulary matches the current search or topic filter."}</div>`;
    return;
  }

  vocabList.innerHTML = items.map((item) => `
    <article class="vocab-card">
      <div class="vocab-header">
        <div>
          <h3>${item.spanish}</h3>
          <p class="vocab-meta">${item.english} • ${item.day} • ${item.topic}</p>
        </div>
        <button type="button" class="mini-button pronounce-word" data-text="${item.spanish}">Audio</button>
      </div>
      <p>${item.example}</p>
      <div class="button-row">
        <button
          type="button"
          class="secondary-button mark-difficult"
          data-id="${item.id}"
        >${difficultWords.includes(item.id) ? "Marked Difficult" : "Mark Difficult"}</button>
        <button type="button" class="secondary-button pronounce-word" data-text="${item.example}">Phrase Audio</button>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".mark-difficult").forEach((button) => {
    button.addEventListener("click", () => toggleDifficultWord(button.dataset.id));
  });

  document.querySelectorAll(".pronounce-word").forEach((button) => {
    button.addEventListener("click", () => speakText(button.dataset.text));
  });
}

function renderNotes() {
  notesList.innerHTML = noteDays.map((day) => `
    <article class="note-card">
      <h3>${day.title}</h3>
      <p><strong>Focus:</strong> ${day.focus}</p>
      <ul class="note-list">${day.points.map((point) => `<li>${point}</li>`).join("")}</ul>
      <p><strong>Example lines</strong></p>
      <ul class="note-list">${day.examples.map((example) => `<li>${example}</li>`).join("")}</ul>
    </article>
  `).join("");
}

function showFlashcard(index) {
  const card = flashcards[index];
  flashcardFront.textContent = card.front;
  flashcardBack.textContent = card.back;
  flashcardBack.classList.add("hidden");
}

function renderQuiz() {
  quizList.innerHTML = quizQuestions.map((question, index) => `
    <article class="quiz-card">
      <p><strong>${index + 1}.</strong> ${question.prompt}</p>
      <div class="quiz-options">
        ${question.options.map((option) => `
          <label>
            <input type="radio" name="quiz-${index}" value="${option}">
            <span>${option}</span>
          </label>
        `).join("")}
      </div>
    </article>
  `).join("");
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function renderQuizHistory() {
  const history = JSON.parse(window.localStorage.getItem(storageKeys.quizHistory) || "{}");
  const today = history[todayKey()];
  if (!today) {
    quizHistory.textContent = "No quiz score saved for today.";
    return;
  }
  quizHistory.textContent = `Today's saved score: ${today.score}/${today.total}. Saved on ${today.date}.`;
}

function checkQuiz() {
  let score = 0;
  const explanations = [];

  quizQuestions.forEach((question, index) => {
    const selected = document.querySelector(`input[name="quiz-${index}"]:checked`);
    if (selected && selected.value === question.answer) {
      score += 1;
    } else {
      explanations.push(`<li><strong>Question ${index + 1}:</strong> Correct answer: ${question.answer}. ${question.explanation}</li>`);
    }
  });

  const history = JSON.parse(window.localStorage.getItem(storageKeys.quizHistory) || "{}");
  history[todayKey()] = { score, total: quizQuestions.length, date: new Date().toLocaleString() };
  window.localStorage.setItem(storageKeys.quizHistory, JSON.stringify(history));

  quizResult.innerHTML = `
    <p><strong>Score:</strong> ${score} out of ${quizQuestions.length}</p>
    ${explanations.length ? `<p><strong>Why the wrong answers were wrong</strong></p><ul>${explanations.join("")}</ul>` : "<p>Perfect score. All answers are correct.</p>"}
  `;
  quizResult.classList.remove("muted");
  renderQuizHistory();
}

function resetQuiz() {
  document.querySelectorAll('#quiz-list input[type="radio"]').forEach((input) => {
    input.checked = false;
  });
  quizResult.textContent = "Quiz reset. Choose an answer for each question, then check your score.";
  quizResult.classList.add("muted");
}

function renderDifficultReview() {
  const difficultIds = getStoredArray(storageKeys.difficult);
  const items = vocabulary.filter((item) => difficultIds.includes(item.id));
  if (!items.length) {
    difficultReview.textContent = "Mark words as difficult in Vocabulary. They will appear here for spaced review.";
    return;
  }

  difficultReview.innerHTML = `
    <p><strong>Review these words aloud:</strong></p>
    <ul>${items.map((item) => `<li>${item.spanish} - ${item.english}</li>`).join("")}</ul>
  `;
}

function reviewDifficultWords() {
  activeTopic = "all";
  renderTopicFilters();
  activateTab("vocabulary");
  applyVocabularyFilters(true);
}

function normalizeSpanish(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?!.;,]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function renderWritingPrompt() {
  const prompt = writingPrompts[currentWritingPrompt];
  writingPromptText.textContent = prompt.english;
  writingModel.textContent = prompt.spanish;
  writingModel.classList.add("hidden");
}

function evaluateWriting(text) {
  if (!text.trim()) {
    return {
      ok: false,
      html: "<p>Please write the paragraph in Spanish first.</p>"
    };
  }

  const prompt = writingPrompts[currentWritingPrompt];
  const normalized = normalizeSpanish(text);
  const model = normalizeSpanish(prompt.spanish);
  const feedback = [];

  prompt.checks.forEach((rule) => {
    if (!rule.test(normalized)) {
      feedback.push(rule.message);
    }
  });

  if (normalized.includes("soy en") || normalized.includes("somos en")) {
    feedback.push("Location needs estar, not ser. For example, say 'estoy en casa', not 'soy en casa'.");
  }

  if (normalized.includes("yo yo")) {
    feedback.push("You repeated 'yo' too often. Spanish usually sounds more natural with fewer repeated pronouns.");
  }

  if (feedback.length === 0) {
    return {
      ok: true,
      html: `
        <p><strong>Very good.</strong> Your Spanish matches the main ideas of the model paragraph.</p>
        <p><strong>Model answer:</strong> ${prompt.spanish}</p>
        <p><strong>English explanation:</strong> You used the right beginner patterns and vocabulary for this prompt.</p>
      `
    };
  }

  return {
    ok: false,
    html: `
      <p><strong>Suggested correction:</strong> ${prompt.spanish}</p>
      <p><strong>English explanation of mistakes:</strong></p>
      <ul>${feedback.map((item) => `<li>${item}</li>`).join("")}</ul>
      <p><strong>Why this matters:</strong> The correction uses only the verbs, places, feelings, and question forms already learned in Days 1 to 4.</p>
      <p><strong>Try again:</strong> Rewrite the same paragraph once more, then move to a different paragraph.</p>
    `
    };
}

function translateParagraph(text) {
  if (!text.trim()) {
    return "Please enter an English paragraph first.";
  }

  const segments = text
    .split(/[.!?]+/)
    .map((part) => part.trim())
    .filter(Boolean);

  const translated = segments.map((segment) => {
    let current = segment.toLowerCase();
    translationMap.forEach((rule) => {
      current = current.replace(rule.pattern, rule.replacement);
    });
    current = current
      .replace(/\bi\b/g, "yo")
      .replace(/\bwe\b/g, "nosotros")
      .replace(/\bam\b/g, "soy")
      .replace(/\bare\b/g, "están")
      .replace(/\bat home\b/g, "en casa")
      .replace(/\bspanish\b/g, "español");

    current = current.charAt(0).toUpperCase() + current.slice(1);
    return current.endsWith("?") ? current : `${current}.`;
  });

  return translated.join(" ");
}

function loadFeedback() {
  const saved = window.localStorage.getItem(storageKeys.feedback);
  if (saved) {
    feedbackText.value = saved;
    feedbackStatus.textContent = "Saved feedback loaded from this browser.";
  }
}

function loadWriting() {
  const saved = window.localStorage.getItem(storageKeys.writing);
  const savedPromptIndex = Number(window.localStorage.getItem(storageKeys.writingPromptIndex));
  if (!Number.isNaN(savedPromptIndex) && writingPrompts[savedPromptIndex]) {
    currentWritingPrompt = savedPromptIndex;
  }
  renderWritingPrompt();
  if (saved) {
    writingText.value = saved;
    const result = evaluateWriting(saved);
    writingFeedback.innerHTML = result.html;
    writingFeedback.classList.toggle("muted", false);
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateTab(tab.dataset.tab));
});

vocabSearch.addEventListener("input", () => applyVocabularyFilters());
reviewDifficultButton.addEventListener("click", reviewDifficultWords);

showAnswerButton.addEventListener("click", () => {
  flashcardBack.classList.remove("hidden");
});

nextCardButton.addEventListener("click", () => {
  currentFlashcard = (currentFlashcard + 1) % flashcards.length;
  showFlashcard(currentFlashcard);
});

speakCardButton.addEventListener("click", () => {
  speakText(flashcardBack.classList.contains("hidden") ? flashcardFront.textContent : flashcardBack.textContent);
});

checkQuizButton.addEventListener("click", checkQuiz);
resetQuizButton.addEventListener("click", resetQuiz);

writingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = writingText.value.trim();
  window.localStorage.setItem(storageKeys.writing, value);
  const result = evaluateWriting(value);
  writingFeedback.innerHTML = result.html;
  writingFeedback.classList.toggle("muted", false);
});

clearWritingButton.addEventListener("click", () => {
  window.localStorage.removeItem(storageKeys.writing);
  writingText.value = "";
  writingFeedback.textContent = "Writing cleared. Use the current English paragraph and write it again in Spanish.";
  writingFeedback.classList.add("muted");
});

nextWritingPromptButton.addEventListener("click", () => {
  currentWritingPrompt = (currentWritingPrompt + 1) % writingPrompts.length;
  window.localStorage.setItem(storageKeys.writingPromptIndex, String(currentWritingPrompt));
  writingText.value = "";
  window.localStorage.removeItem(storageKeys.writing);
  renderWritingPrompt();
  writingFeedback.textContent = "A different English paragraph is ready. Write it in Spanish using only learned vocabulary.";
  writingFeedback.classList.add("muted");
});

showWritingModelButton.addEventListener("click", () => {
  writingModel.classList.toggle("hidden");
});

feedbackForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = feedbackText.value.trim();
  if (!value) {
    feedbackStatus.textContent = "Please write a comment before saving.";
    return;
  }
  window.localStorage.setItem(storageKeys.feedback, value);
  feedbackStatus.textContent = "Feedback saved locally in this browser.";
});

clearFeedbackButton.addEventListener("click", () => {
  window.localStorage.removeItem(storageKeys.feedback);
  feedbackText.value = "";
  feedbackStatus.textContent = "Saved feedback cleared.";
});

translateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  translateOutput.textContent = translateParagraph(translateInput.value);
  translateOutput.classList.remove("muted");
});

speakTranslationButton.addEventListener("click", () => {
  if (translateOutput.textContent && !translateOutput.classList.contains("muted")) {
    speakText(translateOutput.textContent);
  }
});

renderTopicFilters();
applyVocabularyFilters();
renderNotes();
renderQuiz();
showFlashcard(currentFlashcard);
renderDifficultReview();
renderQuizHistory();
loadFeedback();
loadWriting();
