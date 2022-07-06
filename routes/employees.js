const express = require('express');
const router = express.Router();

const employeesController = require('../controller/employeesController')
const tokenAuth = require('../middleware/tokenAuthentication')

router.get('/api/employees', employeesController.get)
router.get('/api/employees/:id', employeesController.getOne)
router.post('/api/employees', employeesController.post)

module.exports = router