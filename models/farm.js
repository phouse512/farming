var mongoose = require('mongoose');

var farmSchema = mongoose.Schema({
	landPlots = [{ type: Schema.Types.ObjectId, ref: 'Soil' }],
	version = Number,
	name = String,
});

var Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm