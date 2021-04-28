"use strict"
const PoolManager = require('mysql-connection-pool-manager');
let myhost = 'sql5.freemysqlhosting.net'

const options = {
    idleCheckInterval: 1000,
    maxConnextionTimeout: 20000,
    idlePoolTimeout: 3000,
    errorLimit: 50,
    preInitDelay: 50,
    sessionTimeout: 60000,
    mySQLSettings: {
        host: myhost,
        user: 'sql5408687',
        password: 'zTcb4WJxge',
        database: 'sql5408687',
        port: 3306,
        charset: 'utf8mb4',
    }
}

const mySQL = PoolManager(options);

module.exports.pool = mySQL;