'use strict'

var kinetic = require('kinetic'),
	config = require('./config'),
	handlebars = require('handlebars');

module.exports = function(farm) {
	console.log('display is loading');

	var onload = function(farm){
			// set up farm
			var stage = new kinetic.Stage({
				container: 'container',
				width: config.PLOT_SIZE*farm.width,
				height: config.PLOT_SIZE*farm.height,
			});

			var farm_image = new kinetic.Layer();

			// loop through and create images for each plot
			for(var i=0; i<farm.landPlots.length; i++){
				for(var j=0; j<farm.landPlots[i].length; j++){
					var temp_rect = new kinetic.Rect({
						x: j*config.PLOT_SIZE,
						y: i*config.PLOT_SIZE,
						width: config.PLOT_SIZE,
						height: config.PLOT_SIZE,
						offset: {x:0, y:0},
						fill: config.land_status[farm.landPlots[i][j].soilType.name],
						stroke: 'black',
						strokeWidth: 1
					});
					farm_image.add(temp_rect);
				}
			}
			stage.add(farm_image);


			// set up inventory
			var playerTemplate = handlebars.compile($('#playerTemplate').html());

			var $player = $("#player");
			console.log(farm.player);
			$player.html(playerTemplate( { player: farm.player }));
		
			drawEnergy(farm.player.energy,farm.player.energyTotal);
		},
		drawEnergy = function(currentEnergy, totalEnergy){
			var stage = new kinetic.Stage({
				container: 'playerEnergy',
				width: config.ENERGY_BAR.WIDTH,
				height: config.ENERGY_BAR.HEIGHT,
			});

			var positive_width = config.ENERGY_BAR.WIDTH * (currentEnergy/totalEnergy);

			var energy = new kinetic.Layer();
			var green_rect = new kinetic.Rect({
				x: 0,
				y: 0,
				width: positive_width,
				height: 50,
				offset: {x:0,y:0},
				fill: config.ENERGY_BAR.GREEN,
				stroke: 'black',
				strokeWidth: 0,
			});
			var neg_rect = new kinetic.Rect({
				x: positive_width,
				y: 0,
				width: config.ENERGY_BAR.WIDTH - positive_width,
				height: 50,
				offset: {x:0,y:0},
				fill: config.ENERGY_BAR.NEG,
				stroke: 'black',
				strokeWidth: 0,
			});
			energy.add(green_rect);
			energy.add(neg_rect);
			stage.add(energy);
		};

	onload(farm);
};