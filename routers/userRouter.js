const express = require('express');
const userController = require('./../controller/userController');

const router = express.Router();

router.post('/add-user', userController.addUser);

router.get('/get-users', userController.getAllUsers);

router.get('/check-user/:user_token', userController.checkUser);

module.exports = router;