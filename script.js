// ECG Interpretation Quiz Questions
const quizQuestions = [
    {
        question: "What is the heart rate for the following rhythm? (Assume regular rhythm)",
        answers: ["50 bpm", "75 bpm", "100 bpm", "150 bpm"],
        correctAnswer: 1, // Index of the correct answer
    },
    {
        question: "Which interval represents the PR interval on an ECG?",
        answers: [
            "The time from the start of the P wave to the start of the QRS complex",
            "The duration of the QRS complex",
            "The time between T wave and P wave",
            "The duration of the ST segment"
        ],
        correctAnswer: 0,
    },
    {
        question: "What does an elevated ST segment most commonly indicate?",
        answers: [
            "Ventricular fibrillation",
            "Myocardial infarction",
            "Atrial fibrillation",
            "Hypertension"
        ],
        correctAnswer: 1,
    },
    {
        question: "What is the significance of a prolonged QT interval?",
        answers: [
            "Risk of ventricular arrhythmias",
            "Increased risk of stroke",
            "Hypertrophy of the ventricles",
            "Normal finding in healthy individuals"
        ],
        correctAnswer: 0,
    },
    {
        question: "What type of rhythm does this ECG show?",
        answers: [
            "Normal sinus rhythm",
            "Atrial fibrillation",
            "Third-degree heart block",
            "Ventricular tachycardia"
        ],
        correctAnswer: 1,
    },
    // Add more ECG questions as needed
];

let currentQuestionIndex = 0;
let selectedAnswerIndex = null;

// Elements
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const submitButton = document.getElementById("submit-btn");
const nextButton = document.getElementById("next-btn");

// Load a Question
function loadQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = ""; // Clear previous answers
    currentQuestion.answers.forEach((answer, index) => {
        const li = document.createElement("li");
        li.textContent = answer;
        li.addEventListener("click", () => selectAnswer(index));
        answersElement.appendChild(li);
    });
    submitButton.disabled = true;
    nextButton.style.display = "none";
    selectedAnswerIndex = null;
}

// Select an Answer
function selectAnswer(index) {
    selectedAnswerIndex = index;
    Array.from(answersElement.children).forEach((li, i) => {
        li.classList.remove("selected");
        if (i === index) li.classList.add("selected");
    });
    submitButton.disabled = false;
}

// Submit an Answer
function submitAnswer() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    Array.from(answersElement.children).forEach((li, i) => {
        li.classList.remove("selected");
        if (i === currentQuestion.correctAnswer) li.classList.add("correct");
        else if (i === selectedAnswerIndex) li.classList.add("incorrect");
    });
    submitButton.disabled = true;
    nextButton.style.display = "inline-block";
}

// Move to the Next Question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        questionElement.textContent = "You've completed the quiz!";
        answersElement.innerHTML = "";
        submitButton.style.display = "none";
        nextButton.style.display = "none";
    }
}

// Event Listeners
submitButton.addEventListener("click", submitAnswer);
nextButton.addEventListener("click", nextQuestion);

// Start Quiz
loadQuestion();

