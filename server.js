var express = require('express'), 
	app 	= express(), 
	moment  = require('moment');

app.set("view engine", "ejs");

app.get('/', function(req, res){
	res.render("index");
});

app.get('/:date', function(req, res){
	var reg1 = new RegExp('^[0-9]+$');
	var reg2 = new RegExp('[^0-9]+[0-9]{4}');
	if (reg1.test(req.params.date)) {
		res.render("new", {natural: unixToDate(Number(req.params.date)), unix: req.params.date});
	} else if (reg2.test(req.params.date)) {
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

app.listen(3000, function(){
	console.log("server is running");
});