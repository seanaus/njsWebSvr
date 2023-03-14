"use strict";
const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
// const authController = require("../controllers/authController");

router.get(["/","/home"], pageController.renderHome);
router.get("/about", pageController.renderAbout);
router.get("/product", pageController.renderProduct);
router.get("/location", pageController.renderLocation);
router.get("/cart", pageController.renderCart);
router.get("/register", pageController.renderRegister);
router.get("/signIn", pageController.renderSignIn);
// router.get("/signOut", authController.signOut);

module.exports = {
    routes: router,
}