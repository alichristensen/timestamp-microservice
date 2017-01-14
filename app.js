var express = require('express'), 
	app 	= express(), 
	moment  = require('moment');

app.set("view engine", "ejs");

app.get('/', function(req, res){
	res.render("index");
});

app.get('/:date', function(req, res){
	var date; 
	var reg = new RegExp('^[0-9]+$');
	if (reg.test(req.params.date)) {
		date = unixToDate(Number(req.params.date));
		res.render("new", {natural: date, unix: req.params.date});
	} else {
		date = dateToUnix(req.params.date);
		res.render("new", {unix: date, natural: req.params.date}); 
	}
});

function unixToDate(UNIX_timestamp) {
	var date = new Date(UNIX_timestamp);
	return (moment(date).format("MMMM Do, YYYY"));
}

function dateToUnix(str) {
	var date = str; 
	console.log(moment(new Date(date)).inspect());
	return (moment(new Date(date)).unix());
}

app.listen(3000, function(){
	console.log("server is running");
});