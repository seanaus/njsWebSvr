"use strict";
const authService = require("../services/authService");
const register = async (req, res) => {
    res.json(await authService.register(req));
    // if (auth.accessToken === "") {
    //     res.redirect("signIn");
    // } else {
    //     res.redirect(`/home?auth=${JSON.stringify(auth)}`);
    // }
}
const signIn = async (req, res) => {
    res.json(await authService.signIn(req));
    // if (auth.accessToken !== "") {
    //     res.redirect(`/home?auth=${JSON.stringify(auth)}`);
    // } else {
    //     res.redirect("signIn");
    // }
}
const signOut = async (req, res, next) => {
    const refreshToken = req.body.auth.refreshToken;
    if (await authService.signOut(refreshToken)) {
        res.redirect("/home");
    }
    next();
}
module.exports = {
    register,
    signIn,
    signOut
};