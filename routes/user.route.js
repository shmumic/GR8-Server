const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");

  router
    .route("/")
    .get(function(req,res){
        res.send("Nothing here :) ") //TODO: add a GET all user function for future admin control panel.
    })
      .post(controller.createUser);
  router
    .route("/:id")
    .get(controller.getUser)
    .put(function(req,res){
      res.send("mock_update_one_user_by_id")})
      .delete(controller.deleteUser);
module.exports = router;
