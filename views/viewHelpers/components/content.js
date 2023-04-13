const content = (data) => {
    switch(data.contentType) {
        case "image":
            return `<div class='col'>${data.image}</div>`
        case "card":
            return `<div class='col'>${data.card}</div>`
        default:
            return `<div class='col'>${data.text}</div>`
    }
}
module.exports = {
    content
}