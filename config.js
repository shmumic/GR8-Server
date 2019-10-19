require('dotenv').config();

function confObject() {
    this.development = {
        config_id: "development",
        dbURI: 'mongodb://localhost:27017/gr8FulDBTest',
        dbName: 'gr8FulDBTest',
        express_port: 3000,
        googleStrategyConf: {
            clientID: process.env.devtestgClientId,
            clientSecret: process.env.devtestgClientDevSecret,
            callbackURL: "http://localhost:3000/auth/google/callback",
            userProfileUrl: "https://www.googleapi.com/oauth2/v3/userinfo"
        },
        jwtConfig: {
            acessTokenSecret: process.env.devtestJWTAccessTokenSecret,
            refreshTokenSecret: process.env.devtestJWTRefreshokenSecret,

            issuer: "Gr8Server",
            audience: "Gr8FullUser"
        }
    };
    this.testing = {
        config_id: "testing",
        dbURI: process.env.remoteTestDBURI,
        dbName: 'gr8FulDBTest',
        express_port: process.env.PORT || 3000,
        jwtConfig: this.development.jwtConfig //no difference
    };
    this.production = {
        config_id: "production",
        dbURI: process.env.MONGODB,
        dbName: 'gr8FulDB',
        express_port: process.env.PORT
        //todo: create add google strategy
    }

}

var config = new confObject();
module.exports = config;