'use strict';

var FileHelper = require('./modules/FileHelper.js');
var TwitterClient = require('./modules/TwitterClient.js');

FileHelper.loadKamus()
	.then(TwitterClient.stream)
	.catch(console.log);

TwitterClient.event.on('ada_stream', function(tweet) {
	TwitterClient.correction(tweet)
		.then(TwitterClient.postTweet)
		.catch(TwitterClient.postTweet);
});

TwitterClient.event.on('ada_error', function(error) {
	console.log(error);
});