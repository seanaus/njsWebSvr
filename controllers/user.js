"use strict";
const user = require("../core/user");
const get = async (req, res, next) => {
    const usr = await user.get(req.params.id);
    res.json(usr);
    next();
};
const getAll = async (req, res, next) => {
    const usrs = await user.get();
    res.json(usrs);
    next();
};
module.exports = {
    getAll,
    get,
};