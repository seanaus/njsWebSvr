class Cache {
    constructor
        (
            id
        )
        {
            this.id = id;
            this.items = [];
            this.add = (item) => {
                this.items.push(item);
            };
            this.remove = (item) => {
                idx = this.items.findIndex(itm =>{
                    return itm = item
                })
                this.items.splice(idx, 1);
            };

        }

}
module.exports = Cache