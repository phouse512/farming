var mongoose = require('mongoose');

var plotSchema = mongoose.Schema({
	soilType: { type: mongoose.Schema.Types.ObjectId, ref: 'Soil' },
	x: Number,
	y: Number,
	nutrientConcentration: Number,
	waterLevel: Number,
	status: String,
	farm: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm' },
	seed: { type: mongoose.Schema.Types.ObjectId, ref: 'Seed' },
	stage: Number,
	xp: Number,
});

var Plot = mongoose.model('Plot', plotSchema);
module.exports = Plot;