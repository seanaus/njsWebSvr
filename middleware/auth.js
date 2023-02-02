const admin = require("../core/user");
const config = require("../config");

const connect = async (req, res) => {
    const auth = await admin.signInUser({
        body: {
            email: config.adminMail,
            password: config.adminHash
        }
    });
    req.body.auth = auth
}

module.exports = {
    connect
}