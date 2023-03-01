const adminService = require("../services/authService");
const config = require("../config");
const cacheService = require("../services/cacheService");
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
        console.log(`ACCESS-TOKEN-NEW: ${data}`)
        // try for new token using refresh token
        // if fail redirect to sign in page
    //     return res.redirect("signIn");
    }
    next();
    
}
const getToken = async (value) => { 
    let data = "-1";
    const cache = await cacheService.get(cacheId.auth)
    console.log(`ACCESS-TOKEN-NEW: 01`);
    if (cache.items.includes(value)) {
        console.log(`ACCESS-TOKEN-NEW: 02`);
        data = jwtService.verify(value, token.refresh);
        console.log(`ACCESS-TOKEN-NEW: 03`);
        console.log(`ACCESS-TOKEN-NEW-DATA: ${data.data}`);
        if (data !== "-1") {
            console.log(`ACCESS-TOKEN-NEW: 04`);
            data = jwtService.get(data, token.accessToken); 
            console.log(`ACCESS-TOKEN-NEW: 05`);
        }
    }
    return data
}
module.exports = {
    connect,
    authGuard
}