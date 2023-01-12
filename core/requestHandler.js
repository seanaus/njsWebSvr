const Request = require("../models/request");
const getRequest = (req, action) => {
    if(action === "CART") {
        return new Request(req.query);
    }
    if(action === "PRODUCT") {
        return productRequest(req);
    }
}
// const cartRequest = (req) => {

    // return new Request(req.query);
    // let id = request.id();
    // let uId = request.uId();
    // let userIdOveride = request.userIdOveride();

    // console.log(`${id}`);
    // console.log(`${uId}`);
    // console.log(`${userIdOveride.key}`);
    // console.log(`${userIdOveride.value}`);

    // return request;
// }
const productRequest = (req) => {

}
module.exports = {
    getRequest
}