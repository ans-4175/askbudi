'use strict';
var assert = require('assert');

var Mongoose = require('mongoose');
var Tweet = require('../../models/Tweet.js');
Mongoose.connect('mongodb://localhost/askbudi');

describe('Tweet model', function () {

	it('connect', function () {		
		var params = {
		    twid: 638210150889721900,
		    active: false,
		    author: "Denny ",
		    avatar: "http://pbs.twimg.com/profile_images/634713161472458752/B8FUKyP3_normal.png",
		    body: "Anjay hahaha  https://t.co/Q8d4jFePeU",
		    date: "Mon Aug 31 04:42:12 +0000 2015",
		    screen_name: "Dennyivanto"
		}
		var t = new Tweet(params);
		return t.save(function (err, t) {
			if (err) 
				return console.error(err);
			assert('_id' in t, 'tweet doesn\'t have _id');
			Tweet.find({ _id: t._id }).remove().exec();
		});
	});

});
