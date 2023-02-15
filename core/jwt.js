const config = require("../config");
const { tokenType } = require("../enums/jwt");
const { loadCache, saveCache, addToCache } = require("../core/cache");
const jwt = require("jsonwebtoken");

const getToken = (data, option) => {
    switch (option) {
        case tokenType.access:
            console.log(JSON.stringify(data))
            return jwt.sign(data, config.accessTokenSecret, `{ expiresIn: ${config.tokenLifeSpan} }`)
        case tokenType.refresh:
            return jwt.sign(data, config.refreshTokenSecret)
    }
}
const verifyToken = (token) => {
    return jwt.verify(token, config.accessTokenSecret, (err, data) => {
        if (err) {
            return { success: false }
        } else {
            return { ...data, ...{ success: true } }
        }
    })
}
const cacheToken = async (token) => {
    console.log("cacheToken")
    const cache = await addToCache("auth", token);
    console.log("WTF01")
    console.log(`CACHE: ${JSON.stringify(cache)}`)
    return await saveCache(cache)
    
}
module.exports = {
    getToken,
    verifyToken,
    cacheToken
}