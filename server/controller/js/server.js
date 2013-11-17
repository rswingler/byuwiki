// Primary Node.js server file

/**
 * Initializes the web server and starts it listening on the given port
 */
var run = function(port) {
	/*
	 * Load all dependencies
	 */
	var express = require('express');
	var app = express();

	/**
	 * Enables static serving of .css and .js files from the server/view folder. Static
	 * files are set to remain cached by the client for one full day.
	 */
	var loadStaticServing = function(app) {
		var oneDay = 86400*1000;

		// Makes sure content will be compressed when sent
		app.use(express.compress());

		// Uncomment to use cached version (eventually)
		// app.use(express.static(__dirname + "/view", {maxAge: oneDay}));

		// Uncached version
		app.use(express.static(__dirname + "/view"));
	}

	/**
	 * Initializes the functions to handle certain specific requests. Used for serving up
	 * dynamic content.
	 */
	var loadRoutes = function(app) {
		app.get('/', homepage);
	};

	var homepage = function(req, res) {
		res.send('BYU Class wiki, served from Node.js!');
	};

	loadStaticServing(app);
	loadRoutes(app);

	app.listen(port);

	console.log('Server listening on port ' + port);
};

exports.run = run;