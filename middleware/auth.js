const adminService = require("../services/authService");
const config = require("../config");
const authService = require("../services/authService");
const jwtService = require("../services/jwtService");
const { token } = require("../enums/jwt");

const connect = async (req) => {
    const auth = await adminService.signIn({
        body: {
            email: config.adminMail,
            password: config.adminHash
        }
    });
    return auth
}
// const authGuard = async (req, res, next) => {
//     const cookie = req.cookies['auth']
//     if (cookie !== undefined) {
//         req.headers['authorization'] = `Bearer ${cookie}`
//     }
//     const auth = authService.authorization(req);
//     console.log(`AUTH: ${JSON.stringify(auth)}`)
//     let data = jwtService.verify(auth.accessToken);
//     console.log(`AUTHGUARD: ${data}`)
//     if (data === undefined) {
//         data = await authService.regenToken(auth.refreshToken);
//         console.log(`AUTHGUARD_02: ${data}`)
//         if (data !== undefined) {
//             // authService.setCookie("auth",`${data},${refreshToken}`, undefined, res);
//             res.cookie('auth', `${auth.accessToken},${auth.refreshToken}`, {
//                 maxAge: 60000,
//                 secure: true,
//                 httpOnly: true,
//                 sameSite: 'lax'
//             });
//         }
//     }
//     console.log(`BELOW COOKIE: ${data}`)
//     if (data !== undefined) {
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// }

const authGuard = async (req, res, next) => {
    const authKey = req.headers['auth-x'];
    if(authKey !== undefined) {
        console.log(`AUTHGAURD REPORTS: ${authKey}`);
    } else {
        console.log(`AUTHGAURD REPORTS: UNDEFINED`);   
    }
    next();
}
// ONLY NECCESSARY WHEN USING VIEW ENGINE
// IF CLIENT APP IS SEPERATE IT SHOULD STORE THE JWT INFO ITSELF AND ADD TO HEADER BEFORE MAKING SERVER REQUEST
const setHeaders = (req)=> {
    if(req?.cookies) {
        if ("auth-x" in req.cookies) {
            req.headers['auth-x'] = req.cookies['auth-x'];
        }
        if ("auth-xr" in req.cookies) {
            req.headers['auth-xr'] = req.cookies['auth-xr'];
        }
    }
}
module.exports = {
    connect,
    authGuard,
    setHeaders
}