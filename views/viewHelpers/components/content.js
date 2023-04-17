const contentItem = (value, styleTag) => {
    console.log(`contentItem-styleTag: ${JSON.stringify(styleTag)}`)
    // const styles = app.general.styleAttr(value.styles.contentContainer.col.content);
    return `<div class='content' ${styleTag}>${value?.content}</div>`;
    // let out ="<div class='col'>";
    // for (i = 0; i <value.length; i++) {
    //     out = out + "<div class='content'>" + options.fn(value[i]) + "</div>"
    // }
    // return out + "</div>"
    // let concat = "<div class='col'>";
    // for(idx = 0; idx < value.length; idx++) {
    // const style= value.styles.contentContainer.col.content;
    // console.log(`contentItem: ${JSON.stringify(styles)}`)
    //concat = concat + `<div class='content' ${value[idx].styles.contentContainer.col.content}>${options.fn(value[idx])}</div>`
    // if(value.contentType ==="text") {
    //     concat = concat + "<div class='content'>" + options.fn(value[idx]) + "</div>"
    // }
    // if(value.contentType ==="image") {
    //     concat = concat + "<div class='content'>" + options.fn(value[idx]) + "</div>"
    // }
    // if(value.contentType ==="card") {
    //     concat = concat + "<div class='content'>" + options.fn(value[idx]) + "</div>"
    // }
}
// return concat + "</div>"
// switch(value) {
//     case "image":
//         return `<div class='image'>${options.fn({item: value})}</div>`
//     case "card":
//,./.-
// return `<div class='imageCard'>${options.fn({item: value})}</div>`
//     default:
//         return `<div class='content'>${options.fn({item: value})}</div>`
// }

//     case "image":
//         return `<div class='col1 imageCard' style="background-image: url({{data.content}})"></div>`
//     case "card":
//         return `<div class='col1'>${data.content}</div>`
//     default:
//         return `<div class='col1'>${data.content}</div>`

// console.log(`contentItem: ${JSON.stringify(value)}`)
// if (value.contentType === "text") {
//     const styles = styleAttr(value?.styles?.contentContainer?.col?.content);
//     return `<div class="content" ${styles}>${value?.content}</div>`
// } 
// if (value.contentType === "image") {
// } 
// if (value.contentType === "card") {

// } 
// switch(data.contentType) {
//     case "image":
//         return `<div class='col1 imageCard' style="background-image: url({{data.content}})"></div>`
//     case "card":
//         return `<div class='col1'>${data.content}</div>`
//     default:
//         return `<div class='col1'>${data.content}</div>`
// }
// }
module.exports = {
    contentItem
}