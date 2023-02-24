"use strict";
const auth = require("../core/auth");
const register = async (req, res) => {
    const usr = await auth.register(req);
    if (usr.accessToken === "") {
        res.redirect("signIn");
    } else {
        res.redirect(`/home?auth=${JSON.stringify(usr)}`);
    }
}
const signIn = async (req, res) => {
    const usr = await auth.signIn(req);
    if (usr.accessToken !== "") {
        res.redirect(`/home?auth=${JSON.stringify(usr)}`);
    } else {
        res.redirect("signIn");
    }
}
const signOut = async (req, res, next) => {
    const refreshToken = req.body.auth.refreshToken;
    console.log(`ControllerUserSignOut01: ${refreshToken}`);
    // // console.log(`ControllerUserSignOut: ${JSON.stringify(req.nbody.auth)}`);
    if (await auth.signOut(refreshToken)) {
        res.redirect("/home");
    }
    next();
}
module.exports = {
    register,
    signIn,
    signOut
};