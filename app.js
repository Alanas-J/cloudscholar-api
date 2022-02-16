const express = require('express');
const app = express();
const morgan = require('morgan'); // middleware for request logging
const bodyParser = require('body-parser'); // used to parse body text into a JSON object.
const mongoose = require('mongoose'); // MongoDB connection driver

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// WILL NEED TO BE CHANGED FOR SQL ============
mongoose.connect("mongodb+srv://alanas:"+ process.env.MONGO_ATLAS_PW +"@cloudscholar-db.tt9k7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        //useMongoClient: true
    }
);
// ================================================================================


// middleware piping =====================================================
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// CORTS Handing =============================================
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // can restrict what web pages can use your API, not POSTMAN.
    res.header('Access-Control-Allow-Headers', 'Orgin, X-RequestedWith, Content-Type, Accept, Authorization');

    // A client usually asks the server what its able to do first with an OPTIONS request.
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


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