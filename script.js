document.addEventListener('DOMContentLoaded', function() {
    var timerEl = document.getElementById('timer');
    var quizContainer = document.getElementById('quiz-container');
    var quizQuestions = document.getElementById('quiz-questions');
    var leaderboard = document.getElementById('leaderboard');
    var scoresList = document.getElementById('scores');
    var scoreForm = document.getElementById('score-form');
    var initialsInput = document.getElementById('initials');
    var startButton = document.getElementById('start-quiz');

    var timer = 60;
    var currentQuestion = 0;
    var interval;
    var questions = [
        {
            question: "Commonly used data types DO NOT include:",
            options: ["strings", "booleans", "alerts", "numbers"],
            answer: "c"
        },
        {
            question: "The condition in an if / else statement is enclosed within ____.",
            options: ["quotes", "curly brackets", "parenthesis", "square brackets"],
            answer: "c"
        },
        {
            question: "Arrays in Javascript can be used to store ____.",
            options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
            answer: "d"
        },
        {
            question: "String values must be enclosed within _____ when being assigned to variables.",
            options: ["commas", "curly brackets", "quotes", "parenthesis"],
            answer: "c"
        },
        {
            question: "A very useful tool used during development and debugging for printing content to the debugger is:",
            options: ["JavaScript", "terminal/bash", "for loops", "console.log"],
            answer: "d"
        }
    ];

    function startTimer() {
        interval = setInterval(function() {
            timer--;
            timerEl.textContent = timer;
            if (timer <= 0) {
                endQuiz();
            }
        }, 1000);
    }

    function showNextQuestion() {
        var currentQuestionDiv = document.getElementById('question' + currentQuestion);
        currentQuestionDiv.style.display = 'none';
        currentQuestion++;
        if (currentQuestion < questions.length) {
            var nextQuestionDiv = createQuestionDiv(currentQuestion);
            quizQuestions.appendChild(nextQuestionDiv);
            nextQuestionDiv.style.display = 'block'; // Add this line
        } else {
            endQuiz();
        }
    }
    

    function createQuestionDiv(index) {
        var questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.id = 'question' + index;
        questionDiv.innerHTML = `
            <h2>Question ${index + 1}</h2>
            <p>${questions[index].question}</p>
            ${questions[index].options.map(option => `
                <label>
                    <input type="radio" name="q${index + 1}" value="${option.toLowerCase()}">
                    ${option}
                </label><br>
            `).join('')}
            <button class="next-btn">Next</button>
        `;
        questionDiv.style.display = 'none';
        return questionDiv;
    }

    function endQuiz() {
        clearInterval(interval);
        quizContainer.style.display = 'none';
        leaderboard.style.display = 'block';
    }

    function submitScore(event) {
        event.preventDefault();
        var initials = initialsInput.value;
        var score = timer;

        var scoreData = JSON.parse(localStorage.getItem('scores')) || [];
        scoreData.push({ initials: initials, score: score });
        localStorage.setItem('scores', JSON.stringify(scoreData));

        scoresList.innerHTML = scoreData.map(data => `
            <li>${data.initials} - ${data.score} seconds</li>
        `).join('');

        var returnButton = document.createElement('button');
        returnButton.textContent = 'Return to Quiz';
        returnButton.id = 'return-btn';
        scoresList.appendChild(returnButton);

        returnButton.addEventListener('click', function() {
            location.reload(); // Reload the page to start the quiz again
        });
    }

    startButton.addEventListener('click', function() {
        startButton.style.display = 'none';
        quizContainer.style.display = 'block';
        var firstQuestionDiv = createQuestionDiv(0);
        quizQuestions.appendChild(firstQuestionDiv);
        firstQuestionDiv.style.display = 'block'; // Add this line
        startTimer();
    });
    
    scoreForm.addEventListener('submit', submitScore);
    quizQuestions.addEventListener('click', function(event) {
        if (event.target.classList.contains('next-btn')) {
            showNextQuestion();
        }
    });
});
