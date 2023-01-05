const reqStatus =  {
    badRequest : 0,
    getRequest : 1,
    newRequest : 2
}
const reqParaMap =  {
    id : 0,
    uId : 1,
    status : 2,
    creatorId : 3,
    keyValue: {
        key: 0,
        value: 1
    }
}
module.exports = { 
    reqStatus, 
    reqParaMap
}