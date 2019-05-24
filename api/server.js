const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../routers/auth-router/auth-router');
const usersRouter = require('../routers/users-router/users-router');
const linksRouter = require('../routers/links-router/links-router');

const server = express();

let allowedOrigins = ['http://localhost:4000', 'http://localhost:5000', 'http://localhost:3000', 
'https://moderndayresearcher.firebaseapp.com']

server.use(helmet());
server.use(express.json());
server.use(cors({origin: 'https://moderndayresearcher.firebaseapp.com'}));

// server.use('/api/users/', usersRouter)
server.use('/api/auth/', authRouter)
server.use('/api/auth/users', linksRouter)

server.get('/', (req, res) => {
    res.status(200).json(process.env.MOTD)
})

module.exports = server;