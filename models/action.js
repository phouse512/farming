var mongoose = require('mongoose');

var actionSchema = mongoose.Schema({
	name: String,
	energyCost: Number,
	effectSize: Number,
	effectRatio: Number,
	effectArea: String,
});

var Action = mongoose.model('Action', actionSchema);
module.exports = Action;