Item = require('../item.js');

exports.seedItem = function(){
	Item.find(function(err, items){
		if(items.length){
			console.log('Some items already exist, not seeding');
			return;
		}

		console.log('Seeding with base items');
		new Item({
			name: 'Watermelon',
			quality: 'C',
			itemClass: 'growable',
			edible: true,
			energy: 3,
			description: 'An average watermelon',
			image: 'n/a',
			version: 1.0
		}).save();

		new Item({
			name: 'Strawberry',
			quality: 'C',
			itemClass: 'growable',
			edible: true,
			energy: 2,
			description: 'An average strawberry',
			image: 'n/a',
			version: 1.0,
		}).save();

		new Item({
			name: 'Milk',
			quality: 'C',
			itemClass: 'animal',
			edible: true,
			energy: 1,
			description: 'Average milk produced by an aight cow',
			image: 'n/a',
			version: 1.0,
		}).save();
	});
}