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
        postText: String
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true
    }
);

const Post = model("Post", postSchema);

module.exports = Post;