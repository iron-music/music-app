module.exports = (req, res, next) => {
    //console.log("MIDDLEWARE. currentUser: ", req);
    if (req && req.session && req.session.currentUser) {
        res.locals.userName = req.session.currentUser.username;
        res.locals.userMail = req.session.currentUser.email;
        //console.log("session", req.session.currentUser.username);
    }
    else
        res.locals.userName = "";
    next();
};

/* 
const setResLocals = (req, res, next) => {
    console.log("MIDDLEWARE. currentUser: ", req);
    if (req && req.session && req.session.currentUser) {
        res.locals.userName = req.session.currentUser.username;
        //console.log("session", req.session.currentUser.username);
    }
    else
        res.locals.userName = "";
    next();
};
app.use(setResLocals()); */