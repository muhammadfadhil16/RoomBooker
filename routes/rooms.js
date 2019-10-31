var express = require("express"),
	router = express.Router(),
	request = require("request");

//API URLs	
var getAllRoomsUrl = {
	url: "http://localhost:8080/rooms",
	json: true
	},
	getRoomByIdUrl = {
		url: "http://localhost:8080/rooms/",
		json: true
	};


router.get("/rooms", function(req, res){
	request(getAllRoomsUrl, function(err, response, json){
		if(err){
			res.send("Something went wrong! :(");
		}
		else{
			res.render("rooms/index.ejs", {rooms: json});	
		}
	});
});

router.get("/rooms/new", function(req, res){
	res.render("rooms/new.ejs");
});

router.get("/rooms/:id", function(req, res){
	var tempUrl = getRoomByIdUrl;
	tempUrl.url = tempUrl.url + req.params.id;
	request(getRoomByIdUrl, function(err, response, json){
		if(err){
			res.send("Something went wrong! :(");
		}
		else{
			res.render("rooms/show.ejs", {room: json});
		}
	});
});

module.exports = router;