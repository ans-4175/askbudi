'use strict';

var FileHelper = require('./modules/FileHelper.js');
var TwitterClient = require('./modules/TwitterClient.js');

FileHelper.loadKamus()
	.then(TwitterClient.stream)
	.catch(console.log);

TwitterClient.event.on('ada_stream', function(tweet) {
	console.log('');
	console.log('@'+tweet.user.screen_name);
	console.log(tweet.text);
});