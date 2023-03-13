"use strict";
const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
const authService = require("../services/authService")

router.get(["/", "/home"], pageController.renderHome);
router.get("/register", pageController.renderRegister);
router.get("/signIn", pageController.renderSignIn);
// router.get("/product", pageController.renderProduct);

module.exports = {
    routes: router,
}