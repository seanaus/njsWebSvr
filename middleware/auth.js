const admin = require("../core/user");
const config = require("../config");

const connect = async (req, res) => {
    const auth = await admin.signIn({
        body: {
            email: config.adminMail,
            password: config.adminHash
        }
    });
    //const auth = {
    //    key1 : "value1",
    //    key2: "value2"
    //}
    // console.log(auth);
    req.body.auth = auth
}

module.exports = {
    connect
}