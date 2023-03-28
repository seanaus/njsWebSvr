class Settings {
    constructor(
        name,
        vatMatric,
        accessTokenSecret,
        refreshTokenSecret,
        tokenLifeSpan,
        authLifeSpan,
    ) {
        this.name = name,
        this.vatMatric = vatMatric,
        this.accessTokenSecret = accessTokenSecret,
        this.refreshTokenSecret = refreshTokenSecret,
        this.tokenLifeSpan = tokenLifeSpan,
        this.authLifeSpan = authLifeSpan
    }
}
module.exports = Settings