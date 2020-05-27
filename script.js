var instructiveText = document.getElementById("instructive-text");
var choices = document.getElementById("choices");
var startButton = document.getElementById("start-button");
var countdownEl = document.getElementById("countdown");
var introEl = document.getElementById('intro');
var answerIndicator = document.getElementById('answerIndicator');
var highScore = document.getElementById('high-score');
var highScores = document.getElementById('high-scores');
var backButton = document.getElementById('back');
var interval;
var count = 75;

var questionDetails = [
    {
        question1: "Arrays in javascript can be used to store _____",
        options: ["Strings", "Numbers", "Arrays", "Booleans", "All of the above"],
        correctOption: "All of the above"
    },
    {
        question1: "The condition in an if / else statement",
        options: ["Strings", "Numbers", "Arrays", "Booleans", "All of the above"],
        correctOption: "All of the above"
    },
] 

function startQuiz() {

    introEl.style.display = "none";
    choices.style.display = "block";
    countdownEl.style.display = "block";

    startTimer();
}

function startTimer()   {
    countdownEl.textContent = count;
    var timerInterval =  setInterval(function()  {
        count--;
        countdownEl.textContent = "Time: " + count;

        if (count === 0)    {
            clearInterval(timerInterval);
            alert("Time's up!")
        }
    }, 1000);
}

function checkAnswer() {
    answerIndicator.style.display = "block";
}

function showHighScore() {
    
    countdownEl.style.display = "none";
    introEl.style.display = "none";
    choices.style.display = "none";
    highScores.style.display = "block";

    
}

function backButtonReset() {
    highScores.style.display = "none";
    introEl.style.display = "block";
    clearInterval(count);
    
    
}

startButton.addEventListener("click", startQuiz);
choices.addEventListener("click", checkAnswer);
highScore.addEventListener('click', showHighScore);
backButton.addEventListener('click', backButtonReset);

