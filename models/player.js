var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
	energy: Number,
	energyTotal: Number,
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	farmingLevel: Number,
	farmingExperience: Number,
	equippedTool: { type: mongoose.Schema.Types.ObjectId, ref: 'Equippable' },
	version: Number,
	inventory: [ mongoose.Schema.Types.ObjectId ],
});

var Player = mongoose.model('Player', playerSchema);
module.exports = Player;