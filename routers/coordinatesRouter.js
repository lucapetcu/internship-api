const express = require('express');
const coordinatesController = require('./../controllers/coordinatesController');

const router = express.Router();

router.post('/receive-coordinates', coordinatesController.receiveCoordinates);

router.get('/get-last-coordinates/:user_name', coordinatesController.getLastCoordinates);

router.get('/get-coordinates/:user_id/:value', coordinatesController.getCoordinates);

router.get('/get-coordinates-after/:user_name/:date', coordinatesController.getCoordiantesAfter);

router.delete('/delete-coordinates/:user_id/:value', coordinatesController.deleteCoordinates);

router.delete('/delete-coordinates-before/:user_name/:date', coordinatesController.deleteCoordinatesBefore);

module.exports = router;