const { block } = require('./block')



block('Your exiting message!')

const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 4000;
const router = require('./src/router');
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./client/build")));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

app.use('/', router);

app.listen(port, () => {
    console.log('Server started on: ' + port);
});



