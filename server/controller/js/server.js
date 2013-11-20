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
		// app.use(express.static(process.cwd() + "/view", {maxAge: oneDay}));

		// Uncached version
		app.use(express.static(process.cwd() + "/view"));
	};

	/**
	 * Initializes the functions to handle certain specific requests. Used for serving up
	 * dynamic content.
	 */
	var loadRoutes = function(app) {
		app.get('/', homepage);

		app.post('/github/pull', updateRepository);
	};

	/**
	 * Dynamically populates the contents of the homepage. Used in place of an index.html
	 * file.
	 */
	var homepage = function(req, res) {
		res.send('BYU Class wiki, served direct to you from Node.js! Testing webHook and endpoint. ##### ');
	};

	/**
	 * Runs a bash script that pulls from the github repository and reloads the server
	 */
	var updateRepository = function(req, res) {
		var spawn = require('child_process').spawn;

		console.log('Pulling the latest code from github');
		res.send('Please verify server has run update.sh');
		spawn('./update.sh'); // While running in "Forever", does spawn require a path to this script?? Does this function know where the update.sh file is?
	};


	loadStaticServing(app);
	loadRoutes(app);

	app.listen(port);

	console.log('Server listening on port ' + port);
};

exports.run = run;
