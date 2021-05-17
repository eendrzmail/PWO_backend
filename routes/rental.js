const express= require('express');
const router = express.Router();

const rentalController = require('../controller/rentalController')
const tokenAuth = require('../middleware/tokenAuthentication')


db = require('../db/db');

router.post('/api/rental', tokenAuth.checkToken, rentalController.rentCar)



module.exports = router