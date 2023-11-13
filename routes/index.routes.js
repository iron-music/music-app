const express = require('express');
const spotifyApi = require("../api/api");
const isSameUser = require('../middleware/isSameUser');
const isLoggedIn = require('../middleware/isLoggedIn');


const router = express.Router();

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
      res.render("users/create-post", info);
    })
  }
  else{
      res.render("users/create-post", info);
    }
  })
  
router.post("/:user/create", (req, res) =>{
  console.log(req.body.selectedSong)
  res.send(req.body.selectedSong)



})

module.exports = router;
