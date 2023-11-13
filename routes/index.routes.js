const express = require('express');

const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/:user", async( req, res)=>{
const userName = req.params.user;
res.render("users/profile",{userName});
});

module.exports = router;
