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
		// Get a question from the database
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
							next_id: 2,
							chosen: false

						},
						{
							a_id: 2,
							q_id: 1,
							a_text: "dog",
							cont: false,
							next_id: 1,
							chosen: false

						},
						{
							a_id: 3,
							q_id: 1,
							a_text: "cat",
							cont: false,
							next_id: 1,
							chosen: false

						},
						{
							a_id: 4,
							q_id: 1,
							a_text: "llama",
							cont: false,
							next_id: 1,
							chosen: false

						},
						{
							a_id: 5,
							q_id: 1,
							a_text: "armadillo",
							cont: false,
							next_id: 1,
							chosen: false

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
							next_id: 3,
							chosen: false

						},
						{
							a_id: 7,
							q_id: 2,
							a_text: "no",
							cont: false,
							next_id: 2,
							chosen: false

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
							next_id: 3,
							chosen: false

						},
						{
							a_id: 7,
							q_id: 2,
							a_text: "its broken",
							cont: false,
							next_id: 3,
							chosen: false

						}
					];
				break;
			}
			return q_object;

		};

		qaFactory.getRepair = function(id) {
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
			return r_object;

		};
		return qaFactory;
	});
