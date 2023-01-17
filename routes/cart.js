"use strict";
const express = require("express");
const router = express.Router();
const { getCart, addToCart, delFromCart } = require("../controllers/cart");

router.get("/cart", getCart);
router.get("/cart-add/:cartId/:productId", addToCart);
router.get("/cart-remove/:cartId/:productId", delFromCart);

// router.post("/signIn/:option", signIn);
// router.get("/product/:id", getProduct);

module.exports = {
    routes: router,
}