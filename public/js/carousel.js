let slide = 0;

const carousel = () => {
    const slides = document.getElementsByClassName("slide");
    if(slides.length > 0) {
        hideSlides(slides);
        slide++;
        if (slide > slides.length) { 
            slide = 1 
        }
        slides[slide - 1].style.display = "block";
        setTimeout(carousel, 4000); // Re-call function every 4 seconds
    }
}
const hideSlides = (slides) => {
    for (let idx = 0; idx < slides.length; idx++) {
        slides[idx].style.display = "none";
    }
}
// Call function on load
carousel();