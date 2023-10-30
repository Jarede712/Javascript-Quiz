document.addEventListener('DOMContentLoaded', function() {
    var timerEl = document.getElementById('timer');
    var quizContainer = document.getElementById('quiz-container');
    var quizQuestions = document.getElementById('quiz-questions');
    var leaderboard = document.getElementById('leaderboard');
    var scoresList = document.getElementById('scores');
    var scoreForm = document.getElementById('score-form');
    var initialsInput = document.getElementById('initials');

    var timer = 60;
    var currentQuesion = 1;
    var interval;

    function startTimer() {
        interval = setInterval(function() {
            timer--;
            timerEl.textContent = timer;
            if (timer <= 0 || currentQuesion > 5) {
                endQuiz();
            }
        }, 1000);
    }

    function showNextQuestion() {
        var currentQuestionDiv = document.getElementById('question' + currentQuesion);
        currentQuestionDiv.style.display = 'none';
        currentQuesion++;
        if (currentQuesion <= 5) {
            var nextQuestionDiv = document.getElementById('question' + currentQuesion);
            nextQuestionDiv.style.display = 'block';
        } else {
            endQuiz();
        }
    }
})