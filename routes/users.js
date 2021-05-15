const express= require('express');
const router = express.Router();

const userController = require('../controller/userController')
const tokenAuth = require('../middleware/tokenAuthentication')

db = require('../db/db');

router.post('/api/register', userController.register)

router.post('/api/login', userController.login)

router.get('/api/test', tokenAuth.checkToken, userController.login)

module.exports = router