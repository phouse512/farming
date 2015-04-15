Soil = require('../models/user.js');

exports.listUsers = function(req, res){
	User.find(function(err, users){
		res.render('users/listUsers', { users: users });
	});
}