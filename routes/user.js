"use strict";
const express = require("express");
const router = express.Router();
const ContUser = require("../controllers/user");

router.get("/users", ContUser.getAll);
router.get("/user/:id", ContUser.get);

module.exports = {
    routes: router,
}