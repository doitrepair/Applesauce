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

		var form = 'app/views/data-pages/data-descrip.html';
		$scope.templateForm = function(){
			return form;
		}
		$scope.templateInfo = function(){
			return 'app/views/data-pages/data-info.html';
		}
		$scope.templateSuccess = function(){
			return 'app/views/data-pages/data-success.html';
		}

		$scope.checkInvalid = function(form, field){
			return field.$invalid && ($scope.submit_pressed || !field.$pristine)
		}

		userData.case_type = 'Data Transfer';
		userData.email_subject = "Data Transfer";
		userData.email_message = "You have successfully created a data transfer case with DoIT Repair!"

		// Function for the submit button
		$scope.save_descrip = function(){
			userData.description 	= "New Computer Data Transfer Check-In";
			form = 'app/views/forms-pages/form-user.html';
		}
		$scope.save_user = function(isValid){
			if(isValid){
				userData.netId 			= $scope.netId;
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
				userData.short			= 'Data Transfer - Online Repair';
				userData.ship_to		= 'Needs Update';
				userData.sn				= $scope.sn;
				userData.sn2			= $scope.sn2;
				userData.description	+= "; New SN:"+$scope.sn+"; Old SN:"+$scope.sn2 +";";
				form = 'app/views/data-pages/data-disclaimer.html';
			} else{
				$scope.submit_pressed = true;
			}
		}
		$scope.submit_repair = function(disclaimer) {
			if(disclaimer != true){
				return false;
			}
			repair_email = cherwellFactory.buildCherwellCase();
			// Go to the success landing page
			form = 'app/views/data-pages/data-success.html';
		};
	});
