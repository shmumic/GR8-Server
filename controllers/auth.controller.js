//auth playground
require('dotenv').config();
const gConfig = require("./../config");
const envi = process.env.ENV;
const serverConfig = gConfig[envi];

const {User} = require("../models/user.model");
const generate = require('meaningful-string');


const jwt = require('jsonwebtoken');
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var cookieParser = require('cookie-parser');
var cookie = require('cookie');
const cookieMaxAge = 1000 * 60 * 60 * 24 * 365; // about one year
passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});


passport.use(new GoogleStrategy(serverConfig.googleStrategyConf,
    async function (accessToken, refreshToken, profile, cb) {
        console.log("runnig google straregy!");
        await User.find({
            googleId: profile.id
        }, async function (errFindingUser, user) {
            if (errFindingUser) {
                console.log(errFindingUser)
            } else {
                if (user != null && user != undefined && user != "") {
                    console.log("user was found: " + user);
                    return cb(errFindingUser, user);
                } else {
                    let genNickName = await createNewNickName();
                    await User.findOrCreate({googleId: profile.id, nickName: genNickName}, (errFindingUser, user) => {
                        console.log("user was created!");
                        return cb(errFindingUser, user);
                    })
                }
            }
        });
    }
));
createNewNickName = async function () {
    let options = {
        "numberUpto": 90000,
        "joinBy": ' '
    };
    let genNickName = generate.meaningful(options);
    let nickNameFound = 1;
    while (nickNameFound) {
        await User.find({nickName: genNickName}, (err, foundUser) => {
            if (err) {
                console.log("error while finding user when creating a new NickName")
            }
            if (foundUser.nickName != genNickName) {
                nickNameFound = 0;
            } else {
                genNickName = generate.meaningful(options)
            }
        })
    }
    console.log("new nick name generated sucessfully:" + genNickName);
    return genNickName;
};
module.exports.googleAuthenticate = function (req, res, next) {
    passport.authenticate('google', {
        session: true, scope: ['profile', 'email', 'openid']
    })(req, res, next)
};

module.exports.googleCallBack = function (req, res, next) { //this function called when user uses google auth.
    passport.authenticate('google', {
            failureRedirect: '/login'
        },
        async function (req, foundUser) {
            // Successful authentication, Store create and store JWT
            let jwtToken = await module.exports.jwtCreateAccessToken(foundUser);
            console.log("creating cookie with token:" + jwtToken + "and with maxAge of:" + cookieMaxAge);
            res.cookie('authorization', jwtToken, {maxAge: cookieMaxAge, httpOnly: true});
            res.sendStatus(200);
        })(req, res, next)
};

module.exports.jwtAuthenticateToken = function (req, res, next) {
    if (req.cookies != 'undfinded' && req.cookies != null) {
        const authHeader = req.cookies['authorization'];
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
    } else {
        res.sendStatus(401)
    }


};
module.exports.jwtCreateAccessToken = function (req) {
    if (req != undefined) {
        user = {_id: req._id};
        const accessToken = jwt.sign(user, serverConfig.jwtConfig.acessTokenSecret);
        return accessToken
    }
};

