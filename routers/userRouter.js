const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

router.post('/add-user', userController.addUser);

router.get('/get-users', userController.getAllUsers);

router.get('/check-user/:user_token', userController.checkUser);

router.get('/get-users-without/:user_token', userController.getUsersWithout);

module.exports = router;