//configuration and env
require('dotenv').config();
const gConfig = require("./config");
const envi = process.env.ENV;
const serverConfig = gConfig[envi];
const createError = require("http-errors");
const path = require("path");
const bodyParser = require("body-parser");
const request = require("request");

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

//auth section: passport stratgies and jwt
const passport = require("passport");

var app = express();
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    //  secure: true
  }
}));
//serverConfig passport and passport strategies
app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());
app.use(express.urlencoded({extended: false}));


//ejs rendering and path.
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//routing
const usersRouter = require("./routes/user.route");
app.use("/api/users", usersRouter);

const gratRouter = require("./routes/user.route");
app.use("/api/grat", gratRouter);

const authRouter = require("./routes/auth.route");
app.use("/auth", authRouter);


mongoose.connect(serverConfig.dbURI, {
  dbName: serverConfig.dbName,
  auto_reconnect: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() =>
    console.log("Connected to MongoDB at:" + serverConfig.dbURI + ' db name: ' + serverConfig.dbName)
).catch(err => {
  console.log("Failed to connect to MongoDB...", err);
  process.exit();
});
app.locals.title = 'Gr8 Server';

app.listen(serverConfig.express_port, function (appListenError) {
  if (appListenError) {
    console.log("error starting the server:" + appListenError);
    return;
  }

  console.log(app.locals.title + " listening on port " + serverConfig.express_port);
});
module.exports.app = app;