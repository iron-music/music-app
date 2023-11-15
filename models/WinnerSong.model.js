const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const WinnerSongSchema = new Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true
    }
);

const WinnerSong = model("WinnerSong", WinnerSongSchema);

module.exports = WinnerSong;