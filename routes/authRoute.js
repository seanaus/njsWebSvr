"use strict";
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/signIn", authController.signIn);
// router.post("/signOut", authController.signOut);
router.get("/signOut", authController.signOut);

module.exports = {
    routes: router,
}