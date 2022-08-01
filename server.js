const express = require('express');
const mongoose = require('mongoose');
const coordinatesRouter = require('./routers/coordinatesRouter');
const userRouter = require('./routers/userRouter');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/locations')
.then(con => {
    console.log('DB connection succesful');
});

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/coordinates', coordinatesRouter);

app.use('/user', userRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});