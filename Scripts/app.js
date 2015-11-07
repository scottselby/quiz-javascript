
var getViewHelper = function () {
    var $question = $('.question-text');
    var $answersPanel = $('.answer-panel');

    var setQuestion = function (question) {
        $question.text(question.text);
        $answersPanel.html('');
        var html = '';

        question.answers.forEach(function (elm, indx, arry) {
            var randomTrueOrFalse = Math.random() < 0.5 ? true : false;
            if (randomTrueOrFalse) {
            html = html + '<input type="radio" name="answer" id="q' + indx +  '"  value="' + elm  +'" class="col-xs-1"  />' +
                          '<label for="q' + indx + '" class="col-xs-11">' + elm + '</label>';
            } else {
                html = '<input type="radio" name="answer" id="q' + indx + '"  value="' + elm + '" class="col-xs-1"  />' +
              '<label for="q' + indx + '" class="col-xs-11">' + elm + '</label>' + html;
            }
        });
        $answersPanel.append(html);
    }
    var showResults = function (questions) {
        $question.html('Results');
        var total = questions.length;
        var correct = questions.filter(function (obj) {
            return obj.selectedAnswer == obj.correctAnswer;
        });

        var html = '<h3>' + Math.floor((correct.length / total) * 100) + '% Correct </h3>' +
                   '<h4> You got ' + correct.length + ' correct out of ' + total + ' </h4>';

        $answersPanel.html(html);

    }
    return { setQuestion: setQuestion, showResults: showResults };
}

function Question(text, answers, correctAnswer, selectedAnswer){
    this.text = text;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
    this.selectedAnswer = selectedAnswer;
}

function getQuestions() {
    var q1 = new Question('What is not a principle of Object Oriented Programming', ['Abstraction', 'Encapsulation', 'Inheritence', 'Polymorphism', 'Impressionism'], 'Impressionism', null)
    var q2 = new Question('What type of inheritence pattern is utilized in JavaScript?', ['Prototypal', 'Classical', 'Trust'], 'Prototypal', null);
    var q3 = new Question('Which is better? Functional Programming or Object Oriented Programming?', ['Object Oriented Programming', 'Functional Programming', 'Neither, everything has its uses'], 'Neither, everything has its uses', null);
    return [q1, q2, q3];
}

function controller() {
    var currIndex = 0;
    var questions = getQuestions();
    var viewHelper = getViewHelper();
    viewHelper.setQuestion(questions[currIndex]);

    $(document).on('click', '.next-question', function (e) {
        // handler for when user clicks on next button
        questions[currIndex].selectedAnswer = $('input[name="answer"]:checked').val();
        var selected = questions[currIndex].selectedAnswer;
        var correct = questions[currIndex].correctAnswer;
        currIndex++;

        // check if you're on the last questio
        if (currIndex == questions.length) 
            viewHelper.showResults(questions);
        else
            viewHelper.setQuestion(questions[currIndex]);
        
        e.preventDefault();
 
    });

    return { vm: '' };
}


$(function () {
    var controler = controller();
});
