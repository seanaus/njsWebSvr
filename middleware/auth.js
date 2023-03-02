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
    // console.log(`AUTH_GUARD: ${data}`)
    if (data === "-1") {
        // res.clearCookie('auth');
        await getToken(refreshToken).then(
            (data)=>{
                res.cookie('auth', `${data},${refreshToken}`,{
                    maxAge: 5000,
                    // expires works the same as the maxAge
                    // expires: new Date('01 12 2021'),
                    secure: true,
                    httpOnly: true,
                    sameSite: 'lax'
                });
            }
        );
        
        // console.log(`ACCESS-TOKEN-NEW: ${data}`)
        // return res.redirect("signIn");
    }
    next();
    
}
const getToken = async (value) => { 
    let data = "-1";
    const cache = await cacheService.get(cacheId.auth)
    if (cache.items.includes(value)) {
        // console.log(`GET_TOKEN_B4: ${data}`);
        data = jwtService.verify(value, token.refresh);
        // console.log(`GET_TOKEN_AFTER: ${JSON.stringify(data.data)}`);
        if (data !== "-1") {
            // console.log(`GET_TOKEN_NEW`);
            data = jwtService.get(data, token.access); 
            console.log(`GET_TOKEN_NEW_ACCESS: ${data}`);
        }
    }
    return data
}
module.exports = {
    connect,
    authGuard
}