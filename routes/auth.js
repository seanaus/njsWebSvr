"use strict";
const express = require("express");
const router = express.Router();
const contAuth = require("../controllers/auth");

router.post("/register", contAuth.register);
router.post("/signIn", contAuth.signIn);
router.post("/signOut", contAuth.signOut);

module.exports = {
    routes: router,
}