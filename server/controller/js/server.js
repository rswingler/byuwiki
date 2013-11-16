// Primary Node.js server file

var run = function(port) {
	var express = require('express');
	var app = express();

	app.get('/', function(req, res) {
		res.send('BYU Class wiki, served from nine lines of code with Node.js.\n');
	});

	app.listen(port);

	console.log('Server listening on port ' + port);
};

exports.run = run;