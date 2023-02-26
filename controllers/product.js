"use strict";
const coreProduct = require("../core/product");

const getProduct = async (req, res, next) => {
    const product = await coreProduct.get(req.params.id);
    res.json(product);
    next();
};
const getProducts = async (req, res, next) => {
    const products = await coreProduct.getAll();
    res.json(products);
    next();
};
module.exports = {
    getProduct,
    getProducts,
};
