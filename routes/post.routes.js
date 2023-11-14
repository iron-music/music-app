const express = require('express')
const router = express.Router();

// Require the User model in order to interact with the database
const User = require("../models/User.model");
const Post = require("../models/Post.model");


//render view
router.get("/:post/edit", async (req, res) =>{
    console.log("requparams",req.params.post);
    selectedPost = await Post.findById(req.params.post)
    console.log(selectedPost)
    res.render("post/editing-post", selectedPost);
    // console.log("post",selectedPost);
})

//redirect
router.post("/:post/edit", async (req, res) =>{
    // console.log(req.body.postText)
    const newText = req.body.postText
    await Post.findByIdAndUpdate(req.params.post, {postText: newText});
    res.redirect(`/${req.session.currentUser.username}`);
})

router.get("/:post/delete", async (req, res) =>{
    
    
    const idPost = req.params.post;
    await Post.deleteOne({_id : idPost})
    res.redirect(`/${req.session.currentUser.username}`);
})

module.exports = router;