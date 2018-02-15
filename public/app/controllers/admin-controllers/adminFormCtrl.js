angular.module('apptCtrl', ['acmeService', 'filters', 'cherwellService', 'infoService', 'ngCookies'])
	.controller('apptController', function($scope, $location, $cookies, $window, userData, apptData) {

		$scope.submit_pressed = false;
		$scope.no_netid_field = true;

		$scope.checkInvalid = function(form, field){
			return field.$invalid && ($scope.submit_pressed || !field.$pristine)
		}

		$scope.templateInfo = function(){
			return 'app/views/appt-pages/appt-info.html';
		}

		$scope.templateForm = function(){
			return 'app/views/appt-pages/appt-info.html';
		}

		$scope.templateSuccess = function(){
			return 'app/views/appt-pages/appt-success.html';
		}

		userData.case_type = "Appointment";
		userData.email_subject = "Appointment Confirmation";

		// Function for the submit button
		$scope.save_descrip = function(isValid){
			if(isValid){
				userData.description 	= $scope.description;
				$location.path('/appt/user');
			} else{
				$scope.submit_pressed = true;
			}
		}
		$scope.save_user = function(isValid){
			if(isValid){
				userData.first 			= $scope.first;
				userData.last 			= $scope.last;
				userData.email 			= $scope.email;
				userData.tel 			= $scope.tel;
				userData.contactPref	= $scope.contactPref;
				userData.alt_contact 	= 'Email='+$scope.email+' Phone='+$scope.tel;
				$location.path('/appt/comp');
			} else{
				$scope.submit_pressed = true;
			}
		}
		$scope.save_comp = function(isValid){
			console.log('testing')
			if(isValid){
				userData.os 			= $scope.os;
				userData.device_type	= $scope.device_type;
				userData.make 			= $scope.make;
				userData.short			= 'Service Desk Appt';
				userData.ship_to		= 'Dayton';
				userData.sn				= 'Needs Update';
				$location.path('/appt/sched');
			} else{
				$scope.submit_pressed = true;
			}
		}
	});
