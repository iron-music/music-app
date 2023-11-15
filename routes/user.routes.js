const express = require('express');
const spotifyApi = require("../api/api");
const isSameUser = require('../middleware/isSameUser');
const isLoggedIn = require('../middleware/isLoggedIn');
const fileUploader = require('../config/cloudinary.config');
const checkWinnerSong = require('../middleware/checkWinnerSong');

const router = express.Router();

// Require the User model in order to interact with the database
const User = require("../models/User.model");
const Post = require("../models/Post.model");

router.get("/:user/edit-user",  async (req, res) => {
    res.render("users/edit-user");
});

router.post("/:user/edit-user",  fileUploader.single("profile-picture"), async (req, res, next) => {
    const {_id ,username, email} = req.session.currentUser;
    
    const updatedUser = await User.findByIdAndUpdate(_id,{imageUrl: req.file.path}, {new:true});
    req.session.currentUser = updatedUser;
    res.redirect(`/${username}/edit-user`)
   
});

router.get("/:user/winner", checkWinnerSong, (req, res) => {
    return console.log("END");
});



module.exports = router;