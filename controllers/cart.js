"use strict";
const { loadCart } = require("../core/cart");

const getCart = async (req, res, next) => {

    res.json(await loadCart(req.query));

    next();
};
module.exports = {
    getCart
};