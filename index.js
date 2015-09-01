'use strict';

var Mongoose = require('mongoose');
var TwitterClient = require('./modules/TwitterClient.js');
var DataHelper = require('./modules/DataHelper.js');

Mongoose.connect('mongodb://localhost/askbudi');

TwitterClient.stream();

TwitterClient.event.on('ada_stream', function(tweet) {
	DataHelper.preprocess(tweet)
		.then(TwitterClient.getAnswer)
		.then(TwitterClient.processAnswer)
		.then(TwitterClient.postTweet)
		.catch(function () {});
});

TwitterClient.event.on('ada_error', function(error) {
	console.log(error);
});