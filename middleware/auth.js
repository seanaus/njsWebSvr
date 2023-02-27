const adminService = require("../services/authService");
const config = require("../config");
const jwtService = require("../services/jwtService");

const connect = async (req, res) => {
    const auth = await adminService.signIn({
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
	const data = jwtService.verify(token);
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