module.exports = (req, res, next) => {
    console.log(req.session.currentUser)
    // checks if the user is logged in when trying to access a specific page
    if ( req.session.currentUser.username !== req.params.user) {
      return res.render("not-found");
    }
  
    next();
  };
  