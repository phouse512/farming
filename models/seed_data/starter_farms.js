Farm = require('../farm.js');
Soil = require('../soil.js');
Plot = require('../plot.js');

exports.generateFarm = function(height, width){
	var plots = new Array(height);
	var soils_array = [];
	//Soil.find(soilCallback);
	Soil.find(function(err, soils){
		// create plots with random soils
		for(var i=0; i < plots.length; i++){
			plots[i] = new Array(width);
			for(var j=0; j < plots[i].length; j++){
				var randSoil = soils[Math.floor(Math.random() * soils.length)];
				new 
			}
		}
	});

	console.log(soils_array);
	console.log(plots);
}