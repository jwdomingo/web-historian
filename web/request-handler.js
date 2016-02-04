var path = require('path');
var archive = require('../helpers/archive-helpers');
var util = require('./http-helpers');

exports.handleRequest = function (req, res) {
  console.log(req.method,'request URL comming in: ', req.url);
  if (req.method === "GET") {
    // console.log('get requested');
    util.serveAssets(req, res);
  } else if (req.method === "POST") {
    // console.log("GOTA POST");
    var data;
    req.on('data', function(chunk) {
      data += chunk.toString();
    });

    req.on('end', function() {
      console.log('data',data);
      util.serveAssets(req, res);
    });
  }
  // res.end(archive.paths.list); 
};
