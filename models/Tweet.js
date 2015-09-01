var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    twid       : String
    , active     : Boolean
    , author     : String
    , avatar     : String
    , body       : String
    , date       : Date
    , screen_name : String
});

var Tweet = mongoose.model('Tweet', schema);
module.exports = Tweet;