
var expect = require('chai').expect;
var assert = require('chai').assert;

var FileHelper = require('../modules/FileHelper.js');

describe('FileHelper', function () {

    it('should read kamus.json', function () {
        FileHelper.loadKamus(function(data){
            console.log(data);
        });
    });

});
