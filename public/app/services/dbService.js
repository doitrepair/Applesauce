//******************************************************************************
//******************************************************************************
// Module Description: dbService.js
// This module creates the http calls necessary to retreive data from the
// mySQL database
//******************************************************************************
//******************************************************************************
angular.module('dbService', [])
	.value('firstQuestion', 1)
	.factory('qaFactory', function($http, $q) {

		var qaFactory = {};
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
		qaFactory.getQuestionByID = function(id) {
			return $http.get('/api/questions/' + id);
		};

		//**********************************************************************
		// Title: Get Answer by Question ID
		//**********************************************************************
		//	Summary: this function creates a answer object to be used by the
		//		question/answer controller
		//
		//	Parameters:
		//		id			the id of the corresponding question, for which all
		//					answers should be collected from the database
		//
		//	Returns:
		// 		This function returns a promise containing the db response
		//**********************************************************************
		qaFactory.getAnswerByQID = function(id) {
			return $http.get('/api/answers/questionid/' + id);
		};

		//**********************************************************************
		// Title: Get Answer by Repair ID
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
		qaFactory.getRepairByID = function(id) {
			return $http.get('/api/repairs/' + id);
		};

		//**********************************************************************
		// Title: Send Repair
		//**********************************************************************
		//	Summary: this function creates a question object to be used by the
		//		questions controller and saves the data so that the repair
		//		controller can access it too.
		//
		//	Parameters:
		//		id			the id of the repiar to be collected from database
		//
		//	Returns:
		// 		r_object:	q_object is an object that contains the following
		//					fields:
		//						id		- the id of the repair
		//						text	- the repair's text
		//						repair	- boolean denoting whether the issue
		//								should be handled by a repair
		//**********************************************************************
		
		qaFactory.saveRepairData = function(id, question_data, answer_data, index) {
			//var r_object = {};
			//r_object.repair = $http.get('/api/repair/' + id);
			repairData.question_data = question_data;
			repairData.answer_data = answer_data;
			repairData.index = index;
			repairData.valid = true;
			return true;
		};

		//**********************************************************************
		// Title: Receive repair
		//**********************************************************************
		//	Summary: This function returns the repair information to the repair
		//		controller
		//
		//	Returns:
		// 		repair_data:	repair_data is an object containing all of the
		//						Q&A data collected from the user. It has the
		//						following fields:
		//
		//							repair_data -	r_object for the repair
		//							question_data -	q_object for the repair
		//							valid - 		boolean denoting whether
		//											a repair has been saved
		//**********************************************************************
		qaFactory.loadRepairData = function() {
			if(repairData.valid) return repairData;
			return false;
		};
		return qaFactory;
	});
