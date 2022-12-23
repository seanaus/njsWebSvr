class User {
    constructor(
        id,
        forename,
        surname,
        email,
        password,
        salt,
        role
    ) {
        this.id = id;
        this.forename = forename;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.salt = salt;
        this.role = role;
    }

}
module.exports = User