var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
	name: String,
	quality: String,
	itemClass: String,
	edible: Boolean,
	energy: Number,
	description: String,
	image: String,
	version: Number,
});

var Item = mongoose.model('Item', itemSchema);
module.exports = Item;