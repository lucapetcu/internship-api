const express = require('express');
const coordinatesController = require('./../controller/coordinatesController');

const router = express.Router();

router.post('/receive-coordinates', coordinatesController.receiveCoordinates);

router.get('/get-coordinates/:user_id/:value', coordinatesController.getCoordinates);

router.delete('/delete-coordinates/:user_id/:value', coordinatesController.deleteCoordinates);

module.exports = router;