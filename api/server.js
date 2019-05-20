const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../routers/auth-router/auth-router');
const usersRouter = require('../routers/users-router/users-router');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/users/', usersRouter)
server.use('/api/auth/', authRouter)

server.get('/', (req, res) => {
    res.status(200).json('test')
})

module.exports = server;