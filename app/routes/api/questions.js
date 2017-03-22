// REQUIRED PACKAGES ===========================================================
var bodyParser 	= require('body-parser');
var mySQL 		= require('mysql');
var config 		= require('../../../config');

// questionsRouter FUNCTION ==========================================================
module.exports = function(app, express) {
	//Define instance of API Router
	var questionsRouter = express.Router();
	//Authentication ??

	// BASE ROUTE (VERIFICATION) -----------------------------------------------
	questionsRouter.get('/', function(req, res) {
		res.json({ message: 'API Connection Successful' });
	});

	// ROUTES FOR /api/questions -----------------------------------------------
	questionsRouter.route('/questions')
		//Create a question
		.post(function(req, res) {

		})

		//Get all questions
		.get(function(req, res) {

		});

	// ROUTES FOR /api/questions/:id -------------------------------------------
	questionsRouter.route('/questions/:id')
		//Get a question by id
		.get(function(req, res) {

		})
		//Update a question
		.put(function(req, res) {

		})
		//Remove a question
		.delete(function(req, res) {
			//Require (extra) validation???
		});

	//REGISTERING ROUTES ---------------------
	return questionsRouter;
};
