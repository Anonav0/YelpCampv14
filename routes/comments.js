var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//new comment route
router.get("/new", middleware.isLoggedIn,  function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
   
});

//create comment route
router.post("/",middleware.isLoggedIn,  function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err || !campground){
           console.log(err);
       } else {
           //create a new comment
           Comment.create(req.body.comment, function(err, comment){
              if(err || !comment){
                  console.log(err);
              }  else {
                  //add username and id to comment
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  //save comment
                  comment.save();
                  campground.comments.push(comment);
                  campground.save();
                  console.log(comment);
                  req.flash("success", "Successfully added comment!");
                  res.redirect("/campgrounds/" + campground._id);
              }
           });
       }
   })

});

//COMMENT EDIT ROUTE
router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req, res){
    //doing this extra step for error while editing the comment if we edit the campground id the app breaks.
    Campground.findById(req.params.id, function(err,foundCampground){
       if(err || !foundCampground) {
           req.flash("error", "campground not found here!");
           return res.redirect("back");
       } 
       Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
              res.render("comments/edit", {campground_id: req.params.id, comment: foundComment})
            }
        });
    });

});

//COMMENT UPDATE ROUTE
router.put("/:comment_id",middleware.checkCommentOwnership,  function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       } else {
           console.log(req.params.comment_id);
           res.redirect("/campgrounds/" + req.params.id );
       }
   }) ;
});

//COMMENT DELETE ROUTE
router.delete("/:comment_id",middleware.checkCommentOwnership,  function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "The comment is deleted!!");
           res.redirect("/campgrounds/" + req.params.id );
       }
   }) 
});





module.exports = router;


