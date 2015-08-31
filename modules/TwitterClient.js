/*! TwitterClient v0.0.0 - MIT license */

'use strict';

/**
 * Module dependencies
 */
var _ = require('underscore');
var Promise = require('bluebird');
var Twitter = require('twitter');
var EventEmitter = require("events").EventEmitter;

/**
 * @param {}
 * @return {}
 * @api public
 */

var TwitterClient = function () {};

TwitterClient.prototype.kamus = [[]];
TwitterClient.prototype.event = new EventEmitter();
TwitterClient.prototype.stream = function(kamus) {
	TwitterClient.prototype.kamus = kamus;
	// TwitterClient.prototype.correction(kamus, 'paham');
	var client = new Twitter({
		consumer_key: 'Dsmj7TH879HnWAA6n4aug',
		consumer_secret: 'Wya4BuwIjGn5MJLbYcH3FqGjJhUmo63eSAu1jZ4fZk',
		access_token_key: '3334132323-2EGzJaw0KCDm8ibP6NuppZ1iAIdZ02yVepzcaiE',
		access_token_secret: '1q4z86o9pHv2l3Dj0hQMQ8vX7PTDHBzTlrWsUWcC8usCX'
	});
	// client.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {console.log(data)})
	client.stream('statuses/filter', {locations: '107.4379109,-6.9708697,107.7455281,-6.8435694,106.7067372,-6.328073,106.9888851,-6.103677'}, function(stream) {
		stream.on('data', function(tweet) {
			TwitterClient.prototype.event.emit("ada_stream", tweet);
		});
		stream.on('error', function(error) {
			TwitterClient.prototype.event.emit("ada_error", error);
		});
	});
}
TwitterClient.prototype.correction = function(word) {
	return new Promise(function (resolve, reject) {
		var kamus = TwitterClient.prototype.kamus;
		var found = _.find(kamus, function (item) {return item[0] == word;});
		if (_.isUndefined(found))
			reject('not found');
		var sentence = "Maaf bukan '"+found[1]+"' mas/mbak, yang benar '"+found[0]+"'.";
		resolve(sentence);
	});
}

module.exports = new TwitterClient ();