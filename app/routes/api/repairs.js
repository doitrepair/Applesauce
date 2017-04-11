// REQUIRED PACKAGES ===========================================================
var bodyParser 	= require('body-parser');
var mySQL 		= require('mysql');
var config 		= require('../../../config');

// APIROUTER FUNCTION ==========================================================
module.exports = function(app, express) {
	var repairRouter = express.Router();

    // ROUTES FOR /api/repairs -----------------------------------------------
    repairRouter.route('/')
    //Create a repair definition
        .post(function(req, res) { 		//expected request syntax '"Question_text", "Question_summary"'
            db_connection.query('INSERT INTO repair (definition) VALUES ?', req.body.def, function (error, result, field) {
                if (error) {
                    throw error;
                }
                res.send('Repair added to database with ID: ' + result.insertId);
            });
        })

        //Get all Repair definitions
        .get(function(req, res) {
            db_connection.query('SELECT * FROM repair', function(error, result)	{
                if (error) throw error;
                res.send(result);	//all results query results sent to response
            });
        });

    // ROUTES FOR /api/repairs/:id -------------------------------------------
    repairRouter.route('/:id')
    //Get a repair by id
        .get(function(req, res) { //expects single integer id
            db_connection.query('SELECT * FROM  WHERE repair_id = ?', req.params.id, function(error, result) {
                if (error) throw error;
                res.send(result[0]); //single question query sent to response
            });
        })
        //Update a repair definition
        .put(function(req, res) { //expected syntax ["Question text", "Question Summary", ID_Number]
            db_connection.query('UPDATE repair SET definition = ? WHERE repair_id = ?', [req.body.text, req.body.sum, req.params.id], function(error, result) {
                if (error) throw error;
                res.send('Question updated with ID: ' + result.insertId);
            });
        })
        //Remove a question
        .delete(function(req, res) {
            //Require (extra) validation??
            //expects repair_ID number for query
            db_connection.query('DELETE FROM repair WHERE repair_id = ?', req.params.id, function(error, result) {
                if (error) throw error;
                res.send('Repair Definition removed with ID: ' + result.insertId);
            });
        });
	//REGISTERING ROUTES ---------------------
	return repairRouter;
};
