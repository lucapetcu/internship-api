const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    user_token: {
        type: String,
        default: "default_user_token",
        required: [true, 'Must provide an username']
    },
    longitude: {
        type: Number,
        required: [true, 'Must provide a longitude']
    },
    latitude: {
        type: Number,
        required: [true, 'Must provide a latitude']
    },
    sendAt: {
        type: Date,
        default: Date.now()
    }
});

const locationModel = mongoose.model('locationModel', locationSchema);
module.exports = locationModel;