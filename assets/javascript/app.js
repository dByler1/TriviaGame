//start the game with a button
 


var correct = 0;
var incorrect = 0;

questionsArr = [ 
    questionOne_Obj = {
        question: "what controls the tide?",
        answers: ["sun", "moon"],
        correctAnswer: "moon"
    },

    questionTwo_Obj = {
        question: "On what planet does Elon Musk want to die?",
        answers: ["venus", "mars", "uranus"],
        correctAnswer: "mars"
    },

    questionThree_Obj = {
        question: "If space mining is the next frontier, why am I learning internet stuff?",
        answers: ["Internet stuff is probably applicable to a successful spacing mining operation", "I'm one frontier behind", "Question is invalid - robotics is the next frontier.", "Oh God. What is the meaning of it all."],
        correctAnswer: "Internet stuff is probably applicable to a successful spacing mining operation"
    }
]

// hold the timer number
var timerNumber = 10;
// variable that will hold the timeout
var intervarlID;


var numberQuestions = questionsArr.length;
var counter = 0;


function getAnswers(counter) {
    $(".answers").empty();
        questionsArr[counter].answers.forEach(function(answer){
            var a = $("<button>");
            a.attr("type=button");
            a.addClass("btn btn-default answerButton");
            a.text(answer);
            $(".answers").append(a);
        })
}

function getQuestion(counter) {
    $(".questionText").html(questionsArr[counter].question);
}


//add event listener for click on buttons, when each question is called, look for a click (if statement) on the correct answer
//call an independent function if the click is successful - the function progresses to the correct answer screen

//start the game on click
$("#start").on("click", begin);

function begin(){
    
    if( counter > questionsArr.length - 1){
        gameOver();
        return;
    }

    clearInvervalID(intervarlID);
    //hide the start button
    $("#start").hide();
    //display the first question
    getQuestion(counter);
    getAnswers(counter);
    intervarlID = setInterval(function(){
        //the timer function - this code block gets called every second
        decrementTimer(); 
    }, 1000);
}

//runs the countdown timer and displays the timer
function decrementTimer() {
    $(".timer").html("<h2>" + timerNumber + "</h2>")
    timerNumber --;

    if (timerNumber === 0) {
        clearInvervalID(intervarlID);
        correctAnswer();
        counter++;
    }
}

function clearInvervalID() {
    clearInterval(intervarlID);
}

//when the timer runs out, or button is clicked show the correct answer, then move to the next question
function correctAnswer() {
    $(".correctAnswer").html("correct answer" + questionsArr[counter - 1].correctAnswer)
    $(".answerButton").hide();
    //$(".timer").hide();


    setTimeout(function(){
        console.log("in the correct answer timeout");
        $(".correctAnswer").empty();
        timerNumber = 10;
        begin();
        // getQuestion(counter);
        // getAnswers(counter);
        // decrementTimer();
    }, 3000)
    

}

$(document).on("click", ".answerButton", function() {
    //getts and returns THE VALUE OF A CLICK
    answerValue = $(this).text();
    counter++;
    correctAnswer();
    clearInvervalID(intervarlID);

    if(answerValue == questionsArr[counter - 1].correctAnswer){
        correct++;
        console.log(correct);
        
    }else {
        incorrect++;
        console.log(incorrect);
    }
})

function gameOver() {
    $(".timer").html("Correct: " + correct + "<br/>" + "Incorrect: " + incorrect);
    $(".correctAnswer").html("click the blue button to play again");
    $(".questionText").html("");
    $("#start").show();
    
    correct = 0;
    incorrect = 0;
    timer = 10;
    counter = 0;
}





