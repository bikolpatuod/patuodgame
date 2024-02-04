document.addEventListener('DOMContentLoaded', function () {
    // ARRAY OF OBJECTS
    const questions = [
        // OBJECT CATEGORY
        { category: 'Object', question: 'Yugyog sa kabalagun an huning kapunayan', answer: 'gitara', status: true},
        { category: 'Object', question: 'Harong ko sa bulod\nSaro-saro an tukod', answer: 'tubo', status: true},
        { category: 'Object', question: 'Bakong tao, bakong hayop\nMaitom ang payo', answer: 'palito', status: true},
        { category: 'Object', question: 'Bakong tao, bakong hayop\nNagsusulot plantsado', answer: 'ulunan', status: true},
        { category: 'Object', question: 'Binotong ko si balagon\nNaribok si maghapon', answer: 'kampana', status: true},
        { category: 'Object', question: 'Kun basog tindog\nKun gutom lup-og', answer: 'sako', status: true},
        { category: 'Object', question: 'May ngipon daeng ngimot\nMay bitis daeng kamot', answer: 'kudkudan', status: true},
        { category: 'Object', question: 'Labi an rutab rutab\nMantang naglulutab', answer: 'kandila', status: true},
        { category: 'Object', question: 'May lalawgon mayong mata, may kamot mayong takyag\nKun nagagadan dae nalalapa', answer: 'relo', status: true},
        { category: 'Object', question: 'Talodtod nin buaya\nMaghapon balada', answer: 'atop', status: true},
        { category: 'Object', question: 'Kun ati hararom\n Kun taob hababaw', answer: 'dulay', status: true},
        { category: 'Object', question: 'Kapti an ikog ko\nTa maladop ako', answer: 'tabo', status: true},
        { category: 'Object', question: 'Dara mo, dara ka\nDara pa an saimong dara', answer: 'sapatos', status: true},
        { category: 'Object', question: 'Pagkaaga minatindog\nPagkabang gi lupaypay', answer: 'banig', status: true},
        { category: 'Object', question: 'Saro an nilaugan\nTulo an niluwasan', answer: 'bado', status: true},
        { category: 'Object', question: 'Kargada ni ama mo\nNagliligid sa abo', answer: 'tabayop', status: true},
        { category: 'Object', question: 'Ikog kan Karabaw\nNakaabot sa mindanao', answer: 'Kable kan kuryente', status: true},
        { category: 'Object', question: 'Binakal kong itom\nGinamit kong pula\nKan apuna nagin abo', answer: 'oring', status: true},
        { category: 'Object', question: 'Ikog kan amid\nNakasablay sa bukid', answer: 'dalan', status: true},
        { category: 'Object', question: 'Tulong magturugang ning mapuputi an daghan', answer: 'Taluhong', status: true},
    ]

    // GAMEPLAY SECTION
    const answerContainer = document.querySelector('.answer-container');
    const questionParagraph = document.querySelector('.question');
    const scoreParagraph = document.querySelector('.score p');
    const highscoreSection = document.querySelector('.highscore-section');


    let currentQuestionIndex = 0;
    let score = 0;

    // RANDOM QUESTION FUNCTIONALITY
    function getRandomQuestion() {
        // Filter out the answered questions
        const unansweredQuestions = questions.filter(q => q.status);
    
        // Check if there are still unanswered questions
        if (unansweredQuestions.length > 0) {
            // Pick a random index from the unanswered questions
            const randomIndex = Math.floor(Math.random() * unansweredQuestions.length);
            // Get the randomly selected question
            const randomQuestion = unansweredQuestions[randomIndex];
            return randomQuestion;
        } else {
            // All questions have been answered, return null
            return null;
        }
    }

    // GENERATE INPUT TAGS
    function generateInputs(word, question) {
        answerContainer.innerHTML = '';

        // Check if the question is already answered
        if (!question.status) {
            // If the question is answered, display a message or handle it as needed
            console.log('Question already answered:', question);
            return;
        }

        for (let i = 0; i < word.length; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            answerContainer.appendChild(input);

            if (i > 0) {
                input.disabled = true;
            }

            input.addEventListener('input', function () {
                if (i < word.length - 1 && input.value) {
                    answerContainer.children[i + 1].disabled = false;
                    answerContainer.children[i + 1].focus();
                }

                // Check if the entire word is filled in
                const isWordFilledIn = Array.from(answerContainer.children).every(input => input.value);
                
                if (isWordFilledIn && Array.from(answerContainer.children).every(input => input.value.toLowerCase() === word.charAt(Array.from(answerContainer.children).indexOf(input)).toLowerCase())) {
                    // Mark the question as answered
                    question.status = false;
                    playCorrectSound();
                    // Word is correct, add the "CORRECT" animation and proceed to the next question or highscore if all questions are answered
                    const correctElement = document.createElement('h1');
                    correctElement.classList.add('animate__animated', 'animate__flash','animate__faster', 'correct-text');
                    correctElement.textContent = 'CORRECT';
                    document.body.appendChild(correctElement);

                    setTimeout(() => {
                        document.body.removeChild(correctElement);

                        currentQuestionIndex++;
                        score += 100;
                        if (currentQuestionIndex < questions.length) {
                            displayQuestion(currentQuestionIndex);
                        } else {
                            displayHighscore();
                        }
                    }, 1000); // Adjust the delay as needed
                } else if (isWordFilledIn) {
                    playIncorrectSound();
                    // Incorrect answer handling
                    const incorrectElement = document.createElement('h1');
                    incorrectElement.classList.add('animate__animated', 'animate__flash','animate__faster', 'incorrect-text');
                    incorrectElement.textContent = 'INCORRECT';
                    document.body.appendChild(incorrectElement);

                    setTimeout(() => {
                        document.body.removeChild(incorrectElement);

                        // Mark the question as answered
                        question.status = false;

                        // Proceed to the next question
                        currentQuestionIndex++;
                        if (currentQuestionIndex < questions.length) {
                            displayQuestion(currentQuestionIndex);
                        } else {
                            displayHighscore();
                        }
                    }, 1000); // Adjust the delay as needed
                }
            });

            input.addEventListener('keydown', function (e) {
                if (e.key === 'Backspace') {
                    input.value = '';
                    if (i > 0) {
                        answerContainer.children[i - 1].focus();
                        answerContainer.children[i + 1].disabled = true;
                    }
                }
            });
        }

        // Set autofocus to true for the first input
        answerContainer.children[0].focus();
    }
    
    function displayQuestion() {
        const currentQuestion = getRandomQuestion();
    
        if (currentQuestion) {
            const formattedQuestion = currentQuestion.question.replace(/\n/g, '<br>');
            questionParagraph.innerHTML = `${formattedQuestion}`;
            scoreParagraph.textContent = `SCORE: ${score}`;
            generateInputs(currentQuestion.answer, currentQuestion);
        } else {
            // All questions answered, proceed to highscore
            displayHighscore();
        }
    }
    
    function displayHighscore() {
        // Display high score
        highscoreSection.style.display = 'block';
        gameplaySection.style.display = 'none';
    
        // Display the final score in the highscore section
        const highscoreParagraph = document.querySelector('.highscore p');
        highscoreParagraph.textContent = `${score}`;
    
        // Reset the score and question for the next game
        currentQuestionIndex = 0;
        score = 0;
    }

    document.getElementById('passBtn').addEventListener('click', function () {
        // Mark the current question as answered (status = false)
        if (currentQuestionIndex < questions.length) {
            questions[currentQuestionIndex].status = false;
        }
    
        // Proceed to the next question or highscore if all questions are answered
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion(currentQuestionIndex);
        } else {
            displayHighscore();
        }
    });

    document.getElementById('shuffleBtn').addEventListener('click', function () {
        displayQuestion(currentQuestionIndex);
    })

    displayQuestion(currentQuestionIndex);

    const gameplaySection = document.querySelector('.gameplay-section');
    const resumeBtnBtn = document.getElementById('resumeBtn');

    //GAMEPLAY SETTING
    const gpSettingBtn = document.getElementById('gpSettingBtn');
    const gameplaySettingSection = document.querySelector('.gameplay-setting');

    gpSettingBtn.addEventListener('click', function () {
        gameplaySettingSection.style.display = 'block';
        gameplaySection.style.display = 'none';
    });
    
    //RESUME
    resumeBtnBtn.addEventListener('click', function () {
        gameplaySettingSection.style.display = 'none';
        gameplaySection.style.display = 'block';
    });

    //RESTART
    restartBtn.addEventListener('click', function () {
        currentQuestionIndex = 0;
        score = 0;
        gameplaySection.style.display = 'block';
        gameplaySettingSection.style.display = 'none';
        displayQuestion(currentQuestionIndex);
        clickedSound.play();
    });

    function goToIndexPage() {
        window.location.href = 'index.html';
    }
    function playCorrectSound() {
        const correctSound = document.getElementById('correct');
        correctSound.play();
    }

    // Play incorrect sound
    function playIncorrectSound() {
        const incorrectSound = document.getElementById('incorrect');
        incorrectSound.play();
    }
    document.getElementById('quitBtn').addEventListener('click', goToIndexPage);
    document.getElementById('continueBtn').addEventListener('click', goToIndexPage);
})