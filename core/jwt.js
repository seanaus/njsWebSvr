const config = require("../config");
const { token } = require("../enums/jwt");
const cache = require("../core/cache");
const jwt = require("jsonwebtoken");

const get = (data, option) => {
    switch (option) {
        case token.access:
            return jwt.sign({ data }, config.accessTokenSecret, { expiresIn: config.tokenLifeSpan })
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
            // return { ...data, ...{ success: true } }
            return data
        }
    })
}
const save = async (token) => {
    try {
        const data = await cache.addItem("auth", token);
        return await cache.save(data);
    } catch (error) {
        console.log(error.message);
        return false
    }
}
module.exports = {
    get,
    verify,
    save
}