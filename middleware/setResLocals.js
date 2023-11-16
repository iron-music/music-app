const Post = require("../models/Post.model");
const WinnerSong = require("../models/WinnerSong.model");
const setResLocalsUtil = require("../utils/setResLocalsUtil");

module.exports = async (req, res, next) => {
    await setResLocalsUtil(req, res);
    next();
};