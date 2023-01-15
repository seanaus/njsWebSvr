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
    console.log(`CART REQUEST`)
    const keys = Object.keys(req.query);
    const values = Object.values(req.query);
    let request = {};

    switch(keys.length-1) {
        case reqParaMap.id:
            request = new Request(values[reqParaMap.id]);
            req.status = reqStatus.getRequest;
        case reqParaMap.uId:
            request = new Request("", values[reqParaMap.uId], { "key":"userId", "value": values[reqParaMap.uId] });
            req.status = reqStatus.newRequest;
        case reqParaMap.metaData:
            request = new Request("", values[reqParaMap.uId], { "key":keys[reqParaMap.metaData], "value": values[reqParaMap.metaData] });
            req.status = reqStatus.newRequest;
        default:
            request = new Request("-1","-1",{});
            req.status = reqStatus.badRequest;
    }

    return request
    // const rq = new Request(req.query);
    // let id = request.id();
    // let uId = request.uId();
    // let userIdOveride = request.userIdOveride();

    // console.log(`${id}`);
    // console.log(`${uId}`);
    // console.log(`${userIdOveride.key}`);
    // console.log(`${userIdOveride.value}`);

    // return rq;
}
const productRequest = (req) => {

}
module.exports = {
    getRequest
}