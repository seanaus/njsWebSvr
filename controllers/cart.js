"use strict";
const { getCart } = require("../core/cart");

const shoppingCart = async (req, res, next) => {

    res.json(await getCart(req));

    next();
};
module.exports = {
    shoppingCart
};