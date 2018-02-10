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
angular.module('dataTransCtrl', ['cherwellService', 'infoService'])
	.controller('dataTransController', function($scope, $location, cherwellFactory, userData) {
		$scope.sn_field = true;
		$scope.sn_two_field = true;

		$scope.submit_pressed = false;
		$scope.checkInvalid = function(form, field){
			return field.$invalid && ($scope.submit_pressed || !field.$pristine)
		}

		$scope.templateInfo = function(){
			return 'app/views/data-pages/data-info.html';
		}
		$scope.templateSuccess = function(){
			return 'app/views/data-pages/data-success.html';
		}
		// Function for the submit button
		$scope.save_descrip = function(){
			userData.description 	= "New Computer Data Transfer Check-In";
			$location.path('/data/user');
		}
		$scope.save_user = function(isValid){
			if(isValid){
				userData.netId 			= $scope.netId;
				userData.email 			= $scope.email;
				userData.tel 			= $scope.tel;
				userData.contactPref	= $scope.contactPref;
				userData.alt_contact 	= 'Email='+$scope.email+' Phone='+$scope.tel;
				$location.path('/data/comp');
			} else{
				$scope.submit_pressed = true;
			}
		}
		$scope.save_comp = function(isValid){
			if(isValid){
				userData.os 			= $scope.os;
				userData.device_type	= $scope.device_type;
				userData.make 			= $scope.make;
				userData.short			= 'Data Transfer - Online Repair';
				userData.ship_to		= 'Needs Update';
				userData.sn				= $scope.sn;
				userData.sn2			= $scope.sn2;
				userData.description	+= "; New SN:"+$scope.sn+"; Old SN:"+$scope.sn2 +";";
				$location.path('/data/disc');
			} else{
				$scope.submit_pressed = true;
			}
		}

		$scope.submit_repair = function() {
			if($scope.disclaimer != true){
				return false;
			}
			repair_email = cherwellFactory.buildCherwellCase();
			// Go to the success landing page
			$location.path('/data/success');
		};
	});
