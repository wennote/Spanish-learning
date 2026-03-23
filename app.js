const randomBanner = document.getElementById("random-banner");
const vocabList = document.getElementById("vocab-list");
const vocabSearch = document.getElementById("vocab-search");
const topicFilters = document.getElementById("topic-filters");
const grammarList = document.getElementById("grammar-list");
const pronunciationList = document.getElementById("pronunciation-list");
const flashcardList = document.getElementById("flashcard-list");
const notesList = document.getElementById("notes-list");
const storyList = document.getElementById("story-list");
const storyGallery = document.getElementById("story-gallery");
const nextStoryButton = document.getElementById("next-story");
const quizList = document.getElementById("quiz-list");
const checkQuizButton = document.getElementById("check-quiz");
const quizResult = document.getElementById("quiz-result");
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
      "después"
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
      "Por la mañana estudio, trabajo y hago la comida."
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
    examples: ["hablar -> hablo", "comer -> comemos", "vivir -> viven"],
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
    examples: ["Soy de Florida.", "Estoy en casa.", "Hoy estoy contento."],
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
    examples: ["¿Qué haces?", "¿Dónde vas?", "¿Cómo estás?"],
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
    examples: ["Ayer fui a la escuela.", "Ayer trabajé.", "Ayer hice arroz."],
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
    examples: ["porque = because", "pero = but", "después = afterward"],
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
    title: "Useful Sentence Order",
    rule: "A simple beginner pattern is time + subject + verb + extra information.",
    details: [
      "You can start with words like `hoy`, `ayer`, `después`, or `por la mañana` to make the time clear.",
      "Then add the action and one more detail such as place, object, or feeling.",
      "This pattern helps build easy paragraphs: `Hoy estudio español en casa.`"
    ],
    examples: ["Hoy estudio español en casa.", "Ayer cociné arroz después del trabajo.", "Por la noche estoy cansado pero contento."],
    table: {
      headers: ["Part", "Purpose", "Example"],
      rows: [
        ["Time", "sets when", "Hoy / Ayer / Después"],
        ["Verb", "main action", "estudio / cociné / estoy"],
        ["Extra detail", "place, object, feeling", "en casa / arroz / contento"]
      ]
    }
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
  { spanish: "sobre", english: "about", chinese: "关于", pos: "Preposition", day: "Day 5", examples: ["Escribo una historia sobre mi familia.", "Hablo sobre mi trabajo."] }
].map((item) => ({ ...item, topic: inferTopic(item) }));

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
  }
];

let currentStory = 0;
let currentEssay = 0;
let activeTopicFilter = "All";
let currentRecordingTarget = pronunciationSections[0].items[0];
let mediaRecorder;
let recordingChunks = [];
let recordingStream;

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
      <rect x="74" y="74" width="510" height="110" rx="30" fill="rgba(255, 255, 255, 0.52)"></rect>
      <text x="108" y="146" fill="#10203f" font-size="70" font-weight="800" font-family="Avenir Next, Segoe UI, sans-serif" letter-spacing="-2">
        Spanish Learning
      </text>
    </svg>
  `;
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

function getFilteredVocabulary() {
  const term = vocabSearch ? vocabSearch.value.trim().toLowerCase() : "";
  return vocabulary.filter((item) => {
    const matchesTerm = [item.spanish, item.english, item.chinese, item.pos, item.day, item.topic, ...item.examples]
      .some((value) => value.toLowerCase().includes(term));
    const matchesTopic = activeTopicFilter === "All" || item.topic === activeTopicFilter;
    return matchesTerm && matchesTopic;
  }).sort((a, b) => a.spanish.localeCompare(b.spanish, "es", { sensitivity: "base" }));
}

function renderTopicFilters() {
  if (!topicFilters) {
    return;
  }
  topicFilters.innerHTML = filterOptions.map((option) => `
    <button class="filter-chip ${option === activeTopicFilter ? "active" : ""}" type="button" data-topic="${option}">
      ${option}
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
            <th scope="col">Spanish</th>
            <th scope="col">English</th>
            <th scope="col">Chinese</th>
            <th scope="col">Examples</th>
          </tr>
        </thead>
        <tbody>
          ${items.map((item) => `
            <tr>
              <td class="vocab-spanish">
                <span>${item.spanish}</span>
                <button class="audio-icon-button" type="button" data-speak="${item.spanish}" aria-label="Play pronunciation for ${item.spanish}">
                  <span aria-hidden="true">🔊</span>
                </button>
              </td>
              <td>${item.english}</td>
              <td>${item.chinese}</td>
              <td>
                <ul class="table-example-list">
                  ${item.examples.slice(0, 1).map((example) => `
                    <li class="example-row">
                      <span>${example}</span>
                      <button class="audio-icon-button audio-inline-button" type="button" data-speak="${example}" aria-label="Play pronunciation for ${example}">
                        <span aria-hidden="true">🔊</span>
                      </button>
                    </li>
                  `).join("")}
                </ul>
              </td>
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
        <p class="grammar-kicker">Grammar Point</p>
        <h3>${point.title}</h3>
        <p class="grammar-rule">${point.rule}</p>
      </div>
      <div class="grammar-body">
        <div class="grammar-notes">
          <section class="grammar-list-block">
            <p class="grammar-subtitle">Key Notes</p>
            <ul class="note-list">
              ${point.details.map((detail) => `<li>${detail}</li>`).join("")}
            </ul>
          </section>
          <section class="grammar-list-block">
            <p class="grammar-subtitle">Examples</p>
            <ul class="note-list">
              ${point.examples.map((example) => `<li>${example}</li>`).join("")}
            </ul>
          </section>
        </div>
        ${point.table ? `
          <section class="grammar-list-block grammar-table-block">
            <p class="grammar-subtitle">Reference Table</p>
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

function renderFlashcards(items) {
  if (!flashcardList) {
    return;
  }
  flashcardList.innerHTML = items.map((item) => `
    <button class="flashcard" type="button" aria-label="Show English translation for ${item.spanish}" aria-pressed="false">
      <span class="flashcard-label">Spanish</span>
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
      title: "Filtered Words",
      items: filteredWords.length ? filteredWords : [currentRecordingTarget]
    },
    pronunciationSections[1]
  ];

  pronunciationList.innerHTML = sections.map((section) => `
    <article class="pronunciation-card">
      <h3>${section.title}</h3>
      <div class="pronunciation-items">
        ${section.items.map((item) => `
          <button class="pronunciation-button" type="button" data-speak="${item}" aria-label="Play pronunciation for ${item}">
            <span class="pronunciation-text">${item}</span>
            <span class="pronunciation-play">Play</span>
          </button>
        `).join("")}
      </div>
    </article>
  `).join("");
}

function speakSpanish(text) {
  if (!("speechSynthesis" in window)) {
    window.alert("Audio is not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-ES";
  utterance.rate = 0.92;
  window.speechSynthesis.speak(utterance);
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
      <div class="story-focus">
        ${story.focus.map((item) => `<span class="focus-chip">${item}</span>`).join("")}
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
  if (!quizList || !quizResult) {
    return;
  }
  let score = 0;
  const review = [];

  quizQuestions.forEach((question, index) => {
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

  const summary = `<p><strong>Score:</strong> ${score} out of ${quizQuestions.length}.</p>`;
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

renderTopicFilters();
renderRandomBanner();
renderVocabulary(getFilteredVocabulary());
renderGrammar();
setRecordingTarget(currentRecordingTarget);
renderPronunciation();
renderFlashcards(getFilteredVocabulary());
renderNotes();
renderStories();
renderQuiz();
renderEssay(currentEssay);
