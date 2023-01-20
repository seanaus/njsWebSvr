class Request {
    constructor(
        id = "",
        uId = "",
        customData = {}
    ) {
        this.id = id;
        this.uId = uId;
        this.customData = customData;
        this.status = -1;
    }
}
module.exports = {
    Request
}