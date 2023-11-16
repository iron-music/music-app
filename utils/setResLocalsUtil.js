const Post = require("../models/Post.model");
const WinnerSong = require("../models/WinnerSong.model");

module.exports = async (req, res) => {
    //console.log("MIDDLEWARE. currentUser: ", req);
    if (req && req.session && req.session.currentUser) {
        res.locals.userLocals = req.session.currentUser;
    }
    else
        res.locals.userLocals = "";

    // get Songoftheday info
    const today = new Date();
    today.setUTCHours(0,0,0,0);
    const song = await WinnerSong.findOne({createdAt: {"$gt": today}});
    if (song) {
        res.locals.winnerSong = song;
    }
    else {
        res.locals.winnerSong = "";
    }
    return ;
};