class Auth {
    constructor(
        uId = "",
        displayName = "",
        email = "",
        emailVerified = "",
        token = ""
    ) {
        this.uId = uId;
        this.displayName = displayName;
        this.email = email;
        this.emailVerified = emailVerified;
        this.token = token;
    }

}
module.exports = Auth