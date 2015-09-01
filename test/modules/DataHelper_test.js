'use strict';
var assert = require('assert');
var DataHelper = require('../../modules/DataHelper.js');

describe('DataHelper node module', function () {

	it('preprocess', function () {
		var input = {
		    "created_at": "Mon Aug 31 15:45:50 +0000 2015",
		    "id": 638377163121557500,
		    "id_str": "638377163121557505",
		    "text": "Kadek Rihardika with M.U.D.A Project #FusionJungle (with Fadhil, Ug's, and 3 others at @rscafeina) [vid] — https://t.co/MhKYyBWVmH",
		    "truncated": false,
		    "user": {
		        "id": 77960522,
		        "id_str": "77960522",
		        "name": "wita wibisono",
		        "screen_name": "CurlyWiL",
		        "location": "",
		        "url": null,
		        "description": "a sinner and street singer who loves to cook in a sexy way - IG: @fusionjungle @rockcampus @klausasband @seche307",
		        "protected": false,
		        "verified": false,
		        "followers_count": 1393,
		        "friends_count": 494,
		        "listed_count": 8,
		        "favourites_count": 25,
		        "statuses_count": 20148,
		        "created_at": "Mon Sep 28 08:20:12 +0000 2009",
		        "utc_offset": -25200,
		        "time_zone": "Pacific Time (US & Canada)",
		        "geo_enabled": true,
		        "lang": "en",
		        "contributors_enabled": false,
		        "is_translator": false,
		        "profile_background_color": "330830",
		        "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/41689714/RockAndRoll2.jpg",
		        "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/41689714/RockAndRoll2.jpg",
		        "profile_background_tile": true,
		        "profile_link_color": "3E0F45",
		        "profile_sidebar_border_color": "420B45",
		        "profile_sidebar_fill_color": "FF8B26",
		        "profile_text_color": "521752",
		        "profile_use_background_image": true,
		        "profile_image_url": "http://pbs.twimg.com/profile_images/635449580688052233/JNAI-m2l_normal.jpg",
		        "profile_image_url_https": "https://pbs.twimg.com/profile_images/635449580688052233/JNAI-m2l_normal.jpg",
		        "profile_banner_url": "https://pbs.twimg.com/profile_banners/77960522/1366971435",
		        "default_profile": false,
		        "default_profile_image": false
		    },
		    "place": {
		        "id": "d753c2420f2a8da5",
		        "url": "https://api.twitter.com/1.1/geo/id/d753c2420f2a8da5.json",
		        "place_type": "city",
		        "name": "Cilandak",
		        "full_name": "Cilandak, DKI Jakarta",
		        "country_code": "ID",
		        "country": "Indonesia",
		        "bounding_box": {},
		        "attributes": {}
		    },
		    "retweet_count": 0,
		    "favorite_count": 0,
		    "entities": {},
		    "favorited": false,
		    "retweeted": false,
		    "possibly_sensitive": false,
		    "filter_level": "low",
		    "lang": "en",
		    "timestamp_ms": "1441035950819"
		};
		return DataHelper.preprocess(input).then(function(data){
			assert('twid' in data, 'twid not found');
			assert('active' in data, 'active not found');
			assert('author' in data, 'author not found');
			assert('avatar' in data, 'avatar not found');
			assert('body' in data, 'body not found');
			assert('date' in data, 'date not found');
			assert('screen_name' in data, 'screen_name not found');
	    });
	});

});
