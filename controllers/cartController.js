"use strict";
const cartService = require("../services/cartService");

const getCart = async (req, res, next) => {
    res.json(await cartService.main(req));
    next();
};
const updateCustomerInfo = async (req, res, next) => {
    res.json(await cartService.addCustomerInfo(req.params.cartId,req.body));
    next();
};
const updateDeliveryInfo = async (req, res, next) => {
    res.json(await cartService.addDeliveryInfo(req.params.cartId,req.body));
    next();
};
const updatePaymentInfo = async (req, res, next) => {
    res.json(await cartService.addPaymentInfo(req.params.cartId, req.body));
    next();
};
const addToCart = async (req, res, next) => {
    res.json(await cartService.addItem(req.params.cartId, req.params.productId));
    next();
};
const delFromCart = async (req, res, next) => {
    res.json(await cartService.removeItem(req.params.cartId, req.params.productId));
    next();
};
module.exports = {
    getCart,
    updateCustomerInfo,
    updateDeliveryInfo,
    updatePaymentInfo,
    addToCart,
    delFromCart
};
