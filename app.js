require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
const path = require("path");
const gConfig = require("./config");
const envi = process.env.ENV;

const config = gConfig[envi];
console.log(config);

var app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
//app.use("/api/users", usersRouter);
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

const usersRouter = require("./routes/user.route");
const gratRouter = require("./routes/user.route");

app.use("/api/users", usersRouter);
 
mongoose.connect(config.dbURI, {
  dbName: config.dbName,
  auto_reconnect: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() =>
  console.log("Connected to MongoDB at:" + config.dbURI +' db name: ' +config.dbName)
).catch(err => {
  console.log("Failed to connect to MongoDB...", err);
  process.exit();
});


app.listen(config.express_port, function () {
    console.log("Express server listening on port " + config.express_port);
    app.emit("appStarted");

});
module.exports.app = app;