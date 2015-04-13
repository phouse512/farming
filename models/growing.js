var mongoose = require('mongoose');

var growingSchema = mongoose.Schema({
	plot: { type: mongoose.Schema.Types.ObjectId, ref: 'Plot' },
	seed: { type: mongoose.Schema.Types.ObjectId, ref: 'Seed' },
	stage: Number,
	xp: Number,
});

var Growing = mongoose.model('Growing', growingSchema);
module.exports = Growing;