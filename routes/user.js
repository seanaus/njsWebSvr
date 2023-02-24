"use strict";
const express = require("express");
const router = express.Router();
const user = require("../controllers/user");

router.get("/users", user.getAll);
router.get("/user/:id", user.get);
// router.post("/register", user.register);
// router.post("/signIn", user.signIn);
// router.post("/signOut", user.signOut);

module.exports = {
    routes: router,
}