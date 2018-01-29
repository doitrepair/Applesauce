//******************************************************************************
//******************************************************************************
//	File Name: apptCtrl.js
//******************************************************************************
//	Module Description: This module controls the dispay of the appoitment page
//						(appt-form.html)
//******************************************************************************
//******************************************************************************
angular.module('apptCtrl', ['acmeService', 'filters', 'cherwellService', 'infoService'])
	.controller('apptController', function($scope, $location, userData, apptData) {

		// Get the appointment that the user clicked on
		//var appt = acmeFactory.get_appt();

		// Agents are sorted in order of agent id (idealy equal to senority)
		// Scheduling the second most senior agent with the appt per request
		// from BVLA (so that the senior-most agent stays on the floor)
		//var agent = appt.agents[1];

		// Set up display vars
		$scope.appt = apptData.title;

		// Function for the submit button
		$scope.save_descrip = function(){
			userData.description 	= $scope.description;
			$location.path('/appt/user');
		}
		$scope.save_user = function(){
			userData.netId 			= $scope.netId;
			userData.email 			= $scope.email;
			userData.tel 			= $scope.tel;
			userData.contactPref	= $scope.contactPref;
			userData.alt_contact 	= 'Email='+$scope.email+' Phone='+$scope.tel;
			$location.path('/appt/comp');
		}
		$scope.save_comp = function(){
			userData.os 			= $scope.os;
			userData.device_type	= $scope.device_type;
			userData.make 			= $scope.make;
			userData.short			= 'Service Desk Appt';
			userData.ship_to		= 'Dayton';
			userData.sn				= 'Needs Update';
			$location.path('/appt/sched');
		}
	});
