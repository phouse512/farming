'use strict'

var kinetic = require('kinetic'),
	config = require('./config'),
	handlebars = require('handlebars'),
	displayHelper = require('./displayHelper'),
	_ = require('lodash');

module.exports = function(farm, nextLevel) {
	console.log('displa is loading');
 	
	var	onload = function(farm, stage, images){
			// set up farm
			var stage = new kinetic.Stage({
				container: 'container',
				width: config.PLOT_SIZE*farm.width,
				height: config.PLOT_SIZE*farm.height,
			});

			console.log(stage);

			var farm_image = new kinetic.Layer();
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
				strokeWidth: 3,
				visible: false,
			});

			highlight_layer.add(highlight);

			//set up template hover
			var plotTemplate = handlebars.compile($("#plotHoverTemplate").html());
			var $plot = $("#plot");

			//set up template action
			var plotActionTemplate = handlebars.compile($("#plotActionTemplate").html());
			var $plotAction = $("#plotAction");

			console.log('farm in here:');
			console.log(farm.landPlots);
			// loop through and create images for each plot
			for(var i=0; i<farm.landPlots.length; i++){
				for(var j=0; j<farm.landPlots[i].length; j++){
					console.log(farm.landPlots[i][j].soilType.name);
					temp_rect[k] = new kinetic.Image({
						x: j*config.PLOT_SIZE,
						y: i*config.PLOT_SIZE,
						width: config.PLOT_SIZE,
						height: config.PLOT_SIZE,
						fill: config.land_status[farm.landPlots[i][j].soilType.name],
						stroke: 'black',
						strokeWidth: 1,
						id: j + '_' + i,
						plot: farm.landPlots[i][j],
					});

					if(farm.landPlots[i][j].stage){
						console.log('there are seeds herez');
						//change this once real images are here:
					} else if(farm.landPlots[i][j].status == 1){
						temp_rect[k].image(images[config.TILLED_PATH]);
						//temp_rect[k].fill('white');
					} else {
						temp_rect[k].image(tilled_image);
					}

					temp_rect[k].on('mouseover', function(){
						$plot.html(plotTemplate( { plot: this.attrs.plot }));
					});

					temp_rect[k].on('click', function(){
						if(firstSelected){
							lastSelected.attrs.stroke = '#000000';
							lastSelected.attrs.strokeWidth = 0;
						}
						this.attrs.stroke = '#cdffb0';
						this.attrs.strokeWidth = 3;
						farm_image.draw();
						lastSelected = this;
						firstSelected = true;
						$plotAction.html(plotActionTemplate());
					});
					farm_image.add(temp_rect[k]);
					k = k+1;
				}
			}
			stage.add(farm_image);
			stage.add(highlight_layer);

			// set up inventory
			var playerTemplate = handlebars.compile($('#playerTemplate').html());
			var $player = $("#player");
			farm.player.farmingExperience = farm.player.farmingExperience + '/' + nextLevel;
			farm.player.toolInventory = _.map(farm.player.toolInventory, function(tool){
				tool.toolType = config.TOOL_ACTIONS[tool.toolType];
				return tool;
			});
			$player.html(playerTemplate( { player: farm.player }));
		
			drawEnergy(farm.player.energy,farm.player.energyTotal);


			displayHelper.getCoordinates(stage, farm, function(coords){
				console.log(coords);
			});

			return stage;
		},
		drawEnergy = function(currentEnergy, totalEnergy){
			console.log('drawing energy');
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
	
	var stage = new kinetic.Stage({
		container: 'container',
		width: config.PLOT_SIZE*farm.width,
		height: config.PLOT_SIZE*farm.height,
	});




	//console.log(farm);
	var imagesToLoad = displayHelper.getPlotImages(farm.landPlots);
	console.log(imagesToLoad);
	displayHelper.loadAllPlotImages(imagesToLoad, farm, stage, onload);
	//console.log(stage);


};