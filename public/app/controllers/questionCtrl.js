angular.module('questionCtrl', ['dbService'])
	.controller('questionController', function($scope, $location, qaFactory) {
		vm = this;

		vm.questions = [];
		vm.qIndex = 0;

		vm.questions.push(qaFactory.getQuestion(1));
		$scope.questions = vm.questions;
		$scope.answers = vm.questions[vm.qIndex].answers;
		$scope.question_text = vm.questions[vm.qIndex].text;
		// Handle logging out
		$scope.handleAnswer = function() {
			vm.questions[vm.qIndex].chosen = $scope.qa;
			if($scope.qa.cont){
				var nextQ = qaFactory.getQuestion($scope.qa.next_id);
				console.log(nextQ);
				vm.questions.push(nextQ);
				vm.qIndex++;
				$scope.answers = vm.questions[vm.qIndex].answers;
				$scope.question_text = vm.questions[vm.qIndex].text;
				$scope.questions = vm.questions;
			}else {
				if(qaFactory.sendRepair($scope.qa.next_id, vm.questions))
					$location.path('/repair');
				else
					return false;
			}
		};
	});
