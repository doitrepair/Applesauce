//******************************************************************************
//******************************************************************************
// Module Description: dbService.js
// This module creates the http calls necessary to retreive data from the
// mySQL database
//******************************************************************************
//******************************************************************************
angular.module('dbService', [])
	.value('firstQuestion', 1)
	.factory('qaFactory', function($http) {

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
		//						id		- the id of the question
		//						text	- the question's text
		//						sum		- A short summary of the question
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
		qaFactory.getQuestion = function(id) {
			var q_object = {};
			/*
			q_object.questions = $http.get('/api/questions/' + id);
			q_object.answers = $http.get('/api/answers/' + id);
			*/
			switch(id){
				case 1:
					q_object.id 		= 1;
					q_object.text 		= "What is you favorite animal?";
					q_object.sum 		= "Favorite Animal";
					q_object.answers	=
					[
						{
							a_id: 1,
							q_id: 1,
							a_text: "monkey",
							cont: true,
							next_id: 2

						},
						{
							a_id: 2,
							q_id: 1,
							a_text: "dog",
							cont: false,
							next_id: 1

						},
						{
							a_id: 3,
							q_id: 1,
							a_text: "cat",
							cont: false,
							next_id: 1

						},
						{
							a_id: 4,
							q_id: 1,
							a_text: "llama",
							cont: false,
							next_id: 1

						},
						{
							a_id: 5,
							q_id: 1,
							a_text: "armadillo",
							cont: false,
							next_id: 1

						}
					];
				break;
				case 2:
					q_object.id 		= 2;
					q_object.text		= "Is your computer broken?";
					q_object.sum		= "Broken?";
					q_object.answers	=
					[
						{
							a_id: 6,
							q_id: 2,
							a_text: "yes",
							cont: true,
							next_id: 3

						},
						{
							a_id: 7,
							q_id: 2,
							a_text: "no",
							cont: false,
							next_id: 2

						}
					];
				break;
				case 3:
					q_object.id 	= 2;
					q_object.text 	= "What's wrong?";
					q_object.sum 	= "Problem";
					q_object.answers =
					[
						{
							a_id: 6,
							q_id: 2,
							a_text: "it doesn't turn on",
							cont: false,
							next_id: 3

						},
						{
							a_id: 7,
							q_id: 2,
							a_text: "its broken",
							cont: false,
							next_id: 3

						}
					];
				break;
			}
			return q_object;

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
		qaFactory.sendRepair = function(id, question_data) {
			var r_object = {};
			//r_object.repair = $http.get('/api/repair/' + id);
			switch(id){
				case 1:
					r_object.id			= 1;
					r_object.text 		= "Sorry, the correct answer was monkey";
					r_object.repair		= false;
				break;
				case 2:
					r_object.id			= 2;
					r_object.text 		= "I'm glad we could be of service";
					r_object.repair		= false;
				break;
				case 3:
					r_object.id			= 3;
					r_object.text 		= "Well we should get that checked out!";
					r_object.repair		= true;
				break;
			}

			repairData.repair_data =  r_object;
			repairData.question_data = question_data;
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
		qaFactory.receiveRepair = function() {
			if(repairData.valid) return repairData;
			return false;
		};
		return qaFactory;
	});
