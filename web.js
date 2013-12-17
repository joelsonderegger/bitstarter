var express = require('express');
var app = express();
app.use(express.logger());
var fs = require('fs');
var hbs = require('hbs');
app.configure(function(){app.use(express.static(__dirname + '/public'));});


var blogEngine = require('./artsneaker');
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.bodyParser());

app.get('/', function(req, res){
	 res.redirect('/showroom');
});

app.get('/upload', function(req, res){
	res.render('upload', {title:"Upload"});
});

app.get('/battle', function(req, res){
	res.render('battle', {title:"Battle"});
});

app.get('/showroom', function(req, res){
	res.render('showroom',{title:"My Blog", sneakers:blogEngine.getSneakers()});
});

app.get('/showroom/popular', function(req, res){
	res.render('showroom', {title:"Showroom"});
});

app.get('/showroom/new', function(req, res){
	res.render('new', {title:"Showroom"});
});

app.get('/showroom/editorschoice', function(req, res){
	res.render('showroom', {title:"Showroom"});
});

app.get('/sneaker/:id', function(req, res){
	var sneaker = blogEngine.getSneaker(req.params.id);
	res.render('article',{title:sneaker.title, sneaker:sneaker});
});

app.get('bootstrapelements', function(req, res){
	res.render('bootstrapelements', {title:"bootstrapelements"});
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
