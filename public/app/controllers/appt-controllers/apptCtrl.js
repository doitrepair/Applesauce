//******************************************************************************
//******************************************************************************
//	File Name: apptCtrl.js
//******************************************************************************
//	Module Description: This module controls the dispay of the appoitment page
//						(appt-form.html)
//******************************************************************************
//******************************************************************************
angular.module('apptCtrl', ['acmeService', 'filters', 'submitService', 'infoService'])
	.controller('apptController', function($scope, $location, userData, apptData, submitFactory) {
		$scope.submit_pressed = false;

		form = 'app/views/appt-pages/sched.html';//'app/views/forms-pages/form-descrip.html';
		$scope.templateForm = function(){
			return form;
		}
		$scope.templateInfo = function(){
			return 'app/views/appt-pages/appt-info.html';
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
				userData.short			= 'Service Desk Appt';
				userData.ship_to		= 'Dayton';
				userData.sn				= 'Needs Update';
				form = 'app/views/appt-pages/sched.html';
			} else {
				$scope.submit_pressed = true;
			}
		}

		$scope.book_appt=function(item, this_week){
			console.log("book appt");
			if(item.active){
				console.log("active");
				// Check which week is displayed to user
				var k = this_week ? 0 : 1;
				// Update the agents and date
				apptData.appt	= true;
				apptData.agent 	= item.agents[0];
				apptData.date  = item.date;
				apptData.day 	= item.day;
				apptData.time 	= item.time;
				apptData.title 	= item.day + ", " + item.friendly_date + " at " + item.time;

				userData.header_message = "You have successfully created an Appoinment with the DoIT Tech Store on "+apptData.title;
				$scope.header_message = userData.header_message;
				userData.description = "Appointment on "+apptData.title + "; " + userData.description;
				userData.owner_netid = apptData.agent.netid;
				submitFactory.submitCase();

				form = 'app/views/appt-pages/appt-success.html';
			}
		}
	})
