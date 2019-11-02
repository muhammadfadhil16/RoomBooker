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
			res.render("reservations/index.ejs", {reservations: json});		}
	});	
});


router.post("/reservations", function(req, res){
	request(getAllRoomsUrl, function(err, response, json){
		if(err){
			res.send("Something went wrong! :(");
		}
		else{
			req.body.roomId = json.find(function(room){
				return room.name === req.body.roomId;
			}).roomId;
			req.body.start = req.body.start.split(" ").join("T" ).replace(/\//g, "-") + ":00+00:00";
			req.body.end = req.body.end.split(" ").join("T").replace(/\//g, "-") + ":00+00:00";

			request.post(postNewReservationUrl, {json: req.body}, function(err1, response1, body1){
				console.log(response1.body);

				if(err1){
					console.log("Something went wrong! :(");
				}
				else{
					console.log("Reservation post done!");
					res.redirect("/reservations");
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