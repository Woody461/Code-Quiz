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

]