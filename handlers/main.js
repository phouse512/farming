Farm = require('../models/farm.js');
message = require('../lib/random_message.js'),

exports.gameHome = function(req, res){
	Farm.find({ 'player': req.user._id }).populate('landPlots').exec(function(err, farm){
		res.render('gameHome', { farm: farm[0].exportArray() });
	});
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