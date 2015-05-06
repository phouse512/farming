var mongoose = require('mongoose');

var seedSchema = mongoose.Schema({
	name: String,
	description: String,
	yieldAmount: Number,
	yieldItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
	growthStages: [String],
	stageRate: Number,
	quality: String,
	rarity: String,
	version: Number,
	requiredSun: Number,
	averageTemp: Number,
	tempRange: Number,
});

var Seed = mongoose.model('Seed', seedSchema);
module.exports = Seed;