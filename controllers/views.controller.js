module.exports.getHome = function (req, res) {
    res.render("home.ejs")
};

module.exports.getLogin = function (req, res) {
    res.render("login.ejs")
};

module.exports.getRegister = function (req, res) {
    res.render("register.ejs")
};
module.exports.getLogout = function (req, res) {
    //todo: delete all sites local storage
    res.render("logout.ejs")
};
module.exports.getGrat = function (req, res) {
    res.render("grat.ejs")
};
