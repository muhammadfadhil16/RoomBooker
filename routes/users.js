var express = require("express"),
	request = require("request"),
	router = express.Router();


//API URLs	
var postNewUserUrl = "http://localhost:8080/users",
	getAllUsersUrl = {
		url: "http://localhost:8080/users",
		json: true
	}
	getUserByIdUrl = {
		url: "http://localhost:8080/users/",
		json: true
	};


router.get("/users", function(req, res){
	request(getAllUsersUrl, function(err, response, json){
		if(err){
			res.send("Something went wrong! :(");
		}
		else{
			res.render("users/index.ejs", {users: json, error: undefined});	
		}
	});
});


router.post("/users", function(req, res){
	request.post(postNewUserUrl, {json: req.body}, function(err, response, body){
		if(!err && response.statusCode === 200){
			console.log("User post done!");
			res.redirect("/users");
		}
		else{
			console.log("Something went wrong! :(");
			console.log(response.body);
			res.render("users/new.ejs", {oldValues: req.body, error: "Username is already used!"});
		}
	});
});


router.get("/users/new", function(req, res){
	res.render("users/new.ejs", {error: undefined});
});


router.get("/users/:id", function(req, res){
	var tempUrl = Object.assign({}, getUserByIdUrl);
	tempUrl.url = tempUrl.url + req.params.id;
	
	request(tempUrl, function(err, response, json){
		if(err){
			res.send("Something went wrong! :(");
		}
		else{
			res.render("users/show.ejs", {user: json, error: undefined});
		}
	});
});

module.exports = router;