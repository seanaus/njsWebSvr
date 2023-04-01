const createImageId =  (value) => {
    return `id=${value}`;
}
const createEventCall =  (value) => {
    return `onClick=selectImage('${value}')`;
}
module.exports = {
    createImageId,
    createEventCall
}