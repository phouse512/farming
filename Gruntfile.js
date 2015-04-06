module.exports = function(grunt){

	[
		'grunt-cafe-mocha',
		'grunt-contrib-jshint'
	].forEach(function(task){
		grunt.loadNpmTasks(task);
	});

	grunt.initConfig({
		cafemocha: {
			all: {src: 'qa/tests-*.js', options: { ui: 'tdd' }, }
		},
		jshint: {
			app: ['game.js', 'public/js/**/*.js', 'lib/**/*.js'],
			qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
		}
	});

	// register tasks
	grunt.registerTask('default', ['cafemocha', 'jshint']);
};