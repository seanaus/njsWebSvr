"use strict";
const coreAuth = require("../core/auth");
const register = async (req, res) => {
    const user = await coreAuth.register(req);
    if (user.accessToken === "") {
        res.redirect("signIn");
    } else {
        res.redirect(`/home?auth=${JSON.stringify(user)}`);
    }
}
const signIn = async (req, res) => {
    const user = await coreAuth.signIn(req);
    if (user.accessToken !== "") {
        res.redirect(`/home?auth=${JSON.stringify(user)}`);
    } else {
        res.redirect("signIn");
    }
}
const signOut = async (req, res, next) => {
    const refreshToken = req.body.auth.refreshToken;
    console.log(`Auth-Controller-SignOut: ${refreshToken}`);
    if (await coreAuth.signOut(refreshToken)) {
        res.redirect("/home");
    }
    next();
}
module.exports = {
    register,
    signIn,
    signOut
};