//******************************************************************************
//******************************************************************************
//	File Name: apptCtrl.js
//******************************************************************************
//	Module Description: This module controls the dispay of the appoitment page
//						(appt-form.html)
//******************************************************************************
//******************************************************************************
angular.module('loginCtrl', ['authService', 'filters'])
	.controller('loginController', function($scope, $location, Auth) {

		$scope.submit_pressed = false;
		$scope.login_failed = false;

		$scope.checkInvalid = function(form, field){
			return field.$invalid && ($scope.submit_pressed || !field.$pristine)
		}

		$scope.templateInfo = function(){
			return 'app/views/admin-pages/admin-info.html';
		}
		$scope.login = function(isValid){
			if(isValid){
				var res = Auth.login($scope.name, $scope.pass)
					.then(function(data) {
						if(data.success){
							console.log('Logged In!');
							$location.path('/admin');
						} else {
							$scope.login_error = data.message;
							$scope.login_failed = true;
							console.log('Login Failed :(')
						}
					});
			} else{
				$scope.submit_pressed = true;
			}
		}
	});
