Farm = require('../models/farm.js');

exports.gameHome = function(req, res){
	Farm.find(function(err, farms){
		console.log(farms);
	});
	res.render('gameHome');
}