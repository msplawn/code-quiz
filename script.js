var instructiveText = document.getElementById("instructive-text");
var choices = document.getElementById("choices");
var startButton = document.getElementById("start-button");
var countdownEl = document.getElementById("countdown");
var introEl = document.getElementById('intro');
var answerIndicator = document.getElementById('answerIndicator');
var answerButtons = document.getElementById('answer-button');
var highScore = document.getElementById('high-score');
var highScores = document.getElementById('high-scores');
var clearHS = document.getElementById("clearHS");
var hsList = document.getElementById('attachHS');
var endingScore = document.getElementById('endingScore');
var initials = document.getElementById('initials');
var submit = document.getElementById('submit');
var scoreText = document.getElementById('scoreText');
var backButton = document.getElementById('back');
var timesUp = document.getElementById('times-up');
var tryAgain = document.getElementById('try-again');
var questionsHeader = document.getElementById('questionsHeader');
var choice1 = document.getElementById('choice1');
var choice2 = document.getElementById('choice2');
var choice3 = document.getElementById('choice3');
var choice4 = document.getElementById('choice4');

var interval;
var startTimer = 0;
var count = 75;
var index = 0;
var score = 0;
var currAnswer = "";
var tempObj = {
    initials: "",
    score: 0
}

var hsArr = JSON.parse(localStorage.getItem("highscore")) || [];


var questionArr = [
    {
      question: "Commonly used data types DO NOT include:",
      possibleAnswers: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      question: "The condition in an if / else statement is enclosed within ____.",
      possibleAnswers: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      question: "Arrays in JavaScript can be used to store ____.",
      possibleAnswers: [
        "numbers and strings",
        "other arrays",
        "booleans",
        "all of the above"
      ],
      answer: "all of the above"
    },
    {
      question: "String values must be enclosed within ____ when being assigned to variables.",
      possibleAnswers: ["commas", "curly brackets", "quotes", "parentheses"],
      answer: "quotes"
    },
    {
      question:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      possibleAnswers: ["JavaScript", "terminal / bash", "for loops", "console.log"],
      answer: "console.log"
    }
  ];

function startQuiz() {

    introEl.style.display = "none";
    choices.style.display = "block";
    countdownEl.style.display = "block";

    shuffle(questionArr);

    populateQuestions(index);

    startTimer = setInterval(function() {
        count--;
        timerUpdate();
        isTimeUp();
    }, 1000);

    choice1.addEventListener("click",evaluate);
    choice2.addEventListener("click",evaluate);
    choice3.addEventListener("click",evaluate);
    choice4.addEventListener("click",evaluate);
}

function populateQuestions(index) {
    var temp = questionArr[index];
    currAnswer = temp.answer;
    questionsHeader.textContent=temp.question;

    var choiceTemp = [];

    for (var i = 0; i < temp.possibleAnswers.length; i++)   {
        choiceTemp.push(temp.possibleAnswers[i]);
        
    }

    choice1.textContent = choiceTemp[0];
    choice2.textContent = choiceTemp[1];
    choice3.textContent = choiceTemp[2];
    choice4.textContent = choiceTemp[3];
}

function timerUpdate() {
    countdownEl.textContent = "Time: " + count;
}

function isTimeUp() {
    if(count < 0)   {
        clearInterval(startTimer);
        count = 0;
        timerUpdate();
        timesUpFunction();
    }   else {
        return;
    }
}


function timesUpFunction() {
    countdownEl.style.display = "none";
    introEl.style.display = "none";
    choices.style.display = "none";
    timesUp.style.display = "block";
}

function tryAgainButton() {
    timesUp.style.display = "none"
    introEl.style.display = "block";
    clearInterval(startTimer);
    count = 75;
}



function evaluate(){
    answerIndicator.style.display = "block";
    if(this.textContent == currAnswer){
        answerPopup(0);
    }
    else{
        answerPopup(1);
        count -= 15;
        isTimeUp();
    }
    index++;
    if(index+1> questionArr.length){
        endQuiz();
    }
    else{
        populateQuestions(index);
    }
}

function answerPopup(index){
    var indicator = document.querySelector("#indicatorText");
    switch(index){
        case 0:
            indicator.textContent = "Correct!";
            break;
        case 1:
            indicator.textContent = "Wrong!";
            break;
    }
    answerIndicator.style.display = "block";
    var tempTimer = setTimeout(function(){
        answerIndicator.style.display = "none";
    },1000);
}

function endQuiz(){
    clearInterval(startTimer);
    score = count;
    count = 0;
    timerUpdate();
    choices.style.display = "none";
    endingScore.style.display = "block";
    timesUp.style.display = "none";
    scoreText.textContent = "Your score is: " + score;
    initials.value = "";
}

submit.addEventListener("click",function(){
    tempObj.initials = initials.value;
    tempObj.score = score;
    hsArr.push(tempObj);
    localStorage.setItem("highscore", JSON.stringify(hsArr));
    showHighScore();
});

function showHighScore() {
    countdownEl.style.display = "none";
    introEl.style.display = "none";
    choices.style.display = "none";
    endingScore.style.display = "none";
    highScores.style.display = "block";
    clearInterval(startTimer);
    displayHS();
}

function displayHS(){
    while(hsList.firstChild){
        hsList.firstChild.remove();
    }
    if(hsArr.length>1){
        hsArr.sort(compare);
    }
    
    for (var i = 0 ; i < hsArr.length; i++){
        var temp = hsArr[i];
        var listHS = document.createElement("div");
        listHS.setAttribute("style","text-align: center; background-color:#f7f7f7; width:25%; margin:auto; " );

        listHS.textContent = temp.initials + " - " + temp.score;
        hsList.appendChild(listHS);
    }
}

function moveToHS(){
    introEl.style.display="none";
    countdownEl.style.display="none";
    choices.style.display="block";
    endingScore.style.display="none";
    displayHS();
}

clearHS.addEventListener("click",function(){
    localStorage.clear();
    hsArr = [];
    displayHS();
});

function backButtonReset() {
    highScores.style.display = "none";
    introEl.style.display = "block";
    clearInterval(startTimer);
    count = 75;
    
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function compare(a,b){
    return (b.score - a.score);
}


startButton.addEventListener("click", startQuiz);
highScore.addEventListener('click', showHighScore);
backButton.addEventListener('click', backButtonReset);
tryAgain.addEventListener('click', tryAgainButton);




