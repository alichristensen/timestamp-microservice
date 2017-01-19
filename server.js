var express = require('express'), 
	app 	= express(), 
	moment  = require('moment'), 
	port = process.env.PORT || 5000;

app.set("view engine", "ejs");

var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 
			'august', 'september', 'october', 'november', 'december'];

app.get('/', function(req, res){
	res.render("index");
});

app.get('/:date', function(req, res){
	var reg1 = new RegExp('^[0-9]+$');
	var reg2 = new RegExp('[^0-9]+[0-9]{4}');
	var isMonth = false;
	var date = req.params.date.toLowerCase();
	months.forEach(function(i) {
		if (date.startsWith(i)) {
			isMonth = true;
		}
	});
	if (reg1.test(req.params.date)) {
		res.render("new", {natural: unixToDate(Number(req.params.date)), unix: req.params.date});
	} else if (reg2.test(req.params.date) && isMonth) {
		res.render("new", {unix: dateToUnix(req.params.date), natural: req.params.date}); 
	} else {
		res.render("new", {unix: "null", natural: "null"});
	}
});

function unixToDate(unix) {
	var date = new Date(unix*1000);
	return (moment(date).format("MMMM Do, YYYY"));
}

function dateToUnix(str) {
	var date = str;
	return (moment(new Date(date)).unix());
}

app.listen(port, function(){
	console.log("listening at " + port);
});