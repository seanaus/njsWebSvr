"use strict";
const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
const middleWare = require("../middleware/auth")

router.get(["/","/home"], middleWare.authGuard, pageController.renderHome);
router.get("/register", pageController.renderRegister);
router.get("/signIn", pageController.renderSignIn);
// router.get("/product", pageController.renderProduct);

module.exports = {
    routes: router,
}