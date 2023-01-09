class Request {
    constructor(
        id = "",
        uId = "",
        linkIdKey = "Field01",
        linkIdVal = "01"
    ) {
        this.id = id;
        this.uId = uId;
        this.fieldName = `${linkIdKey}:${linkIdVal}`;
    };
}
module.exports = Request