const admin = require("../core/user");
const config = require("../config");

const connect = async (req, res, next) => {
    const auth = await admin.signIn({
        body: {
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