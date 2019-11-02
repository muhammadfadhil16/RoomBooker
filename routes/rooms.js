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
	},
	postNewRoomUrl = "http://localhost:8080/rooms";


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

router.post("/rooms", function(req, res){
	request.post(postNewRoomUrl, {json: req.body}, function(err, response, body){
		if(err){
			console.log("Something went wrong! :(");
		}
		else{
			console.log("Room post done!");
			res.redirect("/rooms");
		}
	});
});

router.get("/rooms/new", function(req, res){
	res.render("rooms/new.ejs");
});

router.get("/rooms/:id", function(req, res){
	var tempUrl = Object.assign({}, getRoomByIdUrl);
	tempUrl.url = tempUrl.url + req.params.id;
	
	request(tempUrl, function(err, response, json){
		if(err){
			res.send("Something went wrong! :(");
		}
		else{
			res.render("rooms/show.ejs", {room: json});
		}
	});
});

module.exports = router;