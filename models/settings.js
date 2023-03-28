class Settings {
    constructor(
        name,
        vatMatric,
        tokenLifeSpan,
        authLifeSpan,
        useViewEngine,
        accessTokenSecret,
        refreshTokenSecret
    ) {
        this.name = name,
        this.vatMatric = vatMatric,
        this.tokenLifeSpan = tokenLifeSpan,
        this.authLifeSpan = authLifeSpan,
        this.useViewEngine = useViewEngine,
        this.accessTokenSecret = accessTokenSecret,
        this.refreshTokenSecret = refreshTokenSecret
    }
}
module.exports = Settings