// REQUIRED PACKAGES ===========================================================
var bodyParser 	= require('body-parser');
var mySQL 		= require('mysql');
var config 		= require('../../../config');

// APIROUTER FUNCTION ==========================================================
module.exports = function(app, express, db_connection) {
	var repairRouter = express.Router();
    // BASE ROUTE (VERIFICATION) -----------------------------------------------
    repairRouter.get('/', function(req, res) {
        res.json({ message: 'API Connection Successful' });
    });

    // ROUTES FOR /api/repair -----------------------------------------------
    repairRouter.route('/repair')
    //Create a repair definition
        .post(function(req, res) { 		//expected request syntax '"Question_text", "Question_summary"'
            db_connection.getConnection(function(error, tempConnection) {
                if (err) {
                    tempConnection.release(); //release connection if error occured
                    console.log('Error connecting');
                } else {
                    console.log('Connection established!');
                    tempConnection.query('INSERT INTO repair (definition) VALUES ?', req.body.def, function (error, result, field)  {
                        tempCont.release();
                        if (error) {
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
            db_connection.getConnection(function(error, tempConnection) {
                if (err) {
                    tempConnection.release(); //release connection if error occured
                    console.log('Error connecting');
                } else {
                    console.log('Connection established!');
                    tempConnection.query('SELECT * FROM repair', function(error, result)  {
                        tempCont.release();
                        if (error) {
                            console.log("Error with query");
                        } else {
                            res.send(result);	//all results query results sent to response
                        }
                    });
                }
            });
        });

    // ROUTES FOR /api/repair/:id -------------------------------------------
    repairRouter.route('/repair/:id')
    //Get a repair by id
        .get(function(req, res) { //expects single integer id
            db_connection.getConnection(function(error, tempConnection) {
                if (err) {
                    tempConnection.release(); //release connection if error occured
                    console.log('Error connecting');
                } else {
                    console.log('Connection established!');
                    tempConnection.query('SELECT * FROM  WHERE repair_id = ?', req.params.id, function(error, result)  {
                        tempCont.release();
                        if (error) {
                            console.log("Error with query");
                        } else {
                            res.send(result[0].definition); //repair definition sent to response
                        }
                    });
                }
            });
        })
        //Update a repair definition
        .put(function(req, res) { //expected syntax ["Question text", "Question Summary", ID_Number]
            db_connection.getConnection(function(error, tempConnection) {
                if (err) {
                    tempConnection.release(); //release connection if error occured
                    console.log('Error connecting');
                } else {
                    console.log('Connection established!');
                    tempConnection.query('UPDATE repair SET definition = ? WHERE repair_id = ?', [req.body.text, req.body.sum, req.params.id], function(error, result)  {
                        tempCont.release();
                        if (error) {
                            console.log("Error with query");
                        } else {
                            res.send('Repair updated with ID: ' + result.insertId);
                        }
                    });
                }
            });
        })
        //Remove a question
        .delete(function(req, res) {
            //Require (extra) validation??
            //expects repair_ID number for query
            db_connection.getConnection(function(error, tempConnection) {
                if (err) {
                    tempConnection.release(); //release connection if error occured
                    console.log('Error connecting');
                } else {
                    console.log('Connection established!');
                    tempConnection.query('DELETE FROM repair WHERE repair_id = ?', req.params.id, function(error, result) {
                        tempCont.release();
                        if (error) {
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
