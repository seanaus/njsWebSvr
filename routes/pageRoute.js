"use strict";
const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

router.get(["/","/home"], pageController.renderHome);
router.get("/about", pageController.renderAbout);
router.get("/product/:id", pageController.renderProduct);
router.get("/products", pageController.renderProducts);
router.get("/location", pageController.renderLocation);
router.get("/cart", pageController.renderCart);
router.get("/register", pageController.renderRegister);
router.get("/signIn", pageController.renderSignIn);

module.exports = {
    routes: router,
}