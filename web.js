var express = require('express');
var fs = require('fs');
var hbs = require('hbs');


var app = express();
app.use(express.logger());



app.configure(function(){
	app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());
});

 

var blogEngine = require('./artsneaker');
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.bodyParser());

app.get('/', function(req, res){
	 res.redirect('/showroom');
});

app.get('/upload', function(req, res){
	res.render('upload', {title:"Battle"});
});

app.post('/uploadsubmit', function(req, res){
	
	fs.readFile(req.files.image.path, function (err, data) {

		var imageName = req.files.image.name

		/// If there's an error
		if(!imageName){

			console.log("There was an error")
			res.redirect("/");
			res.end();

		} else {
			var id = 1;
		  var newPath = __dirname + "/uploads/fullsize/" + id +".png";

		  /// write file to uploads/fullsize folder
		  fs.writeFile(newPath, data, function (err) {

		  	/// let's see it
		  	res.redirect("/uploads/fullsize/" + imageName);

		  });
		}
	});
});

/// Show files
app.get('/uploads/fullsize/:file', function (req, res){
	file = req.params.file;
	var img = fs.readFileSync(__dirname + "/uploads/fullsize/" + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');

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
