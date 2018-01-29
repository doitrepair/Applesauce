//******************************************************************************
//******************************************************************************
// Module: apptService.js
//******************************************************************************
//******************************************************************************
angular.module('apptService', ['cherwellService', 'acmeService', 'infoService'])
	.value('firstQuestion', 1)
	.factory('apptFactory', function($http, $q, $location, userData, apptData, acmeFactory, cherwellFactory) {

		var apptFactory = {};
		var repairData = {};
		repairData.valid = false;

		//**********************************************************************
		// Title: Get Question
		//**********************************************************************
		//	Summary: this function creates a question object to be used by the
		//		question/answer controller
		//
		//	Parameters:
		//		id			the id of the question to be collected from database
		//
		//	Returns:
		// 		This function returns a promise containing the db response
		//**********************************************************************
		apptFactory.book_appt = function() {

			// Send out an email to cherwell to create a case
			userData.description = apptData.title + "; " + userData.description;
			userData.owner_netid = apptData.agent.netid;
			repair_email = cherwellFactory.buildCherwellCase()

			// Update the schedule by moving an agent to the appt column
			acmeFactory.updateSched(apptData.time, apptData.time, apptData.dates, apptData.agent.first, apptData.agent.last)

			// Go to the success landing page
			$location.path('/appt/success');
		};

		return apptFactory;
	});
