const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [5, 'Password must be at least 5 characters long.'],
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    imageUrl: {
      type: String,
      default: "https://bestprofilepictures.com/wp-content/uploads/2020/07/Cool-Profile-Picture-For-Instagram.jpg"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
