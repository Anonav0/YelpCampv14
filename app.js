var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var passport = require("passport");
var flash = require("connect-flash")
var methodOverride = require("method-override");
var localStrategy = require("passport-local");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user"); 
var seedDB = require("./seeds");
require("dotenv").config();


//requring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")
app.use(flash());

app.locals.moment = require('moment');
//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Rusty is the best dog in the world",
    resave: false, 
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 



mongoose.connect("mongodb://localhost/yelp_camp13", {useNewUrlParser: true});
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
// seedDB();  //seed the data 

//to get the user info in all routes
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})
   

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
 

 
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});