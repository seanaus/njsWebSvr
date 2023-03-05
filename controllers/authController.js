"use strict";
const authService = require("../services/authService");

const register = async (req, res) => {
    const auth = await authService.register(req);
    authService.setCookie("auth",`${auth.accessToken},${auth.refreshToken}`, undefined, res);
    //res.cookie('auth', `${auth.accessToken},${auth.refreshToken}`).redirect('/home');
    res.redirect('/home');
}

const signIn = async (req, res) => {
    const auth = await authService.signIn(req);
    authService.setCookie("auth",`${auth.accessToken},${auth.refreshToken}`, undefined, res);
    res.redirect('/home');
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

const getToken = async (req, res, next) => {

    const authHeader = req.headers.authorization
    const refreshToken = authHeader && authHeader.split(' ')[1]

    const data = await authService.getToken(refreshToken);
    // res.cookie("auth",`${auth.accessToken},${auth.refreshToken}`);
    // res.send;
    // res.cookie('auth', `${auth.accessToken},${auth.refreshToken}`).send('cookie set');
    res.cookie('auth', `${data},${refreshToken}`).redirect('/home');
}

module.exports = {
    register,
    signIn,
    signOut,
    getToken
};