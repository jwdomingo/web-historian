var http = require('http');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.updateSiteDiffs = function() {
  fs.readFile(__dirname + '/../web/archives/sites.txt', 'utf-8', function(err, data) {
    if (err) {
      console.error(err);
    } else {
      data.split(',').forEach(function(site) {
        _isUrlArchived(site);
      });    
    }
  });
};

exports.isUrlInList = function() {
};

exports.addUrlToList = function() {
};

var _isUrlArchived = function(site) {
  fs.readdir(__dirname + '/../web/archives/sites', function(err, domains) {
    if (err) {
      console.error(err);
    } else if (domains.indexOf(site) === -1) {
      _downloadUrls(site);
    }
  });
};

var _downloadUrls = function(site) {
  var options = {
    host: site,
    port: 80,
    path: '/index.html'
  };

  var buffer = '';
  http.get(options, function(response){
    response.on('data', function(chunk){
      buffer += chunk.toString();
    });

    response.on('end', function() {
      fs.writeFile(__dirname + '/../web/archives/sites/' + site, buffer, function(err) {
        if (err) {
          console.error(err);
        }
      });
    });
  }).on('error', function(err){
    console.error(err);
  });
};
