const express = require('express');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 8086;

if(!process.env.NODE_ENV){
    process.env.NODE_ENV = 'dev';
}

app.use(morgan('dev'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Orgin, X-RequestedWith, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS'){ 
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.header('Access-Control-Allow-Credentials', 'true');
        return res.status(200).json({});
    }
    next();
});

app.use('/', require('./api/routes/auth.routes'));
app.use('/user_data', require('./api/routes/user_data.routes'));

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: { message: error.message }});
});

const db = require("./api/models");
db.sequelize.sync();

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
