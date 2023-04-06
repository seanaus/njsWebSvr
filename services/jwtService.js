const jwt = require("jsonwebtoken");
const settingsService = require("./settingsService");
const config = require("../config");
const { token } = require("../enums/jwt");

const get = async(data, option) => {
    
    switch (option) {
        case token.access:
            return jwt.sign({ data }, settingsService.accessTokenSecret, { "expiresIn": settingsService.tokenLifeSpan })
        case token.refresh:
            return jwt.sign({ data }, settingsService.refreshTokenSecret)
    }
}
const verify = (token = "", option = token.access) => {
    const secret = option === token.access ? settingsService.accessTokenSecret : settingsService.refreshTokenSecret
    return jwt.verify(token, secret, (err, data) => {
        if (err) {
            return undefined
        } else {
            return data
        }
    })
}
module.exports = {
    get,
    verify
}