const Delivery = require("../models/delivery");
const Payment = require("../models/payment");
const Totals = require("../models/totals");
class Cart {
    constructor(
        id = "",
        uId = "",
        metaData = {},
        items = [],
        delivery = new Delivery(),
        payment = new Payment(),
        totals = new Totals(),
        created = ""
    ) {
        this.id = id;
        this.uId = uId;
        this.metaData = metaData;
        this.items = items;
        this.delivery = delivery;
        this.payment = payment;
        this.totals = totals;
        this.created = created;
    }

}
module.exports = Cart