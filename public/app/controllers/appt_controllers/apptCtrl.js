//******************************************************************************
//******************************************************************************
//	File Name: apptCtrl.js
//******************************************************************************
//	Module Description: This module controls the dispay of the appoitment page
//						(appt-form.html)
//******************************************************************************
//******************************************************************************
angular.module('apptCtrl', ['acmeService'])
	.controller('apptController', function($scope, $location, acmeFactory, submitFactory) {

		vm = this;

		var appt = acmeFactory.get_appt();
		$scope.appt = "Appointment for "+appt.day+", "+appt.dates+" at "+appt.time;

		$scope.submit_repair = function() {
			$scope.sn = 'Needs Update';
			$scope.ship_to = 'Needs Update';
			$scope.short = 'Service Desk Appt';

			var alt_contact = 'Email='+$scope.email+' Phone='+$scope.tel;

			repair_email = submitFactory.buildAndSubmitRepair($scope,$scope.appt+"; ")
			$location.path('/success');
		};

	});
