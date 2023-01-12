"use strict";
const express = require("express");
const router = express.Router();
const { getCart } = require("../controllers/cart");

router.get("/cart", getCart);

module.exports = {
    routes: router,
}