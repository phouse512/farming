Farm = require('../models/farm.js');
Player = require('../models/player');
Seed = require('../models/seed');
Soil = require('../models/soil');
message = require('../lib/random_message.js');
var mongoose = require('mongoose'),
	deepPopulate = require('mongoose-deep-populate');

exports.gameHome = function(req, res){
	console.log(req.user);
	Player.findOne({ 'user': req.user._id }).populate('inventory').exec(function(err, player) {
		Farm.find({ 'player': player._id }).deepPopulate(['landPlots', 'landPlots.soilType', 'landPlots.seed']).exec(function(err, farm){
			finalFarm = farm[0].exportArray();
			finalFarm.player = player;
			res.render('gameHome', { farm: finalFarm });
		});
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
