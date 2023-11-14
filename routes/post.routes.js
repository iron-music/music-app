const express = require('express')
const router = express.Router();

// Require the User model in order to interact with the database
const User = require("../models/User.model");
const Post = require("../models/Post.model");


//render view
router.get("/:post/edit", async (req, res) => {
    // console.log("requparams",req.params);
    selectedPost = await Post.findById(req.params.post)
    res.render("post/editing-post", selectedPost);
    // console.log("post",selectedPost);
})

//redirect
router.post("/:post/edit", async (req, res) => {
    const newText = req.body.postText
    await Post.findByIdAndUpdate(req.params.post, { postText: newText });
    res.redirect(`/${req.session.currentUser.username}`);
})
//receiving the rating score and updating the Post score field

router.post("/rate/:post", async (req, res) => {
    const postId = req.params.post;
    const score = req.body.rating;
    const lastScore = await Post.findById(postId);
    //[0].score;

    console.log("lolo", postId, score, lastScore)
    //Post.findByIdAndUpdate(postId{score})
    res.send(score)
})
module.exports = router;