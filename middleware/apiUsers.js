var request = require("request");


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
    
    //function that ping API
    module.exports = {
        getAllUsers: function(req, res, next){
            request(getAllUsersUrl, function(error, response, json){
                if(!error && response.statusCode === 200){
                    console.log("Getting all users done.")
                    res.locals.users = json;
                    res.locals.error = undefined;
                    next();
                }
                else{
                    res.send("Something went wrong: get all users from API.");
                }
            });
        },

        getSingleUser: function(req, res, next){
            var tempUrl = Object.assign({}, getUserByIdUrl);
                tempUrl.url = tempUrl.url + req.params.id;
                
            request(tempUrl, function(error, response, json){
                if(!error && response.statusCode === 200){
                    console.log("Get single user done.");
                    res.locals.user = json;
                    res.locals.error = undefined;
                    next();
                }
                else{
                    res.send("Something went wrong: get single user from API.");
                }
            });
        },

        postSingleUser: function(req, res, next){
            if(req.body.password === req.body.passwordConfirm){
                request.post(postNewUserUrl, {json: req.body}, function(error, response, body){
                    if(!error && response.statusCode === 200){
                        console.log("User post done.");
                        res.redirect("/users");
                    }
                    else{
                        console.log("Something went wrong: post new user to API.");
    
                        res.locals.oldValues = req.body;
                        res.locals.error = "Username is already used!";
                        res.render("users/new.ejs");
                    }
                });
            }
            else{
                console.log("Something went wrong: post new user to API (wrong password confirmation).");
    
                res.locals.oldValues = req.body;
                res.locals.error = "Passwords must be the same.";
                res.render("users/new.ejs");
            }
            
        }
    };
   