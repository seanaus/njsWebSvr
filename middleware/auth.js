const adminService = require("../services/authService");
const config = require("../config");
const jwtService = require("../services/jwtService");
const { token } = require("../enums/jwt");
const { cacheId } = require("../enums/cache");

const connect = async (req, res) => {
    const auth = await adminService.signIn({
        body: {
            email: config.adminMail,
            password: config.adminHash
        }
    });
    req.body.auth = auth
}
const authGuard = async (req, res, next) => {

	const authHeader = req.headers.authorization
    const accessToken = authHeader && authHeader.split(' ')[1].split(',')[0]
    const refreshToken = authHeader && authHeader.split(' ')[1].split(',')[1]

    let data = jwtService.verify(accessToken);
    
    if (data === "-1") {
        data = await getToken(refreshToken);
        // try for new token using refresh token
        // if fail redirect to sign in page
    //     return res.redirect("signIn");
    }
    next();
    
}
const getToken = async (token) => { 
    let data = "-1";
    const cache = await cacheService.get(cacheId.auth)
    if (cache.items.includes(token)) {
        data = jwtService.verify(token);
        if (data !== "-1") {
            data = jwtService.get(data, token.accessToken);     
        }
    }
    return data
}
module.exports = {
    connect,
    authGuard
}