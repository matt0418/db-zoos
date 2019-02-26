const express = require('express');
const helmet = require('helmet');

const zooRouter = require('../routes/zooRouter');
const bearRouter = require('../routes/bearRouter')

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/zoo', zooRouter);
server.use('/api/bears', bearRouter);

module.exports = server;