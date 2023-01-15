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




// const { reqParaMap, reqStatus } = require('../enums/cart');
// class Request {
//     constructor(
//         params = {}
//     ) {
//         this.params = params;
//         this.status = this.setStatus();
//     }
//     id = () => {
//         return Object.values(this.params)[reqParaMap.id];
//     }
//     uId = () => {
//         return Object.values(this.params)[reqParaMap.uId];
//     }
//     metaData = () => {
//         if (this.entriesCount() === 3) {
//             return {
//                 "key": Object.keys(this.params)[reqParaMap.metaData],
//                 "value": Object.values(this.params)[reqParaMap.metaData]
//             }
//         } else {
//             //console.log(`${JSON.stringify({ key: "userId", value: this.uId() })}`)
//             return {
//                 "key": "userId",
//                 "value": this.uId()
//             }
//         }
//     }
//     entriesCount = () => {
//         try {
//             return Object.entries(this.params).length
//         } catch {
//             return reqStatus.badRequest
//         }
//     }
//     setStatus = () => {
//         try {
//             let val = reqStatus.badRequest;
//             console.log(`entriesCount: ${entriesCount()}`);
//             if (this.entriesCount() === 1) {
//                 console.log("--------");
//                 val = reqStatus.getRequest
//             }
//             if (this.entriesCount() > 1) {
//                 console.log("++++++++");
//                 val = reqStatus.newRequest
//             }
//             return val
//         } catch {
//             return reqStatus.badRequest
//         }
//     }

// }
// module.exports = {
//     Request
// }