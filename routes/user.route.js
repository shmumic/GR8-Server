const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");

// router
//   .route("/")
//   .get(controller.getAllUsers)
//   .post(controller.createUser);
// router
//   .route("/:id")
//   .get(controller.getUser)
//   .put(controller.updateUser)
//   .delete(controller.deleteUser);


  router
    .route("/")
    .get(function(req,res){
        res.send("Nothing here :) ")
    })
      .post(controller.createUser);
  router
    .route("/:id")
    .get(controller.getUser)
    .put(function(req,res){
      res.send("mock_update_one_user_by_id")})
    .delete(function(req,res){
      res.send("mock_delete_one_user_by_id")});
module.exports = router;
