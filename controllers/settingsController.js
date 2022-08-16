const User = require('../models/userModel');
const Settings = require('../models/settingsModel');
const admin = require('../utils/firebaseUtils');

exports.sendSettings = async (req, res) => {
    try {
        const username = req.body.user_name;
        const interval = req.body.interval;
        const fastest_interval = req.body.fastest_interval;

        const user = await User.findOne({user_name: username});
        const registrationToken = await Settings.findOne({user_token: user.user_token}).select('device_token');
        // const registrationToken = "dRy0gu-BQfKWuOtExrhUsv:APA91bHeOUScTa_gGpyJLaJOe2EVu-NN9qg-VCtd9GOalzUEgKJ78EnaKzMuA8xPolJ7Ls-LsZ7qbbHERTSbLfaIH68InhuHb4jWufVUOX6TdeeXaLKZ3G-gCu1JwjVqeaQ2JPY8V2dm";

        // const message = {
        //     token: registrationToken.device_token,
        //     data: {
        //         interval: interval.toString(),
        //         fastest_interval: fastest_interval.toString()
        //     }
        // };
        // console.log(message);

        const message = {
            token: registrationToken.device_token.toString(),
            data: {
                id: 'settings',
                interval: interval.toString(),
                fastest_interval: fastest_interval.toString(),
                user_token: user.user_token.toString()
            },
            notification: {
                title: 'New settings arrived from server',
                body: `New interval: ${interval}\nNew fastest interval: ${fastest_interval}`
            }
        };
        // console.log(message);

        admin.messaging().send(message)
            .then(response => {
                // console.log('Successfully sent message', response);
                res.status(200).json({
                    status: 'success',
                });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    status: 'fail'
                });
            });

    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
};

exports.startService = async (req, res) => {
    try {
        const username = req.body.user_name;

        const user = await User.findOne({user_name: username});
        const registrationToken = await Settings.findOne({user_token: user.user_token}).select('device_token');

        const message = {
            token: registrationToken.device_token.toString(),
            data: {
                id: 'service',
                start: req.body.start,
                user_token: user.user_token.toString()
            },
            notification: {
                title: 'Service started from server',
                body: `Server has given command to ${req.body.start} the service`
            }
        };

        admin.messaging().send(message)
            .then(response => res.status(200).json({
                status: 'success'
            }))
            .catch(err => {
                console.log(err).
                res.status(200).json({
                    status: 'fail'
                })
            });
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
};

exports.addDeviceToken = async (req, res) => {
    try {
        const userToken = req.body.userToken;
        const deviceToken = req.body.token;

        const entry = await Settings.find({user_token: userToken});

        if (entry) {
            await Settings.deleteOne({user_token: userToken});
        }

        const newSettings = new Settings({
            user_token: userToken,
            device_token: deviceToken
        });
        await newSettings.save();
        res.status(200).json({
            status: 'success'
        })
    } catch(err) {
        console.log(err);
        res.status(200).json({
            status: 'fail'
        });
    }
}; 