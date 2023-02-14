const config = require("../config");
const { tokenType } = require("../enums/jwt");
// const { saveUser } = require("../core/user");
const jwt = require("jsonwebtoken");

const getToken = (data, option)=> {
    switch(option) {
        case tokenType.access:
            console.log(JSON.stringify(data))
            return jwt.sign(data, config.accessTokenSecret, `{ expiresIn: ${config.tokenLifeSpan} }`)
        case tokenType.refresh:
            return jwt.sign(data, config.refreshTokenSecret)
    }
}
const verifyToken = (token)=> {
    return jwt.verify(token, config.accessTokenSecret, (err, data)=> {
        if(err)  {
            return { success : false }
        } else {
            return {...data, ...{ success: true }}
        }
    })
}

module.exports = {
    getToken,
    verifyToken 

}