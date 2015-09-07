'use strict';

var Mongoose = require('mongoose');
var TwitterClient = require('./modules/TwitterClient.js');
var DataHelper = require('./modules/DataHelper.js');

Mongoose.connect('mongodb://localhost/askbudi');

var TweetModel = require('./models/Tweet.js');

TwitterClient.stream();

TwitterClient.event.on('ada_stream', function(tweet) {
	DataHelper.preprocess(tweet)
		.then(function (data) {
			var p1 = DataHelper.saveToMongo(data)
				.then(TwitterClient.sendToFrontEnd)
				.then(function (twit) {console.log(twit.body);})
				.catch(console.log);
			var p2 = TwitterClient.getAnswer(data)
				.then(TwitterClient.processAnswer)
				.then(TwitterClient.postTweet)
				.then(DataHelper.preprocess)
				.then(DataHelper.saveToMongo)
				.then(TwitterClient.sendToFrontEnd)
				.then(function (twit) {console.log(twit.body);})
				.catch(console.log);
			return Promise.all([p1, p2]);
		})
		.catch(console.log);
});

TwitterClient.event.on('ada_error', function(error) {
	console.log(error);
});

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

// app.get('/get_tweets', function (req, res) {
// 	// res.sendfile(__dirname + '/index.html');
// });

var connection_count = 0;

io.on('connection', function (socket) {
	connection_count += 1;
	console.log(connection_count+' user(s) connected');
	
	TweetModel.find({})
		.sort({'date': -1})
		.limit(50)
		.exec(function (err, items) {
			socket.emit('frontend:init', items);
		});

	TwitterClient.event.on('frontend:send', function(twit) {
		socket.emit('frontend:list', twit);
	});

	socket.on('disconnect', function (socket) {
		connection_count -= 1;
		console.log(connection_count+' user(s) connected');
	});
});
