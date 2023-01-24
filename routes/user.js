"use strict";
const express = require("express");
const router = express.Router();
const { register, logIn, getUser, getUsers } = require("../controllers/user");

router.post("/register", register);
router.post("/signIn", logIn);
router.get("/users", getUsers);
router.get("/user/:id", getUser);

module.exports = {
    routes: router,
}