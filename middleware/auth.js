const admin = require("../core/auth");
const config = require("../config");
const jwt = require("../core/jwt");

const connect = async (req, res) => {
    const auth = await admin.signIn({
        body: {
            email: config.adminMail,
            password: config.adminHash
        }
    });
    req.body.auth = auth
}
const authGuard = (req, res, next)=> {

	const authHeader = req.headers.authorization
	const token = authHeader && authHeader.split(' ')[1]
	const data = jwt.verify(token);
    if(data === "-1") {
        // try for new token using refresh token
        // if fail redirect to sign in page
        return res.redirect("signIn");
    }
    next();
    
}
module.exports = {
    connect,
    authGuard
}