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
    var currentQuestion = 1;
    var interval;

    function startTimer() {
        interval = setInterval(function() {
            timer--;
            timerEl.textContent = timer;
            if (currentQuestion > 5 || timer <= 0) {
                endQuiz();
            }
        }, 1000);
    }

    function showNextQuestion() {
        var currentQuestionDiv = document.getElementById('question' + currentQuestion);
        currentQuestionDiv.style.display = 'none';
        currentQuestion++;
        if (currentQuestion <= 5) {
            var nextQuestionDiv = document.getElementById('question' + currentQuestion);
            nextQuestionDiv.style.display = 'block';
        } else {
            endQuiz();
        }
    }

    function endQuiz() {
        clearInterval(interval);
        quizContainer.style.display = 'none';
        leaderboard.style.display = 'block';
    }

    function submitScore(event) {
        event.preventDefault();
        var initials = initialsInput.value;
        var scoreData = JSON.parse(localStorage.getItem('scores')) || [];
        scoreData.push({ initials: initials, score: 60 - timer });
        localStorage.setItem('scores', JSON.stringify(scoreData));
        
        for (var i = 0; i < scoreData.length; i++) {
            var li = document.createElement('li');
            li.textContent = scoreData[i].initials + ' - ' + scoreData[i].score + ' seconds ';
            scoresList.appendChild(li);
        }
        
        // Add a "Return to Quiz" button on the leaderboard page
        var returnButton = document.createElement('button');
        returnButton.textContent = 'Return to Quiz';
        returnButton.id = 'return-btn';
        scoresList.appendChild(returnButton);
        
        // Add event listener for return button
        returnButton.addEventListener('click', function() {
            window.location.href = 'index.html'; // Redirect to quiz page
        });
    }

    startButton.addEventListener('click', function() {
        startButton.style.display = 'none';
        quizContainer.style.display = 'block';
        document.getElementById('question1').style.display = 'block';
        startTimer();
    });

    scoreForm.addEventListener('submit', submitScore);
    quizQuestions.addEventListener('click', function(event) {
        if (event.target.classList.contains('next-btn')) {
            showNextQuestion();
        }
    });
});
