const express = require('express');
const bodyParser = require('body-parser');
// const router = require('./routes/list.router.js');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let listRouter = require('./routes/list.router.js');
app.use('/tasks', listRouter);
app.use(express.static('server/public'));

const PORT = 5000;
app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});
