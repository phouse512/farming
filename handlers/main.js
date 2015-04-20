Farm = require('../models/farm.js');
message = require('../lib/random_message.js'),

exports.gameHome = function(req, res){
	Farm.find(function(err, farms){
		console.log(farms);
	});
	res.render('gameHome');
}

exports.about = function(req, res){
	res.render('about', {
		message: message.getMessage(),
		pageTestScript: '/qa/about-tests.js'
	});
}

exports.home = function(req, res){
	res.render('home');
}