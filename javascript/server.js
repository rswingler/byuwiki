var http = require('http');
http.createServer(function (req, res) 
{
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('BYU Class wiki, served from nine lines of code with Nodejs.\n');

}).listen(80);
