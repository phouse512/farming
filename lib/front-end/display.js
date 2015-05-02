'use strict'

var kinetic = require('kinetic'),
	config = require('./config'),
	handlebars = require('handlebars'),
	displayHelper = require('./displayHelper');

module.exports = function(farm) {
	console.log('display is loading');

	var onload = function(farm, images){
			// set up farm
			var stage = new kinetic.Stage({
				container: 'container',
				width: config.PLOT_SIZE*farm.width,
				height: config.PLOT_SIZE*farm.height,
			});

			var farm_image = new kinetic.Layer();
			var soil_status = new kinetic.Layer();
			var highlight_layer = new kinetic.Layer();
			var temp_rect = new Array(farm.width*farm.height);
			var k = 0;
			var lastSelected = true;
			var firstSelected = false;

			var highlight = new kinetic.Rect({
				x: 0,
				y: 0,
				width: config.PLOT_SIZE,
				height: config.PLOT_SIZE,
				stroke: '#cdffb0',
				strokeWidth: 2,
				visible: false,
			});

			highlight_layer.add(highlight);

			//set up template hover
			var plotTemplate = handlebars.compile($("#plotHoverTemplate").html());
			var $plot = $("#plot");

			// loop through and create images for each plot
			for(var i=0; i<farm.landPlots.length; i++){
				for(var j=0; j<farm.landPlots[i].length; j++){
					temp_rect[k] = new kinetic.Rect({
						x: j*config.PLOT_SIZE,
						y: i*config.PLOT_SIZE,
						width: config.PLOT_SIZE,
						height: config.PLOT_SIZE,
						offset: {x:0, y:0},
						fill: config.land_status[farm.landPlots[i][j].soilType.name],
						stroke: 'black',
						strokeWidth: 1,
						id: j + '_' + i,
						plot: farm.landPlots[i][j],
					});

					// if no seeds
					if(farm.landPlots[i][j].status == 1) {
						var soil_rect = new kinetic.Image({
							x: j*config.PLOT_SIZE,
							y: i*config.PLOT_SIZE,
							width: config.PLOT_SIZE,
							height: config.PLOT_SIZE,
							image: images[config.TILLED_PATH],
						});
						soil_status.add(soil_rect);
					}

					temp_rect[k].moveToTop();
					

					temp_rect[k].on('mouseover', function(){
						$plot.html(plotTemplate( { plot: this.attrs.plot }));
					});

					temp_rect[k].on('click', function(){
						if(firstSelected){
							lastSelected.attrs.stroke = '#000000';
							lastSelected.attrs.strokeWidth = 0;
						}
						this.attrs.stroke = '#cdffb0';
						this.attrs.strokeWidth = 2;
						farm_image.draw();
						lastSelected = this;
						firstSelected = true;
					});
					farm_image.add(temp_rect[k]);
					k = k+1;
				}
			}
			soil_status.moveToTop();
			stage.add(farm_image);
			stage.add(soil_status);
			stage.add(highlight_layer);

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

	        var simpleText = new kinetic.Text({
	            x: 0,
	            y: config.ENERGY_BAR.HEIGHT/4,
	            text: currentEnergy + ' / ' + totalEnergy,
	            fontSize: 25,
	            fontFamily: 'Calibri',
	            width: config.ENERGY_BAR.WIDTH,
	            height: config.ENERGY_BAR.HEIGHT/2,
	            align: 'center',    
        	});

			energy.add(green_rect);
			energy.add(neg_rect);
			energy.add(simpleText);
			stage.add(energy);
		},
		tilled_image = new Image();

	var imagesToLoad = displayHelper.getPlotImages(farm.landPlots);
	displayHelper.loadAllPlotImages(imagesToLoad, farm, onload)
};