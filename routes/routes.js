"use strict";
const express = require("express");
const router = express.Router();
const { renderHome, renderRegister, renderSignIn } = require("../controllers/routes");

router.get(["/","/home"], renderHome);
router.get("/register", renderRegister);
router.get("/signIn", renderSignIn);

module.exports = {
    routes: router,
}