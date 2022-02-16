const express = require('express');
const app = express();
const morgan = require('morgan'); // middleware for request logging

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// middleware
app.use(morgan('dev'));


// Route Handing =============================================
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Catches all other routes
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;

    next(error);
});


// Catches errors where thrown. ============================
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;