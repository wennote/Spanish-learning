const randomBanner = document.getElementById("random-banner");
const vocabList = document.getElementById("vocab-list");
const vocabSearch = document.getElementById("vocab-search");
const topicFilters = document.getElementById("topic-filters");
const grammarList = document.getElementById("grammar-list");
const verbTables = document.getElementById("verb-tables");
const pronunciationList = document.getElementById("pronunciation-list");
const flashcardList = document.getElementById("flashcard-list");
const reviewContent = document.getElementById("review-content");
const notesList = document.getElementById("notes-list");
const storyList = document.getElementById("story-list");
const storyGallery = document.getElementById("story-gallery");
const nextStoryButton = document.getElementById("next-story");
const exerciseList = document.getElementById("exercise-list");
const quizList = document.getElementById("quiz-list");
const checkQuizButton = document.getElementById("check-quiz");
const quizResult = document.getElementById("quiz-result");
const summaryOverview = document.getElementById("summary-overview");
const summarySuggestions = document.getElementById("summary-suggestions");
const summaryHistory = document.getElementById("summary-history");
const essayPrompt = document.getElementById("essay-prompt");
const essayHints = document.getElementById("essay-hints");
const essayResponse = document.getElementById("essay-response");
const nextEssayButton = document.getElementById("next-essay");
const showEssayAnswerButton = document.getElementById("show-essay-answer");
const checkWritingButton = document.getElementById("check-writing");
const essayAnswer = document.getElementById("essay-answer");
const writingFeedback = document.getElementById("writing-feedback");
const playRecordingTargetButton = document.getElementById("play-recording-target");
const startRecordingButton = document.getElementById("start-recording");
const stopRecordingButton = document.getElementById("stop-recording");
const recordingTarget = document.getElementById("recording-target");
const recordingStatus = document.getElementById("recording-status");
const recordingPlayback = document.getElementById("recording-playback");

const STORAGE_KEYS = {
  studySelections: "spanish-learning-selections",
  quizHistory: "spanish-learning-quiz-history",
  language: "spanish-learning-language",
  reviewMeaningMode: "spanish-learning-review-meaning-mode"
};

const NAV_LABELS = {
  "index.html": { en: "Read Me", zh: "说明" },
  "vocabulary.html": { en: "Vocabulary", zh: "词汇" },
  "grammar.html": { en: "Grammar", zh: "语法" },
  "verbs.html": { en: "Verb Tables", zh: "动词变位表" },
  "pronunciation.html": { en: "Pronunciation", zh: "发音" },
  "review.html": { en: "Review", zh: "复习" },
  "flashcards.html": { en: "Flashcards", zh: "抽认卡" },
  "stories.html": { en: "Stories", zh: "故事" },
  "practice.html": { en: "Practice", zh: "练习" },
  "writing.html": { en: "Writing", zh: "写作" },
  "summary.html": { en: "Summary", zh: "总结" },
  "notes.html": { en: "Daily Notes", zh: "每日笔记" }
};

const selectionPageHrefs = new Set([
  "review.html",
  "flashcards.html",
  "stories.html",
  "practice.html",
  "summary.html"
]);

const pronunciationSections = [
  {
    title: "Key Words",
    items: [
      "hablar",
      "estar",
      "tener",
      "hacer",
      "querer",
      "mi familia",
      "ayer",
      "después",
      "jugar",
      "viajar",
      "jugué",
      "viajé",
      "voy a jugar",
      "voy a viajar",
      "jugaré",
      "viajaré",
      "iré",
      "tendré",
      "haré",
      "sabré"
    ]
  },
  {
    title: "Model Sentences",
    items: [
      "Me llamo Wen y vivo en Florida.",
      "Hoy estoy contento porque estudio español en casa.",
      "Mi familia vive en China.",
      "Ayer fui a la escuela y después cociné arroz.",
      "Quiero hablar más español cada día.",
      "Por la mañana estudio, trabajo y hago la comida.",
      "Ayer jugué con mi familia.",
      "El fin de semana pasado viajé a Japón con mis amigos por trabajo.",
      "Mañana voy a jugar con mis amigos.",
      "En el futuro viajaré a muchos países.",
      "Algún día sabré hablar español muy bien."
    ]
  }
];

const grammarPoints = [
  {
    title: "Regular Present Tense",
    rule: "Spanish infinitives end in -ar, -er, or -ir. Remove the ending and add the correct present tense ending for the subject.",
    details: [
      "Use these endings for regular verbs: -ar -> o, as, a, amos, an; -er -> o, es, e, emos, en; -ir -> o, es, e, imos, en.",
      "The subject pronoun is often optional because the verb ending already shows who is doing the action.",
      "This pattern is used for habits, daily routines, and actions happening now."
    ],
    examples: [
      { spanish: "hablar -> hablo", english: "hablar -> I speak" },
      { spanish: "comer -> comemos", english: "comer -> we eat" },
      { spanish: "vivir -> viven", english: "vivir -> they live" }
    ],
    table: {
      headers: ["Subject", "-ar", "-er", "-ir"],
      rows: [
        ["yo", "-o", "-o", "-o"],
        ["tú", "-as", "-es", "-es"],
        ["él / ella / usted", "-a", "-e", "-e"],
        ["nosotros", "-amos", "-emos", "-imos"],
        ["ellos / ustedes", "-an", "-en", "-en"]
      ]
    }
  },
  {
    title: "Ser vs Estar",
    rule: "Use ser for identity, origin, and general description. Use estar for location and temporary condition.",
    details: [
      "Ser answers questions like who someone is, where they are from, or what something is generally like.",
      "Estar is used for where someone or something is and how a person feels right now.",
      "A common beginner mistake is using ser for location. Say `estoy en casa`, not `soy en casa`."
    ],
    examples: [
      { spanish: "Soy de Florida.", english: "I am from Florida." },
      { spanish: "Estoy en casa.", english: "I am at home." },
      { spanish: "Hoy estoy contento.", english: "Today I am happy." }
    ],
    table: {
      headers: ["Subject", "ser", "estar"],
      rows: [
        ["yo", "soy", "estoy"],
        ["tú", "eres", "estás"],
        ["él / ella / usted", "es", "está"],
        ["nosotros", "somos", "estamos"],
        ["ellos / ustedes", "son", "están"]
      ]
    }
  },
  {
    title: "Question Words",
    rule: "Question words ask for specific information and usually start the question.",
    details: [
      "Use `qué` for what, `dónde` for where, `cuándo` for when, `cómo` for how, and `quién` for who.",
      "Spanish uses opening and closing question marks: `¿ ... ?`.",
      "These words help build speaking practice because you can answer them with short, useful sentences."
    ],
    examples: [
      { spanish: "¿Qué haces?", english: "What are you doing?" },
      { spanish: "¿Dónde vas?", english: "Where are you going?" },
      { spanish: "¿Cómo estás?", english: "How are you?" }
    ],
    table: {
      headers: ["Spanish", "English", "Use"],
      rows: [
        ["¿Qué?", "What?", "thing or action"],
        ["¿Dónde?", "Where?", "place"],
        ["¿Cuándo?", "When?", "time"],
        ["¿Cómo?", "How?", "condition or manner"],
        ["¿Quién?", "Who?", "person"]
      ]
    }
  },
  {
    title: "Simple Past",
    rule: "Use the preterite for completed actions in the past, especially with time words like ayer.",
    details: [
      "Regular -ar verbs in the yo form often end in -é, such as `trabajé`, `estudié`, and `cociné`.",
      "Some important verbs are irregular and must be memorized: `ir -> fui`, `tener -> tuve`, `hacer -> hice`, `querer -> quise`.",
      "This tense is useful for short finished actions: where you went, what you did, and what happened yesterday."
    ],
    examples: [
      { spanish: "Ayer fui a la escuela.", english: "Yesterday I went to school." },
      { spanish: "Ayer trabajé.", english: "Yesterday I worked." },
      { spanish: "Ayer hice arroz.", english: "Yesterday I made rice." }
    ],
    table: {
      headers: ["Infinitive", "Yo Preterite", "Type"],
      rows: [
        ["trabajar", "trabajé", "regular -ar"],
        ["estudiar", "estudié", "regular -ar"],
        ["cocinar", "cociné", "regular -ar"],
        ["ir", "fui", "irregular"],
        ["tener", "tuve", "irregular"],
        ["hacer", "hice", "irregular"],
        ["querer", "quise", "irregular"]
      ]
    }
  },
  {
    title: "Connectors",
    rule: "Small linking words help combine ideas into longer sentences.",
    details: [
      "Use `porque` to give a reason, `pero` to show contrast, and `después` to show sequence.",
      "These words make your writing sound more natural because they connect short statements.",
      "A good beginner goal is to link two simple ideas instead of writing only isolated sentences."
    ],
    examples: [
      { spanish: "porque = porque estudio español", english: "because = because I study Spanish" },
      { spanish: "pero = quiero pizza, pero hago arroz", english: "but = I want pizza, but I make rice" },
      { spanish: "después = después estudio un poco más", english: "afterward = afterward I study a little more" }
    ],
    table: {
      headers: ["Connector", "Meaning", "Example"],
      rows: [
        ["porque", "because", "Estoy contento porque estudio."],
        ["pero", "but", "Quiero pizza, pero hago arroz."],
        ["después", "afterward", "Después estudio un poco más."]
      ]
    }
  },
  {
    title: "Voy a + Infinitive",
    rule: "Use `voy a + infinitive` to talk about the near future or a planned next action.",
    details: [
      "This pattern is very common in conversation and is easier for beginners than using the simple future every time.",
      "Use the present form of ir plus `a` plus an infinitive: `voy a jugar`, `voy a viajar`, `voy a estudiar`.",
      "It works well with time words such as `mañana`, `este fin de semana`, or `hoy`."
    ],
    examples: [
      { spanish: "Mañana voy a jugar con mi familia.", english: "Tomorrow I am going to play with my family." },
      { spanish: "Mañana voy a viajar a México.", english: "Tomorrow I am going to travel to Mexico." },
      { spanish: "Este fin de semana voy a estudiar español en casa.", english: "This weekend I am going to study Spanish at home." }
    ],
    table: {
      headers: ["Pattern", "Meaning", "Example"],
      rows: [
        ["voy a + infinitive", "I am going to ...", "voy a jugar"],
        ["vas a + infinitive", "you are going to ...", "vas a viajar"],
        ["vamos a + infinitive", "we are going to ...", "vamos a estudiar"]
      ]
    }
  },
  {
    title: "Simple Future",
    rule: "The simple future talks about what will happen later. For regular verbs, keep the whole infinitive and add the future ending.",
    details: [
      "For regular verbs such as `jugar` and `viajar`, do not remove `-ar`; add the future ending to the full infinitive.",
      "The yo ending is `-é`: `jugaré`, `viajaré`.",
      "This tense is useful for predictions, long-term plans, and statements with phrases like `en el futuro`."
    ],
    examples: [
      { spanish: "En el futuro jugaré más con mi familia.", english: "In the future I will play more with my family." },
      { spanish: "En el futuro viajaré a muchos países.", english: "In the future I will travel to many countries." },
      { spanish: "Mañana estudiaré más español.", english: "Tomorrow I will study more Spanish." }
    ],
    table: {
      headers: ["Infinitive", "Yo Future", "Meaning"],
      rows: [
        ["jugar", "jugaré", "I will play"],
        ["viajar", "viajaré", "I will travel"],
        ["estudiar", "estudiaré", "I will study"]
      ]
    }
  },
  {
    title: "Irregular Future Stems",
    rule: "Some common verbs change their stem in the simple future and must be memorized.",
    details: [
      "These verbs still use the normal future endings, but the stem changes first: `tener -> tendr-`, `hacer -> har-`, `decir -> dir-`.",
      "They are high-frequency verbs, so learning them early makes future plans much easier to say.",
      "A good beginner strategy is to memorize them in short model sentences."
    ],
    examples: [
      { spanish: "Mañana iré al trabajo en tren.", english: "Tomorrow I will go to work by train." },
      { spanish: "En el futuro tendré más tiempo para viajar.", english: "In the future I will have more time to travel." },
      { spanish: "Algún día sabré hablar español muy bien.", english: "Someday I will know how to speak Spanish very well." }
    ],
    table: {
      headers: ["Infinitive", "Yo Future", "Stem Change"],
      rows: [
        ["ir", "iré", "ir-"],
        ["tener", "tendré", "tendr-"],
        ["salir", "saldré", "saldr-"],
        ["venir", "vendré", "vendr-"],
        ["hacer", "haré", "har-"],
        ["decir", "diré", "dir-"],
        ["poder", "podré", "podr-"],
        ["poner", "pondré", "pondr-"],
        ["querer", "querré", "querr-"],
        ["saber", "sabré", "sabr-"]
      ]
    }
  },
  {
    title: "Useful Sentence Order",
    rule: "A simple beginner pattern is time + subject + verb + extra information.",
    details: [
      "You can start with words like `hoy`, `ayer`, `después`, or `por la mañana` to make the time clear.",
      "Then add the action and one more detail such as place, object, or feeling.",
      "This pattern helps build easy paragraphs: `Hoy estudio español en casa.`"
    ],
    examples: [
      { spanish: "Hoy estudio español en casa.", english: "Today I study Spanish at home." },
      { spanish: "Ayer cociné arroz después del trabajo.", english: "Yesterday I cooked rice after work." },
      { spanish: "Por la noche estoy cansado pero contento.", english: "At night I am tired but happy." }
    ],
    table: {
      headers: ["Part", "Purpose", "Example"],
      rows: [
        ["Time", "sets when", "Hoy / Ayer / Después"],
        ["Verb", "main action", "estudio / cociné / estoy"],
        ["Extra detail", "place, object, feeling", "en casa / arroz / contento"]
      ]
    }
  }
].map((point) => ({ ...point, id: `grammar-${slugify(point.title)}` }));

const verbTableSections = [
  {
    title: "Regular Verbs",
    description: "These model tables show the full patterns for one regular -ar, -er, and -ir verb across present, simple past, present perfect, and future.",
    tables: [
      {
        verb: "hablar",
        english: "to speak",
        note: "Regular -ar model",
        rows: [
          ["yo", "hablo", "hablé", "he hablado", "hablaré"],
          ["tú", "hablas", "hablaste", "has hablado", "hablarás"],
          ["él / ella / usted", "habla", "habló", "ha hablado", "hablará"],
          ["nosotros", "hablamos", "hablamos", "hemos hablado", "hablaremos"],
          ["ellos / ellas / ustedes", "hablan", "hablaron", "han hablado", "hablarán"]
        ]
      },
      {
        verb: "comer",
        english: "to eat",
        note: "Regular -er model",
        rows: [
          ["yo", "como", "comí", "he comido", "comeré"],
          ["tú", "comes", "comiste", "has comido", "comerás"],
          ["él / ella / usted", "come", "comió", "ha comido", "comerá"],
          ["nosotros", "comemos", "comimos", "hemos comido", "comeremos"],
          ["ellos / ellas / ustedes", "comen", "comieron", "han comido", "comerán"]
        ]
      },
      {
        verb: "vivir",
        english: "to live",
        note: "Regular -ir model",
        rows: [
          ["yo", "vivo", "viví", "he vivido", "viviré"],
          ["tú", "vives", "viviste", "has vivido", "vivirás"],
          ["él / ella / usted", "vive", "vivió", "ha vivido", "vivirá"],
          ["nosotros", "vivimos", "vivimos", "hemos vivido", "viviremos"],
          ["ellos / ellas / ustedes", "viven", "vivieron", "han vivido", "vivirán"]
        ]
      }
    ]
  },
  {
    title: "Common Irregular Verbs",
    description: "Each table below shows one high-frequency irregular verb with the same four tenses for quick comparison.",
    tables: [
      {
        verb: "ser",
        english: "to be",
        note: "Highly irregular",
        rows: [
          ["yo", "soy", "fui", "he sido", "seré"],
          ["tú", "eres", "fuiste", "has sido", "serás"],
          ["él / ella / usted", "es", "fue", "ha sido", "será"],
          ["nosotros", "somos", "fuimos", "hemos sido", "seremos"],
          ["ellos / ellas / ustedes", "son", "fueron", "han sido", "serán"]
        ]
      },
      {
        verb: "estar",
        english: "to be",
        note: "Irregular present, regular participle",
        rows: [
          ["yo", "estoy", "estuve", "he estado", "estaré"],
          ["tú", "estás", "estuviste", "has estado", "estarás"],
          ["él / ella / usted", "está", "estuvo", "ha estado", "estará"],
          ["nosotros", "estamos", "estuvimos", "hemos estado", "estaremos"],
          ["ellos / ellas / ustedes", "están", "estuvieron", "han estado", "estarán"]
        ]
      },
      {
        verb: "ir",
        english: "to go",
        note: "Irregular across several tenses",
        rows: [
          ["yo", "voy", "fui", "he ido", "iré"],
          ["tú", "vas", "fuiste", "has ido", "irás"],
          ["él / ella / usted", "va", "fue", "ha ido", "irá"],
          ["nosotros", "vamos", "fuimos", "hemos ido", "iremos"],
          ["ellos / ellas / ustedes", "van", "fueron", "han ido", "irán"]
        ]
      },
      {
        verb: "tener",
        english: "to have",
        note: "Irregular present, preterite, and future stem",
        rows: [
          ["yo", "tengo", "tuve", "he tenido", "tendré"],
          ["tú", "tienes", "tuviste", "has tenido", "tendrás"],
          ["él / ella / usted", "tiene", "tuvo", "ha tenido", "tendrá"],
          ["nosotros", "tenemos", "tuvimos", "hemos tenido", "tendremos"],
          ["ellos / ellas / ustedes", "tienen", "tuvieron", "han tenido", "tendrán"]
        ]
      },
      {
        verb: "hacer",
        english: "to do / make",
        note: "Irregular preterite and participle",
        rows: [
          ["yo", "hago", "hice", "he hecho", "haré"],
          ["tú", "haces", "hiciste", "has hecho", "harás"],
          ["él / ella / usted", "hace", "hizo", "ha hecho", "hará"],
          ["nosotros", "hacemos", "hicimos", "hemos hecho", "haremos"],
          ["ellos / ellas / ustedes", "hacen", "hicieron", "han hecho", "harán"]
        ]
      },
      {
        verb: "querer",
        english: "to want / to love",
        note: "Irregular present, preterite, and future stem",
        rows: [
          ["yo", "quiero", "quise", "he querido", "querré"],
          ["tú", "quieres", "quisiste", "has querido", "querrás"],
          ["él / ella / usted", "quiere", "quiso", "ha querido", "querrá"],
          ["nosotros", "queremos", "quisimos", "hemos querido", "querremos"],
          ["ellos / ellas / ustedes", "quieren", "quisieron", "han querido", "querrán"]
        ]
      },
      {
        verb: "poder",
        english: "to be able to / can",
        note: "Stem-changing present and irregular future stem",
        rows: [
          ["yo", "puedo", "pude", "he podido", "podré"],
          ["tú", "puedes", "pudiste", "has podido", "podrás"],
          ["él / ella / usted", "puede", "pudo", "ha podido", "podrá"],
          ["nosotros", "podemos", "pudimos", "hemos podido", "podremos"],
          ["ellos / ellas / ustedes", "pueden", "pudieron", "han podido", "podrán"]
        ]
      },
      {
        verb: "decir",
        english: "to say / to tell",
        note: "Irregular across all four tenses here",
        rows: [
          ["yo", "digo", "dije", "he dicho", "diré"],
          ["tú", "dices", "dijiste", "has dicho", "dirás"],
          ["él / ella / usted", "dice", "dijo", "ha dicho", "dirá"],
          ["nosotros", "decimos", "dijimos", "hemos dicho", "diremos"],
          ["ellos / ellas / ustedes", "dicen", "dijeron", "han dicho", "dirán"]
        ]
      }
    ]
  }
];

const filterOptions = ["All", "Verbs", "Feelings", "Places", "Questions"];

const vocabulary = [
  { spanish: "aprender", english: "to learn", chinese: "学习; 学会", pos: "Verb", day: "Day 1", examples: ["Quiero aprender español.", "Nosotros aprendemos cada día."] },
  { spanish: "hablar", english: "to speak", chinese: "说", pos: "Verb", day: "Day 1", examples: ["Yo hablo español.", "Nosotros hablamos en clase."] },
  { spanish: "comer", english: "to eat", chinese: "吃", pos: "Verb", day: "Day 1", examples: ["Ellos comen pizza.", "Yo como arroz en casa."] },
  { spanish: "vivir", english: "to live", chinese: "住; 生活", pos: "Verb", day: "Day 1", examples: ["Yo vivo en Florida.", "Mi familia vive en China."] },
  { spanish: "estudiar", english: "to study", chinese: "学习", pos: "Verb", day: "Day 1", examples: ["Nosotros estudiamos español.", "Yo estudio en casa hoy."] },
  { spanish: "trabajar", english: "to work", chinese: "工作", pos: "Verb", day: "Day 1", examples: ["Yo trabajo en casa.", "Ellos trabajan mucho."] },
  { spanish: "cocinar", english: "to cook", chinese: "做饭", pos: "Verb", day: "Day 1", examples: ["Yo cocino en casa.", "Mi madre cocina arroz."] },
  { spanish: "limpiar", english: "to clean", chinese: "打扫", pos: "Verb", day: "Day 1", examples: ["Ella limpia.", "Nosotros limpiamos la casa."] },
  { spanish: "la casa", english: "the house", chinese: "房子; 家", pos: "Noun", day: "Day 1", examples: ["Yo vivo en casa.", "La casa es tranquila."] },
  { spanish: "la escuela", english: "the school", chinese: "学校", pos: "Noun", day: "Day 1", examples: ["Nosotros estudiamos en la escuela.", "La escuela está en la ciudad."] },
  { spanish: "la comida", english: "food / meal", chinese: "食物; 饭", pos: "Noun", day: "Day 1", examples: ["Ellos comen la comida.", "La comida está lista."] },
  { spanish: "ser", english: "to be", chinese: "是", pos: "Verb", day: "Day 2", examples: ["Yo soy de Florida.", "Nosotros somos estudiantes."] },
  { spanish: "estar", english: "to be", chinese: "在; 处于", pos: "Verb", day: "Day 2", examples: ["Yo estoy en casa.", "Hoy estoy cansado."] },
  { spanish: "estudiante", english: "student", chinese: "学生", pos: "Noun", day: "Day 2", examples: ["Yo soy un estudiante de español.", "Ella es estudiante también."] },
  { spanish: "hoy", english: "today", chinese: "今天", pos: "Adverb", day: "Day 2", examples: ["Hoy estoy cansado.", "Hoy estudio español."] },
  { spanish: "cansado", english: "tired", chinese: "累的", pos: "Adjective", day: "Day 2", examples: ["Hoy estoy cansado.", "Después del trabajo estoy cansado."] },
  { spanish: "ocupado", english: "busy", chinese: "忙的", pos: "Adjective", day: "Day 2", examples: ["Hoy estoy ocupado.", "Mi padre está ocupado hoy."] },
  { spanish: "contento", english: "happy", chinese: "开心的", pos: "Adjective", day: "Day 2", examples: ["Hoy estoy contento.", "Mi hermana está contenta."] },
  { spanish: "ir", english: "to go", chinese: "去", pos: "Verb", day: "Day 3", examples: ["Yo voy a casa.", "Nosotros vamos a la escuela."] },
  { spanish: "tener", english: "to have", chinese: "有", pos: "Verb", day: "Day 3", examples: ["Yo tengo trabajo.", "Nosotros tenemos clase hoy."] },
  { spanish: "hacer", english: "to do / to make", chinese: "做; 制作", pos: "Verb", day: "Day 3", examples: ["Yo hago la comida en casa.", "Nosotros hacemos la tarea."] },
  { spanish: "querer", english: "to want", chinese: "想要", pos: "Verb", day: "Day 3", examples: ["Yo quiero pizza.", "Quiero estudiar más."] },
  { spanish: "tranquilo", english: "calm", chinese: "平静的", pos: "Adjective", day: "Day 3", examples: ["Hoy estoy tranquilo.", "Mi hermano está tranquilo."] },
  { spanish: "nervioso", english: "nervous", chinese: "紧张的", pos: "Adjective", day: "Day 3", examples: ["Hoy estoy nervioso.", "Estoy nervioso antes de hablar."] },
  { spanish: "orgulloso", english: "proud", chinese: "自豪的", pos: "Adjective", day: "Day 3", examples: ["Hoy estoy orgulloso.", "Mi familia está orgullosa."] },
  { spanish: "¿Qué?", english: "What?", chinese: "什么?", pos: "Question", day: "Day 4", examples: ["¿Qué quieres comer hoy?", "¿Qué haces en casa?"] },
  { spanish: "¿Dónde?", english: "Where?", chinese: "哪里?", pos: "Question", day: "Day 4", examples: ["¿Dónde vas hoy?", "¿Dónde está la escuela?"] },
  { spanish: "¿Cuándo?", english: "When?", chinese: "什么时候?", pos: "Question", day: "Day 4", examples: ["¿Cuándo vas a la escuela?", "¿Cuándo estudias español?"] },
  { spanish: "¿Cómo?", english: "How?", chinese: "怎么样?; 如何?", pos: "Question", day: "Day 4", examples: ["¿Cómo estás hoy?", "¿Cómo se llama tu madre?"] },
  { spanish: "¿Quién?", english: "Who?", chinese: "谁?", pos: "Question", day: "Day 4", examples: ["¿Quién es tu profesor?", "¿Quién cocina hoy?"] },
  { spanish: "me llamo", english: "my name is", chinese: "我叫", pos: "Phrase", day: "Day 5", examples: ["Me llamo Wen.", "Hola, me llamo Ana."] },
  { spanish: "mi madre", english: "my mother", chinese: "我的妈妈", pos: "Noun", day: "Day 5", examples: ["Mi madre se llama Laura.", "Mi madre vive en China."] },
  { spanish: "mi padre", english: "my father", chinese: "我的爸爸", pos: "Noun", day: "Day 5", examples: ["Mi padre se llama Paul.", "Mi padre trabaja mucho."] },
  { spanish: "mi hermano", english: "my brother", chinese: "我的兄弟", pos: "Noun", day: "Day 5", examples: ["Mi hermano se llama Wen.", "Mi hermano está tranquilo."] },
  { spanish: "mi hermana", english: "my sister", chinese: "我的姐妹", pos: "Noun", day: "Day 5", examples: ["Mi hermana se llama Jade.", "Mi hermana está contenta."] },
  { spanish: "tengo", english: "I have", chinese: "我有", pos: "Verb", day: "Day 5", examples: ["Tengo dos hermanos.", "Tengo clase hoy."] },
  { spanish: "mi familia", english: "my family", chinese: "我的家人", pos: "Noun", day: "Day 5", examples: ["Mi familia vive en China.", "Mi familia es importante para mí."] },
  { spanish: "ayer", english: "yesterday", chinese: "昨天", pos: "Adverb", day: "Day 5", examples: ["Ayer fui a la escuela.", "Ayer trabajé en casa."] },
  { spanish: "fui", english: "I went (ir past)", chinese: "我去了", pos: "Verb", day: "Day 5", examples: ["Ayer fui a la escuela.", "Ayer fui a casa temprano."] },
  { spanish: "tuve", english: "I had (tener past)", chinese: "我有过; 我曾有", pos: "Verb", day: "Day 5", examples: ["Ayer tuve trabajo.", "Ayer tuve una clase corta."] },
  { spanish: "hice", english: "I did/made (hacer past)", chinese: "我做了", pos: "Verb", day: "Day 5", examples: ["Ayer hice la comida en casa.", "Ayer hice la tarea."] },
  { spanish: "quise", english: "I wanted (querer past)", chinese: "我想要过", pos: "Verb", day: "Day 5", examples: ["Ayer quise pizza.", "Ayer quise estudiar más."] },
  { spanish: "estudié", english: "I studied (estudiar past)", chinese: "我学习了", pos: "Verb", day: "Day 5", examples: ["Ayer estudié español en casa.", "Ayer estudié un poco más."] },
  { spanish: "trabajé", english: "I worked (trabajar past)", chinese: "我工作了", pos: "Verb", day: "Day 5", examples: ["Ayer trabajé.", "Ayer trabajé en casa."] },
  { spanish: "cociné", english: "I cooked (cocinar past)", chinese: "我做饭了", pos: "Verb", day: "Day 5", examples: ["Ayer cociné la comida.", "Ayer cociné arroz."] },
  { spanish: "hablé", english: "I spoke (hablar past)", chinese: "我说了", pos: "Verb", day: "Day 5", examples: ["Ayer hablé español.", "Ayer hablé con mi familia."] },
  { spanish: "porque", english: "because", chinese: "因为", pos: "Conjunction", day: "Day 5", examples: ["Estoy contento porque estudio español.", "Voy a casa porque estoy cansado."] },
  { spanish: "pero", english: "but", chinese: "但是", pos: "Conjunction", day: "Day 5", examples: ["Quise pizza, pero hice arroz.", "Estoy cansado, pero contento."] },
  { spanish: "después", english: "after; afterward", chinese: "之后", pos: "Adverb", day: "Day 5", examples: ["Después estudié un poco más.", "Después fui a casa."] },
  { spanish: "un poco más", english: "a little more", chinese: "再多一点", pos: "Phrase", day: "Day 5", examples: ["Después estudié un poco más.", "Quiero practicar un poco más."] },
  { spanish: "también", english: "also", chinese: "也", pos: "Adverb", day: "Day 5", examples: ["También hablé con mi familia.", "También quiero estudiar hoy."] },
  { spanish: "arroz", english: "rice", chinese: "米饭", pos: "Noun", day: "Day 5", examples: ["Hice arroz en casa.", "Hoy como arroz también."] },
  { spanish: "más", english: "more", chinese: "更; 更多", pos: "Adverb", day: "Day 5", examples: ["Quiero estudiar más.", "Hoy practico más español."] },
  { spanish: "corta", english: "short", chinese: "短的", pos: "Adjective", day: "Day 5", examples: ["Es una historia corta.", "La clase fue corta."] },
  { spanish: "sobre", english: "about", chinese: "关于", pos: "Preposition", day: "Day 5", examples: ["Escribo una historia sobre mi familia.", "Hablo sobre mi trabajo."] },
  { spanish: "jugar", english: "to play", chinese: "玩; 进行(游戏/运动)", pos: "Verb", day: "Day 6", examples: ["Mañana voy a jugar con mis amigos.", "Me gusta jugar con mi familia."] },
  { spanish: "juego", english: "I play", chinese: "我玩; 我进行", pos: "Verb", day: "Day 6", examples: ["Hoy juego en casa.", "A veces juego con mis amigos."] },
  { spanish: "jugué", english: "I played", chinese: "我玩了", pos: "Verb", day: "Day 6", examples: ["Ayer jugué con mi familia.", "Cuando era niño, jugué mucho con mis amigos."] },
  { spanish: "jugaré", english: "I will play", chinese: "我将会玩", pos: "Verb", day: "Day 6", examples: ["En el futuro jugaré más con mi familia.", "Mañana jugaré con mis amigos."] },
  { spanish: "viajar", english: "to travel", chinese: "旅行", pos: "Verb", day: "Day 6", examples: ["Voy a viajar a México.", "Me gusta viajar por trabajo y por placer."] },
  { spanish: "viajo", english: "I travel", chinese: "我旅行", pos: "Verb", day: "Day 6", examples: ["Hoy viajo a China.", "A veces viajo por trabajo."] },
  { spanish: "viajé", english: "I traveled", chinese: "我旅行了", pos: "Verb", day: "Day 6", examples: ["El fin de semana pasado viajé a Japón con mis amigos por trabajo.", "El año pasado viajé mucho."] },
  { spanish: "viajaré", english: "I will travel", chinese: "我将会旅行", pos: "Verb", day: "Day 6", examples: ["En el futuro viajaré a muchos países.", "Algún día viajaré más con mi familia."] },
  { spanish: "voy a jugar", english: "I am going to play", chinese: "我打算去玩", pos: "Phrase", day: "Day 6", examples: ["Mañana voy a jugar con mis amigos.", "Hoy voy a jugar un poco en casa."] },
  { spanish: "voy a viajar", english: "I am going to travel", chinese: "我打算去旅行", pos: "Phrase", day: "Day 6", examples: ["Mañana voy a viajar a México.", "Este verano voy a viajar mucho."] },
  { spanish: "mañana", english: "tomorrow", chinese: "明天", pos: "Adverb", day: "Day 6", examples: ["Mañana voy a jugar con mis amigos.", "Mañana viajaré temprano."] },
  { spanish: "anoche", english: "last night", chinese: "昨晚", pos: "Adverb", day: "Day 6", examples: ["Anoche estudié español en casa.", "Anoche hablé con mi familia."] },
  { spanish: "otra vez", english: "again", chinese: "再一次", pos: "Phrase", day: "Day 6", examples: ["Voy a practicar otra vez.", "Dilo otra vez, por favor."] },
  { spanish: "el fin de semana pasado", english: "last weekend", chinese: "上个周末", pos: "Phrase", day: "Day 6", examples: ["El fin de semana pasado viajé a Japón.", "El fin de semana pasado descansé en casa."] },
  { spanish: "el próximo año", english: "next year", chinese: "明年", pos: "Phrase", day: "Day 6", examples: ["El próximo año voy a viajar más.", "El próximo año estudiaré más español."] },
  { spanish: "el parque", english: "the park", chinese: "公园", pos: "Noun", day: "Day 6", examples: ["Voy al parque con mi familia.", "El parque está cerca de mi casa."] },
  { spanish: "fútbol", english: "soccer / football", chinese: "足球", pos: "Noun", day: "Day 6", examples: ["Me gusta jugar fútbol.", "Ayer jugué fútbol con mis amigos."] },
  { spanish: "por trabajo", english: "for work", chinese: "因为工作", pos: "Phrase", day: "Day 6", examples: ["Viajé a Japón por trabajo.", "A veces viajo por trabajo."] },
  { spanish: "en el futuro", english: "in the future", chinese: "在未来", pos: "Phrase", day: "Day 6", examples: ["En el futuro jugaré más con mi familia.", "En el futuro viajaré a muchos países."] },
  { spanish: "muchos países", english: "many countries", chinese: "许多国家", pos: "Phrase", day: "Day 6", examples: ["Viajaré a muchos países.", "Quiero conocer muchos países."] },
  { spanish: "algún día", english: "someday", chinese: "有一天", pos: "Phrase", day: "Day 6", examples: ["Algún día sabré hablar español muy bien.", "Algún día viajaré a España."] },
  { spanish: "iré", english: "I will go", chinese: "我将会去", pos: "Verb", day: "Day 6", examples: ["Mañana iré al trabajo en tren.", "Algún día iré a España."] },
  { spanish: "tendré", english: "I will have", chinese: "我将会有", pos: "Verb", day: "Day 6", examples: ["En el futuro tendré más tiempo para viajar.", "Mañana tendré una clase."] },
  { spanish: "saldré", english: "I will go out / leave", chinese: "我将会出去; 离开", pos: "Verb", day: "Day 6", examples: ["Mañana saldré temprano.", "Después del trabajo saldré con amigos."] },
  { spanish: "vendré", english: "I will come", chinese: "我将会来", pos: "Verb", day: "Day 6", examples: ["Mañana vendré a casa temprano.", "Vendré después de la clase."] },
  { spanish: "haré", english: "I will do / make", chinese: "我将会做", pos: "Verb", day: "Day 6", examples: ["Mañana haré la comida.", "En el futuro haré más práctica."] },
  { spanish: "diré", english: "I will say / tell", chinese: "我将会说; 告诉", pos: "Verb", day: "Day 6", examples: ["Mañana diré la respuesta en español.", "Después diré más sobre mi viaje."] },
  { spanish: "podré", english: "I will be able to", chinese: "我将能够", pos: "Verb", day: "Day 6", examples: ["Mañana podré estudiar más.", "Con práctica podré hablar mejor."] },
  { spanish: "pondré", english: "I will put", chinese: "我将放", pos: "Verb", day: "Day 6", examples: ["Pondré el libro en la mesa.", "Después pondré la comida aquí."] },
  { spanish: "querré", english: "I will want", chinese: "我将会想要", pos: "Verb", day: "Day 6", examples: ["En el futuro querré viajar más.", "Mañana querré descansar un poco."] },
  { spanish: "sabré", english: "I will know", chinese: "我将会知道; 我将会懂", pos: "Verb", day: "Day 6", examples: ["Algún día sabré hablar español muy bien.", "Con más práctica sabré más palabras."] }
].map((item) => ({ ...item, id: `vocab-${slugify(item.spanish)}`, topic: inferTopic(item) }));

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
  },
  {
    title: "Day 5",
    focus: "Family, names, and simple past tense",
    points: [
      "Introduced family vocabulary: madre, padre, hermano, hermana, familia.",
      "Practiced name expressions with me llamo and se llama.",
      "Learned irregular past tense (pretérito) forms: ir → fui, tener → tuve, hacer → hice, querer → quise.",
      "Learned regular -ar past pattern with -é ending: estudiar → estudié, trabajar → trabajé, cocinar → cociné, hablar → hablé.",
      "Practiced switching between hoy (today) and ayer (yesterday) with present and past verb forms."
    ],
    examples: [
      "Me llamo Wen.",
      "Mi familia vive en China.",
      "Ayer fui a la escuela.",
      "Ayer tuve trabajo.",
      "Ayer cociné la comida."
    ]
  },
  {
    title: "Day 6 Notes",
    focus: "Jugar, viajar, and future forms",
    points: [
      "Practiced `jugar` and `viajar` in past, present, near future, and simple future.",
      "Used the near future structure `voy a + infinitive` with examples such as `voy a jugar` and `voy a viajar`.",
      "Learned regular simple future forms such as `jugaré` and `viajaré`.",
      "Added important irregular future forms such as `iré`, `tendré`, `saldré`, `vendré`, `haré`, `diré`, `podré`, `pondré`, `querré`, and `sabré`.",
      "Connected time markers such as `mañana`, `el fin de semana pasado`, and `en el futuro` with the right tense."
    ],
    examples: [
      "Ayer jugué con mi familia.",
      "Hoy viajo a China y voy a viajar a México.",
      "Mañana voy a jugar con mis amigos.",
      "En el futuro viajaré a muchos países.",
      "Algún día sabré hablar español muy bien."
    ]
  }
];

const stories = [
  {
    title: "Mi día y mi familia",
    level: "50-100 words",
    spanish: "Me llamo Wen y vivo en Florida. Hoy estoy contento porque estudio español en casa. Mi familia vive en China, pero hablo con mi madre y mi hermana. Ayer trabajé, cociné la comida y después estudié un poco más. También quise pizza, pero hice arroz en casa. Mañana quiero hablar más español y hacer una historia corta sobre mi escuela y mi familia.",
    english: "My name is Wen and I live in Florida. Today I am happy because I study Spanish at home. My family lives in China, but I speak with my mother and my sister. Yesterday I worked, cooked food, and then studied a little more. I also wanted pizza, but I made rice at home. Tomorrow I want to speak more Spanish and make a short story about my school and my family.",
    focus: ["me llamo", "vivo", "mi familia", "ayer trabajé", "cociné", "quise", "hice"],
    scenes: [
      {
        title: "Study Time",
        spanishCaption: "Hoy estudio español en casa porque quiero aprender más.",
        englishCaption: "Today I study Spanish at home because I want to learn more.",
        art: storySceneHomeStudy()
      },
      {
        title: "Family Talk",
        spanishCaption: "Hablo con mi madre y mi hermana, y todos estamos contentos.",
        englishCaption: "I speak with my mother and my sister, and everyone is happy.",
        art: storySceneFamilyTalk()
      },
      {
        title: "Rice Instead of Pizza",
        spanishCaption: "Quise pizza, pero hice arroz en casa después del trabajo.",
        englishCaption: "I wanted pizza, but I made rice at home after work.",
        art: storySceneRiceDinner()
      }
    ]
  },
  {
    title: "Después de la escuela",
    level: "50-100 words",
    spanish: "Ayer fui a la escuela y hablé un poco de español. Después volví a casa porque tuve trabajo, pero también quise estudiar más. Cociné arroz y comí con mi familia. Mi hermana estaba contenta y mi hermano estaba tranquilo. Más tarde hice una historia corta sobre mi madre y mi padre. Hoy quiero hablar más y escribir sobre mi comida y mi escuela.",
    english: "Yesterday I went to school and spoke a little Spanish. Afterward I returned home because I had work, but I also wanted to study more. I cooked rice and ate with my family. My sister was happy and my brother was calm. Later I wrote a short story about my mother and my father. Today I want to speak more and write about my food and my school.",
    focus: ["fui", "después", "porque", "pero", "también", "arroz", "más", "corta", "sobre"],
    scenes: [
      {
        title: "At School",
        spanishCaption: "Ayer fui a la escuela y hablé un poco de español.",
        englishCaption: "Yesterday I went to school and spoke a little Spanish.",
        art: storySceneSchoolDay()
      },
      {
        title: "After School",
        spanishCaption: "Después volví a casa porque tuve trabajo, pero quise estudiar más.",
        englishCaption: "Afterward I went home because I had work, but I wanted to study more.",
        art: storySceneAfterSchool()
      },
      {
        title: "Short Story",
        spanishCaption: "Más tarde hice una historia corta sobre mi madre y mi padre.",
        englishCaption: "Later I made a short story about my mother and father.",
        art: storySceneWritingStory()
      }
    ]
  },
  {
    title: "Una historia sobre hoy",
    level: "50-100 words",
    spanish: "Hoy estoy en casa porque quiero estudiar español con calma. Primero hablo un poco, después leo y escribo más. También pregunto: ¿qué hago hoy y dónde estudio mejor? Mi respuesta es corta, pero clara: estudio en casa y hago la comida después. A veces quiero pizza, pero hoy cocino arroz. Esta pequeña historia es sobre mi día, mi trabajo y mi familia.",
    english: "Today I am at home because I want to study Spanish calmly. First I speak a little, afterward I read and write more. I also ask: what do I do today and where do I study best? My answer is short, but clear: I study at home and make food afterward. Sometimes I want pizza, but today I cook rice. This small story is about my day, my work, and my family.",
    focus: ["porque", "después", "más", "también", "pero", "arroz", "corta", "sobre"],
    scenes: [
      {
        title: "Quiet Morning",
        spanishCaption: "Hoy estoy en casa porque quiero estudiar español con calma.",
        englishCaption: "Today I am at home because I want to study Spanish calmly.",
        art: storySceneQuietMorning()
      },
      {
        title: "Reading and Writing",
        spanishCaption: "Después leo y escribo más, y hago una respuesta corta pero clara.",
        englishCaption: "Afterward I read and write more, and I make a short but clear answer.",
        art: storySceneReadingWriting()
      },
      {
        title: "Cooking Rice",
        spanishCaption: "A veces quiero pizza, pero hoy cocino arroz.",
        englishCaption: "Sometimes I want pizza, but today I cook rice.",
        art: storySceneCookingRice()
      }
    ]
  },
  {
    title: "Un viaje y un plan",
    level: "50-100 words",
    spanish: "El fin de semana pasado viajé a Japón con mis amigos por trabajo. Hoy viajo a China, pero mañana voy a viajar a México. Ayer jugué con mi familia y cuando era niño jugué mucho con mis amigos. En el futuro jugaré más con mi familia y viajaré a muchos países. Algún día sabré hablar español muy bien y diré más cosas sobre mis viajes.",
    english: "Last weekend I traveled to Japan with my friends for work. Today I travel to China, but tomorrow I am going to travel to Mexico. Yesterday I played with my family, and when I was a child I played a lot with my friends. In the future I will play more with my family and I will travel to many countries. Someday I will know how to speak Spanish very well and I will say more things about my trips.",
    focus: ["viajé", "viajo", "voy a viajar", "jugué", "jugaré", "viajaré", "sabré"],
    scenes: [
      {
        title: "Travel Plan",
        spanishCaption: "El fin de semana pasado viajé a Japón y mañana voy a viajar a México.",
        englishCaption: "Last weekend I traveled to Japan and tomorrow I am going to travel to Mexico.",
        art: storySceneSchoolDay()
      },
      {
        title: "Play Time",
        spanishCaption: "Ayer jugué con mi familia y cuando era niño jugué mucho con mis amigos.",
        englishCaption: "Yesterday I played with my family, and when I was a child I played a lot with my friends.",
        art: storySceneFamilyTalk()
      },
      {
        title: "Future Spanish",
        spanishCaption: "Algún día sabré hablar español muy bien y viajaré a muchos países.",
        englishCaption: "Someday I will know how to speak Spanish very well and I will travel to many countries.",
        art: storySceneWritingStory()
      }
    ]
  }
];

const quizQuestions = [
  {
    prompt: "Which form is correct for 'we live'?",
    options: ["nosotros vive", "nosotros vivimos", "nosotros viven"],
    answer: "nosotros vivimos",
    explanation: "Use the nosotros form of vivir: vivimos. Vive is singular, and viven is third-person plural."
  },
  {
    prompt: "Choose the correct sentence for location.",
    options: ["Nosotros somos en Florida.", "Nosotros estamos en Florida.", "Nosotros es en Florida."],
    answer: "Nosotros estamos en Florida.",
    explanation: "Use estar for location. Somos and es are forms of ser, which are not used for physical location here."
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
    explanation: "Qué asks for 'what'. Cuándo means 'when', and quién means 'who'."
  },
  {
    prompt: "How do you introduce yourself in Spanish?",
    options: ["Yo soy Wen.", "Me llamo Wen.", "Soy me llamo Wen."],
    answer: "Me llamo Wen.",
    explanation: "Me llamo is the standard beginner pattern for saying your name. Yo soy Wen is grammatical, but it means 'I am Wen,' not the targeted introduction pattern."
  },
  {
    prompt: "What is the past tense of 'ir' (to go)?",
    options: ["iba", "fui", "voy"],
    answer: "fui",
    explanation: "Fui is the simple past (pretérito) form for 'I went'. Voy is present tense, and iba is imperfect, used for ongoing past actions."
  },
  {
    prompt: "Translate: I worked yesterday.",
    options: ["Yo trabajo ayer.", "Ayer trabajé.", "Ayer trabajo."],
    answer: "Ayer trabajé.",
    explanation: "Ayer signals a completed past action, so use the preterite: trabajé. Trabajo is present tense."
  },
  {
    prompt: "What is the past tense of 'hacer' (to do/make)?",
    options: ["hago", "hice", "hacía"],
    answer: "hice",
    explanation: "Hice is the yo preterite form of hacer. Hago is present tense, and hacía is imperfect."
  },
  {
    prompt: "Choose the correct form: 'Yesterday I had work.'",
    options: ["Ayer tuve trabajo.", "Ayer tengo trabajo.", "Ayer tuvé trabajo."],
    answer: "Ayer tuve trabajo.",
    explanation: "Ayer needs past tense, so use tuve. Tengo is present, and tuvé is misspelled."
  },
  {
    prompt: "How do you say 'My sister's name is Jade'?",
    options: ["Mi hermana se llama Jade.", "Mi hermana llama Jade.", "Mi se llama hermana Jade."],
    answer: "Mi hermana se llama Jade.",
    explanation: "Use se llama for naming another person: Mi hermana se llama Jade. The other choices break the sentence structure."
  },
  {
    prompt: "What does `voy a viajar` mean?",
    options: ["I traveled", "I am going to travel", "I will know"],
    answer: "I am going to travel",
    explanation: "`Voy a + infinitive` is the near future pattern, so `voy a viajar` means `I am going to travel`."
  },
  {
    prompt: "Which is the correct simple future form of `jugar` for yo?",
    options: ["jugaré", "jugué", "juego"],
    answer: "jugaré",
    explanation: "`Jugaré` is the yo simple future form. `Jugué` is past, and `juego` is present."
  },
  {
    prompt: "Which sentence uses the near future correctly?",
    options: ["Mañana voy jugar con mis amigos.", "Mañana voy a jugar con mis amigos.", "Mañana jugar con mis amigos voy."],
    answer: "Mañana voy a jugar con mis amigos.",
    explanation: "The structure is `voy a + infinitive`, so you need the `a`: `voy a jugar`."
  },
  {
    prompt: "What is the correct future form of `saber` for yo?",
    options: ["sabré", "sé", "supe"],
    answer: "sabré",
    explanation: "`Sabré` is the irregular future form of `saber`. `Sé` is present, and `supe` is past."
  }
];

let currentStory = 0;
let currentEssay = 0;
let activeTopicFilter = "All";
let currentRecordingTarget = pronunciationSections[0].items[0];
let currentPracticeQuestions = [];
let mediaRecorder;
let recordingChunks = [];
let recordingStream;
let speechVoices = [];
let speakingTimeout;
let studySelections = loadStudySelections();
let currentLanguage = window.localStorage.getItem(STORAGE_KEYS.language) || "en";
let reviewMeaningMode = window.localStorage.getItem(STORAGE_KEYS.reviewMeaningMode) || "english";

const vocabularyExampleTranslations = {
  "Quiero aprender español.": "I want to learn Spanish.",
  "Yo hablo español.": "I speak Spanish.",
  "Ellos comen pizza.": "They eat pizza.",
  "Yo vivo en Florida.": "I live in Florida.",
  "Nosotros estudiamos español.": "We study Spanish.",
  "Yo trabajo en casa.": "I work at home.",
  "Yo cocino en casa.": "I cook at home.",
  "Ella limpia.": "She cleans.",
  "Yo vivo en casa.": "I live at home.",
  "Nosotros estudiamos en la escuela.": "We study at school.",
  "Ellos comen la comida.": "They eat the food.",
  "Yo soy de Florida.": "I am from Florida.",
  "Yo estoy en casa.": "I am at home.",
  "Yo soy un estudiante de español.": "I am a Spanish student.",
  "Hoy estoy cansado.": "Today I am tired.",
  "Hoy estoy ocupado.": "Today I am busy.",
  "Hoy estoy contento.": "Today I am happy.",
  "Yo voy a casa.": "I go home.",
  "Yo tengo trabajo.": "I have work.",
  "Yo hago la comida en casa.": "I make the food at home.",
  "Yo quiero pizza.": "I want pizza.",
  "Hoy estoy tranquilo.": "Today I am calm.",
  "Hoy estoy nervioso.": "Today I am nervous.",
  "Hoy estoy orgulloso.": "Today I am proud.",
  "¿Qué quieres comer hoy?": "What do you want to eat today?",
  "¿Dónde vas hoy?": "Where are you going today?",
  "¿Cuándo vas a la escuela?": "When are you going to school?",
  "¿Cómo estás hoy?": "How are you today?",
  "¿Quién es tu profesor?": "Who is your teacher?",
  "Me llamo Wen.": "My name is Wen.",
  "Mi madre se llama Laura.": "My mother's name is Laura.",
  "Mi padre se llama Paul.": "My father's name is Paul.",
  "Mi hermano se llama Wen.": "My brother's name is Wen.",
  "Mi hermana se llama Jade.": "My sister's name is Jade.",
  "Tengo dos hermanos.": "I have two siblings.",
  "Mi familia vive en China.": "My family lives in China.",
  "Ayer fui a la escuela.": "Yesterday I went to school.",
  "Ayer tuve trabajo.": "Yesterday I had work.",
  "Ayer hice la comida en casa.": "Yesterday I made the food at home.",
  "Ayer quise pizza.": "Yesterday I wanted pizza.",
  "Ayer estudié español en casa.": "Yesterday I studied Spanish at home.",
  "Ayer trabajé.": "Yesterday I worked.",
  "Ayer cociné la comida.": "Yesterday I cooked the food.",
  "Ayer hablé español.": "Yesterday I spoke Spanish.",
  "Estoy contento porque estudio español.": "I am happy because I study Spanish.",
  "Quise pizza, pero hice arroz.": "I wanted pizza, but I made rice.",
  "Después estudié un poco más.": "Afterward I studied a little more.",
  "También hablé con mi familia.": "I also spoke with my family.",
  "Hice arroz en casa.": "I made rice at home.",
  "Quiero estudiar más.": "I want to study more.",
  "Es una historia corta.": "It is a short story.",
  "Escribo una historia sobre mi familia.": "I write a story about my family.",
  "Mañana voy a jugar con mis amigos.": "Tomorrow I am going to play with my friends.",
  "Hoy juego en casa.": "Today I play at home.",
  "Ayer jugué con mi familia.": "Yesterday I played with my family.",
  "En el futuro jugaré más con mi familia.": "In the future I will play more with my family.",
  "Voy a viajar a México.": "I am going to travel to Mexico.",
  "Hoy viajo a China.": "Today I travel to China.",
  "El fin de semana pasado viajé a Japón con mis amigos por trabajo.": "Last weekend I traveled to Japan with my friends for work.",
  "En el futuro viajaré a muchos países.": "In the future I will travel to many countries.",
  "Hoy voy a jugar un poco en casa.": "Today I am going to play a little at home.",
  "Mañana voy a viajar a México.": "Tomorrow I am going to travel to Mexico.",
  "Mañana viajaré temprano.": "Tomorrow I will travel early.",
  "Anoche estudié español en casa.": "Last night I studied Spanish at home.",
  "Voy a practicar otra vez.": "I am going to practice again.",
  "El fin de semana pasado viajé a Japón.": "Last weekend I traveled to Japan.",
  "El próximo año voy a viajar más.": "Next year I am going to travel more.",
  "Voy al parque con mi familia.": "I go to the park with my family.",
  "Me gusta jugar fútbol.": "I like to play soccer.",
  "Viajé a Japón por trabajo.": "I traveled to Japan for work.",
  "Viajaré a muchos países.": "I will travel to many countries.",
  "Algún día sabré hablar español muy bien.": "Someday I will know how to speak Spanish very well.",
  "Mañana iré al trabajo en tren.": "Tomorrow I will go to work by train.",
  "En el futuro tendré más tiempo para viajar.": "In the future I will have more time to travel.",
  "Mañana saldré temprano.": "Tomorrow I will leave early.",
  "Mañana vendré a casa temprano.": "Tomorrow I will come home early.",
  "Mañana haré la comida.": "Tomorrow I will make the food.",
  "Mañana diré la respuesta en español.": "Tomorrow I will say the answer in Spanish.",
  "Mañana podré estudiar más.": "Tomorrow I will be able to study more.",
  "Pondré el libro en la mesa.": "I will put the book on the table.",
  "En el futuro querré viajar más.": "In the future I will want to travel more.",
  "Con más práctica sabré más palabras.": "With more practice I will know more words."
};

const essayPrompts = [
  {
    prompt: "Write 3 to 4 short Spanish sentences: introduce yourself, say where you live, and say how you feel today.",
    hints: ["Use: me llamo", "Use: vivo en ...", "Use: hoy estoy ..."],
    sample: "Me llamo Wen. Vivo en Florida. Hoy estoy contento y tranquilo.",
    explanation: "This practices self-introduction, present tense, and estar with feelings."
  },
  {
    prompt: "Write 4 short Spanish sentences about your daily routine: say what you do in the morning, where you work or study, what you eat, and how you feel at the end of the day.",
    hints: ["Use: por la mañana ...", "Try: estudio, trabajo, como, cocino", "End with: por la noche estoy ..."],
    sample: "Por la mañana estudio español. Después trabajo en casa. Como arroz y a veces cocino la comida. Por la noche estoy cansado pero contento.",
    explanation: "This practices daily routine verbs and simple time expressions."
  },
  {
    prompt: "Write 3 short Spanish sentences about your family: say who is in your family and give one person's name.",
    hints: ["Use: mi familia", "Use: tengo ...", "Use: se llama ..."],
    sample: "Tengo una hermana y un hermano. Mi familia vive en China. Mi hermana se llama Jade.",
    explanation: "This practices family words and the naming pattern se llama."
  },
  {
    prompt: "Write 3 short Spanish sentences about yesterday: say where you went, what you did, and how you felt.",
    hints: ["Use: ayer", "Try one of: fui, hice, trabajé, estudié, cociné", "End with: estuve or estaba is optional, but simple present review is also fine if needed"],
    sample: "Ayer fui a la escuela. Ayer estudié español y cociné la comida. Después, estuve cansado pero contento.",
    explanation: "This practices Day 5 past tense forms with a simple time marker."
  },
  {
    prompt: "Write 3 to 4 short Spanish sentences about your future plans: say one thing you are going to do, one place you are going to travel, and one thing you will do or know in the future.",
    hints: ["Use: voy a ...", "Try: jugar, viajar", "Add one future form: jugaré, viajaré, iré, tendré, haré, sabré"],
    sample: "Mañana voy a jugar con mi familia. El próximo año voy a viajar a México. En el futuro viajaré a muchos países y algún día sabré hablar español muy bien.",
    explanation: "This practices Day 6 near future and simple future forms."
  }
];

function renderRandomBanner() {
  if (!randomBanner) {
    return;
  }
  const palettes = [
    ["#f97316", "#fb7185", "#38bdf8", "#22c55e"],
    ["#0f766e", "#14b8a6", "#f59e0b", "#f43f5e"],
    ["#1d4ed8", "#60a5fa", "#fbbf24", "#f97316"],
    ["#7c3aed", "#22d3ee", "#a3e635", "#f43f5e"]
  ];
  const palette = palettes[Math.floor(Math.random() * palettes.length)];
  const circles = Array.from({ length: 8 }, (_, index) => {
    const cx = 80 + index * 120 + Math.floor(Math.random() * 50);
    const cy = 55 + Math.floor(Math.random() * 90);
    const radius = 26 + Math.floor(Math.random() * 42);
    const color = palette[index % palette.length];
    const opacity = (0.2 + Math.random() * 0.45).toFixed(2);
    return `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${color}" opacity="${opacity}"></circle>`;
  }).join("");
  const waves = palette.map((color, index) => {
    const y = 34 + index * 30 + Math.floor(Math.random() * 8);
    return `<path d="M0 ${y} C 140 ${y - 22}, 260 ${y + 26}, 400 ${y} S 660 ${y - 24}, 820 ${y} S 1080 ${y + 18}, 1280 ${y}" stroke="${color}" stroke-width="${10 + index * 3}" fill="none" opacity="0.35" stroke-linecap="round"></path>`;
  }).join("");

  randomBanner.innerHTML = `
    <svg viewBox="0 0 1280 256" preserveAspectRatio="none" class="banner-svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="banner-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f8fbff"></stop>
          <stop offset="50%" stop-color="#eef5ff"></stop>
          <stop offset="100%" stop-color="#f7fffb"></stop>
        </linearGradient>
      </defs>
      <rect width="1280" height="256" rx="34" fill="url(#banner-bg)"></rect>
      ${circles}
      ${waves}
    </svg>
  `;
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function inferTopic(item) {
  const value = `${item.spanish} ${item.english} ${item.pos} ${item.examples.join(" ")}`.toLowerCase();
  if (item.pos === "Question" || value.includes("¿")) {
    return "Questions";
  }
  if (["cansado", "ocupado", "contento", "tranquilo", "nervioso", "orgulloso", "corta"].includes(item.spanish.toLowerCase())) {
    return "Feelings";
  }
  if (["la casa", "la escuela", "la comida", "mi madre", "mi padre", "mi hermano", "mi hermana", "mi familia", "arroz", "vivir"].includes(item.spanish.toLowerCase())) {
    return "Places";
  }
  if (item.pos === "Verb" || item.pos === "Phrase") {
    return "Verbs";
  }
  return "Places";
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function loadStudySelections() {
  const saved = window.localStorage.getItem(STORAGE_KEYS.studySelections);
  if (!saved) {
    return { vocabulary: [], grammar: [], pronunciation: [] };
  }

  try {
    const parsed = JSON.parse(saved);
    return {
      vocabulary: Array.isArray(parsed.vocabulary) ? parsed.vocabulary : [],
      grammar: Array.isArray(parsed.grammar) ? parsed.grammar : [],
      pronunciation: Array.isArray(parsed.pronunciation) ? parsed.pronunciation : []
    };
  } catch {
    return { vocabulary: [], grammar: [], pronunciation: [] };
  }
}

function saveStudySelections() {
  window.localStorage.setItem(STORAGE_KEYS.studySelections, JSON.stringify(studySelections));
}

function hasStudySelections() {
  return studySelections.vocabulary.length > 0 || studySelections.grammar.length > 0 || studySelections.pronunciation.length > 0;
}

function currentPageHref() {
  const path = window.location.pathname.split("/").pop();
  return path || "index.html";
}

function t(en, zh) {
  return currentLanguage === "zh" ? zh : en;
}

function insertLanguageToggle() {
  const tabBar = document.querySelector(".tab-bar");
  if (!tabBar || tabBar.querySelector(".language-toggle")) {
    return;
  }

  const button = document.createElement("button");
  button.type = "button";
  button.className = "tab-button language-toggle";
  button.textContent = currentLanguage === "zh" ? "EN" : "中文";
  button.addEventListener("click", () => {
    currentLanguage = currentLanguage === "zh" ? "en" : "zh";
    window.localStorage.setItem(STORAGE_KEYS.language, currentLanguage);
    applyLanguage();
    renderTopicFilters();
    renderVocabulary(getFilteredVocabulary());
    renderGrammar();
    renderPronunciation();
    renderFlashcards(getFilteredVocabulary());
    renderReview();
    renderStories();
    renderExercises();
    renderQuiz();
    renderSummary();
  });
  tabBar.appendChild(button);
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";

  document.querySelectorAll(".tab-bar .tab-button[href]").forEach((link) => {
    const href = link.getAttribute("href");
    const label = NAV_LABELS[href];
    if (label) {
      link.textContent = currentLanguage === "zh" ? label.zh : label.en;
    }
  });

  const toggle = document.querySelector(".language-toggle");
  if (toggle) {
    toggle.textContent = currentLanguage === "zh" ? "EN" : "中文";
  }

  const page = currentPageHref();
  const pageTitles = {
    "index.html": t("Spanish Learning", "西班牙语学习"),
    "vocabulary.html": t("Spanish Learning - Vocabulary", "西班牙语学习 - 词汇"),
    "grammar.html": t("Spanish Learning - Grammar", "西班牙语学习 - 语法"),
    "verbs.html": t("Spanish Learning - Verb Tables", "西班牙语学习 - 动词变位表"),
    "pronunciation.html": t("Spanish Learning - Pronunciation", "西班牙语学习 - 发音"),
    "review.html": t("Spanish Learning - Review", "西班牙语学习 - 复习"),
    "flashcards.html": t("Spanish Learning - Flashcards", "西班牙语学习 - 抽认卡"),
    "stories.html": t("Spanish Learning - Stories", "西班牙语学习 - 故事"),
    "practice.html": t("Spanish Learning - Practice", "西班牙语学习 - 练习"),
    "writing.html": t("Spanish Learning - Writing", "西班牙语学习 - 写作"),
    "summary.html": t("Spanish Learning - Summary", "西班牙语学习 - 总结"),
    "notes.html": t("Spanish Learning - Daily Notes", "西班牙语学习 - 每日笔记")
  };
  if (pageTitles[page]) {
    document.title = pageTitles[page];
  }

  const selectorMap = {
    "index.html": [
      [".hero-kicker", t("Spanish Study Journal", "西班牙语学习笔记")],
      ["h1", t("Learning Spanish", "学习西班牙语")],
      ["h2", t("Read Me", "说明")]
    ],
    "vocabulary.html": [
      ["h2", t("Vocabulary", "词汇")],
      [".section-header .muted", t("Core words and example phrases pulled from the first six study days.", "整理自前六天学习内容的核心词汇和例句。")]
    ],
    "grammar.html": [
      ["h2", t("Grammar", "语法")],
      [".section-header .muted", t("Short explanations and reference tables for the main grammar points used in your lessons.", "课程主要语法点的简短说明和参考表。")]
    ],
    "verbs.html": [
      ["h2", t("Verb Tables", "动词变位表")],
      [".section-header .muted", t("Compare present, simple past, present perfect, and future forms for regular verbs and common irregular verbs.", "对比规则动词和常用不规则动词的现在时、简单过去时、现在完成时和将来时。")]
    ],
    "pronunciation.html": [
      ["h2", t("Pronunciation", "发音")],
      [".section-header .muted", t("Play key words and complete model sentences. Use the slower pace to repeat after each line.", "播放关键词和示范句，用较慢速度逐句跟读。")],
      [".card-label", t("Pronunciation Compare", "发音对比")],
      ["#play-recording-target", t("Play Model", "播放示范")],
      ["#start-recording", t("Start Recording", "开始录音")],
      ["#stop-recording", t("Stop Recording", "停止录音")]
    ],
    "flashcards.html": [
      ["h2", t("Flashcards", "抽认卡")],
      [".section-header .muted", t("Click any card to reveal the English translation, then click again to hide it.", "点击卡片显示英文，再点一次隐藏。")]
    ],
    "stories.html": [
      ["h2", t("Stories", "故事")],
      [".section-header .muted", t("Read a short story built from the vocabulary so far, then review a few cartoon scenes with Spanish and English captions.", "阅读由已学词汇组成的短故事，再看带西英字幕的小场景。")],
      ["#next-story", t("Random Story", "随机故事")]
    ],
    "practice.html": [
      ["h2", t("Practice", "练习")],
      [".section-header .muted", t("Build custom exercises and a generated quiz from the items you selected on the Vocabulary, Grammar, and Pronunciation pages.", "根据你在词汇、语法和发音页面勾选的内容生成练习和测验。")],
      ["#check-quiz", t("Check Answers", "检查答案")]
    ],
    "writing.html": [
      ["h2", t("Writing", "写作")],
      [".section-header .muted", t("Practice short paragraphs for self-introduction, daily routine, family, and future-plan topics.", "练习自我介绍、日常生活、家庭和未来计划主题的短文。")],
      ["#next-essay", t("Next Prompt", "下一个题目")],
      ["#show-essay-answer", t("Show Model Answer", "显示范文")],
      ["#check-writing", t("Check Writing", "检查写作")]
    ],
    "summary.html": [
      ["h2", t("Learning Summary", "学习总结")]
    ],
    "notes.html": [
      ["h2", t("Daily Notes", "每日笔记")]
    ]
  };

  (selectorMap[page] || []).forEach(([selector, text]) => {
    const node = document.querySelector(selector);
    if (node) {
      node.textContent = text;
    }
  });

  const selectionLabel = document.querySelector(".selection-nav-label");
  const selectionCopy = document.querySelector(".selection-nav-copy");
  if (selectionLabel) {
    selectionLabel.textContent = t("Selected Study", "已选学习内容");
  }
  if (selectionCopy) {
    selectionCopy.textContent = t(
      "These tabs are shown only for the items you selected in Vocabulary, Grammar, and Pronunciation.",
      "这些页面只会在你于词汇、语法和发音中勾选内容后显示。"
    );
  }

  if (page === "index.html") {
    const introParagraphs = document.querySelectorAll(".card > p");
    if (introParagraphs[0]) {
      introParagraphs[0].textContent = t(
        "This website is a personal Spanish study dashboard based on your first six days of notes. It is designed to keep your early learning material in one place so you can review verbs, vocabulary, sentence patterns, question forms, short reading passages, pronunciation, and writing practice without searching through separate files. The site is now organized as multiple pages instead of a single long file, so each section is easier to review and edit.",
        "这个网站是根据你前六天学习笔记整理出的个人西班牙语学习面板。它把早期学习内容集中在一起，方便你复习动词、词汇、句型、疑问句、短文、发音和写作练习，不需要再翻找分散文件。现在网站已经拆分成多个页面，而不是单个长页面，因此每个部分都更容易查看和修改。"
      );
    }
    if (introParagraphs[1]) {
      introParagraphs[1].innerHTML = currentLanguage === "zh"
        ? "整体使用流程很简单。先看 <strong>说明</strong> 了解结构，再到 <strong>词汇</strong> 复习单词，用 <strong>语法</strong> 查看规则和变位表，接着到 <strong>发音</strong> 听示范并录音，用 <strong>复习</strong> 和 <strong>抽认卡</strong> 聚焦已选内容，再在 <strong>故事</strong>、<strong>练习</strong> 和 <strong>写作</strong> 中应用，最后通过 <strong>总结</strong> 查看学习建议，并把 <strong>每日笔记</strong> 当作课程参考。"
        : "The overall workflow is simple. Start with <strong>Read Me</strong> for orientation, move to <strong>Vocabulary</strong> for word review, use <strong>Grammar</strong> for reference and verb tables, go to <strong>Pronunciation</strong> to listen and record, use <strong>Review</strong> and <strong>Flashcards</strong> to focus selected items, practice them in <strong>Stories</strong>, <strong>Practice</strong>, and <strong>Writing</strong>, check <strong>Summary</strong> for learning suggestions, and use <strong>Daily Notes</strong> as lesson reference.";
    }
    const infoPanels = document.querySelectorAll(".info-panel");
    if (infoPanels[0]) infoPanels[0].querySelector("h3").textContent = t("Current Sections", "当前页面");
    if (infoPanels[1]) infoPanels[1].querySelector("h3").textContent = t("How To Use", "使用方法");
    if (infoPanels[2]) infoPanels[2].querySelector("h3").textContent = t("Selection-Based Study Block", "基于勾选的学习模块");
    if (infoPanels[3]) infoPanels[3].querySelector("h3").textContent = t("What Has Been Customized", "已定制内容");
    if (infoPanels[4]) infoPanels[4].querySelector("h3").textContent = t("Current Limits", "当前限制");
    if (infoPanels[5]) infoPanels[5].querySelector("h3").textContent = t("Requested Changes Log", "需求变更记录");
    if (infoPanels[6]) infoPanels[6].querySelector("h3").textContent = t("Vocabulary Decisions", "词汇设置说明");
  }

  if (vocabSearch) {
    vocabSearch.placeholder = t("Search Spanish, English, Chinese, or example", "搜索西语、英语、中文或例句");
  }
  if (essayResponse) {
    essayResponse.placeholder = t("Write your Spanish paragraph here.", "在这里写你的西语短文。");
  }
}

function updateSelectionNavigation() {
  const mainNav = document.querySelector(".tab-bar");
  if (!mainNav || mainNav.classList.contains("selection-tab-bar")) {
    return;
  }

  let selectionGroup = document.querySelector(".selection-nav-group");
  let selectionNav = document.querySelector(".selection-tab-bar");

  if (!selectionGroup) {
    selectionGroup = document.createElement("section");
    selectionGroup.className = "selection-nav-group";
    selectionGroup.innerHTML = `
      <p class="selection-nav-label">Selected Study</p>
      <p class="selection-nav-copy">These tabs are shown only for the items you selected in Vocabulary, Grammar, and Pronunciation.</p>
    `;
    selectionNav = document.createElement("nav");
    selectionNav.className = "tab-bar selection-tab-bar";
    selectionNav.setAttribute("aria-label", "Selection pages");
    selectionGroup.appendChild(selectionNav);
    mainNav.insertAdjacentElement("afterend", selectionGroup);
  }

  if (!selectionNav) {
    return;
  }

  if (!selectionNav.children.length) {
    const selectionLinks = [...mainNav.querySelectorAll(".tab-button")]
      .filter((link) => selectionPageHrefs.has(link.getAttribute("href")));

    selectionLinks.forEach((link) => {
      selectionNav.appendChild(link.cloneNode(true));
      link.remove();
    });
  }

  const shouldShowSelectionTabs = hasStudySelections() || selectionPageHrefs.has(currentPageHref());
  selectionGroup.hidden = !shouldShowSelectionTabs;
}

function getPronunciationItemKey(text) {
  return `pronunciation-${slugify(text)}`;
}

function isSelected(group, key) {
  return studySelections[group].includes(key);
}

function toggleSelection(group, key) {
  if (isSelected(group, key)) {
    studySelections[group] = studySelections[group].filter((item) => item !== key);
  } else {
    studySelections[group] = [...studySelections[group], key];
  }
  saveStudySelections();
  updateSelectionNavigation();
}

function getSelectedVocabulary() {
  return vocabulary.filter((item) => isSelected("vocabulary", item.id));
}

function getSelectedGrammar() {
  return grammarPoints.filter((point) => isSelected("grammar", point.id));
}

function getAllPronunciationItems() {
  return pronunciationSections.flatMap((section) =>
    section.items.map((item) => ({
      key: getPronunciationItemKey(item),
      title: section.title,
      text: item
    }))
  );
}

function getSelectedPronunciationItems() {
  return getAllPronunciationItems().filter((item) => isSelected("pronunciation", item.key));
}

function loadQuizHistory() {
  const saved = window.localStorage.getItem(STORAGE_KEYS.quizHistory);
  if (!saved) {
    return [];
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function updateSpeechVoices() {
  if (!("speechSynthesis" in window)) {
    return [];
  }

  speechVoices = window.speechSynthesis.getVoices();
  return speechVoices;
}

function getPreferredSpanishVoice() {
  const voices = speechVoices.length ? speechVoices : updateSpeechVoices();
  if (!voices.length) {
    return null;
  }

  return voices.find((voice) => ["es-MX", "es-US", "es-ES"].includes(voice.lang))
    || voices.find((voice) => voice.lang.toLowerCase().startsWith("es"))
    || null;
}

function saveQuizAttempt(score, total) {
  const history = loadQuizHistory();
  history.unshift({
    score,
    total,
    timestamp: new Date().toISOString(),
    selected: {
      vocabulary: studySelections.vocabulary.length,
      grammar: studySelections.grammar.length,
      pronunciation: studySelections.pronunciation.length
    }
  });
  window.localStorage.setItem(STORAGE_KEYS.quizHistory, JSON.stringify(history.slice(0, 10)));
}

function getFilteredVocabulary() {
  const term = vocabSearch ? vocabSearch.value.trim().toLowerCase() : "";
  return vocabulary.filter((item) => {
    const matchesTerm = [item.spanish, item.english, item.chinese, item.pos, item.day, item.topic, ...item.examples]
      .some((value) => value.toLowerCase().includes(term));
    const matchesTopic = activeTopicFilter === "All" || item.topic === activeTopicFilter;
    return matchesTerm && matchesTopic;
  }).sort((a, b) => a.spanish.localeCompare(b.spanish, "es", { sensitivity: "base" }));
}

function getVocabularyExampleTranslation(example) {
  return vocabularyExampleTranslations[example] || "";
}

function getReviewMeaningLabel(item) {
  return reviewMeaningMode === "chinese" ? item.chinese : item.english;
}

function saveReviewMeaningMode(mode) {
  reviewMeaningMode = mode;
  window.localStorage.setItem(STORAGE_KEYS.reviewMeaningMode, mode);
}

function renderTopicFilters() {
  if (!topicFilters) {
    return;
  }
  const topicLabels = {
    All: t("All", "全部"),
    Verbs: t("Verbs", "动词"),
    Feelings: t("Feelings", "感受"),
    Places: t("Places", "地点"),
    Questions: t("Questions", "疑问句")
  };
  topicFilters.innerHTML = filterOptions.map((option) => `
    <button class="filter-chip ${option === activeTopicFilter ? "active" : ""}" type="button" data-topic="${option}">
      ${topicLabels[option]}
    </button>
  `).join("");
}

function renderVocabulary(items) {
  if (!vocabList) {
    return;
  }
  vocabList.innerHTML = `
    <div class="vocab-table-wrap">
      <table class="vocab-table">
        <thead>
          <tr>
            <th scope="col">Pick</th>
            <th scope="col">${t("Spanish", "西班牙语")}</th>
            <th scope="col">${t("Meaning", "含义")}</th>
            <th scope="col">${t("Examples", "例句")}</th>
            <th scope="col">${t("Chinese", "中文")}</th>
          </tr>
        </thead>
        <tbody>
          ${items.map((item) => `
            <tr>
              <td>
                <input class="study-checkbox" type="checkbox" data-selection-group="vocabulary" data-selection-key="${item.id}" ${isSelected("vocabulary", item.id) ? "checked" : ""} aria-label="Select ${item.spanish} for review">
              </td>
              <td class="vocab-spanish">
                <span>${item.spanish}</span>
                <button class="audio-icon-button" type="button" data-speak="${item.spanish}" aria-label="Play pronunciation for ${item.spanish}">
                  <span aria-hidden="true">🔊</span>
                </button>
              </td>
              <td>${item.english}</td>
              <td>
                <ul class="table-example-list">
                  ${item.examples.slice(0, 1).map((example) => `
                    <li class="example-row">
                      <span>
                        <strong>${example}</strong><br>
                        <span class="example-translation">${getVocabularyExampleTranslation(example)}</span>
                      </span>
                      <button class="audio-icon-button audio-inline-button" type="button" data-speak="${example}" aria-label="Play pronunciation for ${example}">
                        <span aria-hidden="true">🔊</span>
                      </button>
                    </li>
                  `).join("")}
                </ul>
              </td>
              <td>${item.chinese}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderGrammar() {
  if (!grammarList) {
    return;
  }
  grammarList.innerHTML = grammarPoints.map((point) => `
    <article class="grammar-card">
      <div class="grammar-heading">
        <div class="grammar-title-row">
          <p class="grammar-kicker">${t("Grammar Point", "语法点")}</p>
          <label class="checkbox-label">
            <input class="study-checkbox" type="checkbox" data-selection-group="grammar" data-selection-key="${point.id}" ${isSelected("grammar", point.id) ? "checked" : ""}>
            <span>${t("Select", "选择")}</span>
          </label>
        </div>
        <h3>${point.title}</h3>
        <p class="grammar-rule">${point.rule}</p>
      </div>
      <div class="grammar-body">
        <div class="grammar-notes">
          <section class="grammar-list-block">
            <p class="grammar-subtitle">${t("Key Notes", "要点")}</p>
            <ul class="note-list">
              ${point.details.map((detail) => `<li>${detail}</li>`).join("")}
            </ul>
          </section>
          <section class="grammar-list-block">
            <p class="grammar-subtitle">${t("Examples", "例子")}</p>
            <ul class="note-list">
              ${point.examples.map((example) => `<li><strong>${example.spanish}</strong><br><span class="example-translation">${example.english}</span></li>`).join("")}
            </ul>
          </section>
        </div>
        ${point.table ? `
          <section class="grammar-list-block grammar-table-block">
            <p class="grammar-subtitle">${t("Reference Table", "参考表")}</p>
            <div class="grammar-table-wrap">
              <table class="grammar-table">
                <thead>
                  <tr>${point.table.headers.map((header) => `<th scope="col">${header}</th>`).join("")}</tr>
                </thead>
                <tbody>
                  ${point.table.rows.map((row) => `
                    <tr>${row.map((cell, index) => index === 0 ? `<th scope="row">${cell}</th>` : `<td>${cell}</td>`).join("")}</tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </section>
        ` : ""}
      </div>
    </article>
  `).join("");
}

function renderVerbTables() {
  if (!verbTables) {
    return;
  }

  const headers = [t("Subject", "主语"), t("Present", "现在时"), t("Simple Past", "简单过去时"), t("Present Perfect", "现在完成时"), t("Future", "将来时")];

  verbTables.innerHTML = verbTableSections.map((section) => `
    <article class="verb-section-card">
      <div class="section-header">
        <div>
          <h3>${section.title}</h3>
          <p class="muted">${section.description}</p>
        </div>
      </div>
      <div class="verb-table-stack">
        ${section.tables.map((table) => `
          <section class="grammar-list-block verb-table-card">
            <div class="verb-table-header">
              <div>
                <h3>${table.verb}</h3>
                <p class="muted">${table.english}</p>
              </div>
              <p class="verb-table-note">${table.note}</p>
            </div>
            <div class="grammar-table-wrap">
              <table class="grammar-table verb-table">
                <thead>
                  <tr>${headers.map((header) => `<th scope="col">${header}</th>`).join("")}</tr>
                </thead>
                <tbody>
                  ${table.rows.map((row) => `
                    <tr>${row.map((cell, index) => index === 0 ? `<th scope="row">${cell}</th>` : `<td>${cell}</td>`).join("")}</tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </section>
        `).join("")}
      </div>
    </article>
  `).join("");
}

function renderFlashcards(items) {
  if (!flashcardList) {
    return;
  }
  const sourceItems = getSelectedVocabulary().length ? getSelectedVocabulary() : items;
  flashcardList.innerHTML = sourceItems.map((item) => `
    <button class="flashcard" type="button" aria-label="Show English translation for ${item.spanish}" aria-pressed="false">
      <span class="flashcard-label">${t("Spanish", "西班牙语")}</span>
      <span class="flashcard-front">${item.spanish}</span>
      <span class="flashcard-back hidden">${item.english}</span>
    </button>
  `).join("");
}

function renderPronunciation() {
  if (!pronunciationList) {
    return;
  }
  const filteredWords = getFilteredVocabulary().slice(0, 12).map((item) => item.spanish);
  const sections = [
    {
      title: t("Filtered Words", "筛选词汇"),
      items: filteredWords.length ? filteredWords : [currentRecordingTarget]
    },
    {
      ...pronunciationSections[1],
      title: t("Model Sentences", "示范句")
    }
  ];

  pronunciationList.innerHTML = sections.map((section) => `
    <article class="pronunciation-card">
      <h3>${section.title}</h3>
      <div class="pronunciation-items">
        ${section.items.map((item) => `
          <div class="pronunciation-row">
            <label class="checkbox-label">
              <input class="study-checkbox" type="checkbox" data-selection-group="pronunciation" data-selection-key="${getPronunciationItemKey(item)}" ${isSelected("pronunciation", getPronunciationItemKey(item)) ? "checked" : ""}>
              <span>${t("Select", "选择")}</span>
            </label>
            <button class="pronunciation-button" type="button" data-speak="${item}" aria-label="Play pronunciation for ${item}">
              <span class="pronunciation-text">${item}</span>
              <span class="pronunciation-play">${t("Play", "播放")}</span>
            </button>
          </div>
        `).join("")}
      </div>
    </article>
  `).join("");
}

function renderReview() {
  if (!reviewContent) {
    return;
  }

  const selectedVocabulary = getSelectedVocabulary();
  const selectedGrammar = getSelectedGrammar();
  const selectedPronunciation = getSelectedPronunciationItems();

  if (!selectedVocabulary.length && !selectedGrammar.length && !selectedPronunciation.length) {
    reviewContent.innerHTML = `
      <article class="info-panel">
        <h3>${t("No Items Selected Yet", "还没有选择内容")}</h3>
        <p>${t("Select items from Vocabulary, Grammar, and Pronunciation to build a focused review page.", "请先在词汇、语法和发音页面勾选内容，系统会生成专门的复习页。")}</p>
      </article>
    `;
    return;
  }

  reviewContent.innerHTML = `
    ${selectedVocabulary.length ? `
      <article class="card">
        <div class="section-header">
          <div>
            <h2>${t("Vocabulary Review", "词汇复习")}</h2>
          </div>
          <div class="review-toggle-group" role="group" aria-label="Review meaning language">
            <button class="filter-chip ${reviewMeaningMode === "english" ? "active" : ""}" type="button" data-review-meaning="english">${t("English", "英语")}</button>
            <button class="filter-chip ${reviewMeaningMode === "chinese" ? "active" : ""}" type="button" data-review-meaning="chinese">${t("Chinese", "中文")}</button>
          </div>
        </div>
        <div class="review-grid">
          ${selectedVocabulary.map((item) => `
            <section class="review-card">
              <h3>${item.spanish}</h3>
              <p><strong>${reviewMeaningMode === "chinese" ? t("Chinese", "中文") : t("Meaning", "含义")}:</strong> ${getReviewMeaningLabel(item)}</p>
              <p><strong>${t("Example", "例句")}:</strong> ${item.examples[0]}</p>
              <p><strong>${t("Example translation", "例句翻译")}:</strong> ${getVocabularyExampleTranslation(item.examples[0])}</p>
            </section>
          `).join("")}
        </div>
      </article>
    ` : ""}
    ${selectedGrammar.length ? `
      <article class="card">
        <h2>${t("Grammar Review", "语法复习")}</h2>
        <div class="review-grid">
          ${selectedGrammar.map((point) => `
            <section class="review-card">
              <h3>${point.title}</h3>
              <p>${point.rule}</p>
              <ul class="note-list">${point.details.map((detail) => `<li>${detail}</li>`).join("")}</ul>
            </section>
          `).join("")}
        </div>
      </article>
    ` : ""}
    ${selectedPronunciation.length ? `
      <article class="card">
        <h2>${t("Pronunciation Review", "发音复习")}</h2>
        <div class="review-grid">
          ${selectedPronunciation.map((item) => `
            <section class="review-card">
              <h3>${item.text}</h3>
              <p><strong>${t("Section", "类别")}:</strong> ${item.title}</p>
              <p><strong>${t("Practice idea", "练习建议")}:</strong> ${t("Play it, repeat it three times, then record your own version.", "先播放，跟读三遍，然后录下自己的版本。")}</p>
            </section>
          `).join("")}
        </div>
      </article>
    ` : ""}
  `;
}

function generatePracticeQuestions() {
  const selectedVocabulary = getSelectedVocabulary();
  const selectedGrammar = getSelectedGrammar();
  const selectedPronunciation = getSelectedPronunciationItems();
  const questions = [];

  selectedVocabulary.slice(0, 5).forEach((item) => {
    const distractors = vocabulary
      .filter((word) => word.id !== item.id)
      .slice(0, 3)
      .map((word) => word.english);
    questions.push({
      prompt: `What is the English meaning of "${item.spanish}"?`,
      options: [item.english, ...distractors].sort(() => Math.random() - 0.5),
      answer: item.english,
      explanation: `The correct meaning of ${item.spanish} is "${item.english}".`
    });
  });

  selectedGrammar.slice(0, 4).forEach((point) => {
    questions.push({
      prompt: `Which grammar topic matches this idea: ${point.rule}`,
      options: [point.title, ...grammarPoints.filter((item) => item.id !== point.id).slice(0, 3).map((item) => item.title)].sort(() => Math.random() - 0.5),
      answer: point.title,
      explanation: `${point.title} is the grammar point connected to that rule.`
    });
  });

  selectedPronunciation.slice(0, 4).forEach((item) => {
    questions.push({
      prompt: `Which pronunciation target belongs to the "${item.title}" section?`,
      options: [item.text, ...getAllPronunciationItems().filter((entry) => entry.key !== item.key).slice(0, 3).map((entry) => entry.text)].sort(() => Math.random() - 0.5),
      answer: item.text,
      explanation: `"${item.text}" is one of your selected pronunciation targets from ${item.title}.`
    });
  });

  return questions;
}

function renderExercises() {
  if (!exerciseList) {
    return;
  }

  const selectedVocabulary = getSelectedVocabulary();
  const selectedGrammar = getSelectedGrammar();
  const selectedPronunciation = getSelectedPronunciationItems();

  const exercises = [
    ...selectedVocabulary.map((item) => `Say the meaning of "${item.spanish}" and then use it in a short Spanish sentence.`),
    ...selectedGrammar.map((point) => `Explain ${point.title} in your own words, then write one example.`),
    ...selectedPronunciation.map((item) => `Play and repeat "${item.text}" three times, then record yourself once.`)
  ];

  exerciseList.innerHTML = exercises.length
    ? exercises.map((exercise) => `<li>${exercise}</li>`).join("")
    : `<li>${t("Select items from Vocabulary, Grammar, or Pronunciation to build custom exercises.", "请先在词汇、语法或发音页面勾选内容以生成自定义练习。")}</li>`;
}

function renderSummary() {
  if (!summaryOverview || !summarySuggestions || !summaryHistory) {
    return;
  }

  const history = loadQuizHistory();
  const latest = history[0];
  const selectedCounts = {
    vocabulary: getSelectedVocabulary().length,
    grammar: getSelectedGrammar().length,
    pronunciation: getSelectedPronunciationItems().length
  };

  summaryOverview.innerHTML = `
    <p><strong>${t("Selected vocabulary", "已选词汇")}:</strong> ${selectedCounts.vocabulary}</p>
    <p><strong>${t("Selected grammar points", "已选语法点")}:</strong> ${selectedCounts.grammar}</p>
    <p><strong>${t("Selected pronunciation items", "已选发音项目")}:</strong> ${selectedCounts.pronunciation}</p>
    <p><strong>${t("Latest quiz score", "最近测验分数")}:</strong> ${latest ? `${latest.score} / ${latest.total}` : t("No quiz attempts yet.", "还没有测验记录。")}</p>
  `;

  const suggestions = [];
  if (selectedCounts.vocabulary < 3) suggestions.push("Select a few more vocabulary items to make review and quiz results more useful.");
  if (selectedCounts.grammar < 2) suggestions.push("Add more grammar points so practice includes both rules and examples.");
  if (selectedCounts.pronunciation < 2) suggestions.push("Select more pronunciation items to balance speaking practice with reading and writing.");
  if (latest && latest.total > 0) {
    const ratio = latest.score / latest.total;
    if (ratio >= 0.8) suggestions.push("Your latest quiz score is strong. Move to longer writing and speaking practice.");
    if (ratio < 0.8) suggestions.push("Review the missed quiz items and repeat the selected pronunciation lines before trying again.");
  } else {
    suggestions.push("After selecting items, go to Practice and complete a generated quiz to measure your current understanding.");
  }

  summarySuggestions.innerHTML = `<ul class="note-list">${suggestions.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  summaryHistory.innerHTML = history.length
    ? history.map((item) => `<li>${new Date(item.timestamp).toLocaleString()}: ${item.score} / ${item.total}</li>`).join("")
    : `<li>${t("No quiz history yet.", "还没有测验记录。")}</li>`;
}

function speakSpanish(text) {
  if (!("speechSynthesis" in window)) {
    window.alert("Audio is not supported in this browser.");
    return;
  }

  const synth = window.speechSynthesis;
  const preferredVoice = getPreferredSpanishVoice();

  if (speakingTimeout) {
    window.clearTimeout(speakingTimeout);
  }

  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = preferredVoice?.lang || "es-MX";
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  utterance.rate = 0.92;
  utterance.pitch = 1;

  if (recordingStatus) {
    recordingStatus.textContent = `Playing model: ${text}`;
    recordingStatus.classList.remove("muted");
  }

  utterance.onend = () => {
    if (recordingStatus) {
      recordingStatus.textContent = "Model audio finished. You can record your version now.";
    }
  };

  utterance.onerror = () => {
    if (recordingStatus) {
      recordingStatus.textContent = "Browser speech playback failed. Refresh Chrome or check macOS sound settings.";
    }
  };

  synth.resume();
  speakingTimeout = window.setTimeout(() => {
    synth.speak(utterance);
  }, 40);
}

function setRecordingTarget(text) {
  if (!recordingTarget) {
    return;
  }
  currentRecordingTarget = text;
  recordingTarget.textContent = `Target: ${text}`;
}

async function startRecording() {
  if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
    recordingStatus.textContent = "This browser does not support microphone recording.";
    return;
  }

  try {
    recordingStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recordingChunks = [];
    mediaRecorder = new MediaRecorder(recordingStream);
    mediaRecorder.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0) {
        recordingChunks.push(event.data);
      }
    });
    mediaRecorder.addEventListener("stop", () => {
      const audioBlob = new Blob(recordingChunks, { type: "audio/webm" });
      recordingPlayback.src = URL.createObjectURL(audioBlob);
      recordingStatus.innerHTML = "<p><strong>Recording saved.</strong> Replay your recording and compare it with the model.</p><ul class=\"analysis-list\"><li>Match the rhythm and speed.</li><li>Listen for clear vowels.</li><li>Repeat if the ending sounds weak.</li></ul>";
      if (recordingStream) {
        recordingStream.getTracks().forEach((track) => track.stop());
      }
    });
    mediaRecorder.start();
    recordingStatus.textContent = `Recording now: ${currentRecordingTarget}`;
  } catch (error) {
    recordingStatus.textContent = "Microphone access was blocked or unavailable.";
  }
}

function stopRecording() {
  if (!mediaRecorder || mediaRecorder.state !== "recording") {
    recordingStatus.textContent = "Start a recording first.";
    return;
  }

  mediaRecorder.stop();
}

function renderNotes() {
  if (!notesList) {
    return;
  }
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

function renderStories(index = currentStory) {
  if (!storyList || !storyGallery) {
    return;
  }
  const story = stories[index];
  const selectedStoryFocus = [
    ...getSelectedVocabulary().map((item) => item.spanish),
    ...getSelectedPronunciationItems().map((item) => item.text)
  ];
  const focusItems = selectedStoryFocus.length ? selectedStoryFocus.slice(0, 10) : story.focus;
  const focusLabel = selectedStoryFocus.length
    ? "Selected practice focus"
    : "Story focus";

  storyList.innerHTML = `
    <article class="story-card">
      <div class="story-topline">
        <div>
          <h3>${story.title}</h3>
          <p class="muted">${story.level}</p>
        </div>
      </div>
      <p class="story-text">${story.spanish}</p>
      <p class="story-translation"><strong>English support:</strong> ${story.english}</p>
      <p class="muted"><strong>${focusLabel}:</strong> ${selectedStoryFocus.length ? "This story still uses other familiar vocabulary, but the chips below prioritize your selected items." : "These are the built-in story targets."}</p>
      <div class="story-focus">
        ${focusItems.map((item) => `<span class="focus-chip">${item}</span>`).join("")}
      </div>
    </article>
  `;

  storyGallery.innerHTML = story.scenes.map((scene) => `
    <article class="scene-card">
      <div class="scene-art">${scene.art}</div>
      <h3>${scene.title}</h3>
      <p><strong>Spanish:</strong> ${scene.spanishCaption}</p>
      <p><strong>English:</strong> ${scene.englishCaption}</p>
    </article>
  `).join("");
}

function storySceneHomeStudy() {
  return `
    <svg viewBox="0 0 260 190" aria-hidden="true" class="scene-svg">
      <defs>
        <linearGradient id="scene-home-bg" x1="0" x2="1">
          <stop offset="0%" stop-color="#f7f9ff"></stop>
          <stop offset="100%" stop-color="#eef4ff"></stop>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="260" height="190" rx="28" fill="url(#scene-home-bg)"></rect>
      <rect x="150" y="44" width="70" height="94" rx="16" fill="#ffffff"></rect>
      <rect x="159" y="56" width="52" height="10" rx="5" fill="#7c8cff"></rect>
      <rect x="159" y="74" width="52" height="42" rx="8" fill="#e3f2ff"></rect>
      <rect x="38" y="120" width="112" height="16" rx="8" fill="#af7b56"></rect>
      <rect x="56" y="136" width="12" height="26" rx="6" fill="#af7b56"></rect>
      <rect x="118" y="136" width="12" height="26" rx="6" fill="#af7b56"></rect>
      <circle cx="82" cy="80" r="18" fill="#f3c8aa"></circle>
      <path d="M64 78 C68 50, 95 49, 101 75" fill="#3f2d4f"></path>
      <circle cx="76" cy="82" r="2.7" fill="#243342"></circle>
      <circle cx="87" cy="82" r="2.7" fill="#243342"></circle>
      <path d="M76 90 C80 95, 85 95, 90 90" stroke="#cb6a70" stroke-width="2.5" fill="none" stroke-linecap="round"></path>
      <rect x="66" y="98" width="32" height="34" rx="14" fill="#ff8fb1"></rect>
      <rect x="60" y="128" width="14" height="34" rx="7" fill="#ff8fb1"></rect>
      <rect x="91" y="128" width="14" height="34" rx="7" fill="#ff8fb1"></rect>
      <circle cx="118" cy="82" r="17" fill="#f3c8aa"></circle>
      <path d="M102 80 C106 55, 131 54, 137 77" fill="#70462b"></path>
      <circle cx="112" cy="84" r="2.6" fill="#243342"></circle>
      <circle cx="123" cy="84" r="2.6" fill="#243342"></circle>
      <path d="M111 92 C116 96, 121 96, 126 92" stroke="#cb6a70" stroke-width="2.4" fill="none" stroke-linecap="round"></path>
      <rect x="106" y="100" width="28" height="32" rx="13" fill="#78a8ff"></rect>
      <rect x="102" y="128" width="12" height="30" rx="6" fill="#78a8ff"></rect>
      <rect x="126" y="128" width="12" height="30" rx="6" fill="#78a8ff"></rect>
      <rect x="72" y="108" width="52" height="8" rx="4" fill="#243342"></rect>
      <rect x="98" y="100" width="18" height="12" rx="4" fill="#ffd470"></rect>
    </svg>
  `;
}

function storySceneFamilyTalk() {
  return `
    <svg viewBox="0 0 260 190" aria-hidden="true" class="scene-svg">
      <rect x="0" y="0" width="260" height="190" rx="28" fill="#f7faff"></rect>
      <rect x="20" y="34" width="88" height="120" rx="22" fill="#243342"></rect>
      <rect x="30" y="48" width="68" height="92" rx="14" fill="#ffffff"></rect>
      <circle cx="64" cy="78" r="17" fill="#f3c8aa"></circle>
      <path d="M48 77 C52 52, 78 51, 82 74" fill="#8b5834"></path>
      <circle cx="58" cy="80" r="2.6" fill="#243342"></circle>
      <circle cx="69" cy="80" r="2.6" fill="#243342"></circle>
      <path d="M58 88 C63 92, 67 92, 72 88" stroke="#cb6a70" stroke-width="2.4" fill="none" stroke-linecap="round"></path>
      <rect x="50" y="96" width="29" height="28" rx="12" fill="#ff8fb1"></rect>
      <circle cx="174" cy="74" r="21" fill="#f3c8aa"></circle>
      <path d="M151 71 C157 40, 190 40, 197 69" fill="#334a62"></path>
      <circle cx="167" cy="76" r="2.8" fill="#243342"></circle>
      <circle cx="180" cy="76" r="2.8" fill="#243342"></circle>
      <path d="M166 84 C171 89, 177 89, 183 84" stroke="#cb6a70" stroke-width="2.6" fill="none" stroke-linecap="round"></path>
      <rect x="155" y="95" width="38" height="38" rx="15" fill="#8fd39b"></rect>
      <path d="M117 60 C133 42, 151 42, 166 58" stroke="#7c8cff" stroke-width="5" fill="none" stroke-linecap="round"></path>
      <path d="M116 78 C134 96, 151 96, 167 78" stroke="#7c8cff" stroke-width="5" fill="none" stroke-linecap="round"></path>
      <circle cx="213" cy="46" r="10" fill="#ffd35a"></circle>
      <circle cx="229" cy="60" r="5" fill="#ffd35a"></circle>
    </svg>
  `;
}

function storySceneRiceDinner() {
  return `
    <svg viewBox="0 0 260 190" aria-hidden="true" class="scene-svg">
      <rect x="0" y="0" width="260" height="190" rx="28" fill="#fff7f0"></rect>
      <rect x="34" y="124" width="192" height="14" rx="7" fill="#b37b56"></rect>
      <rect x="54" y="62" width="56" height="56" rx="16" fill="#ffffff" stroke="#e8d7c8"></rect>
      <ellipse cx="82" cy="91" rx="20" ry="11" fill="#f4f0e9"></ellipse>
      <circle cx="71" cy="86" r="2" fill="#e8dac4"></circle>
      <circle cx="84" cy="90" r="2" fill="#e8dac4"></circle>
      <circle cx="93" cy="85" r="2" fill="#e8dac4"></circle>
      <circle cx="171" cy="72" r="18" fill="#f3c8aa"></circle>
      <path d="M154 70 C158 44, 184 43, 188 68" fill="#554060"></path>
      <circle cx="165" cy="74" r="2.7" fill="#243342"></circle>
      <circle cx="176" cy="74" r="2.7" fill="#243342"></circle>
      <path d="M165 82 C170 87, 175 87, 180 82" stroke="#cb6a70" stroke-width="2.4" fill="none" stroke-linecap="round"></path>
      <rect x="158" y="92" width="28" height="31" rx="13" fill="#78a8ff"></rect>
      <circle cx="128" cy="84" r="16" fill="#f3c8aa"></circle>
      <path d="M113 83 C117 58, 140 58, 144 82" fill="#8a5336"></path>
      <circle cx="123" cy="86" r="2.5" fill="#243342"></circle>
      <circle cx="133" cy="86" r="2.5" fill="#243342"></circle>
      <path d="M122 93 C126 97, 131 97, 135 93" stroke="#cb6a70" stroke-width="2.3" fill="none" stroke-linecap="round"></path>
      <rect x="117" y="100" width="24" height="26" rx="11" fill="#ff8fb1"></rect>
      <path d="M98 77 L111 84" stroke="#243342" stroke-width="4" stroke-linecap="round"></path>
      <path d="M183 82 L197 78" stroke="#243342" stroke-width="4" stroke-linecap="round"></path>
    </svg>
  `;
}

function storySceneSchoolDay() {
  return `
    <svg viewBox="0 0 260 190" aria-hidden="true" class="scene-svg">
      <rect x="0" y="0" width="260" height="190" rx="28" fill="#eef5ff"></rect>
      <rect x="28" y="66" width="90" height="78" rx="14" fill="#ffd994"></rect>
      <polygon points="22,68 73,30 124,68" fill="#ff8c69"></polygon>
      <rect x="61" y="95" width="24" height="49" rx="6" fill="#8b5a3c"></rect>
      <circle cx="172" cy="74" r="18" fill="#f3c8aa"></circle>
      <path d="M155 72 C159 45, 186 45, 191 69" fill="#364a63"></path>
      <circle cx="166" cy="76" r="2.7" fill="#243342"></circle>
      <circle cx="177" cy="76" r="2.7" fill="#243342"></circle>
      <path d="M166 84 C171 89, 176 89, 181 84" stroke="#cb6a70" stroke-width="2.4" fill="none" stroke-linecap="round"></path>
      <rect x="158" y="94" width="28" height="31" rx="13" fill="#79a6d2"></rect>
      <rect x="150" y="124" width="12" height="28" rx="6" fill="#79a6d2"></rect>
      <rect x="181" y="124" width="12" height="28" rx="6" fill="#79a6d2"></rect>
      <circle cx="132" cy="92" r="15" fill="#f3c8aa"></circle>
      <path d="M117 91 C121 65, 144 65, 148 88" fill="#8a5336"></path>
      <rect x="121" y="107" width="22" height="24" rx="10" fill="#ff8fb1"></rect>
      <path d="M195 61 C207 53, 220 54, 232 64" stroke="#7c8cff" stroke-width="4" fill="none" stroke-linecap="round"></path>
    </svg>
  `;
}

function storySceneAfterSchool() {
  return `
    <svg viewBox="0 0 260 190" aria-hidden="true" class="scene-svg">
      <rect x="0" y="0" width="260" height="190" rx="28" fill="#f7fbff"></rect>
      <rect x="154" y="54" width="70" height="90" rx="16" fill="#ffffff"></rect>
      <rect x="163" y="66" width="52" height="10" rx="5" fill="#7c8cff"></rect>
      <rect x="52" y="126" width="120" height="12" rx="6" fill="#b37b56"></rect>
      <circle cx="88" cy="80" r="17" fill="#f3c8aa"></circle>
      <path d="M71 78 C75 53, 98 53, 103 76" fill="#4d3456"></path>
      <rect x="74" y="97" width="28" height="30" rx="12" fill="#ff8fb1"></rect>
      <circle cx="126" cy="76" r="17" fill="#f3c8aa"></circle>
      <path d="M110 74 C114 49, 138 49, 143 73" fill="#70462b"></path>
      <rect x="113" y="94" width="27" height="30" rx="12" fill="#79a6d2"></rect>
      <path d="M88 118 C101 112, 114 112, 127 118" stroke="#243342" stroke-width="4" fill="none" stroke-linecap="round"></path>
      <rect x="118" y="98" width="18" height="10" rx="4" fill="#ffd470"></rect>
    </svg>
  `;
}

function storySceneWritingStory() {
  return `
    <svg viewBox="0 0 260 190" aria-hidden="true" class="scene-svg">
      <rect x="0" y="0" width="260" height="190" rx="28" fill="#f8faff"></rect>
      <rect x="44" y="114" width="170" height="14" rx="7" fill="#b37b56"></rect>
      <rect x="62" y="58" width="82" height="50" rx="14" fill="#ffffff" stroke="#dfe6f5"></rect>
      <rect x="73" y="70" width="58" height="6" rx="3" fill="#7c8cff"></rect>
      <rect x="73" y="82" width="50" height="6" rx="3" fill="#b0bbd6"></rect>
      <rect x="73" y="94" width="44" height="6" rx="3" fill="#b0bbd6"></rect>
      <circle cx="178" cy="72" r="18" fill="#f3c8aa"></circle>
      <path d="M161 70 C165 44, 190 45, 196 68" fill="#3b2c4c"></path>
      <rect x="164" y="90" width="28" height="32" rx="13" fill="#ff8fb1"></rect>
      <path d="M145 112 L161 98" stroke="#243342" stroke-width="4" stroke-linecap="round"></path>
      <circle cx="139" cy="108" r="4" fill="#243342"></circle>
      <circle cx="209" cy="48" r="11" fill="#ffd35a"></circle>
    </svg>
  `;
}

function storySceneQuietMorning() {
  return `
    <svg viewBox="0 0 260 190" aria-hidden="true" class="scene-svg">
      <rect x="0" y="0" width="260" height="190" rx="28" fill="#f5f9ff"></rect>
      <circle cx="210" cy="40" r="18" fill="#ffd35a"></circle>
      <rect x="152" y="56" width="64" height="86" rx="16" fill="#ffffff"></rect>
      <rect x="161" y="70" width="46" height="8" rx="4" fill="#7c8cff"></rect>
      <circle cx="92" cy="84" r="18" fill="#f3c8aa"></circle>
      <path d="M75 82 C79 55, 107 55, 111 80" fill="#8a5336"></path>
      <rect x="78" y="102" width="29" height="33" rx="13" fill="#ff8fb1"></rect>
      <circle cx="131" cy="86" r="17" fill="#f3c8aa"></circle>
      <path d="M115 85 C119 60, 142 60, 147 83" fill="#364a63"></path>
      <rect x="118" y="102" width="27" height="31" rx="12" fill="#79a6d2"></rect>
      <path d="M80 137 C98 144, 117 144, 137 137" stroke="#243342" stroke-width="4" fill="none" stroke-linecap="round"></path>
    </svg>
  `;
}

function storySceneReadingWriting() {
  return `
    <svg viewBox="0 0 260 190" aria-hidden="true" class="scene-svg">
      <rect x="0" y="0" width="260" height="190" rx="28" fill="#f8fbff"></rect>
      <rect x="44" y="120" width="174" height="14" rx="7" fill="#b37b56"></rect>
      <rect x="60" y="74" width="56" height="36" rx="12" fill="#ffffff" stroke="#dfe6f5"></rect>
      <rect x="126" y="66" width="70" height="46" rx="14" fill="#ffffff" stroke="#dfe6f5"></rect>
      <rect x="136" y="78" width="50" height="6" rx="3" fill="#7c8cff"></rect>
      <rect x="136" y="90" width="44" height="6" rx="3" fill="#b0bbd6"></rect>
      <circle cx="96" cy="78" r="17" fill="#f3c8aa"></circle>
      <path d="M80 76 C84 50, 108 50, 112 74" fill="#4d3456"></path>
      <rect x="82" y="94" width="27" height="30" rx="12" fill="#ff8fb1"></rect>
      <circle cx="169" cy="82" r="18" fill="#f3c8aa"></circle>
      <path d="M152 80 C156 54, 180 54, 186 77" fill="#70462b"></path>
      <rect x="155" y="99" width="29" height="32" rx="12" fill="#79a6d2"></rect>
      <path d="M116 118 C127 110, 141 110, 153 118" stroke="#243342" stroke-width="4" fill="none" stroke-linecap="round"></path>
    </svg>
  `;
}

function storySceneCookingRice() {
  return `
    <svg viewBox="0 0 260 190" aria-hidden="true" class="scene-svg">
      <rect x="0" y="0" width="260" height="190" rx="28" fill="#fff8f3"></rect>
      <rect x="36" y="126" width="188" height="14" rx="7" fill="#b37b56"></rect>
      <rect x="62" y="74" width="58" height="54" rx="16" fill="#ffffff" stroke="#eadbcb"></rect>
      <ellipse cx="91" cy="102" rx="19" ry="10" fill="#f4f0e9"></ellipse>
      <circle cx="80" cy="97" r="2" fill="#e8dac4"></circle>
      <circle cx="93" cy="102" r="2" fill="#e8dac4"></circle>
      <circle cx="101" cy="97" r="2" fill="#e8dac4"></circle>
      <circle cx="176" cy="78" r="18" fill="#f3c8aa"></circle>
      <path d="M159 76 C163 50, 188 50, 194 74" fill="#364a63"></path>
      <rect x="162" y="96" width="28" height="31" rx="12" fill="#79a6d2"></rect>
      <circle cx="138" cy="92" r="16" fill="#f3c8aa"></circle>
      <path d="M123 91 C127 66, 149 66, 154 88" fill="#8a5336"></path>
      <rect x="126" y="108" width="24" height="26" rx="11" fill="#ff8fb1"></rect>
      <path d="M108 84 L121 92" stroke="#243342" stroke-width="4" stroke-linecap="round"></path>
      <path d="M188 90 L203 86" stroke="#243342" stroke-width="4" stroke-linecap="round"></path>
    </svg>
  `;
}

function renderQuiz() {
  if (!quizList) {
    return;
  }
  currentPracticeQuestions = generatePracticeQuestions();
  const sourceQuestions = currentPracticeQuestions.length ? currentPracticeQuestions : [];

  if (!sourceQuestions.length) {
    quizList.innerHTML = '<article class="quiz-card"><p>Select items from Vocabulary, Grammar, or Pronunciation to generate a quiz.</p></article>';
    return;
  }

  quizList.innerHTML = sourceQuestions.map((question, index) => `
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
  if (!quizList || !quizResult) {
    return;
  }
  let score = 0;
  const review = [];
  const sourceQuestions = currentPracticeQuestions.length ? currentPracticeQuestions : quizQuestions;

  if (!currentPracticeQuestions.length) {
    quizResult.textContent = "Select items first. The quiz is generated from your selections.";
    return;
  }

  sourceQuestions.forEach((question, index) => {
    const card = quizList.children[index];
    const selected = document.querySelector(`input[name="quiz-${index}"]:checked`);

    if (selected && selected.value === question.answer) {
      score += 1;
      card.classList.remove("incorrect");
      card.classList.add("correct");
    } else {
      card.classList.remove("correct");
      card.classList.add("incorrect");
      review.push(`
        <li>
          <strong>${index + 1}. ${question.prompt}</strong><br>
          Your answer: ${selected ? selected.value : "No answer selected."}<br>
          Correct answer: ${question.answer}<br>
          Why: ${question.explanation}
        </li>
      `);
    }
  });

  saveQuizAttempt(score, sourceQuestions.length);
  renderSummary();

  const summary = `<p><strong>Score:</strong> ${score} out of ${sourceQuestions.length}.</p>`;
  const details = review.length
    ? `<p><strong>Review the missed items:</strong></p><ul class="analysis-list">${review.join("")}</ul>`
    : "<p>All answers were correct. Repeat them aloud once more for speaking practice.</p>";

  quizResult.innerHTML = `${summary}${details}`;
  quizResult.classList.remove("muted");
}

function renderEssay(index) {
  if (!essayPrompt || !essayHints || !essayAnswer || !writingFeedback) {
    return;
  }
  const item = essayPrompts[index];
  essayPrompt.textContent = item.prompt;
  essayHints.innerHTML = item.hints.map((hint) => `<li>${hint}</li>`).join("");
  essayAnswer.innerHTML = `
    <p><strong>Model answer:</strong> ${item.sample}</p>
    <p><strong>What this practices:</strong> ${item.explanation}</p>
  `;
  essayAnswer.classList.add("hidden");
  writingFeedback.textContent = "Write your paragraph, then use Check Writing for quick suggestions.";
  writingFeedback.classList.add("muted");
}

function buildWritingFeedback(response, promptData) {
  const text = response.trim().toLowerCase();
  const suggestions = [];

  if (!text) {
    return "Write something first, then run Check Writing.";
  }

  if (!/[.!?]/.test(response)) {
    suggestions.push("Add punctuation so each sentence is clearly separated.");
  }

  if (promptData.hints.some((hint) => hint.includes("me llamo")) && !text.includes("me llamo")) {
    suggestions.push("Add `me llamo` for a clearer self-introduction.");
  }

  if (promptData.hints.some((hint) => hint.includes("vivo en")) && !text.includes("vivo en")) {
    suggestions.push("Include `vivo en ...` to say where you live.");
  }

  if (promptData.prompt.toLowerCase().includes("daily routine") && !/(por la mañana|después|por la noche)/.test(text)) {
    suggestions.push("Add a time phrase such as `por la mañana`, `después`, or `por la noche`.");
  }

  if (promptData.prompt.toLowerCase().includes("yesterday") && !text.includes("ayer")) {
    suggestions.push("Use `ayer` to make the past time clear.");
  }

  if (/soy (cansado|contento|ocupado|tranquilo|nervioso|orgulloso)/.test(text)) {
    suggestions.push("Use `estar` for temporary feelings: `estoy cansado`, `estoy contento`, and so on.");
  }

  if (text.includes("es en ") || text.includes("soy en ")) {
    suggestions.push("For location, use `estar`, not `ser`.");
  }

  if (response.trim().split(/\s+/).length < 8) {
    suggestions.push("Write a little more. Add one more short sentence.");
  }

  if (!suggestions.length) {
    suggestions.push("Good overall structure. Compare your verb forms and word choice with the model answer for refinement.");
  }

  return `<p><strong>Quick Suggestions</strong></p><ul class="analysis-list">${suggestions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

if (vocabSearch) {
  vocabSearch.addEventListener("input", () => {
    const filtered = getFilteredVocabulary();
    renderVocabulary(filtered);
    renderFlashcards(filtered);
    renderPronunciation();
  });
}

if (topicFilters) {
  topicFilters.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-chip");
    if (!button) {
      return;
    }

    activeTopicFilter = button.dataset.topic;
    renderTopicFilters();
    const filtered = getFilteredVocabulary();
    renderVocabulary(filtered);
    renderFlashcards(filtered);
    renderPronunciation();
  });
}

if (vocabList) {
  vocabList.addEventListener("click", (event) => {
    const button = event.target.closest(".audio-icon-button");
    if (!button) {
      return;
    }

    setRecordingTarget(button.dataset.speak);
    speakSpanish(button.dataset.speak);
  });

  vocabList.addEventListener("change", (event) => {
    const checkbox = event.target.closest(".study-checkbox");
    if (!checkbox) {
      return;
    }

    toggleSelection(checkbox.dataset.selectionGroup, checkbox.dataset.selectionKey);
    renderReview();
    renderExercises();
    renderQuiz();
    renderSummary();
  });
}

if (pronunciationList) {
  pronunciationList.addEventListener("click", (event) => {
    const button = event.target.closest(".pronunciation-button");
    if (!button) {
      return;
    }

    setRecordingTarget(button.dataset.speak);
    speakSpanish(button.dataset.speak);
  });

  pronunciationList.addEventListener("change", (event) => {
    const checkbox = event.target.closest(".study-checkbox");
    if (!checkbox) {
      return;
    }

    toggleSelection(checkbox.dataset.selectionGroup, checkbox.dataset.selectionKey);
    renderReview();
    renderExercises();
    renderQuiz();
    renderSummary();
  });
}

if (grammarList) {
  grammarList.addEventListener("change", (event) => {
    const checkbox = event.target.closest(".study-checkbox");
    if (!checkbox) {
      return;
    }

    toggleSelection(checkbox.dataset.selectionGroup, checkbox.dataset.selectionKey);
    renderReview();
    renderExercises();
    renderQuiz();
    renderSummary();
  });
}

if (flashcardList) {
  flashcardList.addEventListener("click", (event) => {
    const card = event.target.closest(".flashcard");
    if (!card) {
      return;
    }

    const front = card.querySelector(".flashcard-front");
    const translation = card.querySelector(".flashcard-back");
    front.classList.toggle("hidden");
    translation.classList.toggle("hidden");
    card.classList.toggle("is-open");
    card.setAttribute("aria-pressed", card.classList.contains("is-open") ? "true" : "false");
  });
}

if (reviewContent) {
  reviewContent.addEventListener("click", (event) => {
    const button = event.target.closest("[data-review-meaning]");
    if (!button) {
      return;
    }
    saveReviewMeaningMode(button.dataset.reviewMeaning);
    renderReview();
  });
}

if (checkQuizButton) {
  checkQuizButton.addEventListener("click", checkQuiz);
}

if (nextEssayButton) {
  nextEssayButton.addEventListener("click", () => {
    currentEssay = (currentEssay + 1) % essayPrompts.length;
    essayResponse.value = "";
    renderEssay(currentEssay);
  });
}

if (nextStoryButton) {
  nextStoryButton.addEventListener("click", () => {
    let nextIndex = currentStory;
    if (stories.length > 1) {
      while (nextIndex === currentStory) {
        nextIndex = Math.floor(Math.random() * stories.length);
      }
    }
    currentStory = nextIndex;
    renderStories(currentStory);
  });
}

if (showEssayAnswerButton) {
  showEssayAnswerButton.addEventListener("click", () => {
    essayAnswer.classList.remove("hidden");
  });
}

if (checkWritingButton) {
  checkWritingButton.addEventListener("click", () => {
    const promptData = essayPrompts[currentEssay];
    writingFeedback.innerHTML = buildWritingFeedback(essayResponse.value, promptData);
    writingFeedback.classList.remove("muted");
  });
}

if (playRecordingTargetButton) {
  playRecordingTargetButton.addEventListener("click", () => {
    speakSpanish(currentRecordingTarget);
  });
}

if (startRecordingButton) {
  startRecordingButton.addEventListener("click", startRecording);
}

if (stopRecordingButton) {
  stopRecordingButton.addEventListener("click", stopRecording);
}

updateSelectionNavigation();
insertLanguageToggle();
applyLanguage();
if ("speechSynthesis" in window) {
  updateSpeechVoices();
  window.speechSynthesis.addEventListener("voiceschanged", updateSpeechVoices);
}
renderTopicFilters();
renderRandomBanner();
renderVocabulary(getFilteredVocabulary());
renderGrammar();
renderVerbTables();
setRecordingTarget(currentRecordingTarget);
renderPronunciation();
renderFlashcards(getFilteredVocabulary());
renderReview();
renderNotes();
renderStories();
renderExercises();
renderQuiz();
renderEssay(currentEssay);
renderSummary();
