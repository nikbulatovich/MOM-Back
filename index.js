const express = require('express')
const fs = require('fs');
const path = require('path');
const app = express();
require('dotenv').config()
const db = require('./db')
const bodyParser = require('body-parser');
const routes = require('./routes');
var cors = require('cors')

const PORT = 5000

app.use(bodyParser.json());

app.use(cors())

app.use('/', routes);

app.get('/', (req, res) => res.send('ping'))

app.listen(PORT, () => {
    console.log(`Moms Over Matter backend app listening on port ${PORT}!`)
})
