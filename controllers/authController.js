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
    const auth = authService.getHeaders();
    if (await authService.signOut(auth.refreshToken)) {
        res.redirect("/home");
    } else {
        res.sendStatus(500);
    }
    next();
}

// const setCookie = (res, name, value, lifeSpan = 5000, redirectTo) => {
//     res.cookie(name, value, { 
//         maxAge: lifeSpan,
//         secure: true,
//         httpOnly: true,
//         sameSite: 'lax'
//     })
//     if(redirectTo !== undefined) {
//         res.redirect(redirectTo);
//     }
// }

module.exports = {
    register,
    signIn,
    signOut
};