const express = require('express');
const mongoose = require('mongoose');


const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from the server');
});

app.post('/', (req, res) => {
    
});

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});