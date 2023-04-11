"use strict";
const authService = require("../services/authService");
// const settingsService = require("../services/settingsService")
const config = require("../config");
const settings = require("../services/settingsService");
const register = async (req, res) => {
    const auth = await authService.register(req);
    authService.setCookies(res, auth, config.authLifeSpan(), "/home");
}

const signIn = async (req, res) => {
    // const settings = await settingsService.projectSettings();
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