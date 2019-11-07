//configuration and env
require('dotenv').config();
const gConfig = require("./config");
const envi = process.env.ENV;
const serverConfig = gConfig[envi];

const express = require("express");
const expressValidator = require('express-validator');
const session = require("express-session");
var useragent = require('express-useragent');

const createError = require("http-errors");
const path = require("path");
const bodyParser = require("body-parser");
const gratServices = require("./services/gratServices");

const mongoose = require("mongoose");

//auth section: passport stratgies and jwt
const passport = require("passport");
var cookieParser = require('cookie-parser');


var app = express();
app.use(session({
    secret: serverConfig.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    //  secure: true
  }
}));
app.use(cookieParser());

//serverConfig passport and passport strategies
app.use(passport.initialize());
app.use(passport.session());
app.use(useragent.express());


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

const gratRouter = require("./routes/grat.route");
app.use("/api/grat", gratRouter);

const authRouter = require("./routes/auth.route");
app.use("/auth", authRouter);

const viewsRouter = require("./routes/views.route");
app.use("/", viewsRouter);

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
    //setInterval(gratServices.checkExpiry, 1000*60*5);

  console.log(app.locals.title + " listening on port " + serverConfig.express_port);
});
module.exports.app = app;