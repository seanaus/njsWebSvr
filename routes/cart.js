"use strict";
const express = require("express");
const router = express.Router();
const { shoppingCart } = require("../controllers/cart");

router.get("/cart", shoppingCart);

module.exports = {
    routes: router,
}