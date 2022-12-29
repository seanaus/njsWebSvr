const Delivery = require("../models/delivery");
const Payment = require("../models/payment");
// const { linkUserToCart } = require("../config");
class Cart {
    constructor(
        id = "",
        uId = "",
        appId = "",
        items = [],
        delivery = new Delivery(),
        payment = new Payment(),
        totalCost = "0",
        totalCount = "0",
        created = ""
    ) {
        this.id = id;
        this.uId = uId;
        // if( uId !== undefined && linkUserToCart ) {
        //     this.uId = uId; 
        // }
        this.appId = appId;
        this.items = items;
        this.delivery = delivery;
        this.payment = payment;
        this.totalCost = totalCost.toString();
        this.totalCount = totalCount.toString();
        this.created = created;
    }

}
module.exports = Cart