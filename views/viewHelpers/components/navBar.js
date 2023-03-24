const setVisibility =  (visibility, auth) => {
    if (visibility === 'true' || visibility === 'false') {
        return visibility === 'true' ? 'showMenuButton' : 'hideMenuButton'
    }
    if (visibility === 'onAuth') {
        return auth ? 'showMenuButton' : 'hideMenuButton'
    }
    if (visibility === '!onAuth') {
        return auth ? 'hideMenuButton' : 'showMenuButton'
    }
}
module.exports = {
    setVisibility
}