// Require the User model in order to interact with the database
const WinnerSong = require("../models/WinnerSong.model");
const Post = require("../models/Post.model");
const setResLocalsUtil = require("../utils/setResLocalsUtil");

module.exports = async (req, res, next) => {
    // check for winning song in the database
    console.log("CHECKING FOR THE SONG OF THE DAY ...");
    const today = new Date();
    today.setUTCHours(0,0,0,0);

    let list = null;
    let bestScoreSong;
    try {
        let winnerSongOfToday = await WinnerSong.findOne({createdAt: {"$gt": today}});
        if (!winnerSongOfToday) {
            
                // search for songs of yesterday and find the greatest score among them.
                const yesterday = new Date (today);
                yesterday.setDate(yesterday.getDate() - 1);
        
                list = await Post.find({"createdAt" : {"$gte": yesterday, "$lte":today}}).sort({"score":-1});
                //console.log("FOUND SONG", list[0])
                if (list[0]) {
                    bestScoreSong = list[0];
                }
                else {
                    // if there are no songs yesterdat,
                    // no song can be a winner so just don't do anything and proceed.
                    return next();
                }
                //console.log("BEFORE DESTRUCT");
                const {
                    title, 
                    artist,
                    previewURI,
                    imageURL,
                    owner,
                    postText,
                    score,
                    rated
                } = bestScoreSong;
                const WinnerSongData = {
                    title, 
                    artist,
                    previewURI,
                    imageURL,
                    owner,
                    postText,
                    score,
                    rated
                }
                //console.log(WinnerSongData);
                await WinnerSong.create({title, artist, previewURI, imageURL, owner, postText, score, rated});
                await setResLocalsUtil(req, res);
                //console.log("OK WINNERSONG ADDED");
            }
        else {
            console.log("TODAY THE WINNERSONG ALREADY EXISTS");
        }
    }
    catch (err) {
        console.log("ERROR: ", err);
    }
    next();
};