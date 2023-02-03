"use strict";
const { createUser, signInUser } = require("../core/user");
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
    const user = await createUser(req);
    if (user.id === "-1") {
        res.redirect("signIn");
    } else {
        res.redirect(`/home?auth=${JSON.stringify(user)}`);
    }
}
const signIn = async (req, res) => {
    const user = await signInUser(req);

    res.redirect(`/home?id=${user.id}&displayName=${user.displayName}&email=${user.email}&role=${user.role}`);
}
module.exports = {
    getUsers,
    getUser,
    register,
    signIn
};