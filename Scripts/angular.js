
function Question(text, answers, correctAnswer, selectedAnswer) {
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



angular.module('myApp', [])
  .controller('myController', function ($scope) {
      var index = 0;
      $scope.questions = getQuestions();
      $scope.currentQuestion = $scope.questions[index];

      $scope.nextQuestion = function () {
          index++;
          if ($scope.questions.length == index) {
              $scope.showMessage = true;
              $scope.message = "You finished quiz, yay! ";
          }
          $scope.currentQuestion = $scope.questions[index];
      }
      
  });