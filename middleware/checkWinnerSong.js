// Require the models in order to interact with the database
const WinnerSong = require("../models/WinnerSong.model");
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const setResLocalsUtil = require("../utils/setResLocalsUtil");

const deletePostById = async (idPost) => {
    try {
        const postPopulated = await Post.findById(idPost).populate("owner");
        const ownerId = postPopulated.owner._id;
        await User.updateOne({_id: ownerId},{$pull: {posts: idPost}});
        console.log("REMOVED USER ", ownerId, "postID: ", idPost);
        await Post.deleteOne({_id : idPost})
    }
    catch (err) {
        console.log("ERROR: ", err);
    }
};

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
                //save winnersong to the DB collectionof winnersongs of each day.
                await WinnerSong.create({title, artist, previewURI, imageURL, owner, postText, score, rated});

                // delete all older posts which are not from today, because
                // we already have winner song for today and we dont need
                // anymore the older songs.
                const postsToDelete = await Post.find({"createdAt" : {"$lt": today}});

                for (let i = 0; i < postsToDelete.length; i++) {
                    await deletePostById(postsToDelete[i]._id);
                    console.log("DELETED OLD SONG ", i);
                }
                //await Post.deleteMany({"createdAt" : {"$lt": today}});

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