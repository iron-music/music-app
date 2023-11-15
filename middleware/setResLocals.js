const Post = require("../models/Post.model");
const WinnerSong = require("../models/WinnerSong.model");

module.exports = async (req, res, next) => {
    //console.log("MIDDLEWARE. currentUser: ", req);
    if (req && req.session && req.session.currentUser) {
        res.locals.userLocals = req.session.currentUser;
    }
    else
        res.locals.userLocals = "";

    // get Songoftheday info
    const today = new Date();
    today.setUTCHours(0,0,0,0);
    const song = await WinnerSong.findOne({createdAt: {"$gt": today}}).populate("postId");
    if (song) {
        res.locals.winnerSong = song.postId;
    }
    else {
        res.locals.winnerSong = "";
    }

    //console.log(song.postId);    
    next();
};

/* 
const setResLocals = (req, res, next) => {
    console.log("MIDDLEWARE. currentUser: ", req);
    if (req && req.session && req.session.currentUser) {
        res.locals.userName = req.session.currentUser.username;
        //console.log("session", req.session.currentUser.username);
    }
    else
        res.locals.userName = "";
    next();
};
app.use(setResLocals()); */