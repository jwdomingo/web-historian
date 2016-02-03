var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(req, res, callback) {
  // deal with index.html
  if ( req.url === '/' ) {
    fs.readFile(__dirname + '/public/index.html','utf-8', function(err, data) {
      if (err) {
        console.error(err);
        res.writeHead(404, headers);
      } else {
        res.writeHead(200, 'ok', headers);
        res.end(data);
      }
    });
  }
  if (req.url === '/styles.css') {
    fs.readFile(__dirname + '/public/styles.css', function(err, data) {
      if (err) {
        console.error(err);
        res.writeHead(404, headers);
      } else {
        headers['Content-Type'] = "text/css";
        res.writeHead(200, 'ok', headers);
        res.end(data);
      }
    });
  }
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};



// As you progress, keep thinking about what helper functions you can put here!
