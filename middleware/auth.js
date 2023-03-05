const adminService = require("../services/authService");
const config = require("../config");
const authService = require("../services/authService");
const jwtService = require("../services/jwtService");
const { token } = require("../enums/jwt");
// const { cacheId } = require("../enums/cache");

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
    const accessToken = authHeader && authHeader.split(' ')[1].split(',')[token.access]
    const refreshToken = authHeader && authHeader.split(' ')[1].split(',')[token.refresh]

    let data = jwtService.verify(accessToken);

    if (data === "-1") {
        data = await authService.getToken(refreshToken)
    }

    if (data !== "-1") {
        res.cookie('auth', `${data},${refreshToken}`, {
            maxAge: 5000,
            secure: true,
            httpOnly: true,
            sameSite: 'lax' 
        });
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = {
    connect,
    authGuard
}