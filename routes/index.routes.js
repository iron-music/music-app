const express = require('express');
const spotifyApi = require("../api/api");
const isSameUser = require('../middleware/isSameUser');
const isLoggedIn = require('../middleware/isLoggedIn');
const checkWinnerSong = require('../middleware/checkWinnerSong');

const router = express.Router();

// Require the User model in order to interact with the database
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const hasAlreadyPosted = require('../middleware/hasAlreadyPosted');

/* GET home page */
router.get("/", checkWinnerSong, (req, res, next) => {
  res.render("index");
});

router.get("/:user", isLoggedIn, isSameUser, async (req, res) => {

  const posts = await Post.find().populate("owner");


  const finalPosts = posts.map((e) => {

    if (e.owner.username === req.session.currentUser.username) {
      
      let e2 = JSON.stringify(e);
      e2 = JSON.parse(e2);
      e2.isOwner = true;
      
      return e2;
    }
    return e;



  })

  // res.send(finalPosts)
  res.render("users/profile", { finalPosts });
});


router.post("/:user" , (req, res)=>{
  res.redirect(`/${req.session.currentUser.username}/create`);
})

router.get("/:user/create", hasAlreadyPosted, isLoggedIn, isSameUser, (req, res) => {
  const userName = req.params.user;
  const song = req.query.song;
  const info = {
    userName: userName
  }
  if (song) {

    spotifyApi.searchTracks(song)
      .then((result) => {

        return result.body.tracks.items
      })
      .then((songsArray) => {
        const cleanSongsArr = songsArray.map((song) => {
          const obj = {
            name: song.name,
            artist: song.artists[0].name,
            id: song.id,
            preview: song.preview_url,
            imageURL: song.album.images[1].url
          }

          return {
            ...obj,
            stringified: JSON.stringify(obj)
          }
        })
        info.cleanSongsArr = cleanSongsArr;
        res.render("users/select-song", info);
      })
  }
  else {
    res.render("users/select-song", info);
  }
});

router.post("/:user/create", hasAlreadyPosted, async (req, res) => {
  // console.log(req.body.selectedSong)
  // res.send(req.body.selectedSong)
  const songDetails = await JSON.parse(req.body.selectedSong)
  console.log(songDetails)
  res.render("users/create-post", songDetails)



})

router.post("/:user/creating", async (req, res) => {
  const songDetails = req.body;
  //const songDetails = await JSON.parse(req.body.selectedSong)
  console.log(songDetails)
  const thePost = {
    title: songDetails.name,
    artist: songDetails.artist,
    previewURI: songDetails.preview,
    owner: req.session.currentUser._id,
    postText: songDetails.postText,
    imageURL: songDetails.imageURL
  }
  console.log(thePost);
  const { _id } = await Post.create(thePost);
  await User.findByIdAndUpdate(req.session.currentUser._id, { $push: { posts: _id } });
  console.log("POST Created in the DB");
  res.redirect(`/${req.session.currentUser.username}`);
});




module.exports = router;
