// Primary Node.js server file

/**
 * Initializes the web server and starts it listening on the given port
 */
var run = function(port) {
	/*
	 * Load all dependencies
	 */
	var express = require('express');
	var path = require('path');

	//MONGO DB DEPENDENCIES
	var mongo = require('mongodb');
	var monk = require('monk');
	var db = monk('localhost:27017/wikidb');

	//JADE HANDLER
	var jadeHandler = require('../../view/jade/jadeHandler.js');

	var app = express();
	//CONFIGURE EXPRESS FOR JADE
	app.set('views', '../../view/jade/templates');
	app.set('view engine', 'jade');

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
		app.use(express.static(process.cwd() + path.sep + "view"));
	};

	/**
	 * Initializes the functions to handle certain specific requests. Used for serving up
	 * dynamic content.
	 */
	var loadRoutes = function(app) {
		app.get('/', homepage);
		app.get('/wiki/:page', viewWikiPage);

		app.post('/github/pull', updateRepository);

		//MONGO DYNAMICALLY LOADED PAGES (DUMMY PAGES)
		app.get('/one', jadeHandler.pageOne(db));
		app.get('/two', jadeHandler.pageTwo(db));
	};

	/**
	 * Dynamically populates the contents of the homepage. Used in place of an index.html
	 * file.
	 */
	var homepage = function(req, res) {
		res.send('Wiki Dummy Homepage');
	};

	/**
	 * Attempts to retrieve the wiki data for the requested page
	 */
	var viewWikiPage = function(req, res) {
		var pagename = req.params.page;

		res.send('Displaying page ' + pagename);
	}

	/**
	 * Runs a bash script that pulls from the github repository and reloads the server
	 */
	var updateRepository = function(req, res) {
		var spawn = require('child_process').spawn;

		console.log('Pulling the latest code from github');
		res.send('Please verify server has run update.sh');
		spawn('./update.sh');

	};


	loadStaticServing(app);
	loadRoutes(app);

	app.listen(port);

	console.log('Server listening on port ' + port);
};

exports.run = run;
