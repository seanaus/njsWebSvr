"use strict";
const authService = require("../services/authService");

const register = async (req, res) => {
    const auth = await authService.register(req);
    //authService.setCookie("auth",`${auth.accessToken},${auth.refreshToken}`, undefined, res);
    res.cookie('auth', `${auth.accessToken},${auth.refreshToken}`, { 
        maxAge: 60000,
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    }).redirect('/home');
    //res.redirect('/home');
}

const signIn = async (req, res) => {
    const auth = await authService.signIn(req);
    res.cookie('auth', `${auth.accessToken},${auth.refreshToken}`, { 
        maxAge: 60000,
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    }).redirect('/home');
    //authService.setCookie("auth",`${auth.accessToken},${auth.refreshToken}`, undefined, res);
    // res.redirect('/home');
    // res.json(await authService.signIn(req));
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