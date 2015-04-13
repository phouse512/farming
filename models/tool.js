var mongoose = require('mongoose');

var toolSchema = mongoose.Schema({
	name: String,
	levelRequired: Number,
	toolType: String,
	action: { type: mongoose.Schema.Types.ObjectId, ref: 'Action' },
});

var Tool = mongoose.model('Tool', toolSchema);
module.exports = Tool;