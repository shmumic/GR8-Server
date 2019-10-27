const mongoose = require("mongoose");
var Grat = require("../models/grat.model").Grat;
const {User} = require("../models/user.model");
const auth = require("./auth.controller");
const {body} = require('express-validator');
const {validationResult} = require('express-validator');
var moment = require('moment');

exports.validate = (method) => {
    switch (method) {
        case 'checkGrat': {
            return [
                body('gratText', 'Gratitude Cannot Be empty').exists(),
                body('gratText', 'Please elaborate :P ').isLength({min: 3}),
                body('gratText', 'That is to lengthy  ').isLength({max: 280}),
                body('isPublic').exists().isBoolean(),
            ]
        }
    }
};

function getGrats(gratParmas) { //makes the query with spefic gratitued params.

    return Grat.find(gratParmas, function (err, foundGrats) {
        if (err) {
            console.log(err)
        } else {
            console.log("found grats :" + foundGrats);
            return (foundGrats)
        }
    })

}

module.exports.getAllGrats = async function (req, res) {
    console.log("got a a get all grat request");
    let gratParams = {};
    let grats = await getGrats(gratParams);
    return res.send(grats)
};
module.exports.getAlllUserGrat = async function (req, res) {
    console.log("got a a get a user grats req");
    let queryUserID = req.params.userId;
    let gratParams = {userId: queryUserID};
    let grats = await getGrats(gratParams);
    return res.send(getGrats(gratParams))
};

module.exports.getGratByID = async function (req, res) {
    console.log("got a a get specific user grat req");
    let queryGratID = req.params.userId;
    gratParams = {_id: queryGratID};
    return res.send(getGrats(gratParams))
};

module.exports.createGratForUser = function (req, res) {

    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }

    let authnaticatedUserId = req.user._id;
    let userIdForGratSubmission = req.params.userID;
    console.log("publishedDate: " + moment());

    if (authnaticatedUserId === userIdForGratSubmission) {
        let newGrat = new Grat({
            userId: authnaticatedUserId,
            ip: req.ip.split(":")[3],
            userAgent: req.useragent,
            location: {},
            gratText: req.body.gratText,
            isPublic: req.body.isPublic,
            canVisibilityBeChanged: true,
            publishedDate: moment(),
            expireDate: moment().add(1, 'days')

        });
        newGrat.save((errSavingGrat, savedGrat) => {
            if (errSavingGrat) {
                //  console.log(errSavingGrat);
                res.sendStatus(404).send(err);
            } else {
                //console.log("sending response back:" +savedGrat)
                res.send(savedGrat);
            }
        })
    } else {
        console.log("authenticating failed ");
        return res.sendStatus(401);
    }


};

module.exports.updateGrat = function (req, res) {
    console.log("got a new grat: " + req.body);
    let queryGratID = req.params.gratId;
    gratParams = {_id: queryGratID,};
    return res.send(getGrats(gratParams))
};

module.exports.deleteGrat = function (req, res) {
    console.log("got a new grat: " + req.body);
    let queryGratID = req.params.gratId;
    gratParams = {_id: queryGratID,};
    return res.send(getGrats(gratParams))
};
