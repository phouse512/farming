Farm = require('../models/farm.js');
Player = require('../models/player');
Seed = require('../models/seed');
Soil = require('../models/soil');
message = require('../lib/random_message.js');
var mongoose = require('mongoose'),
	deepPopulate = require('mongoose-deep-populate');

exports.gameHome = function(req, res){
	Farm.find({ 'player': req.user._id }).deepPopulate(['landPlots', 'player', 'landPlots.soilType', 'landPlots.seed']).exec(function(err, farm){
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
