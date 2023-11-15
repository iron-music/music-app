const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const WinningSongSchema = new Schema(
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

const WinningSong = model("Post", WinningSongSchema);

module.exports = WinningSong;