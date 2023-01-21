"use strict";
const { createUser, signInUser } = require("../core/auth");
const User = require("../models/user");

const register = async (req, res, next) => {
    const user = new User(
        "",
        req.body.forename,
        req.body.surname,
        req.body.email,
        req.body.password,
        "",
        "",
    )
    
    console.log(`register: ${JSON.stringify(req.body)}`)
    const cred = await createUser(user);
    res.json(cred);
    next();
};
const signIn = async (req, res, next) => {
    const user = new User(
        "",
        req.body.forename,
        req.body.surname,
        req.body.email,
        req.body.password,
        ""
    )
    const option = req.params.option

    if (option === "firebase") {
        const cred = await signInUser({ ...user, option });
        res.json(cred);
    }
    if (option === "google") {
        res.render('gglAuth')
        // above call renders google auth pop up the results of which passed
        // to signInUser fumctionality, the results of which passed via user
        // const cred = await signInUser({ ...user, option });
        // res.json(cred);
    }
    next();
};

module.exports = {
    register,
    signIn
};
