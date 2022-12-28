"use strict";
const { loadCart } = require("../core/cart");

const getCart = async (req, res, next) => {

    let id = req.query.id !== "" ? req.query.id: undefined;
    const uId = req.query.uId !== "" ? req.query.uId : undefined
    const appId = req.query.appId !== "" ? req.query.appId : undefined

    res.json(await loadCart(id,uId,appId));

    next();
};
module.exports = {
    getCart
};