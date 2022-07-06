const express = require('express');
const router = express.Router();

const positionController = require('../controller/positionsController')
const tokenAuth = require('../middleware/tokenAuthentication')

router.get('/api/positions', positionController.get)
router.post('/api/positions', positionController.post)

module.exports = router