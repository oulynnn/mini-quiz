// ================================
// QUIZ CHALLENGE
// Part 1
// ================================

// Element
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const playerNameInput = document.getElementById("playerName");

const questionText = document.getElementById("questionText");
const answers = document.getElementById("answers");

const questionNumber = document.getElementById("questionNumber");
const progressBar = document.getElementById("progressBar");
const timer = document.getElementById("timer");

const finalScore = document.getElementById("finalScore");
const correct = document.getElementById("correct");
const wrong = document.getElementById("wrong");
const accuracy = document.getElementById("accuracy");
const grade = document.getElementById("grade");

const highScore = document.getElementById("highScore");

// ================================
// Variable
// ================================

let playerName = "";

let quiz = [];

let currentQuestion = 0;

let score = 0;

let correctAnswer = 0;

let wrongAnswer = 0;

let selectedAnswer = null;

let timeLeft = 15;

let timerInterval;

// ================================
// High Score
// ================================

if(localStorage.getItem("highScore")){

    highScore.textContent = localStorage.getItem("highScore");

}else{

    localStorage.setItem("highScore",0);

}

// ================================
// Start Quiz
// ================================

startBtn.addEventListener("click",startQuiz);

function startQuiz(){

    playerName = playerNameInput.value.trim();

    if(playerName===""){

        alert("Please enter your name.");

        return;

    }

    // Ambil 10 soal random
    quiz = [...questions]
        .sort(()=>Math.random()-0.5)
        .slice(0,10);

    currentQuestion = 0;

    score = 0;

    correctAnswer = 0;

    wrongAnswer = 0;

    startScreen.classList.add("hidden");

    quizScreen.classList.remove("hidden");

    showQuestion();

}

// ================================
// Show Question
// ================================

function showQuestion(){

    clearInterval(timerInterval);

    timeLeft = 15;

    timer.textContent = timeLeft;

    startTimer();

    selectedAnswer = null;

    nextBtn.disabled = true;

    const q = quiz[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} / ${quiz.length}`;

    progressBar.style.width =
        ((currentQuestion + 1) / quiz.length) * 100 + "%";

    questionText.textContent = q.question;

    answers.innerHTML = "";

    q.options.forEach((option,index)=>{

        const btn = document.createElement("div");

        btn.className = "answer";

        btn.textContent = option;

        btn.onclick = ()=>selectAnswer(btn,index);

        answers.appendChild(btn);

    });

}

// ================================
// Timer
// ================================

function startTimer(){

    timerInterval = setInterval(()=>{

        timeLeft--;

        timer.textContent = timeLeft;

        if(timeLeft <= 0){

            clearInterval(timerInterval);

            checkAnswer(-1);

        }

    },1000);

}

// ================================
// Select Answer
// ================================

function selectAnswer(element,index){

    if(selectedAnswer !== null) return;

    selectedAnswer = index;

    checkAnswer(index);

}

// ================================
// Check Answer
// ================================

function checkAnswer(index){

    clearInterval(timerInterval);

    const q = quiz[currentQuestion];

    const allAnswer = document.querySelectorAll(".answer");

    allAnswer.forEach(btn=>{

        btn.style.pointerEvents = "none";

    });

    allAnswer[q.answer].classList.add("correct");

    if(index === q.answer){

        score += 10;

        correctAnswer++;

    }else{

        wrongAnswer++;

        if(index !== -1){

            allAnswer[index].classList.add("wrong");

        }

    }

    nextBtn.disabled = false;

}

// ================================
// NEXT BUTTON
// ================================

nextBtn.addEventListener("click", nextQuestion);

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < quiz.length) {

        showQuestion();

    } else {

        showResult();

    }

}

// ================================
// RESULT
// ================================

function showResult() {

    quizScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");

    finalScore.textContent = score;

    correct.textContent = correctAnswer;

    wrong.textContent = wrongAnswer;

    const percent = Math.round((correctAnswer / quiz.length) * 100);

    accuracy.textContent = percent + "%";

    if (score == 100) {

        grade.textContent = "Grade A+ 🏆";

    } else if (score >= 90) {

        grade.textContent = "Grade A";

    } else if (score >= 80) {

        grade.textContent = "Grade B";

    } else if (score >= 70) {

        grade.textContent = "Grade C";

    } else if (score >= 60) {

        grade.textContent = "Grade D";

    } else {

        grade.textContent = "Grade E";

    }

    // High Score

    let best = Number(localStorage.getItem("highScore"));

    if (score > best) {

        localStorage.setItem("highScore", score);

        highScore.textContent = score;

    }

}

// ================================
// PLAY AGAIN
// ================================

restartBtn.addEventListener("click", restartQuiz);

function restartQuiz() {

    resultScreen.classList.add("hidden");

    startScreen.classList.remove("hidden");

    playerNameInput.value = "";

}

// ================================
// ENTER KEY
// ================================

playerNameInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        startQuiz();

    }

});