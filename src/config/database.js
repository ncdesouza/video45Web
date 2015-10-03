// config/database.js

module.exports = {
    'url' : '127.0.0.1:24000',
    'url-dev' : '127.0.0.1:27017',
    'sqldb' : {
        client: 'sqlite3',
        connection: {
            filename: '../../data/sqldb/video45.db'
        }
    }
};