Soil = require('../models/user.js');

exports.listUsers = function(req, res){
	User.find(function(err, users){
		res.render('users/listUsers', { users: users });
	});
}

exports.login = function(req, res){
	res.render('users/login');
}

exports.userProfile = function(req, res){
	res.render('users/userProfile', {
		user: req.user,
	});
}

exports.logout = function(req, res){
	req.logout();
	res.redirect('/');
}

exports.signup = function(req, res){
	res.render('users/signup');
}