var Grat = require("../models/grat.model").Grat;

module.exports.checkExpiry = async function () {
    //iterates all public gratitudes which visiblity can be changed
    //if current date exceeded expiration date of the gratitude changes the gratitude to private and visiblityChange attribute to false.
    console.log("mock check expiry date")
};