var http = require('http'),
	express = require('express');

var message = require('./lib/random_message.js'),
	credentials = require('./credentials.js'),
	starter_soils = require('./models/seed_data/starter_soils.js'),
	starter_farms = require('./models/seed_data/starter_farms.js'),
	starter_users = require('./models/seed_data/starter_users.js');

var app = express();

var handlebars = require('express3-handlebars').create({ 
	defaultLayout: 'main',
	helpers: {
		static: function(name) {
			return require('./lib/static.js').map(name);
		}
	}
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

//set up logging

switch(app.get('env')){
	case 'development':
		app.use(require('morgan')('dev'));
		break;
	case 'production':
		app.use(require('express-logger')({
			path: __dirname + '/log/requests.log'
		}));
		break;
}

// set up page testing
app.use(function(req, res, next){
	//console.log(res.req.query);
	res.locals.showTests = app.get('env') !== 'production' && res.req.query.test === '1';
	next();
});

// set up mongoose
var mongoose = require('mongoose');
var opts = {
	server: {
		socketOptions: { keepAlive: 1 }
	}
};
switch(app.get('env')){
	case 'development':
		mongoose.connect(credentials.mongo.development.connectionString, opts);
		break;
	case 'production':
		mongoose.connect(credentials.mongo.production.connectionString, opts);
		break;
	default:
		throw new Error('Unknown execution environment: ' + app.get('env'));
}

starter_soils.seedSoil();
starter_users.seedUser();
//starter_farms.generateFarm(10,10);


//basic routing
app.get('/', function(req, res){
	res.render('home');
});

app.get('/about', function(req, res){
	res.render('about', { 
		message: message.getMessage(),
		pageTestScript: '/qa/about-tests.js'
	});
});

require('./routes.js')(app);


// custom 404 page
app.use(function(req, res){
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express started in ' + app.get('env') + ' on http://localhost:' + 
		app.get('port') + '; press Ctrl-C to terminate.');
});






















