var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data =[{
        name: "Cloud's Rest",
        image : "https://www.outdoorproject.com/sites/default/files/styles/odp_header_adaptive/public/features/dsc_0535.jpg?itok=RPvMRnKB",
        description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Mountain on the wheel",
        image : "https://20dqe434dcuq54vwy1wai79h-wpengine.netdna-ssl.com/wp-content/uploads/2016/09/Moraine-Park-Campground-Tinkurlab-OutThere-Colorado.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Snow on the Mountain",
        image : "http://www.trbimg.com/img-5949b1f7/turbine/la-1498001907-9zu1omzurz-snap-image",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },

]

function seedDB() {
    
    //REMOVE ALL CAMPGROUNDS
    Campground.deleteMany({}, function(err){
    if(err){
        console.log(err);
    
    } else {
        console.log("ALL ITEMS REMOVED");
          //CREATE NEW CAMPGROUND
             data.forEach(function(seed){
                 Campground.create(seed, function(err, campground){
                     if(err){
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        //CREATING COMMENTS
                        Comment.create({
                            text: "This is a great place but I wish there was internet!!",
                            // author: "Homer"
                        },function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("new comment added")
                            }
                        })
                    }
                 });
             });
    }
    
  
});    
}

module.exports = seedDB;

