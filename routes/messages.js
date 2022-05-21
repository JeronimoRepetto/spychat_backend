/*
    Path: /api/messages
*/
const { Router} = require('express');
const { takeChat } = require('../controllers/message');
const { jwtValidator } = require('../middlewares/jwt-validator');

const router = Router()

router.get('/:to',jwtValidator,takeChat);

module.exports = router;