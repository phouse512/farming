User = require('../user.js');

exports.seedUser = function(){
	User.find(function(err, users){
		if(users.length){
			console.log('Some users already exist, not seeding');
			return;
		}

		console.log('Seeding with base users');
		new User({
			username: 'phouse512',
			password: 'house',
			email: 'philiphouse2015@u.northwestern.edu',
			version: 1.0,
			lastAction: Date.now(),
		}).save();

		new User({
			username: 'test',
			password: 'test',
			email: 'phouse512@gmail.com',
			version: 1.0,
			lastAction: Date.now(),
		}).save();
	});
}