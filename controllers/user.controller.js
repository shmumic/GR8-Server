const mongoose = require("mongoose");
const { User } = require("../models/user.model");

module.exports.getUser = function (req, res) {

  let userId = req.params.id;
    console.log("recived a getUser req:" + req.params.id);
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

module.exports.createUser = function (req, res) {
    console.log(2);
    let user = new User({
        name: req.body.name,
        authMethod: req.body.authMethod,
        gender: req.body.gender
    });
    console.log(3);

    user.save(function (err, saveUserd) {
        console.log(4);

        if (err) {
            return res.send(err);

        } else {
            console.log(5);

            console.log("saving user:" + saveUserd);
            return res.send(saveUserd);

        }

    });
};
