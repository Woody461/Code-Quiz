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