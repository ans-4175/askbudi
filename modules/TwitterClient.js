/*! TwitterClient v0.0.0 - MIT license */

'use strict';

/**
 * Module dependencies
 */
var _ = require('underscore');
var request = require('request');
var Promise = require('bluebird');
var Twitter = require('twitter');
var EventEmitter = require("events").EventEmitter;

/**
 * @param {}
 * @return {}
 * @api public
 */

var TwitterClient = function () {};

TwitterClient.prototype.event = new EventEmitter();
TwitterClient.prototype.stream = function() {
	var client = new Twitter({
		consumer_key: 'Dsmj7TH879HnWAA6n4aug',
		consumer_secret: 'Wya4BuwIjGn5MJLbYcH3FqGjJhUmo63eSAu1jZ4fZk',
		access_token_key: '3249425742-JtZeoEgChEOrS70MYbdxtGX0Ox8HBtWpkl2YCBf',
		access_token_secret: 'TkFzP5KfsH1u5zbp9eCE47e0vDZ9FjoEptR6FgUfyOAC6'
	});
	// client.stream('statuses/filter', {locations: '107.4379109,-6.9708697,107.7455281,-6.8435694,106.7067372,-6.328073,106.9888851,-6.103677'}, function(stream) {
	client.stream('statuses/filter', {track: '#askbudi'}, function(stream) {
		stream.on('data', function(tweet) {
			TwitterClient.prototype.event.emit("ada_stream", tweet);
		});
		stream.on('error', function(error) {
			TwitterClient.prototype.event.emit("ada_error", error);
		});
	});
}

TwitterClient.prototype.getAnswer = function(tweet) {
	return new Promise(function (resolve, reject) {
		var sentence = tweet.body;
		sentence = sentence.replace(' #askbudi', '');
		sentence = sentence.replace('#askbudi', '');


		var search_url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srsearch='+sentence;
		request({
			uri: search_url,
			method: "GET",
			timeout: 10000,
			followRedirect: true,
			maxRedirects: 10
		}, function(error, response, body) {
			if (error)
				reject(error);
			var data = JSON.parse(body);
			var results = data.query.search;
			if (results.length==0) {
				tweet.answer = 'can\'t find \''+sentence+'\', please try again';
				resolve(tweet);
			} else {
				var title = results[0].title;
				var answer_url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles='+title;
				request({
					uri: answer_url,
					method: "GET",
					timeout: 10000,
					followRedirect: true,
					maxRedirects: 10
				}, function(error, response, body) {
					if (error)
						reject(error);
					var key='';
					var data = JSON.parse(body);
					for (var i in data.query.pages)
						key = i;
					var content = data.query.pages[i].extract;
					if ((typeof(content)=='undefined')||(content.indexOf('This is a redirect from a title with another method of capitalisation.')>-1))
						content =  '';
					tweet.answer = (content.length > 0) ? content : 'can\'t find \''+title+'\', please try again';
					resolve(tweet);
				});
			}
		});
	});
}

TwitterClient.prototype.processAnswer = function(content) {
	return new Promise(function (resolve, reject) {
		var username = '@'+content.screen_name;
		var sentences = content.answer.split('.');
		var count = 0;
		var post = username + " " + sentences[0] + '.';
		do {
			count += 1;
			var temp = post + sentences[count] + '.';
			if ((temp.length<=140)&&(count<sentences.length))
				post = temp;
		} while ((temp.length<=140)&&(count<sentences.length))
		if (post.length>140)
			post = post.substring(0,137) + '...';
		resolve(post);
	});
}

TwitterClient.prototype.postTweet = function(data) {
	return new Promise(function (resolve, reject) {
		var client = new Twitter({
			consumer_key: 'Dsmj7TH879HnWAA6n4aug',
			consumer_secret: 'Wya4BuwIjGn5MJLbYcH3FqGjJhUmo63eSAu1jZ4fZk',
			access_token_key: '3334132323-2EGzJaw0KCDm8ibP6NuppZ1iAIdZ02yVepzcaiE',
			access_token_secret: '1q4z86o9pHv2l3Dj0hQMQ8vX7PTDHBzTlrWsUWcC8usCX'
		});
		client.post('statuses/update', { status: data }, function(err, data, response) {
			if (err)
				console.log(err)
			// console.log(data.text)
			resolve(data);
		});
	});
}

module.exports = new TwitterClient ();