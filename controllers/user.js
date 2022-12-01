"use strict";
const { loadUser, loadUsers, saveUser } = require("../core/user");

const getUser = async (req, res, next) => {
    const user = await loadUser(req.params.id);
    res.json(user);
    next();
};
const getUsers = async (req, res, next) => {
    const users = await loadUsers();
    res.json(users);
    next();
};
module.exports = {
    getUser,
    getUsers,
};