/*
 Ruta: /Users
*/
const { Router } = require('express');
const { tokenVerify } = require('../middlewares/users.middlewares')
const { getUsers, createUser, updateUser, removeUser } = require('../controllers/users.controllers');
const { verifyAdmin } = require('../middlewares/admin.middlewar');

const router = Router();

router.get('/', tokenVerify, getUsers);

router.post('/', createUser);

router.put('/:id', tokenVerify, verifyAdmin, updateUser);

router.delete('/:id', tokenVerify, verifyAdmin, removeUser);

module.exports = router;