"use strict";
const express = require("express");
const router = express.Router();
const { renderHome, renderRegister, renderSignIn } = require("../controllers/routes");
const { register, signIn } = require("../controllers/user");

router.get(["/","/home"], renderHome);
router.get("/register", renderRegister);
router.get("/signIn", renderSignIn);

router.post("/register", register);
router.post("/signIn", signIn);

module.exports = {
    routes: router,
}