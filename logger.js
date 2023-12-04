const winston = require('winston');
const asyncLocalStorage = require('./asyncLocalStorage.js');

function initializeLogger(fileConf = null, consoleConf = null) {
    if (!fileConf) {
        fileConf = {
            level: 'debug',
            filename: './logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            colorize: false,
            timestamp: true
        };
    }
    if (!consoleConf) {
        consoleConf = {
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
            timestamp: true
        };
    }

    const winstonLogger = winston.createLogger({
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message, requestId }) => {
                return `${timestamp} [${level}] - requestId: ${requestId || 'N/A'} - ${message}`;
            })
        ),
        transports: [
            new winston.transports.File(fileConf),
            new winston.transports.Console(consoleConf)
        ],
        exitOnError: false
    });

    const logLevels = ['error', 'info', 'debug'];
    const logger = {};

    const getRequestId = function () {
        return asyncLocalStorage.getStore();
    };

    logLevels.forEach((level) => {
        logger[level] = function (message) {
            const requestId = getRequestId();
            winstonLogger[level](message, { requestId });
        };
    });

    return logger;
}

module.exports = {
    initializeLogger,
};
