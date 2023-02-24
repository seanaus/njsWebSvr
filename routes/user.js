"use strict";
const express = require("express");
const router = express.Router();
const user = require("../controllers/user");

router.get("/users", user.getAll);
router.get("/user/:id", user.get);

module.exports = {
    routes: router,
}