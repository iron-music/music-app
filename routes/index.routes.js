const express = require('express');
const spotifyApi = require("../api/api");


const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/:user", async( req, res)=>{
const userName = req.params.user;
res.render("users/profile",{userName});
});


router.get("/:user/create",  (req, res)=>{
  const userName = req.params.user;
  const song = req.query.song;
  if (song) {

    spotifyApi.searchTracks(song)
      .then((result)=>{
      
        return result.body.tracks.items
    })
    .then((songsArray)=>{
      const cleanSongsArr = songsArray.map((song)=>{
          const obj = {
            name: song.name,
            id: song.id,
            preview: song.preview_url
          }
          return obj
      })
      res.render("users/create-post", {userName, cleanSongsArr});
      //res.send(cleanSongsArr)
    })
  }
  else{
      res.render("users/create-post", {userName});
    }
  })

module.exports = router;
