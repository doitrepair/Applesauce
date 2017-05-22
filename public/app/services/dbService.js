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
		//		question controller
		//
		//	Parameters:
		//		id			the id of the question to be collected from database
		//
		//	Returns:
		// 		q_object:	q_object is an object that contains the following
		//					fields:
		//						q_sum   	- short summary of the question
		//						questin_id	- the id of the question
		//						questin_text- the question's text
		//						answers - The possible answers for the question
		//							each with the sub-fields:
		//
		//							a_id	- id of the answer
		//							q_id	- id of the question that it answers
		//							a_text	- text for the answer
		//							cont 	- boolean denoting if another
		//									question should follow this answer
		//							next_id	- id of the next question or the
		//									repair (as denoted by cont)
		//**********************************************************************
		/*qaFactory.getQuestion = function(id) {
			var q_object = {
				question: {
					q_sum: "",
					question_id: -1,
					question_text: ""
				},
				answers: {}
			};
			var question;
			var answers;

			var q_promise = $http.get('/api/questions/' + id);
			q_promise.then(function(response){
				question = response.data;

			});

			var a_promise = $http.get('/api/answers/questionid/' + id);
			a_promise.then(function(response){
				answers = response.data;
			});
			$q.all([q_promise, a_promise]).then(function(){
				console.log(question);
				console.log(answers);
				//return {question: question, answers: answers};
			});
			return{question_promise: $http.get('/api/questions/' + id), answer_promise: $http.get('/api/answers/questionid/' + id)};
		};*/

		qaFactory.getQuestionByID = function(id) {
			return $http.get('/api/questions/' + id);
		};

		qaFactory.getAnswerByQID = function(id) {
			return $http.get('/api/answers/questionid/' + id);
		};

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
