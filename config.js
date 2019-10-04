
module.exports = {
    db: process.env.MONGODB|| 'mongodb://localhost:27017/Gr8Ful',
    dbLog: process.env.MONGODB|| 'mongodb://localhost:27017/logs', //right now we use in production the same db for logs, but for localhost good practice to sep
    dbTestLocal: 'mongodb://localhost:27017/Gr8Ful_Test',
    dbTestRemote: process.env.remoteTestDBURI,
    port: process.env.PORT || 3000 }
