var path = require('path');
var archive = require('../helpers/archive-helpers');
var util = require('./http-helpers');
var fs = require('fs');

var asset;

exports.handleRequest = function (req, res) {
  console.log(req.method,'request URL comming in: ', req.url);
  if (req.method === "GET") {
    asset = req.url !== '/' ? req.url : '/public/index.html';
    util.serveAssets(res, asset);
  } else if (req.method === "POST") {
    console.log("GOTA POST");
    var data;
    req.on('data', function(chunk) {
      data += chunk.toString();
    });

    req.on('end', function() {
      data = data || '';
      var site = util.parseURL(data);
      fs.readFile(__dirname + '/archives/sites/' + site, function(err, data) {
        if (err) {
          fs.readFile(__dirname + '/archives/sites.txt', 'utf-8', function(err, data) {
            if (err) {
              console.error(err);
            } else {
              data.data = data.data || '';
              var siteArchived = data.split(',').reduce(function(status, archive) {
                return status ? true : site === archive;
              }, false);
              if (!siteArchived) {
                fs.appendFile(__dirname + '/archives/sites.txt', data.length ? ',' + site : site, function(err) {
                  if (err) console.error(err);
                });
              }
            }
          });
          util.serveAssets(res, req.url);
        } else {
          asset = '/archives/sites/' + site;
          util.serveAssets(res, asset);
        }
      });
    });
  }
  // res.end(archive.paths.list); 
};
