//******************************************************************************
//******************************************************************************
//	File Name: questionCtrl.js
//******************************************************************************
//	Module Description: This module controls the dispay of the Q&A page
//						(questions.html)
//
//	Dependencies:
//			dbService		Required to interact with the app's database
//******************************************************************************
//******************************************************************************
angular.module('questionCtrl', ['dbService'])
	.controller('questionController', function($scope, $location, qaFactory, firstQuestion) {
		vm = this;

		vm.questions = [];
		vm.qIndex = 0;

		// get the first question ==============================================
		vm.questions.push(qaFactory.getQuestion(firstQuestion));
		$scope.questions = vm.questions;
		$scope.answers = vm.questions[vm.qIndex].answers;
		$scope.question_text = vm.questions[vm.qIndex].text;

		// Handle the answer of each question ==================================
		$scope.handleAnswer = function() {
			// Set chosen answer
			vm.questions[vm.qIndex].chosen = $scope.qa;
			// Determine if another question is necessary
			if($scope.qa.cont){
				//get and set the next question
				var nextQ = qaFactory.getQuestion($scope.qa.next_id);
				vm.questions.push(nextQ);
				vm.qIndex++;
				$scope.answers = vm.questions[vm.qIndex].answers;
				$scope.question_text = vm.questions[vm.qIndex].text;
				$scope.questions = vm.questions;
			}else {
				// store question data for the repair controller and route
				// to the repair page
				if(qaFactory.sendRepair($scope.qa.next_id, vm.questions))
					$location.path('/repair');
				else
					return false;
			}
		};
	});
