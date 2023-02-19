"use strict";
const express = require("express");
const router = express.Router();
const page = require("../controllers/routes");

router.get(["/","/home"], page.renderHome);
router.get("/register", page.renderRegister);
router.get("/signIn", page.renderSignIn);

module.exports = {
    routes: router,
}