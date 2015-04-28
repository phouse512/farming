Seed = require('../seed.js');
Item = require('../item.js');

exports.seedSeed = function(){
	Seed.find(function(err, seeds){
		if(seeds.length){
			console.log('Some seeds already exist, not seeding');
			return;
		}

		console.log('Seeding with base seeds');
		Item.findOne({ 'name': 'Watermelon', 'quality': 'C'}, function(err, item) {
			new Seed({
				name: 'watermelon seeds',
				yieldAmount: 1,
				yieldItem: item._id,
				growthStages: ['1', '2', '3', '4'],
				stageRate: 40,
				quality: 'C',
				rarity: '1',
				version: 1.0
			}).save();
		});

		Item.findOne({ 'name': 'Strawberry', 'quality': 'C'}, function(err, item) {
			new Seed({
				name: 'strawberry seeds',
				yieldAmount: 3,
				yieldItem: item._id,
				growthStages: ['1', '2', '3', '4'],
				stageRate: 30,
				quality: 'C',
				rarity: '1',
				version: 1.0,
			}).save();
		});
	});
}