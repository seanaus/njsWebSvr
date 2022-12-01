"use strict";
const express = require("express");
const router = express.Router();
const { getAuthenticated } = require("../controllers/auth");

router.get("/auth", getAuthenticated);

module.exports = {
    routes: router,
}