/*! DataHelper v0.0.0 - MIT license */

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

var DataHelper = function () {};

DataHelper.prototype.preprocess = function(data) {
	return new Promise( function (resolve, reject) {
		var tweet = {
			twid: data['id'],
			active: false,
			author: data['user']['name'],
			avatar: data['user']['profile_image_url'],
			body: data['text'],
			date: data['created_at'],
			screen_name: data['user']['screen_name']
		};
		resolve(tweet);
	});
}

module.exports = new DataHelper ();