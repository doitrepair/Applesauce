// APIROUTER FUNCTION ==========================================================
module.exports = function(app, express, db_connection) {
	var repairRouter = express.Router();

    // ROUTES FOR /api/repairs -----------------------------------------------
    repairRouter.route('/')
    //Create a repair definition
        .post(function(req, res) { 		//expected request syntax '"Question_text", "Question_summary"'
            db_connection.getConnection(function(err, db_connection) {
                if (err) {
                    console.log('Error connecting');
                } else {
                    console.log('Connection established!');
                    db_connection.query('INSERT INTO repair (definition) VALUES ?', req.body.def, function (err, result, field)  {
                        db_connection.release();
                        if (err) {
                            console.log("Error with query");
                        } else {
                            res.send('Repair added to database with ID: ' + result.insertId);
                        }
                    });
                }
            });
        })

        //Get all Repair definitions
        .get(function(req, res) {
            db_connection.getConnection(function(err, db_connection) {
                if (err) {
                    console.log('Error connecting');
                } else {
                    console.log('Connection established!');
                    db_connection.query('SELECT * FROM repair', function(err, result)  {
                        db_connection.release();
                        if (err) {
                            console.log("Error with query");
                        } else {
                            res.send(result);	// Returns all repairs
                        }
                    });
                }
            });
        });

    // ROUTES FOR /api/repairs/:id -------------------------------------------
    repairRouter.route('/:id')
    //Get a repair by id
        .get(function(req, res) { //expects single integer id
            db_connection.getConnection(function(err, db_connection) {
                if (err) {
                    console.log('Error connecting');
                } else {
                    console.log('Connection established!');
                    db_connection.query('SELECT * FROM repair WHERE repair_id = ?', req.params.id, function(err, result)  {
                        db_connection.release();
                        if (err) {
                            console.log("Error with query");
                        } else {
                            res.send(result); // Returns repairs with requested id
                        }
                    });
                }
            });
        })
        //Update a repair definition
        .put(function(req, res) { //expected syntax ["Question text", "Question Summary", ID_Number]
            db_connection.getConnection(function(err, db_connection) {
                if (err) {
                    console.log('Error connecting');
                } else {
                    console.log('Connection established!');
                    db_connection.query('UPDATE repair SET definition = ? WHERE repair_id = ?', [req.body.text, req.body.sum, req.params.id], function(err, result)  {
                        db_connection.release();
                        if (err) {
                            console.log("Error with query");
                        } else {
                            res.send('Repair updated with ID: ' + result.insertId);
                        }
                    });
                }
            });
        })
        //Remove a repair
        .delete(function(req, res) {
            //Require (extra) validation??
            //expects repair_ID number for query
            db_connection.getConnection(function(err, db_connection) {
                if (err) {
                    console.log('Error connecting');
                } else {
                    console.log('Connection established!');
                    db_connection.query('DELETE FROM repair WHERE repair_id = ?', req.params.id, function(err, result) {
                        db_connection.release();
                        if (err) {
                            console.log("Error with query");
                        } else {
                            res.send('Repair Definition removed with ID: ' + result.insertId);
                        }
                    });
                }
            });
        });
	//REGISTERING ROUTES ---------------------
	return repairRouter;
};
