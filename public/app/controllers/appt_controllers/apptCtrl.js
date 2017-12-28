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

		$scope.create_appt = function() {
			$scope.sn = 'Needs Update';
			$scope.ship_to = 'Needs Update';
			$scope.short = 'Service Desk Appt';

			$scope.alt_contact = 'Email='+$scope.email+' Phone='+$scope.tel;

			repair_email = submitFactory.buildAndSubmitRepair($scope,$scope.appt+"; ")

			// Agents are sorted in order of agent id (idealy equal to senority)
			// Scheduling the second most senior agent with the appt per request
			// from BVLA (so that the senior-most agent stays on the floor)
			var agent = appt.agents[1];
			console.log(appt.time+" "+ appt.time+" "+ appt.dates+" "+ agent.first+" "+ agent.last)
			acmeFactory.updateSched(appt.time, appt.time, appt.dates, appt.agents[0].first, appt.agents[0].last)
			$location.path('/appt/success');
		};

	});
