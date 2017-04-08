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
		vm.repair = qaFactory.receiveRepair();

		// Header for if no Q&A was done
		if(vm.repair === false)
		{
			$scope.form_header = "Please fill in the following information about your computer to speed up the check-in process:";
		}
		// If Q&A was done
		else
		{
			// Header for if Q&A was done and a repair was deemed necessary
			if(vm.repair.repair_data.repair)
			{
				$scope.form_header = "Please fill in the following information about your computer to speed up the check-in process:";
			}
			// Header for if Q&A was done and a repair was not deemed necessary
			else
			{
				$scope.form_header = "We do not think that a repair would be necessary at this time, if you would still like the DoIT Help Desk or Repair to look at your computer, please fill in the following information:";
			}

			// Scope variable for the custom text for this repair
			$scope.repair_text = vm.repair.repair_data.text;

			// Import info from the Q&A section into the repair description
			vm.repair.question_data.forEach(function(element) {
				description = description + "Question: " + element.text + " \n" + "Answer: " + element.chosen.a_text + " \n\n";
			});

		}
		$scope.description = description;
	});
