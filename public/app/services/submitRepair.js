//******************************************************************************
//******************************************************************************
// Module Description: submitRepair.js
// This module saves all of the data from a repair and sends it to WiscIT
//
//******************************************************************************
//******************************************************************************
angular.module('submitRepair', [])
	.factory('submit', function($http) {
		var repair = repair;
		//**********************************************************************
		// Title: Save Repair
		//**********************************************************************
		//	Summary: this function saves a repair object that was created by the
		//		repair controller
		//
		//	Parameters:
		// 		Repair:		Repair is the variable holding all of the
		// 					information from the user, it has required and
		//					optional fields, as listed below:
		//					Required Fields:
		//						.description  -- this should include all Q&As
		//						.firstname, .lastname, .next_id, .email, .phone,
		//						.pref_contact
		//					Optional Fields:
		//						.os, .make, .sn
		//**********************************************************************
		submit.saveRepair = function ( repair ){

		};
	});
