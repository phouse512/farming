var mongoose = require('mongoose');

var farmSchema = mongoose.Schema({
	landPlots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plot' }],
	version: Number,
	name: String,
	width: Number,
	height: Number,
	gameTime: String,
	player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player'}
});

var Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm;