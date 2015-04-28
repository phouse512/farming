Farm = require('../farm.js');
Soil = require('../soil.js');
Plot = require('../plot.js');
User = require('../user.js');

mongoose = require('mongoose');

exports.generateFarm = function(height, width, player_id, version){
	Farm.create({
		landPlots: [],
		version: 1.0,
		name: 'Test Farm',
		width: width,
		height: height,
		gameTime: '0Y-0D-0M 12AM',
		player: player_id,
	}, function(err, farm){
		if (err) return handleError(err);

		var plots = new Array(height);
		console.log(plots);
		var soils_array = [];
		//console.log(soils);
		Soil.find({}, function(err, soilS){
			console.log(soilS);
			soils = soilS;
			// create plots with random soils
			for(var i=0; i < plots.length; i++){
				plots[i] = new Array(width);
				for(var j=0; j < plots[i].length; j++){
					var randSoil = soils[Math.floor(Math.random() * soils.length)];
					temp_plot = Plot({
						soilType: randSoil._id,					
						x: j,
						y: i,
						nutrientConcentration: 0,
						waterLevel: 0,
						status: 0,
						farm: farm._id,
					});

					soils_array.push(temp_plot);
				}
			}
			saved_plots = [];
			total = soils_array.length;

			function saveAll(){
				var doc = soils_array.pop();

				doc.save(function(err, saved){
					if (err) throw err;
					//console.log(saved._id);
					saved_plots.push(saved[0]);
					farm.landPlots.push(saved);
					//console.log(farm.landPlots);

					farm.save(function(err){
						//console.log(farm.landPlots[0]);
						if (--total) saveAll();
					});
				});
			}
			saveAll();
			console.log("done saving");
		});		
	});
}

exports.seedFarm = function(){
	Farm.find(function(err, farms){
		if(farms.length){
			console.log('Some farms already exist, not seeding');
			return;
		}

		console.log('Seeding with base farm');
		User.findOne({ 'email': 'philiphouse2015@u.northwestern.edu' }, function(err, user) {
			if (err)
				return err;
			console.log(user);
			exports.generateFarm(5,5, user._id, 1.0);
		});
	});
}