// Require the User model in order to interact with the database
const WinnerSong = require("../models/WinnerSong.model");
const Post = require("../models/Post.model");

module.exports = async (req, res, next) => {
    // console.log("MIDDLEWARE. currentUser: ", req);
    // check for winning song in the database
    console.log("HOLA");
    const today = new Date();
    today.setUTCHours(0,0,0,0);
    

/*     // Here I have created document in database
    WinnerSong.create({
        "postId": "6554b71cbb358ef4f2dc739d"}); */

    let list = null;
    let bestScoreSong;
    let winnerSongOfToday = await WinnerSong.findOne({createdAt: {"$gt": today}});
    if (!winnerSongOfToday) {
        // search for songs of yesterday and find the greatest score among them.
        const yesterday = new Date (today);
        yesterday.setDate(yesterday.getDate() - 1);

        list = await Post.find({"createdAt" : {"$gte": yesterday, "$lte":today}}).sort({"score":-1});
        bestScoreSong = list[0];

        WinnerSong.create({postId: bestScoreSong._id});
        console.log("OK WINNERSONG ADDED");


        // console.log("Today: ", today);
        // console.log("yesterday: ", yesterday);
        // if found, create WinnerSong in the Playlist collection
    }
    else {
        console.log("TODAY THE WINNER ALREADY EXISTS");
    }
    // console.log("newDate: ", new Date('2023-11-15'), "\n Date: ", Date('2023-11-15'));
    return res.send(bestScoreSong);
    next();
};


// MongoDB search Query:
// findOne({createdAt: {"$gt": ISODate('2023-11-15')}});


/* {
    "postId": {
      "$oid": "6554b71cbb358ef4f2dc739d"
    },
    "createdAt": {
      "$date": "2023-11-15T12:18:36.387Z"
    },
    "updatedAt": {
      "$date": "2023-11-15T12:18:36.387Z"
    },
  } */