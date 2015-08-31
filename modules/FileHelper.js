/*! FileHelper v0.0.0 - MIT license */

'use strict';

/**
 * Module dependencies
 */
var _ = require('underscore');
var Promise = require('bluebird');

/**
 * @param {}
 * @return {}
 * @api public
 */

var FileHelper = function () {};

FileHelper.prototype.loadKamus = function() {
	return new Promise( function (resolve, reject) {
		var fs = require('fs');
		fs.readFile('modules/kamus.json', 'utf8', function(err, data) {
			var result = JSON.parse(data);
		    if(err)
		        reject([]);
		    resolve(result);
		});
	});
}

module.exports = new FileHelper ();