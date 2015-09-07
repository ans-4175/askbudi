/*! DataHelper v0.0.0 - MIT license */

'use strict';

/**
 * Module dependencies
 */
var _ = require('underscore');
var Promise = require('bluebird');
var Tweet = require('../models/Tweet.js');

/**
 * @param {}
 * @return {}
 * @api public
 */

var DataHelper = function () {};

DataHelper.prototype.preprocess = function(data) {
	return new Promise( function (resolve, reject) {
		if (data['text'].indexOf('RT')>-1)
			reject('containing RT');
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

DataHelper.prototype.saveToMongo = function(twit) {
	return new Promise( function (resolve, reject) {
		var t = new Tweet(twit);
		t.save(function (err, t) {
			if (err)
				reject(err);
			resolve(t);
		});
	});
}

module.exports = new DataHelper ();