#!/usr/local/bin/node

var http = require('http');
var fs = require('fs');

var diff = [];

fs.readFile(__dirname + '/../web/archives/sites.txt', 'utf-8', function(err, data) {
  if (err) {
    console.error(err);
  } else {
    var sites = data.split(',').forEach(function(site) {
      fs.readdir(__dirname + '/../web/archives/sites', function(err, domains) {
        if (err) {
          console.error(err);
        } else if (domains.indexOf(site) === -1) {
          
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
        }
      });
    });    
  }
});