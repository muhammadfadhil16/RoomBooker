var request = require("request");


//API URLs	
var getAllRoomsUrl = {
        url: "http://localhost:8080/rooms",
        json: true
	},
	getRoomByIdUrl = {
		url: "http://localhost:8080/rooms/",
		json: true
	},
	postNewRoomUrl = "http://localhost:8080/rooms";
    
    //function that ping API
    module.exports = {
        getAllRooms: function(req, res, next){
            request(getAllRoomsUrl, function(error, response, json){
                if(!error && response.statusCode === 200){
                    console.log("Getting all rooms done.")
                    res.locals.rooms = json;
                    res.locals.error = undefined;
                    next();
                }
                else{
                    res.send("Something went wrong: get all rooms from API.");
                }
            });
        },

        getSingleRoom: function(req, res, next){
            var tempUrl = Object.assign({}, getRoomByIdUrl);
            tempUrl.url = tempUrl.url + req.params.id;
            
            request(tempUrl, function(error, response, json){
                if(!error && response.statusCode === 200){
                    console.log("Getting single room done.");
                    res.locals.room = json;
                    res.locals.error = undefined;
                    next();
                }
                else{
                    res.send("Something went wrong: get single room from API.");
                }
            });
        },

        postSingleRoom: function(req, res, next){
            request.post(postNewRoomUrl, {json: req.body}, function(error, response, body){
                if(!error && response.statusCode === 200){
                    console.log("Post new room done.");
                    res.redirect("/rooms");
                    next();
                }
                else{
                    res.send("Something went wrong: post new room to API.");
                }
            });
        }
    };
   