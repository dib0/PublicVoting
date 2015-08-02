var config = require('../config.js');
var logger = require('winston');

logger.setLevels({debug:0,info: 1,silly:2,warn: 3,error:4,});
logger.addColors({debug: 'green',info:  'cyan',silly: 'magenta',warn:  'yellow',error: 'red'});
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, { level: config.logLevel, colorize:true });
logger.add(logger.transports.File, { level: config.logLevel, colorize:false, filename: config.logFile, json: false, tailable: true, zippedArchive: true });

module.exports = logger;