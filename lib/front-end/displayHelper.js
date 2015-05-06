'use strict'

var config = require('./config'),
	kinetic = require('kinetic');

module.exports = {
	getPlotImages: function(plots) {
		console.log(plots);
		var newImages = new Array();
		var tilled = true;

		for(var i=0;i < plots.length; i++) {
			for (var j=0;j < plots[i].length; j++){
				if(plots[i][j].stage){
					console.log('add seeds');
				} else if(plots[i][j].status == 1 && tilled) {
					// this is a tilled piece of soil
					newImages.push(config.TILLED_PATH);
					tilled = false;
				}
			}
		}
		return newImages;
	},
	loadAllPlotImages: function(imageArray, farm, stage, callback) {
		var images = {},
			imagesOK = 0;

		if(imageArray.length < 1){
			callback(farm, stage, images);
		}

      	for (var i=0; i<imageArray.length; i++) {
            var img = new Image();
            images[imageArray[i]] = img;
            img.onload = function(){ 
                imagesOK++; 
                if (imagesOK>=imageArray.length ) {
                	console.log('mm');
                    var result = callback(farm, stage, images);
                    //console.log(result);
                    return result;
                }
            };
            img.onerror=function(){alert("image load failed");} 
            img.crossOrigin="anonymous";
            img.src = imageArray[i];
        }
	},
	getCoordinates: function(stage, farm, callback){
		var hoverLayer = new kinetic.Layer();
		var temp_hover = [],
			k=0,
			firstSelected = false,
			lastSelected = true;
		for(var i=0;i<farm.landPlots.length;i++){
			for(var j=0;j < farm.landPlots[i].length; j++){
				temp_hover[k] = new kinetic.Rect({
					x: j*config.PLOT_SIZE,
					y: i*config.PLOT_SIZE,
					width: config.PLOT_SIZE,
					height: config.PLOT_SIZE,
				});

				temp_hover[k].on('mouseover', function(){
					if(firstSelected){
						lastSelected.attrs.stroke = '#000000';
						lastSelected.attrs.strokeWidth = 0;
					}

					this.attrs.stroke = '#c6e2ff';
					this.attrs.strokeWidth = 3;
					hoverLayer.draw();
					lastSelected = this;
					firstSelected = true;
				});

				temp_hover[k].on('click', function(){
					hoverLayer.remove();
					hoverLayer.draw();
					callback(this.attrs.x + '_' + this.attrs.y);
				});

				hoverLayer.add(temp_hover[k]);
				k=k+1;
			}
		}

		stage.add(hoverLayer);

	},
}