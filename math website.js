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

  const tab = document.getElementById(id);
  if (tab) tab.classList.add("active");
}

/* QUIZ */
function newQuestion() {
  const topic = document.getElementById("topic").value;

  document.getElementById("feedback").textContent = "";
  document.getElementById("answer").value = "";

  if (topic === "algebra") {
    let x = Math.floor(Math.random() * 10) + 1;
    correctAnswer = x;
    document.getElementById("question").textContent = `x + 5 = ${x + 5}`;
    explanation = "Subtract 5";
  }

  if (topic === "trig") {
    correctAnswer = 37;
    document.getElementById("question").textContent = "tan⁻¹(3/4)";
    explanation = "≈ 37°";
  }

  if (topic === "prob") {
    correctAnswer = 0.3;
    document.getElementById("question").textContent = "3/10 = ?";
    explanation = "0.3";
  }
}

function checkAnswer() {
  let user = Number(document.getElementById("answer").value);

  if (Math.abs(user - correctAnswer) <= 1) {
    score++;
    xp += 10;
    streak++;

    if (xp >= level * 50) {
      xp = 0;
      level++;
    }

    document.getElementById("feedback").textContent = "✅ Correct!";
  } else {
    streak = 0;
    document.getElementById("feedback").textContent = "❌ " + explanation;
  }

  updateStats();
  updateProgress();
}

function updateStats() {
  document.getElementById("score").textContent = score;
  document.getElementById("xp").textContent = xp;
  document.getElementById("level").textContent = level;
  document.getElementById("streak").textContent = streak;
}

function updateProgress() {
  const topic = document.getElementById("topic").value;

  if (progress[topic] < 100) progress[topic] += 5;

  document.getElementById("progAlg").textContent = progress.algebra;
  document.getElementById("progTrig").textContent = progress.trig;
  document.getElementById("progProb").textContent = progress.prob;

  document.getElementById("barAlg").style.width = progress.algebra + "%";
  document.getElementById("barTrig").style.width = progress.trig + "%";
  document.getElementById("barProb").style.width = progress.prob + "%";
}

function showHint() {
  document.getElementById("feedback").textContent = explanation;
}

/* EXAM */
let examIndex = 0;
let examScore = 0;
let timer = 0;
let timerInterval;

function startExam() {
  examIndex = 0;
  examScore = 0;
  timer = 0;

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timer++;
    document.getElementById("timer").textContent = timer;
  }, 1000);

  nextExamQuestion();
}

function nextExamQuestion() {
  if (examIndex >= 10) {
    clearInterval(timerInterval);

    let percent = examScore * 10;
    document.getElementById("grade").textContent =
      "Score: " + percent + "%";
    return;
  }

  document.getElementById("examQ").textContent = examIndex + 1;

  correctAnswer = Math.floor(Math.random() * 10) + 1;
  document.getElementById("examQuestion").textContent =
    `x + 2 = ${correctAnswer + 2}`;
}

function submitExam() {
  let user = Number(document.getElementById("examAnswer").value);
  if (user === correctAnswer) examScore++;

  examIndex++;
  nextExamQuestion();
}

/* COPY */
function copyLink() {
  navigator.clipboard.writeText(
    document.getElementById("appLink").value
  );
  document.getElementById("copyMsg").textContent = "Copied!";
}

/* START */
window.onload = () => {
  showTab("home");
  newQuestion();
};