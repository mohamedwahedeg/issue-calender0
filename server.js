var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');

var fs = require('fs');
var path = require('path');
var formidable = require('formidable');



var http = require('http');
var https = require('https');

var app = express();

// var http = require('http').Server(app);
// var io = require('socket.io')(http);



//mongoose.connect(config.database, function(err) {
//	if(err) {
//		console.log(err);
//	} else {
//		console.log('Connected to the database');
//	}
//});



try{
app.use(bodyParser.urlencoded({ extended: true }));
}catch(urlencoded){
	console.log(urlencoded);
}

app.use(bodyParser.json());



app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/public/Issue'));
app.use(express.static(__dirname + '/public/Issue/views'));
app.use(express.static(__dirname + '/public/Issue/views/fonts'));
app.use(express.static(__dirname + '/public/Issue/views/css'));
app.use(express.static(__dirname + '/public/Issue/views/images'));
app.use(express.static(__dirname + '/public/Issue/views/bootstrap-4.0.0-alpha.6-dist'));





var api = require('./app/routes/api')(app, express);
app.use('/api', api);



app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/Issue/index.html');
});



app.get('*', function(req, res) {
	res.sendFile(__dirname + '/public/Issue/index.html');
});

app.get('/administrator', function(req, res) {
	res.sendFile(__dirname + '/public/administrator/index.html');
});

app.get('/bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.min.js', function(req, res) {
	res.sendFile(__dirname + '/bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.min.js');
});
app.get('/bower_components/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css', function(req, res) {
	res.sendFile(__dirname + '/bower_components/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css');
});
app.get('/bower_components/angular-bootstrap-calendar/src/templates/calendarMonthView.html', function(req, res) {
	res.sendFile(__dirname + '/bower_components/angular-bootstrap-calendar/src/templates/calendarMonthView.html');
});


try{
app.use(express.static(__dirname + '/app/routes/uploads'));
app.use("/uploads", express.static(__dirname + '/app/routes/uploads'));
}catch(downloadstatic){
	console.log(downloadstatic);
}





// var options = {
//   cert: fs.readFileSync(__dirname + '/public/Issue/keys/26311155_kdy.azhar.gov.eg.crt)
//   };

// Create an HTTP service.
// http.createServer(function (req, res) {
//     res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
//     res.end();
// }).listen(80);

// Create an HTTPS service identical to the HTTP service. options, 
// https.createServer(options, app).listen(443, function(err) {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log("Listening on port " + 443);
// 	}
// });



app.listen(config.port, function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log("Listening on port " + config.port);
	}
});
