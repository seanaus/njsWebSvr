const toggle = () => {
    const navBar = document.getElementById('navBar')
    navBar.style.display = navBar.style.display === 'flex' ? 'none' : 'flex';

    console.log(`I Was Clicked!!! ${navBar.style.display}`)

}