const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    user_token: {
        type: String,
        required: [true, 'User must have an token']
    },
    user_email: {
        type: String,
        trim: true,
        validate: {
            validator: validator.isEmail
        }
    },
    user_name: {
        type: String,
        required: [true, 'User mult have an username']
    }
});

const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;