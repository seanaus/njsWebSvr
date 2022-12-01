class Cart {
    constructor(
        userId,
        created
    ) {
        this.id = -1;
        this.userId = userId;
        this.items = [];
        this.totalCost = 0;
        this.totalCount = 0;
        this.created = created;
    }

}
module.exports = Cart