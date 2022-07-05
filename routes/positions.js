const express = require('express');
const router = express.Router();

const positionController = require('../controller/positionsController')
const tokenAuth = require('../middleware/tokenAuthentication')

// router.post('/api/login', userController.login)
router.get('/api/positions', positionController.get)

module.exports = router