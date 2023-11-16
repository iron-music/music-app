const express = require('express')
const router = express.Router();

// Require the User model in order to interact with the database
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const hasAlreadyVoted = require('../middleware/hasAlreadyVoted');
const isLoggedIn = require('../middleware/isLoggedIn');


//render view
router.get("/:post/edit", isLoggedIn, async (req, res) => {
    const postId = req.params.post
    //security layer
    const postToCheck = await Post.findById(postId);
    console.log(req.session.currentUser._id, postToCheck.owner)
    if (req.session.currentUser._id != postToCheck.owner) {
        return res.render("not-found");
    }
    //end of security layer
    selectedPost = await Post.findById(postId)
    res.render("post/editing-post", selectedPost);

})

//redirect
router.post("/:post/edit", isLoggedIn, async (req, res) => {
    const postId = req.params.post
    //security layer
    const postToCheck = await Post.findById(postId);
    console.log(req.session.currentUser._id, postToCheck.owner)
    if (req.session.currentUser._id != postToCheck.owner) {
        return res.render("not-found");
    }
    //end of security layer
    const newText = req.body.postText

    await Post.findByIdAndUpdate(postId, { postText: newText });
    res.redirect(`/${req.session.currentUser.username}`);
})

router.get("/:post/deleting", isLoggedIn, async (req, res) => {
    const postId = req.params.post;
    //security layer
    const postToCheck = await Post.findById(postId);
    console.log(req.session.currentUser._id, postToCheck.owner)
    if (req.session.currentUser._id != postToCheck.owner) {
        return res.render("not-found");
    }
    //end of security layer
    postInfo = await Post.find({ _id: postId }).populate("owner");
    const objectPost = postInfo[0]
    res.render("post/deleting-confirmation-post", objectPost);
})

router.get("/:post/deleted", isLoggedIn, async (req, res) => {
    const postId = req.params.post;
    //security layer
    const postToCheck = await Post.findById(postId);
    console.log(req.session.currentUser._id, postToCheck.owner)
    if (req.session.currentUser._id != postToCheck.owner) {
        return res.render("not-found");
    }
    //end of security layer
    const postPopulated = await Post.findById(postId).populate("owner");
    const ownerId = postPopulated.owner._id;
    await User.updateOne({ _id: ownerId }, { $pull: { posts: postId } });
    await Post.deleteOne({ _id: postId })
    res.redirect(`/${req.session.currentUser.username}`);
})

//receiving the rating score and updating the Post score field
router.post("/:post/rate", isLoggedIn, hasAlreadyVoted, async (req, res) => {
    const postId = req.params.post;

    const userId = req.session.currentUser._id;
    const rating = parseInt(req.body.rating);
    const post = await Post.findById(postId);
    const postScore = parseInt(post.score);

    const updatedScore = postScore + rating;

    await Post.findByIdAndUpdate(postId, { score: updatedScore })
    await Post.findByIdAndUpdate(postId, { $push: { rated: userId } });
    res.redirect(`/${req.session.currentUser.username}`);
})

module.exports = router;
