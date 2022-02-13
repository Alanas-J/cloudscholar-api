const app = require('express')();
const port = 8081;


app.get('/login', (req,res) => {

    res.status(200).send({
        login: 'success',
        loggedInToken: 'sdafasdfsdf'
    })
})


app.listen(
    port,
    () => console.log(`listening on http://localhost:${port}`)
);



