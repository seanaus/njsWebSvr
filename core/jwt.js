const config = require("../config");
const { token } = require("../enums/jwt");
const cache = require("../core/cache");
const jwt = require("jsonwebtoken");

const get = (data, option) => {
    switch (option) {
        case token.access:
            const exp = { expiresIn: process.env.TOKEN_LIFE_SPAN }
            return jwt.sign({ data }, config.accessTokenSecret, { expiresIn: '10m' })
        case token.refresh:
            return jwt.sign({ data }, config.refreshTokenSecret)
    }
}
const verify = (token) => {
    return jwt.verify(token, config.accessTokenSecret, (err, data) => {
        if (err) {
            return { success: false }
        } else {
            return { ...data, ...{ success: true } }
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