var express = require("express"),
	router = express.Router();


router.get("/", function(req, res){
	res.send("elo kurwa");
});

module.exports = router;