"use strict";
// const { genSalt, hash } = require("../core/encrypt");
// const { loadUser, loadUsers, saveUser } = require("../core/user");
const { createNew, signIn } = require("../core/user");

// const register = async (req, res, next) => {
//     res.json(await createNew(req));
//     next();
// }
// const logIn = async (req, res, next) => {
//     res.json(await signIn(req));
//     next();
// }
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

const register = async (req, res) => {
    try {
        const user = await createNew(req);
        console.log(`CONTROLLER-REGISTER: ${JSON.stringify(user)}`);
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports = {
    getUsers,
    getUser,
    register
};