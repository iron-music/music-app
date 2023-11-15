const Post = require("../models/Post.model");

module.exports = async(req, res, next) => {
    // checks if the user has already voted that specific post 
    console.log(req.params.post)
    
    
    const post =  await Post.findById(req.params.post);
    
    post.populate("rated.0")
    console.log(post)
    for (let i = 0; i < post.rated.length ; i ++){

        const id = post.rated[i]
        console.log(req.session.currentUser._id, id)

        if (req.session.currentUser._id === id){
            console.log("entra")
            //return res.render("not-allowed-to-post")
            return res.redirect("/marc/create")
        }
    }
    
    console.log("not voted")
    next();
  };

  
