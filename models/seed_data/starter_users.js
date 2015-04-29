var User = require('../user.js'),
	Player = require('../player.js');

exports.seedUser = function(){
	User.find(function(err, users){
		if(users.length){
			console.log('Some users already exist, not seeding');
			return;
		}

		console.log('Seeding with base users');
		newUser1 = new User();
		newUser1.username = 'phouse512';
		newUser1.password = newUser1.generateHash('house');
		newUser1.email = 'philiphouse2015@u.northwestern.edu';
		newUser1.version = 1.0;
		newUser1.lastAction = Date.now();

		newUser2 = new User({
			username: 'test',
			email: 'phouse512@gmail.com',
			version: 1.0,
			lastAction: Date.now(),
		});
		newUser2.password = newUser2.generateHash('test');

		newUser1.save(function(err, data){
			new Player({
				energy: 10,
				energyTotal: 10,
				user: data._id,
				farmingLevel: 1,
				farmingExperience: 0,
				version: 1.0,
				inventory: [],
			}).save();
		});
		newUser2.save(function(err, data){
			new Player({
				energy: 10,
				energyTotal: 10,
				user: data._id,
				farmingLevel: 1,
				farmingExperience: 0,
				version: 1.0,
				inventory: [],
			}).save();
		});
	});
}