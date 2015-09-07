'use strict';
var assert = require('assert');
var TwitterClient = require('../../modules/TwitterClient.js');

describe('TwitterClient node module', function () {

	it('getAnswer', function () {
		var search = {screen_name:'anpandu', body:'ninja #askbudi'};
		return TwitterClient.getAnswer(search).then(function(data){
			assert('screen_name' in data, 'screen_name not found');
			assert('body' in data, 'body not found');
			assert('answer' in data, 'answer not found');
	    });
	});

	it('getAnswer #2', function () {
		var search = {screen_name:'anpandu', body:'aisldnalncldg #askbudi'};
		return TwitterClient.getAnswer(search).then(function(data){
			assert('screen_name' in data, 'screen_name not found');
			assert('body' in data, 'body not found');
			assert('answer' in data, 'answer not found');
			assert("can't find 'aisldnalncldg', please try again" === data.answer, 'answer not found #2');
	    });
	});

	it('getAnswer #3', function () {
		var search = {screen_name:'anpandu', body:'milky way #askbudi'};
		return TwitterClient.getAnswer(search).then(function(data){
			assert('screen_name' in data, 'screen_name not found');
			assert('body' in data, 'body not found');
			assert('answer' in data, 'answer not found');
	    });
	});

	it('getAnswer #4', function () {
		var search = {screen_name:'anpandu', body:'RT @wonkdesu milky way #askbudi'};
		return TwitterClient.getAnswer(search)
			.then(function(data){})
			.catch(function(data){
				assert(data == 'containing RT', 'not containing RT');
			});
	});

	it('processAnswer', function () {
		var input = {
		    screen_name: "anpandu",
		    body: "database #askbudi",
		    answer: "A database is an organized collection of data. It is the collection of schemes, tables, queries, reports, views and other objects. The data is typically organized to model aspects of reality in a way that supports processes requiring information, such as modelling the availability of rooms in hotels in a way that supports finding a hotel with vacancies.\nA database management system (DBMS) is a computer software application that interacts with the user, other applications, and the database itself to capture and analyze data. A general-purpose DBMS is designed to allow the definition, creation, querying, update, and administration of databases. Well-known DBMSs include MySQL, PostgreSQL, Microsoft SQL Server, Oracle, Sybase and IBM DB2. A database is not generally portable across different DBMSs, but different DBMS can interoperate by using standards such as SQL and ODBC or JDBC to allow a single application to work with more than one DBMS. Database management systems are often classified according to the database model that they support; the most popular database systems since the 1980s have all supported the relational model as represented by the SQL language. Sometimes a DBMS is loosely referred to as a 'database'."
		};
		return TwitterClient.processAnswer(input).then(function(data){
			assert(data.length <= 140, 'string more than 140 characters');
	    });
	});

	it('getAnswer & processAnswer', function () {
		var search = {screen_name:'anpandu', body:'within temptation #askbudi'};
		return TwitterClient.getAnswer(search).then(function(data){
			return TwitterClient.processAnswer(data).then(function(data){
				assert(data.length <= 140, 'string more than 140 characters');
		    });
	    });
	});

});
