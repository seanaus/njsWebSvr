"use strict";
const express = require("express");
const router = express.Router();
const { register, signIn } = require("../controllers/auth");

router.post("/register", register);
router.post("/signIn/:option", signIn);
// router.get("/product/:id", getProduct);



module.exports = {
    routes: router,
}