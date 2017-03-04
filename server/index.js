const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const apiRouter = require('./routes/api');
const bodyParser = require('body-parser')
const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);
app.use('/api', apiRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("Listening on " + port);
});