var mongoose = require('mongoose'),
	deepPopulate = require('mongoose-deep-populate');

var farmSchema = mongoose.Schema({
	landPlots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plot' }],
	version: Number,
	name: String,
	width: Number,
	height: Number,
	gameTime: String,
	player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player'}
});

farmSchema.plugin(deepPopulate);

farmSchema.methods.exportArray = function(err) {
	var new_plot = new Array(this.height);
	for(var i=0; i < new_plot.length; i++){
		new_plot[i] = new Array(this.width);
	}

	for(var j=0; j < this.landPlots.length; j++){
		new_plot[this.landPlots[j].y][this.landPlots[j].x] = this.landPlots[j];
	}

	return {
		_id: this._id,
		landPlots: new_plot,
		version: this.version,
		name: this.name,
		height: this.height,
		width: this.width,
		gameTime: this.gameTime,
		player: this.player
	}
}

var Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm;