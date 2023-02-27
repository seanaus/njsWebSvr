"use strict";
const userService = require("../services/userService");
const get = async (req, res, next) => {
    const usr = await userService.get(req.params.id);
    res.json(usr);
    next();
};
const getAll = async (req, res, next) => {
    const usrs = await userService.get();
    res.json(usrs);
    next();
};
module.exports = {
    getAll,
    get,
};