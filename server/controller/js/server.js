// Primary Node.js server file

var run = function(port) {
	var http = require('http');
	http.createServer(function (req, res) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('BYU Class wiki, served from nine lines of code with Node.js.\n');

	}).listen(port);

	console.log('Server listening on port ' + port);
}

exports.run = run;