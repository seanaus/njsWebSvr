"use strict";
const { createUser, signInUser } = require("../core/auth");
const User = require("../models/user");

const register = async (req, res, next) => {
    const user = new User(
        "",
        req.body.forename,
        req.body.surname,
        req.body.email,
        req.body.password,
        ""
    )

    const cred = await createUser(user);

    res.json(cred);
    next();
};
const signIn = async (req, res, next) => {
    const user = new User(
        "",
        req.body.forename,
        req.body.surname,
        req.body.email,
        req.body.password,
        "",
    )
    const cred = await signInUser(user);
    res.json(cred);
    next();
};
// const getAuthenticated = (req, res, next) => {
//     const auth = authUser();
//     res.json(auth);
//     next();
// };

module.exports = {
    register,
    signIn
};
