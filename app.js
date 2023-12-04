const express = require('express');
const createRequestId = require('./middleware.js');
const { methodA } = require('./service.js');
const { initializeLogger } = require('./logger'); // Import the logger initializer

const app = express();
const port = 3000;

// Initialize the logger
const logger = initializeLogger(); // Initialize the logger here

// Apply the createRequestId middleware to all routes
app.use(createRequestId);

app.get('/', (req, res) => {
    logger.debug('Test debug message');
    logger.info('Test info message');
    res.send('Hello World!');
});

app.get('/methodA', (req, res) => {
    logger.info('Calling method A.');
    methodA(logger);
    res.send('Method A');
});

app.listen(port, () => {
    logger.info(`Example app listening on port ${port}`);
});
