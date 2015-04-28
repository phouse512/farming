WaterTool = require('../waterTool.js');

exports.seedWaterTool = function(){
	WaterTool.find(function(err, waterTools){
		if(waterTools.length){
			console.log('Some watering tools already exist, not seeding');
			return;
		}

		console.log('Seeding with base watering tools');
		new WaterTool({
			name: 'standard watering can',
			levelRequired: 1,
			toolType: 'can',
			energyCost: 1,
			effectStrength: 1,
			effectArea: 0,
			version: 1.0,
		}).save();
	});
}