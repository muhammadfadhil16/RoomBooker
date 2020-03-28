var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	indexRoutes = require("./routes/index"),
	roomsRoutes = require("./routes/rooms"),
	reservationsRoutes = require("./routes/reservations"),
	usersRoutes = require("./routes/users");

	
//settings
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));


//include routes
app.use(indexRoutes);
app.use(roomsRoutes);
app.use(reservationsRoutes);
app.use(usersRoutes);


//server port/ip
app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Server is listening on port: " + (process.env.PORT || "3000"));
});