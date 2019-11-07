var express = require("express"),
	request = require("request"),
	router = express.Router();


//API URLs	
var getAllRoomsUrl = {
	url: "http://localhost:8080/rooms",
	json: true
	},
	getAllReservationsUrl = {
	url: "http://localhost:8080/reservations",
	json: true
	},
	getReservationById = {
	url: "http://localhost:8080/reservations/",
	json: true
	}
	postNewReservationUrl = "http://localhost:8080/reservations";


router.get("/reservations", function(req, res){
	request(getAllReservationsUrl, function(err, response, json){
		if(err){
			res.send("Something went wrong! :(");
		}
		else{
			json.forEach(function(reservation){
				reservation.start = reservation.start.split("T").join(" ").split("+")[0].slice(0, -3);
				reservation.end = reservation.end.split("T").join(" ").split("+")[0].slice(0, -3);
			});
			res.render("reservations/index.ejs", {reservations: json});		}
	});	
});


router.post("/reservations", function(req, res){
	request(getAllRoomsUrl, function(err, response, json){
		if(err){
			res.send("Something went wrong! :(");
		}
		else{
			var oldValues = {username: req.body.username, password: req.body.password, roomId: req.body.roomId, topic: req.body.topic, start: req.body.start, end: req.body.end};
			req.body.roomId = json.find(function(room){
				return room.name === req.body.roomId;
			}).roomId;
			req.body.start = req.body.start.split(" ").join("T" ).replace(/\//g, "-") + ":00+01:00";
			req.body.end = req.body.end.split(" ").join("T").replace(/\//g, "-") + ":00+01:00";

			request.post(postNewReservationUrl, {json: req.body}, function(err1, response1, body1){

				if(!err1 && response1.statusCode === 200){
					console.log("Reservation post done!");
					res.redirect("/reservations");
				}
				else{
					if(response1.body.message === "No value present"){
						error = "Wrong username or password";
					}
					else error = response1.body.message;
					console.log("Something went wrong! :(");
					res.render("reservations/new.ejs", {rooms: json, oldValues: oldValues, error: error});
				}
			});
		}
	});
});	


router.get("/reservations/new", function(req, res){
	request(getAllRoomsUrl, function(err, response, json){
		if(err){
			res.send("Something went wrong! :(");
		}
		else{
			res.render("reservations/new.ejs", {rooms: json});		}
	});
});


router.get("/reservations/:id", function(req, res){
	var tempUrl = Object.assign({}, getReservationById);
	tempUrl.url = tempUrl.url + req.params.id;
	
	request(tempUrl, function(err, response, json){
		if(err){
			res.send("Something went wrong! :(");
		}
		else{
			res.render("reservations/show.ejs", {reservation: json});
		}
	});
});

module.exports = router;