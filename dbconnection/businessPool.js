let pool = require('./mysqlPool')
let userMessage = require('../userMessage')

function execute(req, res, _statement, _bindings) {
    return new Promise((resolve, reject) => {
        pool.pool.query({ sql: _statement, values: _bindings }, (res, msg) => {
            if (!msg) {
                resolve({ status: 200, rows: res, message: 'successed' })
            } else {
                let messageresult = userMessage.filter(e => msg.sqlMessage.indexOf(e.key) > 0)
                if (messageresult.length > 0) {
                    reject({ status: 400, error: messageresult[0].message, message: 'failed' })
                } else {
                    reject({ status: 400, error: msg.sqlMessage, message: 'failed' })
                }
            }
        });
    });
}

module.exports = execute;