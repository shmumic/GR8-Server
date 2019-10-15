const mongoose = require("mongoose");
const { User } = require("../models/user.model");
const {Grat} = require("../models/grat.model");

module.exports.getUser = function (req, res) {

  let userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(400).send("Invalid object id");
    User.findById(userId, function (errFindingUser, user) {
        if (errFindingUser) {
            return res.status(400)
        }
        if (!user) {
            console.log(user);
            return res.status(404).send("User not found");
        } else {
            return res.send(user)
        }
    });

};

module.exports.deleteUser = function (req, res) {

    let userIdReq = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userIdReq))
        return res.status(400).send("Invalid object id");
    User.findByIdAndRemove(userIdReq, function (errDeleteUser, user) {
        if (errDeleteUser) {
            return res.status(400)
        }
        if (!user) {
            console.log(user);
            return res.status(404).send("User not found");
        } else {
            Grat.deleteMany({userId: userIdReq}, function (errDeleteingUserGratitude) {
                if (errDeleteingUserGratitude) {
                    console.log(errDeleteingUserGratitude);
                    return res.status(400)

                } else {
                    return res.send({})

                }
            })
        }
    });

};

module.exports.createUser = function (req, res) {
    let user = new User({
        name: req.body.name,
        authMethod: req.body.authMethod,
        gender: req.body.gender
    });

    user.save(function (err, saveUserd) {

        if (err) {
            return res.send(err);

        } else {

            return res.send(saveUserd);

        }

    });
};

