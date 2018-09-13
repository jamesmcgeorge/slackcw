import express = require('express');
let bodyParser = require("body-parser");
let logger = require('./services/logger.service');

logger.info("Starting Server")

import routes from './routes/index';




var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);

app.set('port', 4111);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});
