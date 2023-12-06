const asyncLocalStorage = require("./asyncLocalStorage");
const { initializeLogger } = require('./logger');

// Initialize the logger
const logger = initializeLogger();

async function methodA() {
    // this is a time-consuming method, it will call methodB
    const name = 'methodA';
    const requestId = asyncLocalStorage.getStore();
    logger.info(`Start ${name} ${requestId}`);

    try {
        await sleep(1000);
        await methodB();
    } catch (error) {
        logger.error(`Error in ${name}: ${error.message}`);
    }

    logger.info(`Finish ${name}`);
}

async function methodB() {
    // this is a time-consuming method
    const name = 'methodB';
    logger.info(`Start ${name}`);

    try {
        await sleep(500);
    } catch (error) {
        logger.error(`Error in ${name}: ${error.message}`);
    }

    logger.info(`Finish ${name}`);
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

module.exports = { methodA };
