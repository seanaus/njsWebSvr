"use strict";
const express = require("express");
const router = express.Router();
const { getUser, getUsers } = require("../controllers/user");

router.get("/users", getUsers);
router.get("/user/:id", getUser);

module.exports = {
    routes: router,
}