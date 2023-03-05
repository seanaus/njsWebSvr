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

    const auth = authService.authorization(req);

    let data = jwtService.verify(auth.accessToken);

    if (data === undefined) {
        data = await authService.regenToken(auth.refreshToken);
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