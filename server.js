'@namespace PublicVoting';
var config = require('./config.js');
var logger = require('./lib/logging.js'); 

var express = require('express');
var app = express();

// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

logger.debug('Starting server.');
app.listen(config.server_listen_port);
logger.info('Server started en listening to port ' + config.server_listen_port);