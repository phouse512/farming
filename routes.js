var main = require('./handlers/main.js'),
	soils = require('./handlers/soils.js');


module.exports = function(app){
	// core game routes
	app.get('/game', main.gameHome);


	// soils
	app.get('/soils', soils.listSoils);
}