"use strict";
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/cart", cartController.getCart);
router.post("/editCart/customerDetails/:cartId", cartController.updateCustomerInfo);
router.post("/editCart/deliveryDetails/:cartId", cartController.updateDeliveryInfo);
router.post("/editCart/paymentDetails/:cartId", cartController.updatePaymentInfo );

router.get("/addCartItem/:cartId/:productId", cartController.addToCart);
router.get("/delCartItem/:cartId/:productId", cartController.delFromCart);

module.exports = {
    routes: router
}