Soil = require('../models/soil.js');

exports.listSoils = function(req, res){
	Soil.find(function(err, soils){
		res.render('soils', { soils: soils });
	});
}