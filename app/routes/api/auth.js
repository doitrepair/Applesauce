var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');

var saltRounds = 10;

// APIROUTER FUNCTION ==========================================================
module.exports = function(app, express, db_connection) {
	var authRouter = express.Router();

	// basic route for the home page
	authRouter.post('/', function(req, res) {

	});
	authRouter.route('/user')
		// Create a user
		.post(function(req, res) {
			var user = {};
			user.name = req.body.name;
			// generate the hash
			bcrypt.hash(req.body.password, bcrypt.genSaltSync(saltRounds), null, function(err, hash) {
				if(err){
					console.log('Error hashing');
					console.log(err)
					res.send('Error hashing');
				} else {
				    user.password = hash;
					db_connection.getConnection(function(err, db_connection) {
		                if (err) {
		                    console.log('Error connecting');
							res.send('Error connecting to db')
		                } else {
		                    console.log('Connection established!');
		                    db_connection.query('INSERT INTO users (name, password) VALUES (?, ?)', [user.name, user.password], function (err, result, field) {
		                        db_connection.release();
		                        if (err) {
		                            console.log(err);
									res.send('Error with query')
		                        } else {
		                            res.send('User added to database with ID: ' + result.name);
		                        }
		                    });
		                }
		            });
				}
			});

		});
	//REGISTERING ROUTES -------------------------------------------------------
	return authRouter;
};
