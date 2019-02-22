var express = require("express");
var colors = require("colors");
var mongoose = require("mongoose");
var bodyParser= require('body-parser');
var snowSchema = mongoose.Schema({
	inches : Number,
	location : String

});


var Snow = mongoose.model('Snow', snowSchema);

var promise = mongoose.connect('mongodb://localhost',{
 useMongoClient: true
}, function(err){
	if(err){
		throw err;
	}else{
		console.log("Database connection successful".rainbow);
	}
});

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(req, res){
	res.send("<h1>HLEP	</h1>");

});




app.get('/mOARSNOW', function(req, res) {
	Snow.create({inches : Math.random()*45},
		function(err, data){
			if(err){
				throw err;
			}else{
				res.send(data.inches + " inches of snow");
				console.log(data);
			}

	});
});

app.get('/sSnow', function(req, res){
	console.log("sSnow");
	Snow.find({}, function(err, data){
		if(err){
			throw err;
		}else{
			res.send("<h1>"+data.length+"</h1>"+"<p>"+data+"</p>");
		}
		
	});
});

app.get('/showSnow',function(req,res){
res.sendFile(__dirname+'/index.html');
});

app.post('/showSnow', function(req, res){
 	console.log(req.body);
 	Snow.create({inches : req.body.inches, location: req.body.location},
 		function(err, data){
 			if (err) {
 				throw err;
 			}else{
 				res.send("<h1>"+ data.inches + " inches of snow</h1>"+"<h2>"+ data.location + " is your location</h2>");
 				console.log(data);
 			}
 		});
 });

app.get('/delete',function(req,res){
Snow.deleteOne({ location: req.body.location },
	function(err, data){
		if (err) {
			throw err;
		}
		else{
			res.send("<h2> your location has been deleted </h2>");
			console.log(data);
		}
	});

});

app.listen(8000);





