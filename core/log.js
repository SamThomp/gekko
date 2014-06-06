/*

  Lightweight logger, print everything that is send to error, warn
  and messages to stdout (the terminal). If config.debug is set in config
  also print out everything send to debug.

*/

var moment = require('moment');
var fmt = require('util').format;
var _ = require('lodash');
var debug = require('./util').getConfig().debug;

var fs = require('fs');
var config = require('./util').getConfig();
var fileProperties = config.WriteToFile;

var Log = function() {
  _.bindAll(this);
};

Log.prototype = {
  _write: function(method, args, name) {
    if(!name)
      name = method.toUpperCase();

    var message = moment().format('YYYY-MM-DD HH:mm:ss');
    message += ' (' + name + '):\t';
    message += fmt.apply(null, args);

    console[method](message);
    this.writeToFile(message);
  },
  error: function() {
    this._write('error', arguments);
  },
  warn: function() {
    this._write('warn', arguments);
  },
  info: function() {
    this._write('info', arguments);
  }
}

Log.prototype.writeToFile = function (data) {
	if (this.writeFileChecker){
		fs.appendFile(fileProperties.name, data + '\n', this.writeFileError);
	}
}

Log.prototype.writeFileChecker = function () {
	if (fileProperties.enabled = true) {
		if (fileProperties.name = "" || fileProperties == undefined){
			fileProperties.name = 'output.txt';
		}
	}
	
	return fileProperties.enabled;
}

Log.prototype.writeFileError = function (err) {
	if (err){
		console.log('Error writing to file: See log.js');
	}
	else{
		// File is being written to.
	}
}

if(debug)
  Log.prototype.debug = function() {
    this._write('info', arguments, 'DEBUG');  
  }
else
  Log.prototype.debug = function() {};

module.exports = new Log;
