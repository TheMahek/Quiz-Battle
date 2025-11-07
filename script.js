const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const playerNameInput = document.getElementById("player-name");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const welcomeText = document.getElementById("welcome-text");
const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const finalMessage = document.getElementById("final-message");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;
let playerName = "";

const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "London", correct: false },
      { text: "Rome", correct: false },
      { text: "Berlin", correct: false }
    ]
  },
  {
    question: "Which is the largest ocean?",
    answers: [
      { text: "Indian", correct: false },
      { text: "Atlantic", correct: false },
      { text: "Pacific", correct: true },
      { text: "Arctic", correct: false }
    ]
  },
  {
    question: "How many continents are there?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "7", correct: true },
      { text: "8", correct: false }
    ]
  },
  {
    question: "Which is the fastest land animal?",
    answers: [
      { text: "Lion", correct: false },
      { text: "Cheetah", correct: true },
      { text: "Tiger", correct: false },
      { text: "Leopard", correct: false }
    ]
  },
  {
    question: "Which country is known for the Great Wall?",
    answers: [
      { text: "China", correct: true },
      { text: "Japan", correct: false },
      { text: "India", correct: false },
      { text: "Korea", correct: false }
    ]
  }
];

// Start button
startBtn.addEventListener("click", () => {
  playerName = playerNameInput.value.trim();

  if (playerName === "") {
    alert("Please enter your name!");
    return;
  }

  // Hide start screen
  startScreen.classList.remove("active");
  startScreen.classList.add("hidden");

  // Show quiz screen
  quizScreen.classList.remove("hidden");
  quizScreen.classList.add("active");

  welcomeText.innerText = `Welcome, ${playerName}!`;
  startQuiz();
});

// Restart button
restartBtn.addEventListener("click", () => location.reload());

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.classList.add("hidden");
  showQuestion(questions[currentQuestionIndex]);
  startTimer();
}

function showQuestion(question) {
  questionContainer.innerText = question.question;
  answerButtons.innerHTML = "";

  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(button, answer.correct));
    answerButtons.appendChild(button);
  });
}

function selectAnswer(button, correct) {
  clearInterval(timer);
  const allButtons = answerButtons.children;

  Array.from(allButtons).forEach(btn => {
    btn.disabled = true;

    if (btn.innerText === button.innerText) {
      if (correct) {
        btn.classList.add("correct");
        score += 10;
        scoreElement.innerText = `🏆 Score: ${score}`;
      } else {
        btn.classList.add("wrong");
      }
    }
  });

  nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", nextQuestion);

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
    resetTimer();
  } else {
    endQuiz();
  }
}

function startTimer() {
  timeLeft = 15;
  timerElement.innerText = `⏱ Time: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerText = `⏱ Time: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  nextButton.classList.add("hidden");
  startTimer();
}

function endQuiz() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  finalMessage.innerText = `🎉 Great job, ${playerName}! Your final score is ${score} points.`;
}
