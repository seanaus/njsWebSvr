const Delivery = require("../models/delivery");
const Payment = require("../models/payment");
class Cart {
    constructor(
        id = "",
        userId = {},
        items = [],
        delivery = new Delivery(),
        payment = new Payment(),
        totalCost = "0",
        totalCount = "0",
        created = ""
    ) {
        this.id = id;
        this.userId = userId;
        this.items = items;
        this.delivery = delivery;
        this.payment = payment;
        this.totalCost = totalCost.toString();
        this.totalCount = totalCount.toString();
        this.created = created;
    }

}
module.exports = Cart