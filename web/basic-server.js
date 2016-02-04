var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var sys = require('sys');
var exec = require('child_process').exec;


exec(__dirname + "/../workers/./runCron", function (error, stdout, stderr) { 
  sys.puts(stdout);
});

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize("./archives");

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}
