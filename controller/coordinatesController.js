const Location = require('./../models/coordinatesModel');
const User = require('./../models/userModel');

exports.receiveLocation = async (req, res) => {
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
};

exports.getCoordinates = async (req, res) => {
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
};

exports.deleteCoordinates = async (req, res) => {
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
};