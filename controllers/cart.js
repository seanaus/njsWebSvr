"use strict";
const {initCart, loadCart, saveCart, updateCart} = require("../core/cart");

const getCart= async (req, res, next) => {
    // let cartId =  0;
    // let userId =  0;

    const cartId = req.query.id;
    const userId = req.query.uId;
    // console.log(userId);
    // console.log("?|?|?|?|");
    // console.log(cartId);
    // console.log(userId);
    if(cartId !== '') {
        res.json(await loadCart(cartId));
    } else {
        res.json(await initCart(userId));
    }
    next();
};

module.exports = {
    getCart
};