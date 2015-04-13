var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	username: String,
	email: String,
	joinDate: { type: Date, default: Date.now }
	version: Number,
	lastAction: Date,
});

var User = mongoose.model('User', userSchema);
module.exports = User;