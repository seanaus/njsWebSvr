class Delivery {
    constructor(
        forename = "",
        surname = "",
        address1 = "",
        address2 = "",
        town = "",
        city = "",
        county = "",
        postcode = "",
        email = "",
        telephone = ""

    ) {
        this.forename = forename;
        this.surname = surname;
        this.address1 = address1;
        this.address2 = address2;
        this.town = town;
        this.city = city;
        this.county = county;
        this.postcode = postcode;
        this.email = email;
        this.telephone = telephone;
    }

}
module.exports = Delivery