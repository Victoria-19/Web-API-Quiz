//Global variables
var time = 75;
var time_remaining = true;
var time_start = false;
var score = 0;
var i = 0;

// DOM elements
var countdownTimer = document.getElementById("countdownTimer");
var homeContainer = document.getElementById("homeContainer");
var quizContainer = document.getElementById("quizContainer");
var questionHeading = document.getElementById("questionHeading");
var answerChoices = [
  document.getElementById("answerChoiceA"),
  document.getElementById("answerChoiceB"),
  document.getElementById("answerChoiceC"),
  document.getElementById("answerChoiceD")
];
var high_scores = [];

// Questions array
var questionsArray = [
  {
    question: "Question 1: Arrays in Java Script are used to store?",
    answerChoice: ["A Numbers and Strings", "B Other Arrays", "C Booleans ", "D All of the above"],
    correctAnswer: 3
  },
  {
    question: "Question 2: Commonly used data types do NOT include? ",
    answerChoice: ["A Strings", "B Booleans", "C Alerts", " D Numbers"],
    correctAnswer: 2
  },
  {
    question: "Question 3: Creating an object is called",
    answerChoice: ["A Instantiation", "B Reference", "C Variable", "D Abstraction"],
    correctAnswer: 0
  },
  {
    question: "Question 4: What does HTML stand for?",
    answerChoice: ["A Hypertext Missing Language", "B High Text Markup Language", "C High Tea Markup Language", "D Hypertext Markup Language"],
    correctAnswer: 3
  },
  {
    question: "Question 5: What popular operating system, launched in 1991, also has its own mascot, Tux the penguin?",
    answerChoice: ["A Java", "B Linux", "C HTML", "D Python"],
    correctAnswer: 1
  },
];

// Countdown timer interval
var countdownTimerInterval = setInterval(setCountdownTimer, 1000);

// Event listeners
startBtn.addEventListener("click", startQuiz);
answerChoices.forEach((choice, index) => {
  choice.addEventListener("click", () => checkAnswer(index));
});

// Functions
function startQuiz() {
  quizContainer.style.display = "block";
  homeContainer.style.display = "none";
  countdownTimer.style.display = "block";
  document.getElementById("score_keeper").style.display = "block";
  document.getElementById("score").textContent = score;
  setCountdownTimer();
  setQuizQuestions();
  time_start = true;
}

function setCountdownTimer() {
  if (time_start) time--;
  if (time <= 0) {
    endQuiz();
    time = 0;
  }
  document.getElementById("timer").textContent = time;
}

function setQuizQuestions() {
  questionHeading.textContent = questionsArray[i].question;
  for (let j = 0; j < 4; j++) {
    answerChoices[j].textContent = questionsArray[i].answerChoice[j];
  }
}

function checkAnswer(choiceIndex) {
  const correctAnswer = questionsArray[i].correctAnswer;
  if (choiceIndex === correctAnswer) {
    document.getElementById("AnswerResponse").textContent = "Nailed it!";
    score++;
    document.getElementById("score").textContent = score;
  } else {
    time_remaining -= 5;
    document.getElementById("AnswerResponse").textContent = "Incorrect!";
  }
  setTimeout(() => {
    document.getElementById("AnswerResponse").textContent = "";
    if (i >= questionsArray.length - 1) {
      endQuiz();
    } else {
      i++;
      setQuizQuestions();
    }
  }, 1000);
}

function endQuiz() {
  document.getElementById("game_over").style.display = "block";
  quizContainer.style.display = "none";
  countdownTimer.style.display = "none";
  document.getElementById("score_keeper").style.display = "none";
  document.getElementById("AnswerResponse").textContent = "";
  document.getElementById("end_score").textContent = score;
}

function submit_scores() {
  high_scores.push(document.getElementById("initials").value + " " + score);
  viewHighScores();
  high_scores.push(document.getElementById("submit_initials").value + " " + score);
  viewHighScores();
}

function viewHighScores() {
  document.getElementById("quizContainer").style.display = "none";
  document.getElementById("game_over").style.display = "none";
  document.getElementById("high_scores_page").style.display = "block";
  
  document.getElementById("high_scores").textContent = high_scores.join(" ");
  clearUp();
}

function goHome() {
  document.getElementById("high_scores_page").style.display = "none";
  document.getElementById("homeContainer").style.display = "block";
  clearUp();
}

function clearHighScores() {
  high_scores = [];
}

function clearUp() {
  time = 75;
  time_remaining = true;
  time_start = false;
  i = 0;
  score = 0;
}
