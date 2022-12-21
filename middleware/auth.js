const auth = require("../core/auth");
const connect = (req, res, next) => {
    auth.adminSignIn();
    next();
}
module.exports = {
    connect
}