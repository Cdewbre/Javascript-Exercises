//initialize the game. Set score to zero, display opening text

var score, gamePlaying, randomItem, questionCount;
    
document.getElementById('answer-btn').style.display = 'none';
document.getElementById('next-btn').style.display = 'none';
document.getElementById('try-btn').style.display = 'block';
document.querySelector('.question-display').style.display = 'none';
document.getElementById('retry-btn').style.display = 'none';

function init() {
score = 0;
questionCount = 0;
gamePlaying = true;
    
    document.querySelector('.splash-area').style.display = 'none';
    document.querySelector('.question-display').style.display = 'block';
    document.getElementById('next-btn').style.display = 'block';
    document.getElementById('retry-btn').style.display = 'none';
    document.querySelector('.score-box').style.display = 'none';
    getQuestion();
}


//Question prototype
function Question(question, answerOptions, correctAnswer) {
    this.question = question;
    this.answers = answerOptions;
    this.correct = correctAnswer;
}

/* Create questions and arrays to hold possible questions and used questions */
var q1 = new Question ('What is the capital of Albania?', ['Algiers', 'Tirana', 'Andora'], 2)
var q2 = new Question ('What is the capital of Australia?', ['Sydney', 'New South Wales', 'Canberra'], 3)
var q3 = new Question ('What is the capital of Belgium?', ['Antwerp', 'Bruges', 'Brussels'], 3)
var q4 = new Question ('What is the capital of Canada?', ['Toronto', 'Ottawa', 'Vancouver'], 2)
var q5 = new Question ('What is the capital of Chile?', ['Valparaiso', 'Santiago', 'La Serena'], 2)
var q6 = new Question ('What is the capital of Egypt?', ['Cairo', 'Alexandria', 'Luxor'], 1)
var q7 = new Question ('What is the capital of Norway?', ['Oslo', 'Bergen', 'Stavanger'], 1)
var q8 = new Question ('What is the capital of Portugal?', ['Funchal', 'Lisbon', 'Porto'], 2)
var q9 = new Question ('What is the capital of Serbia?', ['Novi Sad', 'Subotica', 'Belgrade'], 3)
var q10 = new Question ('What is the capital of Spain?', ['Madrid', 'Barcelona', 'Seville'], 1)

var questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];


//Question and answer display
Question.prototype.display = function() {
    
    //clear any previous text
    document.getElementById('answer-btn').style.display = 'block';
    var myNode = document.getElementById('my-answers');
    myNode.innerHTML = '';
    //replace the question
    document.getElementById('my-question').innerHTML = this.question;
    //add the answer radios
    for (var i = 0; i < this.answers.length; i++) {
        var labels = document.createElement('label'); 
            labels.innerHTML=this.answers[i];
        var selectAnswer = document.createElement('input');
            selectAnswer.type='radio';
            selectAnswer.name='answer';
            selectAnswer.value= i + 1;
            document.getElementById('my-answers').appendChild(selectAnswer);
            document.getElementById('my-answers').appendChild(labels);
            document.getElementById('my-answers').appendChild(document.createElement('br'));
        };
}

//Check answer
Question.prototype.checkAnswer = function(ans) {
    var myNode = document.getElementById('my-answers');
    myNode.innerHTML = '';
    if (ans === this.correct) {
        var yes = document.createTextNode(this.answers[(ans - 1)] + ' is correct!');
        document.getElementById('my-answers').appendChild(yes);
        score++;
        document.getElementById('score-display').textContent = score;
    } else {
        var no = document.createTextNode('Sorry! It\'s not ' + this.answers[(ans - 1)]);
        document.getElementById('my-answers').appendChild(no);
    }
}


// Get answer from page and check it
function getAnswer() {
    var userAnswer = document.querySelector('input[name="answer"]:checked');
    if(userAnswer) {
        return randomItem.checkAnswer(parseInt(userAnswer.value));
    } else {
        alert("Please select an answer");
    }
}

// Select a question, slice and push to keep it random no repeat
function getQuestion() {
    var questionPool = questions.length - questionCount;
    var unusedQuestions = questions.slice(0, questionPool);
    var itemIndex = Math.floor(Math.random() * unusedQuestions.length);
    
    if (questionCount <= 9) {
            questionCount++;
            score === score;
            console.log(questionCount);
            randomItem = unusedQuestions[itemIndex];
            randomItem.display();
            var moveItem = questions.splice(itemIndex, 1);
            questions.push(randomItem);
    } else {
        //display score messaging
        document.getElementById('answer-btn').style.display = 'none';
        document.getElementById('next-btn').style.display = 'none';
        document.querySelector('.score-box').style.display = 'inline-block';
        var myNode = document.getElementById('my-answers');
        myNode.innerHTML = '';
        if (score >= 8) {
        document.getElementById('my-question').innerHTML = 'You really know your capital cities!';
        } else if (score <= 7 && score >= 5) {
        document.getElementById('my-question').innerHTML = 'Not bad!'; 
        } else {
        document.getElementById('my-question').innerHTML = 'Oh, not so good.'; 
        }
        gamePlaying = false;
        document.getElementById('retry-btn').style.display = 'block';
    }
}






















































