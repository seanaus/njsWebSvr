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
        this.quantity = "1";
        this.cost = product.unitCost;
        this.formattedCost = "";
    }

}
module.exports = CartItem