//npm import
const express = require('express');
//middleware import
const {
  logger,
  errorHandling
} = require('./middleware/middleware.js');
//router import
const usersRouter = require('./users/users-router.js');
//server initialization
const server = express();
//make JSON usable
server.use(express.json());
// global middlewares and the user's router need to be connected here
server.use(logger);
server.use('/api/users', usersRouter);
server.use(errorHandling);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
