const User = require('./../models/userModel');

exports.addUser = async (req, res) => {
    const newUser = new User({
        user_token: req.body.userToken,
        user_email: req.body.userEmail,
        user_name: req.body.userName
    });

    try {
        await newUser.save();
        res.status(201).json({
            status: 'success',
            username: newUser.user_name,
            user_email: newUser.user_email
        });
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }

};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('user_email user_name');
        res.status(200).json({
            status: 'success',
            users
        });
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
};

exports.getUsersWithout = async (req, res) => {
    try {
        const users = await User.find({user_token: {$ne: req.params.user_token}}).select('user_email user_name');
        res.status(200).json({
            status: 'success',
            users
        });
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
};

exports.checkUser = async (req, res) => {
    try {
        const user = await User.find({user_token: req.params.user_token}).select('user_name user_email');
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
};