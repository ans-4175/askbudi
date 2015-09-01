'use strict';

var Mongoose = require('mongoose');
var TwitterClient = require('./modules/TwitterClient.js');
var DataHelper = require('./modules/DataHelper.js');

Mongoose.connect('mongodb://localhost/askbudi');

TwitterClient.stream();

TwitterClient.event.on('ada_stream', function(tweet) {
	DataHelper.preprocess(tweet)
		.then(function (data) {
			DataHelper.saveToMongo(data)
				.then(function (twit) {
					console.log(twit.body);
				})
				.catch(console.log);
			return TwitterClient.getAnswer(data)
				.then(TwitterClient.processAnswer)
				.then(TwitterClient.postTweet)
				.then(DataHelper.preprocess)
				.then(DataHelper.saveToMongo)
				.then(function (twit) {
					console.log(twit.body);
				})
				.catch(console.log);
		})
		.catch(console.log);
});

TwitterClient.event.on('ada_error', function(error) {
	console.log(error);
});