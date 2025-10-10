const express = require('express');
const userRouter = require('./routes/user.routes');
const categoryRouter = require('./routes/category.router');
const errorHandler = require('./errorHandler');

const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/categories', categoryRouter);

app.use(errorHandler);

module.exports = app;