const { reqParaMap } = require('../enums/cart');
class Request {
    constructor(
        params = {}
    ) 
    {
        this.params = params
        this.paramCount = this.entriesCount();
    }
    id = () => {
        return Object.values(this.params)[reqParaMap.id];
    }
    uId = () => {
        return Object.values(this.params)[reqParaMap.uId];
    }
    userIdOveride = () => {
        return {
            key : Object.keys(this.params)[reqParaMap.userIdOveride],
            value : Object.values(this.params)[reqParaMap.userIdOveride]
        }
    }
    entriesCount = () => {
        try {
            return Object.entries(this.params).length
        } catch {
            return -1
        }
    }
}
module.exports = Request