const express = require("express");
const router = express.Router();
const controller = require("../controllers/grat.controller");
const auth = require("../controllers/auth.controller");

router
    .route("/")
    .get(controller.getAllGrats);

router
    .route("/:userID/")
    .get(auth.jwtAuthenticateToken, controller.getAlllUserGrat)//
    .post(auth.jwtAuthenticateToken, controller.validate('checkGrat'), controller.createGratForUser);
router
    .route("/:userID/:gratID")
    .get(auth.jwtAuthenticateToken, controller.getGratByID)
    .put(auth.jwtAuthenticateToken, controller.updateGrat)
    .delete(auth.jwtAuthenticateToken, controller.deleteGrat);
module.exports = router;
