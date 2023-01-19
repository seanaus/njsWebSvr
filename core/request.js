const { reqParaMap, reqStatus } = require("../enums/cart");
const { Request } = require("../models/request");
const getRequest = (req, action) => {
    if (action === "CART") {
        return cartRequest(req);
    }
    if (action === "PRODUCT") {
        return productRequest(req);
    }
}
const cartRequest = (req) => {

    let request = {};
    const keys = Object.keys(req.query);
    const values = Object.values(req.query);

    switch (keys.length - 1) {

        case reqParaMap.id:
            request = new Request(
                values[reqParaMap.id]
            );
            request.status = reqStatus.getRequest;
            break;

        case reqParaMap.uId:
            request = new Request(
                "",
                values[reqParaMap.uId],
                {
                    "key": "userId",
                    "value": values[reqParaMap.uId]
                }
            );
            request.status = reqStatus.newRequest;
            break;

        case reqParaMap.metaData:
            request = new Request(
                "",
                values[reqParaMap.uId],
                {
                    "key": keys[reqParaMap.metaData],
                    "value": values[reqParaMap.metaData]
                }
            );
            request.status = reqStatus.newRequest;
            break;

        default:
            request = new Request(
                "-1",
                "-1",
                {}
            );
            request.status = reqStatus.badRequest;
    }

    return request
}
const productRequest = (req) => {

}
module.exports = {
    getRequest
}