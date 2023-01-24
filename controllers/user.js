"use strict";
// const { loadUser, loadUsers, saveUser } = require("../core/user");
const { createNew, signIn } = require("../core/user");

const register = async (req, res, next) => {
    res.json(await createNew(req));
    next();
}
const logIn = async (req, res, next) => {
    res.json(await signIn(req));
    next();
}
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
    register,
    logIn,
    getUsers,
    getUser
};