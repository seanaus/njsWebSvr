"use strict";
const express = require("express");
const router = express.Router();
const { getProduct, getProducts } = require("../controllers/product");
const auth = require("../middleware/auth");

router.get("/product/:id", getProduct);
router.get("/products", auth.authGuard, getProducts);

module.exports = {
    routes: router,
}