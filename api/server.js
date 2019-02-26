const express = require('express');
const helmet = require('helmet');

const zooRouter = require('../routes/zooRouter');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/zoo', zooRouter);

module.exports = server;