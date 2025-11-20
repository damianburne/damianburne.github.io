// Application state
const state = {
    selectedLevel: null,
    selectedTense: null,
    currentExercise: null,
    score: 0,
    streak: 0,
    answeredCorrectly: false
};

// DOM elements
const levelSelection = document.getElementById('levelSelection');
const tenseSelection = document.getElementById('tenseSelection');
const tenseButtons = document.getElementById('tenseButtons');
const exerciseArea = document.getElementById('exerciseArea');
const questionPrompt = document.getElementById('questionPrompt');
const answerOptions = document.getElementById('answerOptions');
const feedback = document.getElementById('feedback');
const lessonModal = document.getElementById('lessonModal');
const lessonTitle = document.getElementById('lessonTitle');
const lessonContent = document.getElementById('lessonContent');
const conjugationTable = document.getElementById('conjugationTable');
const backBtn = document.getElementById('backBtn');
const closeLesson = document.getElementById('closeLesson');
const continueBtn = document.getElementById('continueBtn');
const scoreDisplay = document.getElementById('score');
const streakDisplay = document.getElementById('streak');
const tenseBadge = document.getElementById('tenseBadge');

// Initialize app
function init() {
    setupEventListeners();
}

function setupEventListeners() {
    // Level selection
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', () => selectLevel(btn.dataset.level));
    });

    // Back button
    backBtn.addEventListener('click', goBack);

    // Modal controls
    closeLesson.addEventListener('click', closeModal);
    continueBtn.addEventListener('click', () => {
        closeModal();
        nextExercise();
    });

    // Close modal on background click
    lessonModal.addEventListener('click', (e) => {
        if (e.target === lessonModal) {
            closeModal();
        }
    });
}

function selectLevel(level) {
    state.selectedLevel = level;

    // Update UI
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');

    // Show tense selection
    showTenseSelection(level);
}

function showTenseSelection(level) {
    const tenses = TENSES_BY_LEVEL[level];

    // Clear previous buttons
    tenseButtons.innerHTML = '';

    // Create tense buttons
    tenses.forEach(tense => {
        const btn = document.createElement('button');
        btn.className = 'tense-btn';
        btn.textContent = tense.name;
        btn.dataset.tense = tense.id;
        btn.addEventListener('click', () => startPractice(tense.id, tense.name));
        tenseButtons.appendChild(btn);
    });

    tenseSelection.classList.remove('hidden');
}

function startPractice(tenseId, tenseName) {
    state.selectedTense = tenseId;
    state.score = 0;
    state.streak = 0;

    // Update UI
    tenseBadge.textContent = tenseName;
    updateScore();

    // Hide level selection, show exercise area
    levelSelection.classList.add('hidden');
    exerciseArea.classList.remove('hidden');

    // Load first exercise
    nextExercise();
}

function nextExercise() {
    // Generate new exercise
    state.currentExercise = getRandomExercise(state.selectedTense);
    state.answeredCorrectly = false;

    // Display exercise
    displayExercise();
}

function displayExercise() {
    const exercise = state.currentExercise;

    // Set question
    questionPrompt.innerHTML = `Complete the sentence:<br><strong>${exercise.question}</strong>`;

    // Clear previous options
    answerOptions.innerHTML = '';

    // Create answer buttons
    exercise.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = option;
        btn.addEventListener('click', () => checkAnswer(option, btn));
        answerOptions.appendChild(btn);
    });

    // Hide feedback
    feedback.classList.add('hidden');
    feedback.classList.remove('correct', 'incorrect');
}

function checkAnswer(selectedAnswer, button) {
    const exercise = state.currentExercise;
    const isCorrect = selectedAnswer === exercise.correctAnswer;

    // Disable all buttons
    document.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);

    // Mark selected answer
    if (isCorrect) {
        button.classList.add('correct');
        handleCorrectAnswer();
    } else {
        button.classList.add('incorrect');

        // Show correct answer
        document.querySelectorAll('.answer-btn').forEach(btn => {
            if (btn.textContent === exercise.correctAnswer) {
                btn.classList.add('correct');
            }
        });

        handleIncorrectAnswer();
    }
}

function handleCorrectAnswer() {
    state.score++;
    state.streak++;
    state.answeredCorrectly = true;
    updateScore();

    // Show green tick
    showFeedback(true);

    // Auto-advance after 1 second
    setTimeout(() => {
        nextExercise();
    }, 1000);
}

function handleIncorrectAnswer() {
    state.streak = 0;
    updateScore();

    // Show red cross
    showFeedback(false);

    // Show lesson after 1 second
    setTimeout(() => {
        showLesson();
    }, 1000);
}

function showFeedback(isCorrect) {
    feedback.classList.remove('hidden');
    feedback.classList.add(isCorrect ? 'correct' : 'incorrect');

    // Auto-hide after animation
    setTimeout(() => {
        feedback.classList.add('hidden');
    }, 1000);
}

function showLesson() {
    const exercise = state.currentExercise;
    const verbData = VERBS[exercise.verb];
    const lesson = exercise.explanation;

    // Set lesson content
    lessonTitle.textContent = lesson.title;
    lessonContent.innerHTML = `
        <p><strong>Translation:</strong> ${verbData.translation}</p>
        <p>${lesson.explanation}</p>
        <p><em>${lesson.usage}</em></p>
    `;

    // Create conjugation table
    const conjugations = verbData.tenses[exercise.tense];
    let tableHTML = '<h4>Full Conjugation</h4>';

    Object.entries(conjugations).forEach(([pronoun, conjugation]) => {
        tableHTML += `
            <div class="conjugation-row">
                <span class="pronoun">${pronoun}</span>
                <span class="conjugation">${conjugation}</span>
            </div>
        `;
    });

    conjugationTable.innerHTML = tableHTML;

    // Show modal
    lessonModal.classList.remove('hidden');
}

function closeModal() {
    lessonModal.classList.add('hidden');
}

function updateScore() {
    scoreDisplay.innerHTML = `Score: <strong>${state.score}</strong>`;
    streakDisplay.innerHTML = `Streak: <strong>${state.streak}</strong>`;
}

function goBack() {
    // Reset state
    state.selectedTense = null;
    state.currentExercise = null;
    state.score = 0;
    state.streak = 0;

    // Show level selection, hide exercise area
    exerciseArea.classList.add('hidden');
    levelSelection.classList.remove('hidden');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
