const Location = require('./../models/coordinatesModel');
const User = require('./../models/userModel');

exports.receiveCoordinates = async (req, res) => {
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
        if (req.params.user_id === "user-token") {
            locations = await Location.find({user_token: req.params.value});
        } else if (req.params.user_id === "user-email") {
            const user = await User.findOne({user_email: req.params.value});
            locations = await Location.find({user_token: user.user_token});
        } else if (req.params.user_id === "user-name") {
            const user = await User.findOne({user_name: req.params.value});
            locations = await Location.find({user_token: user.user_token}).select('latitude longitude');
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
        if (req.params.user_id === "user-token") {
            await Location.deleteMany({user_token: req.params.value});
        } else if (req.params.user_id === "user-email") {
            const user = await User.findOne({user_email: req.params.value});
            await Location.deleteMany({user_token: user.user_token});
        } else if (req.params.user_id === "user-name") {
            const user = await User.findOne({user_name: req.params.value});
            await Location.deleteMany({user_token: user.user_token});
        } else {
            return res.status(500).json({
                status: 'fail',
                message: 'Invalid user identifier'
            });
        }
        res.status(200).json({
            status: 'success',
            message: `Deleted user ${req.params.value} locations`
        });
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
};