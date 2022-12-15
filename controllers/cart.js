"use strict";
const { initCart, loadCart } = require("../core/cart");

const getCart = async (req, res, next) => {
    let id = req.query.id;
    const uId = req.query.uId;

    if (id === '') {
        id = await initCart(uId);
    }
    res.json(await loadCart(id));

    next();
};
module.exports = {
    getCart
};