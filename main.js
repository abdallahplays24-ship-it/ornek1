let score = 0;
let xp = 0;
let level = 1;
let streak = 0;
let correctAnswer = 0;
let explanation = "";

let progress = { algebra: 0, trig: 0, prob: 0 };

/* TAB SYSTEM */
function showTab(id) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* GENERATE NEW QUESTION */
function newQuestion() {
  const topic = document.getElementById("topic").value;

  document.getElementById("feedback").textContent = "";
  document.getElementById("answer").value = "";

  if (topic === "algebra") {
    let x = Math.floor(Math.random() * 10) + 1;
    correctAnswer = x;
    document.getElementById("question").textContent = `Solve: x + 5 = ${x + 5}`;
    explanation = "Subtract 5 from both sides.";
  }

  if (topic === "trig") {
    let opp = 3;
    let adj = 4;
    correctAnswer = 37;
    document.getElementById("question").textContent =
      "Find the angle with opposite = 3 and adjacent = 4 (degrees)";
    explanation = "Use tan = opposite / adjacent → tan⁻¹(3/4) ≈ 37°";
  }

  if (topic === "prob") {
    correctAnswer = 0.3;
    document.getElementById("question").textContent =
      "Probability of 3 successes out of 10 trials?";
    explanation = "Probability = successes / total = 3/10 = 0.3";
  }
}

/* CHECK ANSWER */
function checkAnswer() {
  let user = Number(document.getElementById("answer").value);

  if (Math.abs(user - correctAnswer) <= 1) {
    score++;
    xp += 10;
    streak++;

    if (xp > level * 50) level++;

    document.getElementById("feedback").textContent = "✅ Correct!";
  } else {
    streak = 0;
    document.getElementById("feedback").textContent =
      "❌ Wrong. " + explanation;
  }

  updateStats();
}

/* UPDATE STATS */
function updateStats() {
  document.getElementById("score").textContent = score;
  document.getElementById("xp").textContent = xp;
  document.getElementById("level").textContent = level;
  document.getElementById("streak").textContent = streak;
}

/* HINT */
function showHint() {
  document.getElementById("feedback").textContent = "Hint: " + explanation;
}

/* EXAM MODE */
let examIndex = 0;
let examScore = 0;
let timer = 0;
let timerInterval;

function startExam() {
  examIndex = 0;
  examScore = 0;
  timer = 0;

  document.getElementById("examAnswer").value = "";
  document.getElementById("grade").textContent = "";

  timerInterval = setInterval(() => {
    timer++;
    document.getElementById("timer").textContent = timer;
  }, 1000);

  nextExamQuestion();
}

function nextExamQuestion() {
  if (examIndex >= 10) {
    clearInterval(timerInterval);

    let percent = (examScore / 10) * 100;
    let grade = "F";

    if (percent >= 90) grade = "A";
    else if (percent >= 80) grade = "B";
    else if (percent >= 70) grade = "C";
    else if (percent >= 60) grade = "D";

    document.getElementById(
      "grade"
    ).textContent = `Final Grade: ${grade} (${percent.toFixed(0)}%)`;

    document.getElementById("examQuestion").textContent = "Exam Finished!";
    return;
  }

  document.getElementById("examQ").textContent = examIndex + 1;

  correctAnswer = Math.floor(Math.random() * 10) + 1;

  document.getElementById(
    "examQuestion"
  ).textContent = `Solve: x + 2 = ${correctAnswer + 2}`;

  document.getElementById("examAnswer").value = "";
}

function submitExam() {
  let user = Number(document.getElementById("examAnswer").value);

  if (user === correctAnswer) examScore++;

  examIndex++;
  nextExamQuestion();
}

/* COPY LINK FOR BETTER APP TAB */
function copyLink() {
  const link = document.getElementById("appLink");

  link.select();
  link.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(link.value);

  document.getElementById("copyMsg").textContent = "✅ Link copied!";
}

/* START APP */
window.addEventListener("DOMContentLoaded", () => {
  newQuestion();
});