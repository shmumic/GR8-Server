const express = require("express");
const router = express.Router();
const controller = require("../controllers/views.controller");
const authController = require("../controllers/auth.controller");

router
    .route('/home')
    .get(authController.jwtAuthenticateToken, controller.getHome)
    .get(controller.getHome);


router
    .route('/login')
    .get(controller.getLogin);

router
    .route("/register")
    .get(controller.getRegister);
router
    .route("/logout")
    .get(controller.getLogout);
router
    .route("/grat")
    //.get(authController.jwtAuthenticateToken,controller.getGrat);
    .get(controller.getGrat);


module.exports = router;