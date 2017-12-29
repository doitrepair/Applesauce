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
/*jshint esversion: 6 */
angular.module('repairCtrl', ['repairService', 'submitRepair'])
	.controller('repairController', function($scope, $location, qaFactory, submitFactory) {

		vm = this;

		var description_suffix = " - NEXT AGENT - please update any 'Needs Update' fields as well as the Approved Price Ceiling and Repair Coverage when the customer comes in to drop off their computer";
		$scope.questions = 'N/A';

		$scope.submit_repair = function() {
			$scope.sn = 'Needs Update';
			$scope.ship_to = 'Needs Update';
			$scope.short = 'Online Repair - Needs Update';

			$scope.alt_contact = 'Email='+$scope.email+' Phone='+$scope.tel;

			repair_email = submitFactory.buildAndSubmitRepair($scope,"")
			$location.path('repair/success');
		};

		var questions = "";

		// get the repair information that the questions controller collected
		vm.repairData = qaFactory.loadRepairData();

		if(vm.repairData && vm.repairData.valid === true)
		{
			$scope.diagnostic = true;

			// Get the repair
			vm.repairID = vm.repairData.answer_data[vm.repairData.index].next_id;
			var r_promise = qaFactory.getRepairByID(vm.repairID);
			r_promise.then(function(r_response){
				vm.repair = r_response.data[0];

				// Scope variable for the custom text for this repair
				$scope.repair_text = vm.repair.definition;

				// Set repair questions from data received from q&a controller
				var index = 0;
				vm.repairData.question_data.forEach(function(element) {
					var answer_text = vm.repairData.answer_data[index].answer_text;
					index++;
					questions = questions + "Question - " + element.question_text + " <br />" + "Answer - " + answer_text + " <br />";
				});
				console.log(questions);
				$scope.questions = questions;
			});

		}
		// If Q&A was done
		else
		{
			$scope.diagnostic = false;
		}
	});
