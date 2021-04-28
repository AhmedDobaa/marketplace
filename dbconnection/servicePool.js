let pool = require('./mysqlPool')
let userMessage = require('../userMessage')

function execute(req1, res1, _statement, _bindings) {
    return new Promise((resolve, reject) => {
        pool.pool.query({ sql: _statement, values: _bindings }, (res, msg) => {
            if (!msg) {
                res1.status(200).json({ status: 200, rows: res, message: 'successed' })
            } else {
                let messageresult = userMessage.filter(e => msg.sqlMessage.indexOf(e.key) > 0)
                if (messageresult.length > 0) {
                    res1.status(200).json({ status: 400, error: messageresult[0].message, message: 'failed' })
                } else {
                    res1.status(200).json({ status: 400, error: msg.sqlMessage, message: 'failed' })
                }
            }
        });
    });
}

module.exports = execute;