// REQUIRED PACKAGES ===========================================================
var bodyParser 	= require('body-parser');
var mySQL 		= require('mysql');
var config 		= require('../../../config');
//TODO: create connection with mysql database with error catching; may want to use connection pooling
//may want to use connection pooling for efficiency

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
		.post(function(req, res) { 		//expected request syntax '"Question_text", "Question_summary"'
			db_connection.query('INSERT INTO questions (question_text, q_sum) VALUES (?, ?)', [req.body.text, req.body.sum], function (error, result, field) {
				if (error) {
					throw error;
				}
				res.send('Question added to database with ID: ' + result.insertId);
            });
		})

		//Get all questions
		.get(function(req, res) {
			db_connection.query('SELECT * FROM questions', function(error, result)	{
				if (error) throw error;
					res.send(result);	//all results query results sent to response
			})
		});

	// ROUTES FOR /api/questions/:id -------------------------------------------
	questionsRouter.route('/questions/:id')
		//Get a question by id
		.get(function(req, res) { //expects single integer id
			db_connection.query('SELECT * FROM questions WHERE question_id = ?', req.params.id, function(error, result) {
				if (error) throw error;
				res.send(result[0]); //single question query sent to response
            })
		})
		//Update a question
		.put(function(req, res) { //expected syntax ["Question text", "Question Summary", ID_Number]
			db_connection.query('UPDATE questions SET question_text = ?, q_sum = ? WHERE id = ?', [req.body.text, req.body.text, req.params.id], function(error, result) {
				if (error) throw error;
				res.send('Question updated with ID: ' + result.insertId);
			})
		})
		//Remove a question
		.delete(function(req, res) {
			//Require (extra) validation??
			//expects question ID number for query
            db_connection.query('DELETE FROM questions WHERE question_id = ?', req.params.id, function(error, result) {
                if (error) throw error;
                res.send('Question removed with ID: ' + result.insertId);
            })
		});

	//REGISTERING ROUTES ---------------------
	return questionsRouter;
};
