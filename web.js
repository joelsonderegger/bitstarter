var express = require('express');
var app = express();
app.use(express.logger());
var fs = require('fs');

app.configure(function(){app.use(express.static(__dirname + '/public'));});

var output = fs.readFileSync("./index.html").toString();

app.get('/', function(request, response) {
  response.send(output);
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
