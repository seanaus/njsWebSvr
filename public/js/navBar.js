const toggleNavPills = () => {
    const navBar = document.getElementById("navBar");
    const navPills = navBar.getElementsByClassName("navPill");
    for (let idx = 0; idx < navPills.length; idx++) {
        if (navPills[idx].classList.contains("isCollapsed")) {
            navPills[idx].classList.remove("isCollapsed");
            toggleNavPillChildren(navPills[idx], true);
        } else {
            navPills[idx].classList.add("isCollapsed");
            toggleNavPillChildren(navPills[idx], false);     
        }
    }
}
const toggleNavPillChildren = (navPill, visible = true) => {
    const children = navPill.getElementsByTagName("div");
    for (let Idx = 0; Idx < children.length; Idx++) {
        if(visible) {
            children[Idx].classList.remove("isCollapsedChild");
        } else {
            children[Idx].classList.add("isCollapsedChild");
        }
    } 
}