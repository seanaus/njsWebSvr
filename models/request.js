class Request {
    constructor(
        id = "",
        uId = "",
        metaData = {}
    ) {
        this.id = id;
        this.uId = uId;
        this.metaData = metaData;
        this.status = -1;
    }
}
module.exports = {
    Request
}