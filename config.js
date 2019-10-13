module.exports = {
    development: {
        config_id: "development",
        dbURI: 'mongodb://localhost:27017/gr8FulDBTest',
        dbName: 'gr8FulDBTest',
        express_port: 300
    },
    testing: {
        config_id: "testing",
        dbURI: process.env.remoteTestDBURI,
        dbName: 'gr8FulDBTest',
        express_port: process.env.PORT || 3000
    },
    production: {
        config_id: "production",
        dbURI: process.env.MONGODB,
        dbName: 'gr8FulDB',
        express_port: process.env.PORT
    }

};