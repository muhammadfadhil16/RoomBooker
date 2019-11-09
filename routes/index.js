var express = require("express"),
	router = express.Router();


router.get("/", function(req, res){
	res.redirect("/home");
});

router.get("/home", function(req, res){
	res.render("home.ejs");
})

module.exports = router;