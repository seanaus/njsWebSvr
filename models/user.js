class User {
    constructor(
        id,
        forename,
        surname,
        email,
        password,
        salt,
    ) {
        this.id = id;
        this.forename = forename;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.salt = salt;
    }

}
module.exports = User