const quizQuestions = [
    {
        question: "What is the heart rhythm shown in the image?",
        image: "images/AF1.jpg",
        options: ["Normal Sinus Rhythm", "Atrial Fibrillation", "Ventricular Tachycardia", "Bradycardia"],
        correctAnswer: "Atrial Fibrillation",
    },
    {
        question: "What is the heart rhythm shown in this ECG?",
        image: "images/VF1.jpg",
        options: ["Normal Sinus Rhythm", "Atrial Fibrillation", "Ventricular Fibrillation", "Asystole"],
        correctAnswer: "Ventricular Fibrillation",
    },
    {
        question: "Identify the pattern in the ECG image:",
        image: "images/vtach1.jpg",
        options: ["Normal Sinus Rhythm", "Ventricular Tachycardia", "Atrial Fibrillation", "Bradycardia"],
        correctAnswer: "Ventricular Tachycardia",
    },
    {
        question: "What does the ECG image indicate?",
        image: "images/Sbrady1.jpg",
        options: ["Bradycardia", "Normal Sinus Rhythm", "Ventricular Tachycardia", "Atrial Fibrillation"],
        correctAnswer: "Bradycardia",
    },
    {
        question: "What can be identified in this ECG?",
        image: "images/peri1.jpg",
        options: ["Asystole", "Normal Sinus Rhythm", "Pericarditis", "Ventricular Tachycardia"],
        correctAnswer: "Pericarditis",
    },
];

let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let incorrectAnswersCount = 0;

const questionElement = document.getElementById("question");
const imageElement = document.getElementById("ecg-image");
const answersList = document.getElementById("answers");
const submitButton = document.getElementById("submit-btn");
const nextButton = document.getElementById("next-btn");

function loadQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    imageElement.src = currentQuestion.image;
    imageElement.alt = "ECG Image";

    answersList.innerHTML = ''; // Clear previous answers
    currentQuestion.options.forEach(option => {
        const li = document.createElement("li");
        li.textContent = option;
        li.onclick = () => handleAnswerClick(li, option);
        answersList.appendChild(li);
    });

    submitButton.disabled = true;
    nextButton.style.display = "none";

    updateProgressBar();
}

function handleAnswerClick(answerElement, selectedAnswerOption) {
    Array.from(answersList.children).forEach(answer => answer.classList.remove("selected"));
    answerElement.classList.add("selected");
    selectedAnswer = selectedAnswerOption;
    submitButton.disabled = false;
}

function checkAnswer() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const answers = answersList.children;

    Array.from(answers).forEach(answer => {
        if (answer.textContent === currentQuestion.correctAnswer) {
            answer.classList.add("correct");
        } else if (answer.textContent === selectedAnswer) {
            answer.classList.add("incorrect");
        }
    });

    if (selectedAnswer === currentQuestion.correctAnswer) correctAnswersCount++;
    else incorrectAnswersCount++;

    updateScoreDisplay();
    Array.from(answers).forEach(answer => (answer.onclick = null));
    submitButton.disabled = true;
    nextButton.style.display = "inline-block";
}

nextButton.onclick = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        alert("Quiz completed!");
    }
};

function updateScoreDisplay() {
    document.getElementById("correct-score").textContent = correctAnswersCount;
    document.getElementById("incorrect-score").textContent = incorrectAnswersCount;
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
}

window.onload = loadQuestion;
submitButton.onclick = checkAnswer;
