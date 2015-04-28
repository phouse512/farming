TillTool = require('../tillTool.js');

exports.seedTillTool = function(){
	TillTool.find(function(err, tillTools){
		if(tillTools.length){
			console.log('Some tilling tools already exist, not seeding');
			return;
		}

		console.log('Seeding with base tilling tools');
		new TillTool({
			name: 'standard hoe',
			levelRequired: 1,
			toolType: 'hoe',
			energyCost: 2,
			effectArea: 0,
			version: 1.0,
		}).save();
	});
}