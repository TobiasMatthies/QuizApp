let questionsHTML = [{
    "question": "Für was steht HTML?",
    "answer1": "hyperlinks and Markup Language",
    "answer2": "home Tool Markup Language",
    "answer3": "hypertext Markup Language",
    "answer4": "hypertext Makeup Language",
    "rightAnswer": 3,
},
{
    "question": "Wer definiert Web Standards?",
    "answer1": "google",
    "answer2": "the Worldwide Web Consortium",
    "answer3": "mozilla",
    "answer4": "microsoft",
    "rightAnswer": 2,
},
{
    "question": "Wähle das richtige tag für die größte Überschrift",
    "answer1": "h1",
    "answer2": "heading",
    "answer3": "h6",
    "answer4": "head",
    "rightAnswer": 1,
},
{
    "question": "Wähle das richtige tag um wichtigen Text zu markieren",
    "answer1": "b",
    "answer2": "important",
    "answer3": "strong",
    "answer4": "i",
    "rightAnswer": 3,
},
{
    "question": "Welches Attribut brauchst du für einen hyperlink?",
    "answer1": "url",
    "answer2": "name",
    "answer3": "keines, einfach den Pfad",
    "answer4": "href",
    "rightAnswer": 4,
},
{
    "question": "Welches Symbol kennzeichnet ein schließendes tag?",
    "answer1": "*",
    "answer2": "<",
    "answer3": "/",
    "answer4": "`",
    "rightAnswer": 3,
},
{
    "question": "Welches tag brauchst du, um eine nummerierte Liste zu machen?",
    "answer1": "ol",
    "answer2": "list",
    "answer3": "dl",
    "answer4": "ul",
    "rightAnswer": 1,
}
];


let questionsCSS = [{
    "question": "Für was steht CSS?",
    "answer1": "colorful style sheets",
    "answer2": "computer style sheets",
    "answer3": "cascading style sheets",
    "answer4": "creative style sheets",
    "rightAnswer": 3,
},
{
    "question": "Mit welchem tag bindet man ein stylesheet ein?",
    "answer1": "script",
    "answer2": "link",
    "answer3": "style",
    "answer4": "stylesheet",
    "rightAnswer": 2,
},
{
    "question": "In welchem Teil eines HTML Dokuments wird ein externes stylesheet eingebunden?",
    "answer1": "im body",
    "answer2": "im footer",
    "answer3": "am Ende des Dokuments",
    "answer4": "im head",
    "rightAnswer": 4,
},
{
    "question": "Mit welchem Attribut definiert man inline CSS?",
    "answer1": "style",
    "answer2": "styles",
    "answer3": "font",
    "answer4": "class",
    "rightAnswer": 1,
},
{
    "question": "Wie definiert man einen Kommentar in CSS?",
    "answer1": "// Ich bin ein Kommentar ",
    "answer2": "'Ich bin ein Kommentar",
    "answer3": "// Ich bin ein Kommentar //",
    "answer4": "/* Ich  bin ein Kommentar*/",
    "rightAnswer": 4,
},
{
    "question": "Welche CSS property bestimmt die Größe eines Textes?",
    "answer1": "text-size",
    "answer2": "font-style",
    "answer3": "font-size",
    "answer4": "text-style",
    "rightAnswer": 3,
},
{
    "question": "Mit welcher property ändert man die Schriftart eines Elements?",
    "answer1": "font-weight",
    "answer2": "font-family",
    "answer3": "font-size",
    "answer4": "text-style",
    "rightAnswer": 2,
},
]


let array = questionsHTML;
let score = 0;
let currentQuestion = 0;
let currentQuestionShown = currentQuestion + 1;
let questionsLenght = array.length;
let audioRight = new Audio('./audio/right.mp3');
let audioWrong = new Audio('./audio/wrong.mp3');

function init() {
    updateContainer();
}


function updateContainer() {
    let percent = currentQuestion / array.length;
    percent = Math.round(percent * 100);

    document.getElementById('question_body').innerHTML = '';
    document.getElementById('question_body').innerHTML += cardTemplate(); 

    document.getElementById('progress_bar').innerHTML = `${percent}%`;
    document.getElementById('progress_bar').style = `width: ${percent}%`;

    if (currentQuestion == 6) {
        button.innerHTML = 'Ergebnis';
        button.onclick = showScore;
    }
}


function cardTemplate() {
    let questionPosition = array[currentQuestion];
    return /*html*/`
    <h5 class="card-title">${questionPosition.question}</h5>

    <div onclick="chooseAnswer(1)" class="card answer_container" id="answer_container1">
      <div class="card-body option_on_hover" id="answer1">
          ${questionPosition.answer1}
      </div>
    </div>

    <div onclick="chooseAnswer(2)" class="card answer_container" id="answer_container2">
      <div class="card-body option_on_hover" id="answer2">
      ${questionPosition.answer2}
      </div>
    </div>

    <div onclick="chooseAnswer(3)" class="card answer_container" id="answer_container3">
      <div class="card-body option_on_hover" id="answer3">
      ${questionPosition.answer3}
      </div>
    </div>

    <div onclick="chooseAnswer(4)" class="card answer_container" id="answer_container4">
      <div class="card-body option_on_hover" id="answer4">
      ${questionPosition.answer4}
      </div>
    </div>

    <div id="question_footer">
      <div id="question_footer_first_row">
        <span><b>${currentQuestionShown}</b> von <b>${questionsLenght}</b></span>
        <button onclick="nextQuestion()" type="button" class="btn btn-primary" id="button" disabled>Nächste Frage</button>
      </div>

      <div class="progress" id="progress_bar_container">
       <div class="progress-bar" id="progress_bar" role="progressbar" style="width: 25%;"></div>
      </div>
    </div>`;
}


function chooseAnswer(answer) {
    let arrayPosition = array[currentQuestion];
    let correctAnswer = document.getElementById('answer_container' + arrayPosition.rightAnswer);
    correctAnswer.classList.add('right_answer');
   
    disableAnswers();

    if (answer == arrayPosition.rightAnswer) {
        rightAnswer();
    } else {
       wrongAnswer(answer);
    }
    document.getElementById('button').disabled = false;
}


function rightAnswer() {
    audioRight.play();
        score++;
}


function wrongAnswer(answer) {
    audioWrong.play();
    document.getElementById('answer' + answer).classList.add('wrong_answer');
}


function disableAnswers() {
    for (let i = 1; i < 5; i++) {
        document.getElementById('answer_container' + i).onclick = null;
        document.getElementById('answer' + i).classList.remove('option_on_hover');
    }
}


function nextQuestion() {
    currentQuestion++;
    currentQuestionShown++;
    updateContainer();
}


function showScore() {
    document.getElementById('question_container').classList.add('d-none');
    document.getElementById('endscreen').classList.remove('d-none');
    document.getElementById('score_count').innerHTML = `${score}`;
}


function switchToHTML() {
    array = questionsHTML;
    currentQuestion = 0;
    currentQuestionShown = currentQuestion +1;
    score = 0;

    document.getElementById('question_container').classList.remove('d-none');
    document.getElementById('endscreen').classList.add('d-none');
    updateContainer();

    document.getElementById('mark1').classList.remove('d-none');
    document.getElementById('mark2').classList.add('d-none');
}


function switchToCSS() {
    array = questionsCSS;
    currentQuestion = 0;
    currentQuestionShown = currentQuestion +1;
    score = 0;

    document.getElementById('question_container').classList.remove('d-none');
    document.getElementById('endscreen').classList.add('d-none');
    updateContainer();

    document.getElementById('mark1').classList.add('d-none');
    document.getElementById('mark2').classList.remove('d-none');
}

function restartGame() {
    currentQuestion = 0;
    currentQuestionShown = currentQuestion +1;
    score = 0;
    
    document.getElementById('question_container').classList.remove('d-none');
    document.getElementById('endscreen').classList.add('d-none');
    updateContainer();
}