var mongoose = require('mongoose');

var farmSchema = mongoose.Schema({
	landPlots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plot' }],
	version: Number,
	name: String,
	width: Number,
	height: Number,
	gameTime: String,
});

var Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm;