"use strict";
const { getCart } = require("../core/cart");

const shoppingCart = async (req, res, next) => {

    res.json(await getCart(req.query));

    next();
};
module.exports = {
    shoppingCart
};