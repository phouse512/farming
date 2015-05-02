'use strict'

var config = require('./config');

module.exports = {
	getPlotImages: function(plots) {
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
	loadAllPlotImages: function(imageArray, farm, callback) {
		var images = {},
			imagesOK = 0;
      	for (var i=0; i<imageArray.length; i++) {
            var img = new Image();
            images[imageArray[i]] = img;
            img.onload = function(){ 
                imagesOK++; 
                if (imagesOK>=imageArray.length ) {
                    callback(farm, images);
                }
            };
            img.onerror=function(){alert("image load failed");} 
            img.crossOrigin="anonymous";
            img.src = imageArray[i];
        } 
	}
}