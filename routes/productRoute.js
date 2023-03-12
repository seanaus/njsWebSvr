"use strict";
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/:id", productController.get);
router.get("/", productController.getAll);

module.exports = {
    routes: router,
}