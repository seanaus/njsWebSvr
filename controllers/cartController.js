"use strict";
const cartService = require("../services/cartService");

const getCart = async (req, res, next) => {

    res.json(await cartService.cartMain(req));

    next();
};
const updateCustomerInfo = async (req, res, next) => {

    const id = req.params.cartId;
    const data = req.body;
    res.json(await cartService.addCustomerInfo(id,data));

    next();
};
const updateDeliveryInfo = async (req, res, next) => {

    const id = req.params.cartId;
    const data = req.body;

    res.json(await cartService.addDeliveryInfo(id,data));

    next();
};
const updatePaymentInfo = async (req, res, next) => {

    const id = req.params.cartId;
    const data = req.body;

    res.json(await cartService.addPaymentInfo(id,data));

    next();
};
const addToCart = async (req, res, next) => {

    const cartId = req.params.cartId;
    const productId = req.params.productId;

    res.json(await cartService.addCartItem(cartId, productId));

    next();

};
const delFromCart = async (req, res, next) => {

    const cartId = req.params.cartId;
    const productId = req.params.productId;

    res.json(await cartService.delCartItem(cartId, productId));

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
