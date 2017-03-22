// BASE SETUP ==================================================================
// REQUIRED PACKAGES -----------------------------------------------------------
var express 	= require('express');
var app			= express();
var bodyParser 	= require('body-parser');
var morgan		= require('morgan');
var config		= require('./config');
var path		= require('path');

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

//Connect to a database
//ADD CODE

// ROUTE DEFINITIONS ===========================================================
//For frontend references
app.use(express.static(__dirname + '/public'));

// API routes ------------------------------------------------------------------
var apiRouter	= require('./app/routes/apiRouter')(app, express);
app.use('/api', apiRouter);

// Main route ------------------------------------------------------------------
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// START SERVER ================================================================
app.listen(config.port);
console.log('Started Server');
