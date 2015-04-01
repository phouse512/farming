var express = require('express');

var app = express();

var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000)

app.use(express.static(__dirname + '/public'));

var messages = [
	'Join us',
	'Do you like Animal Crossing',
	'Do you like Harvest Moon?'
];

//basic routing
app.get('/', function(req, res){
	res.render('home');
});

app.get('/about', function(req, res){
	var randomMessage = messages[Math.floor(Math.random() * messages.length)];
	res.render('about', { message: randomMessage });
});


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

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + 
		app.get('port') + '; press Ctrl-C to terminate.')
});


