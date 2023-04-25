const rate = document.querySelector("#rate");
const highScoreLink = document.querySelector("#highScoreLink");
const timer = document.querySelector("#timer");
const introSect = document.querySelector("#intro");
const startBtn = document.querySelector("#start");
const questionSelect = document.querySelector("#questionSelect");
const gameOver = document.querySelector("#gameOver");
const submitBtn = document.querySelector("#submitBtn");
const highScorePage = document.querySelector("#highScorePage");
const highScores = document.querySelector("#highScores");
const mainBtn = document.querySelector("#main");
const clearBtn = document.querySelector("#clear");

const questions = [
    {
        prompt: "Which of the following is correct about features of JavaScript?",
        optionA: " JavaScript is a lightweight, interpreted programming language.",
        optionB: "JavaScript is designed for creating network-centric applications.",
        optionC: " JavaScript is complementary to and integrated with Java.",
        optionD: "All of the above.",
        answer: "D",
    },
{
    prompt: "Which of the following is the correct syntax to redirect a url using JavaScript?",
    optionA: " document.location='http://www.newlocation.com';",
    optionB: "browser.location='http://www.newlocation.com';",
    optionC: "browser.location='http://www.newlocation.com';",
    optionD: " window.location='http://www.newlocation.com';",
    answer: "D",
},
{
    prompt: "Which built-in method returns the index within the calling String object of the first occurrence of the specified value?",
    optionA: "getIndex()",
    optionB: "location()",
    optionC: "indexOf()",
    optionD: "None of the above.",
    answer: "C",
},
{
    prompt: " All user-defined objects and built-in objects are descendants of an object called Object?",
    optionA: "true",
    optionB: "false",
    answer: "A",
},
{
    prompt: "Which of the following function of Array object returns a new array comprised of this array joined with other array(s) and/or value(s)?",
    optionA: "concat()",
    optionB: "pop()",
    optionC: "push()",
    optionD: "some()",
    answer: "A",
},
];

const lastQuestion = questions.length - 1;
let currentQuestion = 0;
let secondsLeft = 60;
let score = 0;
let interval;

function hide(y) {
    y.style.display = "none";
  }

  function show(z) {
    z.style.display = "block";
  }

  startBtn.addEventListener("click", function () {
    hide(introSect);
    show(questionSelect);
    getQuestions();
    countdown();
    timer.textContent = "Timer: " + secondsLeft + " second(s)";
  });

  function countdown() {
    show(timer);
    interval = setInterval(function () {
      secondsLeft--;
      timer.textContent = "Timer: " + secondsLeft + " second(s)";
      if (secondsLeft <= 0) {
        stopTimer();
        finalizeQuiz();
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(interval);
    hide(timer);
  }

  function getQuestions() {
    const questionPrompt = document.querySelector("#question");
    const optionA = document.querySelector("#A");
    const optionB = document.querySelector("#B");
    const optionC = document.querySelector("#C");
    const optionD = document.querySelector("#D");
  
    questionPrompt.textContent = questions[currentQuestion].prompt;
    optionA.textContent = questions[currentQuestion].optionA;
    optionB.textContent = questions[currentQuestion].optionB;
    optionC.textContent = questions[currentQuestion].optionC;
    optionD.textContent = questions[currentQuestion].optionD;
  }

  function validateAnswer(x) {
    show(rate);
    if (x == questions[currentQuestion].answer) {
      score++;
      rate.textContent = "Correct!";
    } else {
      secondsLeft = secondsLeft - 10;
      rate.textContent = "Incorrect";
    }
    if (currentQuestion < lastQuestion) {
      currentQuestion++;
      getQuestions();
    } else {
      stopTimer();
      finishQuiz();
    }
  }

  function finishQuiz() {
    hide(timer);
    hide(questionSelect);
    show(gameOver);
    const showScore = document.querySelector("#score");
    showScore.textContent = "Your final score is " + score + ".";
  }

  function renderHighScores() {
    //Gets scores array from local storage
    const allScores = JSON.parse(localStorage.getItem("scores")) || [];
    allScores.sort((a, b) => b.score - a.score);
    for (let i = 0; i < allScores.length; i++) {
      const savedScores = document.createElement("p");
      savedScores.textContent =
        i +
        1 +
        ". " +
        allScores[i].user +
        " - " +
        allScores[i].score +
        " point(s)";
      highScores.appendChild(savedScores);
    }
  }

  submitBtn.addEventListener("click",  function () {
    let initials = document.querySelector("#initials").value;
    if (initials === "") {
        alert("Enter your initials");
  } else {
    hide(highScoreLink);
    hide(rate);
    hide(gameOver);
    show(highScorePage);
    const newPlayer = {
        user: initials,
        score,
      };

      const allScores = JSON.parse(localStorage.getItem("scores")) || [];

      allScores.push(newPlayer);

      localStorage.setItem("scores", JSON.stringify(allScores));
    renderHighScores();
  }
});

highScoreLink.addEventListener("click", function () {
    show(highScorePage);
    hide(introSect);
    hide(highScoreLink);
    hide(questionSelect);
    hide(gameOver);
    hide(rate);
    hide(timer);
    stopTimer();
    renderHighScores();
  });

  mainBtn.addEventListener("click", function () {
    reset();
    show(introSect);
    show(highScoreLink);
    hide(highScorePage);
    initials.value = "";
  });

  clearBtn.addEventListener("click", function () {
    removeChild();
    localStorage.removeItem("scores");
  });

  function reset() {
    score = 0;
    currentQuestion = 0;
    secondsLeft = 60;
    removeChild();
  }

  function removeChild() {
    const parent = document.querySelector("#highScores");
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }