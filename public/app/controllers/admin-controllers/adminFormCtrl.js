
angular.module('adminFormCtrl', ['acmeService', 'filters', 'infoService', 'authService'])
	.controller('adminFormController', function($scope, $location, userData, apptData, Auth) {
		if ( !Auth.isLoggedIn() ) $location.path('/login');
		else {
			$scope.submit_pressed = false;
			// In reality, there is no info section, but the two sections are interchangeable
			$scope.no_netid_field = true;

			var form = 'app/views/forms-pages/form-descrip.html';
			$scope.templateForm = function() {
				return form;
			}
			$scope.templateInfo = function(){
				return 'app/views/admin-pages/admin-form-info.html';
			}
			$scope.templateSuccess = function(){
				return 'app/views/appt-pages/appt-success.html';
			}

			$scope.checkInvalid = function(form, field){
				return field.$invalid && ($scope.submit_pressed || !field.$pristine)
			}
			// NEED TO USE PARENT TO GET THESE SCOPE PARAMS
			userData.case_type = "Appointment";
			userData.email_subject = "Appointment Confirmation";

			// Function for the submit button
			$scope.save_descrip = function(isValid){
				if(isValid){
					userData.description 	= $scope.description;
					form = 'app/views/forms-pages/form-user.html';
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
					form = 'app/views/forms-pages/form-comp.html';
				} else{
					$scope.submit_pressed = true;
				}
			}
			$scope.save_comp = function(isValid){
				if(isValid){
					userData.os 			= $scope.os;
					userData.device_type	= $scope.device_type;
					userData.make 			= $scope.make;
					userData.short			= 'Service Desk Appt';
					userData.ship_to		= 'Dayton';
					userData.sn				= 'Needs Update';
					form = 'app/views/appt-pages/sched.html';
				} else {
					$scope.submit_pressed = true;
				}
			}
		}
	});
