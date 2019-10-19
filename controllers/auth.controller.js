//auth playground
require('dotenv').config();
const gConfig = require("./../config");
const envi = process.env.ENV;
const serverConfig = gConfig[envi];
const bodyParser = require("body-parser");

const {User} = require("../models/user.model");


const jwt = require('jsonwebtoken');
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});


passport.use(new GoogleStrategy(serverConfig.googleStrategyConf,
    function (accessToken, refreshToken, profile, cb) {
        console.log("runnig google straregy!");
        User.findOrCreate({
            googleId: profile.id
        }, function (err, user, created) {
            console.log("user was found or created:" + user);
            return cb(err, user);
        });
    }
));

module.exports.googleAuthenticate = function (req, res, next) {

    passport.authenticate('google', {
        session: true, scope: ['profile', 'email', 'openid']
    })(req, res, next)
};

module.exports.googleCallBack = function (req, res, next) {
    console.log("inside googleCallback");

    passport.authenticate('google', {

            failureRedirect: '/login'
        },
        function (req, foundUser) {
            // Successful authentication, redirect home.
            console.log("insiside googleCallBack Authenticated:");
            console.log("foundUser" + foundUser);
            res.send(jwtCreateAcessToken(foundUser));
        })(req, res, next)
};
module.exports.jwtAuthenticateToken = function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //the use of &&: if we have an authHeader get the token else set undefined.
    if (token == null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, serverConfig.jwtConfig.acessTokenSecret, (errValditionOfToken, user) => {
        if (errValditionOfToken) {
            return res.sendStatus(403)
        }
        req.user = user;
        next()

    })

};
jwtCreateAcessToken = function (req) {
    console.log("inside JWT token creation");
    console.log(req);
    user = {_id: req._id};

    const acessToken = jwt.sign(user, serverConfig.jwtConfig.acessTokenSecret);
    console.log("JWT token created:" + acessToken);

    return acessToken

};

/* an example of useage
app.get('/posts',authenticateToken,(req,res)=> {
    console.log(req.body.username)
    const usersPosts = posts.filter(post => post.username === req.body.username);


    res.send(usersPosts)
})*/