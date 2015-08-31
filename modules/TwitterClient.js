/*! TwitterClient v0.0.0 - MIT license */

'use strict';

/**
 * Module dependencies
 */
var _ = require('underscore');
var Twitter = require('twitter');
var EventEmitter = require("events").EventEmitter;

/**
 * @param {}
 * @return {}
 * @api public
 */

var TwitterClient = function () {};

TwitterClient.prototype.event = new EventEmitter();
TwitterClient.prototype.stream = function(data) {
	var client = new Twitter({
		consumer_key: 'Dsmj7TH879HnWAA6n4aug',
		consumer_secret: 'Wya4BuwIjGn5MJLbYcH3FqGjJhUmo63eSAu1jZ4fZk',
		access_token_key: '3334132323-2EGzJaw0KCDm8ibP6NuppZ1iAIdZ02yVepzcaiE',
		access_token_secret: '1q4z86o9pHv2l3Dj0hQMQ8vX7PTDHBzTlrWsUWcC8usCX'
	});
	client.stream('statuses/filter', {locations: '107.4379109,-6.9708697,107.7455281,-6.8435694,106.7067372,-6.328073,106.9888851,-6.103677'}, function(stream) {
		stream.on('data', function(tweet) {
			TwitterClient.prototype.event.emit("ada_stream", tweet);
		});
		stream.on('error', function(error) {
			TwitterClient.prototype.event.emit("ada_error", error);
		});
	});
}

module.exports = new TwitterClient ();