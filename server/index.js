const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const apiRouter = require('./routes/api');
const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', routes);
app.use('/api', apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Listening on " + port);
});