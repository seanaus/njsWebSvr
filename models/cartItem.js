const Product = require('../models/product');
class CartItem extends Product {
    constructor(product) {
        super(
            product.id,
            product.name,
            product.description,
            product.imageCard,
            product.image,
            product.unitCost
        );
        this.quantity = 1;
        this.cost = Number(product.unitCost);
        this.shippingOption = "0";
    }

}
module.exports = CartItem