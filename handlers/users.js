User = require('../models/user.js');

exports.listUsers = function(req, res){
	User.find(function(err, users){
		res.render('users/listUsers', { users: users });
	});
}

exports.login = function(req, res){
	res.render('users/login', { message: req.flash('loginMessage')});
}

exports.userProfile = function(req, res){
	res.render('users/userProfile');
}

exports.logout = function(req, res){
	req.logout();
	res.redirect('/');
}

exports.signup = function(req, res){
	res.render('users/signup', { message: req.flash('signupMessage')});
}