class Component {
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

        }

}
module.exports = Component