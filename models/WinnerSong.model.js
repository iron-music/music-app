const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const WinnerSongSchema = new Schema(
    {
        title: String,
        artist: String,
        // songSpotiURI: String,
        previewURI: String,
        imageURL: String,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        postText: String,
        score: {
            type: Number,
            default: 0
        },
        rated: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],       
    },
    {
        // this adds extra properties: `createdAt` and `updatedAt`
        timestamps: true
    }
);

const WinnerSong = model("WinnerSong", WinnerSongSchema);

module.exports = WinnerSong;