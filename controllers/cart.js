"use strict";
const { cartMain, addCartItem, delCartItem } = require("../core/cart");

const getCart = async (req, res, next) => {

    res.json(await cartMain(req));

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
    addToCart,
    delFromCart
};
