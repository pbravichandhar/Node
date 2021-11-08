const express = require('express');
const createError = require('http-errors');
const dotenv = require('dotenv').config();
const { logError, returnError } = require('./utils/errorHandler')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize DB
require('./initDB')();


const ProductRoute = require('./Routes/Product.route');
app.use('/products', ProductRoute);


app.use(logError)
app.use(returnError)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT + '...');
});
