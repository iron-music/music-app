
const Post = require("../models/Post.model");

module.exports = async (req, res, next) => {
    // checks if the user has posted something today ( if it has we will not allow him to go to next() and will redirect him)
    const myPosts = await Post.find({owner: req.session.currentUser._id});
    const todayDay = new Date().getDay();
    const todayMonth = new Date().getMonth();
    const todayFullYear = new Date().getFullYear();



    for (let i = 0; i < myPosts.length; i ++){
        const p = myPosts[i];
        if(p.createdAt.getFullYear() === todayFullYear && p.createdAt.getMonth() === todayMonth && p.createdAt.getDay() === todayDay){
            console.log("The user already posted a song today");
            return res.render("not-allowed-to-post")
        }
    }
    next();
  };
  