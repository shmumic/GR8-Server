const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");


//for register or login
router
    .route('/google')
    .get(controller.googleAuthenticate);

//what to do with the resquest after it has been processed by google
router
    .route("/google/callback")
    .get(controller.googleCallBack);


module.exports = router;

