"use strict";
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const middleWare = require("../middleware/auth");

router.get("/:id", productController.get);
// router.get("/", productController.getAll);
router.get("/", middleWare.authGuard, productController.getAll);

module.exports = {
    routes: router,
}