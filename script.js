const quizQuestions = [
    {
        question: "What is the heart rhythm shown in the image?",
        image: "images/AF1.jpg", // Update with actual path
        options: ["Normal Sinus Rhythm", "Atrial Fibrillation", "Ventricular Tachycardia", "Bradycardia"],
        correctAnswer: "Atrial Fibrillation"
    },
    {
        question: "What is the heart rhythm shown in this ECG?",
        image: "images/VF1.jpg", // Update with actual path
        options: ["Normal Sinus Rhythm", "Atrial Fibrillation", "Ventricular Fibrillation", "Asystole"],
        correctAnswer: "Ventricular Fibrillation"
    },
    {
        question: "Identify the pattern in the ECG image:",
        image: "ecg-ventricular-tachycardia.png",
        options: ["Normal Sinus Rhythm", "Ventricular Tachycardia", "Atrial Fibrillation", "Bradycardia"],
        correctAnswer: "Normal Sinus Rhythm"
    },
    {
        question: "What does the ECG image indicate?",
        image: "ecg-bradycardia.png",
        options: ["Bradycardia", "Normal Sinus Rhythm", "Ventricular Tachycardia", "Atrial Fibrillation"],
        correctAnswer: "Bradycardia"
    },
    {
        question: "Which rhythm is shown in this ECG?",
        image: "ecg-asystole.png",
        options: ["Asystole", "Normal Sinus Rhythm", "Atrial Fibrillation", "Ventricular Tachycardia"],
        correctAnswer: "Asystole"
    }
];

let currentQuestionIndex = 0;
const questionElement = document.getElementById("question");
const imageElement = document.getElementById("ecg-image");
const answersList = document.getElementById("answers");
const submitButton = document.getElementById("submit-btn");
const nextButton = document.getElementById("next-btn");

let selectedAnswer = null;

function loadQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    imageElement.src = currentQuestion.image;

    // Clear previous answers
    answersList.innerHTML = '';

    // Populate answer options
    currentQuestion.options.forEach(option => {
        const li = document.createElement("li");
        li.textContent = option;
        li.onclick = () => handleAnswerClick(li, option);
        answersList.appendChild(li);
    });

    submitButton.disabled = true;
    nextButton.style.display = "none";
}

function handleAnswerClick(answerElement, selectedAnswerOption) {
    // Mark the selected answer
    const answers = answersList.getElementsByTagName("li");
    for (let answer of answers) {
        answer.classList.remove("selected");
    }
    answerElement.classList.add("selected");

    selectedAnswer = selectedAnswerOption;

    // Enable the submit button
    submitButton.disabled = false;
}

function checkAnswer() {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    const answers = answersList.getElementsByTagName("li");

    for (let answer of answers) {
        if (answer.textContent === currentQuestion.correctAnswer) {
            answer.classList.add("correct");
        } else if (answer.textContent === selectedAnswer) {
            answer.classList.add("incorrect");
        }
    }

    // Disable all answers after submission
    for (let answer of answers) {
        answer.onclick = null;
    }

    submitButton.disabled = true;
    nextButton.style.display = "inline-block";
}

nextButton.onclick = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        alert("You have completed the quiz!");
    }
};

// Load the first question on page load
window.onload = loadQuestion;

// Attach submit button click event
submitButton.onclick = checkAnswer;
