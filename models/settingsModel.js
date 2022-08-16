const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    user_token: {
        type: String,
        required: true
    },
    device_token: {
        type: String,
        required: true
    }
});

const settingsModel = mongoose.model('settingsModel', settingsSchema);
module.exports = settingsModel;