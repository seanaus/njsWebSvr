const styleAttr = (styles) => {
    let concat = "";
    for (const style in styles) {
        if (typeof styles[style] !== 'object') {
            concat = concat + `${style}: ${styleAttrVal(style, styles[style])};`
        // } else {
        //     console.log(`${concat}`)            
        }
    }
    // console.log(`WTF!!!${concat}`)
    return concat.length > 0 ? `style='${concat}'`: ''
    //return `style='${concat}'`
}
const styleAttrVal = (style, value) => {
    switch (style) {
        case "background-image":
            return `url(${value})`
        default:
            return `${value}`
    }
}
module.exports = {
    styleAttr
}