/*
path = /api/login
*/

const { Router} = require('express');
const { check } = require('express-validator');

const {createUser, login, renew, renewToken} = require('../controllers/auth');
const { campValidator} = require('../middlewares/camp-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');

const router = Router()

router.post('/new',[
    check('name','Name required').not().isEmpty(),
    check('email','Email required').isEmail(),
    check('password','Password required').not().isEmpty(),
    campValidator
],createUser);

router.post('/',[
    check('email','Email required').isEmail(),
    check('password','Password required').not().isEmpty(),
    campValidator
],login);

router.get('/newToken',jwtValidator,renewToken);

module.exports = router;