"use strict";
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.getCart); // ( query params ?cartId='' & uId="" & customData = "{'key' : "", 'value' : "" } )
router.post("/customerDetails/:cartId", cartController.updateCustomerInfo);
router.post("/deliveryDetails/:cartId", cartController.updateDeliveryInfo);
router.post("/paymentDetails/:cartId", cartController.updatePaymentInfo );

router.get("/addItem/:cartId/:productId", cartController.addToCart);
router.get("/removeItem/:cartId/:productId", cartController.delFromCart);

module.exports = {
    routes: router
}