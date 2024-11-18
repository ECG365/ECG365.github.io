const quizQuestions = [
    {
        question: "What is the heart rhythm shown in the image?",
        image: "ECGImages/AF1", // Make sure the image exists in the 'images' folder
        options: ["Normal Sinus Rhythm", "Atrial Fibrillation", "Ventricular Tachycardia", "Bradycardia"],
        correctAnswer: "Atrial Fibrillation"
    },
    {
        question: "What is the heart rhythm shown in this ECG?",
        image: "ECGImages/VF1",
        options: ["Normal Sinus Rhythm", "Atrial Fibrillation", "Ventricular Fibrillation", "Asystole"],
        correctAnswer: "Ventricular Fibrillation"
    }
];

let currentQuestionIndex = 0;

const questionElement = document.getElementById("question");
const imageElement = document.getElementById("ecg-image");
const answersList = document.getElementById("answers");
const submitButton = document.getElementById("submit-btn");
const nextButton = document.getElementById("next-btn");

function loadQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    imageElement.src = currentQuestion.image;

    // Clear previous answers
    answersList.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const li = document.createElement("li");
        li.textContent = option;
        li.onclick = () => handleAnswerClick(li, option);
        answersList.appendChild(li);
    });

    submitButton.disabled = false;
    nextButton.style.display = "none";
}

function handleAnswerClick(answerElement, selectedAnswer) {
    // Mark the selected answer
    const answers = answersList.getElementsByTagName("li");
    for (let answer of answers) {
        answer.classList.remove("selected");
    }
    answerElement.classList.add("selected");

    // Enable the submit button
    submitButton.disabled = false;

    // Handle answer check on submit
    submitButton.onclick = () => checkAnswer(selectedAnswer);
}

function checkAnswer(selectedAnswer) {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    // Highlight correct and incorrect answers
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
loadQuestion();
