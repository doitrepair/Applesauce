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
	.controller('questionController', function($scope, $location, $q, qaFactory, firstQuestion) {
		vm = this;

		vm.question_data = [];
		vm.answer_data = [];
		vm.chosen_answers = [];
		vm.index 	= 0;
		//obj 			= [];
		// get the first question's data =======================================
		// get the question from the db
		var q_promise = qaFactory.getQuestionByID(firstQuestion);
		q_promise.then(function(q_response){
			vm.question_data[0] = q_response.data[0];
		});

		// get the answers from the db
		var a_promise = qaFactory.getAnswerByQID(firstQuestion);
		a_promise.then(function(a_response){
			vm.answer_data[0] = a_response.data;
		});

		// process promises
		$q.all([q_promise, a_promise]).then(function(){
			$scope.question_data 	= vm.question_data;
			$scope.answers 			= vm.answer_data[0];
			$scope.question_text 	= vm.question_data[0].question_text;
		});

		// Handle the answer of each question ==================================
		$scope.handleAnswer = function() {
			//check if chosen answer is valid (not whitespace placeholder)
			if ($scope.qa.length < 1)
				return;
			// Set chosen answer
			vm.chosen_answers[vm.index] = $scope.qa;

			// Determine if another question is necessary
			if(!$scope.qa.finish)
			{
				// Increment the question count
				vm.index++;

				// Set the next question ID
				var next_id = $scope.qa.next_id;

				// Get the next Question
				var q_promise = qaFactory.getQuestionByID(next_id);
				q_promise.then(function(q_response){
					vm.question_data[vm.index] = q_response.data[0];
				});

				// Get the next answers
				var a_promise = qaFactory.getAnswerByQID(next_id);
				a_promise.then(function(a_response){
					vm.answer_data[vm.index] = a_response.data;
				});

				// Wait until both question and answers are returned
				$q.all([q_promise, a_promise]).then(function(){
					// Update scope variables
					$scope.question_data 	= vm.question_data;
					$scope.answers 			= vm.answer_data[vm.index];
					$scope.question_text 	= vm.question_data[vm.index].question_text;
				});

			}
			// If answer has a repair instead of a question, then save the repair
			// info and send the user to the repair page
			else
			{
				// store question data for the repair controller and route
				// to the repair page
				if(qaFactory.saveRepairData($scope.qa.next_id, vm.question_data, vm.chosen_answers, vm.index))
					$location.path('/repair');
				else
					return false;
			}

		};
	});
