var mongoose = require('mongoose');

var growableSchema = mongoose.Schema({
	name: String,
	quality: String,
	growableClass: String,
	edible: Boolean,
	energy: Number
});

var Growable = mongoose.model('Growable', growableSchema);
module.exports = Growable;