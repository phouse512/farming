var mongoose = require('mongoose');

var seedSchema = mongoose.Schema({
	name: String,
	yieldAmount: Number,
	yieldItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Growable' },
	growthStages: [String],
	stageRate: Number,
	quality: String,
	rarity: String,
	version: Number,
});

var Seed = mongoose.model('Seed', seedSchema);
module.exports = Seed;