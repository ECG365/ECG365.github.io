// ECG Quiz Questions (with ECG images and answers)
const quizQuestions = [
    {
        question: "What is the heart rate for the following rhythm?",
        image: "images/normal-sinus-rhythm.png",  // Example ECG image
        answers: ["50 bpm", "75 bpm", "100 bpm", "150 bpm"],
        correctAnswer: 1,  // The correct answer is the second option: 75 bpm
    },
    {
        question: "What does an elevated ST segment most commonly indicate?",
        answers: [
            "Ventricular fibrillation",
            "Myocardial infarction",
            "Atrial fibrillation",
            "Hypertension"
        ],
        correctAnswer: 1, // Myocardial infarction
    },
    {
        question: "What type of rhythm does this ECG show?",
        image: "images/atrial-fibrillation.png",  // Example ECG image
        answers: [
            "Normal sinus rhythm",
            "Atrial fibrillation",
            "Third-degree heart block",
            "Ventricular tachycardia"
        ],
        correctAnswer: 1, // Atrial fibrillation
    },
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let selectedAnswerIndex = null;

// HTML Elements
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const submitButton = document.getElementById("submit-btn");
const nextButton = document.getElementById("next-btn");
const questionImageElement = document.getElementById("question-image");

// Load the Current Question
function loadQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    questionElement.textContent = currentQuestion.question;

    // Load the image if available
    if (currentQuestion.image) {
        const img = document.createElement("img");
        img.src = currentQuestion.image;
        img.alt = "ECG Image";
        img.style.maxWidth = "100%";
        questionImageElement.innerHTML = ''; // Clear previous image if any
        questionImageElement.appendChild(img);
    }

    // Load the answer options
    answersElement.innerHTML = '';
    currentQuestion.answers.forEach((answer, index) => {
        const li = document.createElement("li");
        li.textContent = answer;
        li.addEventListener("click", () => selectAnswer(index));
        answersElement.appendChild(li);
    });

    submitButton.disabled = true; // Disable submit until an answer is selected
    nextButton.style.display = "none"; // Hide the next button initially
    selectedAnswerIndex = null; // Reset selected answer
}

// Select an Answer
function selectAnswer(index) {
    selectedAnswerIndex = index;
    Array.from(answersElement.children).forEach((li, i) => {
        li.classList.remove("selected");
        if (i === index) li.classList.add("selected");
    });
    submitButton.disabled = false; // Enable the submit button after selecting an answer
}

// Submit Answer
function submitAnswer() {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    Array.from(answersElement.children).forEach((li, i) => {
        li.classList.remove("selected");
        if (i === currentQuestion.correctAnswer) {
            li.classList.add("correct"); // Green for correct answer
        } else if (i === selectedAnswerIndex) {
            li.classList.add("incorrect"); // Red for incorrect answer
        }
    });

    submitButton.disabled = true; // Disable submit after submission
    nextButton.style.display = "inline-block"; // Show next question button
}

// Move to the Next Question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        questionElement.textContent = "Quiz Complete!";
        answersElement.innerHTML = '';
        submitButton.style.display = "none";
        nextButton.style.display = "none";
    }
}

// Event Listener for Submit Button
submitButton.addEventListener("click", submitAnswer);

// Start the Quiz
loadQuestion();
