const questions = [
    { 
        question: 'What is the alter ego of Batman?',
        answers: [
            {text: 'Bruce Wayne', correct: true},
            {text: 'Clark Kent', correct: false},
            {text: 'Peter Parker', correct: false},
            {text: 'Tony Stark', correct: false},
        ]
    },
    { 
        question: "What is Superman's main superpower?",
        answers: [
            {text: 'Super speed', correct: false},
            {text: 'Flying', correct: true},
            {text: 'Regeneration', correct: false},
            {text: 'Telepathy', correct: false},
        ]
    },
    { 
        question: "Who is Spider-Man's arch-nemesis?",
        answers: [
            {text: 'Joker', correct: false},
            {text: 'Thanos', correct: false},
            {text: 'Green Goblin', correct: true},
            {text: 'Lex Luthor', correct: false},
        ]
    },
    { 
        question: "What is Wonder Woman's real name?",
        answers: [
            {text: 'Carol Danvers', correct: false},
            {text: 'Natasha Romanoff', correct: false},
            {text: 'Jean Grey', correct: false},
            {text: 'Diana Price', correct: true},
        ]
    },
    { 
        question: 'Which superheroe is known as "The Man of Steel"?',
        answers: [
            {text: 'Batman', correct: false},
            {text: 'Superman', correct: true},
            {text: 'Iron Man', correct: false},
            {text: 'Hulk', correct: false},
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }else{
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Score ${score} out of ${questions.length}`;
    nextButton.innerHTML = 'Restart';
    nextButton.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
