"use strict";
const { cartMain } = require("../core/cart");

const getCart = async (req, res, next) => {

    res.json(await cartMain(req));

    next();
};
module.exports = {
    getCart
};