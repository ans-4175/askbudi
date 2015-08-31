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

FileHelper.prototype.preprocess = function(data) {
	return new Promise( function (resolve, reject) {
		var original = data;
		var tweet = {
			twid: original['id'],
			active: false,
			author: original['user']['name'],
			avatar: original['user']['profile_image_url'],
			body: original['text'],
			date: original['created_at'],
			screenname: original['user']['screen_name']
		};
		resolve(tweet);
	});
}
}

module.exports = new FileHelper ();