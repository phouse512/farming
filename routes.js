var main = require('./handlers/main.js'),
	soils = require('./handlers/soils.js'),
	users = require('./handlers/users.js');


module.exports = function(app){
	// core game routes
	app.get('/game', main.gameHome);


	// soils
	app.get('/soils', soils.listSoils);


	// users
	app.get('/users', users.listUsers);
}