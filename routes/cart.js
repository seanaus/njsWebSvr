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
} = require("../controllers/cart");

router.get("/cart", getCart);
router.post("/cart-update/customer-details/:cartId", updateCustomerInfo);
router.post("/cart-update/delivery-details/:cartId", updateDeliveryInfo);
router.post("/cart-update/payment-details/:cartId", updatePaymentInfo );

router.get("/cart/add-item/:cartId/:productId", addToCart);
router.get("/cart/remove-item/:cartId/:productId", delFromCart);

// router.post("/signIn/:option", signIn);
// router.get("/product/:id", getProduct);

module.exports = {
    routes: router,
}