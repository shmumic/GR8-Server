const express = require("express");
const router = express.Router();
const controller = require("../controllers/grat.controller");

router
    .route("/")
    .get(controller.getAllGrats);
router
    .route("/:userID/")
    .get(controller.getAlllUserGrat)
    .post(controller.createGratForUser);
router
    .route("/:userID/:gratID")
    .get(controller.getGratByID)
    .put(controller.updateGrat)
    .delete(controller.deleteGrat);
