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

	/**
	 * Given an array of path elements, returns the absolute path to the requested resource.
	 */
	var getPath = function(paths) {
		var result = process.cwd();

		paths.forEach(function(pathElement) {
			result = result + path.sep + pathElement;
		});

		return result;
	};

	// MODEL
	var model = require(getPath(['model', 'js', 'modelapi.js'])).init(db);

	//JADE HANDLER
	var jadeHandler = require(getPath(['view', 'jade', 'jadeHandler.js'])).init(model);

	var app = express();
	//CONFIGURE EXPRESS FOR JADE
	app.set('views', getPath(['view', 'jade', 'templates']));
	app.set('view engine', 'jade');
	app.use(express.urlencoded());
	app.use(express.json());

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
		app.get('/wiki/:page', jadeHandler.showWikiPage);
		app.get('/edit/:page', jadeHandler.editWikiPage);

		app.get('/createNew/:page', createPage);
		
		app.post('/update/:page', updatePage);
		app.post('/github/pull', updateRepository);

		//MONGO DYNAMICALLY LOADED PAGES (DUMMY PAGES)
		// app.get('/one', jadeHandler.pageOne);
		// app.get('/two', jadeHandler.pageTwo);

		//WRITE TO DATABASE - ENDPOINTS
		// app.post('/writeEndpoint', jadeHandler.write);
	};

	/**
	 * Dynamically populates the contents of the homepage. Used in place of an index.html
	 * file.
	 */
	var homepage = function(req, res) {
		res.send('Wiki Dummy Homepage');
	};

	/**
	 * Runs a bash script that pulls from the github repository and reloads the server
	 */
	var updateRepository = function(req, res) {
		var spawn = require('child_process').spawn;

		console.log('Pulling the latest code from github');
		res.send('Please verify server has run update.sh');
		spawn('./update.sh');
	};

	var createPage = function(req, res) {
        var pagename = req.params.page || '';
        var title = pagename.replace("_", " ");

        model.createPage(title);
        res.redirect('../../edit/' + pagename);
	}

	var updatePage = function(req, res) {
        var pagename = req.params.page || '';
        var title = pagename.replace("_", " ");

        var html = req.body['html'];
        var markup = req.body['markup'];

        model.setPageContent(title, html, markup);
        res.send('{"status": "success"}');
	}

	loadStaticServing(app);
	loadRoutes(app);

	app.listen(port);

	console.log('Server listening on port ' + port);
};

exports.run = run;
