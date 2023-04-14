const contentElement = (data) => {
    switch(data.contentType) {
        case "image":
            return `<div class='col1 imageCard' style="background-image: url({{data.content}})"></div>`
        case "card":
            return `<div class='col1'>${data.content}</div>`
        default:
            return `<div class='col1'>${data.content}</div>`
    }
}
module.exports = {
    contentElement
}