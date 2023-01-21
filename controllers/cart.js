"use strict";
const {
    cartMain, 
    addCartItem, 
    delCartItem, 
    addCustomerInfo, 
    addDeliveryInfo, 
    addPaymentInfo 
} = require("../core/cart");

const getCart = async (req, res, next) => {

    res.json(await cartMain(req));

    next();
};
const updateCustomerInfo = async (req, res, next) => {

    const id = req.params.cartId;
    const data = req.body;
    res.json(await addCustomerInfo(id,data));

    next();
};
const updateDeliveryInfo = async (req, res, next) => {

    const id = req.params.cartId;
    const data = req.body;

    res.json(await addDeliveryInfo(id,data));

    next();
};
const updatePaymentInfo = async (req, res, next) => {

    const id = req.params.cartId;
    const data = req.body;

    res.json(await addPaymentInfo(id,data));

    next();
};
const addToCart = async (req, res, next) => {

    const cartId = req.params.cartId;
    const productId = req.params.productId;

    res.json(await addCartItem(cartId, productId));

    next();

};
const delFromCart = async (req, res, next) => {

    const cartId = req.params.cartId;
    const productId = req.params.productId;

    res.json(await delCartItem(cartId, productId));

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
