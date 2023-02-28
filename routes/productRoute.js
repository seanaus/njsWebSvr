"use strict";
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const middleware = require("../middleware/auth");

router.get("/:id", productController.get);
router.get("/", productController.getAll);
// router.get("/products", middleware.authGuard, productController.getAll);

module.exports = {
    routes: router,
}