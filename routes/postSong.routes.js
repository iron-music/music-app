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

//receiving the rating score and updating the Post score field
router.post("/:post/rate", async (req, res) => {
    const postId = req.params.post;
    const rating = req.body.rating;
    const post = await Post.findById(postId);
    const postScore = post.score;
    
    const updatedScore = postScore + 0 ;

    //Post.findByIdAndUpdate(postId{score})
    console.log({rating})
    console.log(req.body.rating)
    res.send({postScore})
})

module.exports = router;