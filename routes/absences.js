const express = require('express');
const router = express.Router();

const controller = require('../controller/absencesController')
const tokenAuth = require('../middleware/tokenAuthentication')

router.get('/api/absences', controller.get)
router.get('/api/absences/:id', controller.getOne)
router.post('/api/absences', controller.post)
router.put('/api/absences', controller.put)

module.exports = router