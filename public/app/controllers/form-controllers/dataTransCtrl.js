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
angular.module('dataTransCtrl', ['cherwellService'])
	.controller('dataTransController', function($scope, $location, cherwellFactory) {


		$scope.submit_repair = function() {
			if($scope.disclaimer != true){
				return false;
			}
			$scope.short = 'Data Transfer - Online Repair'
			$scope.ship_to = 'Needs Update'
			var note = "Data Transfer Check-In, New SN:"+$scope.sn+". Old SN:"+$scope.sn2 +". - Customer Notes:";
			cherwellFactory.buildCherwellCase($scope, note);
			$location.path('/forms/success');
		};
	});
