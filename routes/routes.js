"use strict";
const express = require("express");
const router = express.Router();
const ContRoutes = require("../controllers/routes");

router.get(["/","/home"], ContRoutes.renderHome);
router.get("/register", ContRoutes.renderRegister);
router.get("/signIn", ContRoutes.renderSignIn);

module.exports = {
    routes: router,
}