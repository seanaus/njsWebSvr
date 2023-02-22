const admin = require("../core/user");
const config = require("../config");
const jwt = require("../core/jwt");

const connect = async (req, res) => {
    const auth = await admin.signIn({
        body: {
            email: config.adminMail,
            password: config.adminHash
        }
    });
    req.body.auth = auth
}
const authToken = (req, res)=> {

	const authHeader = req.headers[Authorization]
	const token = authHeader && authHeader.split(' ')[1]
	const data = jwt.verify(token);

    console.log(`authToken-DATA: ${data}`);

    if(data !== "-1") {
        return true
    } else {
        return false
    }
}
module.exports = {
    connect,
    authToken
}