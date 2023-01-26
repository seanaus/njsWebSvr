const admin = require("../core/user");
// const User = require("../models/user");
const config = require("../config");
// const app02 = require("../app");

const connect = async(req,res, next) => {
    const auth = await admin.signIn({
        body : {
            email: config.adminMail,
            password: config.adminHash
        }
    });
    req.body.auth = auth
    next();
}

module.exports = {
    connect
}