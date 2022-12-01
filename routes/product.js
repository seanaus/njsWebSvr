"use strict";
const express = require("express");
const router = express.Router();
const { getProduct, getProducts } = require("../controllers/product");

router.get("/product/:id", getProduct);
router.get("/products", getProducts);

module.exports = {
    routes: router,
}