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
const verify = (token) => {

    token = null ? "" : token;

    return jwt.verify(token, config.accessTokenSecret, (err, data) => {
        if (err) {
            return "-1"
        } else {
            return data
        }
    })
}
module.exports = {
    get,
    verify
}