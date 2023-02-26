"use strict";
const express = require("express");
const router = express.Router();
const { 
    getCart, 
    addToCart, 
    delFromCart, 
    updateCustomerInfo, 
    updateDeliveryInfo, 
    updatePaymentInfo 
} = require("../controllers/cartController");

router.get("/cart", getCart);
router.post("/editCart/customerDetails/:cartId", updateCustomerInfo);
router.post("/editCart/deliveryDetails/:cartId", updateDeliveryInfo);
router.post("/editCart/paymentDetails/:cartId", updatePaymentInfo );

router.get("/addCartItem/:cartId/:productId", addToCart);
router.get("/delCartItem/:cartId/:productId", delFromCart);

module.exports = {
    routes: router
}