"use strict";
const { loadProduct, loadProducts } = require("../core/product");

const getProduct = async (req, res, next) => {
    const product = await loadProduct(req.params.id);
    res.json(product);
    next();
};
const getProducts = async (req, res, next) => {
    const products = await loadProducts();
    res.json(products);
    next();
};
module.exports = {
    getProduct,
    getProducts,
};
