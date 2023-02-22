"use strict";
const user = require("../core/user");
const get = async (req, res, next) => {
    const usr = await user.get(req.params.id);
    res.json(usr);
    next();
};
const getAll = async (req, res, next) => {
    const usrs = await user.get();
    res.json(usrs);
    next();
};
const register = async (req, res) => {
    const usr = await user.register(req);
    if (usr.accessToken === "") {
        res.redirect("signIn");
    } else {
        res.redirect(`/home?auth=${JSON.stringify(usr)}`);
    }
}
const signIn = async (req, res) => {
    const usr = await user.signIn(req);
    if(usr.accessToken !== "") {
        res.redirect(`/home?auth=${JSON.stringify(usr)}`);
    } else {
        res.redirect("signIn"); 
    }
}
const signOut = async(req, res, next) => {
    const refreshToken = req.body.auth.refreshToken;
    console.log(`ControllerUserSignOut01: ${refreshToken}`);
    // // console.log(`ControllerUserSignOut: ${JSON.stringify(req.nbody.auth)}`);
    if(await user.signOut(refreshToken)) {
        res.redirect("/home");
    }
    next();
}
module.exports = {
    getAll,
    get,
    register,
    signIn,
    signOut
};