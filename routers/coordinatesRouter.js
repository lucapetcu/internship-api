const express = require('express');
const coordinatesController = require('./../controller/coordinatesController');

const router = express.Router();

router.post('/receive-coordinates', coordinatesController.receiveLocation);

router.get('/get-coordinates/:method_id/:value', coordinatesController.getCoordinates);

router.delete('/delete-coordinates/:user', coordinatesController.deleteCoordinates);

module.exports = router;