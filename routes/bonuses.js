const express = require('express');
const router = express.Router();

const controller = require('../controller/bonusesController')
const tokenAuth = require('../middleware/tokenAuthentication')

router.get('/api/bonuses/:id', controller.getOne)
router.post('/api/bonuses', controller.post)
router.put('/api/bonuses', controller.put)

module.exports = router