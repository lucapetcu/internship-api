const express = require('express');
const mongoose = require('mongoose');
const Location = require('./coordinatesModel');
const User = require('./userModel');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/locations')
.then(con => {
    console.log('DB connection succesful');
});

app.get('/', (req, res) => {
    res.send('Hello from the server');
});

app.post('/receive-location', async (req, res) => {
    const newLocation = new Location({
        user_token: req.body.user_token,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
    });
    try {
        await newLocation.save();
        res.status(200).json({
            status: 'success',
            coordinates: newLocation
        });
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.post('/add-user', async (req, res) => {
    const newUser = new User({
        user_token: req.body.user_token,
        user_email: req.body.user_email,
        user_name: req.body.user_name
    });

    try {
        await newUser.save();
        res.status(201).json({
            status: 'success',
            user: newUser
        });
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }

});

app.get('/get-users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            users
        });
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.get('/check-user/:user_token', async (req, res) => {
    try {
        const user = await User.find({user_token: req.params.user_token});
        if (user.length !== 0) {
            return res.status(200).json({
                status: 'success',
                user
            });
        } else {
            res.status(200).json({
                status: 'fail',
                message: `User with token ${req.params.user_token} doesn't exist`
            });
        }
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.get('/get-coordinates/:method_id/:value', async (req, res) => {
    try {
        let locations;
        if (req.params.method_id === "user_token") {
            locations = await Location.find({user_token: req.params.value});
        } else if (req.params.method_id === "user_email") {
            const user = await User.findOne({user_email: req.params.value});
            locations = await Location.find({user_token: user.user_token});
        } else if (req.params.method_id === "user_name") {
            const user = await User.findOne({user_name: req.params.value});
            locations = await Location.find({user_token: user.user_token});
        } else {
            return res.status(500).json({
                status: 'fail',
                message: 'Invalid user identifier'
            });
        }
        res.status(200).json({
            status: 'success',
            locations
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.delete('/delete-coordinates/:user', async (req, res) => {
    try {
        await Location.deleteMany({user_token: req.params.user});
        res.status(200).json({
            status: 'success',
            message: `Deleted user ${req.params.user} locations`
        });
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});