const curentSlide = (value) => {
    return parseInt(value) + 1;
}
// const styleSlide = (styles) => {
//     let concat = "";
//     for (const style in styles) {
//         concat += `${style}: ${formatStyle(style, styles[style])};`
//         // console.log(concat);
//     }
//     return `style='${concat}'`
// }
// const formatStyle = (style, value) => {
//     switch(style) {
//         case "background-image":
//             return `url(${value})`
//         default:
//             return `${value}`
//     }
// }

module.exports = {
    curentSlide
}