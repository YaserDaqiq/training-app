const plan = [
  {
    title: "Push",
    sub: "Brust · Schulter · Trizeps",
    exercises: [
      {
        name: "Chest Press",
        sets: 4,
        reps: "8–10",
        tip: "Schulterblätter zusammen, Brust raus, langsam runter.",
      },
      {
        name: "Incline Chest Press",
        sets: 3,
        reps: "8–12",
        tip: "Fokus obere Brust. Nicht mit Schwung drücken.",
      },
      {
        name: "Butterfly / Pec Deck",
        sets: 3,
        reps: "10–15",
        tip: "In der Mitte kurz halten und Brust bewusst anspannen.",
      },
      {
        name: "Shoulder Press",
        sets: 3,
        reps: "8–12",
        tip: "Kontrolliert drücken. Ellbogen oben nicht brutal durchstrecken.",
      },
      {
        name: "Lateral Raises",
        sets: 4,
        reps: "12–20",
        tip: "Seitliche Schulter. Leichtes Gewicht, saubere Kontrolle.",
      },
      {
        name: "Triceps Pushdown",
        sets: 3,
        reps: "10–15",
        tip: "Ellbogen bleiben nah am Körper.",
      },
      {
        name: "Overhead Triceps Extension",
        sets: 3,
        reps: "10–15",
        tip: "Langsam strecken, nicht ins Hohlkreuz fallen.",
      },
    ],
  },
  {
    title: "Pull",
    sub: "Rücken · Bizeps · hintere Schulter",
    exercises: [
      {
        name: "Lat Pulldown",
        sets: 4,
        reps: "8–10",
        tip: "Brust raus, Stange Richtung obere Brust ziehen.",
      },
      {
        name: "Seated Cable Row",
        sets: 4,
        reps: "8–10",
        tip: "Schulterblätter hinten zusammenziehen.",
      },
      {
        name: "Machine Row / einarmiges Rudern",
        sets: 3,
        reps: "10–12",
        tip: "Rücken spüren, nicht nur mit Armen ziehen.",
      },
      {
        name: "Reverse Fly",
        sets: 3,
        reps: "12–20",
        tip: "Hintere Schulter. Kein Schwung.",
      },
      {
        name: "Hammer Curls",
        sets: 3,
        reps: "10–12",
        tip: "Gut für Brachialis und dickere Arm-Optik.",
      },
      {
        name: "Normale Curls",
        sets: 3,
        reps: "10–15",
        tip: "Langsam ablassen, nicht schwingen.",
      },
    ],
  },
  {
    title: "Legs + Core",
    sub: "Beine · Bauch",
    exercises: [
      {
        name: "Leg Press",
        sets: 4,
        reps: "8–12",
        tip: "Füsse stabil, Knie nicht nach innen fallen lassen.",
      },
      {
        name: "Leg Curl",
        sets: 3,
        reps: "10–15",
        tip: "Hintere Oberschenkel kontrolliert trainieren.",
      },
      {
        name: "Leg Extension",
        sets: 3,
        reps: "10–15",
        tip: "Oben kurz halten, nicht ruckartig.",
      },
      {
        name: "Wadenheben",
        sets: 4,
        reps: "12–20",
        tip: "Ganz hoch, langsam runter.",
      },
      {
        name: "Cable Crunch / Bauchmaschine",
        sets: 3,
        reps: "12–20",
        tip: "Bauch einrollen, nicht nur am Nacken ziehen.",
      },
      {
        name: "Plank",
        sets: 3,
        reps: "30–60 Sek.",
        tip: "Körper gerade halten, Bauch fest.",
      },
    ],
  },
];

const tips = [
  "Creatin 3–5g täglich — auch an Ruhetagen.",
  "Mass Gainer nur als Zusatz, nicht als Ersatz für echtes Essen.",
  "3 Mahlzeiten pro Tag sind Pflicht, wenn du wachsen willst.",
  "Wenn alle Sätze sauber klappen: nächstes Mal leicht erhöhen.",
  "Technik vor Ego-Gewicht.",
  "Schlaf und Essen bauen Muskeln, Training setzt nur den Reiz.",
];

let currentDay = Number(localStorage.getItem("currentDay")) || 0;
let checked = JSON.parse(localStorage.getItem("checkedExercises")) || {};

const exerciseList = document.getElementById("exerciseList");
const dayTitle = document.getElementById("dayTitle");
const daySub = document.getElementById("daySub");
const progressFill = document.getElementById("progressFill");
const doneBox = document.getElementById("doneBox");
const resetBtn = document.getElementById("resetBtn");
const tipBox = document.getElementById("tipBox");
const tabs = document.querySelectorAll(".tab");

function save() {
  localStorage.setItem("currentDay", currentDay);
  localStorage.setItem("checkedExercises", JSON.stringify(checked));
}

function renderDay() {
  const day = plan[currentDay];

  dayTitle.textContent = day.title;
  daySub.textContent = day.sub;

  tabs.forEach((tab, index) => {
    tab.classList.toggle("active", index === currentDay);
  });

  exerciseList.innerHTML = "";

  day.exercises.forEach((exercise, index) => {
    const key = `${currentDay}-${index}`;
    const isDone = checked[key] === true;

    const card = document.createElement("article");
    card.className = `exercise-card ${isDone ? "done" : ""}`;

    card.innerHTML = `
      <div class="checkbox">${isDone ? "✓" : ""}</div>
      <div>
        <p class="exercise-name">${exercise.name}</p>
        <div class="tags">
          <span class="tag sets">${exercise.sets} Sätze</span>
          <span class="tag reps">${exercise.reps}</span>
        </div>
        <p class="exercise-tip">${exercise.tip}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      checked[key] = !checked[key];
      save();
      renderDay();
    });

    exerciseList.appendChild(card);
  });

  updateProgress();
}

function updateProgress() {
  plan.forEach((day, dayIndex) => {
    const done = day.exercises.filter((_, exerciseIndex) => {
      return checked[`${dayIndex}-${exerciseIndex}`] === true;
    }).length;

    const count = document.getElementById(`count-${dayIndex}`);
    count.textContent = `${done}/${day.exercises.length}`;
  });

  const total = plan[currentDay].exercises.length;
  const done = plan[currentDay].exercises.filter((_, index) => {
    return checked[`${currentDay}-${index}`] === true;
  }).length;

  const percent = Math.round((done / total) * 100);
  progressFill.style.width = `${percent}%`;

  doneBox.classList.toggle("visible", percent === 100);
}

function rotateTip() {
  const randomIndex = Math.floor(Math.random() * tips.length);
  tipBox.textContent = tips[randomIndex];
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    currentDay = Number(tab.dataset.day);
    save();
    renderDay();
  });
});

resetBtn.addEventListener("click", () => {
  plan[currentDay].exercises.forEach((_, index) => {
    checked[`${currentDay}-${index}`] = false;
  });

  save();
  renderDay();
});

rotateTip();
setInterval(rotateTip, 5000);
renderDay();
