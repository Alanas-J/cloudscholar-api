const express = require('express');
const app = express();
const morgan = require('morgan'); // middleware for request logging
const bodyParser = require('body-parser'); // used to parse body text into a JSON object.
const mongoose = require('mongoose'); // MongoDB connection driver

const port = process.env.PORT || 8086; // use node env variable if set or 

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user')

/*
// WILL NEED TO BE removed FOR SQL ============ 
mongoose.connect("mongodb+srv://alanas:"+ process.env.MONGO_ATLAS_PW +"@cloudscholar-db.tt9k7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        //useMongoClient: true
    }
);*/

// middleware piping =====================================================
app.use(morgan('dev')); // Used to log

// app.use(express.static('/uploads', 'uploads')); to enable static dirs
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// CORS Handing ============================================= // better solution in tutorial using a cors import
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

const db = require("./api/models");

//db.sequelize.sync();
// // drop the table if it already exists //force: true
db.sequelize.sync({ force: true }).then(() => {
   console.log("Drop and re-sync db.");
});





// Route Handing =============================================
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);
require("./api/routes/tutorial.routes")(app);

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

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});



// =================================== AUX FUNCTIONS =================================================================
async function test(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
