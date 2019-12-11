var request = require("request");


//API URLs	
var getAllReservationsUrl = {
        url: "http://localhost:8080/reservations",
        json: true
    },
    getReservationById = {
        url: "http://localhost:8080/reservations/",
        json: true
    },
    updateReservationUrl = "http://localhost:8080/reservations/",
    deleteReservationUrl = "http://localhost:8080/reservations/",
    postNewReservationUrl = "http://localhost:8080/reservations";
    
    
    //function that ping API
    module.exports = {
        getAllReservations: function(req, res, next){
            request(getAllReservationsUrl, function(error, response, json){
                if(!error && response.statusCode === 200){
                    console.log("Get all reservations done.");
                    json.forEach(function(reservation){
                        reservation.start = reservation.start.split("T").join(" ").split("+")[0].slice(0, -3);
                        reservation.end = reservation.end.split("T").join(" ").split("+")[0].slice(0, -3);
                    });
                    res.locals.reservations = json;
                    res.locals.error = undefined;	
                    next();
                }
                else{
                    res.send("Something went wrong: get all reservations from API.");
                }
            });	
        },

        getSingleReservation: function(req, res, next){
            var tempUrl = Object.assign({}, getReservationById);
            tempUrl.url = tempUrl.url + req.params.id;
            
            request(tempUrl, function(error, response, json){
                if(!error && response.statusCode === 200){
                    console.log("Getting single reservations done.");
                    res.locals.reservation = json;
                    res.locals.error = undefined;
                    next();
                }
                else{
                    res.send("Something went wrong: get single reservation from API.");
                }
	        });
        },

        postSingleReservation: function(req, res, next){
            var oldValues = Object.assign({}, req.body);

            req.body.roomId = res.locals.rooms.find(function(room){ return room.name === req.body.roomId; }).roomId;
            req.body.start = req.body.start.split(" ").join("T" ).replace(/\//g, "-") + ":00+01:00";
            req.body.end = req.body.end.split(" ").join("T").replace(/\//g, "-") + ":00+01:00";

            request.post(postNewReservationUrl, {json: req.body}, function(error, response, body){
                if(!error && response.statusCode === 200){
                    console.log("Reservation post done.");
                    res.redirect("/reservations");
                }
                else{
                    if(response.body.message === "No value present")
                        error = "Wrong username or password.";
                    else 
                        error = response.body.message;

                    console.log("Something went wrong: post new reservation to API.");
                    res.locals.oldValues = oldValues;
                    res.locals.error = error;
                    res.render("reservations/new.ejs");
                }
            });
        },

        deleteSingleReservation: function(req, res, next){
            var tempUrl = deleteReservationUrl + req.params.id;

            request.delete(tempUrl, {json: req.body}, function(error, response, body){
                if(!error && response.statusCode === 200){
                    console.log("Deletion done.");
                    res.redirect("/reservations");
                }
                else{
                    console.log("Something went wrong: delete reservation from API.");
                    res.locals.error = "Wrong username or password.";
                    res.render("reservations/show.ejs");		
                }
            });
        },

        updateSingleReservation: function(req, res, next){
            var tempUrl = updateReservationUrl + req.params.id;
            var oldValues = Object.assign({}, res.locals.reservation);

            req.body.roomId = res.locals.rooms.find(function(room){ return room.name === req.body.roomId; }).roomId;
            req.body.start = req.body.start.split(" ").join("T" ).replace(/\//g, "-") + ":00+01:00";
            req.body.end = req.body.end.split(" ").join("T").replace(/\//g, "-") + ":00+01:00";

            oldValues.start = req.body.start;
            oldValues.end = req.body.end;
            oldValues.roomId = req.body.roomId;
            oldValues.topic.topicName = req.body.topic;

            request.post(tempUrl, {json: req.body}, function(error, response, body){
                if(!error && response.statusCode === 200){
                    console.log("Reservation update done.");
                    res.redirect("/reservations/" + req.params.id);
                }
                else{
                    if(response.body.message === "No value present")
                        error = "Wrong username or password";
                    else 
                        error = response.body.message;

                    console.log("Something went wrong: update reservation to API.");

                    res.locals.oldValues = oldValues;
                    res.locals.error = error;    
                    res.render("reservations/edit.ejs");
                }		
            });
        },
    };
   