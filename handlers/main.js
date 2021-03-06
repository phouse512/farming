Farm = require('../models/farm.js');
Player = require('../models/player');
Seed = require('../models/seed');
Soil = require('../models/soil');
message = require('../lib/random_message.js');
var mongoose = require('mongoose'),
	deepPopulate = require('mongoose-deep-populate'),
	levels = require('../lib/levels');

exports.gameHome = function(req, res){
	Player.findOne({ 'user': req.user._id }).populate('inventory').populate('toolInventory').exec(function(err, player) {
		Farm.find({ 'player': player._id }).deepPopulate(['landPlots', 'landPlots.soilType', 'landPlots.seed']).exec(function(err, farm){
			console.log(farm);
			finalFarm = farm[0].exportArray();
			finalFarm.player = player;
			res.render('gameHome', { farm: finalFarm, level: levels.farmingLevel[player.farmingLevel+1] });
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
