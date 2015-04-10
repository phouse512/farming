var mongoose = require('mongoose');

var soilSchema = mongoose.Schema({
	name: String,
	fertility: Number,
	waterRetention: Number,
});

var Soil = mongoose.model('Soil', soilSchema);
module.exports = Soil;