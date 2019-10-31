var express = require("express"),
	router = express.Router();

router.get("/users/new", function(req, res){
	res.render("users/newUser.ejs");
});



module.exports = router;