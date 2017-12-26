// BASE SETUP ==================================================================
// REQUIRED PACKAGES -----------------------------------------------------------
var express 	= require('express');
var app			= express();
var bodyParser 	= require('body-parser');
var morgan		= require('morgan');
var config		= require('./config');
var acme_db		= require('./config/acme_db')
var path		= require('path');
var mySQL       = require('mysql');
//APP CONFIGURATION ============================================================
//Use body parser for POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configure handling of CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers',
	 	'X-Requested-With,content-type, Authorization');
	next();
});

//Log all requests to the console
app.use(morgan('dev'));


//Connect to our database
var db_connection = mySQL.createPool({	//create Pooled connection with database
        connectionLimit : 100,
        host: config.hostname,
        user: 'user',
        password: config.password,
        database : config.db
    }
);

var acme_connection = mySQL.createConnection({
    host: acme_db.sql_host,
    user: acme_db.sql_user,
    password: acme_db.sql_password,
    database: acme_db.sql_database
});
console.log("attempting connection to acme db");
acme_connection.connect();




// ROUTE DEFINITIONS ===========================================================
//For frontend references
app.use(express.static(__dirname + '/public'));

// API routes ------------------------------------------------------------------
// For routes beginning with /app/questions go to the questions router
var questionsRouter	= require('./app/routes/api/questions')(app, express, db_connection);
app.use('/api/questions', questionsRouter);

// For routes beginning with /app/answers go to the answers router
var answerRouter		= require('./app/routes/api/answers')(app, express, db_connection);
app.use('/api/answers', answerRouter);

// For routes beginning with /app/repairs go to the repairs router
var repairRouter		= require('./app/routes/api/repairs')(app, express, db_connection);
app.use('/api/repairs', repairRouter);

var schedRouter			= require('./app/routes/api/appt_app/schedule')(app, express, acme_connection);
app.use('/api/schedule', schedRouter);

var emailRouter			= require('./app/routes/api/email_handler')(app, express);
app.use('/api/email', emailRouter);

// Main route ------------------------------------------------------------------
// Catch all route: if any other path, send index.html
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// START SERVER ================================================================
app.listen(config.port);
console.log('Started Server');
