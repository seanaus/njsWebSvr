window.onload = () => {
    initialize();
};
const initialize = () => {
    const container = document.getElementById("lightBoxThumbnailContainer");
    if(container != null) {
        const thumbs = container.querySelectorAll("div.lightBoxThumbnail");
        thumbs.forEach((thumb) => {
            if (thumb) {
                thumb.addEventListener("click", selectImage);
            }
        });
    }
};
const selectImage = (event) => {
    const lightBox = document.getElementById("lightBoxImage")
    lightBox.style.backgroundImage = event.target.style.backgroundImage
}