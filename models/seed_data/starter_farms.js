Farm = require('../farm.js');
Soil = require('../soil.js');

function soilCallback(err, soils){
	console.log(soils);
}

exports.generateFarm = function(height, width){
	var plots = new Array(height);
	var soils_array = [];
	Soil.find(soilCallback);
	// Soil.find(function(err, soils){
	// 	soils_array = soils;
	// 	console.log(soils_array);
	// });

	for(var i=0; i < plots.length; i++){
		plots[i] = new Array(width);
		for(var j=0; j < plots[i].length; j++){

		}
	}
	console.log(soils_array);
	console.log(plots);
}