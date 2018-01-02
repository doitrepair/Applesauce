//******************************************************************************
//******************************************************************************
//	File Name: apptCtrl.js
//******************************************************************************
//	Module Description: This module controls the dispay of the appoitment page
//						(appt-form.html)
//******************************************************************************
//******************************************************************************
angular.module('apptCtrl', ['acmeService', 'filters'])
	.controller('apptController', function($scope, $location, acmeFactory, submitFactory, timeFilter) {

		// Get the appointment that the user clicked on
		var appt = acmeFactory.get_appt();

		// Set up display vars
		$scope.appt_date = "Appointment for "+appt.day+", "+appt.dates+" at "
		$scope.appt_time = appt.time;

		// Function for the submit button
		$scope.create_appt = function() {
			// Fill in the variables not covered by the form
			$scope.sn = 'Needs Update';
			$scope.ship_to = 'Needs Update';
			$scope.short = 'Service Desk Appt';

			// Combine contact info
			$scope.alt_contact = 'Email='+$scope.email+' Phone='+$scope.tel;

			// Send out an email to cherwell to create a case
			repair_email = submitFactory.buildAndSubmitRepair($scope,$scope.appt_date+$scope.appt_time+"; ")

			// Agents are sorted in order of agent id (idealy equal to senority)
			// Scheduling the second most senior agent with the appt per request
			// from BVLA (so that the senior-most agent stays on the floor)
			var agent = appt.agents[1];

			// Update the schedule by moving an agent to the appt column
			acmeFactory.updateSched(appt.time, appt.time, appt.dates, appt.agents[0].first, appt.agents[0].last)

			// Go to the success landing page
			$location.path('/appt/success');
		};

	});
