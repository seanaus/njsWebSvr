"use strict";
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users", userController.getAll);
router.get("/user/:id", userController.get);

module.exports = {
    routes: router,
}