// load the http module
var http = require('http');

// configure our HTTP server
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello, flexible engine, this is build #46\n");
});

// listen on localhost:8000
server.listen(30008);
console.log("Server listening at http://127.0.0.1:30000/");
