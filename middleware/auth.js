const admin = require("../core/user");
const User = require("../models/user");
const config = require("../config");

const connect = (req, res, next) => {
    const user = admin.loadUser(undefined, config.adminMail);
    const authUser = admin.signIn({
        "email": user.email,
        "password": config.adminHash
    });
    console.log(`AUTH: ${JSON.stringify(authUser)}`)
    next();
}

module.exports = {
    connect
}