const toggle = () => {
    const navBar = document.getElementById("navBar");
    const navPills = navBar.getElementsByClassName("navPill");
    for (let idx = 0; idx < navPills.length; idx++) {
        // let isCollapsed = navPills[i].classList.contains("isCollapsed");
        if (navPills[idx].classList.contains("isCollapsed")) {
            navPills[idx].classList.remove("isCollapsed");
            // const children = navPills[idx].getElementsByTagName("div");
            // for (let cIdx = 0; cIdx < children.length; cIdx++) {
            // children[cIdx].classList.remove("isCollapsed");
            // console.log(`CHILD: ${children[cIdx]}`)
            // children[cIdx].style.visibility = "visible";
            // }
            // navBar.style.display = "none";
        } else {
            navPills[idx].classList.add("isCollapsed");
            // navBar.style.display = "flex";
            // const children = navPills[idx].getElementsByTagName("div");
            // for (let cIdx = 0; cIdx < children.length; cIdx++) {
            //     // children[cIdx].classList.add("isCollapsed");
            //     // console.log(`CHILD: ${children[cIdx]}`)
            //     children[cIdx].style.visibility = "hidden"
            // }        
        }
    }

    // setTimeout(() => {
    //     for (let idx = 0; idx < navPills.length; idx++) {
    //         if (navPills[idx].style.opacity === '0') {
    //             navPills[idx].style.opacity = '1';
    //         } else {
    //             navPills[idx].style.opacity = '0';
    //         }
    //     }
    // }, 500)

    // for (let idx = 0; idx < navPills.length; idx++) {
    //     const color = navPills[idx].style.color;
    //     // const color2 = navPills[idx].style.backgroundColor; 

    //     if (navPills[idx].style.opacity === '0') {
    //         navPills[idx].style.opacity = '1';
    //     } else {
    //         navPills[idx].style.opacity = '0';
    //     }
    // }
    // for (let idx = 0; idx < navPills.length; idx++) {
    //     const children = navPills[idx].getElementsByTagName("div");
    //     for (let cIdx = 0; cIdx < children.length; cIdx++) {
    //         children[cIdx].style.visibility = children[cIdx].style.visibility === "hidden" ? "visible" : "hidden";
    //     }
    // }
}