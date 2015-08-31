/*! TwitterClient v0.0.0 - MIT license */

'use strict';

/**
 * Module dependencies
 */
var _ = require('underscore');
var Promise = require('bluebird');
var Twitter = require('twitter');
var EventEmitter = require("events").EventEmitter;
var Tokenizer = require('../modules/Tokenizer.js');

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
TwitterClient.prototype.correction = function(tweet) {
	return new Promise(function (resolve, reject) {
		var sentence = tweet.text;
		var kamus = TwitterClient.prototype.kamus;
		var words = Tokenizer.tokenize(sentence);
		_.each(words, function (word) {
			var found = _.find(kamus, function (item) {return item[0] == sentence;});
			var result = {};
			result.original = tweet;
			if (_.isUndefined(found)) {
				result.sentence = 'all is correct';
				reject(result);
			}
			result.sentence = "Maaf bukan '"+found[1]+"' mas/mbak, yang benar '"+found[0]+"'.";
			resolve(result);
		})
	});
}
TwitterClient.prototype.postTweet = function(data) {
	return new Promise(function (resolve, reject) {
		var tweet = data.original;
		var stream = {};
		stream.username = '@'+tweet.user.screen_name;
		stream.text = tweet.text;
		console.log(JSON.stringify(stream));
		// var post = stream.username + " " + data.sentence;
		// console.log('');
		// console.log(stream.username);
		// console.log(stream.text);
		// console.log(post);
	});
}

module.exports = new TwitterClient ();