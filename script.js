const plan = [
  {
    title: "Push",
    sub: "Brust · Schulter · Trizeps",
    exercises: [
      {
        name: "Brust Drücken (Maschine/Hantel)",
        sets: 4,
        reps: "8–10",
        tip: "Schulterblätter zusammen, Brust raus, langsam runter.",
      },
      {
        name: "Brust Butterfly (Pec Deck)",
        sets: 4,
        reps: "10–12",
        tip: "In der Mitte 1 Sekunde halten und Brust bewusst anspannen.",
      },
      {
        name: "Schulterdrücken (Maschine/Hantel)",
        sets: 4,
        reps: "8–10",
        tip: "Kontrolliert drücken, Ellbogen oben nicht brutal durchstrecken.",
      },
      {
        name: "Seitheben mit Hanteln (Lateral Raise)",
        sets: 4,
        reps: "12–15",
        tip: "Seitliche Schulter. Nur bis Schulterhöhe, kein Schwung.",
      },
      {
        name: "Trizeps Seil nach unten (Pushdown)",
        sets: 4,
        reps: "10–12",
        tip: "Ellbogen fest am Körper halten, unten kurz anspannen.",
      },
      {
        name: "Trizeps Seil über Kopf (Overhead)",
        sets: 4,
        reps: "10–12",
        tip: "Langsam strecken, kontrolliert zurück, nicht ins Hohlkreuz fallen.",
      },
    ],
  },
  {
    title: "Pull",
    sub: "Rücken · Bizeps",
    exercises: [
      {
        name: "Lat Pulldown (von oben ziehen)",
        sets: 4,
        reps: "8–10",
        tip: "Brust raus, Stange Richtung Schlüsselbein/obere Brust ziehen.",
      },
      {
        name: "Seated Row (nach vorne ziehen)",
        sets: 4,
        reps: "8–10",
        tip: "Schulterblätter am Ende zusammenziehen, nicht reißen.",
      },
      {
        name: "Reverse Fly / hinten Arme strecken",
        sets: 4,
        reps: "12–15",
        tip: "Fokus hintere Schulter und oberer Rücken. Kein Schwung.",
      },
      {
        name: "Hammer Curls (Hanteln)",
        sets: 4,
        reps: "10–12",
        tip: "Gut für dickere Arm-Optik und Unterarm/Brachialis.",
      },
      {
        name: "Normale Curls (Hanteln)",
        sets: 4,
        reps: "10–12",
        tip: "Handfläche nach oben drehen, langsam ablassen, nicht schwingen.",
      },
    ],
  },
  {
    title: "Legs + Core",
    sub: "Beine · Bauch",
    exercises: [
      {
        name: "Beinpresse (Leg Press)",
        sets: 4,
        reps: "8–10",
        tip: "Füsse hüftbreit, Knie nicht nach innen fallen lassen.",
      },
      {
        name: "Beinstrecker (Leg Extension)",
        sets: 4,
        reps: "12–15",
        tip: "Oben 1 Sekunde halten, langsam zurück.",
      },
      {
        name: "Beinbeuger (Leg Curl)",
        sets: 4,
        reps: "12–15",
        tip: "Hüfte bleibt stabil, Bewegung kontrolliert.",
      },
      {
        name: "Wadenheben (Calf Raises)",
        sets: 4,
        reps: "15–20",
        tip: "Ganz hoch, langsam ganz runter. Volle Bewegung.",
      },
      {
        name: "Plank",
        sets: 3,
        reps: "45–60 Sek.",
        tip: "Körper gerade wie ein Brett, Bauch fest.",
      },
      {
        name: "Crunches / Bauchpresse",
        sets: 4,
        reps: "20",
        tip: "Langsam hoch, nicht am Kopf reißen.",
      },
    ],
  },
];

const tips = [
  "💊 Creatin 3–5g täglich — auch an Ruhetagen.",
  "🥤 Mass Gainer nach dem Training oder zwischen Mahlzeiten.",
  "🍽️ 3 Mahlzeiten pro Tag sind Pflicht, wenn du wachsen willst.",
  "📈 Wenn alle Sätze sauber klappen: nächstes Mal leicht erhöhen.",
  "🎯 Technik vor Ego-Gewicht.",
  "😴 Schlaf und Essen bauen Muskeln, Training setzt nur den Reiz.",
  "🔥 Feuer im Bauch, aber Gehirn eingeschaltet.",
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
  localStorage.setItem("currentDay", String(currentDay));
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
          <span class="tag reps">${exercise.reps} Wdh</span>
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
