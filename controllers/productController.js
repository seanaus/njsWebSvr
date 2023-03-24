"use strict";
const productService = require("../services/productService");

const get = async (req, res, next) => {
    const product = await productService.get(req.params.id);
    res.json(product);
    next();
};
const getAll = async (req, res, next) => {
    const products = await productService.getAll();
    res.json(products);
    next();
};
module.exports = {
    get,
    getAll,
};
