var mongoose = require('mongoose');

var soilSchema = mongoose.Schema({
	name: String,
	description: String,
	fertility: Number,
	waterRetention: Number,
}, { collection: 'soils' });

var Soil = mongoose.model('Soil', soilSchema, 'soils');
module.exports = Soil;