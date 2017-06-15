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
	.controller('repairController', function($scope, $location, qaFactory, submitFactory) {

		vm = this;

		var description_suffix = "NEXT AGENT: please update any 'Needs Update' fields as well as the Approved Price Ceiling and Repair Coverage when the customer comes in to drop off their computer";

		$scope.submit_repair = function() {
			if ($scope.netId == undefined || $scope.contactPref == undefined || $scope.os == undefined)
				return;
			var full_description = $scope.description + description_suffix;
			var repair_email = {
				description: full_description,
				short_description: "Online Repair - Needs Update",
				net_id: $scope.netId,
				os: $scope.os,
				make: $scope.make,
				model: 'Needs Update',
				sn: 'Needs Update',
				pa: $scope.pa,
				price: '1',
				device: $scope.device_type,
				ship_to: 'Needs Update',
				contact: $scope.contactPref
			};

			console.log('submitted');
			console.log(repair_email);
			submitFactory.submitRepair(repair_email);
			$location.path('/success');
		};

		var description = "";

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

				// Set repair description from data received from q&a controller
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
		}

		if($scope.make === 'Dell' || $scope.make === 'Apple'){
			$scope.pa = 'No';
		} else {
			$scope.pa = 'Yes';
		}
	});
