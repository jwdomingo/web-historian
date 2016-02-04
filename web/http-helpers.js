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
  if ( req.url === '/' ) {
    fs.readFile(__dirname + '/public/index.html', function(err, data) {
      if (err) {
        console.error(err);
        _sendResponse(res, null, 'File Not Found', 404);
      } else {
        _sendResponse(res, req.url, data, 200);
      }
    });
  } else if (req.url === '/styles.css') {
    fs.readFile(__dirname + '/public/styles.css', function(err, data) {
      if (err) {
        console.error(err);
        _sendResponse(res, null, 'File Not Found', 404);
      } else {
        _sendResponse(res, req.url, data, 200);
      }
    });
  } else if (req.url === '/loading.html') {
    fs.readFile(__dirname + '/public/loading.html', function(err, data) {
      if (err) {
        console.error(err);
        _sendResponse(res, null, 'File Not Found', 404);
      } else {
        _sendResponse(res, req.url, data, 200);
      }
    });
  } else {
    _sendResponse(res, null, 'File Not Found', 404);
  }
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};

var _sendResponse = function(res, url, data, status) {
  data = data || '';
  headers['Content-Type'] = _parseContentType(url);
  res.writeHead(status, headers);
  res.end(data);
};

var _parseContentType = function(url) {
  var fileExtension = url.substr(url.lastIndexOf('.') + 1);
  if (fileExtension === 'js') {
    return 'application/js';
  } else if (fileExtension === 'css') {
    return 'text/css';
  } else if (fileExtension === 'html') {
    return  'text/html';
  } else {
    return 'text';
  }
};

// As you progress, keep thinking about what helper functions you can put here!
