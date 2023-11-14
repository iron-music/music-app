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
    const postId = req.params.post
    await Post.findByIdAndUpdate(postId, {postText: newText});
    res.redirect(`/${req.session.currentUser.username}`);
})

router.get("/:post/deleting", async (req, res) =>{
    const postId = req.params.post;
    postInfo = await Post.find({_id : postId}).populate("owner");
    console.log(postInfo)
    const objectPost = postInfo[0]
    res.render("post/deleting-confirmation-post",objectPost);
})

router.get("/:post/deleted", async (req, res) =>{
    const idPost = req.params.post;
    await Post.deleteOne({_id : idPost})
    res.redirect(`/${req.session.currentUser.username}`);
})

module.exports = router;