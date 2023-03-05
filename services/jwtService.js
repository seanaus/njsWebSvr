const jwt = require("jsonwebtoken");
const config = require("../config");
const { token } = require("../enums/jwt");

const get = (data, option) => {
    switch (option) {
        case token.access:
            return jwt.sign({ data }, config.accessTokenSecret, { "expiresIn": config.tokenLifeSpan })
        case token.refresh:
            return jwt.sign({ data }, config.refreshTokenSecret)
    }
}
const verify = (token = "", option = token.access) => {
    const secret = option === token.access ? config.accessTokenSecret : config.refreshTokenSecret
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