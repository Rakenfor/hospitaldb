/*
    Path: /login
*/

const { Router } = require('express');
const router = Router();

const { login } = require('../controllers/auth.controllers')
router.post('/', login);

module.exports = router;