Soil = require('../models/soil.js');

exports.listSoils = function(req, res){
	Soil.find(function(err, soils){
		console.log(soils);
		res.render('soils', { soils: soils });
	});
}