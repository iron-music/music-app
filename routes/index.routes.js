const express = require('express');
const spotifyApi = require("../api/api");
const isSameUser = require('../middleware/isSameUser');
const isLoggedIn = require('../middleware/isLoggedIn');


const router = express.Router();

// Require the User model in order to interact with the database
const User = require("../models/User.model");
const Post = require("../models/Post.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/:user",  isLoggedIn, isSameUser, async( req, res)=>{
const userName = req.params.user;
res.render("users/profile",{userName});
});


router.get("/:user/create", isLoggedIn, isSameUser, (req, res)=>{
  const userName = req.params.user;
  const song = req.query.song;
  const info = {
    userName:userName
  }
  if (song) {

    spotifyApi.searchTracks(song)
      .then((result)=>{
      
        return result.body.tracks.items
    })
    .then((songsArray)=>{
      const cleanSongsArr = songsArray.map((song)=>{
          const obj = {
            name: song.name,
            artist: song.artists[0].name,
            id: song.id,
            preview: song.preview_url
          }
          return {... obj,
            stringified: JSON.stringify(obj)}
      })
      info.cleanSongsArr = cleanSongsArr;
      res.render("users/select-song", info);
    })
  }
  else{
      res.render("users/select-song", info);
    }
  });

router.post("/:user/creating", async (req, res) =>{
  const songDetails = req.body;
  //const songDetails = await JSON.parse(req.body.selectedSong)
  console.log(songDetails)
  const thePost = {
    title: songDetails.name,
    artist: songDetails.artist,
    previewURI: songDetails.preview,
    owner: req.session.currentUser._id,
    postText: songDetails.postText
  }
  console.log(thePost);
  const { _id } = await Post.create(thePost);
  await User.findByIdAndUpdate(req.session.currentUser._id, {$push: {posts: _id}});
  console.log("POST Created in the DB");
  res.send(thePost);
});

router.post("/:user/create", async (req, res) =>{
  // console.log(req.body.selectedSong)
  // res.send(req.body.selectedSong)
  const songDetails = await JSON.parse(req.body.selectedSong)
  console.log(songDetails)
  res.render("users/create-post", songDetails)
  // res.redirect();


})


module.exports = router;
