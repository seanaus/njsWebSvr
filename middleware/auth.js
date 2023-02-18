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
const authToken = (req, res, next)=> {

	const authHeader = req.headers[authorization]
	const token = authHeader && authHeader.split(' ')[1]
	const data = jwt.verify(token);

    if(data === "-1") {
        res.sendStatus(403);
    }

    next();
}
module.exports = {
    connect
}