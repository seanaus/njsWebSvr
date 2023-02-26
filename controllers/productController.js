"use strict";
const coreProduct = require("../core/product");

const get = async (req, res, next) => {
    const product = await coreProduct.get(req.params.id);
    res.json(product);
    next();
};
const getAll = async (req, res, next) => {
    const products = await coreProduct.getAll();
    res.json(products);
    next();
};
module.exports = {
    get,
    getAll,
};
