"use strict";
const express = require("express");
const router = express.Router();
const routesController = require("../controllers/routesController");

router.get(["/","/home"], routesController.renderHome);
router.get("/register", routesController.renderRegister);
router.get("/signIn", routesController.renderSignIn);
// router.get("/product", routesController.renderProduct);

module.exports = {
    routes: router,
}