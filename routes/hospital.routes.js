/*
    Path: /hospitals
*/

const { Router } = require('express');
const Hospital = require('../models/hospital.model');
const jwt = require('jsonwebtoken');
const {
    getHospitals,
    createHospital,
    updateHospital,
    removeHospital
} = require('../controllers/hospital.controllers');
const { tokenVerify } = require('../middlewares/users.middlewares');

const router = Router();

//Obtener
router.get('/', getHospitals);

//Agregar: Token
router.post('/', tokenVerify, createHospital);

//Actualizar: Token
router.put('/:id', tokenVerify, updateHospital);

//Borrar: Token
router.delete('/:id', tokenVerify, removeHospital);

module.exports = router;