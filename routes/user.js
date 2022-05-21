/*
path = /api/users
*/

const { Router} = require('express');
const { getUsers } = require('../controllers/users');
const { jwtValidator } = require('../middlewares/jwt-validator');

const router = Router()

router.get('/',jwtValidator,getUsers);

module.exports = router;