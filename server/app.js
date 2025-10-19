const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.routes');
const categoryRouter = require('./routes/category.routes');
const productRouter = require('./routes/product.routes');
const orderRouter = require('./routes/order.routes');
const errorHandler = require('./errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.use(errorHandler);

module.exports = app;