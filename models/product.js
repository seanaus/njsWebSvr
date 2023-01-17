class Product {
    constructor(
        id,
        name,
        description,
        image,
        gallery = [],
        unitCost,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.gallery = gallery;
        this.unitCost = Number(unitCost);
    }

}
module.exports = Product