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
	},
	updateReservationUrl = "http://localhost:8080/reservations/",
	deleteReservationUrl = "http://localhost:8080/reservations/",
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
			res.render("reservations/index.ejs", {reservations: json, error: undefined});		}
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
			res.render("reservations/new.ejs", {rooms: json, error: undefined});		}
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
			request(getAllRoomsUrl, function(err1, response1, json1){
				if(err1){
					res.send("Something went wrong! :(");
				}
				else{
					res.render("reservations/show.ejs", {reservation: json, rooms: json1, error: undefined});		
				}
			});
		}
	});
});


router.delete("/reservations/:id", function(req, res){
	var tempUrl = deleteReservationUrl + req.params.id;

    request.delete(tempUrl, {json: req.body}, function(err, response, body){
		if(!err && response.statusCode === 200){
			console.log("Deletion done!");
			res.redirect("/reservations");
		}
		else{
			console.log("Something went wrong! :(");

			var tempUrl = Object.assign({}, getReservationById);
			tempUrl.url = tempUrl.url + req.params.id;
			
			request(tempUrl, function(err2, response2, json2){
				if(err2){
					res.send("Something went wrong! :(");
				}
				else{
					request(getAllRoomsUrl, function(err1, response1, json1){
						if(err1){
							res.send("Something went wrong! :(");
						}
						else{
							res.render("reservations/show.ejs", {reservation: json2, rooms: json1, error: "Wrong username or password!"});		
						}
					});
				}
			});	
		}
	});
});


router.get("/reservations/:id/edit", function(req, res){
	var tempUrl = Object.assign({}, getReservationById);
	tempUrl.url = tempUrl.url + req.params.id;
	
	request(tempUrl, function(err, response, json){
		if(err){
			res.send("Something went wrong! :(");
		}
		else{
			request(getAllRoomsUrl, function(err1, response1, json1){
				if(err1){
					res.send("Something went wrong! :(");
				}
				else{
					res.render("reservations/edit.ejs", {reservation: json, oldValues: json, rooms: json1, error: undefined});		
				}
			});
		}
	});
});


router.post("/reservations/:id", function(req, res){
	var tempUrl = updateReservationUrl + req.params.id;

	request(getAllRoomsUrl, function(err, response, json){
		if(err){
			res.send("Something went wrong! :(");
		}
		else{
			req.body.roomId = json.find(function(room){
				return room.name === req.body.roomId;
			}).roomId;
			req.body.start = req.body.start.split(" ").join("T" ).replace(/\//g, "-") + ":00+01:00";
			req.body.end = req.body.end.split(" ").join("T").replace(/\//g, "-") + ":00+01:00";

			request.post(tempUrl, {json: req.body}, function(err1, response1, body1){

				if(!err1 && response1.statusCode === 200){
					console.log("Reservation update done!");
					res.redirect("/reservations/" + req.params.id);
				}
				else{
					if(response1.body.message === "No value present"){
						error = "Wrong username or password";
					}
					else error = response1.body.message;
					console.log("Something went wrong! :(");

					var tempUrl = Object.assign({}, getReservationById);
					tempUrl.url = tempUrl.url + req.params.id;
					request(tempUrl, function(err2, response2, json2){
						if(err){
							res.send("Something went wrong! :(");
						}
						else{
							res.render("reservations/edit.ejs", {rooms: json, reservation: json2, oldValues: json2, error: error});
						}
					});
				}		
			});
		}
	});
	
    
});

module.exports = router;