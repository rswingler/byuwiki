// Node.js server file

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('BYU Class wiki, served from nine lines of code with <a href="nodejs.org">Node.js</a>.\n');

}).listen(80);

console.log('Server listening on port 80');