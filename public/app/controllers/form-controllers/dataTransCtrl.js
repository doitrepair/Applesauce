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
angular.module('dataTransCtrl', ['submitRepair'])
	.controller('dataTransController', function($scope, $location, submitFactory) {


		$scope.submit_repair = function() {
			if($scope.disclaimer != true){
				console.log($scope.disclaimer)
				return false;
			}
			$scope.short = 'Data Transfer - Online Repair'
			$scope.ship_to = 'Needs Update'
			var note = "Data Transfer Check-In, New SN:"+$scope.sn+". Old SN:"+$scope.sn2 +". - Customer Notes:";
			submitFactory.buildAndSubmitRepair($scope, note);
			$location.path('/forms/success');
		};
	});
