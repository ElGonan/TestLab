const express = require('express');
const path    = require("path")
const fs      = require("fs")

const app = express();
const log = console.log

let rawdataTesting      = fs.readFileSync(path.resolve(__dirname, 'test-environment.json'))
let TESTING_ENVIRONMENT = JSON.parse(rawdataTesting)

const port = process.env.PORT || TESTING_ENVIRONMENT.PORT || 5000
app.set("port", port);

app.get('/test', function(req, res) {
    res.status(200).send({status:"success",message:"Welcome To Testing API"})
});

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});

app.get('*', function(req, res){
    res.status(404);
    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});

app.listen(port, () => {
//server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`);
});

module.exports = app;
