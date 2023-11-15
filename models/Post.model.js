const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const postSchema = new Schema(
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
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true
    }
);

const Post = model("Post", postSchema);

module.exports = Post;