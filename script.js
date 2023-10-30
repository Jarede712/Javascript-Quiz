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
            if (timer <= 0) {
                endQuiz();
            }
        }, 1000);
    }
})