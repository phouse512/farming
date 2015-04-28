var mongoose = require('mongoose');

var waterToolSchema = mongoose.Schema({
	name: String,
	levelRequired: Number,
	toolType: String,
	energyCost: Number,
	effectStrength: Number,
	effectArea: Number,
	version: Number,
});

var WaterTool = mongoose.model('WaterTool', waterToolSchema);
module.exports = WaterTool;