var express = require("express"),
	router = express.Router();

router.get("/reservations/new", function(req, res){
	res.render("reservations/newReservation.ejs");
});

module.exports = router;