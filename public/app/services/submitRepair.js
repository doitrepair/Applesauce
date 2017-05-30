//******************************************************************************
//******************************************************************************
// Module Description: submitRepair.js
// This module saves all of the data from a repair and sends it to WiscIT
//
//******************************************************************************
//******************************************************************************
angular.module('submitRepair', [])
	.factory('submitFactory', function($http) {
		var submitFactory = {};

		//**********************************************************************
		// Title: Submit Repair
		//**********************************************************************
		//	Summary: this function creates a repair object to be used by the
		//		repair controller
		//
		//	Parameters:
		//		id			the id of the repair to be collected from database
		//
		//	Returns:
		// 		This function returns a promise containing the db response
		//**********************************************************************
		submitFactory.submitRepair = function(repair){
			return $http.post('/api/email/', { repair: repair });

		};
		return submitFactory;
	});
