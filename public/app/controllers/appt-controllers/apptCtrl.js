//******************************************************************************
//******************************************************************************
//	File Name: apptCtrl.js
//******************************************************************************
//	Module Description: This module controls the dispay of the appoitment page
//						(appt-form.html)
//******************************************************************************
//******************************************************************************
angular.module('apptCtrl', ['acmeService', 'filters', 'cherwellService', 'infoService', 'ngCookies'])
	.controller('apptController', function($scope, $location, $cookies, userData, apptData) {


		console.log('Testing');
		$scope.test = 2;
        console.log($cookies);

		$scope.templateInfo = function(){
			return 'app/views/appt-pages/appt-info.html';
		}
		$scope.templateSuccess = function(){
			return 'app/views/appt-pages/appt-success.html';
		}
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
