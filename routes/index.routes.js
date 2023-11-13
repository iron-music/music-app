const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/:user", isLoggedIn, async( req, res)=>{
const userName = req.params.user;
render("users/profile",{userName});
});

module.exports = router;
