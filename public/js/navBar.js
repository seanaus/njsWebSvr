const toggle = () => {
    const navBar = document.getElementById("navBar");
    const navPills = navBar.getElementsByClassName("navPill");
    for (let idx = 0; idx < navPills.length; idx++) {
        // let isCollapsed = navPills[i].classList.contains("isCollapsed");
        if(navPills[idx].classList.contains("isCollapsed")) {
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

    // for (let idx = 0; idx < navPills.length; idx++) {
    //     const children = navPills[idx].getElementsByTagName("div");
    //     for (let cIdx = 0; cIdx < children.length; cIdx++) {
    //         children[cIdx].style.visibility = children[cIdx].style.visibility === "hidden" ? "visible" : "hidden";
    //     }
    // }
}