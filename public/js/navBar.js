const breakpoint = window.matchMedia("(min-width: 768px)");
const toggleNavPills = () => {
    // const navBar = document.getElementById("navBar");
    // const navPills = navBar.getElementsByClassName("navPill");
    const navPills = getNavPills();
    collapseNavPills(navPills);
    // for (let idx = 0; idx < navPills.length; idx++) {
    //     if (navPills[idx].classList.contains("isCollapsed")) {
    //         navPills[idx].classList.remove("isCollapsed");
    //         toggleNavPillChildren(navPills[idx], true);
    //     } else {
    //         navPills[idx].classList.add("isCollapsed");
    //         toggleNavPillChildren(navPills[idx], false);     
    //     }
    // }
}
const getNavPills = () => {
    const navBar = document.getElementById("navBar");
    return navBar.getElementsByClassName("navPill");  
}
const collapseNavPills = (navPills) => {
    for (let idx = 0; idx < navPills.length; idx++) {
        if (isCollapsed(navPills[idx])) {
            collapseNavPill(navPills[idx], false);
        } else {
            collapseNavPill(navPills[idx], true);    
        }
    }
}
const isCollapsed = (navPill) => {
    return navPill.classList.contains("isCollapsed")
}
const collapseNavPill = (navPill, collapse) => {
    if(collapse) {
        navPill.classList.add("isCollapsed");
    } else {
        navPill.classList.remove("isCollapsed");
    }
    toggleNavPillChildren(navPill, collapse); 
}
const toggleNavPillChildren = (navPill, collapse) => {
    const children = navPill.getElementsByTagName("div");
    for (let Idx = 0; Idx < children.length; Idx++) {
        if(collapse) {
            children[Idx].classList.add("isCollapsedChild");
        } else {
            children[Idx].classList.remove("isCollapsedChild");
        }
    } 
}
const resetNavPills = () => {
    const navBar = document.getElementById("navBar");
    const items = navBar.querySelectorAll(".isCollapsed, .isCollapsedChild");
    for (let Idx = 0; Idx < items.length; Idx++) {
        items[Idx].classList.remove("isCollapsedChild");
        items[Idx].classList.remove("isCollapsed");
    }
}
const isSelected = () => {
    const currentPageUrl = location.href;
    const navPills = getNavPills();
    // const menuItem = document.querySelectorAll("a");
    for (let Idx = 0; Idx < navPills.length; Idx++) {
      if (navPills[Idx].href === currentPageUrl) {
        navPills[Idx].classList.add("isSelected");
        // if ((navPills[i].className == "navPill navLink")) {
        //   menuItem[i].className += " active";
        // }
      } else {
        navPills[Idx].classList.remove("isSelected");
      }
    }
  };
const onResize = ()=> {
    if(breakpoint.matches)
        resetNavPills();

    // console.log(`Screen Height: ${window.innerHeight}`);
    // console.log(`Screen Width: ${window.innerWidth}`);    
}
window.onload = () => {
    isSelected();
};
window.onresize = () => {
    onResize();
};