const http = require('http');
const app = require('./app');

const port = process.env.PORT || 8086; // use node env variable if set or 


const server = http.createServer(app);
server.listen(port);











/*
const express = require('express');
const app = express();


app.get('/', (req, res ) => {
    res.render('index.ejs')
})


app.listen(port);
*/