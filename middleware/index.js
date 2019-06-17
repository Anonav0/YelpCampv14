var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()) {
           Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground){
                req.flash("error", "THERE SEEMS A PROBLEM!");
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next();
                } else {
                    req.flash("error", "YOU DON'T HAVE PERMISSION TO DO THAT");
                    res.redirect("back");
                }
                  
            }
    });
        
    }else {
        req.flash("error", "You Need To Be Logged In To Do That!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()) {
           Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "THERE SEEMS A PROBLEM!");
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next();
                } else {
                    req.flash("error", "YOU DON'T HAVE PERMISSION TO DO THAT");
                    res.redirect("back");
                }
                  
            }
    });
        
    }else {
        req.flash("error", "You Need To Be Logged In To Do That!");
        res.redirect("back");
    }
}


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "YOU MUST LOGIN FIRST");
    res.redirect("/login");
}


module.exports = middlewareObj;