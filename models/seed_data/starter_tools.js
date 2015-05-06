var Tool = require('../tool.js');

exports.seedTool = function(){
	Tool.find(function(err, tools){
		if(tools.length){
			console.log('Some tools already exist, not seeding');
			return;
		}

		console.log('Seeding with base tools');
		new Tool({
			name: 'standard hoe',
			description: 'A standard hoe capable of small portions of soil. It can be quite heavy.',
			levelRequired: 1,
			toolType: 'till',
			energyCost: 2,
			effectArea: 0,
			version: 1.0,
		}).save();
		new Tool({
			name: 'standard watering can',
			description: 'A standard watering can that is capable of watering small amounts of soil at once.',
			levelRequired: 1,
			toolType: 'water',
			energyCost: 1,
			effectStrength: 1,
			effectArea: 0,
			version: 1.0,
		}).save();
	});
}