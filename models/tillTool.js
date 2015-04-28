var mongoose = require('mongoose');

var tillToolSchema = mongoose.Schema({
	name: String,
	levelRequired: Number,
	toolType: String,
	energyCost: Number,
	effectArea: Number,
	version: Number
});

var TillTool = mongoose.model('TillTool', tillToolSchema);
module.exports = TillTool;