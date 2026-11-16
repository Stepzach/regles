import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";
import { collection, doc, getDoc, getFirestore, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDZY2xeIsMyQjbQjds4A1d8ke2a6OU6qsk",
  authDomain: "regles-a5a75.firebaseapp.com",
  projectId: "regles-a5a75",
  storageBucket: "regles-a5a75.firebasestorage.app",
  messagingSenderId: "97241333829",
  appId: "1:97241333829:web:5551a7cb293a326a8f632c",
  measurementId: "G-VT4XEBKPCR"
};

const firebaseApp = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const PHASE_ORDER = ["menstrual", "follicular", "ovulatory", "luteal"];

const PHASES = {
  menstrual: {
    name: "Menstrual",
    when: "Period days",
    summary: "Keep it kind. Do the version of the day you have capacity for.",
    palette: { wash: "#f8edf1", deep: "#ead2da", ink: "#5e3542" },
    food: {
      focus: "Regular meals, fluids and iron-containing foods can help you feel supported while you are bleeding.",
      nutrients: [
        "Iron: lentils, beans, tofu, eggs, seafood, meat or fortified cereal",
        "Vitamin C alongside plant iron: peppers, citrus, berries or tomatoes",
        "Protein and slow-release carbohydrates for satisfying meals"
      ],
      meals: [
        {
          title: "Lemony lentil soup",
          image: "https://boons-marketplace-restaurant-web-images.s3.us-east-2.amazonaws.com/uploads/menu/6a38d00fa2cbf.jpg",
          tags: "warm · iron + vitamin C",
          ingredients: "Red lentils, tinned tomatoes, spinach, onion, lemon, olive oil and bread.",
          method: "Soften the onion, add lentils and tomatoes with water or stock, simmer until soft, then fold in spinach and lemon."
        },
        {
          title: "Salmon or tofu rice bowl",
          image: "https://cdn.thefork.com/tf-lab/image/upload/w_3840%2Cc_fill%2Cq_auto%2Cf_auto/restaurant/7e7ed418-b921-4c84-8f8b-7d628197b31b/772fc37c-7f54-43fa-bd6e-0b433405144a.jpg",
          tags: "balanced · easy",
          ingredients: "Salmon or tofu, rice, broccoli, avocado, cucumber and lemon or lime.",
          method: "Cook the rice and protein, steam the broccoli, then build the bowl with avocado and citrus."
        },
        {
          title: "Porridge with berries and seeds",
          image: "https://www.santamariaworld.com/optimized/recipe-large/globalassets/estonia/erik-orgu-soovitab/rsz_kohev-kaerahelbepuder-munaga.jpg",
          tags: "warm · quick",
          ingredients: "Oats, milk or fortified plant milk, yoghurt, berries and pumpkin seeds.",
          method: "Cook the oats with milk, then add yoghurt, berries and seeds."
        }
      ]
    },
    sleep: {
      title: "Protect your usual rhythm",
      copy: "Aim for your normal 7–9 hours where possible. If pain or fatigue is higher, make the evening less ambitious and keep a simple wind-down."
    },
    movement: {
      low: "Rest, a short walk, gentle stretches, yoga or a warm shower all count.",
      steady: "Easy cycling, swimming, a walk with a podcast, or a lighter strength session.",
      plenty: "Continue your usual training if it feels good. You do not need to hold back just because you are on your period."
    },
    plan: [
      "Put one recovery window in the day.",
      "Keep a snack, water, layer and period products nearby.",
      "Move a non-urgent task if your body is asking for less."
    ]
  },
  follicular: {
    name: "Follicular",
    when: "After your period, before ovulation",
    summary: "A fresh-start phase — if that matches how you feel.",
    palette: { wash: "#eff4e9", deep: "#dbe8cd", ink: "#3f5537" },
    food: {
      focus: "Build steady energy with protein, fibre, colour and meals you actually enjoy.",
      nutrients: [
        "Protein: eggs, yoghurt, tofu, chicken, fish or beans",
        "Fibre: oats, wholegrains, lentils, vegetables and fruit",
        "Healthy fats: olive oil, nuts, seeds or avocado"
      ],
      meals: [
        {
          title: "Overnight oats with apple",
          image: "https://cdn-next.cybassets.com/s/files/5770/ckeditor/pictures/content_6971e5ed-e8f6-4ff9-90d7-c2f2bfea193a.png",
          tags: "make ahead · vegetarian",
          ingredients: "Oats, yoghurt or fortified soy yoghurt, milk, grated apple, cinnamon and walnuts.",
          method: "Mix everything except the walnuts in a jar the night before. Add walnuts just before eating."
        },
        {
          title: "Crisp chickpea quinoa salad",
          image: "https://images.themodernproper.com/production/posts/QuinoaSalad_10.jpg?dm=1739652539&fit=crop&fm=jpg&h=960&q=82&s=df6176bb2d1ee73bdc822c87327e9db&w=960",
          tags: "fresh · vegetarian",
          ingredients: "Quinoa, chickpeas, cucumber, tomatoes, herbs, feta or tofu, lemon and olive oil.",
          method: "Cook the quinoa, then toss everything together with lemon and olive oil."
        },
        {
          title: "Ginger tofu or chicken stir-fry",
          image: "https://platefullyjoy.com/assets/images/1766435561144-cxc8evj8.webp",
          tags: "quick · high protein",
          ingredients: "Tofu or chicken, noodles or rice, broccoli, peppers, ginger, soy sauce and sesame seeds.",
          method: "Stir-fry the protein and vegetables, then add cooked noodles or rice and sauce."
        }
      ]
    },
    sleep: {
      title: "Do not borrow from sleep",
      copy: "Feeling brighter is useful, but it does not need to become a late night. Keep the same wake-up anchor and bedtime routine."
    },
    movement: {
      low: "Choose the easiest useful version: a walk, mobility, or ten minutes outside.",
      steady: "A good time to return to your usual strength, run, class or sport routine.",
      plenty: "Try something new, add a progressive session, or use the momentum for movement you enjoy."
    },
    plan: [
      "Use the energy for admin, planning or starting a task you have avoided.",
      "Book social time only if it feels nourishing.",
      "Set up one easy meal or habit for the week ahead."
    ]
  },
  ovulatory: {
    name: "Ovulatory",
    when: "Around ovulation",
    summary: "Check in before saying yes to everything.",
    palette: { wash: "#fbf3df", deep: "#f1dfac", ink: "#725c24" },
    food: {
      focus: "Keep meals balanced and hydration easy, especially on busy or social days.",
      nutrients: [
        "Protein and fibre to keep meals satisfying",
        "Fruit and vegetables for variety",
        "Fluids throughout the day"
      ],
      meals: [
        {
          title: "Herby couscous bowl",
          image: "https://eatpace.com/_next/image?q=75&url=https%3A%2F%2Fspykbkfbbhrhgdhgboap.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Frecipe-images%2Fharissa-chickpeas-couscous-1775640718832.jpg&w=1920",
          tags: "fast · fresh",
          ingredients: "Couscous, chickpeas or eggs, cucumber, tomatoes, herbs, lemon, olive oil, feta or tahini.",
          method: "Cover the couscous with hot water, fluff it, then toss with the remaining ingredients."
        },
        {
          title: "Pesto pea pasta",
          image: "https://recipesbyleticia.com/assets/images/1771196764009-qmnx00k4.webp",
          tags: "comforting · 15 minutes",
          ingredients: "Pasta, peas, pesto, spinach, parmesan or nutritional yeast and lemon.",
          method: "Cook the pasta and peas together, then stir through pesto, spinach and lemon."
        },
        {
          title: "Yoghurt, fruit and granola bowl",
          image: "https://d1w7312wesee68.cloudfront.net/lUIz3vEIxSUW2MUD123-R9eJhqu9SGFtWdGz3Y_m2J8/resize%3Afit%3A720%3A720/plain/s3%3A/toasttab/menu_service/restaurants/b440411e-7d09-468f-a0d1-4ff094487050/MenuItem/2b0b101b-ab6f-4269-862d-6c0da86b4945.jpg",
          tags: "no-cook · quick",
          ingredients: "Greek or soy yoghurt, fruit, oats or granola, and nuts or seeds.",
          method: "Build it in a bowl. Take it with you if the day is full."
        }
      ]
    },
    sleep: {
      title: "Leave room to come down",
      copy: "Keep a predictable 7–9 hour sleep opportunity. If the day is social or busy, protect a quieter final hour."
    },
    movement: {
      low: "A walk, mobility or a gentle class is enough.",
      steady: "Do the activity you naturally enjoy: a run, gym session, team sport or class.",
      plenty: "If you feel ready, this can be a good day for a challenging session — warm up well and listen to your body."
    },
    plan: [
      "Use your capacity for a meeting, collaboration or presentation if it suits you.",
      "Avoid filling every spare minute.",
      "Make one decision now that gives future-you more space."
    ]
  },
  luteal: {
    name: "Luteal",
    when: "After ovulation, before your period",
    summary: "Lower the volume. Build a steadier, more forgiving week.",
    palette: { wash: "#f2eff7", deep: "#ddd5eb", ink: "#514463" },
    food: {
      focus: "Regular, satisfying meals can be especially useful if cravings, appetite or mood feel changeable.",
      nutrients: [
        "Complex carbohydrates: oats, brown rice, wholegrain pasta, potatoes, beans and lentils",
        "Calcium-rich foods: yoghurt, milk, fortified plant milk, tofu or leafy greens",
        "Protein and fibre to make snacks more satisfying"
      ],
      meals: [
        {
          title: "Sweet potato and black bean chilli",
          image: "https://justcookeasy.com/uploads/recepten/recept_1778918459.webp",
          tags: "warm · vegetarian · batch-friendly",
          ingredients: "Sweet potato, black beans, tomatoes, onion, peppers, cumin, rice or tortilla chips.",
          method: "Cook the onion and peppers, add cubed sweet potato, beans, tomatoes and spices, then simmer until soft."
        },
        {
          title: "Peanut noodle bowl",
          image: "https://eatiku.com.au/cdn/shop/files/PeanutSatayNoodleswithSpicedTofu.jpg?v=1758145720",
          tags: "comforting · quick",
          ingredients: "Noodles, tofu or chicken, broccoli, carrot, peanut butter, soy sauce and lime.",
          method: "Cook noodles and vegetables. Mix peanut butter, soy and lime with warm water, then toss together."
        },
        {
          title: "Baked potato with beans and greens",
          image: "https://recipecontent.fooby.ch/19061_3-2_1920-1280.jpg",
          tags: "simple · budget-friendly",
          ingredients: "Potato, baked beans, spinach or kale, cheese, yoghurt or tahini.",
          method: "Bake or microwave the potato, warm the beans, wilt the greens and finish with your topping."
        }
      ]
    },
    sleep: {
      title: "Make sleep the easy option",
      copy: "Keep regular sleep and wake times, dim the last part of the evening, and try not to let a full schedule squeeze out your wind-down."
    },
    movement: {
      low: "Rest, stretching, yoga or a short walk are valid plans.",
      steady: "Choose moderate movement: a walk, easy run, strength with extra rest, swimming or cycling.",
      plenty: "Continue your normal session if it feels right; reduce intensity or volume if symptoms say otherwise."
    },
    plan: [
      "Choose focused, lower-friction work where possible.",
      "Build buffers around deadlines and late nights.",
      "Prepare easy food and a calmer evening before you need it."
    ]
  }
};

const SEASONS = {
  winter: {
    title: "Winter, made easier.",
    line: "Go warm, simple and low-effort.",
    swaps: [
      "Choose soup, chilli, porridge, tray bakes and warm grain bowls.",
      "Keep a hot drink or flask nearby if that makes the day feel easier.",
      "Get daylight early when you can, even for a short walk."
    ]
  },
  spring: {
    title: "Spring, with some grounding.",
    line: "Keep meals fresh, but still satisfying.",
    swaps: [
      "Add herbs, citrus, peas, greens and crunchy vegetables.",
      "Use a walk or a change of scenery as a soft reset.",
      "Let plans open up gradually rather than filling every free hour."
    ]
  },
  summer: {
    title: "Summer, without the rush.",
    line: "Make hydration and easy food visible.",
    swaps: [
      "Use cold grain bowls, overnight oats, yoghurt bowls and fruit.",
      "Carry water, and choose shade or cooler exercise times if heat drains you.",
      "Keep one calm evening clear when the week becomes more social."
    ]
  },
  autumn: {
    title: "Autumn, with more structure.",
    line: "Lean into comforting routines.",
    swaps: [
      "Use roasted vegetables, soups, baked potatoes, oats and stews.",
      "Plan earlier evenings if darker days make your energy dip.",
      "Set out an easy breakfast or lunch before a busy morning."
    ]
  }
};

const RESET_STEPS = [
  "Put both feet on the floor.",
  "Take four slow breaths.",
  "Choose only the next ten minutes.",
  "Ask: food, water, movement, rest or a smaller plan?"
];

const state = {
  user: null,
  profileName: "",
  settings: null,
  checkin: { energy: "steady", symptoms: [], priority: "lighter-plan" },
  checkins: [],
  checkinsReady: false,
  checkinTouched: false,
  planHydrated: false,
  unsubscribeCheckins: null,
  pendingSetup: null,
  creatingProfile: false
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function parseDate(value) {
  const [year, month, day] = String(value).split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

function toISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function today() {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
}

function addDays(date, amount) {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}

function daysBetween(start, end) {
  const startAtNoon = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 12);
  const endAtNoon = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 12);
  return Math.round((endAtNoon - startAtNoon) / 86400000);
}

function formatDate(date, options = { day: "numeric", month: "short" }) {
  return new Intl.DateTimeFormat(undefined, options).format(date);
}

function getDefaultSettings() {
  return {
    lastPeriod: toISO(addDays(today(), -4)),
    cycleLength: 28,
    periodLength: 5,
    wakeTime: "07:30"
  };
}

function getCycle(settings = state.settings, date = today()) {
  const cycleLength = Math.max(21, Math.min(45, Number(settings.cycleLength) || 28));
  const periodLength = Math.max(2, Math.min(10, Number(settings.periodLength) || 5));
  const lastPeriod = parseDate(settings.lastPeriod);
  const elapsed = Math.max(0, daysBetween(lastPeriod, date));
  const cycleDay = (elapsed % cycleLength) + 1;
  const cycleNumber = Math.floor(elapsed / cycleLength);
  const estimatedOvulationDay = Math.max(periodLength + 2, cycleLength - 14);
  const ovulationStart = Math.max(periodLength + 1, estimatedOvulationDay - 1);
  const ovulationEnd = Math.min(cycleLength - 1, estimatedOvulationDay + 1);
  let phaseId = "luteal";

  if (cycleDay <= periodLength) phaseId = "menstrual";
  else if (cycleDay < ovulationStart) phaseId = "follicular";
  else if (cycleDay <= ovulationEnd) phaseId = "ovulatory";

  return {
    cycleLength,
    periodLength,
    lastPeriod,
    elapsed,
    cycleDay,
    phaseId,
    ovulationStart,
    ovulationEnd,
    nextPeriod: addDays(lastPeriod, (cycleNumber + 1) * cycleLength)
  };
}

function getSeason(date = today()) {
  const month = date.getMonth();
  return [11, 0, 1].includes(month)
    ? "winter"
    : [2, 3, 4].includes(month)
      ? "spring"
      : [5, 6, 7].includes(month)
        ? "summer"
        : "autumn";
}

function formatTime(time) {
  const [hour, minute] = time.split(":").map(Number);
  const sample = new Date(2020, 0, 1, hour, minute);
  return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(sample);
}

function sleepWindow(wakeTime) {
  const [hour, minute] = wakeTime.split(":").map(Number);
  const wake = new Date(2020, 0, 2, hour, minute);
  const bedtime = new Date(wake.getTime() - 8.5 * 60 * 60 * 1000);
  const windDown = new Date(bedtime.getTime() - 60 * 60 * 1000);
  return { bedtime: formatTime(`${String(bedtime.getHours()).padStart(2, "0")}:${String(bedtime.getMinutes()).padStart(2, "0")}`), windDown: formatTime(`${String(windDown.getHours()).padStart(2, "0")}:${String(windDown.getMinutes()).padStart(2, "0")}`) };
}

function setText(selector, value) {
  const element = $(selector);
  if (element) element.textContent = value;
}

function listInto(selector, values) {
  const list = $(selector);
  list.replaceChildren(...values.map((value) => {
    const item = document.createElement("li");
    item.textContent = value;
    return item;
  }));
}

function setPalette(phase) {
  document.documentElement.style.setProperty("--wash", phase.palette.wash);
  document.documentElement.style.setProperty("--wash-deep", phase.palette.deep);
  document.documentElement.style.setProperty("--accent-ink", phase.palette.ink);
}

function updateChoiceButtons() {
  $$("#energyChoices button").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.energy === state.checkin.energy);
  });
  $$("#priorityChoices button").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.priority === state.checkin.priority);
  });
  $$("#symptomChoices button").forEach((button) => {
    button.classList.toggle("is-selected", state.checkin.symptoms.includes(button.dataset.symptom));
  });
}

function foodAdjustment() {
  const symptoms = state.checkin.symptoms;
  if (symptoms.includes("bleeding")) return "If you are bleeding, pair plant-based iron with vitamin C where you can.";
  if (symptoms.includes("headache")) return "Keep water and a simple meal within reach; avoid letting a busy day become an empty one.";
  if (symptoms.includes("bloating")) return "Keep it simple: regular food, water, and a slower meal if that feels better.";
  return "Choose the version that feels realistic for your actual day.";
}

function planningAdjustment(phase) {
  if (state.checkin.energy === "low") return "Make today smaller. Choose one necessary thing, one easy thing, and one thing that helps tomorrow.";
  const choices = {
    food: "Give food a place in the plan before the day gets busy.",
    movement: "Choose movement that leaves you feeling more settled, not spent.",
    "lighter-plan": phase.summary,
    sleep: "Protect the last part of your evening before the day fills up.",
    reset: "Pause before adding more. The next useful thing is enough."
  };
  return choices[state.checkin.priority] || phase.summary;
}

function renderRecipes(container, meals) {
  const target = typeof container === "string" ? $(container) : container;
  const template = $("#recipeTemplate");
  target.replaceChildren();

  meals.forEach((meal) => {
    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector(".recipe-card");
    const button = fragment.querySelector(".recipe-summary");
    const detail = fragment.querySelector(".recipe-detail");
    fragment.querySelector(".recipe-name").textContent = meal.title;
    const recipeImage = fragment.querySelector(".recipe-image");
    recipeImage.src = meal.image || "";
    recipeImage.alt = meal.image ? `${meal.title} — recipe photograph` : "";
    fragment.querySelector(".recipe-tags").textContent = meal.tags;
    fragment.querySelector(".recipe-ingredients").textContent = meal.ingredients;
    fragment.querySelector(".recipe-method").textContent = meal.method;
    button.addEventListener("click", () => {
      const isOpen = card.classList.toggle("is-open");
      detail.hidden = !isOpen;
      button.setAttribute("aria-expanded", String(isOpen));
    });
    target.append(fragment);
  });
}

function renderToday() {
  const cycle = getCycle();
  const phase = PHASES[cycle.phaseId];
  const season = SEASONS[getSeason()];
  const sleep = sleepWindow(state.settings.wakeTime);
  setPalette(phase);

  setText("#todayDate", formatDate(today(), { weekday: "long", day: "numeric", month: "long" }));
  setText("#greeting", getGreeting());
  setText("#cycleDay", `Day ${cycle.cycleDay} of your cycle`);
  setText("#phaseTitle", `${phase.name} phase.`);
  setText("#phaseSummary", phase.summary);
  setText("#phaseWhen", phase.when);
  setText("#nextPeriod", `Next period estimate: ${formatDate(cycle.nextPeriod)}`);
  setText("#foodFocus", phase.food.focus);
  listInto("#foodNutrients", [...phase.food.nutrients, foodAdjustment()]);
  setText("#movementAdvice", phase.movement[state.checkin.energy]);
  setText("#movementNote", "Use phase guidance as a cue, not a limit. Symptoms and preference come first.");
  setText("#planAdvice", planningAdjustment(phase));
  listInto("#phasePlan", phase.plan);
  setText("#sleepTitle", phase.sleep.title);
  setText("#sleepAdvice", phase.sleep.copy);
  setText("#sleepTiming", `If you wake at ${formatTime(state.settings.wakeTime)}, try winding down around ${sleep.windDown} and leaving room for sleep around ${sleep.bedtime}.`);
  setText("#seasonalMealLine", season.line);
  renderRecipes("#todayRecipes", phase.food.meals);
  updateChoiceButtons();
}

function getPhaseLengths(cycle) {
  return {
    menstrual: cycle.periodLength,
    follicular: Math.max(0, cycle.ovulationStart - cycle.periodLength - 1),
    ovulatory: Math.max(0, cycle.ovulationEnd - cycle.ovulationStart + 1),
    luteal: Math.max(0, cycle.cycleLength - cycle.ovulationEnd)
  };
}

function renderCycle() {
  const cycle = getCycle();
  const phase = PHASES[cycle.phaseId];
  const lengths = getPhaseLengths(cycle);
  const track = $("#cycleTrack");
  const labels = $("#cycleLabels");
  track.replaceChildren();
  labels.replaceChildren();

  PHASE_ORDER.forEach((id) => {
    const segment = document.createElement("span");
    segment.className = `cycle-segment ${id}`;
    segment.style.flexBasis = `${(lengths[id] / cycle.cycleLength) * 100}%`;
    segment.title = PHASES[id].name;
    track.append(segment);

    const label = document.createElement("div");
    label.className = "cycle-label";
    label.style.flexBasis = `${(lengths[id] / cycle.cycleLength) * 100}%`;
    label.innerHTML = `<strong>${PHASES[id].name}</strong><span>${Math.max(0, lengths[id])} days</span>`;
    labels.append(label);
  });

  $("#cycleNow").style.left = `${((cycle.cycleDay - 0.5) / cycle.cycleLength) * 100}%`;
  setText("#mapCycleDay", `${cycle.cycleDay} of ${cycle.cycleLength}`);
  setText("#mapCycleCopy", `You are in your estimated ${phase.name.toLowerCase()} phase. Log a new period when it starts to keep this estimate current.`);

}

function renderLog() {
  const todaysLog = state.checkins.find((entry) => entry.id === toISO(today()));
  if (todaysLog && !state.planHydrated) {
    state.checkin = {
      energy: todaysLog.energy || "steady",
      symptoms: todaysLog.symptoms || [],
      priority: todaysLog.priority || "lighter-plan"
    };
    const values = {
      necessaryTask: todaysLog.necessary || "",
      easyTask: todaysLog.easy || "",
      careTask: todaysLog.care || ""
    };
    Object.entries(values).forEach(([id, value]) => {
      const input = $(`#${id}`);
      if (input) input.value = value;
    });
    const details = $("#miniPlanDetails");
    if (details) details.open = Boolean(values.necessaryTask || values.easyTask || values.careTask);
    state.planHydrated = true;
  }
  updateChoiceButtons();
  renderHistory();
}

function renderHistory() {
  const items = state.checkins;
  const target = $("#historyList");
  target.replaceChildren();
  if (!items.length) {
    const message = document.createElement("p");
    message.className = "history-empty";
    message.textContent = "Your saved check-ins will appear here.";
    target.append(message);
    return;
  }

  const priorityLabels = {
    food: "Food",
    movement: "Movement",
    "lighter-plan": "A lighter plan",
    sleep: "Sleep",
    reset: "A reset"
  };

  const titleCase = (value) => value ? value.charAt(0).toUpperCase() + value.slice(1) : "—";
  const addAnswer = (list, labelText, value) => {
    const label = document.createElement("dt");
    label.textContent = labelText;
    const answer = document.createElement("dd");
    answer.textContent = value;
    list.append(label, answer);
  };

  items.forEach((entry) => {
    const date = entry.id;
    const item = document.createElement("article");
    item.className = "history-log";
    const heading = document.createElement("h3");
    heading.textContent = formatDate(parseDate(date), { weekday: "short", day: "numeric", month: "short" });
    const answers = document.createElement("dl");
    answers.className = "history-answers";
    addAnswer(answers, "Energy", entry.energy === "low" ? "Running low" : entry.energy === "plenty" ? "Plenty" : "Steady");
    addAnswer(answers, "Present", entry.symptoms?.length ? entry.symptoms.map(titleCase).join(", ") : "Nothing logged");
    addAnswer(answers, "Helpful focus", priorityLabels[entry.priority] || "—");

    if (entry.necessary) addAnswer(answers, "Necessary", entry.necessary);
    if (entry.easy) addAnswer(answers, "Easy win", entry.easy);
    if (entry.care) addAnswer(answers, "For you", entry.care);

    item.append(heading, answers);
    target.append(item);
  });
}

function renderAll() {
  renderToday();
  renderCycle();
  renderLog();
}

function selectTab(tabName) {
  $$(".tab-button").forEach((button) => {
    const isActive = button.dataset.tab === tabName;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  $$(".tab-panel").forEach((panel) => {
    const isActive = panel.id === tabName;
    panel.hidden = !isActive;
    panel.classList.toggle("is-visible", isActive);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Firebase-backed application shell -------------------------------------------------

function getGreeting() {
  const hour = new Date().getHours();
  const time = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";
  return `Good ${time}, ${state.profileName || "there"}!`;
}

function normaliseSettings(data = {}) {
  const fallback = getDefaultSettings();
  return {
    lastPeriod: data.lastPeriod || fallback.lastPeriod,
    cycleLength: Math.max(21, Math.min(45, Number(data.cycleLength) || fallback.cycleLength)),
    periodLength: Math.max(2, Math.min(10, Number(data.periodLength) || fallback.periodLength)),
    wakeTime: /^([01]\d|2[0-3]):[0-5]\d$/.test(data.wakeTime || "") ? data.wakeTime : fallback.wakeTime
  };
}

function getUserRef() {
  return doc(db, "users", state.user.uid);
}

function setAuthStatus(message = "") {
  setText("#authStatus", message);
}

function showAuth(message = "") {
  $("#bootScreen").hidden = true;
  $("#appShell").hidden = true;
  $("#authScreen").hidden = false;
  if (message) setAuthStatus(message);
}

function showApp() {
  $("#bootScreen").hidden = true;
  $("#authScreen").hidden = true;
  $("#appShell").hidden = false;
  setText("#profileInitial", (state.profileName || "?").trim().charAt(0).toUpperCase() || "?");
}

function populateOnboarding(setup = {}) {
  const defaults = normaliseSettings(setup);
  $("#onboardingName").value = setup.name || state.user?.displayName || "";
  $("#onboardingLastPeriod").value = defaults.lastPeriod;
  $("#onboardingLastPeriod").max = toISO(today());
  $("#onboardingCycleLength").value = defaults.cycleLength;
  $("#onboardingPeriodLength").value = defaults.periodLength;
  $("#onboardingWakeTime").value = defaults.wakeTime;
}

function readOnboarding() {
  const setup = {
    name: $("#onboardingName").value.trim(),
    lastPeriod: $("#onboardingLastPeriod").value,
    cycleLength: Number($("#onboardingCycleLength").value),
    periodLength: Number($("#onboardingPeriodLength").value),
    wakeTime: $("#onboardingWakeTime").value
  };
  if (!setup.name || !setup.lastPeriod || parseDate(setup.lastPeriod) > today() ||
      setup.cycleLength < 21 || setup.cycleLength > 45 ||
      setup.periodLength < 2 || setup.periodLength > 10 ||
      setup.periodLength > setup.cycleLength ||
      !/^([01]\d|2[0-3]):[0-5]\d$/.test(setup.wakeTime)) {
    return null;
  }
  return setup;
}

function friendlyFirebaseError(error) {
  if (error?.code === "auth/popup-closed-by-user") return "Google sign-in was closed before it finished.";
  if (error?.code === "auth/popup-blocked") return "Your browser blocked the sign-in window. Please allow pop-ups and try again.";
  if (error?.code === "auth/unauthorized-domain") return "This site has not been authorised for Google sign-in yet. Please try again in a moment.";
  if (error?.code === "permission-denied") return "Your private space is not available yet. Please try again in a moment.";
  return "Something did not connect. Please try again.";
}

function setGoogleBusy(isBusy) {
  const button = $("#googleSignIn");
  button.disabled = isBusy;
  button.setAttribute("aria-busy", String(isBusy));
}

async function createProfile(user, setup) {
  state.user = user;
  state.settings = normaliseSettings(setup);
  state.profileName = setup.name;
  await setDoc(getUserRef(), {
    displayName: setup.name,
    lastPeriod: state.settings.lastPeriod,
    cycleLength: state.settings.cycleLength,
    periodLength: state.settings.periodLength,
    wakeTime: state.settings.wakeTime,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  await updateProfile(user, { displayName: setup.name });
  state.checkins = [];
  state.checkinsReady = false;
  state.checkinTouched = false;
  state.planHydrated = false;
  showApp();
  renderAll();
  subscribeToCheckins();
}

async function loadProfile(user) {
  const profileSnapshot = await getDoc(doc(db, "users", user.uid));
  if (!profileSnapshot.exists()) return false;
  const profile = profileSnapshot.data();
  state.user = user;
  state.settings = normaliseSettings(profile);
  state.profileName = profile.displayName || user.displayName || "there";
  state.checkins = [];
  state.checkinsReady = false;
  state.checkinTouched = false;
  state.planHydrated = false;
  showApp();
  renderAll();
  subscribeToCheckins();
  return true;
}

function subscribeToCheckins() {
  state.unsubscribeCheckins?.();
  const recentLogs = query(
    collection(db, "users", state.user.uid, "checkins"),
    orderBy("savedAt", "desc"),
    limit(8)
  );
  state.unsubscribeCheckins = onSnapshot(recentLogs, (snapshot) => {
    state.checkins = snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() }));
    if (!state.checkinsReady) {
      const todayEntry = state.checkins.find((entry) => entry.id === toISO(today()));
      if (todayEntry && !state.checkinTouched) {
        state.checkin = {
          energy: todayEntry.energy || "steady",
          symptoms: todayEntry.symptoms || [],
          priority: todayEntry.priority || "lighter-plan"
        };
      }
      state.checkinsReady = true;
    }
    renderAll();
  }, (error) => {
    setText("#checkInStatus", friendlyFirebaseError(error));
  });
}

async function handleAuthState(user) {
  state.unsubscribeCheckins?.();
  state.unsubscribeCheckins = null;
  state.user = user;
  if (!user) {
    state.settings = null;
    state.profileName = "";
    state.checkins = [];
    state.checkinsReady = false;
    state.planHydrated = false;
    populateOnboarding(state.pendingSetup || {});
    showAuth();
    return;
  }

  if (state.creatingProfile) return;

  try {
    const loaded = await loadProfile(user);
    if (!loaded) {
      populateOnboarding(state.pendingSetup || { name: user.displayName || "" });
      showAuth("One last thing — save the details that make your estimate useful.");
    }
  } catch (error) {
    populateOnboarding(state.pendingSetup || { name: user.displayName || "" });
    showAuth(friendlyFirebaseError(error));
  }
}

async function saveSettingsToCloud() {
  await updateDoc(getUserRef(), {
    lastPeriod: state.settings.lastPeriod,
    cycleLength: state.settings.cycleLength,
    periodLength: state.settings.periodLength,
    wakeTime: state.settings.wakeTime,
    updatedAt: serverTimestamp()
  });
}

function setCycleDialogValues() {
  $("#lastPeriod").value = state.settings.lastPeriod;
  $("#lastPeriod").max = toISO(today());
  $("#cycleLength").value = state.settings.cycleLength;
  $("#periodLength").value = state.settings.periodLength;
  $("#wakeTime").value = state.settings.wakeTime;
}

async function logCurrentPeriod() {
  const dateValue = toISO(today());
  const selectedDate = parseDate(dateValue);
  const priorDate = parseDate(state.settings.lastPeriod);
  const daysSincePrior = daysBetween(priorDate, selectedDate);
  let cycleLength = state.settings.cycleLength;
  let note = "Period logged as day 1.";

  if (daysSincePrior >= 15 && daysSincePrior <= 60) {
    cycleLength = daysSincePrior;
    note = `Period logged as day 1. Your last cycle was ${daysSincePrior} days, so the next estimate now uses ${daysSincePrior}.`;
  }

  state.settings = { ...state.settings, lastPeriod: dateValue, cycleLength };
  await saveSettingsToCloud();
  $("#settingsDialog").close();
  setText("#checkInStatus", note);
  renderAll();
}

async function saveCheckinToCloud() {
  const status = $("#checkInStatus");
  const id = toISO(today());
  const checkinRef = doc(db, "users", state.user.uid, "checkins", id);
  const payload = {
    energy: state.checkin.energy,
    symptoms: state.checkin.symptoms,
    priority: state.checkin.priority,
    phase: getCycle().phaseId,
    necessary: $("#necessaryTask")?.value.trim() || "",
    easy: $("#easyTask")?.value.trim() || "",
    care: $("#careTask")?.value.trim() || ""
  };
  status.textContent = "Saving…";
  try {
    const existing = await getDoc(checkinRef);
    if (existing.exists()) {
      await updateDoc(checkinRef, { ...payload, savedAt: serverTimestamp() });
    } else {
      await setDoc(checkinRef, { ...payload, createdAt: serverTimestamp(), savedAt: serverTimestamp() });
    }
    state.planHydrated = true;
    status.textContent = "Saved to your private log.";
  } catch (error) {
    status.textContent = friendlyFirebaseError(error);
  }
}

async function saveProfileName() {
  const name = $("#profileName").value.trim();
  if (!name) return;
  try {
    await updateDoc(getUserRef(), { displayName: name, updatedAt: serverTimestamp() });
    await updateProfile(state.user, { displayName: name });
    state.profileName = name;
    $("#profileDialog").close();
    renderToday();
    setText("#profileInitial", name.charAt(0).toUpperCase());
  } catch (error) {
    setText("#checkInStatus", friendlyFirebaseError(error));
  }
}

function initialiseFirebaseListeners() {
  $$(".tab-button").forEach((button) => button.addEventListener("click", () => selectTab(button.dataset.tab)));
  $$('[data-go="cycle"]').forEach((button) => button.addEventListener("click", () => selectTab("cycle")));
  $$('[data-go="log"]').forEach((button) => button.addEventListener("click", () => selectTab("log")));

  $("#onboardingForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const setup = readOnboarding();
    if (!setup) {
      setAuthStatus("Please add a name and valid cycle details first.");
      return;
    }
    state.pendingSetup = setup;
    state.creatingProfile = true;
    setGoogleBusy(true);
    setAuthStatus("Connecting your private space…");
    try {
      const user = auth.currentUser || (await signInWithPopup(auth, googleProvider)).user;
      await createProfile(user, setup);
      setAuthStatus("");
    } catch (error) {
      setAuthStatus(friendlyFirebaseError(error));
    } finally {
      state.creatingProfile = false;
      setGoogleBusy(false);
    }
  });

  $$("#energyChoices button").forEach((button) => button.addEventListener("click", () => {
    state.checkin.energy = button.dataset.energy;
    state.checkinTouched = true;
    updateChoiceButtons();
    renderToday();
  }));
  $$("#priorityChoices button").forEach((button) => button.addEventListener("click", () => {
    state.checkin.priority = button.dataset.priority;
    state.checkinTouched = true;
    updateChoiceButtons();
    renderToday();
  }));
  $$("#symptomChoices button").forEach((button) => button.addEventListener("click", () => {
    const symptom = button.dataset.symptom;
    if (symptom === "fine") {
      state.checkin.symptoms = state.checkin.symptoms.includes("fine") ? [] : ["fine"];
    } else {
      state.checkin.symptoms = state.checkin.symptoms.filter((item) => item !== "fine");
      state.checkin.symptoms = state.checkin.symptoms.includes(symptom)
        ? state.checkin.symptoms.filter((item) => item !== symptom)
        : [...state.checkin.symptoms, symptom];
    }
    state.checkinTouched = true;
    updateChoiceButtons();
    renderToday();
  }));

  $("#saveCheckIn").addEventListener("click", saveCheckinToCloud);
  $("#openSettings").addEventListener("click", () => {
    setCycleDialogValues();
    $("#settingsDialog").showModal();
  });
  $("#editDates").addEventListener("click", () => {
    setCycleDialogValues();
    $("#settingsDialog").showModal();
  });
  $("#closeSettings").addEventListener("click", () => $("#settingsDialog").close());
  $("#settingsForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const updated = {
      lastPeriod: $("#lastPeriod").value,
      cycleLength: Number($("#cycleLength").value),
      periodLength: Number($("#periodLength").value),
      wakeTime: $("#wakeTime").value
    };
    if (!updated.lastPeriod || parseDate(updated.lastPeriod) > today() ||
        updated.cycleLength < 21 || updated.cycleLength > 45 ||
        updated.periodLength < 2 || updated.periodLength > 10 ||
        updated.periodLength > updated.cycleLength) return;
    try {
      state.settings = updated;
      await saveSettingsToCloud();
      $("#settingsDialog").close();
      renderAll();
    } catch (error) {
      setText("#checkInStatus", friendlyFirebaseError(error));
    }
  });
  $("#logPeriodToday").addEventListener("click", async () => {
    try {
      await logCurrentPeriod();
    } catch (error) {
      setText("#checkInStatus", friendlyFirebaseError(error));
    }
  });

  $("#openProfile").addEventListener("click", () => {
    $("#profileName").value = state.profileName;
    $("#profileDialog").showModal();
  });
  $("#closeProfile").addEventListener("click", () => $("#profileDialog").close());
  $("#profileForm").addEventListener("submit", (event) => {
    event.preventDefault();
    saveProfileName();
  });
  $("#logoutButton").addEventListener("click", async () => {
    try {
      await signOut(auth);
      $("#profileDialog").close();
    } catch (error) {
      setText("#checkInStatus", friendlyFirebaseError(error));
    }
  });
}

function initialiseFirebaseApp() {
  populateOnboarding();
  initialiseFirebaseListeners();
  onAuthStateChanged(auth, handleAuthState);
}

initialiseFirebaseApp();
