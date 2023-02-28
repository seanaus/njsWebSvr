"use strict";
const authService = require("../services/authService");

const register = async (req, res) => {
    res.json(await authService.register(req));
}

const signIn = async (req, res) => {
    res.json(await authService.signIn(req));
}

const signOut = async (req, res, next) => {
    const refreshToken = req.body.auth.refreshToken;
    if (await authService.signOut(refreshToken)) {
        res.redirect("/home");
    } else {
        res.sendStatus(500);
    }
    next();
}

module.exports = {
    register,
    signIn,
    signOut
};