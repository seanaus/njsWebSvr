const adminService = require("../services/authService");
const config = require("../config");
const authService = require("../services/authService");
const jwtService = require("../services/jwtService");
const { token } = require("../enums/jwt");

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
    const cookie = req.cookies['auth']
    if (cookie !== undefined) {
        req.headers['authorization'] = `Bearer ${cookie}`
    }
    const auth = authService.authorization(req);
    console.log(`AUTH: ${JSON.stringify(auth)}`)
    let data = jwtService.verify(auth.accessToken);
    console.log(`AUTHGUARD: ${data}`)
    if (data === undefined) {
        data = await authService.regenToken(auth.refreshToken);
        console.log(`AUTHGUARD_02: ${data}`)
        if (data !== undefined) {
            // authService.setCookie("auth",`${data},${refreshToken}`, undefined, res);
            res.cookie('auth', `${auth.accessToken},${auth.refreshToken}`, {
                maxAge: 60000,
                secure: true,
                httpOnly: true,
                sameSite: 'lax'
            });
        }
    }
    console.log(`BELOW COOKIE: ${data}`)
    if (data !== undefined) {
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = {
    connect,
    authGuard
}