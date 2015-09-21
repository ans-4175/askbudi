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
var fs = require('fs');
var DataHelper = require('./DataHelper.js');

/**
 * @param {}
 * @return {}
 * @api public
 */

var TwitterClient = function () {
	var _this = this;
	fs.readFile('config.json', 'utf8', function (err,data) {
		if (err)
			return console.log(err);
		_this.credential = JSON.parse(data);
		_this.client = new Twitter(_this.credential);
		_this.stream();
	});
};

TwitterClient.prototype.event = new EventEmitter();

TwitterClient.prototype.stream = function() {
	this.client.stream('statuses/filter', {track: '#askbudi'}, function(stream) {
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
		if (sentence.indexOf('RT')>-1)
			reject('containing RT');
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
		fs.readFile('config.json', 'utf8', function (err,config) {
			if (err) return console.log(err);
			var credential = JSON.parse(config);
			var client = new Twitter(credential);
			client.post('statuses/update', { status: data }, function(err, data, response) {
				if (err)
					console.log(err)
				// console.log(data.text)
				resolve(data);
			});
		});
	});
}

TwitterClient.prototype.sendToFrontEnd = function(twit) {
	return new Promise(function (resolve, reject) {
		TwitterClient.prototype.event.emit('frontend:send', twit);
		resolve(twit);
	});
}

TwitterClient.prototype.event.on('ada_stream', function(tweet) {
	DataHelper.preprocess(tweet)
		.then(function (data) {
			var p1 = DataHelper.saveToMongo(data)
				.then(TwitterClient.prototype.sendToFrontEnd)
				.then(function (twit) {console.log(twit.body);})
				.catch(console.log);
			var p2 = TwitterClient.prototype.getAnswer(data)
				.then(TwitterClient.prototype.processAnswer)
				.then(TwitterClient.prototype.postTweet)
				.then(DataHelper.preprocess)
				.then(DataHelper.saveToMongo)
				.then(TwitterClient.prototype.sendToFrontEnd)
				.then(function (twit) {console.log(twit.body);})
				.catch(console.log);
			return Promise.all([p1, p2]);
		})
		.catch(console.log);
});
TwitterClient.prototype.event.on('ada_error', function(error) {
	console.log(error);
});

module.exports = new TwitterClient ();