const styleAttr = (styles) => {
    let concat = "";
    for (const style in styles) {
        concat += `${style}: ${styleAttrVal(style, styles[style])};`
    }
    return `style='${concat}'`
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