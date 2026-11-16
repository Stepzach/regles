const SETTINGS_KEY = "cycle-compass-settings";
const CHECKINS_KEY = "cycle-compass-checkins";
const PLANS_KEY = "cycle-compass-plans";

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
          tags: "warm · iron + vitamin C",
          ingredients: "Red lentils, tinned tomatoes, spinach, onion, lemon, olive oil and bread.",
          method: "Soften the onion, add lentils and tomatoes with water or stock, simmer until soft, then fold in spinach and lemon."
        },
        {
          title: "Salmon or tofu rice bowl",
          tags: "balanced · easy",
          ingredients: "Salmon or tofu, rice, broccoli, avocado, cucumber and lemon or lime.",
          method: "Cook the rice and protein, steam the broccoli, then build the bowl with avocado and citrus."
        },
        {
          title: "Porridge with berries and seeds",
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
          tags: "make ahead · vegetarian",
          ingredients: "Oats, yoghurt or fortified soy yoghurt, milk, grated apple, cinnamon and walnuts.",
          method: "Mix everything except the walnuts in a jar the night before. Add walnuts just before eating."
        },
        {
          title: "Crisp chickpea quinoa salad",
          tags: "fresh · vegetarian",
          ingredients: "Quinoa, chickpeas, cucumber, tomatoes, herbs, feta or tofu, lemon and olive oil.",
          method: "Cook the quinoa, then toss everything together with lemon and olive oil."
        },
        {
          title: "Ginger tofu or chicken stir-fry",
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
          tags: "fast · fresh",
          ingredients: "Couscous, chickpeas or eggs, cucumber, tomatoes, herbs, lemon, olive oil, feta or tahini.",
          method: "Cover the couscous with hot water, fluff it, then toss with the remaining ingredients."
        },
        {
          title: "Pesto pea pasta",
          tags: "comforting · 15 minutes",
          ingredients: "Pasta, peas, pesto, spinach, parmesan or nutritional yeast and lemon.",
          method: "Cook the pasta and peas together, then stir through pesto, spinach and lemon."
        },
        {
          title: "Yoghurt, fruit and granola bowl",
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
          tags: "warm · vegetarian · batch-friendly",
          ingredients: "Sweet potato, black beans, tomatoes, onion, peppers, cumin, rice or tortilla chips.",
          method: "Cook the onion and peppers, add cubed sweet potato, beans, tomatoes and spices, then simmer until soft."
        },
        {
          title: "Peanut noodle bowl",
          tags: "comforting · quick",
          ingredients: "Noodles, tofu or chicken, broccoli, carrot, peanut butter, soy sauce and lime.",
          method: "Cook noodles and vegetables. Mix peanut butter, soy and lime with warm water, then toss together."
        },
        {
          title: "Baked potato with beans and greens",
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
  settings: null,
  checkin: { energy: "steady", symptoms: [], priority: "lighter-plan" },
  guidePhase: null
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
    wakeTime: "07:30",
    hemisphere: "north",
    periodStarts: []
  };
}

function readLocal(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadState() {
  const stored = readLocal(SETTINGS_KEY, null);
  state.settings = { ...getDefaultSettings(), ...(stored || {}) };
  state.settings.cycleLength = Number(state.settings.cycleLength);
  state.settings.periodLength = Number(state.settings.periodLength);
  state.settings.periodStarts = Array.isArray(state.settings.periodStarts) ? state.settings.periodStarts : [];

  const savedCheckin = readLocal(CHECKINS_KEY, {})[toISO(today())];
  if (savedCheckin) {
    state.checkin = {
      energy: savedCheckin.energy || "steady",
      symptoms: savedCheckin.symptoms || [],
      priority: savedCheckin.priority || "lighter-plan"
    };
  }
}

function saveSettings() {
  writeLocal(SETTINGS_KEY, state.settings);
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
  const northern = [11, 0, 1].includes(month)
    ? "winter"
    : [2, 3, 4].includes(month)
      ? "spring"
      : [5, 6, 7].includes(month)
        ? "summer"
        : "autumn";
  if (state.settings.hemisphere === "south") {
    return { winter: "summer", spring: "autumn", summer: "winter", autumn: "spring" }[northern];
  }
  return northern;
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

  if (!state.guidePhase) state.guidePhase = cycle.phaseId;
  renderPhasePicker(cycle.phaseId);
  renderGuide();
}

function renderPhasePicker(currentPhase) {
  const picker = $("#phasePicker");
  picker.replaceChildren();
  PHASE_ORDER.forEach((id) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = PHASES[id].name;
    button.classList.toggle("is-active", id === state.guidePhase);
    button.setAttribute("aria-current", id === currentPhase ? "step" : "false");
    button.addEventListener("click", () => {
      state.guidePhase = id;
      renderPhasePicker(currentPhase);
      renderGuide();
    });
    picker.append(button);
  });
}

function renderGuide() {
  const phase = PHASES[state.guidePhase];
  const content = $("#guideContent");
  content.replaceChildren();

  const intro = document.createElement("div");
  intro.className = "guide-topline";
  intro.innerHTML = `<div><h3>${phase.name}</h3><p>${phase.summary}</p></div><span class="guide-when">${phase.when}</span>`;
  content.append(intro);

  const grid = document.createElement("div");
  grid.className = "guide-grid";
  const food = document.createElement("section");
  food.className = "guide-block";
  food.innerHTML = `<h3>Food</h3><p>${phase.food.focus}</p>`;
  const foodList = document.createElement("ul");
  foodList.className = "plain-list";
  phase.food.nutrients.forEach((item) => {
    const line = document.createElement("li");
    line.textContent = item;
    foodList.append(line);
  });
  food.append(foodList);

  const movement = document.createElement("section");
  movement.className = "guide-block";
  movement.innerHTML = `<h3>Movement</h3><p><strong>Running low:</strong> ${phase.movement.low}</p><p><strong>Steady:</strong> ${phase.movement.steady}</p><p><strong>Plenty:</strong> ${phase.movement.plenty}</p>`;

  const sleep = document.createElement("section");
  sleep.className = "guide-block";
  sleep.innerHTML = `<h3>Sleep</h3><p><strong>${phase.sleep.title}.</strong> ${phase.sleep.copy}</p>`;

  const plan = document.createElement("section");
  plan.className = "guide-block";
  plan.innerHTML = "<h3>Planning</h3>";
  const planList = document.createElement("ul");
  planList.className = "plain-list";
  phase.plan.forEach((item) => {
    const line = document.createElement("li");
    line.textContent = item;
    planList.append(line);
  });
  plan.append(planList);
  grid.append(food, movement, sleep, plan);
  content.append(grid);

  const recipes = document.createElement("section");
  recipes.className = "guide-recipes";
  recipes.innerHTML = "<h3>Three simple meal ideas</h3>";
  const list = document.createElement("div");
  list.className = "recipe-list";
  recipes.append(list);
  content.append(recipes);
  renderRecipes(list, phase.food.meals);
}

function renderPlan() {
  const season = SEASONS[getSeason()];
  setText("#seasonTitle", season.title);
  setText("#seasonLine", season.line);
  listInto("#seasonSwaps", season.swaps);

  const reset = $("#resetSteps");
  reset.replaceChildren(...RESET_STEPS.map((step) => {
    const item = document.createElement("li");
    item.textContent = step;
    return item;
  }));

  const todaysPlan = readLocal(PLANS_KEY, {})[toISO(today())];
  $("#necessaryTask").value = todaysPlan?.necessary || "";
  $("#easyTask").value = todaysPlan?.easy || "";
  $("#careTask").value = todaysPlan?.care || "";
  renderHistory();
}

function renderHistory() {
  const history = readLocal(CHECKINS_KEY, {});
  const items = Object.entries(history).sort(([a], [b]) => b.localeCompare(a)).slice(0, 5);
  const target = $("#historyList");
  target.replaceChildren();
  if (!items.length) {
    const message = document.createElement("p");
    message.className = "history-empty";
    message.textContent = "Your saved check-ins will appear here.";
    target.append(message);
    return;
  }
  items.forEach(([date, entry]) => {
    const item = document.createElement("div");
    item.className = "history-item";
    const label = document.createElement("strong");
    label.textContent = formatDate(parseDate(date));
    const summary = document.createElement("span");
    const words = [entry.energy === "low" ? "Running low" : entry.energy === "plenty" ? "Plenty" : "Steady", ...(entry.symptoms || []).slice(0, 1)];
    summary.textContent = words.join(" · ");
    item.append(label, summary);
    target.append(item);
  });
}

function renderAll() {
  renderToday();
  renderCycle();
  renderPlan();
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

function setDialogValues() {
  $("#lastPeriod").value = state.settings.lastPeriod;
  $("#lastPeriod").max = toISO(today());
  $("#cycleLength").value = state.settings.cycleLength;
  $("#periodLength").value = state.settings.periodLength;
  $("#wakeTime").value = state.settings.wakeTime;
  $("#hemisphere").value = state.settings.hemisphere;
}

function openSettings() {
  setDialogValues();
  $("#settingsDialog").showModal();
}

function logPeriodStart(dateValue) {
  const selectedDate = parseDate(dateValue);
  const priorDate = parseDate(state.settings.lastPeriod);
  const daysSincePrior = daysBetween(priorDate, selectedDate);
  let updatedCycleLength = state.settings.cycleLength;
  let confirmation = "Period logged as day 1.";

  if (daysSincePrior >= 15 && daysSincePrior <= 60) {
    updatedCycleLength = daysSincePrior;
    confirmation = `Period logged as day 1. Your last cycle was ${daysSincePrior} days, so the next estimate now uses ${daysSincePrior}.`;
  }

  const starts = [...new Set([...state.settings.periodStarts, dateValue])].sort();
  state.settings = {
    ...state.settings,
    lastPeriod: dateValue,
    cycleLength: updatedCycleLength,
    periodStarts: starts.slice(-12)
  };
  state.guidePhase = "menstrual";
  saveSettings();
  setText("#checkInStatus", confirmation);
  renderAll();
}

function initialiseListeners() {
  $$(".tab-button").forEach((button) => button.addEventListener("click", () => selectTab(button.dataset.tab)));
  $$('[data-go="cycle"]').forEach((button) => button.addEventListener("click", () => selectTab("cycle")));
  $$('[data-go="plan"]').forEach((button) => button.addEventListener("click", () => selectTab("plan")));

  $$("#energyChoices button").forEach((button) => button.addEventListener("click", () => {
    state.checkin.energy = button.dataset.energy;
    renderToday();
  }));
  $$("#priorityChoices button").forEach((button) => button.addEventListener("click", () => {
    state.checkin.priority = button.dataset.priority;
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
    renderToday();
  }));

  $("#saveCheckIn").addEventListener("click", () => {
    const history = readLocal(CHECKINS_KEY, {});
    history[toISO(today())] = {
      ...state.checkin,
      phase: getCycle().phaseId,
      savedAt: new Date().toISOString()
    };
    writeLocal(CHECKINS_KEY, history);
    setText("#checkInStatus", "Saved privately on this device.");
    renderHistory();
  });

  $("#miniPlanForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const plans = readLocal(PLANS_KEY, {});
    plans[toISO(today())] = {
      necessary: $("#necessaryTask").value.trim(),
      easy: $("#easyTask").value.trim(),
      care: $("#careTask").value.trim()
    };
    writeLocal(PLANS_KEY, plans);
    setText("#planStatus", "Saved privately on this device.");
  });

  $("#openSettings").addEventListener("click", openSettings);
  $("#editDates").addEventListener("click", openSettings);
  $("#closeSettings").addEventListener("click", () => $("#settingsDialog").close());
  $("#settingsForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const lastPeriod = $("#lastPeriod").value;
    const cycleLength = Number($("#cycleLength").value);
    const periodLength = Number($("#periodLength").value);
    if (!lastPeriod || parseDate(lastPeriod) > today() || periodLength > cycleLength) return;
    state.settings = {
      ...state.settings,
      lastPeriod,
      cycleLength,
      periodLength,
      wakeTime: $("#wakeTime").value,
      hemisphere: $("#hemisphere").value
    };
    saveSettings();
    $("#settingsDialog").close();
    renderAll();
  });

  $("#clearData").addEventListener("click", () => {
    if (!window.confirm("Clear all cycle dates, check-ins and plans from this browser?")) return;
    localStorage.removeItem(SETTINGS_KEY);
    localStorage.removeItem(CHECKINS_KEY);
    localStorage.removeItem(PLANS_KEY);
    state.settings = getDefaultSettings();
    state.checkin = { energy: "steady", symptoms: [], priority: "lighter-plan" };
    state.guidePhase = null;
    setDialogValues();
    renderAll();
  });

  $("#openPeriodLog").addEventListener("click", () => {
    $("#periodStartDate").value = toISO(today());
    $("#periodStartDate").max = toISO(today());
    $("#periodDialog").showModal();
  });
  $("#closePeriodLog").addEventListener("click", () => $("#periodDialog").close());
  $("#periodLogForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const value = $("#periodStartDate").value;
    if (!value || parseDate(value) > today()) return;
    logPeriodStart(value);
    $("#periodDialog").close();
  });
}

function initialise() {
  loadState();
  initialiseListeners();
  renderAll();
  if (!localStorage.getItem(SETTINGS_KEY)) openSettings();
}

initialise();
