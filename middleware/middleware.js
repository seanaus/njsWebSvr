const config = require("../config");
const authService = require("../services/authService");
// const settingsService = require("../services/settingsService");
const connect = async (req) => {
    const auth = await authService.signIn({
        body: {
            email: config.adminMail,
            password: config.adminHash
        }
    });
    return auth
}
// ONLY NECCESSARY WHEN USING VIEW ENGINE (Configurable option in .env)
// IF CLIENT APP IS SEPERATE IT SHOULD STORE THE JWT INFO ITSELF AND SET
// HEADERS (With 'auth-x' and 'auth-xr') BEFORE MAKING SERVER REQUEST
const setHeaders = (req, res, next) => {
    if (req?.cookies) {
        if ("authX" in req.cookies) {
            req.headers['authX'] = req.cookies['authX'];
        }
        if ("authXR" in req.cookies) {
            req.headers['authXR'] = req.cookies['authXR'];
        }
    }
    next();
}

// GET PROJECT SETTINGS FROM FIREBASE ( SETTINGS NOT REQUIRED IN .dotEnv)
// const projectSettings = async() => {
//     return await settingsService.get()
// }
module.exports = {
    connect,
    setHeaders
}