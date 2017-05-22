//******************************************************************************
//******************************************************************************
//	File Name: repairCtrl.js
//******************************************************************************
//	Module Description: This module controls the dispay of the repair form
//						(repair-form.html)
//
//	Dependencies:
//			dbService		Required to interact with the app's database
//			submitRepair	Required to send repair data to WiscIT
//******************************************************************************
//******************************************************************************
angular.module('repairCtrl', ['dbService', 'submitRepair'])
	.controller('repairController', function($scope, $location, qaFactory) {
		vm = this;



		



		var description = "";
		// scope variable for days until first contact from repair
		$scope.contact_date = 4;

		// get the repair information that the questions controller collected
		vm.repairData = qaFactory.loadRepairData();

		$scope.diagnostic = true;

	//	function(){
	//		console.log('diagnostic:');
	//		console.log((vm.repairData && vm.repairData.valid === true));
	//		return (vm.repairData && vm.repairData.valid === true);
	//	};
		// Header for if no Q&A was done
		if(vm.repairData && vm.repairData.valid === true)
		{
			$scope.diagnostic = true;
			// Get the repair
			console.log('Imported Repair Data:');
			console.log(vm.repairData);
			vm.repairID = vm.repairData.answer_data[vm.repairData.index].next_id;
			var r_promise = qaFactory.getRepairByID(vm.repairID);
			r_promise.then(function(r_response){
				vm.repair = r_response.data[0];
				console.log('Server Response:');
				console.log(vm.repair);
				$scope.repair_text = vm.repair.definition;
				// Header for if Q&A was done and a repair was deemed necessary
				if(vm.repair)
				{
					$scope.form_header = "Please fill in the following information about your computer to speed up the check-in process:";
				}
				// Header for if Q&A was done and a repair was not deemed necessary
				else
				{
					$scope.form_header = "We do not think that a repair would be necessary at this time, if you would still like the DoIT Help Desk or Repair to look at your computer, please fill in the following information:";
				}
				console.log($scope.form_header);
				// Scope variable for the custom text for this repair
				$scope.repair_text = vm.repair.text;

				// Import info from the Q&A section into the repair description
				var index = 0;
				vm.repairData.question_data.forEach(function(element) {
					var answer_text = vm.repairData.answer_data[index].answer_text;
					index++;
					description = description + "Question: " + element.question_text + " \n" + "Answer: " + answer_text + " \n\n";
				});
				$scope.description = description;
			});

		}
		// If Q&A was done
		else
		{
			$scope.diagnostic = false;
			$scope.form_header = "Please fill in the following information about your computer to speed up the check-in process:";
			console.log('no repair	');
		}
	});
