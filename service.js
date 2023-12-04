const asyncLocalStorage = require("./asyncLocalStorage");
const { initializeLogger } = require('./logger');

// Initialize the logger
const logger = initializeLogger(); // Initialize the logger here

async function methodA() {
    const name = 'methodA';
    const requestId = asyncLocalStorage.getStore();
    logger.info('Start ' + name + ' ' + requestId);
    await sleep(1000);
    await methodB();
    logger.info('Finish ' + name);
}

async function methodB() {
    const name = 'methodB';
    logger.info('Start ' + name);
    await sleep(500);
    logger.info('Finish ' + name);
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

module.exports = {methodA};