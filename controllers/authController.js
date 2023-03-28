"use strict";
const authService = require("../services/authService");
const config = require("../config");

const register = async (req, res) => {
    const auth = await authService.register(req);
    authService.setCookies(res, auth, config.authLifeSpan(), "/home");
}

const signIn = async (req, res) => {
    const auth = await authService.signIn(req);
    authService.setCookies(res, auth, config.authLifeSpan(), "/home");
}

const signOut = async (req, res, next) => {
    const authXR = req?.cookies['authXR'];
    if (await authService.signOut(authXR)) {
        res.clearCookie('authX');
        res.clearCookie('authXR');
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