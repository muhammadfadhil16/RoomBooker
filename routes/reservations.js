var express = require("express"),
	router = express.Router(),
	apiReservations = require("../middleware/apiReservations"),
	apiRooms = require("../middleware/apiRooms");


router.get("/reservations", apiReservations.getAllReservations, function(req, res){
	res.render("reservations/index.ejs");
});


router.post("/reservations", apiRooms.getAllRooms, apiReservations.postSingleReservation, function(req, res){
	//implementation in middleware/apiReservations.js
});	


router.get("/reservations/new", apiRooms.getAllRooms, function(req, res){
	res.render("reservations/new.ejs");
});


router.get("/reservations/:id", apiRooms.getAllRooms, apiReservations.getSingleReservation, function(req, res){
	res.render("reservations/show.ejs");
});


router.delete("/reservations/:id", apiRooms.getAllRooms, apiReservations.getSingleReservation, apiReservations.deleteSingleReservation, function(req, res){
	//implementation in middleware/apiReservations
});


router.get("/reservations/:id/edit", apiReservations.getSingleReservation, apiRooms.getAllRooms, function(req, res){
	res.locals.oldValues = res.locals.reservation;
	res.render("reservations/edit.ejs");		
});


router.post("/reservations/:id", apiRooms.getAllRooms, apiReservations.getSingleReservation, apiReservations.updateSingleReservation, function(req, res){
	//implementation in middleware/apiReservations
});


module.exports = router;