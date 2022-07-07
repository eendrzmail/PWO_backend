const express = require('express');
const router = express.Router();

const controller = require('../controller/absencetypesController')
const tokenAuth = require('../middleware/tokenAuthentication')

router.get('/api/absencetypes', controller.get)

module.exports = router