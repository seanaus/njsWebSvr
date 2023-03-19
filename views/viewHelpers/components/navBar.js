const setVisibility =  (visibility, auth) => {
    if (visibility === 'true') {
        return 'showMenuButton'
    }
    if (visibility === 'false') {
        return 'hideMenuButton'
    }
    if (visibility === 'onAuth') {
        if(auth) {
        return 'showMenuButton' 
        } else {
        return 'hideMenuButton'
        }
    }
    if (visibility === '!onAuth') {
        if(auth) {
        return 'hideMenuButton' 
        } else {
        return 'showMenuButton'
        }
    }
}

module.exports = {
    setVisibility
}