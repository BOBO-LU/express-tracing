const crypto = require('crypto');
const asyncLocalStorage = require('./asyncLocalStorage.js');

function createRequestId(req, res, next) {
    const requestId = crypto.randomUUID();
    asyncLocalStorage.run(requestId, () => {
        next();
    });
}

module.exports = createRequestId;
