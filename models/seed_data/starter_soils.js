Soil = require('../soil.js');

exports.seedSoil = function(){
	Soil.find(function(err, soils){
		if(soils.length){
			console.log('Some soils already exist, not seeding');
			return;
		}

		console.log('Seeding with base soils');
		new Soil({
			name: 'Fertile Soil',
			fertility: .90,
			waterRetention: .60,
		}).save();

		new Soil({
			name: 'Loamy Soil',
			fertility: .6,
			waterRetention: .80,
		}).save();

		new Soil({
			name: 'Sandy Soil',
			fertility: .4,
			waterRetention: .2,
		}).save();
	});
}