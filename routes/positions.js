const express = require('express');
const router = express.Router();

const positionController = require('../controller/positionsController')
const tokenAuth = require('../middleware/tokenAuthentication')

router.get('/api/positions', positionController.get)
router.get('/api/positions/:id', positionController.getOne)
router.post('/api/positions', positionController.post)
router.put('/api/positions', positionController.put)

module.exports = router