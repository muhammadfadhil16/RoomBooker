var express = require("express"),
	router = express.Router(),
	apiRooms = require("../middleware/apiRooms");


router.get("/rooms", apiRooms.getAllRooms, function(req, res){
	res.render("rooms/index.ejs");
});

router.post("/rooms", apiRooms.postSingleRoom, function(req, res){
	//implementation in middleware/apiRooms.js
});

router.get("/rooms/new", function(req, res){
	res.locals.error = undefined;
	res.render("rooms/new.ejs");
});

router.get("/rooms/:id", apiRooms.getSingleRoom, function(req, res){
	res.render("rooms/show.ejs");
});

module.exports = router;