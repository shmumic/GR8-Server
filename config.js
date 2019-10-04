 module.exports = {
    dbURI: process.env.MONGODB|| 'mongodb://localhost:27017',
    dbTestRemoteURI: process.env.remoteTestDBURI,
    dbName: 'gr8FulDB',
    dbTestName: 'gr8FulDBTest',
    dbLogsName:  'logs',
    port: process.env.PORT || 3000 }
