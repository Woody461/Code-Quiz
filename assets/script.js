const questions = [
  {
    prompt: "Which of the following is correct about JavaScript?",
    options: [
      "JavaScript is a programming language.",
      "JavaScript is used to build webpage games.",
      "JavaScript is easy to learn.",
      "All of the above.",
    ],
    answer: "All of the above.",
  },
  {
    prompt: 'How do you write "Hello, World!" to the console in JavaScript?',
    options: [
      'log("Hello, World!");',
      'console.log("Hello, World!");',
      'print("Hello, World!");',
      'console.write("Hello, World!");',
    ],
    answer: 'console.log("Hello, World!");',
  },
  {
    prompt: "Which keyword is used to declare a variable in JavaScript?",
    options: ["let", "var", "const", "None of the above."],
    answer: "var",
  },
  {
    prompt: "Javascript uses java",
    options: ["true", "false"],
    answer: "false",
  },
  {
    prompt: "How do you convert a string to lowercase in JavaScript?",
    options: ["toLowerCase()", "toLower()", "caseLower()", "lowerCase()"],
    answer: "toLowerCase()",
  },
];

let currentQuestionIndex = 0;
let timeLeft = 60; // Time limit for the quiz in seconds
let timerId;
let scores = [];
let finalScore = 0; // Variable to store the final score

// Elements
const startButton = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const timerElement = document.getElementById("timer");
const feedbackContainer = document.getElementById("feedback-container");
const resultContainer = document.getElementById("result-container");
const initialsForm = document.getElementById("initials-form");
const highScoreContainer = document.getElementById("high-score-container");

// Start the quiz
startButton.addEventListener("click", startQuiz);

function startQuiz() {
  startButton.disabled = true;
  timeLeft = 60;
  currentQuestionIndex = 0;
  startTimer();
  displayQuestion();
  resultContainer.textContent = "";
  feedbackContainer.textContent = "";
  initialsForm.classList.add("hidden");
  startButton.removeEventListener("click", startQuiz);
}

function startTimer() {
  timerElement.textContent = timeLeft;
  timerId = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

function displayQuestion() {
  const question = questions[currentQuestionIndex];
  questionContainer.textContent = "";

  const questionText = document.createElement("div");
  questionText.textContent = question.prompt;
  questionContainer.appendChild(questionText);

  const choicesContainer = document.createElement("div");
  choicesContainer.classList.add("mt-4");
  questionContainer.appendChild(choicesContainer);

  question.options.forEach((option) => {
    const choice = document.createElement("button");
    choice.textContent = option;
    choice.classList.add(
      "block",
      "w-full",
      "py-2",
      "px-4",
      "mb-2",
      "text-left",
      "rounded-md",
      "border",
      "border-gray-300"
    );
    choice.addEventListener("click", () => checkAnswer(option));
    choicesContainer.appendChild(choice);
  });
}

function checkAnswer(selectedAnswer) {
  const question = questions[currentQuestionIndex];
  const feedback = document.createElement("div");

  question.selectedAnswer = selectedAnswer; // Store the selected answer in the question object

  if (selectedAnswer === question.answer) {
    feedback.textContent = "Correct!";
  } else {
    feedback.textContent = "Wrong!";
    timeLeft -=10
  }};
  
function checkAnswer(selectedAnswer) {
  const question = questions[currentQuestionIndex];
  const feedback = document.createElement("div");

  question.selectedAnswer = selectedAnswer; // Store the selected answer in the question object

  if (selectedAnswer === question.answer) {
    feedback.textContent = "Correct!";
  } else {
    feedback.textContent = "Wrong!";
    timeLeft -= 10; // Subtract 10 seconds for an incorrect answer
    if (timeLeft < 0) {
      timeLeft = 0;
    }
  }

  feedbackContainer.innerHTML = '';
  feedbackContainer.appendChild(feedback);

  // Move to the next question or end the quiz
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timerId);
  questionContainer.innerHTML = "";
  feedbackContainer.innerHTML = "";

  // Calculate the score
  finalScore = calculateScore();

  // Display the final score
  resultContainer.textContent = "Your final score is: " + finalScore;

  // Show the initials form
  initialsForm.classList.remove("hidden");
  startButton.disabled = false;
  startButton.addEventListener("click", startQuiz);
}

initialsForm.addEventListener("submit", saveScore);


function saveScore(event) {
  event.preventDefault();

  const initialsInput = document.getElementById("initials");
  const initials = initialsInput.value;

  // Save the score and initials here
  scores.push({ initials, score: finalScore });
  displayHighScores();

  resultContainer.innerHTML =
    "Your score is saved. Initials: " + initials + ", Score: " + finalScore;
  initialsForm.classList.add("hidden");
}

function displayHighScores() {
  highScoreContainer.innerHTML = "";
  const highScoresTitle = document.createElement("h2");
  highScoresTitle.textContent = "High Scores";
  highScoreContainer.appendChild(highScoresTitle);

  const scoresList = document.createElement("ul");
  scoresList.classList.add("scores-list");
  scores.forEach((score, index) => {
    const scoreItem = document.createElement("li");
    scoreItem.textContent = `${index + 1}. ${score.initials}: ${score.score}`;
    scoresList.appendChild(scoreItem);
  });
  highScoreContainer.appendChild(scoresList);
}

// Calculate the score based on the number of correct answers
function calculateScore() {
  let correctAnswers = 0;
  for (let i = 0; i < questions.length; i++) {
    if (
      questions[i].selectedAnswer &&
      questions[i].selectedAnswer === questions[i].answer
    ) {
      correctAnswers++;
    }
  }
  return correctAnswers;
}