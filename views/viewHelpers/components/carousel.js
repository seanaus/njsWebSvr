const curentSlide = (value) => {
    return parseInt(value) + 1;
}
const styleSlide = (image, height) => {
    console.log(`style="background-image: url('${image}');height:${height}px"`);
    // return "style='background-image:url('" + image + "'),height:" + height + "px"
    return `style="background-image: url('${image}');height:${height}px"`
}

// const addStyle = (height) => {

// }

module.exports = {
    curentSlide,
    styleSlide
}