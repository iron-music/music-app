const express = require('express');
const spotifyApi = require("../api/api");
const isSameUser = require('../middleware/isSameUser');
const isLoggedIn = require('../middleware/isLoggedIn');


const router = express.Router();

// Require the User model in order to interact with the database
const User = require("../models/User.model");
const Post = require("../models/Post.model");


router.get("/:user/edit-user", async (req, res) => {
    res.render("users/edit-user");
});





module.exports = router;