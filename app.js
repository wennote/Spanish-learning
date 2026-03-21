const tabs = document.querySelectorAll(".tab-button");
const panels = document.querySelectorAll(".tab-panel");
const vocabList = document.getElementById("vocab-list");
const vocabSearch = document.getElementById("vocab-search");
const notesList = document.getElementById("notes-list");
const flashcardFront = document.getElementById("flashcard-front");
const flashcardBack = document.getElementById("flashcard-back");
const showAnswerButton = document.getElementById("show-answer");
const nextCardButton = document.getElementById("next-card");
const quizList = document.getElementById("quiz-list");
const checkQuizButton = document.getElementById("check-quiz");
const quizResult = document.getElementById("quiz-result");
const feedbackForm = document.getElementById("feedback-form");
const feedbackText = document.getElementById("feedback-text");
const feedbackStatus = document.getElementById("feedback-status");
const clearFeedbackButton = document.getElementById("clear-feedback");

const vocabulary = [
  { spanish: "hablar", english: "to speak", day: "Day 1", example: "Yo hablo español." },
  { spanish: "comer", english: "to eat", day: "Day 1", example: "Ellos comen pizza." },
  { spanish: "vivir", english: "to live", day: "Day 1", example: "Yo vivo en Florida." },
  { spanish: "estudiar", english: "to study", day: "Day 1", example: "Nosotros estudiamos español." },
  { spanish: "trabajar", english: "to work", day: "Day 1", example: "Yo trabajo en casa." },
  { spanish: "cocinar", english: "to cook", day: "Day 1", example: "Yo cocino en casa." },
  { spanish: "limpiar", english: "to clean", day: "Day 1", example: "Ella limpia." },
  { spanish: "la casa", english: "the house", day: "Day 1", example: "Yo vivo en casa." },
  { spanish: "la escuela", english: "the school", day: "Day 1", example: "Nosotros estudiamos en la escuela." },
  { spanish: "la comida", english: "food / meal", day: "Day 1", example: "Ellos comen la comida." },
  { spanish: "ser", english: "to be", day: "Day 2", example: "Yo soy de Florida." },
  { spanish: "estar", english: "to be", day: "Day 2", example: "Yo estoy en casa." },
  { spanish: "estudiante", english: "student", day: "Day 2", example: "Yo soy un estudiante de español." },
  { spanish: "hoy", english: "today", day: "Day 2", example: "Hoy estoy cansado." },
  { spanish: "cansado", english: "tired", day: "Day 2", example: "Hoy estoy cansado." },
  { spanish: "ocupado", english: "busy", day: "Day 2", example: "Hoy estoy ocupado." },
  { spanish: "contento", english: "happy", day: "Day 2", example: "Hoy estoy contento." },
  { spanish: "ir", english: "to go", day: "Day 3", example: "Yo voy a casa." },
  { spanish: "tener", english: "to have", day: "Day 3", example: "Yo tengo trabajo." },
  { spanish: "hacer", english: "to do / to make", day: "Day 3", example: "Yo hago la comida en casa." },
  { spanish: "querer", english: "to want", day: "Day 3", example: "Yo quiero pizza." },
  { spanish: "tranquilo", english: "calm", day: "Day 3", example: "Hoy estoy tranquilo." },
  { spanish: "nervioso", english: "nervous", day: "Day 3", example: "Hoy estoy nervioso." },
  { spanish: "orgulloso", english: "proud", day: "Day 3", example: "Hoy estoy orgulloso." },
  { spanish: "¿Qué?", english: "What?", day: "Day 4", example: "¿Qué quieres comer hoy?" },
  { spanish: "¿Dónde?", english: "Where?", day: "Day 4", example: "¿Dónde vas hoy?" },
  { spanish: "¿Cuándo?", english: "When?", day: "Day 4", example: "¿Cuándo vas a la escuela?" },
  { spanish: "¿Cómo?", english: "How?", day: "Day 4", example: "¿Cómo estás hoy?" },
  { spanish: "¿Quién?", english: "Who?", day: "Day 4", example: "¿Quién?" }
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
    answer: "nosotros vivimos"
  },
  {
    prompt: "Choose the correct sentence for location.",
    options: ["Nosotros somos en Florida.", "Nosotros estamos en Florida.", "Nosotros es en Florida."],
    answer: "Nosotros estamos en Florida."
  },
  {
    prompt: "Which verb means 'to have'?",
    options: ["tener", "hacer", "querer"],
    answer: "tener"
  },
  {
    prompt: "What does '¿Qué?' mean?",
    options: ["When?", "What?", "Who?"],
    answer: "What?"
  }
];

let currentFlashcard = 0;

function activateTab(tabName) {
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === tabName));
  panels.forEach((panel) => panel.classList.toggle("active", panel.id === tabName));
}

function renderVocabulary(items) {
  vocabList.innerHTML = items.map((item) => `
    <article class="vocab-card">
      <h3>${item.spanish}</h3>
      <p class="vocab-meta">${item.english} • ${item.day}</p>
      <p>${item.example}</p>
    </article>
  `).join("");
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

function checkQuiz() {
  let score = 0;
  quizQuestions.forEach((question, index) => {
    const selected = document.querySelector(`input[name="quiz-${index}"]:checked`);
    if (selected && selected.value === question.answer) {
      score += 1;
    }
  });
  quizResult.textContent = `You scored ${score} out of ${quizQuestions.length}. Repeat the incorrect ones aloud once more.`;
  quizResult.classList.remove("muted");
}

function loadFeedback() {
  const saved = window.localStorage.getItem("spanish-learning-feedback");
  if (saved) {
    feedbackText.value = saved;
    feedbackStatus.textContent = "Saved feedback loaded from this browser.";
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateTab(tab.dataset.tab));
});

vocabSearch.addEventListener("input", (event) => {
  const term = event.target.value.trim().toLowerCase();
  const filtered = vocabulary.filter((item) =>
    [item.spanish, item.english, item.day, item.example].some((value) => value.toLowerCase().includes(term))
  );
  renderVocabulary(filtered);
});

showAnswerButton.addEventListener("click", () => {
  flashcardBack.classList.remove("hidden");
});

nextCardButton.addEventListener("click", () => {
  currentFlashcard = (currentFlashcard + 1) % flashcards.length;
  showFlashcard(currentFlashcard);
});

checkQuizButton.addEventListener("click", checkQuiz);

feedbackForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = feedbackText.value.trim();
  if (!value) {
    feedbackStatus.textContent = "Please write a comment before saving.";
    return;
  }
  window.localStorage.setItem("spanish-learning-feedback", value);
  feedbackStatus.textContent = "Feedback saved locally in this browser.";
});

clearFeedbackButton.addEventListener("click", () => {
  window.localStorage.removeItem("spanish-learning-feedback");
  feedbackText.value = "";
  feedbackStatus.textContent = "Saved feedback cleared.";
});

renderVocabulary(vocabulary);
renderNotes();
renderQuiz();
showFlashcard(currentFlashcard);
loadFeedback();
