var mongoose = require('mongoose');

var toolSchema = mongoose.Schema({
	name: String,
	description: String,
	levelRequired: Number,
	toolType: String,
	energyCost: Number,
	effectArea: Number,
	effectStrength: Number,
	version: Number
});

var Tool = mongoose.model('Tool', toolSchema);
module.exports = Tool;