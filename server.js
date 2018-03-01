// BASE SETUP ==================================================================
// REQUIRED PACKAGES -----------------------------------------------------------
var express 		= require('express');
var app				= express();
var bodyParser 		= require('body-parser');
var morgan			= require('morgan');
var server_config	= require('./config/server-config');
var repair_db		= require('./config/repair-db');
var acme_db			= require('./config/acme-db');
var path			= require('path');
var mySQL       	= require('mysql');
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
        host: repair_db.hostname,
        user: 'user',
        password: repair_db.password,
        database : repair_db.db
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
var authRouter	= require('./app/routes/api/auth')(app, express, db_connection, repair_db.secret);
app.use('/auth', authRouter);

var incidentRouter		= require('./app/routes/api/incidents')(app, express, db_connection);
app.use('/api/incident', incidentRouter);

var schedRouter			= require('./app/routes/api/appt-app/schedule')(app, express, acme_connection);
app.use('/api/schedule', schedRouter);

var emailRouter			= require('./app/routes/api/email')(app, express);
app.use('/api/email', emailRouter);

// Main route ------------------------------------------------------------------
// Catch all route: if any other path, send index.html

app.get('/net*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index-net.html'));
});

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// START SERVER ================================================================
app.listen(server_config.port);
console.log('Started Server');
