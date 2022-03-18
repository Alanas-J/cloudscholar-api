const express = require('express');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 8086;

// 0. Check if env set.
if(!process.env.NODE_ENV){
    process.env.NODE_ENV = 'dev';
}


// 1. Initial Request/Response Processing
app.use(morgan('dev')); // Used to log

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use((req, res, next) => { // CORS, better method under https://github.com/bezkoder/
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // can restrict what web pages can use your API, not POSTMAN.
    res.header('Access-Control-Allow-Headers', 'Orgin, X-RequestedWith, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS'){ // What a client can do
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.header('Access-Control-Allow-Credentials', 'true');
        return res.status(200).json({});
    }
    next();
});


// 2. Route Handing =============================================
app.use('/', require('./api/routes/auth.routes'));
app.use('/user_data', require('./api/routes/user_data.routes'));


// 3. Error handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: { message: error.message }});
});


// 4. Connection initialization
const db = require("./api/models");
db.sequelize.sync(); // { force: true }

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
