const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
const usersRouter = require("./routes/user.route");
const path = require('path');

var config = require("./config");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use("/api/users", usersRouter);
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
mongoose.connect(config.db, {
   auto_reconnect:true,
  useNewUrlParser: true,
  useCreateIndex: true,
   useUnifiedTopology: true,
  useFindAndModify: false
}).then(() =>
    console.log("Connected to MongoDB at:" + config.db)
  ).catch(err => {
    console.log("Failed to connect to MongoDB...", err);
    process.exit();
  });
  app.listen(config.port, function () {
      console.log("Express server listening on port " + config.port);
  });
