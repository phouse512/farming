var main = require('./handlers/main.js'),
	soils = require('./handlers/soils.js'),
	users = require('./handlers/users.js');


module.exports = function(app, passport){

	//basic routing for users
	app.get('/', main.home);

	app.get('/about', main.about);

	app.get('/login', users.login);

	app.get('/profile', isLoggedIn, users.userProfile);

	app.get('/logout', users.logout);

	// core game routes
	app.get('/game', main.gameHome);


	// soils
	app.get('/soils', soils.listSoils);


	// users
	app.get('/users', users.listUsers);
}


function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}