//******************************************************************************
//******************************************************************************
// Module Description: acmeService.js
// This module creates the http calls necessary to retreive data from the
// acme database
//******************************************************************************
//******************************************************************************
angular.module('acmeService', [])
	.factory('acmeFactory', function($http, $q) {

		var acmeFactory = {};

		//**********************************************************************
		// Title: Get Schedule
		//**********************************************************************
		//	Summary: this function gets the acme schedule for Dayton
		//
		//	Parameters:
		//		begin		The start date of query
		//		end			The end date of query
		//
		//	Returns:
		// 		This function returns a promise containing the db response
		//**********************************************************************
		acmeFactory.getSched = function(begin, end) {
			return $http.post('/api/schedule/sched_test', {
					'begin': begin,
					'end': end
				});
		};

		//**********************************************************************
		// Title: Update Schedule
		//**********************************************************************
		//	Summary: this function updates the acme schedule and moves an agent
		//		into Appt hours
		//
		//	Parameters:
		//		begin		The start time of the appt
		//		end			The end time of the appt
		//		date		The date of the appt
		//		first		The agent's first name
		//		last		The agent's last name
		//
		//	Returns:
		// 		This function returns a promise containing the db response
		//**********************************************************************
		acmeFactory.updateSched = function(begin, end, date, first, last) {
			return $http.put('/api/schedule/sched_test', {
					'begin': begin,
					'end': end,
					'date': date,
					'first': first,
					'last': last
				});
		};

		return acmeFactory;
	});
