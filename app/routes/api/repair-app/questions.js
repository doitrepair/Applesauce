// questionsRouter FUNCTION ==========================================================
module.exports = function(app, express, db_connection) {
	//Define instance of API Router
	var questionsRouter = express.Router();

	// ROUTES FOR /api/questions -----------------------------------------------
	questionsRouter.route('/')
		//Create a question
		.post(function(req, res) { 		//expected request syntax '"Question_text", "Question_summary"'
			db_connection.getConnection(function(err, db_connection) {
                if (err) {
                    console.log('Error connecting');
                } else {
					console.log('Connection established!');
                	db_connection.query('INSERT INTO questions (question_text, q_sum) VALUES (?, ?)', [req.body.text, req.body.sum], function (err, rows, fields) {
                		db_connection.release();
                    	if (err) {
                        	console.log("Error with query");
                    	} else {
                        	res.send('Question added to database with ID: ' + rows.insertId);
                    }
                	});
            	}
            });
		})

		//Get all questions
		.get(function(req, res) {
            db_connection.getConnection(function (err, db_connection) {
                if (err) {
                    console.log('Error connecting');
                } else {
                    console.log('Connection established!');
                    db_connection.query('SELECT * FROM questions', function (err, rows, fields) {
                        db_connection.release();
                        if (err) {
                            console.log("Error with query");
                        } else {
                            res.send(rows);	// Returns all questions
                        }
                    });
                }
            });
        });

	// ROUTES FOR /api/questions/:id -------------------------------------------
	questionsRouter.route('/:id')
		//Get a question by id
		.get(function(req, res) { //expects single integer id
            db_connection.getConnection(function(err, db_connection) {
                if (err) {
                    console.log('Error connecting');
                } else {
                    console.log('Connection established!');
                    db_connection.query('SELECT * FROM questions WHERE question_id = ?', req.params.id, function(err, result){
                        db_connection.release();
                        if (err) {
                            console.log("Error with query");
                        } else {
                            res.send(result); // Returns questions with requested id
                        }
                    });
                }
            });
		})
		//Update a question
		.put(function(req, res) { //expected syntax ["Question text", "Question Summary", ID_Number]
            db_connection.getConnection(function(err, db_connection) {
                if (err) {
                    console.log('Error connecting');
                } else {
                    console.log('Connection established!');
                    db_connection.query('UPDATE questions SET question_text = ?, q_sum = ? WHERE question_id = ?', [req.body.text, req.body.sum, req.params.id], function(err, result){
                        db_connection.release();
                        if (err) {
                            console.log("Error with query");
                        } else {
                            res.send('Question updated with ID: ' + result.insertId);
                        }
                    });
                }
            });
		})
		//Remove a question
		.delete(function(req, res) {
			//Require (extra) validation??
			//expects question ID number for query
            db_connection.getConnection(function(err, db_connection) {
                if (err) {
                    console.log('Error connecting');
                } else {
                    console.log('Connection established!');
                    db_connection.query('DELETE FROM questions WHERE question_id = ?', req.params.id, function(err, result){
                        db_connection.release();
                        if (err) {
                            console.log("Error with query");
                        } else {
                            res.send('Question removed with ID: ' + result.insertId);
                        }
                    });
                }
            });
		});
	//REGISTERING ROUTES ---------------------
	return questionsRouter;
};
