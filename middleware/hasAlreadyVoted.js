const Post = require("../models/Post.model");

module.exports = async(req, res, next) => {
    // checks if the user has already voted that specific post 
    
    const postsList =  await Post.find({createdAt: {"$gt": today}});
    console.log("ALLPOSTS: ", postsList.length, postsList[0]);

    for (let i = 0; i < )
    // for in for
    // check for all songs if any of votes is from currentuser
    



    post.populate("rated.0")
    console.log(post)
    for (let i = 0; i < post.rated.length ; i ++){

        const id = post.rated[i]
        console.log(req.session.currentUser._id, id)

        if (req.session.currentUser._id == id){
            console.log("entra")
            //return res.render("not-allowed-to-post")
            return res.render("not-allowed-to-post")
        }
    }
    
    next();
  };

  
