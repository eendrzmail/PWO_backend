const express = require('express');
const router = express.Router();

const carsController = require('../controller/carsController')
const tokenAuth = require('../middleware/tokenAuthentication')

db = require('../db/db');

router.post('/api/cars', tokenAuth.checkToken, carsController.addCar)

module.exports = router