var express = require("express"),
	router = express.Router();

router.get("/rooms", function(req, res){
	res.render("rooms/rooms.ejs");
});

router.get("/rooms/new", function(req, res){
	res.render("rooms/newRoom.ejs");
});

module.exports = router;