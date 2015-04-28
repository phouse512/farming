'use strict'

var kinetic = require('kinetic'),
	config = require('./config');

module.exports = function(farm) {
	console.log('display is loading');

	var onload = function(farm){
			var stage = new kinetic.Stage({
				container: 'container',
				width: 20*farm.width,
				height: 20*farm.height,
			});

			var farm_image = new kinetic.Layer();

			for(var i=0; i<farm.landPlots.length; i++){
				for(var j=0; j<farm.landPlots[i].length; j++){

					console.log(farm.landPlots[i][j]);
					var temp_rect = new kinetic.Rect({
						x: j*config.PLOT_SIZE,
						y: i*config.PLOT_SIZE,
						width: 20,
						height: 20,
						offset: {x:0, y:0},
						fill: config.land_status[farm.landPlots[i][j]],
						stroke: 'black',
						strokeWidth: 1
					});
					farm_image.add(temp_rect);
				}
			}
			// var rect = new kinetic.Rect({
			// 	x: 289,
			// 	y: 100,
			// 	width: 200,
			// 	height: 100,
			// 	offset: {x:100, y:10},
			// 	fill: 'green',
			// 	stroke: 'black',
			// 	strokeWidth: 4
			// });

			// // add the shape to the layer
			// farm.add(rect);

			// add the layer to the stage
			stage.add(farm_image);
		};

	onload(farm);
};