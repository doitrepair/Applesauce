angular.module('repairCtrl', ['dbService'])
	.controller('repairController', function($scope, $location, qaFactory) {
		vm = this;
		vm.repair = qaFactory.receiveRepair();
		if(vm.repair !== false){
			var description = "";
			vm.repair.question_data.forEach(function(element) {
				console.log(description + "Question: " + element.text + " \n" + "Answer: " + element.chosen.a_text + " \n\n");
				description = description + "Question: " + element.text + " \n" + "Answer: " + element.chosen.a_text + " \n\n";
			});
			console.log(description);
			$scope.description = description;
			/**
			$scope.handleAnswer = function() {
				$scope.qa.chosen = true;
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
			};**/
		}

	});
