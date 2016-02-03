var path = require('path');
var archive = require('../helpers/archive-helpers');
var util = require('./http-helpers');

exports.handleRequest = function (req, res) {
  console.log('request URL comming in: ', req.url)
  if (req.method === "GET") {
    console.log('get requested')
    util.serveAssets(req, res);
  }
  // res.end(archive.paths.list); 
};
