/*
 Ruta: /Users
*/
const { Router } = require('express');
const { tokenVerify } = require('../middlewares/users.middlewares')
const { getUsers, createUser, updateUser, removeUser } = require('../controllers/users.controllers');

const router = Router();

router.get('/', tokenVerify, getUsers);

router.post('/', tokenVerify, createUser);

router.put('/:id', tokenVerify, updateUser);

router.delete('/:id', tokenVerify, removeUser);

module.exports = router;