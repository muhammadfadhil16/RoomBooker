var express = require("express"),
	router = express.Router(),
	apiUsers = require("../middleware/apiUsers");


router.get("/users", apiUsers.getAllUsers, function(req, res){
	res.render("users/index.ejs");	
});


router.post("/users",  apiUsers.postSingleUser, function(req, res){
	//implementation in apiMiddleware
});


router.get("/users/new", function(req, res){
	res.locals.error = undefined;
	res.render("users/new.ejs");
});


router.get("/users/:id", apiUsers.getSingleUser, function(req, res){
	res.render("users/show.ejs");
});

module.exports = router;