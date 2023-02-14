class User {
    constructor(
        id,
        forename,
        surname,
        displayName,
        email,
        verified,
        salt,
        role
    ) {
        this.id = id;
        this.forename = forename;
        this.surname = surname;
        this.displayName = displayName;
        this.email = email;
        this.verified = verified;
        this.salt = salt;
        this.role = role;
    }

}
module.exports = User