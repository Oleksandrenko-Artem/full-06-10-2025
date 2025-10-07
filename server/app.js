const express = require('express');
const userRouter = require('./routes/user.routes');
const errorHandler = require('./errorHandler');

const app = express();
app.use(express.json());

app.use('/users', userRouter);

app.use(errorHandler);

module.exports = app;